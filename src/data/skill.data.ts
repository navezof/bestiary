import type { SkillDefinition } from "../type";
import { Agility, WeaponSkill } from "./characteristics.data";

export const Melee: SkillDefinition = {
  name: "Melee",
  description: "Proficiency in close combat using melee weapons.",
  linkedCharacteristic: WeaponSkill,
};

export const Stealth: SkillDefinition = {
  name: "Stealth",
  description: "Ability to move silently and avoid detection.",
  linkedCharacteristic: Agility,
};

export const Cool: SkillDefinition = {
  name: "Cool",
  description: "",
  linkedCharacteristic: Agility,
};

export const Dodge: SkillDefinition = {
  name: "Dodge",
  description: "",
  linkedCharacteristic: Agility,
};
