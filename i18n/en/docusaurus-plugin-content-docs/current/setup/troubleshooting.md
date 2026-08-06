---
sidebar_position: 4
title: Common errors
---

# Common errors

This guide lists frequent problems, their causes and solutions.

## Summary table

| Symptom | Likely cause | Solution |
|----------|----------------|----------|
| `pw.x not found` | QE not installed or not in PATH | [pw.x not found](#pwx-not-found) |
| `mpirun not found` | MPI not installed | [MPI](#mpi-not-found) |
| `error while loading shared libraries` | Missing FFTW/MPI libs | [Libraries](#missing-libraries) |
| Very slow runs | OpenMP + MPI misconfigured | [MPI performance](#mpi-performance) |
| No terminal plots | Missing `plotext`/`matplotlib` or stale cache | [Missing plots](#missing-plots) |
| `pw.x` exit code 1 (Docker) | Incomplete QE in image | [Docker](#docker) |
| Identical energy between iterations | Stale QE output | [Convergence](#convergence) |
| `unknown chemical symbol` | Invalid chemical formula | [Invalid formula](#invalid-chemical-formula) |

---

## pw.x not found

**Symptom:**
```
ERROR: ❌ pw.x executable not found
```

**Solutions:**

```bash
python3 qe_runner.py input.in --qe-path /path/to/qe-7.0
export PATH="/path/to/qe-7.0/bin:$PATH"
python3 qe_runner.py input.in --pw /path/to/qe-7.0/bin/pw.x
```

---

## Invalid chemical formula

**Symptom:**
```
❌ Erreur: symbole chimique inconnu 'Bo' dans 'BBo'.
```

**Cause:** The string passed to `fetcher.py` or `qe-bridge` is not a valid chemical formula. Each segment must be a periodic-table element symbol (`Si`, `C`, `Ge`…).

**Triggering example:**
```bash
python3 fetcher.py BBo   # 'Bo' is not a valid element symbol
```

**Solution:** Check spelling and use only recognized element symbols:

```bash
python3 fetcher.py B     # Boron
python3 fetcher.py Si    # Silicon
python3 fetcher.py SiGe  # Silicon-germanium alloy
```

---

## MPI not found

**Symptom:**
```
WARNING: ⚠️  mpirun not found in PATH, running on single core
```

**Solution:**
```bash
sudo apt-get install -y libopenmpi-dev openmpi-bin
```

---

## Missing libraries

**Symptom:**
```
pw.x: error while loading shared libraries: libfftw3f.so.3: cannot open shared object file
```

**Solution:**
```bash
export LD_LIBRARY_PATH="/home/user/qe-7.0/lib:$LD_LIBRARY_PATH"
```

---

## MPI performance

```bash
export OMP_NUM_THREADS=1
python3 qe_runner.py input.in --nproc 4
```

---

## Missing plots

```bash
pip install plotext matplotlib
rm -rf __pycache__ *.pyc
python3 plotter.py epsilon_out/Si_epsr.dat
```

---

## Docker

If `pw.x` fails inside the container:

- Pull the latest image: `docker pull lauryneelv/qe-to-tcad:latest`
- Check mounted volume permissions: `docker run -v "$PWD:/data" ...`
- Pass `--epsilon empiric` (no Y/N prompt without `-it`)
- With `sudo docker`, pass the key explicitly: `-e MP_API_KEY="your_key"`
- On Mac Apple Silicon: add `--platform linux/amd64` if the image does not start

:::note Older images (&lt; 0.2.7)
Since 0.2.7, OpenMPI allows `mpirun` as root in the image. Only use `-e OMPI_ALLOW_RUN_AS_ROOT=1` when troubleshooting older images.
:::

---

## Convergence

If energy is identical between iterations, delete stale files in `out/` and rerun.

## See also

- [Installation](/docs/setup/installation)
- [Optimization](/docs/setup/optimization)
