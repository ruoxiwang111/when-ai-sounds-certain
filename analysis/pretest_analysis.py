"""Development analysis for manipulation-language pretest CSV exports."""

from __future__ import annotations

import argparse
import csv
import math
import statistics
from pathlib import Path

from scipy import stats


CONDITIONS = ("high_confidence", "calibrated_confidence")
RATINGS = (
    "perceived_ai_confidence",
    "perceived_clarity",
    "perceived_knowledge",
    "perceived_persuasiveness",
)
REQUIRED_COLUMNS = frozenset(("condition", *RATINGS, "data_type", "study_phase"))
DEFAULT_DATA_DIR = Path(__file__).resolve().parent / "pretest_data"


def validate_required_columns(fieldnames: list[str] | None, source: Path | str) -> None:
    missing = REQUIRED_COLUMNS.difference(fieldnames or [])
    if missing:
        raise ValueError(f"{source}: missing required columns: {', '.join(sorted(missing))}")


def _validated_row(row: dict[str, str], source: Path, row_number: int) -> dict[str, object]:
    condition = row["condition"].strip()
    if condition not in CONDITIONS:
        raise ValueError(f"{source}:{row_number}: unsupported condition {condition!r}")
    parsed: dict[str, object] = dict(row)
    parsed["condition"] = condition
    for rating in RATINGS:
        try:
            value = float(row[rating])
        except (TypeError, ValueError) as error:
            raise ValueError(f"{source}:{row_number}: {rating} must be numeric") from error
        if not 1 <= value <= 7:
            raise ValueError(f"{source}:{row_number}: {rating} must be between 1 and 7")
        parsed[rating] = value
    return parsed


def load_pretest_files(data_dir: Path | str = DEFAULT_DATA_DIR) -> tuple[list[dict[str, object]], list[Path]]:
    records: list[dict[str, object]] = []
    excluded: list[Path] = []
    for path in sorted(Path(data_dir).glob("*.csv")):
        with path.open("r", encoding="utf-8-sig", newline="") as handle:
            reader = csv.DictReader(handle)
            validate_required_columns(reader.fieldnames, path)
            rows = list(reader)
        if not rows or any(row["study_phase"].strip() != "manipulation_pretest" for row in rows):
            excluded.append(path)
            continue
        records.extend(_validated_row(row, path, index) for index, row in enumerate(rows, start=2))
    return records, excluded


def group_by_condition(records: list[dict[str, object]]) -> dict[str, list[dict[str, object]]]:
    groups = {condition: [] for condition in CONDITIONS}
    for record in records:
        groups[str(record["condition"])].append(record)
    return groups


def cohens_d(high: list[float], calibrated: list[float]) -> float:
    if len(high) < 2 or len(calibrated) < 2:
        return math.nan
    pooled_variance = (
        (len(high) - 1) * statistics.variance(high)
        + (len(calibrated) - 1) * statistics.variance(calibrated)
    ) / (len(high) + len(calibrated) - 2)
    if pooled_variance == 0:
        difference = statistics.mean(high) - statistics.mean(calibrated)
        return 0.0 if difference == 0 else math.copysign(math.inf, difference)
    return (statistics.mean(high) - statistics.mean(calibrated)) / math.sqrt(pooled_variance)


def compare_groups(high: list[float], calibrated: list[float]) -> dict[str, float]:
    if len(high) < 2 or len(calibrated) < 2:
        return {key: math.nan for key in ("difference", "ci_low", "ci_high", "d", "t", "df", "p")}
    high_mean, calibrated_mean = statistics.mean(high), statistics.mean(calibrated)
    difference = high_mean - calibrated_mean
    high_var, calibrated_var = statistics.variance(high), statistics.variance(calibrated)
    standard_error = math.sqrt(high_var / len(high) + calibrated_var / len(calibrated))
    if standard_error == 0:
        df, t_value, p_value, margin = math.inf, (0.0 if difference == 0 else math.copysign(math.inf, difference)), (1.0 if difference == 0 else 0.0), 0.0
    else:
        df = (high_var / len(high) + calibrated_var / len(calibrated)) ** 2 / (
            (high_var / len(high)) ** 2 / (len(high) - 1)
            + (calibrated_var / len(calibrated)) ** 2 / (len(calibrated) - 1)
        )
        result = stats.ttest_ind(high, calibrated, equal_var=False)
        t_value, p_value = float(result.statistic), float(result.pvalue)
        margin = float(stats.t.ppf(0.975, df)) * standard_error
    return {
        "difference": difference,
        "ci_low": difference - margin,
        "ci_high": difference + margin,
        "d": cohens_d(high, calibrated),
        "t": t_value,
        "df": df,
        "p": p_value,
    }


