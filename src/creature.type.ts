import type { Creature } from "./Creature";

export interface TraitDefinition {
  name: string;
  description: string;
  apply?: (creature: Creature, parameter?: string) => void;
  parameter?: string;
}

export interface CharacteristicDefinition {
  name: string;
  description: string;
}

export interface SkillDefinition {
  name: string;
  description: string;
  linkedCharacteristic: string;
  specializations?: string;
}

export interface Species {
  name: string;
  baseCharacteristics: { [key: string]: number };
  baseSkills?: { skillDefinition: SkillDefinition; baseValue: number; specialization?: string }[];
  baseTraits?: TraitDefinition[];
  optionalTraits?: TraitDefinition[];
}
