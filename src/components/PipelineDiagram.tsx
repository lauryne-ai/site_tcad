import Mermaid from '@theme/Mermaid';

const diagram = `flowchart TB
    MP["Materials Project"]
    Fetcher["fetcher.py"]
    Gen["qe_input_generator"]
    Runner["qe_runner.py"]
    Conv["convergence_manager"]
    Eps["epsilon.x"]
    Parse["parse_tcad_parameters"]
    JSON["parsed_data/*.json"]
    TCAD["Sentaurus / DEVSIM"]
    Plots["plotter.py"]

    MP --> Fetcher
    Fetcher --> Gen
    Gen --> Runner
    Runner --> Conv
    Conv --> Eps
    Eps --> Parse
    Parse --> JSON
    JSON --> TCAD
    Parse --> Plots`;

export default function PipelineDiagram(): JSX.Element {
  return (
    <div className="pipeline-diagram">
      <Mermaid value={diagram} />
    </div>
  );
}
