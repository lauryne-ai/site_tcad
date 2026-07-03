# The APE Bridge — Site documentation

Site de documentation utilisateur pour le projet [QE_to_TCAD](https://github.com/LauryneEklou/QE_to_TCAD), construit avec [Docusaurus](https://docusaurus.io/).

**URL publique (après déploiement) :** [lauryneeklou.github.io/site_Tcad](https://lauryneeklou.github.io/site_Tcad/)

## Développement local

```bash
npm install
```

### Français (langue par défaut)

```bash
npm run start:fr
```

→ [http://localhost:3000/site_Tcad/](http://localhost:3000/site_Tcad/)

### Anglais

```bash
npm run start:en
```

→ [http://localhost:3000/site_Tcad/en/](http://localhost:3000/site_Tcad/en/)

### Important : menu de langue (FR ↔ EN)

**Le sélecteur de langue dans la navbar ne fonctionne pas en mode développement** (`npm start`). C'est le comportement normal de Docusaurus : une seule locale est servie à la fois en local.

Pour tester le changement de langue comme en production :

```bash
npm run serve:prod
```

Puis ouvrez [http://localhost:3000/site_Tcad/](http://localhost:3000/site_Tcad/) et utilisez le menu **Français / English** — cela fonctionnera.

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

1. Créer un dépôt GitHub `site_Tcad` et pousser ce dossier
2. **Settings → Pages → Source : GitHub Actions**
3. Le workflow `.github/workflows/deploy-docs.yml` déploie automatiquement à chaque push sur `main`
4. Une fois déployé, le menu **Français / English** fonctionne sur le site en ligne

## Structure

| Dossier | Contenu |
|---------|---------|
| `docs/` | Documentation FR (langue par défaut) |
| `i18n/en/` | Traductions anglaises |
| `src/components/` | Composants React (cartes Setup, homepage) |
| `static/` | Images et assets statiques |

Le code du package Python reste dans le dépôt séparé [QE_to_TCAD](https://github.com/LauryneEklou/QE_to_TCAD).
