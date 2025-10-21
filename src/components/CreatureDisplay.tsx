import { CharacteristicsDisplay } from "./CharacteristicsDisplay";
import { SkillsDisplay } from "./SkillsDisplay";
import { TraitsDisplay } from "./TraitsDisplay";
import { TrappingsDisplay } from "./TrappingsDisplay";
import "./CreatureDisplay.css";
import type { Creature } from "../domains/Creature";

interface CreatureDisplayProps {
  creature: Creature;
}

export const CreatureDisplay: React.FC<CreatureDisplayProps> = ({
  creature,
}) => {
  return (
    <div className="creature-display-container">
      <CharacteristicsDisplay creature={creature} />
      <SkillsDisplay creature={creature} />
      <TraitsDisplay creature={creature} />
      <TrappingsDisplay creature={creature} />
    </div>
  );
};
