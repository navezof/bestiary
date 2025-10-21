import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { CreatureDisplay } from "./components/CreatureDisplay";
import { CreatureBuilder } from "./domains/creatureBuilder";
import { getArchetypeFromSpeciesByName, getSpeciesByName } from "./utilities";
import { SpeciesSelector } from "./components/SpeciesSelector";
import { Creature } from "./domains/Creature";
import { ArchetypeSelector } from "./components/ArchetypeSelector";

function App() {
  const [creatureWithArchetype, setCreatureWithArchetype] =
    useState<Creature | null>(null);
  const [baseCreature, setBaseCreature] = useState<Creature | null>(null);
  const [selectedSpeciesName, setSelectedSpeciesName] = useState<string>("");
  const [selectedArchetypeName, setSelectedArchetypeName] =
    useState<string>("");

  // derive the available archetype names from the current base creature
  const speciesArchetypesName = useMemo(() => {
    if (!baseCreature?.species) return [] as string[];
    const species = getSpeciesByName(baseCreature.species);
    return species?.archetypes ? species.archetypes.map((a) => a.name) : [];
  }, [baseCreature]);

  useEffect(() => {
    if (!selectedSpeciesName) {
      setBaseCreature(null);
      setCreatureWithArchetype(null);
      setSelectedArchetypeName("");
      return;
    }

    const species = getSpeciesByName(selectedSpeciesName);
    const newCreature = CreatureBuilder.from(new Creature())
      .withSpecies(species)
      .build();

    setBaseCreature(newCreature);
    setSelectedArchetypeName("");
  }, [selectedSpeciesName]);

  useEffect(() => {
    if (!baseCreature) {
      setCreatureWithArchetype(null);
      return;
    }

    if (!selectedArchetypeName) {
      setCreatureWithArchetype(baseCreature);
      return;
    }

    const archetype = getArchetypeFromSpeciesByName(
      selectedArchetypeName,
      baseCreature.species
    );
    const newCreature = CreatureBuilder.from(baseCreature)
      .withArchetype(archetype)
      .build();
    setCreatureWithArchetype(newCreature);
  }, [baseCreature, selectedArchetypeName]);

  return (
    <>
      <h1>Bestiary</h1>
      <div>
        <SpeciesSelector
          selectedSpecies={selectedSpeciesName}
          onSpeciesChange={setSelectedSpeciesName}
        />
        <ArchetypeSelector
          selectedArchetypeName={selectedArchetypeName}
          archetypes={speciesArchetypesName}
          onArchetypeChange={setSelectedArchetypeName}
        />
        {creatureWithArchetype && (
          <CreatureDisplay creature={creatureWithArchetype} />
        )}
      </div>
    </>
  );
}

export default App;
