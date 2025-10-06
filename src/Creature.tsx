import { Characteristic } from "./characteristic";
import type {
  AnyItem,
  Archetype,
  CharacteristicDefinition,
  CharacteristicModifier,
  Item,
  SkillDefinition,
  SkillModifier,
  Species,
  TraitDefinition,
} from "./type";
import { Skill } from "./skill";
import { SpeciesDefinition } from "./data/species.data";
import { rollDie } from "./utilities";

export class Creature {
  private _species: string;
  private _characteristics: Map<string, Characteristic>;
  private _skills: Map<string, Skill>;
  private _traits: Map<string, TraitDefinition>;
  // TODO: Add inventory management to have several time the same item
  private _trappings: Map<string, AnyItem>;
  private _wounds: number;

  constructor(characteristicsDefinitions: CharacteristicDefinition[]) {
    this._species = SpeciesDefinition[0].name;
    this._characteristics = new Map(
      characteristicsDefinitions.map((definition) => [
        definition.name,
        new Characteristic(definition),
      ])
    );
    this._skills = new Map();
    this._traits = new Map();
    this._trappings = new Map();
    this._wounds = 0;
  }

  /// SPECIES

  public get species(): string {
    return this._species;
  }

  public set species(value: string) {
    this._species = value;
  }

  applySpecies = (species: Species) => {
    this._species = species.name;
    this.addCharacteristic(species.baseCharacteristics);
    if (species.baseSkills) this.updateSkills(species.baseSkills);
    if (species.baseTraits) this.addTraits(species.baseTraits);
    if (species.optionalTraits) this.addTraits(species.optionalTraits, 50);
  };

  /// CHARACTERISTICS

  public get characteristics(): readonly Characteristic[] {
    return Array.from(this._characteristics.values());
  }

  public getCharacteristic(
    definition: CharacteristicDefinition
  ): Characteristic | undefined {
    return this._characteristics.get(definition.name);
  }

  addCharacteristic = (characteristics: CharacteristicModifier[]) => {
    characteristics.forEach((modifier) => {
      const randomValue = modifier.value - 10 + rollDie("2d10");
      this.setCharacteristicValue(modifier.definition, randomValue);
    });
  };

  public setCharacteristicValue(
    definition: CharacteristicDefinition,
    value: number
  ): void {
    const characteristic = this.getCharacteristic(definition);
    if (characteristic) {
      characteristic.setBaseValue(value);
    }
  }

  updateCharacteristics = (characteristics: CharacteristicModifier[]) => {
    characteristics.forEach(({ definition, value }) => {
      this.updateCharacteristicBaseValue(definition, value);
    });
  };

  public updateCharacteristicBaseValue(
    definition: CharacteristicDefinition,
    value: number
  ): void {
    const characteristic = this.getCharacteristic(definition);
    if (characteristic) {
      characteristic.setBaseValue(characteristic.value + value);
    }
  }

  /// SKILLS

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

  updateSkills = (skills: SkillModifier[]) => {
    skills.forEach((skill) => {
      this.updateSkill(skill);
    });
  };

  public updateSkill(modifier: SkillModifier) {
    const skill = this.getSkill(modifier.definition.name);
    if (skill) {
      skill.addAdvances(modifier.value);
    } else {
      this.addSkill(modifier);
    }
  }

  /// TRAITS

  public get traits(): readonly TraitDefinition[] {
    return Array.from(this._traits.values());
  }

  public getTrait(name: string) {
    return this._traits.get(name);
  }

  public addTraits = (
    traits: TraitDefinition[],
    chanceToHaveTrait: number = 100
  ) => {
    traits.forEach((trait: TraitDefinition) => {
      if (Math.random() < chanceToHaveTrait / 100) {
        this.addTrait(trait);
      }
    });
  };

  public addTrait(trait: TraitDefinition) {
    if (trait === undefined) return;
    if (this.getTrait(trait.name)) {
      console.warn(`Trait: ${trait.name} is already applied`);
      return;
    }
    trait.apply?.(this, trait.parameter);
    this._traits.set(trait.name, trait);
  }

  /// TRAPPINGS

  addTrappings = (trappings: Item[]) => {
    trappings.forEach((item: Item) => this.addTrapping(item));
  };

  public addTrapping(item: AnyItem) {
    if (item === undefined) return;
    if (!this._trappings.get(item.name)) {
      this._trappings.set(item.name, item);
    }
  }

  public get trappings(): readonly AnyItem[] {
    return this._trappings ? Array.from(this._trappings.values()) : [];
  }

  public get wounds(): number {
    return this._wounds;
  }

  public set wounds(value: number) {
    this._wounds = value;
  }

  applyArchetype = (archetype: Archetype) => {
    this.updateCharacteristics(archetype.characteristics);
    if (archetype.skills) this.updateSkills(archetype.skills);
    if (archetype.traits) this.addTraits(archetype.traits);
    if (archetype.trappings) this.addTrappings(archetype.trappings);
  };
}
