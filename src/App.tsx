import { useState } from "react";
import "./App.css";
import { Creature } from "./Creature/creature";
import type { Species } from "./Creature/creature.type";
import { SpeciesDefinition } from "./Creature/data/species.data";
import { rollDie } from "./Creature/utilities";
import { BASE_CHARACTERISTIC_DEFINITION } from "./Creature/data/characteristics.data";
import { CreatureDisplay } from "./Creature/creatureDisplay";

function App() {
  const [creature, setCreature] = useState<Creature | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>();

  const applySpecies = (creature: Creature, species: Species) => {
    // Placeholder for species application logic
    console.log("Apply species to creature");
    Object.entries(species.baseCharacteristics).forEach(([key, value]) => {
      const randomValue = value - 10 + rollDie("2d10");
      creature.setCharacteristicValue(key, randomValue);
    });
  };

  const generateCreature = () => {
    const creature = new Creature(BASE_CHARACTERISTIC_DEFINITION);
    applySpecies(creature, getSpeciesByName(selectedSpecies ?? "Goblin"));
    setCreature(creature);
    console.log("Generate creature");
  };

  const getSpeciesByName = (name: string): Species => {
    const species = SpeciesDefinition.find((s) => s.name === name);
    if (!species) {
      throw new Error(`Species with name ${name} not found`);
    }
    return species;
  };

  const SpeciesSelector = () => {
    return (
      <select
        id="creatureTypeSelect"
        value={selectedSpecies}
        onChange={(e) => {
          setSelectedSpecies(e.target.value || undefined);
        }}
      >
        <option value="">Select</option>
        {SpeciesDefinition.map((species) => (
          <option key={species.name} value={species.name}>
            {species.name}
          </option>
        ))}
      </select>
    );
  };
  return (
    <>
      <h1>Bestiary</h1>
      <div>
        <SpeciesSelector />
        <button onClick={generateCreature}>Generate a creature</button>
        {creature && <CreatureDisplay creature={creature} />}
      </div>
    </>
  );
}

export default App;
