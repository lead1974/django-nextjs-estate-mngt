"use client";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const handleAuthState = async () => {
			const isLoggedIn = getCookie("logged_in") === "true";

			if (isLoggedIn) {
				dispatch(setAuth());
				setIsAuthenticated(true);
			} else {
				dispatch(setLogout());
				router.push("/login");
			}
			setIsLoading(false);
		};
		handleAuthState();
	}, [dispatch, router]);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}

export default ProtectedRoute;
