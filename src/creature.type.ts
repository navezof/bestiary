import type { Creature } from "./Creature";

export interface SkillDefinition {
  name: string;
  description: string;
  characteristic: CharacteristicDefinition;
}

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

export interface Species {
  name: string;
  baseCharacteristics: { [key: string]: number };
  baseTraits?: TraitDefinition[];
  optionalTraits?: TraitDefinition[];
}
