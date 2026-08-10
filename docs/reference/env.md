---
sidebar_position: 2
title: Variables d'environnement
---

# Variables d'environnement

QE-to-TCAD lit les variables depuis le fichier `.env` (via `python-dotenv`) ou l'environnement système.

## Fichier `.env` (exemple local)

Créez un fichier `.env` **uniquement en local**. Ne le committez jamais.

```bash
# Quantum ESPRESSO
QE_PATH=/chemin/vers/q-e/bin
QE_PW=/chemin/vers/q-e/bin/pw.x
QE_EPSILON=/chemin/vers/q-e/bin/epsilon.x

# MPI
MPI_COMMAND=mpirun
MPI_NPROC=4

# Pseudopotentiels
PSEUDOPOTENTIAL_DIR=/chemin/vers/pseudopotentials/

# Materials Project — votre clé personnelle uniquement
MP_API_KEY=votre_cle_api
```

:::danger Sécurité
Aucune clé API n'est fournie avec le package. Chaque utilisateur doit créer la sienne sur [Materials Project](https://next-gen.materialsproject.org/).
Ne poussez jamais un `.env` contenant `MP_API_KEY` sur GitHub.
:::

## Référence

| Variable | Description | Défaut |
|----------|-------------|--------|
| `QE_PATH` | Répertoire contenant `pw.x` et `epsilon.x` | Cherche dans `PATH` |
| `QE_PW` | Chemin absolu vers `pw.x` | — |
| `QE_EPSILON` | Chemin absolu vers `epsilon.x` | — |
| `MPI_COMMAND` | Commande MPI (`mpirun`, `srun`) | `mpirun` |
| `MPI_NPROC` | Nombre de processus MPI | `1` |
| `PSEUDOPOTENTIAL_DIR` | Répertoire des fichiers `.upf` | `pseudopotentials/` |
| `MP_API_KEY` | Clé API Materials Project | **Requis** pour `qe-bridge` |
| `OMP_NUM_THREADS` | Threads OpenMP (système) | `1` recommandé |

## Obtenir une clé Materials Project

1. Créer un compte sur [next-gen.materialsproject.org](https://next-gen.materialsproject.org/)
2. Générer une clé API (32 caractères) dans les paramètres du compte
3. Définir `MP_API_KEY` :

**Linux / macOS :**

```bash
export MP_API_KEY="votre_cle_32_caracteres"
```

**Windows (PowerShell) :**

```powershell
$env:MP_API_KEY="votre_cle_32_caracteres"
```

**Windows (CMD) :**

```bat
set MP_API_KEY=votre_cle_32_caracteres
```

Ou placez-la dans un `.env` local non versionné.

## Vérification

```bash
# Vérifier que les variables sont chargées
python3 -c "from dotenv import load_dotenv; import os; load_dotenv(); print('MP_API_KEY set:', bool(os.getenv('MP_API_KEY')))"

# Vérifier pw.x (installation locale, hors Docker)
which pw.x || echo "Définir QE_PATH ou --pw"
```

## Voir aussi

- [Installation](/docs/setup/installation)
- [Référence CLI](/docs/reference/cli)
