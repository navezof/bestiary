import { Characteristic } from "./characteristic";
import type { CharacteristicDefinition } from "./creature.type";

export class Creature {
  private _characteristics: Characteristic[];

  constructor(characteristicsDefinitions: CharacteristicDefinition[]) {
    this._characteristics = characteristicsDefinitions.map(
      (definition) => new Characteristic(definition)
    );
  }

  public get characteristics(): readonly Characteristic[] {
    return this._characteristics;
  }

  public getCharacteristic(name: string): Characteristic | undefined {
    return this._characteristics.find(
      (characteristic) => characteristic.name === name
    );
  }

  public setCharacteristicValue(name: string, value: number): void {
    const characteristic = this.getCharacteristic(name);
    if (characteristic) {
      characteristic.setBaseValue(value);
    }
  }
}
