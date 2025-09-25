import { useCallback, useState } from "react";
import "./App.css";
import { rollDie } from "./utilities";
import { BASE_CHARACTERISTIC_DEFINITION } from "./data/characteristics.data";
import { SpeciesDefinition } from "./data/species.data";
import { CreatureDisplay } from "./CreatureDisplay";
import type { Species, TraitDefinition } from "./creature.type";
import { Creature } from "./Creature";
import { SkillsDisplay } from "./SkillsDisplay";
import { TraitsDisplay } from "./TraitsDisplay";

const OPTIONAL_TRAIT_CHANCE = 0.5; // 50% chance to add each optional trait

// Helper functions moved outside the component to prevent re-creation on render.
const getSpeciesByName = (name: string): Species => {
  const species = SpeciesDefinition.find((s) => s.name === name);
  if (!species) {
    throw new Error(`Species with name ${name} not found`);
  }
  return species;
};

const applySpecies = (creature: Creature, species: Species) => {
  console.log("Apply species to creature");

  addCharacteristic(creature, species);
  addBaseSkills(creature, species);
  addBaseTraits(creature, species);
  addOptionalTraits(creature, species);
};

const addCharacteristic = (creature: Creature, species: Species) => {
  Object.entries(species.baseCharacteristics).forEach(([key, value]) => {
    const randomValue = value - 10 + rollDie("2d10");
    creature.setCharacteristicValue(key, randomValue);
  });
};

const addBaseSkills = (creature: Creature, species: Species) => {
  species.baseSkills?.forEach(
    ({ skillDefinition, baseValue, specialization }) => {
      creature.addSkill(skillDefinition, baseValue, specialization);
    }
  );
};

const addBaseTraits = (creature: Creature, species: Species) => {
  species.baseTraits?.forEach((trait: TraitDefinition) =>
    creature.addTrait(trait)
  );
};

const addOptionalTraits = (creature: Creature, species: Species) => {
  species.optionalTraits?.forEach((trait: TraitDefinition) => {
    const shouldAddTrait = Math.random() < OPTIONAL_TRAIT_CHANCE; // 50% chance to add each optional trait
    if (shouldAddTrait) {
      creature.addTrait(trait);
    }
  });
};

// The SpeciesSelector component is extracted from App.
interface SpeciesSelectorProps {
  selectedSpecies: string;
  onSpeciesChange: (species: string) => void;
}

const SpeciesSelector = ({
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

function App() {
  const [creature, setCreature] = useState<Creature | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");

  const generateCreature = useCallback(() => {
    if (!selectedSpecies) return;

    const newCreature = new Creature(BASE_CHARACTERISTIC_DEFINITION);
    applySpecies(newCreature, getSpeciesByName(selectedSpecies));
    setCreature(newCreature);
    console.log("Generate creature");
  }, [selectedSpecies]);

  return (
    <>
      <h1>Bestiary</h1>
      <div>
        <SpeciesSelector
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
        />
        <button onClick={generateCreature} disabled={!selectedSpecies}>
          Generate a creature
        </button>
        {creature && (
          <div>
            <CreatureDisplay creature={creature} />
            <SkillsDisplay creature={creature} />
            <TraitsDisplay creature={creature} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
