---
sidebar_position: 4
title: Formats de données
---

# Formats de données

The APE Bridge produit des fichiers JSON structurés dans `parsed_data/`, prêts pour l'import dans les simulateurs TCAD.

## JSON électronique (`parsed_data/Si.json`)

Propriétés de bande et transport extraites du calcul NSCF :

```json
{
  "material_name": "Si",
  "fermi_level_ev": 9.5564,
  "bandgap_ev": 1.683,
  "is_gap_direct": true,
  "dielectric_constant": 15.863,
  "hole_effective_mass": 0.849,
  "electron_effective_mass": 0.124,
  "nc_cm3": 1.097e18,
  "nv_cm3": 1.964e19,
  "optimized_lattice_constant_ang": 5.768,
  "vbm_ev": 8.801,
  "cbm_ev": 10.484
}
```

### Champs principaux

| Champ | Unité | Description |
|-------|-------|-------------|
| `bandgap_ev` | eV | Gap de bande (VBM → CBM) |
| `dielectric_constant` | — | Constante diélectrique statique ε₀ |
| `hole_effective_mass` | m₀ | Masse effective des trous |
| `electron_effective_mass` | m₀ | Masse effective des électrons |
| `nc_cm3`, `nv_cm3` | cm⁻³ | Densités effectives de bande |
| `fermi_level_ev` | eV | Niveau de Fermi |
| `optimized_lattice_constant_ang` | Å | Maille optimisée |

## JSON optique / diélectrique

Export via `MaterialAnalyzer.export_for_tcad()` :

```json
{
  "material": "Si",
  "epsilon_static": 12.047,
  "plasma_frequency_eV": 15.342,
  "energy_eV": [0.001, 0.002, "...", 30.0],
  "epsr_x": ["..."],
  "epsr_y": ["..."],
  "epsr_z": ["..."]
}
```

## Fichiers bruts `epsilon_out/`

| Fichier | Contenu |
|---------|---------|
| `<mat>_epsr.dat` | Partie réelle εᵣ(ω) |
| `<mat>_epsi.dat` | Partie imaginaire εᵢ(ω) |

Format colonnes : énergie (eV), ε_x, ε_y, ε_z.

## Stratégie diélectrique

Le pipeline peut obtenir ε₀ par deux voies :

1. **Calcul `epsilon.x`** (CHOICE A) — précision maximale, coût CPU élevé
2. **Fallback Materials Project** (CHOICE B) — rapide, si l'API MP fournit la valeur

La stratégie est documentée dans le code via `get_dielectric_property()`.

## Bridge DEVSIM (`*_device_bridge.json`)

Format enrichi pour les simulations de dispositifs 1D avec DEVSIM, incluant les paramètres de recombinaison et de mobilité dérivés du JSON électronique.

## Voir aussi

- [Intégration TCAD](/docs/tcad-integration)
- [Utilisation](/docs/setup/usage)
