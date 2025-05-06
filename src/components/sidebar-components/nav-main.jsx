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

export function NavMain({ items, userRole }) {
	const pathname = usePathname();

	const isItemActive = (itemUrl) => {
		return pathname === itemUrl || pathname.startsWith(itemUrl + "/");
	};

	const hasActiveSubItem = (subItems) => {
		if (!subItems) return false;
		return subItems.some((subItem) => isItemActive(subItem.url));
	};

	const filteredItems = items.filter((item) => {
		if (!item.allowedRoles) return true;
		return item.allowedRoles.includes(userRole);
	});

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu className={"gap-y-2"}>
				{filteredItems.map((item) => {
					const hasSubItems = item.items && item.items.length > 0;
					const isActive =
						isItemActive(item.url) || hasActiveSubItem(item.items);

					if (!hasSubItems) {
						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									isActive={isActive}
									tooltip={item.title}
								>
									<a href={item.url}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					}

					return (
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
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
