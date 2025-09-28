import type { Characteristic } from "./characteristic";
import type { Creature } from "./Creature";
import type { CharacteristicDefinition, SkillDefinition } from "./type";

export class Skill {
  public readonly name: string;
  public readonly description: string;
  public readonly linkedCharacteristic: CharacteristicDefinition;

  private _characteristics: Characteristic;
  private _advances: number;
  private _specialization: string;

  constructor(
    creature: Creature,
    definition: SkillDefinition,
    baseAdvance?: number,
    specialization?: string
  ) {
    this.name = definition.name;
    this.description = definition.description;
    this.linkedCharacteristic = definition.linkedCharacteristic;

    this._characteristics = creature.getCharacteristic(
      this.linkedCharacteristic
    )!;
    this._advances = baseAdvance ?? 0;
    this._specialization = specialization ?? "";
  }

  public get value(): number {
    return this._characteristics.value + this._advances;
  }

  public get characteristic(): Characteristic {
    return this._characteristics;
  }

  public get advances(): number {
    return this._advances;
  }

  public addAdvances(amount: number): void {
    this._advances += amount;
  }

  public get specialization(): string {
    return this._specialization;
  }
}
