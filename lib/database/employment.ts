import { createClient } from "@/lib/supabase-client";
import type { Database, Tables } from "@/types/supabase";

export async function upsertEmployment(params: Omit<Tables<"employment">, "createdAt" | "updatedAt" | "userId">) {
  try {
    const supabaseBrowserClient = createClient<Database>();

    const user = await supabaseBrowserClient.auth.getUser();
    const userId = user.data?.user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const { data, error } = await supabaseBrowserClient
      .from("employment")
      .upsert(userId ? params : { ...params, userId })
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

export async function deleteEmployment(id: string) {
  try {
    const supabaseBrowserClient = createClient<Database>();

    const { data, error } = await supabaseBrowserClient.from("employment").delete().eq("id", id).select();

    if (error) {
      console.log("Delete error", error);
    }

    return data;
  } catch (e) {
    console.log("Error", e);
    console.error(e);
  }
}
