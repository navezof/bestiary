import { Creature } from "../Creature";
import type { Item } from "../type";

interface TrappingDisplayProps {
  trapping: Item;
}

const TrappingDisplay = ({ trapping }: TrappingDisplayProps) => {
  const itemText = `${trapping.name} - ${trapping.description} (Cost: ${trapping.cost}, Encumbrance: ${trapping.encumbrance}, Availability: ${trapping.availability})`;
  return <p>{itemText}</p>;
};

interface TrappingsDisplayProps {
  creature: Creature;
}

export const TrappingssDisplay: React.FC<TrappingsDisplayProps> = ({
  creature,
}) => {
  return (
    <div>
      <h2>Trapping</h2>
      <ul>
        {creature.trappings.map((trapping) => (
          <li key={trapping.name}>
            <TrappingDisplay trapping={trapping} />
          </li>
        ))}
      </ul>
    </div>
  );
};
