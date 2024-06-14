# React + TypeScript + Vite + SWC + Jotai

A minimal Reproduction for [swc-jotai duplicate variable issue](https://github.com/pmndrs/swc-jotai/issues/25)

## Installation

```
npm i
```

## Start the server

```
npm run dev
```

Open http://localhost:5713

## To verify

Disable the plugin in `vite.config.ts`.

## Screenshot

![image](https://github.com/hikariNTU/jotai-swc-test/assets/18393696/71d50f14-9a08-4188-84e6-85063e8cb8bf)

## Original Issue Descriptions

We are using `jotai-swc` in next.js 14 with the swc plugin enabled and encounter the following issue:

When the atom is generated from a **scoped named function** all atoms return from that function will share the same scoped identities.

```ts
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
```

```ts
const a = yieldAtoms();
const b = yieldAtoms();

console.log({
  atomsDuplicated: a === b, // false
  wrappedDuplicated: a.wrappedAtom === b.wrappedAtom, // true
  affectedDuplicated: a.affectedAtom === b.affectedAtom, // also true
  someObjectDuplicated: a.someObject === b.someObject, // false
});
```

If we modify the named function part to const arrow function then the issue will be resolved:

```ts
const wrapper = <T>(theAtom: PrimitiveAtom<T>): PrimitiveAtom<T> => {
  return atom(
    (get) => get(theAtom),
    (_, set, arg) => {
      set(theAtom, arg);
    }
  );
};
```

I've checked that if not enabling the plugin everything is fine, but I am not sure if the above sample code is the minimal reproduce example though since the behavior is too bizarre to get the root cause.

In the end of the day, I would probably like to see some "Caveats" section in `jotai-swc` documentation if these kind of bugs are as expected behaviors since they are hard to track down.
