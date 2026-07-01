---
sidebar_position: 3
title: Usage
---

# Usage

This guide covers common use cases for **The APE Bridge**.

## Run the full pipeline

The main command is `qe-bridge`:

```bash
qe-bridge <chemical_formula>

# Examples
qe-bridge C      # Carbon (diamond)
qe-bridge Si     # Silicon
qe-bridge Ge     # Germanium
```

Equivalent module mode:

```bash
python3 -m qe_to_tcad Si
```

## Output directories

| Folder | Content |
|--------|---------|
| `generated_inputs/` | Generated QE `.in` files |
| `epsilon_out/` | Raw `epsilon.x` results |
| `convergence_data/` | JSON convergence traces |
| `parsed_data/` | Structured JSON for TCAD |
| `plots/` | 300 DPI PNG figures |

## Visualize the dielectric function

```bash
# Terminal display (SSH-friendly)
python3 plotter.py epsilon_out/C_epsr.dat

# High-resolution PNG
python3 plotter.py epsilon_out/Si_epsr.dat --verbose
```

## TCAD export (JSON)

```python
from fetcher import MaterialAnalyzer

analyzer = MaterialAnalyzer("Si")
data = analyzer.export_for_tcad()

import json
with open("Si_for_TCAD.json", "w") as f:
    json.dump(data, f, indent=2)
```

## DEVSIM validation

```bash
python3 plot_complet.py parsed_data/SiGe.json diode
python3 plot_complet.py parsed_data/SiGe.json transistor
```

See [TCAD integration](/docs/tcad-integration) for more details.

## See also

- [CLI reference](/docs/reference/cli)
- [Optimization](/docs/setup/optimization)
