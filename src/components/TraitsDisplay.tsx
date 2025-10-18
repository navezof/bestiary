import React from "react";
import type { Creature } from "../domains/Creature";

interface TraitsDisplayProps {
  creature: Creature;
}

export const TraitsDisplay: React.FC<TraitsDisplayProps> = ({ creature }) => {
  if (!creature.traits || creature.traits.length === 0) {
    return null;
  }
  const traitsString = creature.traits
    .map(
      (trait) =>
        `${trait.name}${trait.parameter ? ` (${trait.parameter})` : ""}`
    )
    .join(", ");
  return (
    <div>
      <b>Traits: </b> {traitsString}
    </div>
  );
};
