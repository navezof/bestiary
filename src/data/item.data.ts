import type { Item, MeleeWeapon, RangedWeapon } from "../type";

export const bowl: Item = {
    name: "Bowl",
    description: "A simple bowl.",
    cost: 1,
    encumbrance: 0,
    availability: "Common",
    type: "other",
}

export const dagger: MeleeWeapon = {
    name: "Dagger",
    description: "A small, easily concealed blade.",
    cost: 10,
    encumbrance: 1,
    availability: "Common",
    type: "weapon",
    category: "Brawling",
    damage: "SB+2",
    reach: "Short",
}

export const bow: RangedWeapon = {
    name: "Bow",
    description: "A simple bow.",
    cost: 50,
    encumbrance: 3,
    availability: "Common",
    type: "weapon",
    category: "Bow",
    damage: "8",
    range: 60,
}