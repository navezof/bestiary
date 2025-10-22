import { useState } from "react";
import { CreatureBlock } from "./components/CreatureBlock";
import "./App.css";

function App() {
  const [count] = useState<number>(4);

  return (
    <>
      <header className="bestiary-header">
        <h1>Bestiary</h1>
      </header>
      <main className="bestiary-main">
        <div className="bestiary-grid">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index}>
              <CreatureBlock />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
