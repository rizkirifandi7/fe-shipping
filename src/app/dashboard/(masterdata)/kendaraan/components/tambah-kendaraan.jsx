import { z } from "zod";
import GenericFormDialog from "@/components/input-form/text-input";

const kendaraanFormSchema = z.object({
	nama: z.string().min(1, "Nama kendaraan harus diisi"),
	plat_nomor: z.string().min(1, "Plat nomor harus diisi"),
	kapasitas_berat: z.coerce.number().min(1, "Kapasitas berat harus diisi"),
	tinggi: z.coerce.number().min(1, "Tinggi kendaraan harus diisi"),
	lebar: z.coerce.number().min(1, "Lebar kendaraan harus diisi"),
	panjang: z.coerce.number().min(1, "Panjang kendaraan harus diisi"),
	status: z.enum(["active", "inactive"]),
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
				kapasitas_berat: "",
				tinggi: "",
				lebar: "",
				panjang: "",
				status: "active",
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
				{
					name: "status",
					label: "Status",
					placeholder: "Pilih status...",
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

export default TambahKendaraan;
