"use client";

import { useEffect, useCallback, useState } from "react";
import TableView from "@/components/data-table/table-view";
import UpdateKendaraan from "./components/update-jadwal";
import HapusKendaraan from "./components/hapus-jadwal";
import TambahKendaraan from "./components/tambah-jadwal";
import {
	formatDateIndonesian,
	formatDateShortMonth,
} from "@/lib/formatDateIndonesia";
import { formatUangIDR } from "@/lib/formatUang";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HapusOrder from "./components/hapus-jadwal";

const PagePesanan = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const columns = [
		{
			accessorKey: "tanggal_order",
			header: "Tgl. Order",
			cell: ({ row }) => (
				<div className="overflow-x-auto">
					{formatDateShortMonth(row.getValue("tanggal_order"))}
				</div>
			),
		},
		{
			accessorKey: "customer",
			header: "Customer",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.original?.customer?.nama}</div>
			),
		},
		{
			accessorKey: "produk",
			header: "Produk",
			cell: ({ row }) => {
				const produk = row.original?.order_detail
					?.map((item) => item?.produk?.nama)
					.join(", ");
				return <div className="">{produk}</div>;
			},
		},
		{
			accessorKey: "jumlah",
			header: "Jumlah",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("jumlah")}</div>
			),
		},
		{
			accessorKey: "diskon",
			header: "Diskon",
			cell: ({ row }) => (
				<div className="overflow-x-auto">
					{formatUangIDR(row.getValue("diskon"))}
				</div>
			),
		},
		{
			accessorKey: "pajak",
			header: "Pajak",
			cell: ({ row }) => (
				<div className="overflow-x-auto">
					{formatUangIDR(row.getValue("pajak"))}
				</div>
			),
		},
		{
			accessorKey: "total_harga",
			header: "Total Harga",
			cell: ({ row }) => (
				<div className="overflow-x-auto">
					{formatUangIDR(row.getValue("total_harga"))}
				</div>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<div className="overflow-x-auto capitalize">{row.getValue("status")}</div>
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
						<HapusOrder id={id} onSuccess={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`);

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
		<TableView
			columns={columns}
			data={data}
			isLoading={isLoading}
			error={error}
			TambahComponent={
				<Link href="/dashboard/pesanan/produk">
					<Button>Tambah Pesanan</Button>
				</Link>
			}
			title="Manajemen Pesanan"
			searchKey="customer"
		/>
	);
};

export default PagePesanan;
