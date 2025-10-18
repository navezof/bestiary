import React from "react";
import type { Creature } from "../domains/Creature";

interface SkillsDisplayProps {
  creature: Creature;
}

export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ creature }) => {
  if (!creature.skills || creature.skills.length === 0) {
    return null;
  }
  const skillsString = creature.skills
    .map((skill) => {
      let text = skill.name;
      if (skill.specialization) text += ` (${skill.specialization})`;
      if (skill.value) text += ` ${skill.value}`;
      return text;
    })
    .join(", ");
  return (
    <div>
      <b>Skills: </b> {skillsString}
    </div>
  );
};
