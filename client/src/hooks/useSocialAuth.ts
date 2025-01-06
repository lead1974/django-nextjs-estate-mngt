import { setAuth } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { SocialAuthArgs, SocialAuthResponse } from "@/types";

interface MutationResult {
	unwrap(): Promise<SocialAuthResponse>;
}

export default function useSocialAuth(
	authenticate: (args: SocialAuthArgs) => MutationResult,
	provider: string
) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();

	const effectRan = useRef(false);

	useEffect(() => {
		const state = searchParams.get("state");
		const code = searchParams.get("code");

		if (state && code && !effectRan.current) {
			console.log('Attempting social auth with:', { provider, state, code });
			authenticate({ provider, state, code })
				.unwrap()
				.then((response) => {
					console.log('Social auth success:', response);
					dispatch(setAuth());
					toast.success("Logged in successfully");
					router.push("/welcome");
				})
				.catch((error) => {
					console.error('Social auth error details:', error);
					toast.error(error.data?.detail || "Login Failed, Try Again!");
					router.push("/login");
				});
		}
		return () => {
			effectRan.current = true;
		};
	}, [authenticate, dispatch, provider, router, searchParams]);
}