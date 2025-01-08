import EditProfileForm from "@/components/forms/profile/EditProfileForm";
import type { Metadata } from "next";
import Header from "@/components/profile/Header";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";

export const metadata: Metadata = {
	title: "Alpha Apartments | Profile Edit",
	description: "Signed in users can edit their profile information",
};

function EditProfilePageContent() {
	return (
		<>
			<div className="grid items-start gap-4 px-4 pb-4 md:gap-6 md:px-6">
				<Header />
				<div className="w-full">
					<div className="dark:border-eerieBlack rounded-lg border p-6">
						<EditProfileForm />
					</div>
				</div>
			</div>
		</>
	);
}

export default function EditProfilePage() {
	return (
		<ProtectedRoute>
			<EditProfilePageContent />
		</ProtectedRoute>
	);
}
