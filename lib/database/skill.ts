import { createClient } from "@/lib/supabase-client";
import type { Database } from "@/types/supabase";

export async function fetchSkills() {
  try {
    console.log("Fetching skills");
    const supabaseBrowserClient = createClient<Database>();

    const { data, error } = await supabaseBrowserClient.from("skill").select();

    if (error) {
      console.log("Search error", error);
    }

    return data;
  } catch (e) {
    console.log("Error", e);
    console.error(e);
  }
}

export async function updateSkills(addedSkills: string[], removedSkills: string[]) {
  try {
    console.log(addedSkills, removedSkills);
    const supabaseBrowserClient = createClient<Database>();

    const {
      data: { user },
    } = await supabaseBrowserClient.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const { data } = await supabaseBrowserClient.from("profile").select("id").eq("userId", user.id).single();

    if (!data) {
      throw new Error("Profile not found");
    }

    if (removedSkills.length > 0) {
      await supabaseBrowserClient.from("profile_skill").delete().in("skillId", removedSkills).eq("profileId", data.id);
    }

    if (addedSkills.length > 0) {
      await supabaseBrowserClient.from("profile_skill").insert(
        addedSkills.map((skillId) => ({
          skillId,
          profileId: data.id,
        })),
      );
    }
  } catch (e) {
    console.log("Error", e);
    console.error(e);
  }
}
