import type { Creature } from "../Creature";
import type { TraitDefinition } from "../type";
import { Toughness } from "./characteristics.data";

export const hardy: TraitDefinition = {
  name: "Hardy",
  description:
    "The creature can sustain more damage than most. Increase its Wounds by a number equal to its Toughness Bonus (applied before any Size modifiers)..",
  apply: (creature: Creature) => {
    const toughness = creature.getCharacteristic(Toughness);
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

export const animosity: TraitDefinition = {
  name: "Animosity",
  description:
    "The creature hates a particular type of creature or character. It will attack such creatures on sight, and may even attack those it mistakes for them.",
};

export const belligerent: TraitDefinition = {
  name: "Belligerent",
  description:
    "The creature is always looking for a fight. It will attack any creature it encounters, even if it has no reason to do so.",
};

export const dieHard: TraitDefinition = {
  name: "Die Hard",
  description:
    "The creature is difficult to kill. It can make a Toughness Test (at -10) to avoid being knocked out or killed when its Wounds reach 0.",
};

export const painless: TraitDefinition = {
  name: "Painless",
  description:
    "The creature does not feel pain as other creatures do. It suffers no penalties for being injured, and can continue to fight even when badly wounded.",
};

export const ranged: TraitDefinition = {
  name: "Ranged",
  description:
    "The creature has a natural ranged attack, such as a spit or a venomous bite. It can make this attack at a range of up to 10 yards.",
};

export const size: TraitDefinition = {
  name: "Size",
  description:
    "The creature is of a particular size category, which affects its characteristics and combat abilities.",
};
