"use client";

import { useEffect, useCallback, useState } from "react";
import TableView from "@/components/data-table/table-view";
import HapusProduk from "./components/hapus-produk";
import UpdateProduk from "./components/update-produk";
import TambahProduk from "./components/tambah-produk";

const PageAdmin = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const columns = [
		{
			accessorKey: "kode_produk",
			header: "Kode Produk",
			accessorFn: (row) => row.kode_produk,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("kode_produk")}</div>
			),
		},
		{
			accessorKey: "nama",
			header: "Nama",
			accessorFn: (row) => row.nama,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("nama")}</div>
			),
		},
		{
			accessorKey: "deskripsi",
			header: "Deskripsi",
			accessorFn: (row) => row.deskripsi,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("deskripsi")}</div>
			),
		},
		{
			accessorKey: "kategori",
			header: "Kategori",
			accessorFn: (row) => row.kategori,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("kategori")}</div>
			),
		},
		{
			accessorKey: "harga",
			header: "Harga",
			accessorFn: (row) => row.harga,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("harga")}</div>
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
			accessorKey: "berat",
			header: "Berat",
			accessorFn: (row) => row.berat,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("berat")}</div>
			),
		},
		{
			accessorKey: "stackable",
			header: "Stackable",
			accessorFn: (row) => row.stackable,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("stackable")}</div>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
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
						<UpdateProduk onSuccess={fetchData} id={id} rowData={rowData} />
						<HapusProduk id={id} onSuccess={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produk`);

			const result = await response.json();
			setData(result.data);
		} catch (err) {
			console.error("Error fetching unit data:", err);
			setError("Gagal memuat data produk");
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
			TambahComponent={<TambahProduk onSuccess={fetchData} />}
			title="Dashboard Produk"
		/>
	);
};

export default PageAdmin;
