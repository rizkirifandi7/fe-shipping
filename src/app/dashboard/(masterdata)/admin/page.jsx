"use client";

import { useEffect, useCallback, useState } from "react";
import TableView from "@/components/data-table/table-view";
import TambahAdmin from "./components/tambah-admin";
import HapusAdmin from "./components/hapus-admin";
import UpdateAdmin from "./components/update-admin";

const PageAdmin = () => {
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
			accessorKey: "email",
			header: "Email",
			accessorFn: (row) => row.email,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("email")}</div>
			),
		},
		{
			accessorKey: "telepon",
			header: "Telepon",
			accessorFn: (row) => row.telepon,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("telepon")}</div>
			),
		},
		{
			accessorKey: "role",
			header: "Role",
			accessorFn: (row) => row.role,
			cell: ({ row }) => (
				<div className="overflow-x-auto">{row.getValue("role")}</div>
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
						<UpdateAdmin onSuccess={fetchData} id={id} rowData={rowData} />
						<HapusAdmin id={id} onSuccess={fetchData} />
					</div>
				);
			},
		},
	];

	const fetchData = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`);

			if (!response.ok) {
				throw new Error("Gagal memuat data akun");
			}

			const result = await response.json();

			const filterRole = result.data.filter((item) => item.role === "admin");

			setData(filterRole);
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
			TambahComponent={<TambahAdmin onSuccess={fetchData} />}
			title="Dashboard Admin"
		/>
	);
};

export default PageAdmin;
