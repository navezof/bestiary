import React from "react";
import type { Creature } from "./Creature";

interface TraitsDisplayProps {
  creature: Creature;
}

export const TraitsDisplay: React.FC<TraitsDisplayProps> = ({ creature }) => {
  return (
    <div>
      <h2>Traits</h2>
      <ul>
        {creature.traits.map((trait) => (
          <li key={trait.name}>
            <strong>{trait.name}:</strong> {trait.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
