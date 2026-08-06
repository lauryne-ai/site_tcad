---
sidebar_position: 2
title: Installation
---

# Installation

This guide covers installing **The APE Bridge** and its system dependencies (Python, Quantum ESPRESSO, MPI).

## Prerequisite: Materials Project API key

Before using the tool, you must obtain your own API key. **No key is shipped** with the package (for security reasons).

1. Create an account on [Materials Project](https://next-gen.materialsproject.org/)
2. Generate a 32-character API key in your profile
3. Export it in your shell:

**Linux / macOS:**

```bash
export MP_API_KEY="your_32_character_key"
```

**Windows (PowerShell):**

```powershell
$env:MP_API_KEY="your_32_character_key"
```

**Windows (Command Prompt):**

```bat
set MP_API_KEY=your_32_character_key
```

:::danger Never commit the key
Do not put `MP_API_KEY` in a versioned file (`.env` pushed to GitHub, Dockerfile, etc.).
Use the local environment or a **non-versioned** `.env` only.
:::

## PyPI installation (recommended)

```bash
# Pipeline + plotting + TCAD simulations (diode / transistor)
pip install 'qe-to-tcad[tcad]'

# Verify
qe-bridge --help
qe-plot --help
qe-tcad --help
```

:::tip `[tcad]` extra
The `[tcad]` extra installs dependencies needed for ε(ω) plotting and diode / transistor simulations.
:::

## Install from the repository (development)

```bash
# 1. Clone the repository
git clone https://github.com/LauryneEklou/QE_to_TCAD.git
cd QE_to_TCAD

# 2. Create virtual environment
python3 -m venv .venv

# Linux / macOS
source .venv/bin/activate

# Windows (PowerShell)
# .\.venv\Scripts\Activate.ps1

# 3. Install the package
pip install --upgrade pip setuptools
pip install -e '.[tcad]'

# 4. Verify
qe-bridge --help
qe-plot --help
qe-tcad --help
```

## System requirements

- **OS**: Linux, macOS, or Windows (Docker Desktop recommended on Windows for QE)
- **Python**: 3.10+
- **Quantum ESPRESSO**: v7.0+ with `pw.x` and `epsilon.x` (unless using Docker)
- **MPI**: OpenMPI ≥ 3.0 or MPICH ≥ 3.3 (unless Docker)
- **Disk space**: 20 GiB recommended

## Quantum ESPRESSO configuration

:::info Docker users
If you use Docker (see [below](#docker-option)), you can **skip** this section — QE is already included in the image.
:::

### Option A: System installation (Linux)

```bash
# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y libopenmpi-dev openmpi-bin quantum-espresso

# Verify
which pw.x && which epsilon.x
```

### Option B: Build from source (Linux / macOS)

```bash
# Install build dependencies
sudo apt-get install -y gfortran make cmake libfftw3-dev libopenmpi-dev

# Download and compile QE (example)
git clone https://gitlab.com/QEF/q-e.git
cd q-e
./configure --prefix=$HOME/qe-7.0
make -j $(nproc) pw
make -j $(nproc) epsilon
```

### Option C: Script provided in the repo

```bash
cd third_party/
./build_qe.sh
```

## Environment variables

Create a **local** `.env` file at the project root (optional, do not commit it):

```bash
QE_PATH=/path/to/q-e/bin
MPI_COMMAND=mpirun
MPI_NPROC=4
PSEUDOPOTENTIAL_DIR=/path/to/pseudopotentials/
MP_API_KEY=your_materials_project_key
```

See the [environment reference](/docs/reference/env) for details.

## Docker option

All-in-one image: `lauryneelv/qe-to-tcad:latest` (Quantum ESPRESSO + DEVSIM + `qe-bridge`, `qe-plot`, `qe-tcad`).

**Prerequisites:** Docker + `MP_API_KEY` (32-character Materials Project key) — see [Prerequisite: API key](#prerequisite-materials-project-api-key).

### 1. Prepare a working directory

**Linux / macOS:**

```bash
mkdir -p ~/qe_runs
cd ~/qe_runs
```

**Windows (PowerShell):**

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\qe_runs"
cd $HOME\qe_runs
```

### 2. Pull the image

```bash
docker pull lauryneelv/qe-to-tcad:latest
```

### 3. `--epsilon` option (required without `-it`)

Under Docker **without** `-it`, there is **no Y/N prompt**. You must pass `--epsilon`:

| Value | Role |
|-------|------|
| `empiric` | **Recommended** — fast run (empirical ε) |
| `compute` | Force `epsilon.x` calculation (long / disk) |
| `mp` | Materials Project value |
| `ask` | Interactive prompt — **only with `-it`** |

### 4. Run the commands

From the working directory (current folder is mounted to `/data`):

**Linux / macOS (bash):**

```bash
# QE → TCAD pipeline (recommended: empiric = fast)
docker run --rm -e MP_API_KEY -v "$PWD:/data" -w /data \
  lauryneelv/qe-to-tcad:latest SiGe --epsilon empiric

# Force epsilon.x calculation (long / disk)
docker run --rm -e MP_API_KEY -v "$PWD:/data" -w /data \
  lauryneelv/qe-to-tcad:latest SiGe --epsilon compute

# Interactive Y/N prompt (requires -it)
docker run --rm -it -e MP_API_KEY -v "$PWD:/data" -w /data \
  lauryneelv/qe-to-tcad:latest SiGe

# Dielectric function ε(ω) plot
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-plot lauryneelv/qe-to-tcad:latest SiGe

# 1D diode simulation
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:latest SiGe diode

# 1D transistor simulation
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:latest SiGe transistor
```

**Windows (PowerShell):**

```powershell
$env:MP_API_KEY = "your_32_char_key"
docker pull lauryneelv/qe-to-tcad:latest

docker run --rm -e MP_API_KEY -v "${PWD}:/data" -w /data `
  lauryneelv/qe-to-tcad:latest SiGe --epsilon empiric

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-plot lauryneelv/qe-to-tcad:latest SiGe

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:latest SiGe diode

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:latest SiGe transistor
```

:::tip Docker notes
- **`sudo docker`**: `sudo` does not keep a prior `export` — write `-e MP_API_KEY="your_key"` in the command.
- **Mac Apple Silicon**: if the image does not start, add `--platform linux/amd64`.
- If volume mounting fails on Windows, use an absolute path, e.g. `C:\Users\You\qe_runs:/data`.
:::

| Command | Role | `MP_API_KEY` |
|---------|------|--------------|
| `qe-bridge` (default entrypoint) | QE calculation + JSON export | **Yes** (`-e MP_API_KEY`) |
| `qe-plot` | ε(ω) plot | No (local data) |
| `qe-tcad … diode` | Diode simulation | No |
| `qe-tcad … transistor` | Transistor simulation | No |

Results are written to the mounted volume (current folder → `/data`).

:::caution
The `quantum-espresso` package on some Debian distributions may be incomplete. If `pw.x` fails, prefer building from source or the Docker image.
:::

## Final verification

```bash
# Short pipeline (after exporting MP_API_KEY)
qe-bridge C

# Plot + TCAD validation
qe-plot C
qe-tcad C diode
```

## See also

- [Troubleshooting](/docs/setup/troubleshooting) — if installation fails
- [CLI reference](/docs/reference/cli) — `qe-bridge`, `qe-plot`, `qe-tcad`
- [Usage](/docs/setup/usage)
