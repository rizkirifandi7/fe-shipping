"use client";
import { Building2 } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useEffect, useState, useMemo, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

let companyDataCache = null; // Cache untuk data perusahaan

const CompanyProfile = memo(function CompanyProfile() {
	const [company, setCompany] = useState(companyDataCache);
	const [loading, setLoading] = useState(!companyDataCache);
	const [logoUrl, setLogoUrl] = useState(null);

	useEffect(() => {
		if (companyDataCache) {
			updateCompanyState(companyDataCache);
			return;
		}

		const fetchCompanyData = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/aplikasi`
				);
				if (!response.ok) throw new Error("Failed to fetch company data");

				const data = await response.json();
				if (data.data?.length > 0) {
					companyDataCache = {
						id: data.data[0].id,
						nama_perusahaan: data.data[0].nama_perusahaan,
						logo: data.data[0].logo,
					};
					updateCompanyState(companyDataCache);
				}
			} catch (err) {
				console.error("Gagal memuat data perusahaan:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCompanyData();
	}, []);

	const updateCompanyState = (companyData) => {
		setCompany(companyData);
		if (companyData?.logo) {
			const cleanLogoPath = companyData.logo.replace(/^uploads[\\/]/, "");
			setLogoUrl(
				`${process.env.NEXT_PUBLIC_API_URL}/aplikasi/logo/${cleanLogoPath}`
			);
		}
	};

	const ProfileContent = useMemo(() => {
		if (loading) {
			return (
				<div className="flex items-center gap-3 p-2">
					<Skeleton className="h-8 w-8 rounded-lg" />
					<div className="space-y-1 flex-1">
						<Skeleton className="h-4 w-[120px]" />
						<Skeleton className="h-3 w-[80px]" />
					</div>
				</div>
			);
		}

		return (
			<div className="flex items-center gap-3 p-2">
				<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
					{logoUrl ? (
						<img
							src={logoUrl}
							alt="Logo Perusahaan"
							width={32}
							height={32}
							className="rounded-lg object-cover"
							onError={() => setLogoUrl(null)} // Fallback jika gambar error
						/>
					) : (
						<Building2 className="size-4" />
					)}
				</div>
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-semibold">
						{company?.nama_perusahaan || "Perusahaan"}
					</span>
					<span className="truncate text-xs">Profil Perusahaan</span>
				</div>
			</div>
		);
	}, [company, loading, logoUrl]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size="lg" className="cursor-default w-full">
					{ProfileContent}
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
});

export default CompanyProfile;
