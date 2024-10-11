import { Prisma, User } from '@prisma/client';

export abstract class UserRepository {
  abstract users(): Promise<User[]>;

  abstract user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User>;

  abstract createUser(data: Prisma.UserCreateInput): Promise<User>;

  abstract updateUser(
    data: Prisma.UserUpdateInput,
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User>;

  abstract deleteUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<{ message: string }>;
}
