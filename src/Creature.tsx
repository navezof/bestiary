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
import { BASE_CHARACTERISTIC_DEFINITION } from "./data/characteristics.data";

export class Creature {
  private _species: string;
  private _characteristics: Map<string, Characteristic>;
  private _skills: Map<string, Skill>;
  private _traits: Map<string, TraitDefinition>;
  private _trappings: Map<string, AnyItem>;
  private _wounds: number;

  constructor(source?: Creature) {
    if (source) {
      // Copy constructor
      this._species = source._species;
      this._characteristics = new Map(source._characteristics);
      this._skills = new Map(source._skills);
      this._traits = new Map(source._traits);
      this._trappings = new Map(source._trappings);
      this._wounds = source._wounds;
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
    }
  }

  /// SPECIES

  public get species(): string {
    return this._species;
  }

  public set species(value: string) {
    this._species = value;
  }

  public applySpecies(species: Species) {
    let creature = new Creature(this);
    console.log("[start] applySpecies", creature);
    creature.species = species.name;
    creature = creature.initializeCharacteristics(species.baseCharacteristics);
    if (species.baseSkills)
      creature = creature.updateSkills(species.baseSkills);
    if (species.baseTraits) creature = creature.addTraits(species.baseTraits);
    if (species.optionalTraits)
      creature = creature.addTraits(species.optionalTraits, 50);
    console.log("[end] applySpecies", creature.skills);
    return creature;
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

  public initializeCharacteristics(characteristics: CharacteristicModifier[]) {
    const creature: Creature = new Creature(this);
    characteristics.forEach((modifier) => {
      const randomValue = modifier.value - 10 + rollDie("2d10");
      creature.setCharacteristicValue(modifier.definition, randomValue);
    });
    return creature;
  }

  public setCharacteristicValue(
    definition: CharacteristicDefinition,
    value: number
  ): void {
    const characteristic = this.getCharacteristic(definition);
    characteristic?.setBaseValue(value);
  }

  public updateCharacteristics(characteristics: CharacteristicModifier[]) {
    const creature = new Creature(this);
    characteristics.forEach(({ definition, value }) => {
      creature.updateCharacteristicBaseValue(definition, value);
    });
    return creature;
  }

  public updateCharacteristicBaseValue(
    definition: CharacteristicDefinition,
    value: number
  ): void {
    const characteristic = this.getCharacteristic(definition);
    characteristic?.setBaseValue(characteristic.value + value);
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

  public updateSkills(skills: SkillModifier[]) {
    let creature = new Creature(this);
    console.log("[start] updateSkills ", skills);
    skills.forEach((skill) => {
      creature = creature.updateSkill(skill);
    });
    console.log("[end] updateSkills done", creature.skills);
    return creature;
  }

  public updateSkill(modifier: SkillModifier) {
    console.log("[start] updateSkill ", modifier);
    const skill = this.getSkill(modifier.definition.name);
    if (skill) {
      skill.addAdvances(modifier.value);
      return new Creature(this);
    }
    return this.addSkill(modifier);
  }

  public addSkill(modifier: SkillModifier) {
    console.log("[start] addSkill ", modifier);
    const creature = new Creature(this);
    if (!creature.hasSkill(modifier.definition, modifier.specialization))
      creature._skills.set(
        modifier.definition.name,
        new Skill(
          creature,
          modifier.definition,
          modifier.value,
          modifier.specialization
        )
      );
    console.log("[end] addSkill done", creature.skills);
    return creature;
  }

  /// TRAITS

  public get traits(): readonly TraitDefinition[] {
    return Array.from(this._traits.values());
  }

  public getTrait(name: string) {
    return this._traits.get(name);
  }

  public addTraits(traits: TraitDefinition[], chanceToHaveTrait: number = 100) {
    let creature = new Creature(this);
    traits.forEach((trait: TraitDefinition) => {
      if (Math.random() < chanceToHaveTrait / 100) {
        creature = creature.addTrait(trait);
      }
    });
    return creature;
  }

  public addTrait(trait: TraitDefinition) {
    if (trait === undefined) return this;
    const creature = new Creature(this);
    if (creature.getTrait(trait.name)) {
      console.warn(`Trait: ${trait.name} is already applied`);
      return this;
    }
    trait.apply?.(creature, trait.parameter);
    creature._traits.set(trait.name, trait);
    return creature;
  }

  /// TRAPPINGS

  public addTrappings(trappings: Item[]) {
    let creature = new Creature(this);
    trappings.forEach((item: Item) => (creature = creature.addTrapping(item)));
    return creature;
  }

  public addTrapping(item: AnyItem) {
    if (item === undefined) return this;
    const creature = new Creature(this);
    if (!creature._trappings.get(item.name)) {
      creature._trappings.set(item.name, item);
    }
    return creature;
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

  public applyArchetype(archetype: Archetype) {
    let creature = new Creature(this);
    creature = creature.updateCharacteristics(archetype.characteristics);
    if (archetype.skills) {
      console.log("applying skills");
      creature = creature.updateSkills(archetype.skills);
    }
    if (archetype.traits) creature = creature.addTraits(archetype.traits);
    if (archetype.trappings)
      creature = creature.addTrappings(archetype.trappings);
    return creature;
  }
}
