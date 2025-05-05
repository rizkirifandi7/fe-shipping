import { z } from "zod";
import GenericFormDialog from "@/components/input-form/text-input";

const customerFormSchema = z.object({
	kode_customer: z.string().min(1, "Kode customer harus diisi"),
	nama: z.string().min(1, "Nama customer harus diisi"),
	email: z.string().email("Email tidak valid"),
	telepon: z
		.string()
		.min(10, "Nomor telepon minimal 10 digit")
		.max(15, "Nomor telepon maksimal 15 digit")
		.regex(/^\+?\d+$/, "Format nomor telepon tidak valid"),
	alamat: z.string().min(1, "Alamat harus diisi"),
	kota: z.string().min(1, "Kota harus diisi"),
	provinsi: z.string().min(1, "Provinsi harus diisi"),
	kode_pos: z.string().min(1, "Kode pos harus diisi"),
});

const UpdateCustomer = ({ onSuccess, id, rowData }) => {
	const handleSubmit = async (values) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			if (!response.ok) throw new Error("Gagal menambahkan customer");
			return response; // Return response untuk ditangani di GenericFormDialog
		} catch (error) {
			throw error; // Lempar error untuk ditangani di GenericFormDialog
		}
	};

	return (
		<GenericFormDialog
			layoutType="vertical"
			dialogClassName="max-h-[80dvh] overflow-y-auto sm:max-w-[800px]"
			// formClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
			triggerVariant="edit"
			dialogTitle="Update Customer"
			dialogDescription="Updatekan customer baru."
			formSchema={customerFormSchema}
			defaultValues={{
				kode_customer: rowData.kode_customer || "",
				nama: rowData.nama || "",
				email: rowData.email || "",
				telepon: rowData.telepon || "",
				alamat: rowData.alamat || "",
				kota: rowData.kota || "",
				provinsi: rowData.provinsi || "",
				kode_pos: rowData.kode_pos || "",
			}}
			fields={[
				{
					name: "kode_customer",
					label: "Kode_customer",
					placeholder: "Masukkan kode_customer...",
					fieldType: "input",
				},
				{
					name: "nama",
					label: "Nama",
					placeholder: "Masukkan nama...",
					fieldType: "input",
				},
				{
					name: "email",
					label: "Email",
					placeholder: "Masukkan email...",
					fieldType: "input",
				},
				{
					name: "alamat",
					label: "Alamat",
					placeholder: "Masukkan alamat...",
					fieldType: "textarea",
				},
				{
					name: "telepon",
					label: "Telepon",
					placeholder: "Masukkan telepon...",
					fieldType: "tel",
				},
				{
					name: "kota",
					label: "Kota",
					placeholder: "Masukkan kota...",
					fieldType: "input",
				},
				{
					name: "provinsi",
					label: "Provinsi",
					placeholder: "Masukkan provinsi...",
					fieldType: "input",
				},
				{
					name: "kode_pos",
					label: "Kode Pos",
					placeholder: "Masukkan kode pos...",
					fieldType: "input",
				},
			]}
			onSubmit={handleSubmit}
			onSuccess={onSuccess}
		/>
	);
};

export default UpdateCustomer;
