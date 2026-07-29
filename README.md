# The APE Bridge — Site documentation

Site de documentation utilisateur pour le projet [QE_to_TCAD](https://github.com/LauryneEklou/QE_to_TCAD), construit avec [Docusaurus](https://docusaurus.io/).

**URL publique (après déploiement) :** [lauryne-ai.github.io/site_tcad](https://lauryne-ai.github.io/site_tcad/)

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

1. Pousser ce dépôt sur `https://github.com/lauryne-ai/site_tcad`
2. **Settings → Pages → Build and deployment → Source : Deploy from a branch**
3. Choisir la branche **`gh-pages`**, dossier **`/ (root)`**, puis **Save**
4. Le workflow `.github/workflows/deploy-docs.yml` pousse le build sur `gh-pages` à chaque push sur `main`
5. URL finale : [https://lauryne-ai.github.io/site_tcad/](https://lauryne-ai.github.io/site_tcad/)
6. Une fois déployé, le menu **Français / English** fonctionne sur le site en ligne

## Package utilisateur (PyPI / Docker)

Documentation des commandes `qe-bridge`, `qe-plot` et `qe-tcad` :

- PyPI : `pip install 'qe-to-tcad[tcad]'`
- Docker : `lauryneelv/qe-to-tcad:0.2.4`
- Clé API : chaque utilisateur crée la sienne sur [Materials Project](https://next-gen.materialsproject.org/) (`export MP_API_KEY=...`)

Voir [Installation](https://lauryne-ai.github.io/site_tcad/docs/setup/installation) et [CLI](https://lauryne-ai.github.io/site_tcad/docs/reference/cli).

## Structure

| Dossier | Contenu |
|---------|---------|
| `docs/` | Documentation FR (langue par défaut) |
| `i18n/en/` | Traductions anglaises |
| `src/components/` | Composants React (cartes Setup, homepage) |
| `static/` | Images et assets statiques |

Le code du package Python reste dans le dépôt séparé [QE_to_TCAD](https://github.com/LauryneEklou/QE_to_TCAD).
