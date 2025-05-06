// components/AppSidebar.tsx
"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { dataNavLink } from "@/constant/navLinkData";
import CompanyProfile from "./profile";
import { NavMain } from "./nav-main";

export function AppSidebar({ userRole, ...props }) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<CompanyProfile />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={dataNavLink.navMain} userRole={userRole} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
