import clsx from "clsx";
import React from "react";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

type SocialProvider = "google" | "github" | "facebook" | "twitter";

interface OAuthButtonProps extends Omit<ButtonProps, "provider"> {
	provider: SocialProvider;
	children: React.ReactNode;
}

const providerStyles: Record<SocialProvider, string> = {
	google: "electricIndigo-gradient hover:bg-blue-700",
	github: "bg-gray-800 hover:bg-gray-900",
	facebook: "bg-blue-600 hover:bg-blue-700",
	twitter: "bg-sky-500 hover:bg-sky-600",
};

export default function OauthButton({
	provider,
	children,
	...rest
}: OAuthButtonProps) {
	const className = clsx(
		"text-babyPowder mt-3 flex-1 rounded-md px-3 py-2 font-medium",
		providerStyles[provider],
	);
	return (
		<Button className={className} {...rest}>
			<span className="flex items-center justify-start">{children}</span>
		</Button>
	);
}
