import React from "react";
import type { Creature } from "./Creature";
import type { Skill } from "./skill";

interface SkillsDisplayProps {
  creature: Creature;
}

interface SkillDisplayProps {
  skill: Skill;
}

const SkillDisplay = ({ skill }: SkillDisplayProps) => {
  const skillText = `${skill.name} ${
    skill.specialization ? ` (${skill.specialization})` : ""
  }: ${skill.value} (${skill.linkedCharacteristic.name}: ${
    skill.characteristic.value
  } + Advances: ${skill.advances})`;

  return <p>{skillText}</p>;
};

export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ creature }) => {
  return (
    <div>
      <h2>Skills</h2>
      <ul>
        {creature.skills.map((skill) => (
          <li key={skill.name}>
            <SkillDisplay skill={skill} />
          </li>
        ))}
      </ul>
    </div>
  );
};
