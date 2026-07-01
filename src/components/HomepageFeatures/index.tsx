import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  description: ReactNode;
  emoji: string;
};

const FeatureList: FeatureItem[] = [
  {
    emoji: '🤖',
    title: <Translate id="homepage.feature.automation.title">Automatisation complète</Translate>,
    description: (
      <Translate id="homepage.feature.automation.desc">
        De la structure cristalline (Materials Project) aux fichiers QE, calculs
        SCF/NSCF/epsilon et export JSON — sans intervention manuelle.
      </Translate>
    ),
  },
  {
    emoji: '📊',
    title: <Translate id="homepage.feature.dielectric.title">Extraction diélectrique</Translate>,
    description: (
      <Translate id="homepage.feature.dielectric.desc">
        Constante diélectrique statique ε₀, fréquences de plasma ω_p et
        dispersion ε(ω) complète, prêtes pour l&apos;ingénierie de dispositifs.
      </Translate>
    ),
  },
  {
    emoji: '🔗',
    title: <Translate id="homepage.feature.tcad.title">Export TCAD natif</Translate>,
    description: (
      <Translate id="homepage.feature.tcad.desc">
        JSON structuré compatible Sentaurus, Silvaco et workflows DEVSIM pour
        valider vos modèles de dispositifs 1D.
      </Translate>
    ),
  },
];

function Feature({title, description, emoji}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureEmoji}>{emoji}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
