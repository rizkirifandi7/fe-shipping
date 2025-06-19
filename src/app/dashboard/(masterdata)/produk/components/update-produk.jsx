import { z } from "zod";
import GenericFormDialog from "@/components/input-form/text-input";

const produkFormSchema = z.object({
	kode_produk: z.string().min(1, "Kode produk harus diisi"),
	nama: z.string().min(1, "Nama produk harus diisi"),
	deskripsi: z.string().min(1, "Deskripsi produk harus diisi"),
	kategori: z.string().min(1, "Kategori produk harus diisi"),
	harga: z.coerce.number().min(1, "Harga produk harus diisi"),
	tinggi: z.coerce.number().min(0, "Tinggi produk harus diisi"),
	lebar: z.coerce.number().min(0, "Lebar produk harus diisi"),
	panjang: z.coerce.number().min(0, "Panjang produk harus diisi"),
	berat: z.coerce.number().min(0, "Berat produk harus diisi"),
	status: z.enum(["active", "inactive"]).optional(),
	stackable: z.enum(["yes", "no"]).optional(),
});

const UpdateProduk = ({ onSuccess, id, rowData }) => {
	const handleSubmit = async (values) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/produk/${id}`,
				{
					method: "PUT",
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
			triggerVariant="edit"
			dialogTitle="Update Produk"
			dialogDescription="Updatekan produk baru."
			formSchema={produkFormSchema}
			defaultValues={{
				kode_produk: rowData?.kode_produk || "",
				nama: rowData?.nama || "",
				deskripsi: rowData?.deskripsi || "",
				kategori: rowData?.kategori || "",
				harga: rowData?.harga || "",
				tinggi: rowData?.tinggi || "",
				lebar: rowData?.lebar || "",
				panjang: rowData?.panjang || "",
				berat: rowData?.berat || "",
				stackable: rowData?.stackable || "no",
				status: rowData?.status || "active",
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
					name: "tinggi",
					label: "Tinggi",
					placeholder: "Masukkan tinggi...",
					fieldType: "input",
				},
				{
					name: "lebar",
					label: "Lebar",
					placeholder: "Masukkan lebar...",
					fieldType: "input",
				},
				{
					name: "panjang",
					label: "Panjang",
					placeholder: "Masukkan panjang...",
					fieldType: "input",
				},
				{
					name: "berat",
					label: "Berat",
					placeholder: "Masukkan berat...",
					fieldType: "input",
				},
				{
					name: "stackable",
					label: "Stackable",
					placeholder: "Masukkan stackable...",
					fieldType: "select",
					options: [
						{ value: "yes", label: "Ya" },
						{ value: "no", label: "Tidak" },
					],
				},
				{
					name: "status",
					label: "Status",
					placeholder: "Masukkan status...",
					fieldType: "select",
					options: [
						{ value: "active", label: "Aktif" },
						{ value: "inactive", label: "Tidak Aktif" },
					],
				},
			]}
			onSubmit={handleSubmit}
			onSuccess={onSuccess}
		/>
	);
};

export default UpdateProduk;
