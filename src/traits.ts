import type { Creature } from "./Creature";
import type { TraitDefinition } from "./creature.type";

export const hardy: TraitDefinition = {
  name: "Hardy",
  description:
    "The creature can sustain more damage than most. Increase its Wounds by a number equal to its Toughness Bonus (applied before any Size modifiers)..",
  apply: (creature: Creature) => {
    const toughness = creature.getCharacteristic("Toughness");
    if (!toughness) {
      return;
    }
    creature.wounds += Math.trunc(toughness.value / 10);
  },
};

export const armour: TraitDefinition = {
  name: "Armor",
  description:
    "The creature is protected by armour or thick hide. It has Rating Armour Points on all Hit Locations..",
};
