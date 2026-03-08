# join-csv-tables

**[Live Demo](https://emunozgutier.github.io/join-csv-tables/)**

A modern, glassmorphic tool to join CSV files with overlapping columns automatically.

## The Problem: Scattered Data
In many data workflows, information is split across multiple files with slightly different headers. Manually merging them is tedious and error-prone.

| Source | Columns |
| :--- | :--- |
| **file1.csv** | A, B, C |
| **file2.csv** | A, D, C |
| **file3.csv** | A, B, D |

## The Solution: One Unified View
`join-csv-tables` intelligently aligns matching headers and preserves all unique data in a single, clean table.

### Resulting Unified Table
| __fileName__ | A | B | C | D |
| :--- | :--- | :--- | :--- | :--- |
| file1.csv | 1 | 2 | 3 | *null* |
| file2.csv | 1 | *null* | 3 | X |
| file3.csv | 1 | 2 | *null* | X |

## Key Features
- ✅ **No Data Loss**: All unique columns (A, B, C, D) are preserved.
- ✅ **Perfect Lineage**: The `__fileName__` column tracks exactly where each row came from.
- ✅ **Auto Alignment**: Columns with matching names are automatically merged across files.
- ✅ **Privacy First**: All processing happens locally in your browser. Your data never leaves your machine.

## How to use
1. Drag and drop your CSV files into the drop zone.
2. Preview the joined data instantly in the interactive table.
3. Download the unified CSV with a single click.
