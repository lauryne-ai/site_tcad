---
sidebar_position: 1
title: CLI
---

# Référence CLI

Les commandes ci-dessous sont installées via :

```bash
pip install 'qe-to-tcad[tcad]'
```

## `qe-bridge`

Pipeline principal : Materials Project → Quantum ESPRESSO → export JSON TCAD.

```bash
qe-bridge <formule_chimique> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `formule_chimique` | Symbole ou formule (ex. `C`, `Si`, `SiGe`) |

### Options courantes

| Option | Description |
|--------|-------------|
| `--epsilon MODE` | Source de ε : `empiric` (rapide, recommandé), `compute` (`epsilon.x`), `mp` (Materials Project), `ask` (prompt interactif) |
| `--pw PATH` | Chemin vers `pw.x` |
| `--nproc N` | Nombre de processus MPI |
| `--qe-path PATH` | Répertoire bin de QE |
| `--help` | Afficher l'aide |

### Exemples

```bash
qe-bridge SiGe --epsilon empiric
qe-bridge Si --nproc 8 --epsilon compute
qe-bridge Ge --pw /opt/qe/bin/pw.x
```

:::info Clé API et Docker
`qe-bridge` nécessite `MP_API_KEY` (voir [Installation](/docs/setup/installation#prérequis--clé-api-materials-project)).
Sous Docker **sans** `-it`, précisez toujours `--epsilon` (pas de prompt Y/N).
:::

## `qe-plot`

Trace la fonction diélectrique ε(ω) pour un matériau déjà calculé.

```bash
qe-plot <formule_chimique>
```

### Exemples

```bash
qe-plot SiGe
qe-plot C
```

## `qe-tcad`

Lance une simulation de dispositif 1D (diode ou transistor) à partir des données exportées.

```bash
qe-tcad <formule_chimique> <dispositif>
```

| Argument | Valeurs |
|----------|---------|
| `formule_chimique` | Ex. `Si`, `SiGe`, `C` |
| `dispositif` | `diode` ou `transistor` |

### Exemples

```bash
qe-tcad SiGe diode
qe-tcad SiGe transistor
```

## `python3 -m qe_to_tcad`

Équivalent à `qe-bridge` :

```bash
python3 -m qe_to_tcad Si
```

## Scripts utilitaires (dépôt source)

| Commande | Description |
|----------|-------------|
| `python3 fetcher.py <formule>` | Orchestrateur direct |
| `python3 qe_runner.py <fichier.in>` | Exécution QE bas niveau |
| `python3 plotter.py <fichier.dat>` | Tracer ε(ω) (équivalent bas niveau de `qe-plot`) |
| `python3 plot_convergence.py <mat>` | Courbes de convergence |
| `python3 plot_complet.py <json> diode\|transistor` | Validation DEVSIM (équivalent bas niveau de `qe-tcad`) |
| `python3 convergence_manager.py` | Convergence standalone |

## Tests

```bash
python3 -m pytest tests/ -v
python3 verify_convergence_manager.py
```

## Voir aussi

- [Variables d'environnement](/docs/reference/env)
- [Utilisation](/docs/setup/usage)
- [Installation Docker](/docs/setup/installation#option-docker)
