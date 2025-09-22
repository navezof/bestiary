import { useState } from "react";
import "./App.css";
import { Creature } from "./Creature/creature";
import { BASE_CHARACTERISTIC_DEFINITION } from "./Creature/characteristic-definitions";
import { CreatureDisplay } from "./Creature/CreatureDisplay";

function App() {
  const [creature, setCreature] = useState<Creature | null>(null);

  const generateCreature = () => {
    const creature = new Creature(BASE_CHARACTERISTIC_DEFINITION);
    // Add some random values for demonstration
    creature.characteristics.forEach((char) => {
      char.addAdvances(Math.floor(Math.random() * 40) + 10);
    });
    setCreature(creature);
    console.log("Generate creature");
  };

  return (
    <>
      <h1>Bestiary</h1>
      <div>
        <button onClick={generateCreature}>Generate a creature</button>
        {creature && <CreatureDisplay creature={creature} />}
      </div>
    </>
  );
}

export default App;
