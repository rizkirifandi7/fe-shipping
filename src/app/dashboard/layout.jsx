import { AppSidebar } from "@/components/sidebar-components/app-sidebar";
import HeaderSidebar from "@/components/sidebar-components/header-sidebar";

import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import React from "react";
import { CartProdukProvider } from "@/hooks/use-cart-produk";

const DashboardLayout = ({ children }) => {
	return (
		<SidebarProvider>
			<Toaster />
			<AppSidebar />
			<SidebarInset>
				<HeaderSidebar />
				<div className="p-4">
					<CartProdukProvider>{children}</CartProdukProvider>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardLayout;
