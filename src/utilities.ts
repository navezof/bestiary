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
