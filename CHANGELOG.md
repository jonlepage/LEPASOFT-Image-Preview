# Changelog

## 1.88.2

### Bug Fixes

- Fix image preview and gutter icons not working when the file path contains a `#` character (e.g. `C#` project folders). Replaced `URI.parse()` with `path.parse()` for local file path handling, as `URI.parse()` incorrectly interprets `#` as a URI fragment delimiter.
