---
sidebar_position: 1
title: CLI
---

# CLI reference

The commands below are installed via:

```bash
pip install 'qe-to-tcad[tcad]'
```

## `qe-bridge`

Main pipeline: Materials Project → Quantum ESPRESSO → TCAD JSON export.

```bash
qe-bridge <chemical_formula> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `chemical_formula` | Symbol or formula (e.g. `C`, `Si`, `SiGe`) |

### Common options

| Option | Description |
|--------|-------------|
| `--epsilon MODE` | ε source: `empiric` (fast, recommended), `compute` (`epsilon.x`), `mp` (Materials Project), `ask` (interactive prompt) |
| `--pw PATH` | Path to `pw.x` |
| `--nproc N` | Number of MPI processes |
| `--qe-path PATH` | QE bin directory |
| `--help` | Show help |

### Examples

```bash
qe-bridge SiGe --epsilon empiric
qe-bridge Si --nproc 8 --epsilon compute
qe-bridge Ge --pw /opt/qe/bin/pw.x
```

:::info API key and Docker
`qe-bridge` requires `MP_API_KEY` (see [Installation](/docs/setup/installation#prerequisite-materials-project-api-key)).
Under Docker **without** `-it`, always pass `--epsilon` (no Y/N prompt).
:::

## `qe-plot`

Plots the dielectric function ε(ω) for a material that has already been computed.

```bash
qe-plot <chemical_formula>
```

### Examples

```bash
qe-plot SiGe
qe-plot C
```

## `qe-tcad`

Runs a 1D device simulation (diode or transistor) from exported data.

```bash
qe-tcad <chemical_formula> <device>
```

| Argument | Values |
|----------|--------|
| `chemical_formula` | e.g. `Si`, `SiGe`, `C` |
| `device` | `diode` or `transistor` |

### Examples

```bash
qe-tcad SiGe diode
qe-tcad SiGe transistor
```

## `python3 -m qe_to_tcad`

Equivalent to `qe-bridge`:

```bash
python3 -m qe_to_tcad Si
```

## Utility scripts (source repository)

| Command | Description |
|---------|-------------|
| `python3 fetcher.py <formula>` | Direct orchestrator |
| `python3 qe_runner.py <file.in>` | Low-level QE execution |
| `python3 plotter.py <file.dat>` | Plot ε(ω) (low-level equivalent of `qe-plot`) |
| `python3 plot_convergence.py <mat>` | Convergence curves |
| `python3 plot_complet.py <json> diode\|transistor` | DEVSIM validation (low-level equivalent of `qe-tcad`) |
| `python3 convergence_manager.py` | Standalone convergence |

## Tests

```bash
python3 -m pytest tests/ -v
python3 verify_convergence_manager.py
```

## See also

- [Environment variables](/docs/reference/env)
- [Usage](/docs/setup/usage)
- [Docker installation](/docs/setup/installation#docker-option)
