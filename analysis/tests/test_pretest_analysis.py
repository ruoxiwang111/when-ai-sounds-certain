import csv
import math
import unittest

from analysis.pretest_analysis import (
    CONDITIONS,
    DEFAULT_DATA_DIR,
    REQUIRED_COLUMNS,
    cohens_d,
    group_by_condition,
    validate_required_columns,
)


class PretestAnalysisTests(unittest.TestCase):
    def test_required_column_validation(self):
        validate_required_columns(list(REQUIRED_COLUMNS), "valid.csv")
        with self.assertRaisesRegex(ValueError, "perceived_clarity"):
            validate_required_columns([column for column in REQUIRED_COLUMNS if column != "perceived_clarity"], "invalid.csv")

    def test_condition_grouping(self):
        records = [{"condition": CONDITIONS[0]}, {"condition": CONDITIONS[1]}, {"condition": CONDITIONS[0]}]
        grouped = group_by_condition(records)
        self.assertEqual(len(grouped["high_confidence"]), 2)
        self.assertEqual(len(grouped["calibrated_confidence"]), 1)

    def test_effect_size_calculation(self):
        high = [4.0, 5.0, 6.0]
        calibrated = [2.0, 3.0, 4.0]
        self.assertTrue(math.isclose(cohens_d(high, calibrated), 2.0))

    def test_simulated_example_is_fully_labelled(self):
        example = DEFAULT_DATA_DIR / "simulated_example.csv"
        with example.open("r", encoding="utf-8", newline="") as handle:
            rows = list(csv.DictReader(handle))
        self.assertTrue(rows)
        self.assertTrue(all(row["data_type"] == "simulated" for row in rows))


if __name__ == "__main__":
    unittest.main()
