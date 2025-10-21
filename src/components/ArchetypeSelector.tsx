interface ArchetypeSelectorProps {
  selectedArchetypeName: string;
  archetypes: string[] | undefined;
  onArchetypeChange: (archetypeName: string) => void;
}

export const ArchetypeSelector = ({
  selectedArchetypeName: selectedArchetype,
  archetypes,
  onArchetypeChange,
}: ArchetypeSelectorProps) => {
  if (archetypes?.length === 0 || !archetypes) {
    return;
  }
  return (
    <select
      id="archetypeSelect"
      value={selectedArchetype}
      onChange={(e) => onArchetypeChange(e.target.value)}
    >
      <option value="">Select an archetype</option>
      {archetypes.map((archetype) => (
        <option key={archetype} value={archetype}>
          {archetype}
        </option>
      ))}
    </select>
  );
};
