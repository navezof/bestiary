import React from "react";
import type { Creature } from "../domains/Creature";
import type { Skill } from "../domains/skill";

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
  console.log("display skill: ", skillText);
  return <p>{skillText}</p>;
};

export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ creature }) => {
  console.log("display skills ", creature.skills);
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
