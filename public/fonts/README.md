# Self-hosted webfonts

These files replace the runtime Google Fonts request so the existing typography does not depend on
an optional Google service before consent.

- **Jost v20**: the Cyrillic, Latin Extended and Latin WOFF2 subsets served by the Google Fonts CSS
  API for weights 300, 400 and 500. The WOFF2 resource is variable across that weight range.
- **Marcellus v14**: the Latin Extended and Latin WOFF2 subsets served for weight 400.

The source stylesheet was retrieved on 23 August 2026 from:

`https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500&display=swap`

Both families are licensed under the SIL Open Font License 1.1. Each family directory contains the
corresponding `OFL.txt` from the Google Fonts repository.
