import React from "react";
import type { Creature } from "./creature";

interface CreatureDisplayProps {
  creature: Creature;
}

export const CreatureDisplay: React.FC<CreatureDisplayProps> = ({
  creature,
}) => {
  return (
    <div>
      <h2>Characteristics</h2>
      <ul>
        {creature.characteristics.map((characteristic) => (
          <li key={characteristic.name}>
            <strong>{characteristic.name}:</strong> {characteristic.value}
          </li>
        ))}
      </ul>
    </div>
  );
};
