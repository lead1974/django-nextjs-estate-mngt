"use client";

import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import Spinner from "@/components/shared/Spinner";
import { TabsContent } from "@/components/ui/tabs";
import { ProfileItem } from "@/components/profile/ProfileItem";
import {
	BadgeCheck,
	Briefcase,
	CalendarDays,
	Contact,
	Home,
	Hotel,
	Map,
	MapPinnedIcon,
	Star,
	UserRoundCheck,
	FileText,
} from "lucide-react";
import ProtectedRoute from "../shared/ProtectedRoutes";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatDate } from "@/utils/formatDate";

function AboutContent() {
	const { data, isLoading } = useGetUserProfileQuery();
	const profile = data?.profile;

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<TabsContent value="about">
			<div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
				{/* column 1 */}
				<div className="space-y-3">
					<ProfileItem
						icon={<Contact className="tab-icon" />}
						label="Name"
						value={profile?.full_name || ""}
					/>
					<ProfileItem
						icon={<UserRoundCheck className="tab-icon" />}
						label="Gender"
						value={capitalizeFirstLetter(profile?.gender || "")}
					/>
					<ProfileItem
						icon={<CalendarDays className="tab-icon" />}
						label="Joined"
						value={formatDate(profile?.date_joined).toString() || ""}
					/>
					<ProfileItem
						icon={<BadgeCheck className="tab-icon" />}
						label="Reputation"
						value={`${profile?.reputation} out of 100` || ""}
					/>
					<ProfileItem
						icon={<Map className="tab-icon" />}
						label="Country"
						value={profile?.country_of_origin || ""}
					/>
					<ProfileItem
						icon={<MapPinnedIcon className="tab-icon" />}
						label="City"
						value={profile?.city_of_origin || ""}
					/>
				</div>
				{/* column 2 */}
				<div className="space-y-3">
					<ProfileItem
						icon={<Briefcase className="tab-icon" />}
						label="Occupation"
						value={capitalizeFirstLetter(profile?.occupation || "")}
					/>
					<ProfileItem
						icon={<Home className="tab-icon" />}
						label="Apartment"
						value={profile?.apartment?.unit_number || "None"}
					/>
					<ProfileItem
						icon={<Hotel className="tab-icon" />}
						label="Building"
						value={`${profile?.apartment?.building || "None"}, Floor: ${profile?.apartment?.floor || "None"} `}
					/>
					<ProfileItem
						icon={<Star className="tab-icon" />}
						label="Average Rating"
						value={profile?.average_rating?.toString() || ""}
					/>
					<ProfileItem
						icon={<FileText className="tab-icon" />}
						label="Bio"
						value={profile?.bio || "You have not added any bio info yet!"}
					/>
				</div>
			</div>
		</TabsContent>
	);
}

export default function About() {
	return (
		<ProtectedRoute>
			<AboutContent />
		</ProtectedRoute>
	);
}
