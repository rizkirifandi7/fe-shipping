"use client";

import { useEffect, useCallback, useState } from "react";
import { formatDateIndonesian, getDayName } from "@/lib/formatDateIndonesia";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, PlusCircle } from "lucide-react";
import HapusJadwal from "./components/hapus-jadwal";
import UpdateJadwal from "./components/update-jadwal";

const CalendarView = ({ data, onRefresh }) => {
	const [currentDate, setCurrentDate] = useState(() => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	});

	const [selectedDate, setSelectedDate] = useState(() => {
		const today = new Date();
		return today.toISOString().split("T")[0];
	});

	// Generate days in month
	const daysInMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		return new Date(year, month + 1, 0).getDate();
	};

	// Get first day of month
	const firstDayOfMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		return new Date(year, month, 1).getDay();
	};

	// Navigate months
	const prevMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
		);
	};

	const nextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
		);
	};

	const renderCalendar = () => {
		const totalDays = daysInMonth(currentDate);
		const firstDay = firstDayOfMonth(currentDate);
		const days = [];

		// Empty cells for days before first day of month
		for (let i = 0; i < firstDay; i++) {
			days.push(
				<div
					key={`empty-${i}`}
					className="h-28 p-1 border border-muted/50"
				></div>
			);
		}

		// Cells for each day of month
		for (let i = 1; i <= totalDays; i++) {
			const date = new Date(
				Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), i, 12, 0, 0)
			);
			const dateString = date.toISOString().split("T")[0];

			const daySchedules = data.filter((item) => {
				if (!item.tgl_pengiriman) return false;
				try {
					const scheduleDate = new Date(item.tgl_pengiriman);
					return scheduleDate.toISOString().split("T")[0] === dateString;
				} catch (e) {
					return false;
				}
			});

			const isToday = new Date().toDateString() === date.toDateString();

			days.push(
				<div
					key={`day-${i}`}
					className={`h-28 p-1 border border-muted/50 hover:bg-muted/20 transition-colors ${
						daySchedules.length > 0 ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
					} ${selectedDate === dateString ? "ring-2 ring-primary" : ""} ${
						isToday ? "border-primary/50 border-2" : ""
					}`}
					onClick={() => setSelectedDate(dateString)}
				>
					<div className="flex flex-col h-full">
						<div className="flex justify-between items-start">
							<span
								className={`text-sm font-medium ${
									isToday
										? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
										: ""
								}`}
							>
								{i}
							</span>
							<span className="text-xs text-muted-foreground">
								{getDayName(date).substring(0, 3)}
							</span>
						</div>
						<ScrollArea className="flex-1 mt-1">
							<div className="space-y-1 pr-2">
								{daySchedules.map((schedule) => (
									<Tooltip key={schedule.id}>
										<TooltipTrigger asChild>
											<div
												className={`text-xs p-1 rounded truncate cursor-default ${
													schedule.status === "scheduled"
														? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
														: schedule.status === "in_transit"
														? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
														: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
												}`}
											>
												{schedule.kendaraan.nama}
											</div>
										</TooltipTrigger>
										<TooltipContent side="top">
											<p>
												{schedule.kendaraan.nama} (
												{schedule.kendaraan.plat_nomor})
											</p>
											<p>Driver: {schedule.driver.nama}</p>
											<p>Status: {schedule.status}</p>
										</TooltipContent>
									</Tooltip>
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
			);
		}

		// Fill remaining cells to complete the grid (6 rows x 7 columns)
		const totalCells = 42;
		const remainingCells = totalCells - (firstDay + totalDays);
		for (let i = 0; i < remainingCells; i++) {
			days.push(
				<div
					key={`empty-end-${i}`}
					className="h-28 p-1 border border-muted/50"
				></div>
			);
		}

		return days;
	};

	// Render selected date details
	const renderSelectedDetails = () => {
		if (!selectedDate) return null;

		const selectedSchedules = data.filter((item) => {
			const scheduleDate = new Date(item.tgl_pengiriman)
				.toISOString()
				.split("T")[0];
			return scheduleDate === selectedDate;
		});

		if (selectedSchedules.length === 0) {
			return (
				<Card className="mt-4">
					<CardContent className="p-4 text-center text-muted-foreground">
						Tidak ada jadwal pengiriman pada{" "}
						{formatDateIndonesian(selectedDate)}
					</CardContent>
				</Card>
			);
		}

		return (
			<Card className="mt-4">
				<CardHeader className="pb-3">
					<CardTitle>
						Jadwal Pengiriman {formatDateIndonesian(selectedDate)}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{selectedSchedules.map((schedule) => (
							<Card key={schedule.id}>
								<div className="p-4">
									<div className="flex justify-between items-start">
										<div>
											<h4 className="font-medium">
												{schedule.kendaraan.nama} (
												{schedule.kendaraan.plat_nomor})
											</h4>
											<p className="text-sm text-muted-foreground">
												Driver: {schedule.driver.nama}
											</p>
										</div>
										<Badge
											className={
												schedule.status === "scheduled"
													? "bg-blue-100 text-blue-800 border border-blue-200 capitalize"
													: schedule.status === "in_transit"
													? "bg-yellow-100 text-yellow-800 border border-yellow-200 capitalize"
													: schedule.status === "completed"
													? "bg-green-100 text-green-800 border border-green-200 capitalize"
													: "bg-gray-200 text-gray-800 border capitalize"
											}
										>
											{schedule.status === "scheduled"
												? "Terjadwal"
												: schedule.status === "in_transit"
												? "Dalam Perjalanan"
												: schedule.status === "completed"
												? "Selesai"
												: schedule.status}
										</Badge>
									</div>
									<div className="mt-4 grid grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-muted-foreground">Perkiraan Sampai:</p>
											<p>{formatDateIndonesian(schedule.perkiraan_sampai)}</p>
										</div>
										<div>
											<p className="text-muted-foreground">Catatan:</p>
											<p
												className={
													!schedule.catatan
														? "text-muted-foreground italic"
														: ""
												}
											>
												{schedule.catatan || "Tidak ada catatan"}
											</p>
										</div>
									</div>
									<div className="mt-4 flex gap-2">
										<Link
											href={`/dashboard/jadwal/${schedule.id}`}
											className="text-sm border rounded-md px-3 py-1 hover:bg-muted transition-colors"
										>
											Detail
										</Link>
										<UpdateJadwal
											onSuccess={onRefresh}
											id={schedule.id}
											rowData={schedule}
										/>
										<HapusJadwal id={schedule.id} onSuccess={onRefresh} />
									</div>
								</div>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>
		);
	};

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader className="flex-row items-center justify-between pb-4 space-y-0">
					<CardTitle>
						{currentDate.toLocaleDateString("id-ID", {
							month: "long",
							year: "numeric",
						})}
					</CardTitle>
					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={prevMonth}>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button variant="outline" size="sm" onClick={nextMonth}>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentDate(new Date())}
						>
							Hari Ini
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-7 gap-0 rounded-lg overflow-hidden border">
						{["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
							<div
								key={day}
								className="p-2 bg-muted/50 text-center font-medium text-sm"
							>
								{day}
							</div>
						))}
						{renderCalendar()}
					</div>
				</CardContent>
			</Card>

			{renderSelectedDetails()}
		</div>
	);
};

const PageJadwal = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/jadwal-pengiriman`
			);

			if (!response.ok) {
				throw new Error("Gagal memuat data jadwal");
			}

			const result = await response.json();
			setData(result.data);
		} catch (err) {
			console.error("Error fetching jadwal data:", err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<p>Memuat data jadwal...</p>
			</div>
		);
	}

	if (error) {
		return (
			<Card className="bg-destructive/10 border-destructive">
				<CardContent className="p-4 text-destructive">{error}</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Jadwal Pengiriman</h1>
				<Link href="/dashboard/jadwal/tambah">
					<Button className="gap-2">
						<PlusCircle className="h-4 w-4" />
						Tambah Jadwal
					</Button>
				</Link>
			</div>

			<CalendarView data={data} onRefresh={fetchData} />
		</div>
	);
};

export default PageJadwal;
