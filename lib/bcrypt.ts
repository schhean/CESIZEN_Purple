import bcrypt from "bcryptjs";

export async function hash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function compare(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}