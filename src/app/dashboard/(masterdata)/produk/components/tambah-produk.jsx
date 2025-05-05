import { z } from "zod";
import GenericFormDialog from "@/components/input-form/text-input";

const produkFormSchema = z.object({
	kode_produk: z.string().min(1, "Kode produk harus diisi"),
	nama: z.string().min(1, "Nama produk harus diisi"),
	deskripsi: z.string().min(1, "Deskripsi produk harus diisi"),
	kategori: z.string().min(1, "Kategori produk harus diisi"),
	harga: z
		.string()
		.min(1, "Harga produk harus diisi")
		.regex(/^\d+$/, "Harga produk harus berupa angka"),
	stok: z
		.string()
		.min(1, "Stok produk harus diisi")
		.regex(/^\d+$/, "Stok produk harus berupa angka"),
	tinggi: z
		.string()
		.min(1, "Tinggi produk harus diisi")
		.regex(/^\d+$/, "Tinggi produk harus berupa angka"),
	lebar: z
		.string()
		.min(1, "Lebar produk harus diisi")
		.regex(/^\d+$/, "Lebar produk harus berupa angka"),
	panjang: z
		.string()
		.min(1, "Panjang produk harus diisi")
		.regex(/^\d+$/, "Panjang produk harus berupa angka"),
	berat: z
		.string()
		.min(1, "Berat produk harus diisi")
		.regex(/^\d+$/, "Berat produk harus berupa angka"),
	status: z.enum(["active", "inactive"]).optional(),
	stackable: z.enum(["yes", "no"]).optional(),
});

const TambahProduk = ({ onSuccess }) => {
	const handleSubmit = async (values) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/produk`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			if (!response.ok) throw new Error("Gagal menambahkan produk");
			return response; // Return response untuk ditangani di GenericFormDialog
		} catch (error) {
			throw error; // Lempar error untuk ditangani di GenericFormDialog
		}
	};

	return (
		<GenericFormDialog
			layoutType="vertical"
			dialogClassName="max-h-[80dvh] overflow-y-auto sm:max-w-[600px]"
			triggerVariant="add"
			triggerText="Tambah Produk"
			dialogTitle="Tambah Produk"
			dialogDescription="Tambahkan produk baru."
			formSchema={produkFormSchema}
			defaultValues={{
				kode_produk: "",
				nama: "",
				deskripsi: "",
				kategori: "",
				harga: "",
				stok: "",
				tinggi: "",
				lebar: "",
				panjang: "",
				berat: "",
				status: "active",
				stackable: "yes",
			}}
			fields={[
				{
					name: "kode_produk",
					label: "Kode Produk",
					placeholder: "Masukkan kode produk...",
					fieldType: "input",
				},
				{
					name: "nama",
					label: "Nama",
					placeholder: "Masukkan nama...",
					fieldType: "input",
				},
				{
					name: "deskripsi",
					label: "Deskripsi",
					placeholder: "Masukkan deskripsi...",
					fieldType: "textarea",
				},
				{
					name: "kategori",
					label: "Kategori",
					placeholder: "Masukkan kategori...",
					fieldType: "input",
				},
				{
					name: "harga",
					label: "Harga",
					placeholder: "Masukkan harga...",
					fieldType: "input",
				},
				{
					name: "stok",
					label: "Stok",
					placeholder: "Masukkan stok...",
					fieldType: "input",
				},
				{
					name: "panjang",
					label: "Panjang",
					placeholder: "Masukkan panjang... (ex: 1.5)",
					fieldType: "input",
					deskripsi: "Panjang dalam meter",
				},
				{
					name: "lebar",
					label: "Lebar",
					placeholder: "Masukkan lebar... (ex: 1.5)",
					fieldType: "input",
					deskripsi: "Lebar dalam meter",
				},
				{
					name: "tinggi",
					label: "Tinggi",
					placeholder: "Masukkan tinggi... (ex: 1.5)",
					fieldType: "input",
					deskripsi: "Tinggi dalam meter",
				},
				{
					name: "berat",
					label: "Berat",
					placeholder: "Masukkan berat... (ex: 1.5)",
					fieldType: "input",
					deskripsi: "Berat dalam kilogram",
				},
				{
					name: "status",
					label: "Status",
					fieldType: "select",
					options: [
						{ value: "active", label: "Aktif" },
						{ value: "inactive", label: "Tidak Aktif" },
					],
				},
				{
					name: "stackable",
					label: "Stackable",
					fieldType: "select",
					options: [
						{ value: "yes", label: "Ya" },
						{ value: "no", label: "Tidak" },
					],
				},
			]}
			onSubmit={handleSubmit}
			onSuccess={onSuccess}
		/>
	);
};

export default TambahProduk;
