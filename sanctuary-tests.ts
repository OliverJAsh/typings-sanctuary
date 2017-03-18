import SanctuaryMod = require('./sanctuary/index');
import {
  Maybe, Semigroup, MaybeSemigroup, SanctuaryModule, Either, EitherFunc,
  EitherSemigroup, Apply, MaybeFunc, RegexMatchResult, Type, IsFnType
} from './sanctuary/sanctuary-types';

// Cast is not required, you can use commented out version. Cast is here only to help IDE (IDEA) with type inferring.
// const S = SanctuaryMod.create({checkTypes: false, env: SanctuaryMod.env});
const S = (<SanctuaryModule>SanctuaryMod).create({checkTypes: false, env: SanctuaryMod.env});

// Note: One cannot use statement like `const Maybe = S.Maybe` because then TS compiler would emmit a require call
// for sanctuary-types module which would fail at runtime.

type num = number;
type num2num = (_: number) => number;
const fnInc = (x: num): num => x + 1;
const fnAdd = (x: num) => (y: num): num => x + y;
const fnStrLen = (x: string): num => x.length;
const fnThreeOp = (x: string) => (y: boolean): num => -1;

// Semigroup
(() => {
  const a: Semigroup<string> = '';
  const b: Semigroup<number[]> = [1];
})();

// Classify
(() => {
  const a: string = S.type('');
  const b: boolean = S.is(Number, 4);
  const c: boolean = S.is(Number)(4);
})();

// Combinator
(() => {
  const a: num = S.I(1);
  const b: num = S.K(2);
  const c: num = S.K(3, '');
  const d: num = S.A(fnInc, 0);
  const e: num = S.T(0, fnInc);
})();

// Function
(() => {
  const _flip: num = S.flip(fnThreeOp, true, '');
  const _flip_: (a: string, b: number) => boolean = S.flip_((b: number, a: string) => false);
  const _map: Maybe<number> = S.map(fnInc, S.toMaybe(1));
  const _map2: num[] = S.map(fnInc, [1]);
  const _map3: {a: num} = S.map(fnInc, {a: 1});
  const add = (a: number) => (b: number): number => a + b;
  const _lift2: Maybe<number> = S.lift2(add, S.Just(1), S.toMaybe(2));
  const d = <Acc,Item>(op: (acc: Acc, item: Item) => Acc) => <Acc>(zero: Acc) => <Item>(input: Item[]): Acc => zero;
  const _lift3: Maybe<number> = S.lift3(d, S.Just(add), S.Just(0), S.toMaybe([1, 2, 3]));
  const _curry2: (a: num) => num = S.curry2(Math.pow)(10);
  const _curry3: (a: string) => string = S.curry3((what: string, replacement: string, string: string) => string.replace(what, replacement))('banana')('orange');
  const _curry4: {x: num,y: num,width: num,height: num} = S.curry4((x: num, y: num, width: num, height: num) => ({
    x,
    y,
    width,
    height
  }))(0)(1)(10)(20);
  const _curry5: num = S.curry5((a: num, b: num, c: num, d: num, e: num) => a + b + c + d + e)(1)(2)(3)(4)(5);
})();

// Composition
(() => {
  const g: num = S.compose(Math.sqrt, fnInc)(99);
  const a: number = S.compose(fnInc, fnStrLen)('');
  const b: number = S.pipe([fnStrLen, fnInc])('');
  const c: number = S.pipe([fnStrLen, fnStrLen])('');
  const fa = (s: string): number => s.length;
  const fb = (s: number): string => s.toString();
  const d: string = S.pipe([fa, fb, fa, fb, fa, fb, fa, fb, fa, fb])('');
  const fc = (n: number, s: string): string => n + s;
  const fd = (x: number, y: number): number => x + y;
})();

