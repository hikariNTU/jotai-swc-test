import { yieldAtoms, yieldAtomsButUsingConstFunction } from "./jotai-generator";
import { StrangeAssignment } from "./strange-assignment";

function App() {
  const a = yieldAtoms();
  const b = yieldAtoms();

  const c = yieldAtomsButUsingConstFunction();
  const d = yieldAtomsButUsingConstFunction();

  const result = {
    atomsDuplicated: a === b, // false
    wrappedDuplicated: a.wrappedAtom === b.wrappedAtom, // true
    affectedDuplicated: a.affectedAtom === b.affectedAtom, // also true
    someObjectDuplicated: a.someObject === b.someObject, // false
  };

  const resultExpected = {
    atomsDuplicated: c === d,
    wrappedDuplicated: c.wrappedAtom === d.wrappedAtom,
    affectedDuplicated: c.affectedAtom === d.affectedAtom,
    someObjectDuplicated: c.someObject === d.someObject,
  };

  return (
    <div>
      <h2>Bug yield atoms</h2>
      <pre>{JSON.stringify(result, undefined, 2)}</pre>
      <h2>const function yield atoms</h2>
      <pre>{JSON.stringify(resultExpected, undefined, 2)}</pre>

      <h2>Strange Assignment</h2>
      <StrangeAssignment />
    </div>
  );
}

export default App;
