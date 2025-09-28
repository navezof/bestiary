import type { CharacteristicDefinition } from "../type";

export const WeaponSkill: CharacteristicDefinition = {
  name: "Weapon Skill",
  description: "A measure of a creature's proficiency in melee combat.",
};

export const BallisticSkill: CharacteristicDefinition = {
  name: "Ballistic Skill",
  description: "A measure of a creature's proficiency in ranged combat.",
};

export const Strength: CharacteristicDefinition = {
  name: "Strength",
  description:
    "A measure of a creature's physical power and ability to exert force.",
};

export const Toughness: CharacteristicDefinition = {
  name: "Toughness",
  description:
    "A measure of a creature's resilience and ability to withstand damage.",
};

export const Initiative: CharacteristicDefinition = {
  name: "Initiative",
  description: "A measure of a creature's quickness and reflexes in combat.",
};

export const Agility: CharacteristicDefinition = {
  name: "Agility",
  description: "A measure of a creature's overall coordination and nimbleness.",
};

export const Dexterity: CharacteristicDefinition = {
  name: "Dexterity",
  description: "A measure of a creature's hand-eye coordination and precision.",
};

export const Intelligence: CharacteristicDefinition = {
  name: "Intelligence",
  description:
    "A measure of a creature's cognitive abilities and problem-solving skills.",
};

export const Willpower: CharacteristicDefinition = {
  name: "Willpower",
  description: "A measure of a creature's mental fortitude and determination.",
};

export const Fellowship: CharacteristicDefinition = {
  name: "Fellowship",
  description:
    "A measure of a creature's social skills and ability to interact with others.",
};

export const BASE_CHARACTERISTIC_DEFINITION: CharacteristicDefinition[] = [
  WeaponSkill,
  BallisticSkill,
  Strength,
  Toughness,
  Initiative,
  Agility,
  Dexterity,
  Intelligence,
  Willpower,
  Fellowship,
];
