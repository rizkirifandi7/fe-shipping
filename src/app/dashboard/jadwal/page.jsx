"use client";

import { useEffect, useCallback, useState } from "react";
import TableView from "@/components/data-table/table-view";
import { formatDateIndonesian } from "@/lib/formatDateIndonesia";
import { Button } from "@/components/ui/button";
import HapusJadwal from "./components/hapus-jadwal";
import Link from "next/link";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import UpdateJadwal from "./components/update-jadwal";

const PageJadwal = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const columns = [
		{
			accessorKey: "kendaraan",
			header: "Kendaraan",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.original?.kendaraan?.nama}</div>
			),
		},
		{
			accessorKey: "tgl_pengiriman",
			header: "Tgl.Pengiriman",
			cell: ({ row }) => (
				<div className="overflow-x-auto">
					{formatDateIndonesian(row.getValue("tgl_pengiriman"))}
				</div>
			),
		},
		{
			accessorKey: "perkiraan_sampai",
			header: "Perkiraan Sampai",
			cell: ({ row }) => (
				<div className="overflow-x-auto">
					{formatDateIndonesian(row.getValue("perkiraan_sampai"))}
				</div>
			),
		},
		{
			accessorKey: "status",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Status
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => {
				const status = row.getValue("status");
				let colorClass = "bg-gray-200 text-gray-800 border";
				let label = status;

				if (status === "scheduled") {
					colorClass = "bg-blue-100 text-blue-800 border border-blue-200";
					label = "Terjadwal";
				} else if (status === "in_transit") {
					colorClass = "bg-yellow-100 text-yellow-800 border border-yellow-200";
					label = "Dalam Perjalanan";
				} else if (status === "completed") {
					colorClass = "bg-green-100 text-green-800 border border-green-200";
					label = "Selesai";
				}

				return (
					<span
						className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${colorClass}`}
					>
						{label}
					</span>
				);
			},
		},
		{
			accessorKey: "catatan",
			header: "Catatan",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("catatan")}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const { id } = row.original;
				const rowData = row.original;
				return (
					<div className="flex justify-center items-center gap-2">
						<Link
							href={`/dashboard/jadwal/${id}`}
							className="text-sm border rounded-md px-2 py-1.5"
						>
							Detail
						</Link>
						<UpdateJadwal onSuccess={fetchData} id={id} rowData={rowData} />
						<HapusJadwal id={id} onSuccess={fetchData} />
					</div>
				);
			},
		},
	];

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
			console.error("Error fetching unit data:", err);
			setError("Gagal memuat data jadwal");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="">
			<TableView
				columns={columns}
				data={data}
				isLoading={isLoading}
				error={error}
				TambahComponent={
					<Link href="/dashboard/jadwal/tambah">
						<Button>
							<PlusCircle />
							Tambah Jadwal
						</Button>
					</Link>
				}
				title="Dashboard Jadwal Pengiriman"
			/>
		</div>
	);
};

export default PageJadwal;
