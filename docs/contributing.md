---
sidebar_position: 9
title: Contribution
---

# Contribution

Les contributions sont les bienvenues — recherche, ingénierie matériaux et développement.

## Types de contributions

- Nouveaux matériaux et structures
- Signalement de bugs
- Amélioration de la documentation (ce site !)
- Optimisations performance (parallélisation k-point pools)
- Améliorations des visualisations

## Démarrer

```bash
# 1. Fork et clone
git clone https://github.com/VOTRE_USERNAME/QE_to_TCAD.git
cd QE_to_TCAD
git checkout -b feature/ma-fonctionnalite

# 2. Installer en mode dev
python3 -m venv .venv && source .venv/bin/activate
pip install -e .

# 3. Tests
python3 -m pytest tests/ -v

# 4. Commit et PR
git add .
git commit -m "feat: description de la modification"
git push origin feature/ma-fonctionnalite
```

## Documentation

Les pages de ce site sont dans `website/docs/`. Pour modifier :

```bash
cd website
npm start    # Serveur de dev sur http://localhost:3000
```

Voir le [guide Docusaurus](https://docusaurus.io/docs) pour la syntaxe MDX.

## Licence

MIT — voir [LICENSE](https://github.com/LauryneEklou/QE_to_TCAD/blob/main/LICENSE).

## Code de conduite

Tous les contributeurs acceptent de suivre un code de conduite basé sur l'inclusivité et le respect.

## Voir aussi

- [GitHub Issues](https://github.com/LauryneEklou/QE_to_TCAD/issues)
