import * as z from "zod";

export const loginUserSchema = z.object({
	email: z.string().trim().email({ message: "Enter a valid email address" }),
	password: z
		.string()
		.min(4, { message: "Password must be at least 4 characters long" }),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;