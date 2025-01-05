import * as z from "zod";

export const passwordResetConfirmSchema = z
	.object({
		uid: z.string().trim(),
		token: z.string().trim(),
		new_password: z
			.string()
			.min(1, { message: "Password is required" })
			.min(4, { message: "Password must be at least 4 characters long" }),
		re_new_password: z
			.string()
			.min(1, { message: "Confirm password is required" })
			.min(4, { message: "Confirm password must be at least 4 characters long" }),
	})
	.refine((data) => data.new_password === data.re_new_password, {
		message: "Passwords do not match",
		path: ["re_new_password"],
	});

export type TPasswordResetConfirmSchema = z.infer<
	typeof passwordResetConfirmSchema
>;