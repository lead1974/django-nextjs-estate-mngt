"use client";
import { useUpdateIssueMutation } from "@/lib/redux/features/issues/issueApiSlice";
import React from "react";
import { TIssueUpdateSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import createCustomStyles from "../selectStyles";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

const ClientOnly = dynamic<{ children: React.ReactNode }>(
	() => Promise.resolve(({ children }) => <>{children}</>),
	{ ssr: false },
);

type StatusType = "reported" | "resolved" | "in_progress";

interface StatusOption {
	value: StatusType;
	label: string;
}

const statusOptions: StatusOption[] = [
	{ value: "reported", label: "Reported" },
	{ value: "resolved", label: "Resolved" },
	{ value: "in_progress", label: "In Progress" },
];

const statusStyles = createCustomStyles<StatusOption>();

interface UpdateIssueFormProps {
	issueId: string;
}

export default function UpdateIssueForm({ issueId }: UpdateIssueFormProps) {
	const [updateIssue, { isLoading }] = useUpdateIssueMutation();
	const router = useRouter();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TIssueUpdateSchema>();

	const onSubmit = async (formValues: TIssueUpdateSchema) => {
		if (issueId) {
			const valuesWithIssueId = {
				...formValues,
				issueId,
			};

			try {
				await updateIssue(valuesWithIssueId).unwrap();
				toast.success(
					"The Issue assigned to you has been updated. A confirmation email has been sent to the tenant",
				);
				reset();
				router.push("/profile");
			} catch (error) {
				const errorMessage = extractErrorMessage(error);
				toast.error(errorMessage || "An error occurred");
			}
		}
	};
	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-4 dark:text-black"
			>
				<div>
					<label htmlFor="Status" className="h4-semibold dark:text-babyPowder">
						Status
					</label>
					<div className="mt-1 flex items-center space-x-3 text-sm">
						<ClientOnly>
							<Controller
								name="status"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Select<StatusOption>
										className="mt-1 w-full"
										options={statusOptions}
										value={
											statusOptions.find((option) => option.value === value) ||
											null
										}
										onChange={(newValue) => onChange(newValue?.value)}
										onBlur={onBlur}
										placeholder="Update the Issue Status"
										instanceId="issue-status-select"
										styles={statusStyles}
									/>
								)}
							/>
						</ClientOnly>
					</div>
					{errors.status && (
						<p className="mt-2 text-sm text-red-500">{errors.status.message}</p>
					)}
				</div>

				<Button
					type="submit"
					className="h4-semibold bg-eerieBlack dark:bg-pumpkin mt-2 w-full text-white"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Update Status`}
				</Button>
			</form>
		</main>
	);
}
