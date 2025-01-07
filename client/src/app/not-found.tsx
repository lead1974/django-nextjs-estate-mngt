import shockedFace from "@/../public/assets/icons/shocked-face.svg";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Page Not Found | Alpha Apartments",
	description: "The requested page could not be found.",
};

export default function NotFound() {
	return (
		<div className="min-h-screen bg-black">
			<main className="flex h-screen flex-col items-center justify-center px-6 py-16 sm:py-24 lg:px-8">
				<div className="text-center">
					<Image
						src={shockedFace}
						alt="404 Error"
						height={200}
						width={200}
						priority
						className="mx-auto"
					/>
					<h1 className="mt-4 text-4xl font-bold tracking-tight text-platinum sm:text-5xl">
						Page not found
					</h1>
					<p className="mt-6 text-xl leading-7 text-white sm:text-2xl">
						Sorry, we could not find the page you are looking for.
					</p>
					<div className="mt-10">
						<Link
							href="/"
							className="bg-electricIndigo hover:bg-electricIndigo/90 rounded-3xl px-4 py-2.5 text-lg font-semibold text-white shadow-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:px-6 sm:text-xl"
						>
							Go back home
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
