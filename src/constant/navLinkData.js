import {
	AudioWaveform,
	Database,
	Users,
	Command,
	House,
	GalleryVerticalEnd,
	Settings2,
	Wallet,
	Mail,
	Dot,
	HandCoins,
	Book,
	BellDot,
	Banknote,
	FileCog,
	FileText,
	CalendarCheck2,
	ChartNoAxesCombined,
	Logs,
	Box,
	DatabaseBackup,
	Settings,
} from "lucide-react";

export const dataNavLink = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard/home",
			icon: House,
		},
		{
			title: "Manajemen Pesanan",
			url: "/dashboard/pesanan",
			icon: Box,
		},
		{
			title: "Dokumen Pengiriman",
			url: "/dashboard/dokumen",
			icon: FileText,
		},
		{
			title: "Jadwal Pengiriman",
			url: "/dashboard/jadwal",
			icon: CalendarCheck2,
		},
		{
			title: "Manajemen Data",
			url: "#",
			icon: DatabaseBackup,
			items: [
				{
					title: "Admin",
					url: "/dashboard/admin",
				},
				{
					title: "Customer",
					url: "/dashboard/customer",
				},
				{
					title: "Driver",
					url: "/dashboard/driver",
				},
				{
					title: "Kendaraan",
					url: "/dashboard/kendaraan",
				},
				{
					title: "Produk",
					url: "/dashboard/produk",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings,
			items: [
				{
					title: "Aplikasi",
					url: "/dashboard/aplikasi",
				},
			],
		},
	],
};
