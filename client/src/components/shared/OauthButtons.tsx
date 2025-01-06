"use client";

import { UseGoogle } from "@/utils";
import OauthButton from "./OauthButton";
import Image from "next/image";

export default function OauthButtons() {
	return (
		<div className="mt-3 flex flex-col gap-3">
			<OauthButton provider="google" onClick={UseGoogle}>
				<Image
					src="/assets/icons/google.svg"
					alt="Google"
					width={20}
					height={20}
					className="mr-2"
				/>
				Sign in with Google
			</OauthButton>
			{/* Commented out until backend implementation is ready */}
			{/* <OauthButton 
				provider="github" 
				onClick={() => {}}
			>
				<Image
					src="/assets/icons/github.svg"
					alt="GitHub"
					width={20}
					height={20}
					className="mr-2"
				/>
				Sign in with GitHub
			</OauthButton>
			<OauthButton 
				provider="facebook" 
				onClick={() => {}}
			>
				<Image
					src="/assets/icons/facebook.svg"
					alt="Facebook"
					width={20}
					height={20}
					className="mr-2"
				/>
				Sign in with Facebook
			</OauthButton>
			<OauthButton 
				provider="twitter" 
				onClick={() => {}}
			>
				<Image
					src="/assets/icons/twitter.svg"
					alt="Twitter"
					width={20}
					height={20}
					className="mr-2"
				/>
				Sign in with Twitter
			</OauthButton> */}
		</div>
	);
}
