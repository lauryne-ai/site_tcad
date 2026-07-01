# The APE Bridge — Site documentation

Site de documentation utilisateur pour le projet [QE_to_TCAD](https://github.com/LauryneEklou/QE_to_TCAD), construit avec [Docusaurus](https://docusaurus.io/).

**URL publique (après déploiement) :** [lauryneeklou.github.io/site_Tcad](https://lauryneeklou.github.io/site_Tcad/)

## Développement local

```bash
npm install
npm start
```

Ouvre [http://localhost:3000/site_Tcad/](http://localhost:3000/site_Tcad/).

## Build

```bash
npm run build
npm run serve
```

## Déploiement GitHub Pages

1. Créer un dépôt GitHub `site_Tcad` et pousser ce dossier
2. **Settings → Pages → Source : GitHub Actions**
3. Le workflow `.github/workflows/deploy-docs.yml` déploie automatiquement à chaque push sur `main`

## Structure

| Dossier | Contenu |
|---------|---------|
| `docs/` | Documentation FR (langue par défaut) |
| `i18n/en/` | Traductions anglaises (pages prioritaires) |
| `src/components/` | Composants React (cartes Setup, homepage) |
| `static/` | Images et assets statiques |

Le code du package Python reste dans le dépôt séparé [QE_to_TCAD](https://github.com/LauryneEklou/QE_to_TCAD).
