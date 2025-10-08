import { useCallback, useState } from "react";
import "./App.css";
import { CreatureDisplay } from "./components/CreatureDisplay";
import { CreatureBuilder } from "./domains/creatureBuilder";
import { getSpeciesByName } from "./utilities";
import { SpeciesSelector } from "./components/SpeciesSelector";
import { Creature } from "./domains/Creature";

function App() {
  const [creature, setCreature] = useState<Creature | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");

  const generateCreature = useCallback(() => {
    if (!selectedSpecies) return;

    const species = getSpeciesByName(selectedSpecies);

    const newCreature = CreatureBuilder.from(new Creature())
      .withSpecies(species)
      .build();

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
