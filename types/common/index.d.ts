type Nullable<T> = T | null;
type Opaque<K, T> = T & { type: K };

type Email = Opaque<'Email', string>;
type JwtToken = Opaque<'JwtToken', string>;
type Uuid = Opaque<'Uuid', string>;
