"use client";

import { useCartProduk } from "@/hooks/use-cart-produk";
import DetailTotal from "../components/detail-total";
import ListItem from "../components/list-item";
import ItemProduk from "../components/item-produk";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

const PageProduk = () => {
	const [data, setData] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingCustomers, setLoadingCustomers] = useState(false);
	const [formData, setFormData] = useState({
		id_customer: "",
		tanggal_order: "",
	});

	const {
		cartProduk,
		addToCart,
		removeFromCart,
		removeItemFromCart,
		getCartTotal,
		clearCart,
	} = useCartProduk();

	useEffect(() => {
		// Fetch products
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/produk`
				);
				const result = await response.json();
				if (response.ok) {
					setData(result.data);
				} else {
					throw new Error(result.message || "Gagal memuat data produk");
				}
			} catch (error) {
				toast(error.message || "Gagal memuat data produk");
			}
		};

		// Fetch customers
		const fetchCustomers = async () => {
			setLoadingCustomers(true);
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/customer`
				);
				const result = await response.json();
				if (response.ok) {
					console.log(result.data);
					setCustomers(result.data);
				} else {
					throw new Error(result.message || "Gagal memuat data customer");
				}
			} catch (error) {
				toast(error.message || "Gagal memuat data customer");
			} finally {
				setLoadingCustomers(false);
			}
		};

		fetchProducts();
		fetchCustomers();
	}, [toast]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCustomerChange = (value) => {
		setFormData((prev) => ({
			...prev,
			id_customer: value,
		}));
	};

	const orderProduk = async () => {
		if (cartProduk.length === 0) {
			toast("Tidak ada item dalam keranjang");
			return;
		}

		if (!formData.id_customer) {
			toast("Customer harus dipilih");
			return;
		}

		if (!formData.tanggal_order) {
			toast("Tanggal pengiriman tidak boleh kosong");
			return;
		}

		// Hitung total harga dari keranjang produk
		const totalHarga = cartProduk.reduce(
			(acc, item) => acc + item.harga * item.quantity,
			0
		);
		const jumlahProduk = cartProduk.reduce(
			(acc, item) => acc + item.quantity,
			0
		);

		setLoading(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/order/produk`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...formData,
						total_harga: totalHarga,
						diskon: 0,
						pajak: 0,
						jumlah: jumlahProduk,
						status: "pending",
						produk: cartProduk.map((item) => ({
							id_produk: item.id,
							jumlah: item.quantity,
							harga: item.harga,
						})),
					}),
				}
			);

			const result = await response.json();

			if (response.ok) {
				clearCart();
				toast("Pesanan berhasil dibuat");
			} else {
				throw new Error(
					result.error || result.message || "Gagal membuat pesanan"
				);
			}
		} catch (error) {
			console.error("Error order produk:", error);
			toast(error.message || "Gagal membuat pesanan");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-4">
			<Link href="/dashboard/pesanan">
				<Button variant={"outline"} className="mb-4">
					Kembali
				</Button>
			</Link>
			<h1 className="text-center font-bold text-2xl border p-2 rounded-md shadow">
				Order Produk
			</h1>

			<div className="flex flex-col lg:flex-row gap-6 w-full mt-6">
				<Card className="w-full lg:w-2/3 p-4 rounded-md shadow">
					<h1 className="text-xl font-bold">Produk</h1>
					<ItemProduk
						data={data}
						cartProduk={cartProduk}
						removeFromCart={removeFromCart}
						addToCart={addToCart}
					/>
				</Card>

				<div className="w-full lg:w-1/3 space-y-4">
					<Card className="p-4 rounded-md shadow">
						<h1 className="text-xl font-bold mb-4">Order List</h1>
						{cartProduk.length > 0 ? (
							<ListItem
								data={cartProduk}
								removeItemFromCart={removeItemFromCart}
							/>
						) : (
							<p className="text-center text-sm text-slate-500 border-y py-4">
								Tidak ada item
							</p>
						)}
						<DetailTotal getCartTotal={getCartTotal} />
					</Card>

					<Card className="p-4 rounded-md shadow">
						<h1 className="text-xl font-bold mb-4">Detail Pesanan</h1>
						<div className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="customer">Customer*</Label>
								<Select
									onValueChange={handleCustomerChange}
									value={formData.id_customer}
									disabled={loadingCustomers}
								>
									<SelectTrigger>
										<SelectValue placeholder="Pilih customer" />
									</SelectTrigger>
									<SelectContent>
										{loadingCustomers ? (
											<SelectItem value="loading" disabled>
												Memuat customer...
											</SelectItem>
										) : customers.length > 0 ? (
											customers.map((customer) => (
												<SelectItem
													key={customer.id}
													value={customer.id.toString()}
												>
													{customer.kode_customer} - {customer.nama}
												</SelectItem>
											))
										) : (
											<SelectItem value="no-customer" disabled>
												Tidak ada customer tersedia
											</SelectItem>
										)}
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="tanggal_order">Tanggal Order</Label>
								<Input
									type="date"
									id="tanggal_order"
									name="tanggal_order"
									value={formData.tanggal_order}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</Card>

					<Button
						className="w-full py-6 text-lg"
						onClick={orderProduk}
						disabled={
							loading || cartProduk.length === 0 || !formData.id_customer
						}
					>
						{loading ? "Memproses..." : "Buat Pesanan"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PageProduk;
