import type { Archetype } from "../type";

interface ArchetypeSelectorProps {
  selectedArchetype: string;
  archetypes: Archetype[] | undefined;
  onArchetypeChange: (archetype: string) => void;
}

export const ArchetypeSelector = ({
  selectedArchetype,
  archetypes,
  onArchetypeChange,
}: ArchetypeSelectorProps) => {
  console.log("ARCHETYPE SELECTOR");
  if (!archetypes) return;
  return (
    <select
      id="archetypeSelect"
      value={selectedArchetype}
      onChange={(e) => onArchetypeChange(e.target.value)}
    >
      <option value="">Select an archetype</option>
      {archetypes.map((archetype) => (
        <option key={archetype.name} value={archetype.name}>
          {archetype.name}
        </option>
      ))}
    </select>
  );
};
