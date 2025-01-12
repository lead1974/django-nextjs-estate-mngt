import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { TProfileSchema } from "@/lib/validationSchemas";
import { WrenchIcon } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import Select from "react-select";
import createCustomStyles from "../selectStyles";

const ClientOnly = dynamic<{ children: React.ReactNode }>(
	() => Promise.resolve(({ children }) => <>{children}</>),
	{ ssr: false },
);

type Occupation =
	| "mason"
	| "carpenter"
	| "plumber"
	| "roofer"
	| "painter"
	| "electrician"
	| "hvac"
	| "tenant";

interface OccupationOption {
	value: Occupation;
	label: string;
}

const occupationOptions: OccupationOption[] = [
	{ value: "mason", label: "Mason" },
	{ value: "carpenter", label: "Carpenter" },
	{ value: "plumber", label: "Plumber" },
	{ value: "roofer", label: "Roofer" },
	{ value: "painter", label: "Painter" },
	{ value: "electrician", label: "Electrician" },
	{ value: "hvac", label: "HVAC" },
	{ value: "tenant", label: "Tenant" },
];

interface OccupationSelectFieldProps {
	setValue: UseFormSetValue<TProfileSchema>;
	control: Control<TProfileSchema>;
}

const occupationStyles = createCustomStyles<OccupationOption>();

export default function OccupationSelectField({
	setValue,
	control,
}: OccupationSelectFieldProps) {
	const { data: profileData } = useGetUserProfileQuery();
	const profile = profileData?.profile;

	useEffect(() => {
		if (profile?.occupation) {
			const occupationValue = occupationOptions.find(
				(option) => option.value === profile.occupation,
			);
			if (occupationValue) {
				setValue("occupation", occupationValue.value);
			}
		}
	}, [profile, setValue]);

	return (
		<div>
			<label htmlFor="occupation" className="h4-semibold dark:text-babyPowder">
				Occupation
			</label>
			<div className="mt-1 flex items-center space-x-3">
				<ClientOnly>
					<Controller
						control={control}
						name="occupation"
						render={({ field }) => (
							<Select
								className="mt-1 w-full"
								{...field}
								options={occupationOptions}
								value={occupationOptions.find(
									(option) => option.value === field.value,
								)}
								onChange={(newValue) => field.onChange(newValue?.value)}
								instanceId="occupation-select"
								styles={occupationStyles}
							/>
						)}
					/>
				</ClientOnly>
				<WrenchIcon className="dark:text-babyPowder size-8" />
			</div>
		</div>
	);
}
