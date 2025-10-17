import type { CharacteristicDefinition } from "../type";

export class Characteristic {
  public readonly name: string;
  public readonly shortName: string;
  public readonly description: string;
  private _baseValue: number;
  private _advances: number;

  constructor(definition: CharacteristicDefinition) {
    this.name = definition.name;
    this.shortName = definition.shortName;
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
   * Sets the base value of the characteristic.
   * @param value The new base value. Must be a non-negative number.
   */
  public setBaseValue(value: number): void {
    if (value < 0) {
      throw new Error("Base value cannot be negative.");
    }
    this._baseValue = value;
  }

  /**
   * Modifies the base value of the characteristic by a given amount.
   * @param delta The amount to modify the base value by. Can be positive or negative.
   * @returns
   */
  public modifyBaseValue(delta: number): void {
    const newValue = this._baseValue + delta;
    if (newValue < 0) {
      this._baseValue = 0;
      return;
    }
    this._baseValue = newValue;
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
