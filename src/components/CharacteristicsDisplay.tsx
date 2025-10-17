import React from "react";
import type { Creature } from "../domains/Creature";
import "./CharacteristicsDisplay.css";

interface CharacteristicsDisplayProps {
  creature: Creature;
}

export const CharacteristicsDisplay: React.FC<CharacteristicsDisplayProps> = ({
  creature,
}) => {
  return (
    <div>
      <h2>Characteristics</h2>
      <table className="characteristics-table">
        <thead>
          <tr>
            <th>M</th>
            {creature.characteristics.map((characteristic) => (
              <th key={characteristic.shortName}>{characteristic.shortName}</th>
            ))}
            <th>W</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{creature.movement}</td>
            {creature.characteristics.map((characteristic) => (
              <td key={characteristic.name}>{characteristic.value}</td>
            ))}
            <td>{creature.wounds}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
