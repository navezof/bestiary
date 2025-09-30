import type { Archetype } from "../type";
import {
  WeaponSkill,
  Strength,
  Toughness,
  Initiative,
  Willpower,
} from "./characteristics.data";
import { Cool, Dodge, Melee } from "./skill.data";
import { belligerent, dieHard } from "./traits.data";

export const Soldier: Archetype = {
  name: "Soldier",
  description: "A basic soldier archetype.",
  characteristics: [
    { definition: WeaponSkill, value: 5 },
    { definition: Strength, value: 5 },
    { definition: Toughness, value: 5 },
    { definition: Initiative, value: 10 },
    { definition: Willpower, value: 5 },
  ],
  skills: [
    {
      definition: Cool,
      value: 10,
    },
    {
      definition: Dodge,
      value: 10,
    },
    {
      definition: Melee,
      value: 10,
    },
  ],
  traits: [belligerent, dieHard],
};
