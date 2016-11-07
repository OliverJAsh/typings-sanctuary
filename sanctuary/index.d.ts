// Type definitions for Sanctuary
// Project: typings-sanctuary
// Definitions by: monnef <http://monnef.tk>

// template: http://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

export as namespace S;

//# create :: { checkTypes :: Boolean, env :: Array Type } -> Module
//# env :: Array Type


//. ### Classify
//# type :: a -> String
//# is :: TypeRep a -> b -> Boolean


//. ### Combinator
//# I :: a -> a
//# K :: a -> b -> a
//# A :: (a -> b) -> a -> b
//# T :: a -> (a -> b) -> b
//# C :: (a -> b -> c) -> b -> a -> c
//# B :: (b -> c) -> (a -> b) -> a -> c
//# S :: (a -> b -> c) -> (a -> b) -> a -> c


//. ### Function
//# flip :: ((a, b) -> c) -> b -> a -> c
//# lift :: Functor f => (a -> b) -> f a -> f b
//# lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
//# lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d


//. ### Composition
//# compose :: (b -> c) -> (a -> b) -> a -> c
//# pipe :: [(a -> b), (b -> c), ..., (m -> n)] -> a -> n
//# meld :: [** -> *] -> (* -> * -> ... -> *)


//. ### Maybe type
//# MaybeType :: Type -> Type
//# Maybe :: TypeRep Maybe
//# Maybe.empty :: -> Maybe a
//# Maybe.of :: a -> Maybe a
//# Maybe#@@type :: String
//# Maybe#isNothing :: Boolean
//# Maybe#isJust :: Boolean
//# Maybe#ap :: Maybe (a -> b) ~> Maybe a -> Maybe b
//# Maybe#chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
//# Maybe#concat :: Semigroup a => Maybe a ~> Maybe a -> Maybe a
//# Maybe#empty :: Maybe a ~> Maybe a
//# Maybe#equals :: Maybe a ~> b -> Boolean
//# Maybe#extend :: Maybe a ~> (Maybe a -> a) -> Maybe a
//# Maybe#filter :: Maybe a ~> (a -> Boolean) -> Maybe a
//# Maybe#map :: Maybe a ~> (a -> b) -> Maybe b
//# Maybe#of :: Maybe a ~> b -> Maybe b
//# Maybe#reduce :: Maybe a ~> ((b, a) -> b) -> b -> b
//# Maybe#sequence :: Applicative f => Maybe (f a) ~> (a -> f a) -> f (Maybe a)
//# Maybe#toBoolean :: Maybe a ~> Boolean
//# Maybe#toString :: Maybe a ~> String
//# Maybe#inspect :: Maybe a ~> String
//# Nothing :: -> Maybe a
//# Just :: a -> Maybe a
//# isNothing :: Maybe a -> Boolean
//# isJust :: Maybe a -> Boolean
//# fromMaybe :: a -> Maybe a -> a
//# maybeToNullable :: Maybe a -> Nullable a
//# toMaybe :: a? -> Maybe a
//# maybe :: b -> (a -> b) -> Maybe a -> b
//# justs :: Array (Maybe a) -> Array a
//# mapMaybe :: (a -> Maybe b) -> Array a -> Array b
//# encase :: (a -> b) -> a -> Maybe b
//# encase2 :: (a -> b -> c) -> a -> b -> Maybe c
//# encase2_ :: ((a, b) -> c) -> a -> b -> Maybe c
//# encase3 :: (a -> b -> c -> d) -> a -> b -> c -> Maybe d
//# encase3_ :: ((a, b, c) -> d) -> a -> b -> c -> Maybe d
//# maybeToEither :: a -> Maybe b -> Either a b


//. ### Either type
//# EitherType :: Type -> Type -> Type
//# Either :: TypeRep Either
//# Either.of :: b -> Either a b
//# Either#@@type :: String
//# Either#isLeft :: Boolean
//# Either#isRight :: Boolean
//# Either#ap :: Either a (b -> c) ~> Either a b -> Either a c
//# Either#chain :: Either a b ~> (b -> Either a c) -> Either a c
//# Either#concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b
//# Either#equals :: Either a b ~> c -> Boolean
//# Either#extend :: Either a b ~> (Either a b -> b) -> Either a b
//# Either#map :: Either a b ~> (b -> c) -> Either a c
//# Either#of :: Either a b ~> c -> Either a c
//# Either#reduce :: Either a b ~> ((c, b) -> c) -> c -> c
//# Either#sequence :: Applicative f => Either a (f b) ~> (b -> f b) -> f (Either a b)
//# Either#toBoolean :: Either a b ~> Boolean
//# Either#toString :: Either a b ~> String
//# Either#inspect :: Either a b ~> String
//# Left :: a -> Either a b
//# Right :: b -> Either a b
//# isLeft :: Either a b -> Boolean
//# isRight :: Either a b -> Boolean
//# either :: (a -> c) -> (b -> c) -> Either a b -> c
//# lefts :: Array (Either a b) -> Array a
//# rights :: Array (Either a b) -> Array b
//# encaseEither :: (Error -> l) -> (a -> r) -> a -> Either l r
//# encaseEither2 :: (Error -> l) -> (a -> b -> r) -> a -> b -> Either l r
//# encaseEither2_ :: (Error -> l) -> ((a, b) -> r) -> a -> b -> Either l r
//# encaseEither3 :: (Error -> l) -> (a -> b -> c -> r) -> a -> b -> c -> Either l r
//# encaseEither3_ :: (Error -> l) -> ((a, b, c) -> r) -> a -> b -> c -> Either l r
//# eitherToMaybe :: Either a b -> Maybe b


