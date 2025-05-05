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
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("kode_produk")}</div>
			),
		},
		{
			accessorKey: "nama",
			header: "Nama",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("nama")}</div>
			),
		},
		{
			accessorKey: "deskripsi",
			header: "Deskripsi",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("deskripsi")}</div>
			),
		},
		{
			accessorKey: "kategori",
			header: "Kategori",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("kategori")}</div>
			),
		},
		{
			accessorKey: "harga",
			header: "Harga",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("harga")}</div>
			),
		},
		{
			accessorKey: "stok",
			header: "Stok",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("stok")}</div>
			),
		},
		{
			accessorKey: "panjang",
			header: "Panjang",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("panjang")}</div>
			),
		},
		{
			accessorKey: "lebar",
			header: "Lebar",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("lebar")}</div>
			),
		},
		{
			accessorKey: "tinggi",
			header: "Tinggi",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("tinggi")}</div>
			),
		},
		{
			accessorKey: "berat",
			header: "Berat",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("berat")}</div>
			),
		},
		{
			accessorKey: "stackable",
			header: "Stackable",
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
			searchKey="nama"
		/>
	);
};

export default PageAdmin;
