import React from "react";
import type { Creature } from "./Creature";

interface CharacteristicsDisplayProps {
  creature: Creature;
}

export const CharacteristicsDisplay: React.FC<CharacteristicsDisplayProps> = ({
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
