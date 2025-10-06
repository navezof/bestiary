import { SpeciesDefinition } from "./data/species.data";
import type { Archetype, Species } from "./type";

export function rollDie(expression: string): number {
  const parts = expression.split("d");
  const numberOfDice = parseInt(parts[0], 10);
  const sides = parseInt(parts[1], 10);

  if (Number.isNaN(sides) || sides <= 0) {
    throw new Error(`Invalid dice sides value: "${parts[1]}"`);
  }

  let total = 0;
  for (let i = 0; i < numberOfDice; i += 1) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
}

/**
 *
 * @param name
 * @returns the SpeciesDefinition corresponding to name
 */
export const getSpeciesByName = (name: string): Species => {
  const species = SpeciesDefinition.find((s) => s.name === name);
  if (!species) {
    throw new Error(`Species with name ${name} not found`);
  }
  return species;
};

/**
 *
 * @param name
 * @param speciesName
 * @returns the Archetype with name found within speciesName
 */
export const getArchetypeFromSpeciesByName = (
  name: string,
  speciesName: string
): Archetype => {
  const species = getSpeciesByName(speciesName);
  const archetype = species.archetypes?.find((a) => a.name === name);
  if (!archetype) {
    throw new Error(
      `Archetype ${name} is not found in species: ${speciesName}`
    );
  }
  return archetype;
};