def analyze(records: list[dict[str, object]]) -> dict[str, object]:
    groups = group_by_condition(records)
    results: dict[str, object] = {"total_n": len(records), "condition_n": {key: len(value) for key, value in groups.items()}, "ratings": {}}
    for rating in RATINGS:
        high = [float(row[rating]) for row in groups["high_confidence"]]
        calibrated = [float(row[rating]) for row in groups["calibrated_confidence"]]
        results["ratings"][rating] = {
            "high_mean": statistics.mean(high) if high else math.nan,
            "high_sd": statistics.stdev(high) if len(high) > 1 else math.nan,
            "calibrated_mean": statistics.mean(calibrated) if calibrated else math.nan,
            "calibrated_sd": statistics.stdev(calibrated) if len(calibrated) > 1 else math.nan,
            **compare_groups(high, calibrated),
        }
    return results


def _number(value: float) -> str:
    return "NA" if math.isnan(value) else f"{value:.3f}"


def print_report(results: dict[str, object], excluded: list[Path]) -> None:
    print("Manipulation-language pretest development analysis")
    print(f"Total N: {results['total_n']}")
    for condition, count in results["condition_n"].items():
        print(f"  {condition}: N = {count}")
    if excluded:
        print("Excluded files (study_phase was not exclusively manipulation_pretest or file was empty):")
        for path in excluded:
            print(f"  - {path.name}")
    print("\nRating summaries (difference = high_confidence - calibrated_confidence)")
    for rating, result in results["ratings"].items():
        print(f"\n{rating}")
        print(f"  high_confidence: M = {_number(result['high_mean'])}, SD = {_number(result['high_sd'])}")
        print(f"  calibrated_confidence: M = {_number(result['calibrated_mean'])}, SD = {_number(result['calibrated_sd'])}")
        print(f"  difference = {_number(result['difference'])}, 95% CI [{_number(result['ci_low'])}, {_number(result['ci_high'])}], Cohen's d = {_number(result['d'])}")
        if rating == "perceived_ai_confidence":
            print(f"  Welch independent-samples comparison: t({_number(result['df'])}) = {_number(result['t'])}, p = {_number(result['p'])}")

    ratings = results["ratings"]
    confidence = ratings["perceived_ai_confidence"]
    promising = confidence["difference"] > 0 and (confidence["difference"] >= 1.0 or confidence["d"] >= 0.5)
    print("\nDevelopment-oriented interpretation")
    print("These are provisional development criteria, not universal scientific standards.")
    print(f"  Manipulation evidence: {'promising' if promising else 'not yet promising under the provisional criteria'}.")
    flags = (
        ("clarity", ratings["perceived_clarity"]["difference"] >= 0.5),
        ("perceived knowledge", ratings["perceived_knowledge"]["difference"] >= 0.75),
        ("persuasiveness", ratings["perceived_persuasiveness"]["difference"] >= 1.0),
    )
    active_flags = [name for name, active in flags if active]
    print(f"  Potential confound flags: {', '.join(active_flags) if active_flags else 'none under the provisional criteria'}.")
    print("  Interpret effect sizes, confidence intervals, descriptive patterns, and material quality together; do not use a small-sample p-value as the sole criterion.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data-dir", type=Path, default=DEFAULT_DATA_DIR)
    args = parser.parse_args()
    records, excluded = load_pretest_files(args.data_dir)
    if not records:
        raise SystemExit("No eligible manipulation_pretest records were found.")
    print_report(analyze(records), excluded)


if __name__ == "__main__":
    main()
