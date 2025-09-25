import React from "react";
import type { Creature } from "./Creature";
import type { TraitDefinition } from "./creature.type";

interface TraitsDisplayProps {
  creature: Creature;
}

interface TraitDisplayProps {
  trait: TraitDefinition;
}

const TraitDisplay = ({ trait }: TraitDisplayProps) => {
  const traitText = `${trait.name} ${
    trait.parameter ? `(${trait.parameter})` : ""
  }: ${trait.description}`;
  return traitText;
};

export const TraitsDisplay: React.FC<TraitsDisplayProps> = ({ creature }) => {
  return (
    <div>
      <h2>Traits</h2>
      <ul>
        {creature.traits.map((trait) => (
          <li key={trait.name}>
            <TraitDisplay trait={trait} />
          </li>
        ))}
      </ul>
    </div>
  );
};
