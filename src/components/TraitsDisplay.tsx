import React from "react";
import type { Creature } from "../domains/Creature";
import "./TraitsDisplay.css";

interface TraitsDisplayProps {
  creature: Creature;
}

/**
 * Renders a list of traits. Each trait is keyboard-focusable and shows a
 * tooltip on hover/focus containing the trait description.
 */
export const TraitsDisplay: React.FC<TraitsDisplayProps> = ({ creature }) => {
  if (!creature.traits || creature.traits.length === 0) {
    return null;
  }

  return (
    <div className="traits-display">
      <b>Traits: </b>
      <span className="traits-list">
        {creature.traits.map((trait, idx) => (
          <span
            key={`${trait.name}-${idx}`}
            className="trait"
            tabIndex={0}
            role="button"
            aria-label={`${trait.name}: ${trait.description}`}
          >
            <span className="trait-name">
              {trait.name}
              {trait.parameter ? ` (${trait.parameter})` : ""}
            </span>
            {trait.description ? (
              <span className="trait-tooltip" role="tooltip">
                {trait.description}
              </span>
            ) : null}
            {idx < creature.traits.length - 1 ? <span>,&nbsp;</span> : null}
          </span>
        ))}
      </span>
    </div>
  );
};
