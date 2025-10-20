import React from "react";
import type { Creature } from "../domains/Creature";
import type { Skill } from "../domains/skill";
import "./SkillsDisplay.css";

interface SkillsDisplayProps {
  creature: Creature;
}

const SkillValueDetails: React.FC<{ skill: Skill }> = ({ skill }) => {
  const characteristic = skill.characteristic;
  const characteristicName = skill.linkedCharacteristic.name;
  const skillAdv = skill.advances;
  const total = skill.value;

  const renderSigned = (n: number) => {
    if (n === 0) return <span className="calc-number">0</span>;
    const cls = n > 0 ? "calc-bonus" : "calc-penalty";
    const sign = n > 0 ? `+${n}` : `${n}`;
    return (
      <span className={`calc-number ${cls}`} aria-hidden>
        {sign}
      </span>
    );
  };

  return (
    <div className="skill-calc" aria-hidden>
      <div className="calc-row">
        <span className="calc-label">{characteristicName}:</span>
        <span className="calc-value">{characteristic.value}</span>
      </div>
      <div className="calc-row">
        <span className="calc-label">Advances:</span>
        <span className="calc-value">{renderSigned(skillAdv)}</span>
      </div>
      <div className="calc-row">
        <span className="calc-label"></span>
        <span className="calc-value calc-total">{total}</span>
      </div>
    </div>
  );
};

export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ creature }) => {
  if (!creature.skills || creature.skills.length === 0) {
    return null;
  }
  return (
    <div className="skills-display">
      <b>Skills: </b>
      <span className="skills-list">
        {creature.skills.map((skill, idx) => (
          <span
            key={`${skill.name}-${idx}`}
            className="skill"
            tabIndex={0}
            role="button"
            aria-label={`${skill.name}: ${skill.description}`}
          >
            <span className="skill-name">
              {skill.name}
              {skill.specialization ? ` (${skill.specialization})` : ""}
              {skill.value ? ` ${skill.value}` : ""}
            </span>
            <span className="skill-tooltip" role="tooltip">
              <div className="skill-desc">{skill.description}</div>
              <SkillValueDetails skill={skill} />
            </span>
            {idx < creature.skills.length - 1 ? <span>,&nbsp;</span> : null}
          </span>
        ))}
      </span>
    </div>
  );
};
