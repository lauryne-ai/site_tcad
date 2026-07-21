---
sidebar_position: 2
title: Installation
---

# Installation

Ce guide couvre l'installation de **The APE Bridge** et de ses dépendances système (Python, Quantum ESPRESSO, MPI).

## Installation via PyPI (recommandé)

```bash
# Pipeline + plotting + simulations TCAD (diode / transistor)
pip install 'qe-to-tcad[tcad]'

# Vérifier
qe-bridge --help
qe-plot --help
qe-tcad --help
```

:::tip Extra `[tcad]`
L'extra `[tcad]` installe les dépendances nécessaires au tracé ε(ω) et aux simulations diode / transistor.
:::

## Installation depuis le dépôt (développement)

```bash
# 1. Cloner le dépôt
git clone https://github.com/LauryneEklou/QE_to_TCAD.git
cd QE_to_TCAD

# 2. Créer l'environnement virtuel
python3 -m venv .venv

# Linux / macOS
source .venv/bin/activate

# Windows (PowerShell)
# .\.venv\Scripts\Activate.ps1

# 3. Installer le package
pip install --upgrade pip setuptools
pip install -e '.[tcad]'

# 4. Vérifier
qe-bridge --help
qe-plot --help
qe-tcad --help
```

## Clé API Materials Project (obligatoire)

Pour des raisons de sécurité, **aucune clé API n'est fournie** avec le package.
Chaque utilisateur doit créer la sienne avant de lancer `qe-bridge` :

1. Créer un compte sur [Materials Project](https://next-gen.materialsproject.org/)
2. Générer une clé API (32 caractères) dans le profil
3. L'exporter dans le shell :

**Linux / macOS :**

```bash
export MP_API_KEY="votre_cle_32_caracteres"
```

**Windows (PowerShell) :**

```powershell
$env:MP_API_KEY="votre_cle_32_caracteres"
```

**Windows (Invite de commandes) :**

```bat
set MP_API_KEY=votre_cle_32_caracteres
```

:::danger Ne jamais committer la clé
N'ajoutez pas `MP_API_KEY` dans un fichier versionné (`.env` poussé sur GitHub, Dockerfile, etc.).
Utilisez uniquement l'environnement local ou un `.env` **non versionné**.
:::

## Prérequis système

- **OS** : Linux, macOS ou Windows (Docker Desktop recommandé sous Windows pour QE)
- **Python** : 3.10+
- **Quantum ESPRESSO** : v7.0+ avec `pw.x` et `epsilon.x` (sauf si vous utilisez Docker)
- **MPI** : OpenMPI ≥ 3.0 ou MPICH ≥ 3.3 (sauf Docker)
- **Espace disque** : 20 GiB recommandé

## Configuration Quantum ESPRESSO

### Option A : Installation système (Linux)

```bash
# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y libopenmpi-dev openmpi-bin quantum-espresso

# Vérifier
which pw.x && which epsilon.x
```

### Option B : Compilation depuis les sources (Linux / macOS)

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

Créez un fichier `.env` **local** à la racine du projet (optionnel, ne pas le committer) :

```bash
QE_PATH=/chemin/vers/q-e/bin
MPI_COMMAND=mpirun
MPI_NPROC=4
PSEUDOPOTENTIAL_DIR=/chemin/vers/pseudopotentials/
MP_API_KEY=votre_cle_materials_project
```

Consultez la [référence des variables](/docs/reference/env) pour le détail.

## Option Docker

Image publiée : `lauryneelv/qe-to-tcad:0.2.4`

### 1. Préparer un dossier de travail

**Linux / macOS :**

```bash
mkdir -p ~/qe_runs
cd ~/qe_runs
```

**Windows (PowerShell) :**

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\qe_runs"
cd $HOME\qe_runs
```

**Windows (Invite de commandes) :**

```bat
mkdir %USERPROFILE%\qe_runs
cd %USERPROFILE%\qe_runs
```

### 2. Exporter la clé API

Voir la section [Clé API Materials Project](#clé-api-materials-project-obligatoire) ci-dessus.
Requis pour `qe-bridge` ; optionnel pour `qe-plot` et `qe-tcad` (données locales).

### 3. Lancer les commandes

Depuis le dossier de travail (le dossier courant est monté dans `/data`) :

**Linux / macOS :**

```bash
# Pipeline QE → TCAD
docker run --rm -e MP_API_KEY -v "$PWD:/data" -w /data \
  lauryneelv/qe-to-tcad:0.2.4 SiGe

# Tracé de la fonction diélectrique ε(ω)
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-plot lauryneelv/qe-to-tcad:0.2.4 SiGe

# Simulation diode 1D
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:0.2.4 SiGe diode

# Simulation transistor 1D
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:0.2.4 SiGe transistor
```

**Windows (PowerShell) :**

```powershell
docker run --rm -e MP_API_KEY -v "${PWD}:/data" -w /data `
  lauryneelv/qe-to-tcad:0.2.4 SiGe

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-plot lauryneelv/qe-to-tcad:0.2.4 SiGe

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:0.2.4 SiGe diode

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:0.2.4 SiGe transistor
```

:::tip Windows
Avec Docker Desktop, utilisez PowerShell. Si le montage du volume échoue, remplacez `"$PWD:/data"` / `"${PWD}:/data"` par un chemin absolu, par exemple `C:\Users\Vous\qe_runs:/data`.
:::

| Commande | Rôle | `MP_API_KEY` |
|----------|------|--------------|
| `qe-bridge` (entrypoint par défaut) | Calcul QE + export JSON | **Oui** (`-e MP_API_KEY`) |
| `qe-plot` | Tracé ε(ω) | Non (données locales) |
| `qe-tcad … diode` | Simulation diode | Non |
| `qe-tcad … transistor` | Simulation transistor | Non |

Les résultats sont écrits dans le volume monté (dossier courant → `/data`).

:::caution
Le paquet `quantum-espresso` de certaines distributions Debian peut être incomplet. En cas d'échec de `pw.x`, préférez une compilation depuis les sources ou l'image Docker.
:::

## Vérification finale

```bash
# Pipeline court (après export de MP_API_KEY)
qe-bridge C

# Plot + validation TCAD
qe-plot C
qe-tcad C diode
```

## Voir aussi

- [Erreurs fréquentes](/docs/setup/troubleshooting) — si l'installation échoue
- [Référence CLI](/docs/reference/cli) — `qe-bridge`, `qe-plot`, `qe-tcad`
- [Utilisation](/docs/setup/usage)
