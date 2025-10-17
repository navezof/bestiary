import type { CharacteristicDefinition } from "../type";

export const WeaponSkill: CharacteristicDefinition = {
  name: "Weapon Skill",
  shortName: "WS",
  description: "A measure of a creature's proficiency in melee combat.",
};

export const BallisticSkill: CharacteristicDefinition = {
  name: "Ballistic Skill",
  shortName: "BS",
  description: "A measure of a creature's proficiency in ranged combat.",
};

export const Strength: CharacteristicDefinition = {
  name: "Strength",
  shortName: "S",
  description:
    "A measure of a creature's physical power and ability to exert force.",
};

export const Toughness: CharacteristicDefinition = {
  name: "Toughness",
  shortName: "T",
  description:
    "A measure of a creature's resilience and ability to withstand damage.",
};

export const Initiative: CharacteristicDefinition = {
  name: "Initiative",
  shortName: "I",
  description: "A measure of a creature's quickness and reflexes in combat.",
};

export const Agility: CharacteristicDefinition = {
  name: "Agility",
  shortName: "Ag",
  description: "A measure of a creature's overall coordination and nimbleness.",
};

export const Dexterity: CharacteristicDefinition = {
  name: "Dexterity",
  shortName: "Dex",
  description: "A measure of a creature's hand-eye coordination and precision.",
};

export const Intelligence: CharacteristicDefinition = {
  name: "Intelligence",
  shortName: "Int",
  description:
    "A measure of a creature's cognitive abilities and problem-solving skills.",
};

export const Willpower: CharacteristicDefinition = {
  name: "Willpower",
  shortName: "WP",
  description: "A measure of a creature's mental fortitude and determination.",
};

export const Fellowship: CharacteristicDefinition = {
  name: "Fellowship",
  shortName: "Fel",
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
