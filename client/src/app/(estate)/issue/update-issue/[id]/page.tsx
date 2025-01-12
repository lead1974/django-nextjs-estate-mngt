import React from "react";
import type { Metadata } from "next";
import UpdateIssueForm from "@/components/forms/update-issue/UpdateIssueForm";

export const metadata: Metadata = {
	title: "Alpha Apartments | Update Issue ",
	description:
		"Technicians assigned to an issue can update the status of the issue",
};

interface UpdateParamsProps {
	params: {
		id: string;
	};
}

export default function UpdateIssuePage({ params }: UpdateParamsProps) {
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="h2-bold text-center text-richBlack dark:text-babyPowder">
					Update Issue Status
				</h2>
			</div>

			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-lightGrey dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
					<UpdateIssueForm issueId={params.id} />
				</div>
			</div>
		</div>
	);
}
