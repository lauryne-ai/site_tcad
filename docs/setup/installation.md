---
sidebar_position: 2
title: Installation
---

# Installation

Ce guide couvre l'installation de **The APE Bridge** et de ses dépendances système (Python, Quantum ESPRESSO, MPI).

## Installation Python

```bash
# 1. Cloner le dépôt
git clone https://github.com/LauryneEklou/QE_to_TCAD.git
cd QE_to_TCAD

# 2. Créer l'environnement virtuel
python3 -m venv .venv
source .venv/bin/activate

# 3. Installer le package
pip install --upgrade pip setuptools
pip install -e .

# 4. Vérifier
python3 -c "import numpy; import matplotlib; print('✓ Setup OK')"
qe-bridge --help
```

## Prérequis système

- **OS** : Linux (Ubuntu 20.04+, Fedora 35+) ou macOS
- **Python** : 3.10+
- **Quantum ESPRESSO** : v7.0+ avec `pw.x` et `epsilon.x`
- **MPI** : OpenMPI ≥ 3.0 ou MPICH ≥ 3.3
- **Espace disque** : 20 GiB recommandé

## Configuration Quantum ESPRESSO

### Option A : Installation système

```bash
# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y libopenmpi-dev openmpi-bin quantum-espresso

# Vérifier
which pw.x && which epsilon.x
```

### Option B : Compilation depuis les sources

```bash
# Installer les dépendances de build
sudo apt-get install -y gfortran make cmake libfftw3-dev libopenmpi-dev

# Télécharger et compiler QE (exemple)
git clone https://gitlab.com/QEF/q-e.git
cd q-e
./configure --prefix=$HOME/qe-7.0
make -j $(nproc) pw
make -j $(nproc) epsilon
```

### Option C : Script fourni dans le dépôt

```bash
cd third_party/
./build_qe.sh
```

## Variables d'environnement

Créez un fichier `.env` à la racine du projet (optionnel) :

```bash
QE_PATH=/home/user/q-e-7.0/bin
MPI_COMMAND=mpirun
MPI_NPROC=4
PSEUDOPOTENTIAL_DIR=/home/user/.qe_pseudo/
MP_API_KEY=votre_cle_materials_project
```

Consultez la [référence des variables](/docs/reference/env) pour le détail.

## Option Docker

Pour un environnement isolé avec QE pré-installé :

```bash
# Build
docker build -t qe-to-tcad:latest .

# Lancer un calcul
mkdir -p ~/qe_work/data
docker run --rm -v ${PWD}:/data qe-to-tcad:latest Si
```

Les résultats sont écrits dans le volume monté (`/data`).

:::caution
Le paquet `quantum-espresso` de certaines distributions Debian peut être incomplet. En cas d'échec de `pw.x`, préférez une compilation depuis les sources ou l'image Docker.
:::

## Vérification finale

```bash
# Tester pw.x
python3 qe_runner.py generated_inputs/C.scf.in --nproc 1

# Tester le pipeline complet (court)
qe-bridge C
```

## Voir aussi

- [Erreurs fréquentes](/docs/setup/troubleshooting) — si l'installation échoue
- [Référence CLI](/docs/reference/cli) — options de `qe-bridge`
