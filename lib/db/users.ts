import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

const SALT_ROUNDS = 12;

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // First user gets ADMIN role, all others get USER
  const userCount = await prisma.user.count();
  const role: Role = userCount === 0 ? "ADMIN" : "USER";

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      name: name.trim(),
      role,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
