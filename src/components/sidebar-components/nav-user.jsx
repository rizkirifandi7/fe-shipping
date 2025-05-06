"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function NavUser() {
	const router = useRouter();
	const { isMobile } = useSidebar();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const decodeToken = () => {
			try {
				const token = Cookies.get("token");
				if (!token) return;

				// Decode token JWT (part ke-2 adalah payload)
				const base64Url = token.split(".")[1];
				const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
				const decodedPayload = JSON.parse(window.atob(base64));

				setUserData({
					id: decodedPayload.id,
					nama: decodedPayload.nama,
					role: decodedPayload.role,
					// tambahkan field lain jika ada
				});
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		};

		decodeToken();
	}, []);

	const handleLogout = async () => {
		try {
			await logoutAction();
			setUserData(null); // Reset user data setelah logout
			router.refresh();
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-fit" asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
				>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">
							{userData?.nama || "Loading..."}
						</span>
						<span className="truncate text-xs">{userData?.role || " "}</span>
					</div>
					<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-44 rounded-lg"
				side={isMobile ? "bottom" : "bottom"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">
								{userData?.nama || "User"}
							</span>
							<span className="truncate text-xs text-muted-foreground">
								{userData?.role || "Role"}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Button
					onClick={handleLogout}
					variant={"ghost"}
					className="w-full justify-start cursor-pointer"
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
