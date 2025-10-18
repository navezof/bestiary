import { useEffect, useState } from "react";
import "./App.css";
import { CreatureDisplay } from "./components/CreatureDisplay";
import { CreatureBuilder } from "./domains/creatureBuilder";
import { getArchetypeFromSpeciesByName, getSpeciesByName } from "./utilities";
import { SpeciesSelector } from "./components/SpeciesSelector";
import { Creature } from "./domains/Creature";

function App() {
  const [creatureWithArchetype, setCreatureWithArchetype] =
    useState<Creature | null>(null);
  const [baseCreature, setBaseCreature] = useState<Creature | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [selectedArchetype, setSelectedArchetype] = useState<string>("");

  useEffect(() => {
    if (!selectedSpecies) {
      setBaseCreature(null);
      setCreatureWithArchetype(null);
      setSelectedArchetype("");
      return;
    }

    const species = getSpeciesByName(selectedSpecies);
    const newCreature = CreatureBuilder.from(new Creature())
      .withSpecies(species)
      .build();

    setBaseCreature(newCreature);
    // Reset archetype when species changes
    setSelectedArchetype("");
  }, [selectedSpecies]);

  useEffect(() => {
    if (!baseCreature) {
      setCreatureWithArchetype(null);
      return;
    }
    if (!selectedArchetype) {
      setCreatureWithArchetype(baseCreature);
      return;
    }

    const archetype = getArchetypeFromSpeciesByName(
      selectedArchetype,
      baseCreature.species
    );
    const newCreature = CreatureBuilder.from(baseCreature)
      .withArchetype(archetype)
      .build();
    setCreatureWithArchetype(newCreature);
  }, [baseCreature, selectedArchetype]);

  return (
    <>
      <h1>Bestiary</h1>
      <div>
        <SpeciesSelector
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
        />
        {creatureWithArchetype && (
          <CreatureDisplay
            creature={creatureWithArchetype}
            selectedArchetype={selectedArchetype}
            onArchetypeChange={setSelectedArchetype}
          />
        )}
      </div>
    </>
  );
}

export default App;
