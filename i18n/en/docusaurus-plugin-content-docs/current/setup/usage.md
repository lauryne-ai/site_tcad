---
sidebar_position: 3
title: Usage
---

# Usage

This guide covers common use cases for **The APE Bridge**.

## Full workflow (PyPI)

```bash
pip install 'qe-to-tcad[tcad]'
```

Then export your Materials Project key (see [Installation](/docs/setup/installation#materials-project-api-key-required)), and run:

```bash
qe-bridge SiGe          # 1. Calculation + JSON export
qe-plot SiGe            # 2. Plot ε(ω)
qe-tcad SiGe diode      # 3a. Diode validation
qe-tcad SiGe transistor # 3b. Transistor validation
```

## Run the full pipeline

The main command is `qe-bridge`:

```bash
# Syntax
qe-bridge <chemical_formula>

# Examples
qe-bridge C      # Carbon (diamond)
qe-bridge Si     # Silicon
qe-bridge Ge     # Germanium
qe-bridge SiGe   # Silicon-germanium
```

Equivalent module mode:

```bash
python3 -m qe_to_tcad Si
```

### Expected output

```
✓ Structure downloaded: Diamond (Fd-3m)
✓ Pseudopotential: C_ONCV_PBE-1.0.upf
✓ SCF convergence succeeded
✓ NSCF calculations succeeded (1728 k-points)
✓ Epsilon extracted: epsilon_out/C_epsr.dat
✓ PNG figure: plots/C_dielectric_dispersion.png
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
qe-plot SiGe
qe-plot C
```

### Advanced scripts (source repository)

If you work from the cloned repository:

```bash
# Terminal display (SSH-friendly)
python3 plotter.py epsilon_out/C_epsr.dat

# High-resolution PNG
python3 plotter.py epsilon_out/Si_epsr.dat --verbose
python3 plotter.py epsilon_out/Ge_epsr.dat --downsample 10
```

## Convergence curves

```bash
# Terminal display (source repository)
python3 plot_convergence_progressive.py convergence_data/C_convergence.json

# Also generates: plots/C_convergence_*.png
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

The JSON includes:

```json
{
  "material": "Si",
  "epsilon_static": 12.047,
  "plasma_frequency_eV": 15.342,
  "energy_eV": [0.001, 0.002, "..."],
  "epsr_x": ["..."],
  "epsr_y": ["..."],
  "epsr_z": ["..."]
}
```

## TCAD simulations (diode / transistor)

```bash
qe-tcad SiGe diode
qe-tcad SiGe transistor
```

### Advanced scripts (source repository)

```bash
python3 plot_complet.py parsed_data/SiGe.json diode
python3 plot_complet.py parsed_data/SiGe.json transistor
```

See [TCAD integration](/docs/tcad-integration) for more details.

## Advanced options

```bash
# Specify pw.x path
qe-bridge Si --pw /path/to/pw.x --nproc 4

# Light mode (fewer k-points, for tests)
python3 fetcher.py C --light_mode
```

## See also

- [CLI reference](/docs/reference/cli)
- [Optimization](/docs/setup/optimization)
- [Data formats](/docs/architecture/data-formats)
