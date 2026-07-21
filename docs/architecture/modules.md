---
sidebar_position: 5
title: Modules
---

# Modules du projet

Référence des principaux fichiers Python et de leur rôle dans le pipeline.

## Orchestration

| Module | Rôle |
|--------|------|
| `fetcher.py` | Point d'entrée : fetch MP → génération → run → convergence → parse → plot |
| `qe_to_tcad/cli.py` | Interface CLI `qe-bridge` |
| `convergence_manager.py` | 4 phases de convergence + pipeline optique |

## Entrées Quantum ESPRESSO

| Module | Rôle |
|--------|------|
| `qe_input_generator.py` | Structure pymatgen → fichiers `.in` QE |
| `qe_input_template.py` | Classe `QEInputTemplate` pour réécriture fiable |
| `par_generator.py` | Génération de fichiers de paramètres |

## Exécution

| Module | Rôle |
|--------|------|
| `qe_runner.py` | Lance `pw.x` / `epsilon.x` avec MPI, détection d'erreurs |
| `kpoint_predictor.py` | Suggestion de grilles k adaptées |

## Extraction & export

| Module | Rôle |
|--------|------|
| `parse_tcad_parameters.py` | Parse sorties QE → JSON TCAD |
| `devsim_bridge.py` | Pont QE → DEVSIM, classe `DeviceSimulator` |

## Visualisation

| Module | Rôle |
|--------|------|
| `plotter.py` | Courbes ε(ω) terminal + PNG 300 DPI |
| `plot_convergence.py` | Graphiques de convergence |
| `plot_convergence_progressive.py` | Animation temps-réel de la convergence |
| `plot_complet.py` | Validation DEVSIM diode/transistor/senseur |

## TCAD & validation

| Module | Rôle |
|--------|------|
| `plot_complet.py` | Simulation 1D diode ou transistor |
| `test_srh_diode.py` | Benchmark diode avec/sans recombinaison SRH |
| `devsim_cv_ac.py` | Analyse C(V) |
| `phonon.py` | Calculs phonons (auxiliaire) |

## Utilitaires

| Module | Rôle |
|--------|------|
| `clean_save_directories.py` | Nettoyage des répertoires `out/` |
| `verify_convergence_manager.py` | Validation du gestionnaire de convergence |

## Package installable

Le package `qe_to_tcad` (défini dans `pyproject.toml`) expose :

```bash
pip install 'qe-to-tcad[tcad]'
qe-bridge --help    # Pipeline QE → TCAD
qe-plot --help      # Tracé ε(ω)
qe-tcad --help      # Simulations diode / transistor
python3 -m qe_to_tcad Si   # Mode module (= qe-bridge)
```

## Voir aussi

- [Architecture — Vue d'ensemble](/docs/architecture/overview)
- [Référence CLI](/docs/reference/cli)
