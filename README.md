# QE-to-TCAD — Site documentation

Site de documentation utilisateur pour le projet [QE_to_TCAD](https://github.com/LauryneEklou/QE_to_TCAD), construit avec [Docusaurus](https://docusaurus.io/).

**URL publique (après déploiement) :** [quantum-arise-acad.github.io/site_tcad](https://quantum-arise-acad.github.io/site_tcad/)

## Développement local

```bash
npm install
```

### Français (langue par défaut)

```bash
npm run start:fr
```

→ [http://localhost:3000/site_tcad/](http://localhost:3000/site_tcad/)

### Anglais

```bash
npm run start:en
```

→ [http://localhost:3000/site_tcad/en/](http://localhost:3000/site_tcad/en/)

### Important : menu de langue (FR ↔ EN) et recherche

**Le sélecteur de langue et la barre de recherche ne fonctionnent pas en mode développement** (`npm start`). C'est le comportement normal de Docusaurus / du plugin de recherche locale : l'index est généré uniquement lors du `build`.

Pour tester le changement de langue **et** la recherche comme en production :

```bash
npm run serve:prod
```

Puis ouvrez [http://localhost:3000/site_tcad/](http://localhost:3000/site_tcad/) — le menu **Français / English** et la loupe de recherche fonctionneront.

Après un changement de config :

```bash
npm run start:clean
```

## Build

```bash
npm run build
npm run serve
```

## Déploiement GitHub Pages

1. Pousser ce dépôt sur `https://github.com/Quantum-ARISE-Acad/site_tcad`
2. **Settings → Pages → Build and deployment → Source : GitHub Actions**
3. Le workflow `.github/workflows/deploy-docs.yml` build et publie le site à chaque push sur `main`
4. URL finale : [https://quantum-arise-acad.github.io/site_tcad/](https://quantum-arise-acad.github.io/site_tcad/)
5. Une fois déployé, le menu **Français / English** fonctionne sur le site en ligne

## Package utilisateur (PyPI / Docker)

Documentation des commandes `qe-bridge`, `qe-plot` et `qe-tcad` :

- PyPI : `pip install 'qe-to-tcad[tcad]'`
- Docker : `lauryneelv/qe-to-tcad:latest` (`docker pull` puis `--epsilon empiric` sans `-it`)
- Clé API : chaque utilisateur crée la sienne sur [Materials Project](https://next-gen.materialsproject.org/) (`export MP_API_KEY=...`)

Voir [Installation](https://quantum-arise-acad.github.io/site_tcad/docs/setup/installation) et [CLI](https://quantum-arise-acad.github.io/site_tcad/docs/reference/cli).

## Structure

| Dossier | Contenu |
|---------|---------|
| `docs/` | Documentation FR (langue par défaut) |
| `i18n/en/` | Traductions anglaises |
| `src/components/` | Composants React (cartes Setup, homepage) |
| `static/` | Images et assets statiques |

Le code du package Python reste dans le dépôt séparé [QE_to_TCAD](https://github.com/LauryneEklou/QE_to_TCAD).
