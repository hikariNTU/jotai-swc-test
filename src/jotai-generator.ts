import { PrimitiveAtom, atom } from "jotai";

export function yieldAtoms() {
  function wrapper<T>(theAtom: PrimitiveAtom<T>): PrimitiveAtom<T> {
    return atom(
      (get) => get(theAtom),
      (_, set, arg) => {
        set(theAtom, arg);
      }
    );
  }

  const wrappedAtom = wrapper(atom(""));
  const affectedAtom = atom("");
  const someObject = { foo: "bar" };

  return {
    wrappedAtom,
    affectedAtom,
    someObject,
  };
}

export function yieldAtomsButUsingConstFunction() {
  const wrapper = <T>(theAtom: PrimitiveAtom<T>): PrimitiveAtom<T> => {
    return atom(
      (get) => get(theAtom),
      (_, set, arg) => {
        set(theAtom, arg);
      }
    );
  };

  const wrappedAtom = wrapper(atom(""));
  const affectedAtom = atom("");
  const someObject = { foo: "bar" };

  return {
    wrappedAtom,
    affectedAtom,
    someObject,
  };
}
