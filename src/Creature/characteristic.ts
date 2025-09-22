import type { CharacteristicDefinition } from "./creature.type";

export class Characteristic {
  public readonly name: string;
  public readonly description: string;
  private _baseValue: number;
  private _advances: number;

  constructor(definition: CharacteristicDefinition) {
    this.name = definition.name;
    this.description = definition.description;
    this._baseValue = 0;
    this._advances = 0;
  }

  /**
   * The base value of the characteristic, before advances.
   */
  public get baseValue(): number {
    return this._baseValue;
  }

  /**
   * The number of advances applied to the characteristic.
   */
  public get advances(): number {
    return this._advances;
  }

  /**
   * The total value of the characteristic, including advances.
   */
  public get value(): number {
    return this._baseValue + this._advances;
  }

  /**
   * Adds advances to the characteristic.
   * @param amount The number of advances to add. Must be a positive number.
   */
  public addAdvances(amount: number): void {
    if (amount < 0) {
      throw new Error("Cannot add a negative number of advances.");
    }
    this._advances += amount;
  }
}
