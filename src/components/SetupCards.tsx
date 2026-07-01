import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

const cards = [
  {
    icon: '📦',
    titleId: 'setup.cards.installation.title',
    titleDefault: 'Installation',
    descId: 'setup.cards.installation.desc',
    descDefault:
      'Python, Quantum ESPRESSO, MPI et option Docker pour démarrer rapidement.',
    to: '/docs/setup/installation',
  },
  {
    icon: '🚀',
    titleId: 'setup.cards.usage.title',
    titleDefault: 'Utilisation',
    descId: 'setup.cards.usage.desc',
    descDefault:
      'Lancer le pipeline, visualiser les résultats et exporter vers TCAD.',
    to: '/docs/setup/usage',
  },
  {
    icon: '🔧',
    titleId: 'setup.cards.troubleshooting.title',
    titleDefault: 'Erreurs fréquentes',
    descId: 'setup.cards.troubleshooting.desc',
    descDefault:
      'Symptômes courants, causes probables et solutions pas à pas.',
    to: '/docs/setup/troubleshooting',
  },
  {
    icon: '⚡',
    titleId: 'setup.cards.optimization.title',
    titleDefault: 'Optimisation',
    descId: 'setup.cards.optimization.desc',
    descDefault:
      'Convergence, MPI, k-points et réglages pour accélérer les calculs.',
    to: '/docs/setup/optimization',
  },
];

export default function SetupCards(): JSX.Element {
  return (
    <div className="setup-cards">
      {cards.map((card) => (
        <Link key={card.to} className="setup-card" to={card.to}>
          <div className="setup-card__icon">{card.icon}</div>
          <div className="setup-card__title">
            <Translate id={card.titleId}>{card.titleDefault}</Translate>
          </div>
          <p className="setup-card__description">
            <Translate id={card.descId}>{card.descDefault}</Translate>
          </p>
        </Link>
      ))}
    </div>
  );
}
