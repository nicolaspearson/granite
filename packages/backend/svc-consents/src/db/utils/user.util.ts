function escapePostgresString(value: string) {
  // Escape unicode characters
  return `E'${value.replace(/(\\)/g, `\\\\`).replace(/(\')/g, `\\'`)}'`;
}

export function generateSalt(inputToHash: string, saltType: string): () => string {
  return () => `crypt(${escapePostgresString(inputToHash)}, gen_salt(${saltType}))`;
}
