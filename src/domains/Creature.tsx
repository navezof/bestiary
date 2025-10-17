import { BASE_CHARACTERISTIC_DEFINITION } from "../data/characteristics.data";
import { SpeciesDefinition } from "../data/species.data";
import type {
  TraitDefinition,
  AnyItem,
  CharacteristicDefinition,
} from "../type";
import { Characteristic } from "./characteristic";
import { Skill } from "./skill";

export class Creature {
  private _species: string;
  private _characteristics: Map<string, Characteristic>;
  private _skills: Map<string, Skill>;
  private _traits: Map<string, TraitDefinition>;
  private _trappings: Map<string, AnyItem>;
  private _wounds: number;
  private _movement: number;

  constructor(source?: Creature) {
    if (source) {
      // Copy constructor
      this._species = source._species;
      this._characteristics = new Map(source._characteristics);
      this._skills = new Map(source._skills);
      this._traits = new Map(source._traits);
      this._trappings = new Map(source._trappings);
      this._wounds = source._wounds;
      this._movement = source._movement;
    } else {
      // Default constructor
      this._species = SpeciesDefinition[0].name;
      this._characteristics = new Map(
        BASE_CHARACTERISTIC_DEFINITION.map((definition) => [
          definition.name,
          new Characteristic(definition),
        ])
      );
      this._skills = new Map();
      this._traits = new Map();
      this._trappings = new Map();
      this._wounds = 0;
      this._movement = 0;
    }
  }

  /// SPECIES

  public get species(): string {
    return this._species;
  }

  public set species(value: string) {
    this._species = value;
  }

  /// CHARACTERISTICS

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
    characteristic?.setBaseValue(value);
  }

  /// SKILLS

  public get skills(): readonly Skill[] {
    return Array.from(this._skills.values());
  }

  public getSkill(name: string) {
    return this._skills.get(name);
  }

  public get skillsMap(): Map<string, Skill> {
    return this._skills;
  }

  /// TRAITS

  public get traits(): readonly TraitDefinition[] {
    return Array.from(this._traits.values());
  }

  public get traitsMap(): Map<string, TraitDefinition> {
    return this._traits;
  }

  public getTrait(name: string) {
    return this._traits.get(name);
  }

  /// TRAPPINGS

  public get trappings(): readonly AnyItem[] {
    return this._trappings ? Array.from(this._trappings.values()) : [];
  }
  public get trappingsMap(): Map<string, AnyItem> {
    return this._trappings;
  }

  /// WOUNDS

  public get wounds(): number {
    return this._wounds;
  }

  public set wounds(value: number) {
    this._wounds = value;
  }

  /// MOVEMENT

  public get movement(): number {
    return this._movement;
  }

  public set movement(value: number) {
    this._movement = value;
  }
}
