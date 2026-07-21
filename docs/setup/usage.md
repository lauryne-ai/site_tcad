---
sidebar_position: 3
title: Utilisation
---

# Utilisation

Ce guide présente les cas d'usage courants de **The APE Bridge**.

## Workflow complet (PyPI)

```bash
pip install 'qe-to-tcad[tcad]'
```

Exportez ensuite votre clé Materials Project (voir [Installation](/docs/setup/installation#clé-api-materials-project-obligatoire)), puis :

```bash
qe-bridge SiGe          # 1. Calcul + export JSON
qe-plot SiGe            # 2. Tracer ε(ω)
qe-tcad SiGe diode      # 3a. Validation diode
qe-tcad SiGe transistor # 3b. Validation transistor
```

## Lancer le pipeline complet

La commande principale est `qe-bridge` :

```bash
# Syntaxe
qe-bridge <formule_chimique>

# Exemples
qe-bridge C      # Carbone (diamant)
qe-bridge Si     # Silicium
qe-bridge Ge     # Germanium
qe-bridge SiGe   # Silicium-germanium
```

Équivalent en mode module :

```bash
python3 -m qe_to_tcad Si
```

### Sortie attendue

```
✓ Structure téléchargée: Diamond (Fd-3m)
✓ Pseudopotential: C_ONCV_PBE-1.0.upf
✓ Convergence SCF réussie
✓ Calculs NSCF réussis (1728 k-points)
✓ Epsilon extrait: epsilon_out/C_epsr.dat
✓ Figure PNG: plots/C_dielectric_dispersion.png
```

## Répertoires de sortie

| Dossier | Contenu |
|---------|---------|
| `generated_inputs/` | Fichiers `.in` QE générés |
| `epsilon_out/` | Résultats bruts `epsilon.x` |
| `convergence_data/` | Traces JSON de convergence |
| `parsed_data/` | JSON structurés pour TCAD |
| `plots/` | Figures PNG 300 DPI |

## Visualiser la fonction diélectrique

```bash
qe-plot SiGe
qe-plot C
```

### Scripts avancés (dépôt source)

Si vous travaillez depuis le dépôt cloné :

```bash
# Terminal (SSH-friendly)
python3 plotter.py epsilon_out/C_epsr.dat

# PNG haute résolution
python3 plotter.py epsilon_out/Si_epsr.dat --verbose
python3 plotter.py epsilon_out/Ge_epsr.dat --downsample 10
```

## Courbes de convergence

```bash
# Affichage terminal (dépôt source)
python3 plot_convergence_progressive.py convergence_data/C_convergence.json

# Génère aussi: plots/C_convergence_*.png
```

## Export TCAD (JSON)

```python
from fetcher import MaterialAnalyzer

analyzer = MaterialAnalyzer("Si")
data = analyzer.export_for_tcad()

import json
with open("Si_for_TCAD.json", "w") as f:
    json.dump(data, f, indent=2)
```

Le JSON contient notamment :

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

## Simulations TCAD (diode / transistor)

```bash
qe-tcad SiGe diode
qe-tcad SiGe transistor
```

### Scripts avancés (dépôt source)

```bash
python3 plot_complet.py parsed_data/SiGe.json diode
python3 plot_complet.py parsed_data/SiGe.json transistor
```

Voir [Intégration TCAD](/docs/tcad-integration) pour plus de détails.

## Options avancées

```bash
# Spécifier le chemin de pw.x
qe-bridge Si --pw /path/to/pw.x --nproc 4

# Mode léger (moins de k-points, pour tests)
python3 fetcher.py C --light_mode
```

## Voir aussi

- [Référence CLI](/docs/reference/cli)
- [Optimisation](/docs/setup/optimization)
- [Format des données](/docs/architecture/data-formats)
