import type { Species } from "../creature.type";

export const SpeciesDefinition: Species[] = [
    {
        name: "base",
        baseCharacteristics: {
            "Weapon Skill": 20,
            "Ballistic Skill": 20,
            "Strength": 20,
            "Toughness": 20,
            "Initiative": 20,
            "Agility": 20,
            "Dexterity": 20,
            "Intelligence": 20,
            "Willpower": 20,
            "Fellowship": 20,
        },
    },
    {
        name: "Goblin",
        baseCharacteristics: {
            "Weapon Skill": 25,
            "Ballistic Skill": 35,
            "Strength": 30,
            "Toughness": 30,
            "Initiative": 20,
            "Agility": 35,
            "Dexterity": 30,
            "Intelligence": 30,
            "Willpower": 20,
            "Fellowship": 20,
        },
    },
    {
        name: 'Orc',
        baseCharacteristics: {
            "Weapon Skill": 35,
            "Ballistic Skill": 35,
            "Strength": 30,
            "Toughness": 30,
            "Initiative": 20,
            "Agility": 25,
            "Dexterity": 20,
            "Intelligence": 25,
            "Willpower": 35,
            "Fellowship": 20,
        },
    },
]
