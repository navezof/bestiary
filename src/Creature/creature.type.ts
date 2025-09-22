export interface SkillDefinition {
  name: string;
  description: string;
  characteristic: CharacteristicDefinition;
}

export interface CharacteristicDefinition {
  name: string;
  description: string;
}