// Maybe
(() => {
  const a: Maybe<any> = S.Nothing;
  const b: Maybe<number> = S.toMaybe(1);
  const c0: Apply<(x: num)=>num> = S.toMaybe(fnInc);
  const c1: MaybeFunc<num, num, (x: num)=>num> = S.toMaybe(fnInc);
  const c2: Apply<number> = S.toMaybe(4);
  const c50: Maybe<number> = S.ap<MaybeFunc<num, num, (x: num)=>num>, num, num, (x: num)=>num>(S.toMaybe(fnInc), S.toMaybe(4));
  const c51: num[] = S.ap<Array<num2num>, num, num>([fnInc, Math.sqrt], [4, 9, 16]);
  const c52: num[] = S.apFirst([1, 2], [3, 4]);
  const c53: num[] = S.apSecond([1, 2], [3, 4]);
  const c54: Either<string, num> = S.bimap(S.toUpper, Math.sqrt, S.Left('foo'));
  const c55: Either<string, num> = S.bimap(S.toUpper, Math.sqrt, S.Right(64));
  const d: boolean = S.toMaybe(fnInc).isJust;
  const maybeNumber = (s: string): Maybe<number> => S.toMaybe(s.length);
  const e: Maybe<number> = S.chain(maybeNumber, S.toMaybe<string>('')); // flatMap
  // const e2: num[] = S.chain(x => [x, x], [1, 2, 3]);
  const f: Semigroup<any[]> = [];
  const g: MaybeSemigroup<number[]> = S.toMaybe([1]);
  const h: Maybe<number> = S.Just(0);
  const ch: Maybe<number> = S.Nothing;
  // const i: MaybeSemigroup<number[]> = S.toMaybe([1]).concat(S.Just([2])); // TODO
  // const j: MaybeSemigroup<number[]> = S.toMaybe([1]).concat(S.Nothing); // a bit ugly // TODO
  const k: Maybe<any> = S.Nothing;
  //const n: Maybe<number> = S.toMaybe(1).extend((a) => a.value); // -
  const w: boolean = S.isNothing(S.toMaybe(1));
  const x: boolean = S.isJust(S.toMaybe(1));
  const y: number = S.fromMaybe(0, S.Just(42));
  const z: number|null = S.maybeToNullable(S.Just(42));
  const aa: Maybe<number> = S.toMaybe<number>(null);
  const ab: Maybe<number> = S.toMaybe(42);
  const ac: number = S.maybe(0, fnStrLen, S.Just(''));
  const ad: number[] = S.justs([S.Just(1), S.Nothing]);
  const ae = (x: number[]): Maybe<number> => S.Nothing; // generic variant isn't working even though I think it should
  const af: number[] = S.mapMaybe(ae, [[1]]);
  const ag = (s: string): number => 0;
  const ah = (s: string, t: string): number => 0;
  const ahC = (s: string) => (t: string): number => 0;
  const ach = (s: string, t: string, u: string): number => 0;
  const achC = (s: string) => (t: string) => (u: string): number => 0;
  const aj: Maybe<number> = S.encase(ag, '');
  const ak: Maybe<number> = S.encase2(ahC, '', '');
  const al: Maybe<number> = S.encase2_(ah, '', '');
  const am: Maybe<number> = S.encase3(achC, '', '', '');
  const an: Maybe<number> = S.encase3_(ach, '', '', '');
  const ap: string = b.toString();
  const aq: string = b.inspect();
  //const ar: Either<string, Maybe<number>> = S.Nothing<number>().sequence(S.Either.of); // -
  // TODO: sequence
})();

// Either
(() => {
  type ENS = Either<number, string>;
  type ENB = Either<number, boolean>;
  type ESN = Either<string, number>;
  type E_SGS_SGNA = EitherSemigroup<string, number[]>;
  const eNS: ENS = S.Right('');
  const a: ENS = S.Right('');
  const b: boolean = eNS.isLeft;
  const c: boolean = eNS.isRight;
  const d: EitherFunc<number, (a: string)=>number, string, number> = S.Right((x: string)=>x.length);
  const e: ENS = S.Right(' ');
  const sqrt: (a: number) => ESN = n => n < 0 ?
    S.Left<string, number>('Cannot represent square root of negative number') :
    S.Right<string, number>(Math.sqrt(n));
  const ch: E_SGS_SGNA = S.Left<string, number[], string, number[]>('abc');
  //const i: E_SGS_SGNA = ch.concat(S.Left<string, number[], string, number[]>('def')); // TODO
  //const j: E_SGS_SGNA = ch.concat(S.Right<string, number[], string, number[]>([4])); // TODO
  const l = (x: ENS): string => '';
  const n = (x: string): boolean => Boolean(x);
  // a is ENS
  const r: string = a.toString();
  const s: string = a.inspect();
  const t: boolean = S.isLeft(a);
  const u: boolean = S.isRight(a);
  const v: boolean = S.either((x: number) => true, (x: string) => false, a);
  const w: number[] = S.lefts([a, a]);
  const x: string[] = S.rights([a, a]);
  type EEO = Either<Error, any>;
  const y: EEO = S.encaseEither(S.I, JSON.parse, 'true');
  const z: EEO = S.encaseEither(S.I, JSON.parse, '[');
  type EE_BA = Either<Error, boolean[]>;
  const aa: EE_BA = S.encaseEither2(S.I, (a: string) => (b: number) => [true], '', 1);
  const ab: EE_BA = S.encaseEither2_(S.I, (a: string, b: number) => [true], '', 1);
  const ac: EE_BA = S.encaseEither3(S.I, (a: string) => (b: number) => (c: boolean) => [true], '', 1, false);
  const ad: EE_BA = S.encaseEither3_(S.I, (a: string, b: number, c: boolean) => [true], '', 1, false);
  const ae: Maybe<string> = S.eitherToMaybe(a);
})();

// Alternative
(() => {
  const a: number[] = S.alt([], [1]);
  const b: Maybe<number> = S.alt<Maybe<number>>(S.Just(0), S.Nothing);
  const c: Maybe<number> = S.alt(S.Just(0), S.Nothing as Maybe<number>);
})();

