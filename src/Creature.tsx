import { Characteristic } from "./characteristic";
import type {
  CharacteristicDefinition,
  SkillDefinition,
  TraitDefinition,
} from "./creature.type";
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

  public getCharacteristic(name: string): Characteristic | undefined {
    return this._characteristics.get(name);
  }

  public setCharacteristicValue(name: string, value: number): void {
    const characteristic = this.getCharacteristic(name);
    if (characteristic) {
      characteristic.setBaseValue(value);
    }
  }

  public get skills(): readonly Skill[] {
    return Array.from(this._skills.values());
  }

  public getSkill(name: string) {
    return this._skills.get(name);
  }

  public addSkill(
    definition: SkillDefinition,
    baseAdvance: number,
    specialization?: string
  ) {
    if (
      !this.getSkill(definition.name) ||
      this.getSkill(definition.name)?.specializations != specialization
    ) {
      this._skills.set(
        definition.name,
        new Skill(this, definition, baseAdvance, specialization)
      );
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
