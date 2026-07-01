---
sidebar_position: 2
title: Variables d'environnement
---

# Variables d'environnement

The APE Bridge lit les variables depuis le fichier `.env` (via `python-dotenv`) ou l'environnement système.

## Fichier `.env` (exemple)

```bash
# Quantum ESPRESSO
QE_PATH=/home/user/q-e-7.0/bin
QE_PW=/home/user/q-e-7.0/bin/pw.x
QE_EPSILON=/home/user/q-e-7.0/bin/epsilon.x

# MPI
MPI_COMMAND=mpirun
MPI_NPROC=4

# Pseudopotentiels
PSEUDOPOTENTIAL_DIR=/home/user/.qe_pseudo/

# Materials Project
MP_API_KEY=votre_cle_api
```

## Référence

| Variable | Description | Défaut |
|----------|-------------|--------|
| `QE_PATH` | Répertoire contenant `pw.x` et `epsilon.x` | Cherche dans `PATH` |
| `QE_PW` | Chemin absolu vers `pw.x` | — |
| `QE_EPSILON` | Chemin absolu vers `epsilon.x` | — |
| `MPI_COMMAND` | Commande MPI (`mpirun`, `srun`) | `mpirun` |
| `MPI_NPROC` | Nombre de processus MPI | `1` |
| `PSEUDOPOTENTIAL_DIR` | Répertoire des fichiers `.upf` | `pseudopotentials/` |
| `MP_API_KEY` | Clé API Materials Project | Requis pour fetch structures |
| `OMP_NUM_THREADS` | Threads OpenMP (système) | `1` recommandé |

## Obtenir une clé Materials Project

1. Créer un compte sur [materialsproject.org](https://materialsproject.org/)
2. Générer une clé API dans les paramètres du compte
3. Définir `MP_API_KEY` dans `.env` ou :
   ```bash
   export MP_API_KEY="votre_cle"
   ```

## Vérification

```bash
# Vérifier que les variables sont chargées
python3 -c "from dotenv import load_dotenv; import os; load_dotenv(); print(os.getenv('QE_PATH'))"

# Vérifier pw.x
which pw.x || echo "Définir QE_PATH ou --pw"
```

## Voir aussi

- [Installation](/docs/setup/installation)
- [Référence CLI](/docs/reference/cli)
