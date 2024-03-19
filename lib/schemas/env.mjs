import { z } from 'zod';

export const serverSchema = z.object({
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().nonempty(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  FOO: z.string().nonempty(),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().nonempty(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
});

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  FOO: process.env.FOO,
};
