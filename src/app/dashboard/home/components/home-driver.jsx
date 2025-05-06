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
import { Calendar, Truck, Package } from "lucide-react";
import Link from "next/link";
import { getCookie } from "@/lib/cookies";
import { jwtDecode } from "jwt-decode";

export default function MainPageDriver() {
	const [stats, setStats] = useState({
		totalDeliveries: 0,
		scheduledDeliveries: 0,
		inTransitDeliveries: 0,
	});
	const [deliveries, setDeliveries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Get user ID from token
				const token = await getCookie("token");
				if (!token) throw new Error("User not authenticated");

				const decoded = jwtDecode(token.value);
				const { id, role } = decoded;

				if (role !== "driver") {
					throw new Error("This page is for drivers only");
				}

				setUserId(id);

				// Fetch only this driver's deliveries
				const response = await fetch(
					`http://localhost:8012/jadwal-pengiriman?id_driver=${id}`
				);

				if (!response.ok) throw new Error("Failed to fetch deliveries");

				const data = await response.json();
				const driverDeliveries = (data.data || []).filter(
					(d) => d.id_driver === id
				);

				// Filter out completed deliveries for the dashboard
				const activeDeliveries = driverDeliveries.filter(
					(d) => d.status !== "completed"
				);

				setStats({
					totalDeliveries: activeDeliveries.length,
					scheduledDeliveries: activeDeliveries.filter(
						(d) => d.status === "scheduled"
					).length,
					inTransitDeliveries: activeDeliveries.filter(
						(d) => d.status === "in_transit"
					).length,
				});

				setDeliveries(activeDeliveries.slice(0, 3));
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
			<h1 className="text-3xl font-bold mb-6">Dashboard Driver</h1>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<StatCard
					icon={<Calendar className="h-6 w-6" />}
					title="Total Pengiriman"
					value={stats.totalDeliveries}
					description="Total pengiriman aktif"
				/>
				<StatCard
					icon={<Truck className="h-6 w-6" />}
					title="Dijadwalkan"
					value={stats.scheduledDeliveries}
					description="Menunggu dikirim"
				/>
				<StatCard
					icon={<Package className="h-6 w-6" />}
					title="Dalam Perjalanan"
					value={stats.inTransitDeliveries}
					description="Sedang dikirim"
				/>
			</div>

			{/* Delivery Schedule */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Jadwal Pengiriman Saya</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Tanggal</TableHead>
								<TableHead>Kendaraan</TableHead>
								<TableHead>Jumlah Order</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{deliveries.length > 0 ? (
								deliveries.map((delivery) => (
									<TableRow key={delivery.id}>
										<TableCell>
											{new Date(delivery.tgl_pengiriman).toLocaleDateString(
												"id-ID",
												{
													day: "2-digit",
													month: "long",
													year: "numeric",
												}
											)}
										</TableCell>
										<TableCell>
											{delivery.kendaraan?.nama} (
											{delivery.kendaraan?.plat_nomor})
										</TableCell>
										<TableCell>{delivery.orders?.length || 0}</TableCell>
										<TableCell>
											<Badge
												variant={
													delivery.status === "scheduled"
														? "default"
														: delivery.status === "in_transit"
														? "secondary"
														: "destructive"
												}
											>
												{delivery.status === "scheduled"
													? "Terjadwal"
													: delivery.status === "in_transit"
													? "Dalam Perjalanan"
													: delivery.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<Link href={`/dashboard/jadwal/${delivery.id}`}>
												<Button variant="outline" size="sm">
													Detail
												</Button>
											</Link>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} className="text-center py-4">
										Tidak ada jadwal pengiriman saat ini
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
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
