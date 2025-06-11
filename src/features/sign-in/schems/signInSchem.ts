import { z } from "zod";

export const signInSchem = z.object({
    user: z.string(),
    password: z.string(),
});

export type signInSchemType = z.infer<typeof signInSchem>;
