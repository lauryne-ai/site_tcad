---
sidebar_position: 2
title: Environment variables
---

# Environment variables

QE-to-TCAD reads variables from a `.env` file (via `python-dotenv`) or the system environment.

## Local `.env` file (example)

Create a `.env` file **locally only**. Never commit it.

```bash
# Quantum ESPRESSO
QE_PATH=/path/to/q-e/bin
QE_PW=/path/to/q-e/bin/pw.x
QE_EPSILON=/path/to/q-e/bin/epsilon.x

# MPI
MPI_COMMAND=mpirun
MPI_NPROC=4

# Pseudopotentials
PSEUDOPOTENTIAL_DIR=/path/to/pseudopotentials/

# Materials Project — your personal key only
MP_API_KEY=your_api_key
```

:::danger Security
No API key is shipped with the package. Every user must create their own on [Materials Project](https://next-gen.materialsproject.org/).
Never push a `.env` containing `MP_API_KEY` to GitHub.
:::

## Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `QE_PATH` | Directory containing `pw.x` and `epsilon.x` | Searches `PATH` |
| `QE_PW` | Absolute path to `pw.x` | — |
| `QE_EPSILON` | Absolute path to `epsilon.x` | — |
| `MPI_COMMAND` | MPI command (`mpirun`, `srun`) | `mpirun` |
| `MPI_NPROC` | Number of MPI processes | `1` |
| `PSEUDOPOTENTIAL_DIR` | Directory for `.upf` files | `pseudopotentials/` |
| `MP_API_KEY` | Materials Project API key | **Required** for `qe-bridge` |
| `OMP_NUM_THREADS` | OpenMP threads (system) | `1` recommended |

## Get a Materials Project key

1. Create an account on [next-gen.materialsproject.org](https://next-gen.materialsproject.org/)
2. Generate a 32-character API key in account settings
3. Set `MP_API_KEY`:

**Linux / macOS:**

```bash
export MP_API_KEY="your_32_character_key"
```

**Windows (PowerShell):**

```powershell
$env:MP_API_KEY="your_32_character_key"
```

**Windows (CMD):**

```bat
set MP_API_KEY=your_32_character_key
```

Or put it in a local, non-versioned `.env`.

## Verification

```bash
# Check that variables are loaded
python3 -c "from dotenv import load_dotenv; import os; load_dotenv(); print('MP_API_KEY set:', bool(os.getenv('MP_API_KEY')))"

# Check pw.x (local install, not Docker)
which pw.x || echo "Set QE_PATH or --pw"
```

## See also

- [Installation](/docs/setup/installation)
- [CLI reference](/docs/reference/cli)
