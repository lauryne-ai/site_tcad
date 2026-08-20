# Déploiements GitHub Pages (2 URLs)

## 1) Documentation projet (déjà en place)

| URL | Dépôt |
|-----|--------|
| https://quantum-arise-acad.github.io/site_tcad/ | `Quantum-ARISE-Acad/site_tcad` |
| https://lauryne-ai.github.io/site_tcad/ | `lauryne-ai/site_tcad` |

Pousser le même code sur les deux remotes :

```bash
cd ~/site_Tcad
git remote add personal https://github.com/lauryne-ai/site_tcad.git   # une seule fois
git push origin main      # organisation
git push personal main    # compte lauryne-ai
```

Sur **chaque** dépôt : Settings → Pages → Source = **GitHub Actions**.

## 2) Page d’accueil organisation (racine)

| URL | Dépôt (nom exact) |
|-----|-------------------|
| https://quantum-arise-acad.github.io/ | `Quantum-ARISE-Acad/Quantum-ARISE-Acad.github.io` |

Le contenu est dans `org-github-io/` (landing **QE-to-TCAD**).

### Créer et publier (une fois)

1. Sur GitHub, crée le dépôt **vide** :  
   https://github.com/organizations/Quantum-ARISE-Acad/repositories/new  
   Nom exact : `Quantum-ARISE-Acad.github.io` (public)

2. Dans un terminal :

```bash
cd ~/site_Tcad/org-github-io
mkdir -p .github/workflows
mv .github-workflows-deploy.yml .github/workflows/deploy.yml   # si pas déjà fait
git init -b main
git add .
git commit -m "Add QE-to-TCAD organization homepage"
git remote add origin https://github.com/Quantum-ARISE-Acad/Quantum-ARISE-Acad.github.io.git
git push -u origin main
```

3. Settings → Pages → Source = **GitHub Actions**  
4. Attends le workflow vert → ouvre https://quantum-arise-acad.github.io/
