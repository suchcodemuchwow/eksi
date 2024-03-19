import type { Database, Tables } from "@/types/supabase";

import { createClient } from "../supabase-client";

export async function upsertProfile(params: Omit<Tables<"profile">, "userId" | "createdAt" | "updatedAt">) {
  const { firstname, lastname, email, phone, links, id } = params;

  try {
    if (!firstname || !lastname || !email || !phone) {
      throw new Error("Missing required fields");
    }

    const supabaseBrowserClient = createClient<Database>();

    const user = await supabaseBrowserClient.auth.getUser();

    if (!user.data?.user?.id) {
      throw new Error("User not found");
    }

    const { data, error } = await supabaseBrowserClient
      .from("profile")
      .upsert({ ...params, userId: user.data.user.id })
      .select();

    if (error) {
      console.log("Upsert error", error);
    }

    return data;
  } catch (e) {
    console.log("Error", e);
    console.error(e);
  }
}
