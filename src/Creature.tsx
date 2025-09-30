import { Characteristic } from "./characteristic";
import type {
  CharacteristicDefinition,
  SkillDefinition,
  SkillModifier,
  TraitDefinition,
} from "./type";
import { Skill } from "./skill";

export class Creature {
  private _characteristics: Map<string, Characteristic>;
  private _skills: Map<string, Skill>;
  private _traits: Map<string, TraitDefinition>;
  private _wounds: number;

  constructor(characteristicsDefinitions: CharacteristicDefinition[]) {
    this._characteristics = new Map(
      characteristicsDefinitions.map((definition) => [
        definition.name,
        new Characteristic(definition),
      ])
    );
    this._skills = new Map();
    this._traits = new Map();
    this._wounds = 0;
  }

  public get characteristics(): readonly Characteristic[] {
    return Array.from(this._characteristics.values());
  }

  public getCharacteristic(
    definition: CharacteristicDefinition
  ): Characteristic | undefined {
    return this._characteristics.get(definition.name);
  }

  public setCharacteristicValue(
    definition: CharacteristicDefinition,
    value: number
  ): void {
    const characteristic = this.getCharacteristic(definition);
    if (characteristic) {
      characteristic.setBaseValue(value);
    }
  }

  public updateCharacteristicValue(
    definition: CharacteristicDefinition,
    value: number
  ): void {
    const characteristic = this.getCharacteristic(definition);
    if (characteristic) {
      characteristic.setBaseValue(characteristic.value + value);
    }
  }

  public get skills(): readonly Skill[] {
    return Array.from(this._skills.values());
  }

  public getSkill(name: string) {
    return this._skills.get(name);
  }

  public hasSkill(
    definition: SkillDefinition,
    specialization: string | undefined
  ) {
    const skill = this.getSkill(definition.name);
    if (!skill) return false;
    if (specialization && skill.specialization != specialization) return false;
    return true;
  }

  public addSkill(modifier: SkillModifier) {
    if (!this.hasSkill(modifier.definition, modifier.specialization))
      this._skills.set(
        modifier.definition.name,
        new Skill(
          this,
          modifier.definition,
          modifier.value,
          modifier.specialization
        )
      );
  }

  public updateSkill(modifier: SkillModifier) {
    const skill = this.getSkill(modifier.definition.name);
    if (skill) {
      skill.addAdvances(modifier.value);
    } else {
      this.addSkill(modifier);
    }
  }

  public get traits(): readonly TraitDefinition[] {
    return Array.from(this._traits.values());
  }

  public getTrait(name: string) {
    return this._traits.get(name);
  }

  public addTrait(trait: TraitDefinition) {
    if (trait === undefined) return;
    if (!this.getTrait(trait.name)) {
      trait.apply?.(this, trait.parameter);
      this._traits.set(trait.name, trait);
    }
  }

  public get wounds(): number {
    return this._wounds;
  }

  public set wounds(value: number) {
    this._wounds = value;
  }
}
