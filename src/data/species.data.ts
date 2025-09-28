import type { Species } from "../type";
import {
  animosity,
  armour,
  belligerent,
  dieHard,
  hardy,
  painless,
  ranged,
  size,
} from "./traits.data";
import { Melee, Stealth } from "./skill.data";
import { Soldier } from "./archetype.data";
import {
  Agility,
  BallisticSkill,
  Dexterity,
  Fellowship,
  Initiative,
  Intelligence,
  Strength,
  Toughness,
  WeaponSkill,
  Willpower,
} from "./characteristics.data";

export const SpeciesDefinition: Species[] = [
  {
    name: "base",
    baseCharacteristics: [
      {
        definition: WeaponSkill,
        value: 20,
      },
      {
        definition: BallisticSkill,
        value: 20,
      },
      {
        definition: Strength,
        value: 20,
      },
      {
        definition: Toughness,
        value: 20,
      },
      {
        definition: Initiative,
        value: 20,
      },
      {
        definition: Agility,
        value: 20,
      },
      {
        definition: Dexterity,
        value: 20,
      },
      {
        definition: Intelligence,
        value: 20,
      },
      {
        definition: Willpower,
        value: 20,
      },
      {
        definition: Fellowship,
        value: 20,
      },
    ],
  },
  {
    name: "Goblin",
    baseCharacteristics: [
      {
        definition: WeaponSkill,
        value: 25,
      },
      {
        definition: BallisticSkill,
        value: 35,
      },
      {
        definition: Strength,
        value: 30,
      },
      {
        definition: Toughness,
        value: 30,
      },
      {
        definition: Initiative,
        value: 20,
      },
      {
        definition: Agility,
        value: 35,
      },
      {
        definition: Dexterity,
        value: 30,
      },
      {
        definition: Intelligence,
        value: 30,
      },
      {
        definition: Willpower,
        value: 20,
      },
      {
        definition: Fellowship,
        value: 20,
      },
    ],
    baseTraits: [{ ...armour, parameter: "3" }],
    baseSkills: [
      { skillDefinition: Melee, baseValue: 10, specialization: "Stabba" },
      { skillDefinition: Stealth, baseValue: 5 },
    ],
    archetypes: [Soldier],
  },
  {
    name: "Orc",
    baseCharacteristics: [
      { definition: WeaponSkill, value: 35 },
      { definition: BallisticSkill, value: 35 },
      { definition: Strength, value: 30 },
      { definition: Toughness, value: 30 },
      { definition: Initiative, value: 20 },
      { definition: Agility, value: 25 },
      { definition: Dexterity, value: 20 },
      { definition: Intelligence, value: 25 },
      { definition: Willpower, value: 35 },
      { definition: Fellowship, value: 20 },
    ],
    baseTraits: [
      hardy,
      { ...armour, parameter: "3" },
      { ...animosity, parameter: "Greenskin" },
      belligerent,
      dieHard,
    ],
    baseSkills: [
      { skillDefinition: Melee, baseValue: 10, specialization: "Choppa" },
    ],
    optionalTraits: [
      painless,
      { ...ranged, parameter: "+8, range 50" },
      { ...size, parameter: "Large" },
    ],
  },
];
