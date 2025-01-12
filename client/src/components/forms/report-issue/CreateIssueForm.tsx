"use client";

import { useGetMyApartmentQuery } from "@/lib/redux/features/apartment/apartmentApiSlice";
import { useReportIssueMutation } from "@/lib/redux/features/issues/issueApiSlice";
import { issueCreateSchema, TIssueCreateSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFieldComponent } from "../FormFieldComponent";
import { FlagIcon } from "lucide-react";
import Select, { SingleValue } from "react-select";
import createCustomStyles from "../selectStyles";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

const ClientOnly = dynamic<{ children: React.ReactNode }>(
	() => Promise.resolve(({ children }) => <>{children}</>),
	{ ssr: false },
);

type StatusType = "reported" | "resolved" | "in_progress";
type PriorityType = "low" | "medium" | "high";

interface SelectOption<T> {
	value: T;
	label: string;
}

const statusOptions: SelectOption<StatusType>[] = [
	{ value: "reported", label: "Reported" },
	{ value: "resolved", label: "Resolved" },
	{ value: "in_progress", label: "In Progress" },
];

const priorityOptions: SelectOption<PriorityType>[] = [
	{ value: "low", label: "Low" },
	{ value: "medium", label: "Medium" },
	{ value: "high", label: "High" },
];

const statusStyles = createCustomStyles<SelectOption<StatusType>>();
const priorityStyles = createCustomStyles<SelectOption<PriorityType>>();

export default function CreateIssueForm() {
	const { data } = useGetMyApartmentQuery();
	const apartment = data?.apartment;

	const [reportIssue, { isLoading }] = useReportIssueMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TIssueCreateSchema>({
		resolver: zodResolver(issueCreateSchema),
		mode: "all",
	});

	const onSubmit = async (formValues: TIssueCreateSchema) => {
		if (!apartment?.id) {
			toast.error(
				"Create your apartment first in your profile, before creating an issue",
			);
			return;
		}

		const valuesWithApartmentId = {
			...formValues,
			apartmentId: apartment.id,
		};

		try {
			await reportIssue(valuesWithApartmentId).unwrap();
			toast.success(
				"Your Issue has been reported. A confirmation email has been sent to you.",
			);
			reset();
			router.push("/profile");
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage || "An error occurred");
		}
	};

	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-4 dark:text-black"
			>
				<FormFieldComponent
					label="Title"
					name="title"
					register={register}
					errors={errors}
					placeholder="Issue Title"
					endIcon={<FlagIcon className="dark:text-babyPowder size-8" />}
				/>
				<FormFieldComponent
					label="Description"
					name="description"
					register={register}
					errors={errors}
					placeholder="Detailed Description of the issue"
					isTextArea
					endIcon={<FlagIcon className="dark:text-babyPowder size-8" />}
				/>
				<div>
					<label htmlFor="Status" className="h4-semibold dark:text-babyPowder">
						Status
					</label>
					<div className="mt-1 flex items-center space-x-3 text-sm">
						<ClientOnly>
							<Controller<TIssueCreateSchema>
								name="status"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Select<SelectOption<StatusType>>
										className="mt-1 w-full"
										options={statusOptions}
										value={
											statusOptions.find((option) => option.value === value) ||
											null
										}
										onChange={(
											newValue: SingleValue<SelectOption<StatusType>>,
										) => onChange(newValue?.value)}
										onBlur={onBlur}
										placeholder="Select an issue status"
										instanceId="status-select"
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

				<div>
					<label htmlFor="Status" className="h4-semibold dark:text-babyPowder">
						Priority
					</label>
					<div className="mt-1 flex items-center space-x-3 text-sm">
						<ClientOnly>
							<Controller<TIssueCreateSchema>
								name="priority"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Select<SelectOption<PriorityType>>
										className="mt-1 w-full"
										options={priorityOptions}
										value={
											priorityOptions.find(
												(option) => option.value === value,
											) || null
										}
										onChange={(
											newValue: SingleValue<SelectOption<PriorityType>>,
										) => onChange(newValue?.value)}
										onBlur={onBlur}
										placeholder="Select an issue priority"
										instanceId="priority-select"
										styles={priorityStyles}
									/>
								)}
							/>
						</ClientOnly>
					</div>
					{errors.priority && (
						<p className="mt-2 text-sm text-red-500">
							{errors.priority.message}
						</p>
					)}
				</div>
				<Button
					type="submit"
					className="h4-semibold bg-eerieBlack dark:bg-pumpkin mt-2 w-full text-white"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Report`}
				</Button>
			</form>
		</main>
	);
}
