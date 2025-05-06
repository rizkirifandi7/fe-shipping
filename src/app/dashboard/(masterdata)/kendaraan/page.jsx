"use client";

import { useEffect, useCallback, useState } from "react";
import TableView from "@/components/data-table/table-view";
import UpdateKendaraan from "./components/update-kendaraan";
import HapusKendaraan from "./components/hapus-kendaraan";
import TambahKendaraan from "./components/tambah-kendaraan";

const PageDriver = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const columns = [
		{
			accessorKey: "nama",
			header: "Nama",
			accessorFn: (row) => row.nama,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("nama")}</div>
			),
		},
		{
			accessorKey: "plat_nomor",
			header: "Plat Nomor",
			accessorFn: (row) => row.plat_nomor,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("plat_nomor")}</div>
			),
		},
		{
			accessorKey: "panjang",
			header: "Panjang",
			accessorFn: (row) => row.panjang,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("panjang")}</div>
			),
		},
		{
			accessorKey: "lebar",
			header: "Lebar",
			accessorFn: (row) => row.lebar,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("lebar")}</div>
			),
		},
		{
			accessorKey: "tinggi",
			header: "Tinggi",
			accessorFn: (row) => row.tinggi,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("tinggi")}</div>
			),
		},
		{
			accessorKey: "kapasitas_berat",
			header: "Kapasitas Berat",
			accessorFn: (row) => row.kapasitas_berat,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("kapasitas_berat")}</div>
			),
		},
		{
			accessorKey: "kapasitas_volume",
			header: "Kapasitas Volume",
			accessorFn: (row) => row.kapasitas_volume,
			cell: ({ row }) => (
				<div className="overflow-x-auto">
					{row.getValue("kapasitas_volume")}
				</div>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			accessorFn: (row) => row.status,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("status")}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const { id } = row.original;
				const rowData = row.original;
				return (
					<div className="flex items-center gap-2">
						<UpdateKendaraan onSuccess={fetchData} id={id} rowData={rowData} />
						<HapusKendaraan id={id} onSuccess={fetchData} />
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
				`${process.env.NEXT_PUBLIC_API_URL}/kendaraan`
			);

			if (!response.ok) {
				throw new Error("Gagal memuat data akun");
			}

			const result = await response.json();

			setData(result.data);
		} catch (err) {
			console.error("Error fetching unit data:", err);
			setError("Gagal memuat data akun");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<TableView
			columns={columns}
			data={data}
			isLoading={isLoading}
			error={error}
			TambahComponent={<TambahKendaraan onSuccess={fetchData} />}
			title="Dashboard Kendaraan"
		/>
	);
};

export default PageDriver;
