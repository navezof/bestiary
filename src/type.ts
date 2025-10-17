import type { Creature } from "./domains/Creature";

export interface TraitDefinition {
  name: string;
  description: string;
  apply?: (creature: Creature, parameter?: string) => void;
  parameter?: string;
}

export interface CharacteristicDefinition {
  name: string;
  shortName: string;
  description: string;
}

export interface CharacteristicModifier {
  definition: CharacteristicDefinition;
  value: number;
}

export interface SkillDefinition {
  name: string;
  description: string;
  linkedCharacteristic: CharacteristicDefinition;
  specializations?: string;
}

export interface SkillModifier {
  definition: SkillDefinition;
  value: number;
  specialization?: string;
}

export interface Species {
  name: string;
  baseCharacteristics: CharacteristicModifier[];
  baseSkills?: SkillModifier[];
  baseTraits?: TraitDefinition[];
  optionalTraits?: TraitDefinition[];
  archetypes?: Archetype[];
  movement: number;
  wounds: number;
}

export interface Archetype {
  name: string;
  description: string;
  characteristics: CharacteristicModifier[];
  skills?: SkillModifier[];
  traits?: TraitDefinition[];
  trappings?: AnyItem[];
}

export const Availability = {
  Common: "Common",
  Scarce: "Scarce",
  Rare: "Rare",
  Exotic: "Exotic",
};

export type Availability = (typeof Availability)[keyof typeof Availability];

export const Reach = {
  Short: "Short",
  Medium: "Medium",
  Long: "Long",
};

export type Reach = (typeof Reach)[keyof typeof Reach];

export interface Item {
  name: string;
  description: string;
  cost: number;
  encumbrance: number;
  availability: Availability;
  type?: "weapon" | "armor" | "other";
}

export const MeleeWeaponCategory = {
  Basic: "Basic",
  Cavalry: "Cavalry",
  Fencing: "Fencing",
  Brawling: "Brawling",
  Flail: "Flail",
  Parry: "Parry",
  Polearm: "Polearm",
  TwoHanded: "Two-Handed",
} as const;

export type MeleeWeaponCategory =
  (typeof MeleeWeaponCategory)[keyof typeof MeleeWeaponCategory];

export const RangedWeaponCategory = {
  Blackpowder: "Blackpowder",
  Bow: "Bow",
  Crossbow: "Crossbow",
  Engineering: "Engineering",
  Entangling: "Entangling",
  Explosives: "Explosives",
  Sling: "Sling",
  Throwing: "Throwing",
};

export type RangedWeaponCategory =
  (typeof RangedWeaponCategory)[keyof typeof RangedWeaponCategory];

export interface MeleeWeapon extends Item {
  type: "weapon";
  category: MeleeWeaponCategory;
  damage: string;
  reach: Reach;
  // TODO: qualities?: string[];
}

export interface RangedWeapon extends Item {
  type: "weapon";
  category: RangedWeaponCategory;
  damage: string;
  range: number;
  // TODO: qualities?: string[];
}

export const HitLocation = {
  Head: "Head",
  Arms: "Arms",
  Legs: "Legs",
  Body: "Body",
};

export type HitLocation = (typeof HitLocation)[keyof typeof HitLocation];

export interface Armor extends Item {
  type: "armor";
  armorPoints: number;
  locations: HitLocation[];
  penalty: string;
}

/**
 * A discriminated union of all possible item types.
 * This allows for type-safe handling of different item categories.
 */
export type AnyItem = MeleeWeapon | RangedWeapon | Armor | Item;
