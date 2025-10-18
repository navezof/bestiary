import { useEffect, useState } from "react";
import { CharacteristicsDisplay } from "./CharacteristicsDisplay";
import { SkillsDisplay } from "./SkillsDisplay";
import { TraitsDisplay } from "./TraitsDisplay";
import { TrappingsDisplay } from "./TrappingsDisplay";
import { getSpeciesByName } from "../utilities";
import { ArchetypeSelector } from "./ArchetypeSelector";
import "./CreatureDisplay.css";
import type { Archetype } from "../type";
import type { Creature } from "../domains/Creature";

interface CreatureDisplayProps {
  creature: Creature;
  selectedArchetype: string;
  onArchetypeChange: (archetype: string) => void;
}

export const CreatureDisplay: React.FC<CreatureDisplayProps> = ({
  creature,
  selectedArchetype,
  onArchetypeChange,
}) => {
  const [speciesArchetypes, setSpeciesArchetypes] = useState<Archetype[]>();

  useEffect(() => {
    setSpeciesArchetypes(getSpeciesByName(creature.species).archetypes);
  }, [creature.species]);

  return (
    <div className="creature-display-container">
      <ArchetypeSelector
        selectedArchetype={selectedArchetype}
        archetypes={speciesArchetypes}
        onArchetypeChange={onArchetypeChange}
      />
      <CharacteristicsDisplay creature={creature} />
      <SkillsDisplay creature={creature} />
      <TraitsDisplay creature={creature} />
      <TrappingsDisplay creature={creature} />
    </div>
  );
};
