import { useEffect, useState } from "react";
import { CharacteristicsDisplay } from "./CharacteristicsDisplay";
import { SkillsDisplay } from "./SkillsDisplay";
import { TraitsDisplay } from "./TraitsDisplay";
import { TrappingsDisplay } from "./TrappingsDisplay";
import { getArchetypeFromSpeciesByName, getSpeciesByName } from "../utilities";
import { CreatureBuilder } from "../domains/creatureBuilder";
import { ArchetypeSelector } from "./ArchetypeSelector";
import "./CreatureDisplay.css";
import type { Archetype } from "../type";
import type { Creature } from "../domains/Creature";

interface CreatureDisplayProps {
  creature: Creature;
  setCreature: (creature: Creature) => void;
}

export const CreatureDisplay: React.FC<CreatureDisplayProps> = ({
  creature,
  setCreature,
}) => {
  const [selectedArchetype, setSelectedArchetype] = useState<string>("");
  const [speciesArchetypes, setSpeciesArchetypes] = useState<Archetype[]>();

  useEffect(() => {
    setSpeciesArchetypes(getSpeciesByName(creature.species).archetypes);
  }, [creature.species]);

  const setArchetype = () => {
    const archetype = getArchetypeFromSpeciesByName(
      selectedArchetype,
      creature.species
    );
    const newCreature = CreatureBuilder.from(creature)
      .withArchetype(archetype)
      .build();
    setCreature(newCreature);
  };

  return (
    <div className="creature-display-container">
      <ArchetypeSelector
        selectedArchetype={selectedArchetype}
        archetypes={speciesArchetypes}
        onArchetypeChange={setSelectedArchetype}
      />
      <button onClick={setArchetype} disabled={!speciesArchetypes}>
        Set Archetype
      </button>
      <CharacteristicsDisplay creature={creature} />
      <SkillsDisplay creature={creature} />
      <TraitsDisplay creature={creature} />
      <TrappingsDisplay creature={creature} />
    </div>
  );
};
