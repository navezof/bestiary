import { useEffect, useState } from "react";
import { CharacteristicsDisplay } from "./CharacteristicsDisplay";
import { SkillsDisplay } from "./SkillsDisplay";
import { TraitsDisplay } from "./TraitsDisplay";
import { TrappingssDisplay } from "./TrappingsDisplay";
import { getArchetypeFromSpeciesByName, getSpeciesByName } from "../utilities";
import { ArchetypeSelector } from "./ArchetypeSelector";
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

  const applyArchetype = () => {
    const archetype = getArchetypeFromSpeciesByName(
      selectedArchetype,
      creature.species
    );
    const newCreature = creature.applyArchetype(archetype);
    setCreature(newCreature);
  };

  return (
    <div>
      <ArchetypeSelector
        selectedArchetype={selectedArchetype}
        archetypes={speciesArchetypes}
        onArchetypeChange={setSelectedArchetype}
      />
      <button onClick={applyArchetype} disabled={!speciesArchetypes}>
        Apply Archetype
      </button>
      <CharacteristicsDisplay creature={creature} />
      <SkillsDisplay creature={creature} />
      <TraitsDisplay creature={creature} />
      <TrappingssDisplay creature={creature} />
    </div>
  );
};
