import { useCallback, useState } from "react";
import "./App.css";
import { CreatureDisplay } from "./components/CreatureDisplay";
import { getSpeciesByName } from "./utilities";
import { SpeciesSelector } from "./components/SpeciesSelector";
import { Creature } from "./domains/Creature";

// Example of function that should allow chained creation
/* 
type Creature = {
  name: string;
  stat: number;
  species?: Species;
  archetype?: Archetype;
};

type Species = {
  name: string;
};

type Archetype = {
  name: string;
};


const createCreature = (initialValues: { name: string; stat: number }) => ({
  name: initialValues.name,
  stat: initialValues.stat ?? 10,
});

const withSpecies = (s: Species) => (c: Creature) => ({
  ...c,
  species: s,
});

const withArchetype =
  (a: Archetype) =>
  (c: Creature): Creature => ({
    ...c,
    archetype: a,
  });
*/

function App() {
  const [creature, setCreature] = useState<Creature | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");

  const generateCreature = useCallback(() => {
    if (!selectedSpecies) return;

    // Get all component of the creature (species, archetype, etc...) and assemble it.
    // Load base template from JSON - Pure Function
    // Builder pattern en TS / FP
    /*
    const currentSpecies = getSpeciesByName(selectedSpecies);
    const creatureTemplate: Creature = loadCreature("");
    const creature = createCreature(creatureTemplate);
    const creatureWithSpecies = withSpecies(creature);
    const creatureWithArchetype = withArchetype(creatureWithSpecies);
    */

    let newCreature = new Creature();
    newCreature = newCreature.applySpecies(getSpeciesByName(selectedSpecies));
    setCreature(newCreature);
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
          <CreatureDisplay creature={creature} setCreature={setCreature} />
        )}
      </div>
    </>
  );
}

export default App;
