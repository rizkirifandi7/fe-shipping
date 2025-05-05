"use client";

import { useEffect, useCallback, useState } from "react";
import TableView from "@/components/data-table/table-view";

import TambahCustomer from "./components/tambah-customer";
import HapusCustomer from "./components/hapus-customer";
import UpdateCustomer from "./components/update-customer";

const PageCustomer = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const columns = [
		{
			accessorKey: "kode_customer",
			header: "Kode Customer",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("kode_customer")}</div>
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
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("email")}</div>
			),
		},
		{
			accessorKey: "telepon",
			header: "Telepon",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("telepon")}</div>
			),
		},
		{
			accessorKey: "alamat",
			header: "Alamat",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("alamat")}</div>
			),
		},
		{
			accessorKey: "kota",
			header: "Kota",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("kota")}</div>
			),
		},
		{
			accessorKey: "provinsi",
			header: "Provinsi",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("provinsi")}</div>
			),
		},
		{
			accessorKey: "kode_pos",
			header: "Kode Pos",
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("kode_pos")}</div>
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
						<UpdateCustomer onSuccess={fetchData} id={id} rowData={rowData} />
						<HapusCustomer id={id} onSuccess={fetchData} />
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
				`${process.env.NEXT_PUBLIC_API_URL}/customer`
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
			TambahComponent={<TambahCustomer onSuccess={fetchData} />}
			title="Dashboard Customer"
			searchKey="nama"
		/>
	);
};

export default PageCustomer;
