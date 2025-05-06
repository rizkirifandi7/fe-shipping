"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "@/lib/cookies";
import {
	Calendar,
	Clock,
	Truck,
	User,
	Package,
	Download,
	Eye,
} from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DeliveryLettersWrapper from "./components/wrapper-surat";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DeliveryPage = () => {
	const [deliveries, setDeliveries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [userRole, setUserRole] = useState("");
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Get token from cookies using getCookie
				const token = await getCookie("token");

				if (!token) throw new Error("User not authenticated");

				// Decode token to get user info
				const decoded = jwtDecode(token.value);
				console.log(decoded); // Log decoded token for debugging
				const { id, role } = decoded;

				setUserRole(role);
				setUserId(id);

				// Build API URL
				const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/jadwal-pengiriman`;
				const response = await fetch(apiUrl);

				if (!response.ok) throw new Error("Network response was not ok");

				const result = await response.json();

				// Filter data based on user role
				let filteredData = result.data;

				if (role === "driver") {
					// Only show deliveries assigned to this driver
					filteredData = result.data.filter((item) => item.id_driver === id);
				} else if (role === "customer") {
					// Only show deliveries that contain orders from this customer
					filteredData = result.data.filter((delivery) =>
						delivery.orders.some((order) => order.id_customer === id)
					);
				}
				// Admin can see all data, no filtering needed

				// Filter out completed deliveries
				filteredData = filteredData.filter(
					(item) => item.status !== "completed"
				);

				setDeliveries(filteredData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6">
				<Card className="border-destructive">
					<CardHeader>
						<CardTitle>Error</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-destructive">{error}</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!deliveries || deliveries.length === 0) {
		return (
			<div className="p-6">
				<Card>
					<CardHeader>
						<CardTitle>
							{userRole === "admin"
								? "Tidak Ada Jadwal Pengiriman Ditemukan"
								: "Tidak Ada Jadwal Pengiriman Untuk Anda"}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							{userRole === "admin"
								? "Saat ini belum ada jadwal pengiriman yang tersedia."
								: "Anda belum memiliki jadwal pengiriman yang ditugaskan."}
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">
					Jadwal Pengiriman Dokumen
				</h1>
				<p className="text-muted-foreground">
					{userRole === "admin"
						? "Halaman ini menampilkan semua jadwal pengiriman dokumen."
						: "Halaman ini menampilkan jadwal pengiriman dokumen yang terkait dengan Anda."}
				</p>
			</div>

			<div className="space-y-6">
				{deliveries.map((delivery) => (
					<Card key={delivery.id} className="overflow-hidden">
						<CardHeader className="bg-muted/50 py-1">
							<div className="flex justify-between items-center">
								<div>
									<CardTitle className="flex items-center gap-2">
										<Truck className="h-5 w-5" />
										Delivery #{delivery.id}
									</CardTitle>
									<CardDescription className="mt-2">
										<div className="flex items-center gap-4">
											<span className="flex items-center gap-1">
												<Calendar className="h-4 w-4" />
												{new Date(delivery.tgl_pengiriman).toLocaleDateString(
													"id-ID",
													{
														weekday: "long",
														day: "numeric",
														month: "long",
														year: "numeric",
													}
												)}
											</span>
											<span className="flex items-center gap-1">
												<Clock className="h-4 w-4" />
												Estimated arrival:{" "}
												{new Date(delivery.perkiraan_sampai).toLocaleDateString(
													"id-ID"
												)}
											</span>
										</div>
									</CardDescription>
								</div>
								<Badge
									className={
										delivery.status === "scheduled"
											? "bg-blue-100 text-blue-800"
											: delivery.status === "in_transit"
											? "bg-yellow-100 text-yellow-800"
											: delivery.status === "completed"
											? "bg-green-100 text-green-800"
											: "bg-gray-200 text-gray-800"
									}
								>
									{delivery.status === "scheduled"
										? "Scheduled"
										: delivery.status === "in_transit"
										? "In Transit"
										: delivery.status === "completed"
										? "Completed"
										: delivery.status}
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[100px]">Order ID</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead>Alamat</TableHead>
										<TableHead>Items</TableHead>
										<TableHead>Total</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{delivery.orders.map((order) => (
										<TableRow key={order.id}>
											<TableCell className="font-medium">
												ORD-{order.id}
											</TableCell>
											<TableCell>
												<div className="font-medium">{order.customer.nama}</div>
												<div className="text-sm text-muted-foreground">
													{order.customer.telepon}
												</div>
											</TableCell>
											<TableCell>
												<div className="font-medium overflow-x-auto w-[250px]">
													{order.customer.alamat}
												</div>
											</TableCell>
											<TableCell>
												<div className="flex -space-x-2">
													{order.order_detail.slice(0, 3).map((item) => (
														<div
															key={item.id}
															className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background"
														>
															<span className="text-xs font-medium">
																{item.produk.nama.charAt(0)}
															</span>
														</div>
													))}
													{order.order_detail.length > 3 && (
														<div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background">
															<span className="text-xs font-medium">
																+{order.order_detail.length - 3}
															</span>
														</div>
													)}
												</div>
											</TableCell>
											<TableCell>
												Rp{parseInt(order.total_harga).toLocaleString("id-ID")}
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end gap-2">
													<Link href={`/dashboard/dokumen/${delivery.id}`}>
														<Button variant="outline" size="sm">
															<Eye className="h-4 w-4 mr-1" />
															Detail
														</Button>
													</Link>
													<DeliveryLettersWrapper
														deliveryData={delivery}
														order={order}
													/>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter className="bg-muted/50 py-3">
							<div className="flex items-center justify-between w-full text-sm text-muted-foreground">
								<div className="flex items-center gap-4">
									<span className="flex items-center gap-1">
										<User className="h-4 w-4" />
										{delivery.driver.nama} ({delivery.driver.telepon})
									</span>
									<span className="flex items-center gap-1">
										<Truck className="h-4 w-4" />
										{delivery.kendaraan.nama} ({delivery.kendaraan.plat_nomor})
									</span>
								</div>
								<div>
									{delivery.catatan && (
										<span className="flex items-center gap-1">
											<Package className="h-4 w-4" />
											{delivery.catatan}
										</span>
									)}
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default DeliveryPage;
