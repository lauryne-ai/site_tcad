---
sidebar_position: 4
title: Erreurs fréquentes
---

# Erreurs fréquentes

Ce guide regroupe les problèmes les plus courants, leurs causes et leurs solutions.

## Tableau récapitulatif

| Symptôme | Cause probable | Solution |
|----------|----------------|----------|
| `pw.x not found` | QE non installé ou absent du PATH | [pw.x introuvable](#pwx-introuvable) |
| `mpirun not found` | MPI non installé | [MPI](#mpi-introuvable) |
| `error while loading shared libraries` | Libs FFTW/MPI manquantes | [Bibliothèques](#bibliothèques-manquantes) |
| Calculs très lents | OpenMP + MPI mal configurés | [Performance MPI](#performance-mpi) |
| Pas de graphiques terminal | `plotext`/`matplotlib` absents ou cache Python | [Graphiques manquants](#graphiques-manquants) |
| `pw.x` exit code 1 (Docker) | QE incomplet dans l'image | [Docker](#docker) |
| Énergie identique entre itérations | Output QE non rafraîchi | [Convergence](#convergence) |
| `symbole chimique inconnu` | Formule chimique invalide | [Formule invalide](#formule-chimique-invalide) |

---

## pw.x introuvable

**Symptôme :**
```
ERROR: ❌ pw.x executable not found
```

**Solutions :**

1. Passer le chemin explicitement :
   ```bash
   python3 qe_runner.py input.in --qe-path /path/to/qe-7.0
   ```

2. Ajouter au PATH :
   ```bash
   export PATH="/path/to/qe-7.0/bin:$PATH"
   ```

3. Chemin absolu vers l'exécutable :
   ```bash
   python3 qe_runner.py input.in --pw /path/to/qe-7.0/bin/pw.x
   ```

4. Module HPC :
   ```bash
   module load quantumespresso
   ```

---

## MPI introuvable

**Symptôme :**
```
WARNING: ⚠️  mpirun not found in PATH, running on single core
```

**Solutions :**

```bash
# Ubuntu/Debian
sudo apt-get install -y libopenmpi-dev openmpi-bin

# CentOS/RHEL
sudo dnf install -y openmpi openmpi-devel
module load mpi/openmpi
```

---

## Bibliothèques manquantes

**Symptôme :**
```
pw.x: error while loading shared libraries: libfftw3f.so.3: cannot open shared object file
```

**Solution :**

```bash
export LD_LIBRARY_PATH="/home/user/qe-7.0/lib:$LD_LIBRARY_PATH"
```

Ou installer les dev packages :
```bash
sudo apt-get install -y libfftw3-dev   # Ubuntu
sudo dnf install -y fftw-devel          # Fedora
```

---

## Performance MPI

**Symptôme :** Calculs MPI plus lents que prévu, avertissements OpenMP.

**Solution :**

```bash
export OMP_NUM_THREADS=1
python3 qe_runner.py input.in --nproc 4
```

Une seule thread OpenMP par rang MPI est recommandée pour Quantum ESPRESSO.

---

## Graphiques manquants

**Symptôme :**
```
⚠ plotext non disponible. Installez avec: pip install plotext
⚠ matplotlib non disponible, graphiques PNG ignorés
```

**Solutions :**

1. Installer les dépendances :
   ```bash
   pip install plotext matplotlib
   ```

2. Nettoyer le cache Python :
   ```bash
   rm -rf __pycache__ *.pyc
   ```

3. Visualiser des données existantes :
   ```bash
   python3 plot_convergence.py Si
   python3 plotter.py epsilon_out/Si_epsr.dat
   ```

---

## Docker

**Symptôme :** `pw.x` échoue avec exit code 1 dans le conteneur.

**Causes :**
- Paquet QE Debian incomplet (anciennes images)
- Permissions insuffisantes sur `/data`

**Solutions :**
- Utiliser l'image à jour : `docker pull lauryneelv/qe-to-tcad:latest`
- Vérifier les permissions du volume monté : `docker run -v "$PWD:/data" ...`
- Préciser `--epsilon empiric` (pas de prompt Y/N sans `-it`)
- Avec `sudo docker`, passer la clé explicitement : `-e MP_API_KEY="votre_clé"`
- Sur Mac Apple Silicon : ajouter `--platform linux/amd64` si l'image ne démarre pas

:::note Anciennes images (&lt; 0.2.7)
Depuis 0.2.7, OpenMPI autorise `mpirun` en root dans l'image. Ne documentez `-e OMPI_ALLOW_RUN_AS_ROOT=1` que pour dépanner d'anciennes images.
:::

---

## Formule chimique invalide

**Symptôme :**
```
❌ Erreur: symbole chimique inconnu 'Bo' dans 'BBo'.
```

**Cause :** La chaîne passée à `fetcher.py` ou `qe-bridge` n'est pas une formule chimique valide. Chaque segment doit correspondre à un élément du tableau périodique (`Si`, `C`, `Ge`…), pas à une chaîne arbitraire.

**Exemple déclencheur :**
```bash
python3 fetcher.py BBo   # 'Bo' n'est pas un symbole chimique valide
```

**Solution :** Vérifiez l'orthographe de la formule. Utilisez uniquement des symboles d'éléments reconnus :

```bash
python3 fetcher.py B     # Bore
python3 fetcher.py Si    # Silicium
python3 fetcher.py SiGe  # Alliage silicium-germanium
```

---

## Convergence

**Symptôme :**
```
ERREUR: Mise à jour de l'input échouée! L'énergie est identique à l'itération précédente.
```

**Cause :** Ancien fichier `.out` non supprimé avant relance.

**Solution :** Le `convergence_manager` supprime automatiquement les outputs obsolètes. Si l'erreur persiste, supprimez manuellement les fichiers dans `out/` et relancez.

---

## Support

- [Guide d'installation](/docs/setup/installation)
- [Quantum ESPRESSO — manuel utilisateur](https://www.quantum-espresso.org/users-manual/)
- [GitHub Issues](https://github.com/LauryneEklou/QE_to_TCAD/issues)
