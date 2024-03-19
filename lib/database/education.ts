import { createClient } from "@/lib/supabase-client";
import type { Database, Tables } from "@/types/supabase";

export async function upsertEducation(params: Omit<Tables<"education">, "userId" | "createdAt" | "updatedAt">) {
  try {
    const supabaseBrowserClient = createClient<Database>();

    const user = await supabaseBrowserClient.auth.getUser();

    if (!user.data?.user?.id) {
      throw new Error("User not found");
    }

    const { data, error } = await supabaseBrowserClient
      .from("education")
      .upsert(user.data.user.id ? params : { ...params, userId: user.data.user.id })
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

export async function deleteEducation(id: string) {
  try {
    const supabaseBrowserClient = createClient<Database>();

    const { data, error } = await supabaseBrowserClient.from("education").delete().eq("id", id).select();

    if (error) {
      console.log("Delete error", error);
    }

    return data;
  } catch (e) {
    console.log("Error", e);
    console.error(e);
  }
}
