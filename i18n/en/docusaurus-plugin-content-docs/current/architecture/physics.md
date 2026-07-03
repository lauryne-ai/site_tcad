---
sidebar_position: 2
title: Physics
---

# Physique & Méthodologie

Le calcul de la **fonction diélectrique** ε(ω) suit une approche rigoureuse en trois phases, basée sur la théorie de la fonctionnelle de la densité (DFT) et la théorie de perturbation linéaire.

## Phase 1 : Auto-cohérence (SCF)

```
pw.x (SCF) → Densité électronique ρ (état fondamental)
```

- Calcul de la structure de bandes et de la densité d'états au niveau de Fermi
- Condition d'arrêt : énergie convergée (`conv_thr = 10⁻⁸` Ry)
- Pseudopotentiels **Norm-Conserving (NC)** pour haute précision spectrale

## Phase 2 : Bandes non auto-cohérentes (NSCF)

```
pw.x (NSCF) → Énergies & états propres aux k-points
```

- Grille uniforme de points k : typiquement **12×12×12** (1728 k-points)
- Nombre de bandes suffisant pour couvrir états occupés + bandes vides
- Diagonalisation exacte pour haute précision

## Phase 3 : Fonction diélectrique

```
epsilon.x → ε(ω) = εᵣ(ω) + i·εᵢ(ω)
```

- Calcul via théorie de perturbation linéaire (DFPT)
- Extraction des **fréquences de plasma** (ω_p)
- Constante diélectrique statique **ε₀**

## Propriétés extraites

| Propriété | Symbole | Usage TCAD |
|-----------|---------|------------|
| Constante diélectrique statique | ε₀ | Capacité, champ électrique |
| Fréquence de plasma | ω_p | Comportement optique haute énergie |
| Dispersion complète | ε(ω) | Réponse optique du matériau |
| Composantes tensorielles | ε_x, ε_y, ε_z | Matériaux anisotropes |

## Paramètres numériques par défaut

| Paramètre | Valeur | Justification |
|-----------|--------|---------------|
| **Ecutwfc** | 60 Ry | Convergence énergétique < 0.001 Ry |
| **Ecutrho** | 240 Ry | 4× Ecutwfc pour densité lisse |
| **K-points** | 12×12×12 | Convergence spectrale < 1 meV |
| **Pseudopotential** | ONCV-PBE | Haute précision pour les bandes |
| **Smearing** | Marzari-Vanderbilt 0.02 eV | Régularisation électronique |

## Références

- Gonze & Lee (1997) — *Phys. Rev. B* 55, 10355 (réponse diélectrique en DFPT)
- [Quantum ESPRESSO — documentation epsilon.x](https://www.quantum-espresso.org/)

## Voir aussi

- [Format des données](/docs/architecture/data-formats)
- [Convergence](/docs/architecture/convergence)
