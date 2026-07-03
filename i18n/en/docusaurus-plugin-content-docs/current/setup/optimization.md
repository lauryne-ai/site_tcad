---
sidebar_position: 5
title: Optimization
---

# Optimisation

Ce guide couvre les réglages pour **accélérer les calculs** et **améliorer la convergence** sans sacrifier la précision physique.

## Variables MPI et OpenMP

```bash
# Recommandé pour QE
export OMP_NUM_THREADS=1
export MPI_NPROC=4

qe-bridge Si --nproc 4
```

| Variable | Description | Valeur recommandée |
|----------|-------------|-------------------|
| `MPI_NPROC` | Nombre de rangs MPI | Nombre de cœurs physiques |
| `OMP_NUM_THREADS` | Threads OpenMP par rang | `1` |
| `MPI_COMMAND` | Commande MPI | `mpirun` ou `srun` (HPC) |

## Convergence automatisée

Le `convergence_manager` exécute **4 phases** séquentielles :

| Phase | Paramètre | Plage typique |
|-------|-----------|---------------|
| 1 | `ecutwfc` | 30 → 120 Ry (pas de 10) |
| 2 | Grille k-points | 4×4×4 → 12×12×12 |
| 3 | Constante de maille | ±5 % autour de la valeur MP |
| 4 | Pipeline optique | SCF → NSCF → `epsilon.x` |

Chaque phase s'arrête lorsque la variation d'énergie est inférieure au seuil configuré (`conv_thr = 10⁻⁸ Ry`).

:::tip Prédicteur de k-points
Le module `kpoint_predictor.py` propose des grilles k adaptées à la structure cristalline, réduisant le nombre d'itérations inutiles.
:::

## Benchmarks indicatifs

| Matériau | K-points | Temps CPU | Mémoire | Disque |
|----------|----------|-----------|---------|--------|
| C (diamant) | 8×8×8 | ~45 min | 2 GiB | 3 GiB |
| Si | 12×12×12 | ~180 min | 6 GiB | 12 GiB |
| Ge | 12×12×12 | ~240 min | 8 GiB | 15 GiB |

## Mode léger (tests rapides)

Pour valider l'installation sans lancer un calcul complet :

```bash
python3 fetcher.py C --light_mode_mode
```

Réduit la grille k-points et le nombre de bandes pour un test en quelques minutes.

## Paramètres QE recommandés

| Paramètre | Valeur | Justification |
|-----------|--------|---------------|
| `Ecutwfc` | 60 Ry | Convergence énergétique < 0.001 Ry |
| `Ecutrho` | 240 Ry | 4× Ecutwfc |
| `K-points` | 12×12×12 | Convergence spectrale < 1 meV |
| `Pseudopotential` | ONCV-PBE | Haute précision pour les bandes |
| `Smearing` | Marzari-Vanderbilt 0.02 eV | Régularisation métallique/semiconducteur |

## Parallélisation k-point pools

Pour les grilles k denses (12×12×12 = 1728 points), utilisez plusieurs processus MPI :

```bash
qe-bridge Si --nproc 8
```

Sur un cluster HPC :

```bash
module load mpi/openmpi
export OMP_NUM_THREADS=1
srun -n 16 qe-bridge Si
```

## Nettoyage des répertoires de travail

Les calculs QE génèrent des fichiers volumineux dans `out/`. Nettoyez régulièrement :

```bash
python3 clean_save_directories.py
```

## Voir aussi

- [Architecture — Convergence](/docs/architecture/convergence)
- [Common errors — MPI performance](/docs/setup/troubleshooting#mpi-performance)
