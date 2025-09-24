import type { Species } from "../creature.type";
import { armour, hardy } from "../traits";
import { Melee, Stealth } from "./skill.data";

export const SpeciesDefinition: Species[] = [
  {
    name: "base",
    baseCharacteristics: {
      "Weapon Skill": 20,
      "Ballistic Skill": 20,
      Strength: 20,
      Toughness: 20,
      Initiative: 20,
      Agility: 20,
      Dexterity: 20,
      Intelligence: 20,
      Willpower: 20,
      Fellowship: 20,
    },
  },
  {
    name: "Goblin",
    baseCharacteristics: {
      "Weapon Skill": 25,
      "Ballistic Skill": 35,
      Strength: 30,
      Toughness: 30,
      Initiative: 20,
      Agility: 35,
      Dexterity: 30,
      Intelligence: 30,
      Willpower: 20,
      Fellowship: 20,
    },
    baseTraits: [{ ...armour, parameter: "3" }],
    baseSkills: [{ skillDefinition: Melee, baseValue: 10, specialization: "Stabba" }, { skillDefinition: Stealth, baseValue: 5 }],
  },
  {
    name: "Orc",
    baseCharacteristics: {
      "Weapon Skill": 35,
      "Ballistic Skill": 35,
      Strength: 30,
      Toughness: 30,
      Initiative: 20,
      Agility: 25,
      Dexterity: 20,
      Intelligence: 25,
      Willpower: 35,
      Fellowship: 20,
    },
    baseTraits: [hardy, { ...armour, parameter: "6" }],
    baseSkills: [{ skillDefinition: Melee, baseValue: 10, specialization: "Choppa" }],
    optionalTraits: [],
  },
];
