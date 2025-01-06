import { toast } from "react-toastify";

interface SocialAuthResponse {
	authorization_url: string;
}

export default async function InitiateSocialAuth(
	provider: string,
	redirect: string,
) {
	try {
		const domain = process.env.NEXT_PUBLIC_DOMAIN;
		if (!domain) {
			throw new Error("NEXT_PUBLIC_DOMAIN is not defined");
		}

		const baseUrl = domain.startsWith('http') ? domain : `http://${domain}`;
		const url = `${baseUrl}/api/v1/auth/o/${provider}/?redirect_uri=${baseUrl}/api/v1/auth/${redirect}`;

		console.log('Initiating social auth with URL:', url);

		const res = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
			credentials: "include",
		});

		if (!res.ok) {
			const errorText = await res.text();
			console.error('Social auth response not OK:', {
				status: res.status,
				statusText: res.statusText,
				errorText,
				headers: Object.fromEntries(res.headers.entries())
			});
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data: SocialAuthResponse = await res.json();
		console.log('Social auth response:', data);

		if (data.authorization_url && typeof window !== "undefined") {
			window.location.replace(data.authorization_url);
		} else {
			console.error('Invalid response data:', data);
			toast.error("Invalid response from authentication server");
		}
	} catch (e) {
		console.error('Social auth error:', e);
		toast.error("An error occurred during social authentication");
	}
}