import type { SkillDefinition } from "../creature.type";

export const Melee: SkillDefinition = {
    name: "Melee",
    description: "Proficiency in close combat using melee weapons.",
    linkedCharacteristic: "Weapon Skill",
};

export const Stealth: SkillDefinition = {
    name: "Stealth",
    description: "Ability to move silently and avoid detection.",
    linkedCharacteristic: "Agility",
};