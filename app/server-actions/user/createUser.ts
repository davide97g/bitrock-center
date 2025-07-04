"use server";
import { db } from "@/config/prisma";
import { user } from "@/db";
import { checkSession } from "@/utils/supabase/server";

export async function createUser(
  user: Partial<Omit<user, "id" | "created_at">>,
) {
  await checkSession();
  return db.user.create({
    data: {
      name: user.name!,
      email: user.email!,
      avatar_url: user.avatar_url ?? undefined,
      role: user.role,
      referent_id: user.referent_id ?? null,
    },
  });
}

export type CreateUserResponse = Awaited<ReturnType<typeof createUser>>;
