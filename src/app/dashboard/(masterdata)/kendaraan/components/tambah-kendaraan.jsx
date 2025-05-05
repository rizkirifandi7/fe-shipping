import { z } from "zod";
import GenericFormDialog from "@/components/input-form/text-input";

const kendaraanFormSchema = z.object({
	nama: z.string().min(1, "Nama kendaraan harus diisi"),
	plat_nomor: z.string().min(1, "Plat nomor harus diisi"),
	kapasitas_volume: z.coerce
		.number()
		.min(1, "Kapasitas volume harus diisi")
		.int("Kapasitas volume harus berupa bilangan bulat"),
	kapasitas_berat: z.coerce
		.number()
		.min(1, "Kapasitas berat harus diisi")
		.int("Kapasitas berat harus berupa bilangan bulat"),
	tinggi: z
		.string()
		.min(1, "Harga produk harus diisi")
		.regex(/^\d+$/, "Harga produk harus berupa angka"),
	lebar: z
		.string()
		.min(1, "Lebar produk harus diisi")
		.regex(/^\d+$/, "Lebar produk harus berupa angka"),
	panjang: z
		.string()
		.min(1, "Panjang produk harus diisi")
		.regex(/^\d+$/, "Panjang produk harus berupa angka"),
});

const TambahKendaraan = ({ onSuccess }) => {
	const handleSubmit = async (values) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/kendaraan`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			if (!response.ok) throw new Error("Gagal menambahkan kendaraan");
			return response; // Return response untuk ditangani di GenericFormDialog
		} catch (error) {
			throw error; // Lempar error untuk ditangani di GenericFormDialog
		}
	};

	return (
		<GenericFormDialog
			dialogClassName="max-h-[80dvh] overflow-y-auto sm:max-w-[600px]"
			triggerVariant="add"
			triggerText="Tambah Kendaraan"
			dialogTitle="Tambah Kendaraan"
			dialogDescription="Tambahkan kendaraan baru."
			formSchema={kendaraanFormSchema}
			defaultValues={{
				nama: "",
				plat_nomor: "",
				kapasitas_volume: "",
				kapasitas_berat: "",
				tinggi: "",
				lebar: "",
				panjang: "",
			}}
			fields={[
				{
					name: "nama",
					label: "Nama",
					placeholder: "Masukkan nama...",
					fieldType: "input",
				},
				{
					name: "plat_nomor",
					label: "Plat Nomor",
					placeholder: "Masukkan plat nomor...",
					fieldType: "input",
				},
				{
					name: "kapasitas_volume",
					label: "Kapasitas Volume",
					placeholder: "Masukkan kapasitas volume...",
					fieldType: "number",
				},
				{
					name: "kapasitas_berat",
					label: "Kapasitas Berat",
					placeholder: "Masukkan kapasitas berat...",
					fieldType: "number",
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
			]}
			onSubmit={handleSubmit}
			onSuccess={onSuccess}
		/>
	);
};

export default TambahKendaraan;
