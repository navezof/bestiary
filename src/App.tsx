import { useCallback, useState } from "react";
import "./App.css";
import { Creature } from "./Creature";
import { CreatureDisplay } from "./CreatureDisplay";
import { getSpeciesByName } from "./utilities";
import { SpeciesSelector } from "./SpeciesSelector";

function App() {
  const [creature, setCreature] = useState<Creature | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");

  const generateCreature = useCallback(() => {
    if (!selectedSpecies) return;

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
