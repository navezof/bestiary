import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { rollDie } from "./utilities";
import { BASE_CHARACTERISTIC_DEFINITION } from "./data/characteristics.data";
import { SpeciesDefinition } from "./data/species.data";
import { CreatureDisplay } from "./CreatureDisplay";
import type {
  Archetype,
  CharacteristicModifier,
  Item,
  SkillModifier,
  Species,
  TraitDefinition,
} from "./type";
import { Creature } from "./Creature";
import { SkillsDisplay } from "./SkillsDisplay";
import { TraitsDisplay } from "./TraitsDisplay";
import { TrappingssDisplay } from "./TrappingsDisplay";

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

  addCharacteristic(creature, species.baseCharacteristics);
  if (species.baseSkills) addBaseSkills(creature, species.baseSkills);
  if (species.baseTraits) addBaseTraits(creature, species.baseTraits);
  addOptionalTraits(creature, species);
};

const applyArchetype = (creature: Creature, archetype: Archetype) => {
  console.log("Apply archetype to creature");

  updateCharacteristics(creature, archetype.characteristics);
  if (archetype.skills) updateSkills(creature, archetype.skills);
  if (archetype.traits) addBaseTraits(creature, archetype.traits);
  if (archetype.trappings) addTrappings(creature, archetype.trappings);
};

const updateCharacteristics = (
  creature: Creature,
  characteristics: CharacteristicModifier[]
) => {
  characteristics.forEach(({ definition, value }) => {
    creature.updateCharacteristicValue(definition, value);
  });
};

const updateSkills = (creature: Creature, skills: SkillModifier[]) => {
  skills.forEach((skill) => {
    creature.updateSkill(skill);
  });
};

const addCharacteristic = (
  creature: Creature,
  characteristics: CharacteristicModifier[]
) => {
  characteristics.forEach((modifier) => {
    const randomValue = modifier.value - 10 + rollDie("2d10");
    creature.setCharacteristicValue(modifier.definition, randomValue);
  });
};

const addBaseSkills = (creature: Creature, skills: SkillModifier[]) => {
  skills.forEach((modifier) => {
    creature.addSkill(modifier);
  });
};

const addBaseTraits = (creature: Creature, traits: TraitDefinition[]) => {
  traits.forEach((trait: TraitDefinition) => creature.addTrait(trait));
};

const addOptionalTraits = (creature: Creature, species: Species) => {
  species.optionalTraits?.forEach((trait: TraitDefinition) => {
    const shouldAddTrait = Math.random() < OPTIONAL_TRAIT_CHANCE; // 50% chance to add each optional trait
    if (shouldAddTrait) {
      creature.addTrait(trait);
    }
  });
};

const addTrappings = (creature: Creature, trappings: Item[]) => {
  trappings.forEach((item: Item) => creature.addTrapping(item));
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

interface ArchetypeSelectorProps {
  selectedSpecies: string;
  selectedArchetype: string;
  onArchetypeChange: (archetype: string) => void;
}

const ArchetypeSelector = ({
  selectedSpecies,
  selectedArchetype,
  onArchetypeChange,
}: ArchetypeSelectorProps) => {
  const archetypes = getSpeciesByName(selectedSpecies).archetypes;
  if (!archetypes) return;
  return (
    <select
      id="creatureTypeSelect"
      value={selectedArchetype}
      onChange={(e) => onArchetypeChange(e.target.value)}
    >
      <option value="">Select an archetype</option>
      {archetypes.map((archetype) => (
        <option key={archetype.name} value={archetype.name}>
          {archetype.name}
        </option>
      ))}
    </select>
  );
};

function App() {
  const [creature, setCreature] = useState<Creature | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [selectedArchetype, setSelectedArchetype] = useState<string>("");

  useEffect(() => {
    if (creature && selectedArchetype) {
      const species = getSpeciesByName(selectedSpecies);
      const archetype = species.archetypes?.find(
        (a) => a.name === selectedArchetype
      );

      if (archetype) {
        applyArchetype(creature, archetype);
        // Create a shallow copy to trigger a re-render
        setCreature(Object.assign(Object.create(creature), creature));
        console.log("Applied archetype and updated creature state.");
      }
    }
  }, [selectedArchetype]); // This effect depends on the selected archetype

  const generateCreature = useCallback(() => {
    if (!selectedSpecies) return;

    const newCreature = new Creature(BASE_CHARACTERISTIC_DEFINITION);
    applySpecies(newCreature, getSpeciesByName(selectedSpecies));
    setCreature(newCreature);
    console.log("Generate creature");
    setSelectedArchetype(""); // Reset archetype on new creature
  }, [selectedSpecies]);

  return (
    <>
      <h1>Bestiary</h1>
      <div>
        <SpeciesSelector
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
        />
        {selectedSpecies && (
          <ArchetypeSelector
            selectedSpecies={selectedSpecies}
            selectedArchetype={selectedArchetype}
            onArchetypeChange={setSelectedArchetype}
          />
        )}
        <button onClick={generateCreature} disabled={!selectedSpecies}>
          Generate a creature
        </button>
        {creature && (
          <div>
            <CreatureDisplay creature={creature} />
            <SkillsDisplay creature={creature} />
            <TraitsDisplay creature={creature} />
            <TrappingssDisplay creature={creature} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
