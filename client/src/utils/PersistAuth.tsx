"use client";
import { getCookie } from "cookies-next";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useEffect, useState } from "react";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";

interface PersistAuthProps {
	children?: React.ReactNode;
}

export default function PersistAuth({ children }: PersistAuthProps) {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = () => {
			const isLoggedIn = getCookie("logged_in") === "true";
			if (isLoggedIn) {
				dispatch(setAuth());
			} else {
				dispatch(setLogout());
			}
			setIsLoading(false);
		};

		checkAuth();
	}, [dispatch]);

	return isLoading ? null : children;
}