//. ### Alternative
//# and :: Alternative a => a -> a -> a
//# or :: Alternative a => a -> a -> a
//# xor :: (Alternative a, Monoid a) => a -> a -> a


//. ### Logic
//# not :: Boolean -> Boolean
export function not(input: boolean): boolean;

//# ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b
export function ifElse<A, B>(predicate: (testInput: A) => boolean, successProcessor: (input: A) => B, failureProcessor: (input: A) => B, value: A);

//# allPass :: Array (a -> Boolean) -> a -> Boolean
export function allPass<A>(input: Array<(testInput: A) => boolean>, value: A): boolean;

//# anyPass :: Array (a -> Boolean) -> a -> Boolean
export function anyPass<A>(input: Array<(testInput: A) => boolean>, value: A): boolean;


//. ### List
//# concat :: Semigroup a => a -> a -> a
//# slice :: Integer -> Integer -> [a] -> Maybe [a]
//# at :: Integer -> [a] -> Maybe a
//# head :: [a] -> Maybe a
//# last :: [a] -> Maybe a
//# tail :: [a] -> Maybe [a]
//# init :: [a] -> Maybe [a]
//# take :: Integer -> [a] -> Maybe [a]
//# takeLast :: Integer -> [a] -> Maybe [a]
//# drop :: Integer -> [a] -> Maybe [a]
//# dropLast :: Integer -> [a] -> Maybe [a]
//# reverse :: [a] -> [a]
//# indexOf :: a -> [a] -> Maybe Integer
//# lastIndexOf :: a -> [a] -> Maybe Integer


//. ### Array
//# append :: a -> Array a -> Array a
//# prepend :: a -> Array a -> Array a
//# find :: (a -> Boolean) -> Array a -> Maybe a
//# pluck :: Accessible a => TypeRep b -> String -> Array a -> Array (Maybe b)
//# reduce :: Foldable f => (a -> b -> a) -> a -> f b -> a
//# reduce_ :: Foldable f => ((a, b) -> a) -> a -> f b -> a
//# unfoldr :: (b -> Maybe (Pair a b)) -> b -> Array a
//# range :: Integer -> Integer -> Array Integer


//. ### Object
//# prop :: Accessible a => String -> a -> b
//# get :: Accessible a => TypeRep b -> String -> a -> Maybe b
//# gets :: Accessible a => TypeRep b -> Array String -> a -> Maybe b
//# keys :: StrMap a -> Array String
//# values :: StrMap a -> Array a
//# pairs :: StrMap a -> Array (Pair String a)


//. ### Number
//# negate :: ValidNumber -> ValidNumber
//# add :: FiniteNumber -> FiniteNumber -> FiniteNumber
//# sum :: Foldable f => f FiniteNumber -> FiniteNumber
//# sub :: FiniteNumber -> FiniteNumber -> FiniteNumber
//# inc :: FiniteNumber -> FiniteNumber
//# dec :: FiniteNumber -> FiniteNumber
//# mult :: FiniteNumber -> FiniteNumber -> FiniteNumber
//# product :: Foldable f => f FiniteNumber -> FiniteNumber
//# div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber
//# min :: Ord a => a -> a -> a
//# max :: Ord a => a -> a -> a


//. ### Integer
//# even :: Integer -> Boolean
//# odd :: Integer -> Boolean


//. ### Parse
//# parseDate :: String -> Maybe Date
//# parseFloat :: String -> Maybe Number
//# parseInt :: Integer -> String -> Maybe Integer
//# parseJson :: TypeRep a -> String -> Maybe a


//. ### RegExp
//# regex :: RegexFlags -> String -> RegExp
//# regexEscape :: String -> String
//# test :: RegExp -> String -> Boolean
//# match :: RegExp -> String -> Maybe (Array (Maybe String))


//. ### String
//# toUpper :: String -> String
export function toUpper(input: string): string;

//# toLower :: String -> String
export function toLower(input: string): string;

//# trim :: String -> String
export function trim(input: string): string;

//# words :: String -> Array String
export function words(input: string): string[];

//# unwords :: Array String -> String
export function unwords(input: string[]): string;

//# lines :: String -> Array String
export function lines(input: string): string[];

//# unlines :: Array String -> String
export function unlines(input: string[]): string;
