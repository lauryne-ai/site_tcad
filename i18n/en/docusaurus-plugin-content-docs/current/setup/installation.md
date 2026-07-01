---
sidebar_position: 2
title: Installation
---

# Installation

This guide covers installing **The APE Bridge** and its system dependencies (Python, Quantum ESPRESSO, MPI).

## Python installation

```bash
# 1. Clone the repository
git clone https://github.com/LauryneEklou/QE_to_TCAD.git
cd QE_to_TCAD

# 2. Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# 3. Install the package
pip install --upgrade pip setuptools
pip install -e .

# 4. Verify
python3 -c "import numpy; import matplotlib; print('✓ Setup OK')"
qe-bridge --help
```

## System requirements

- **OS**: Linux (Ubuntu 20.04+, Fedora 35+) or macOS
- **Python**: 3.10+
- **Quantum ESPRESSO**: v7.0+ with `pw.x` and `epsilon.x`
- **MPI**: OpenMPI ≥ 3.0 or MPICH ≥ 3.3
- **Disk space**: 20 GiB recommended

## Quantum ESPRESSO configuration

### Option A: System installation

```bash
# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y libopenmpi-dev openmpi-bin quantum-espresso

# Verify
which pw.x && which epsilon.x
```

### Option B: Build from source

```bash
sudo apt-get install -y gfortran make cmake libfftw3-dev libopenmpi-dev

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

Create a `.env` file at the project root (optional):

```bash
QE_PATH=/home/user/q-e-7.0/bin
MPI_COMMAND=mpirun
MPI_NPROC=4
PSEUDOPOTENTIAL_DIR=/home/user/.qe_pseudo/
MP_API_KEY=your_materials_project_key
```

See the [environment reference](/docs/reference/env) for details.

## Docker option

For an isolated environment with QE pre-installed:

```bash
docker build -t qe-to-tcad:latest .
mkdir -p ~/qe_work/data
docker run --rm -v ${PWD}:/data qe-to-tcad:latest Si
```

Results are written to the mounted volume (`/data`).

## Final verification

```bash
qe-bridge C
```

## See also

- [Troubleshooting](/docs/setup/troubleshooting)
- [CLI reference](/docs/reference/cli)
