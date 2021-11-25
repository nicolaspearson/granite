type Nullable<T> = T | null;
type Opaque<K, T> = T & { type: K };
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
type PickNotNullable<T, K extends keyof T> = Omit<T, K> & { [P in K]: NonNullable<T[P]> };
type PartialNonNullable<T> = { [P in keyof T]?: NonNullable<T[P]> };

type Email = Opaque<'Email', string>;
type Uuid = Opaque<'Uuid', string>;
type ISO8601DateTime = Opaque<'ISO8601DateTime', string>;
