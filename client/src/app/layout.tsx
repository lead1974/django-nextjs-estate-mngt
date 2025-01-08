import { ThemeProvider } from "@/components/theme-provider";
import { openSans, robotoSlab } from "@/lib/fonts";
import type { Metadata } from "next";
import React from "react";
import "./globals.css";

import ReduxProvider from "@/lib/redux/provider";
import Toast from "@/components/shared/Toast";
import { PersistAuth } from "@/utils";

export const metadata: Metadata = {
	title: "Alpha Apartments Title",
	description: "Alpha Apartments description goes here",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${openSans.variable} ${robotoSlab.variable}`}>
				<Toast />
				<ReduxProvider>
					<PersistAuth>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							{children}
						</ThemeProvider>
					</PersistAuth>
				</ReduxProvider>
			</body>
		</html>
	);
}
