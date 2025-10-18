import type { Creature } from "../domains/Creature";

interface TrappingsDisplayProps {
  creature: Creature;
}

export const TrappingsDisplay: React.FC<TrappingsDisplayProps> = ({
  creature,
}) => {
  if (!creature.trappings || creature.trappings.length === 0) {
    return null;
  }
  const trappingsString = creature.trappings
    .map((trapping) => `${trapping.name}`)
    .join(", ");
  return (
    <div>
      <b>Trappings: </b> {trappingsString}
    </div>
  );
};
