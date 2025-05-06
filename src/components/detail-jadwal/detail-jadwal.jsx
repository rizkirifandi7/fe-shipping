"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateIndonesian } from "@/lib/formatDateIndonesia";
import {
	Truck,
	User,
	ClipboardList,
	CalendarDays,
	Info,
	ChevronLeft,
	Package,
	AlertCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function JadwalDetailPage() {
	const { id } = useParams();
	const router = useRouter();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState(null);

	useEffect(() => {
		async function fetchDetail() {
			setLoading(true);
			setErr(null);
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/jadwal-pengiriman/${id}`
				);
				if (!res.ok) throw new Error("Gagal memuat detail jadwal");
				const result = await res.json();
				setData(result.data);
			} catch (e) {
				setErr(e.message);
			} finally {
				setLoading(false);
			}
		}
		if (id) fetchDetail();
	}, [id]);

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8 space-y-6">
				<Button variant="outline" onClick={() => router.back()}>
					<ChevronLeft className="h-4 w-4 mr-2" />
					Kembali
				</Button>
				<div className="space-y-4">
					<Skeleton className="h-10 w-1/3" />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-1/2" />
							</CardHeader>
							<CardContent className="space-y-4">
								{[...Array(4)].map((_, i) => (
									<div key={i} className="space-y-2">
										<Skeleton className="h-4 w-1/4" />
										<Skeleton className="h-4 w-3/4" />
									</div>
								))}
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-1/2" />
							</CardHeader>
							<CardContent className="space-y-4">
								{[...Array(4)].map((_, i) => (
									<div key={i} className="space-y-2">
										<Skeleton className="h-4 w-1/4" />
										<Skeleton className="h-4 w-3/4" />
									</div>
								))}
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader>
							<Skeleton className="h-6 w-1/3" />
						</CardHeader>
						<CardContent className="space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-3/4" />
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (err) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Button
					variant="outline"
					onClick={() => router.back()}
					className="mb-6"
				>
					<ChevronLeft className="h-4 w-4 mr-2" />
					Kembali
				</Button>
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{err}</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Button
					variant="outline"
					onClick={() => router.back()}
					className="mb-6"
				>
					<ChevronLeft className="h-4 w-4 mr-2" />
					Kembali
				</Button>
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Data tidak ditemukan</AlertTitle>
					<AlertDescription>
						Jadwal pengiriman dengan ID tersebut tidak ditemukan
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	const statusBadgeVariant =
		{
			scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-100",
			completed: "bg-green-100 text-green-800 hover:bg-green-100",
			cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
		}[data.status] || "bg-gray-100 text-gray-800 hover:bg-gray-100";

	return (
		<div className="container mx-auto px-4 py-8 space-y-6">
			<Button variant="outline" onClick={() => router.back()}>
				<ChevronLeft className="h-4 w-4 mr-2" />
				Kembali
			</Button>

			<div className="space-y-6">
				<Card>
					<CardHeader>
						<div className="flex items-center gap-3">
							<ClipboardList className="h-5 w-5 text-primary" />
							<div>
								<CardTitle>Detail Jadwal Pengiriman</CardTitle>
								<CardDescription>
									ID: {data.id} • Dibuat pada:{" "}
									{formatDateIndonesian(data.created_at)}
								</CardDescription>
							</div>
							<Badge
								variant="outline"
								className={`ml-auto ${statusBadgeVariant}`}
							>
								{data.status}
							</Badge>
						</div>
					</CardHeader>
					<Separator />
					<CardContent className="pt-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="p-2 rounded-full bg-blue-50">
										<CalendarDays className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium">Tanggal Pengiriman</h3>
										<p className="text-sm text-muted-foreground">
											{formatDateIndonesian(data.tgl_pengiriman)}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="p-2 rounded-full bg-blue-50">
										<CalendarDays className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium">Perkiraan Sampai</h3>
										<p className="text-sm text-muted-foreground">
											{formatDateIndonesian(data.perkiraan_sampai)}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="p-2 rounded-full bg-blue-50">
										<Info className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium">Catatan</h3>
										<p className="text-sm text-muted-foreground">
											{data.catatan || "Tidak ada catatan"}
										</p>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="p-2 rounded-full bg-blue-50">
										<Truck className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium">Kendaraan</h3>
										<p className="text-sm text-muted-foreground">
											{data.kendaraan
												? `${data.kendaraan.nama} (${data.kendaraan.plat_nomor})`
												: "Tidak ada kendaraan"}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="p-2 rounded-full bg-blue-50">
										<User className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium">Driver</h3>
										<p className="text-sm text-muted-foreground">
											{data.driver
												? `${data.driver.nama} (${data.driver.telepon})`
												: "Tidak ada driver"}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="p-2 rounded-full bg-blue-50">
										<Package className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<h3 className="font-medium">Total Order</h3>
										<p className="text-sm text-muted-foreground">
											{Array.isArray(data.orders) ? data.orders.length : 0}{" "}
											order
										</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center gap-3">
							<Package className="h-5 w-5 text-primary" />
							<CardTitle>Daftar Order</CardTitle>
							<Badge variant="secondary" className="ml-auto">
								{Array.isArray(data.orders) ? data.orders.length : 0} Order
							</Badge>
						</div>
					</CardHeader>
					<Separator />
					<CardContent className="pt-6">
						{Array.isArray(data.orders) && data.orders.length > 0 ? (
							<div className="space-y-6">
								{data.orders.map((order) => {
									const orderStatusBadgeVariant =
										{
											scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-100",
											completed:
												"bg-green-100 text-green-800 hover:bg-green-100",
											cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
										}[order.status] ||
										"bg-gray-100 text-gray-800 hover:bg-gray-100";

									return (
										<Card key={order.id} className="overflow-hidden">
											<div className="p-4 bg-muted/50">
												<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
													<div className="flex items-center gap-3">
														<Badge variant="outline">Order #{order.id}</Badge>
														<div>
															<h3 className="font-medium">
																{order.customer?.nama}
															</h3>
															<p className="text-sm text-muted-foreground">
																{order.customer?.telepon}
															</p>
														</div>
													</div>
													<div className="flex items-center gap-3">
														<Badge
															variant="outline"
															className={orderStatusBadgeVariant}
														>
															{order.status}
														</Badge>
														<span className="text-sm text-muted-foreground">
															{formatDateIndonesian(order.tanggal_order)}
														</span>
													</div>
												</div>
											</div>
											<div className="p-4">
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead>Produk</TableHead>
															<TableHead className="text-right">
																Jumlah
															</TableHead>
															<TableHead className="text-right">
																Berat
															</TableHead>
															<TableHead className="text-right">
																Dimensi
															</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{order.order_detail.map((detail) => (
															<TableRow key={detail.id}>
																<TableCell className="font-medium">
																	{detail.produk?.nama}
																</TableCell>
																<TableCell className="text-right">
																	{detail.jumlah}
																</TableCell>
																<TableCell className="text-right">
																	{detail.produk?.berat} kg
																</TableCell>
																<TableCell className="text-right">
																	{detail.produk?.panjang}m ×{" "}
																	{detail.produk?.lebar}m ×{" "}
																	{detail.produk?.tinggi}m
																</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</div>
										</Card>
									);
								})}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<Package className="h-8 w-8 text-muted-foreground mb-2" />
								<h3 className="text-lg font-medium">Tidak ada order</h3>
								<p className="text-sm text-muted-foreground">
									Tidak ada order yang terkait dengan jadwal ini
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
