"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { useEffect, useState, useMemo, useCallback } from "react";

export function NavMain({ items = [] }) {
	const [userRole, setUserRole] = useState(null);
	const pathname = usePathname();

	// Fetch user role only once
	useEffect(() => {
		const role = Cookies.get("userRole");
		setUserRole(role);
	}, []);

	// Memoize filtered items to avoid unnecessary re-computation
	const filteredItems = useMemo(
		() =>
			items.filter(
				(item) => !item.allowedRoles || item.allowedRoles.includes(userRole)
			),
		[items, userRole]
	);

	const isItemActive = useCallback(
		(itemUrl) => pathname === itemUrl || pathname.startsWith(itemUrl + "/"),
		[pathname]
	);

	const hasActiveSubItem = useCallback(
		(subItems = []) => subItems.some((subItem) => isItemActive(subItem.url)),
		[isItemActive]
	);

	const renderMenuItem = useCallback(
		(item, isActive) => (
			<SidebarMenuItem key={item.title}>
				<SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
					<a href={item.url}>
						{item.icon && <item.icon />}
						<span>{item.title}</span>
					</a>
				</SidebarMenuButton>
			</SidebarMenuItem>
		),
		[]
	);

	const renderSubMenu = useCallback(
		(item, isActive) => (
			<Collapsible
				key={item.title}
				asChild
				defaultOpen={isActive}
				className="group/collapsible"
			>
				<SidebarMenuItem>
					<CollapsibleTrigger asChild>
						<SidebarMenuButton tooltip={item.title} isActive={isActive}>
							{item.icon && <item.icon />}
							<span>{item.title}</span>
							<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
						</SidebarMenuButton>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<SidebarMenuSub>
							{item.items
								.filter(
									(subItem) =>
										!subItem.allowedRoles ||
										subItem.allowedRoles.includes(userRole)
								)
								.map((subItem) => (
									<SidebarMenuSubItem key={subItem.title}>
										<SidebarMenuSubButton
											asChild
											isActive={isItemActive(subItem.url)}
										>
											<a href={subItem.url}>
												<span>{subItem.title}</span>
											</a>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
						</SidebarMenuSub>
					</CollapsibleContent>
				</SidebarMenuItem>
			</Collapsible>
		),
		[isItemActive, userRole]
	);

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu className="gap-y-2">
				{filteredItems.map((item) => {
					const hasSubItems = item.items?.length > 0;
					const isActive =
						isItemActive(item.url) || hasActiveSubItem(item.items);

					return hasSubItems
						? renderSubMenu(item, isActive)
						: renderMenuItem(item, isActive);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
