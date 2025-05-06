"use client";

import { useEffect, useCallback, useState } from "react";
import TableView from "@/components/data-table/table-view";
import TambahDriver from "./components/tambah-driver";
import HapusDriver from "./components/hapus-driver";
import UpdateDriver from "./components/update-driver";

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
						<UpdateDriver onSuccess={fetchData} id={id} rowData={rowData} />
						<HapusDriver id={id} onSuccess={fetchData} />
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

			const filterRole = result.data.filter((item) => item.role === "driver");

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
			TambahComponent={<TambahDriver onSuccess={fetchData} />}
			title="Dashboard Driver"
		/>
	);
};

export default PageDriver;
