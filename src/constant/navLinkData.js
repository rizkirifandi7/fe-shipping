import {
	House,
	Box,
	FileText,
	CalendarCheck2,
	DatabaseBackup,
	Settings,
} from "lucide-react";

export const dataNavLink = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard/home",
			icon: House,
			allowedRoles: ["admin", "driver"],
		},
		{
			title: "Manajemen Pesanan",
			url: "/dashboard/pesanan",
			icon: Box,
			allowedRoles: ["admin"],
		},
		{
			title: "Dokumen Pengiriman",
			url: "/dashboard/dokumen",
			icon: FileText,
			allowedRoles: ["admin", "driver"],
		},
		{
			title: "Jadwal Pengiriman",
			url: "#",
			icon: CalendarCheck2,
			allowedRoles: ["admin"],
			items: [
				{
					title: "Jadwal Pengiriman",
					url: "/dashboard/jadwal",
					allowedRoles: ["admin"],
				},
				{
					title: "Jadwal Pengiriman Driver",
					url: "/dashboard/jadwal-driver",
					allowedRoles: ["admin"],
				},
			],
		},
		{
			title: "Manajemen Data",
			url: "#",
			icon: DatabaseBackup,
			allowedRoles: ["admin"],
			items: [
				{
					title: "Admin",
					url: "/dashboard/admin",
					allowedRoles: ["admin"],
				},
				{
					title: "Customer",
					url: "/dashboard/customer",
					allowedRoles: ["admin"],
				},
				{
					title: "Driver",
					url: "/dashboard/driver",
					allowedRoles: ["admin"],
				},
				{
					title: "Kendaraan",
					url: "/dashboard/kendaraan",
					allowedRoles: ["admin"],
				},
				{
					title: "Produk",
					url: "/dashboard/produk",
					allowedRoles: ["admin"],
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings,
			allowedRoles: ["admin"],
			items: [
				{
					title: "Aplikasi",
					url: "/dashboard/aplikasi",
					allowedRoles: ["admin"],
				},
			],
		},
	],
};
