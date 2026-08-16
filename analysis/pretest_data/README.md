# Pretest data directory

Place manipulation-pretest CSV exports in this directory. The analysis reads every `*.csv` file here.

Files must contain `condition`, all four `perceived_*` rating columns, `data_type`, and `study_phase`. Files are excluded unless every row has `study_phase = manipulation_pretest`. Do not place identifying information in these files.

`simulated_example.csv` is synthetic test data only. Every row is labelled `data_type = simulated`; it must not be interpreted as participant evidence or combined with real data for substantive conclusions. Remove or move it before analyzing participant exports.
