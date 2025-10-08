import { SpeciesDefinition } from "../data/species.data";

// The SpeciesSelector component is extracted from App.
interface SpeciesSelectorProps {
  selectedSpecies: string;
  onSpeciesChange: (species: string) => void;
}

export const SpeciesSelector = ({
  selectedSpecies,
  onSpeciesChange,
}: SpeciesSelectorProps) => {
  return (
    <select
      id="creatureTypeSelect"
      value={selectedSpecies}
      onChange={(e) => onSpeciesChange(e.target.value)}
    >
      <option value="">Select a Species</option>
      {SpeciesDefinition.map((species) => (
        <option key={species.name} value={species.name}>
          {species.name}
        </option>
      ))}
    </select>
  );
};
