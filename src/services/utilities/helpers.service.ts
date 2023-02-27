
namespace Analyze {
  export interface Invalid {
    check(x: unknown): boolean;
  }

  export class Blank implements Invalid {
    check(x: unknown): boolean {
      switch (x) {
        case undefined: {
          return true;
        }
        case null: {
          return true;
        }
        default: {
          return false;
        }
      }
    }
  }

  export interface Partial {
    assemblage(x: Map<unknown, unknown> | Set<unknown>): boolean;
    collection(x: unknown[]): boolean;
    characters(x: string): boolean;
    entryPairs(x: Record<string | number | symbol, unknown>): boolean;
  }

  export class Empty implements Partial {
    assemblage(x: Map<unknown, unknown> | Set<unknown>): boolean {
      return x.size === 0;
    }

    collection(x: unknown[]): boolean {
      return x.length === 0;
    }

    characters(x: string): boolean {
      return x.trim().length === 0;
    }

    entryPairs(x: { [key: string | number | symbol]: unknown }): boolean {
      return Object.keys(x).length === 0;
    }
  }
}

const Empty: Analyze.Partial = new Analyze.Empty();

console.log([
  Empty.assemblage(new Map()),
  Empty.assemblage(new Set()),
  Empty.collection([]),
  Empty.characters(''),
  Empty.entryPairs({}),
  Empty.entryPairs(Object.create(null)),
  Empty.entryPairs({ key: 1 }),
]);

const Undef: Analyze.Invalid = new Analyze.Blank();

console.log([Undef.check(undefined), Undef.check(null), Undef.check(0)]);

/** testable false-positives */

// const SET = [
//   new Set(),
//   new Set(),
//   new Set([]),
//   new Set([{}, []]),
//   new Set(['', () => null]),
//   new Set([null, undefined]),
//   new Set([undefined, null]),
//   new Set([new Map(), new Set()]),
// ];

// const MAP = [
//   new Map(),
//   new Map(),
//   new Map([]),
//   new Map([[{}, []]]),
//   new Map([['', () => null]]),
//   new Map([[null, undefined]]),
//   new Map([[undefined, null]]),
//   new Map([[new Map(), new Set()]]),
// ];

// const ARR = [
//   [],
//   [],
//   Array.from({ length: 1 }),
//   ['', {}, [], new Map(), new Set()],
//   [null, undefined, 0, 1, false, true],
// ];

// const OBJ = [
//   {},
//   new Object(),
//   new Object(1),
//   Object.create(null),
//   { null: '', undefined: {}, 0: [], '': new Map(), false: new Set() },
// ];