// Logic
(() => {
  const a: boolean = S.not(true);
  const b: string = S.ifElse(a=>a > 0, x=>'+' + x, x=>x.toString(), 4);
  const c: boolean = S.allPass([x=>x > 1, x=>x % 2 == 0], 4);
  const d: boolean = S.anyPass([x=>x > 1, x=>x % 2 == 0], 4);
  const e: boolean = S.and(false)(true);
  const f: boolean = S.and(false, true);
  const g: boolean = S.or(false)(true);
  const h: boolean = S.or(false, true);
})();

// List
(() => {
  type na = number[];
  type n = number;
  const a: na = S.concat([1], [2]);
  const b: Maybe<na> = S.slice(0, 1, [1]);
  const c: Maybe<n> = S.at(1, [1, 2]);
  const d: Maybe<n> = S.head([1]);
  const e: Maybe<n> = S.last([1]);
  const f: Maybe<na> = S.tail([1]);
  const g: Maybe<na> = S.init([1]);
  const h: Maybe<na> = S.take(2, [1]);
  const ch: Maybe<na> = S.takeLast(2, [1]);
  const i: Maybe<na> = S.drop(2, [1]);
  const j: Maybe<na> = S.dropLast(2, [1]);
  const k: na = S.reverse([1]);
  const l: Maybe<n> = S.indexOf('a', ['']);
  const m: Maybe<n> = S.lastIndexOf('a', ['']);
})();

// Array
(() => {
  const a: number[] = S.append(2, [1]);
  const b: number[] = S.prepend(1, [2]);
  const c: Maybe<number> = S.find(x => x > 0, [1]);
  const d: number[] = S.pluck('x', [{x: 1}, {x: 2}]);
  const e: number = S.reduce(acc => item => acc + item, 0, [1]);
  const f: number = S.reduce_((acc, item) => acc + item, 0, [1]);
  const g: number[] = S.unfoldr<number, number>(n => n < 5 ? S.Just([n, n + 1]) : S.Nothing, 1);
  const h: number[] = S.range(0, 10);
})();

// Object
(() => {
  const a: number = S.prop('a', {a: 1});
  const b: Maybe<number> = S.get<any, number>(S.is(Number), 'a', {});
  const c: Maybe<number> = S.gets<any, number>(S.is(Number), ['b'], {});
  const d: string[] = S.keys({});
  const e: any[] = S.values({});
  const f: Array<[string,any]> = S.pairs({});
})();

// Number
(() => {
  type n = number;
  const a: n = S.negate(1);
  const b: n = S.add(1, 2);
  const c: n = S.sum([1, 2]);
  const d: n = S.sum(S.Just(42));
  const e: n = S.sub(1, 2);
  const f: n = S.inc(1);
  const g: n = S.dec(1);
  const h: n = S.mult(1, 2);
  const ch: n = S.product([1, 2]);
  const i: n = S.div(1, 2);
  const j: n = S.min(1, 2);
  const k: n = S.max(1, 2);
})();

// Integer
(() => {
  const a: boolean = S.even(1);
  const b: boolean = S.odd(1);
})();

// Parse
(() => {
  const a: Maybe<Date> = S.parseDate('');
  const b: Maybe<number> = S.parseFloat('');
  const c: Maybe<number> = S.parseInt(10, '');
  const d: Maybe<number> = S.parseJson<number>(S.is(Number), '');
})();

// RegExp
(() => {
  const a: RegExp = S.regex('', '');
  const b: string = S.regexEscape('');
  const c: boolean = S.test(new RegExp(''), '');
  const d: Maybe<RegexMatchResult> = S.match(/a/, '');
  const e: Maybe<RegexMatchResult> = S.match(/a/)('');
  const f: RegexMatchResult[] = S.matchAll(/a/g)('');
  const g: RegexMatchResult[] = S.matchAll(/a/g, '');
})();

// String
(() => {
  const a: string = S.toUpper('a');
  const b: string = S.toLower('a');
  const c: string = S.trim('a');
  const d: string[] = S.words('a');
  const e: string = S.unwords(['a']);
  const f: string[] = S.lines('a');
  const g: string = S.unlines(['a']);
  const _splitOn: string[] = S.splitOn(",", "a,b,c");
})();

// Showable
(() => {
  const _toString: string = S.toString(1);
})();

// Fantasy land
(() => {
  //const _empty_1: string = S.empty<string, String>(<any>String); // ugly and verbose, TSC fails to infer TypeRep<string> for StringConstructor
  const _empty_2: string = S.empty<string>(<any>String); // ugly, string !== String...
  const _zero_1: any[] = S.zero(Array);
  const _zero_2: Object = S.zero(Object);
  const _zero_3: Maybe<any> = S.zero(S.Maybe);
})();
