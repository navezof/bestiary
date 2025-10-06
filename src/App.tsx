import { useCallback, useState } from "react";
import "./App.css";
import { BASE_CHARACTERISTIC_DEFINITION } from "./data/characteristics.data";
import { Creature } from "./Creature";
import { CreatureDisplay } from "./CreatureDisplay";
import { getSpeciesByName } from "./utilities";
import { SpeciesSelector } from "./SpeciesSelector";

function App() {
  const [creature, setCreature] = useState<Creature | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");

  const generateCreature = useCallback(() => {
    if (!selectedSpecies) return;

    const newCreature = new Creature(BASE_CHARACTERISTIC_DEFINITION);
    newCreature.applySpecies(getSpeciesByName(selectedSpecies));
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
