import {z} from "zod";

export const signInSchem = z.object({
    user: z.string(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type signInSchemType = z.infer<typeof signInSchem>;
