import type {
  AnyItem,
  Archetype,
  CharacteristicModifier,
  Item,
  SkillModifier,
  Species,
  TraitDefinition,
} from "../type";
import { rollDie } from "../utilities";
import { Creature } from "./Creature";
import { Skill } from "./skill";

export const initializeCharacteristics = (
  source: Creature,
  characteristics: CharacteristicModifier[]
): Creature => {
  const creature: Creature = new Creature(source);
  characteristics.forEach((modifier) => {
    const randomValue = modifier.value - 10 + rollDie("2d10");
    creature.setCharacteristicValue(modifier.definition, randomValue);
  });
  creature.wounds = source.wounds;
  creature.movement = source.movement;
  return creature;
};

export const updateCharacteristics = (
  source: Creature,
  characteristics: CharacteristicModifier[]
): Creature => {
  const creature = new Creature(source);
  characteristics.forEach(({ definition, value }) => {
    const characteristic = creature.getCharacteristic(definition);
    characteristic?.setBaseValue(characteristic.value + value);
  });
  return creature;
};

export const updateSkills = (
  source: Creature,
  skills: SkillModifier[]
): Creature => {
  let creature = new Creature(source);
  skills.forEach((skill) => {
    creature = updateSkill(creature, skill);
  });
  return creature;
};

export const updateSkill = (
  source: Creature,
  modifier: SkillModifier
): Creature => {
  const creature = new Creature(source);
  const skill = creature.getSkill(modifier.definition.name);
  if (skill) {
    skill.addAdvances(modifier.value);
    return creature;
  }
  return addSkill(creature, modifier);
};

export const addSkill = (
  source: Creature,
  modifier: SkillModifier
): Creature => {
  const creature = new Creature(source);
  const skill = creature.getSkill(modifier.definition.name);
  if (
    !skill ||
    (modifier.specialization &&
      skill.specialization !== modifier.specialization)
  ) {
    creature.skillsMap.set(
      modifier.definition.name,
      new Skill(
        creature,
        modifier.definition,
        modifier.value,
        modifier.specialization
      )
    );
  }
  return creature;
};

export const addTraits = (
  source: Creature,
  traits: TraitDefinition[],
  chanceToHaveTrait: number = 100
): Creature => {
  const creature = new Creature(source);
  traits.forEach((trait: TraitDefinition) => {
    if (Math.random() < chanceToHaveTrait / 100) {
      if (trait !== undefined && !creature.getTrait(trait.name)) {
        trait.apply?.(creature, trait.parameter);
        creature.traitsMap.set(trait.name, trait);
      }
    }
  });
  return creature;
};

export const addTrappings = (source: Creature, trappings: Item[]): Creature => {
  const creature = new Creature(source);
  trappings.forEach((item: AnyItem) => {
    if (item !== undefined && !creature.trappingsMap.get(item.name)) {
      creature.trappingsMap.set(item.name, item);
    }
  });
  return creature;
};

export const applySpecies = (source: Creature, species: Species): Creature => {
  const newCreature = CreatureBuilder.from(source)
    .withBaseCharacteristics(species.baseCharacteristics)
    .withSkills(species.baseSkills ?? [])
    .withTraits(species.baseTraits ?? [])
    .withTraits(species.optionalTraits ?? [])
    .withWounds(species.wounds)
    .withMovement(species.movement)
    .build();
  newCreature.species = species.name;
  return newCreature;
};

export const applyArchetype = (
  source: Creature,
  archetype: Archetype
): Creature => {
  const newCreature = CreatureBuilder.from(source)
    .withCharacteristics(archetype.characteristics)
    .withSkills(archetype.skills ?? [])
    .withTraits(archetype.traits ?? [])
    .withTrappings(archetype.trappings ?? [])
    .build();
  return newCreature;
};

export class CreatureBuilder {
  private _creature: Creature;

  private constructor(creature: Creature) {
    this._creature = creature;
  }

  static from(creature: Creature) {
    return new CreatureBuilder(creature);
  }

  withSpecies(species: Species) {
    this._creature = applySpecies(this._creature, species);
    return this;
  }

  withArchetype(archetype: Archetype) {
    this._creature = applyArchetype(this._creature, archetype);
    return this;
  }

  withSkills(skills: SkillModifier[]) {
    this._creature = updateSkills(this._creature, skills);
    return this;
  }

  withCharacteristics(characteristics: CharacteristicModifier[]) {
    this._creature = updateCharacteristics(this._creature, characteristics);
    return this;
  }

  withBaseCharacteristics(characteristics: CharacteristicModifier[]) {
    this._creature = initializeCharacteristics(this._creature, characteristics);
    return this;
  }

  withWounds(wounds: number) {
    this._creature.wounds = wounds;
    return this;
  }

  withMovement(movement: number) {
    this._creature.movement = movement;
    return this;
  }

  withTraits(traits: TraitDefinition[]) {
    this._creature = addTraits(this._creature, traits);
    return this;
  }

  withTrappings(trappings: Item[]) {
    this._creature = addTrappings(this._creature, trappings);
    return this;
  }

  build() {
    return this._creature;
  }
}
