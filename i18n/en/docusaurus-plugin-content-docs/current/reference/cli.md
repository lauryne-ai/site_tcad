---
sidebar_position: 1
title: CLI
---

# Référence CLI

## `qe-bridge`

Commande principale installée via `pip install -e .`.

```bash
qe-bridge <formule_chimique> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `formule_chimique` | Symbole ou formule (ex. `C`, `Si`, `SiGe`) |

### Options courantes

| Option | Description |
|--------|-------------|
| `--pw PATH` | Chemin vers `pw.x` |
| `--epsilon PATH` | Chemin vers `epsilon.x` |
| `--nproc N` | Nombre de processus MPI |
| `--qe-path PATH` | Répertoire bin de QE |
| `--help` | Afficher l'aide |

### Exemples

```bash
qe-bridge C
qe-bridge Si --nproc 8
qe-bridge Ge --pw /opt/qe/bin/pw.x
```

## `python3 -m qe_to_tcad`

Équivalent au CLI :

```bash
python3 -m qe_to_tcad Si
```

## Scripts utilitaires

| Commande | Description |
|----------|-------------|
| `python3 fetcher.py <formule>` | Orchestrateur direct |
| `python3 qe_runner.py <fichier.in>` | Exécution QE bas niveau |
| `python3 plotter.py <fichier.dat>` | Tracer ε(ω) |
| `python3 plot_convergence.py <mat>` | Courbes de convergence |
| `python3 plot_complet.py <json> diode\|transistor` | Validation DEVSIM |
| `python3 convergence_manager.py` | Convergence standalone |

## Tests

```bash
python3 -m pytest tests/ -v
python3 verify_convergence_manager.py
```

## Voir aussi

- [Variables d'environnement](/docs/reference/env)
- [Utilisation](/docs/setup/usage)
