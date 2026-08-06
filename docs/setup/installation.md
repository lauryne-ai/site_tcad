---
sidebar_position: 2
title: Installation
---

# Installation

Ce guide couvre l'installation de **The APE Bridge** et de ses dépendances système (Python, Quantum ESPRESSO, MPI).

## Prérequis : clé API Materials Project

Avant toute utilisation, vous devez obtenir votre propre clé API. **Aucune clé n'est fournie** avec le package (pour des raisons de sécurité).

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

## Installation via PyPI (recommandé)

```bash
# Pipeline + plotting + simulations TCAD (diode / transistor)
pip install --upgrade 'qe-to-tcad[tcad]'

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

## Prérequis système

- **OS** : Linux, macOS ou Windows (Docker Desktop recommandé sous Windows pour QE)
- **Python** : 3.10+
- **Quantum ESPRESSO** : v7.0+ avec `pw.x` et `epsilon.x` (sauf si vous utilisez Docker)
- **MPI** : OpenMPI ≥ 3.0 ou MPICH ≥ 3.3 (sauf Docker)
- **Espace disque** : 20 GiB recommandé

## Configuration Quantum ESPRESSO

:::info Utilisateurs Docker
Si vous utilisez Docker (voir [plus bas](#option-docker)), vous pouvez **ignorer** cette section — QE est déjà inclus dans l'image.
:::

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

Image all-in-one : `lauryneelv/qe-to-tcad:latest` (Quantum ESPRESSO + DEVSIM + `qe-bridge`, `qe-plot`, `qe-tcad`).

**Prérequis :** Docker + `MP_API_KEY` (32 caractères Materials Project) — voir [Prérequis : clé API](#prérequis--clé-api-materials-project).

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

### 2. Télécharger l'image

```bash
docker pull lauryneelv/qe-to-tcad:latest
```

### 3. Option `--epsilon` (obligatoire sans `-it`)

Sous Docker **sans** `-it`, il n'y a **pas de prompt Y/N**. Il faut préciser `--epsilon` :

| Valeur | Rôle |
|--------|------|
| `empiric` | **Recommandé** — run rapide (ε empirique) |
| `compute` | Force le calcul `epsilon.x` (long / disque) |
| `mp` | Valeur Materials Project |
| `ask` | Prompt interactif — **uniquement avec `-it`** |

### 4. Lancer les commandes

Depuis le dossier de travail (le dossier courant est monté dans `/data`) :

**Linux / macOS (bash) :**

```bash
# Pipeline QE → TCAD (recommandé : empiric = rapide)
docker run --rm -e MP_API_KEY -v "$PWD:/data" -w /data \
  lauryneelv/qe-to-tcad:latest SiGe --epsilon empiric

# Forcer le calcul epsilon.x (long / disque)
docker run --rm -e MP_API_KEY -v "$PWD:/data" -w /data \
  lauryneelv/qe-to-tcad:latest SiGe --epsilon compute

# Prompt interactif Y/N (nécessite -it)
docker run --rm -it -e MP_API_KEY -v "$PWD:/data" -w /data \
  lauryneelv/qe-to-tcad:latest SiGe

# Tracé de la fonction diélectrique ε(ω)
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-plot lauryneelv/qe-to-tcad:latest SiGe

# Simulation diode 1D
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:latest SiGe diode

# Simulation transistor 1D
docker run --rm -v "$PWD:/data" -w /data \
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:latest SiGe transistor
```

**Windows (PowerShell) :**

```powershell
$env:MP_API_KEY = "your_32_char_key"
docker pull lauryneelv/qe-to-tcad:latest

docker run --rm -e MP_API_KEY -v "${PWD}:/data" -w /data `
  lauryneelv/qe-to-tcad:latest SiGe --epsilon empiric

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-plot lauryneelv/qe-to-tcad:latest SiGe

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:latest SiGe diode

docker run --rm -v "${PWD}:/data" -w /data `
  --entrypoint qe-tcad lauryneelv/qe-to-tcad:latest SiGe transistor
```

:::tip Notes Docker
- **`sudo docker`** : `sudo` ne conserve pas un `export` préalable — écrivez `-e MP_API_KEY="votre_clé"` dans la commande.
- **Mac Apple Silicon** : si l'image ne démarre pas, ajoutez `--platform linux/amd64`.
- Si le montage du volume échoue sous Windows, utilisez un chemin absolu, ex. `C:\Users\Vous\qe_runs:/data`.
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
