import { useState, useMemo, useEffect } from "react";
import { Creature } from "../domains/Creature";
import { CreatureBuilder } from "../domains/creatureBuilder";
import { getSpeciesByName, getArchetypeFromSpeciesByName } from "../utilities";
import { ArchetypeSelector } from "./ArchetypeSelector";
import { CreatureDisplay } from "./CreatureDisplay";
import { SpeciesSelector } from "./SpeciesSelector";
import "./CreatureBlock.css";

export const CreatureBlock = () => {
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
    <div className="creature-card">
      <div>
        <h2 id={`creature-${selectedSpeciesName || "new"}`}>
          {selectedSpeciesName || "New Creature"}
        </h2>
      </div>
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
    </div>
  );
};
