"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Truck, Package, Users, Car } from "lucide-react";
import Link from "next/link";

export default function MainPageAdmin() {
	const [stats, setStats] = useState({
		totalOrders: 0,
		scheduledDeliveries: 0,
		totalProducts: 0,
		totalVehicles: 0,
		totalUsers: 0,
	});
	const [recentOrders, setRecentOrders] = useState([]);
	const [upcomingDeliveries, setUpcomingDeliveries] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch all data in parallel
				const [ordersRes, deliveriesRes, productsRes, vehiclesRes, usersRes] =
					await Promise.all([
						fetch("http://localhost:8012/order"),
						fetch("http://localhost:8012/jadwal-pengiriman"),
						fetch("http://localhost:8012/produk"),
						fetch("http://localhost:8012/kendaraan"),
						fetch("http://localhost:8012/user"),
					]);

				const ordersData = await ordersRes.json();
				const deliveriesData = await deliveriesRes.json();
				const productsData = await productsRes.json();
				const vehiclesData = await vehiclesRes.json();
				const usersData = await usersRes.json();

				// Calculate stats
				setStats({
					totalOrders: ordersData.data?.length || 0,
					scheduledDeliveries: deliveriesData.data?.length || 0,
					totalProducts: productsData.data?.length || 0,
					totalVehicles: vehiclesData.data?.length || 0,
					totalUsers: usersData.data?.length || 0,
				});

				// Get recent orders (last 3)
				setRecentOrders(ordersData.data?.slice(0, 3) || []);

				// Get upcoming deliveries
				setUpcomingDeliveries(deliveriesData.data?.slice(0, 3) || []);
			} catch (error) {
				console.error("Error fetching data:", error);
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

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold mb-6">Dashboard Home</h1>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
				<StatCard
					icon={<Calendar className="h-6 w-6" />}
					title="Total Order"
					value={stats.totalOrders}
					description="Order masuk"
				/>
				<StatCard
					icon={<Truck className="h-6 w-6" />}
					title="Pengiriman"
					value={stats.scheduledDeliveries}
					description="Jadwal pengiriman"
				/>
				<StatCard
					icon={<Package className="h-6 w-6" />}
					title="Produk"
					value={stats.totalProducts}
					description="Total produk"
				/>
				<StatCard
					icon={<Car className="h-6 w-6" />}
					title="Kendaraan"
					value={stats.totalVehicles}
					description="Armada tersedia"
				/>
				<StatCard
					icon={<Users className="h-6 w-6" />}
					title="Pengguna"
					value={stats.totalUsers}
					description="Total pengguna"
				/>
			</div>

			{/* Recent Orders and Deliveries */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Orders */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<span>Order Terbaru</span>
							<Link href="/dashboard/pesanan" className="text-sm">
								<Button variant="ghost" size="sm">
									Lihat Semua
								</Button>
							</Link>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Customer</TableHead>
									<TableHead>Total</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentOrders.map((order) => (
									<TableRow key={order.id}>
										<TableCell className="font-medium">
											{order.customer?.nama || "Unknown"}
										</TableCell>
										<TableCell>
											{new Intl.NumberFormat("id-ID", {
												style: "currency",
												currency: "IDR",
											}).format(order.total_harga)}
										</TableCell>
										<TableCell>
											<Badge
												className={
													order.status === "pending"
														? "bg-yellow-100 text-yellow-800 border-yellow-200"
														: order.status === "scheduled"
														? "bg-blue-100 text-blue-800 border-blue-200"
														: order.status === "shipped"
														? "bg-purple-100 text-purple-800 border-purple-200"
														: order.status === "delivered"
														? "bg-green-100 text-green-800 border-green-200"
														: "bg-red-100 text-red-800 border-red-200"
												}
											>
												{order.status === "pending"
													? "Menunggu Konfirmasi"
													: order.status === "scheduled"
													? "Terjadwal"
													: order.status === "shipped"
													? "Dikirim"
													: order.status === "delivered"
													? "Terkirim"
													: order.status}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Upcoming Deliveries */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<span>Pengiriman Mendatang</span>
							<Link href="/dashboard/jadwal" className="text-sm">
								<Button variant="ghost" size="sm">
									Lihat Semua
								</Button>
							</Link>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Tanggal</TableHead>
									<TableHead>Kendaraan</TableHead>
									<TableHead>Driver</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{upcomingDeliveries.map((delivery) => (
									<TableRow key={delivery.id}>
										<TableCell>
											{new Date(delivery.tgl_pengiriman).toLocaleDateString(
												"id-ID"
											)}
										</TableCell>
										<TableCell>
											{delivery.kendaraan?.nama} (
											{delivery.kendaraan?.plat_nomor})
										</TableCell>
										<TableCell>{delivery.driver?.nama}</TableCell>
										<TableCell>
											<Badge
												className={
													delivery.status === "scheduled"
														? "bg-blue-100 text-blue-800 border-blue-200"
														: delivery.status === "in_transit"
														? "bg-yellow-100 text-yellow-800 border-yellow-200"
														: delivery.status === "completed"
														? "bg-green-100 text-green-800 border-green-200"
														: "bg-red-100 text-red-800 border-red-200"
												}
											>
												{delivery.status === "scheduled"
													? "Terjadwal"
													: delivery.status === "in_transit"
													? "Dalam Perjalanan"
													: delivery.status === "completed"
													? "Selesai"
													: delivery.status}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function StatCard({ icon, title, value, description }) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<div className="h-4 w-4 text-muted-foreground">{icon}</div>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				<p className="text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
}
