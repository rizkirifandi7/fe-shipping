import { z } from "zod";
import GenericFormDialog from "@/components/input-form/text-input";

// Schema untuk update (password opsional)
const roleFormSchema = z
	.object({
		nama: z.string().min(1, "Nama role harus diisi"),
		email: z.string().email("Email tidak valid"),
		password: z
			.string()
			.min(6, "Password minimal 6 karakter")
			.optional()
			.or(z.literal("")),
		retypePassword: z
			.string()
			.min(6, "Password minimal 6 karakter")
			.optional()
			.or(z.literal("")),
		telepon: z
			.string()
			.min(10, "Nomor telepon minimal 10 digit")
			.max(15, "Nomor telepon maksimal 15 digit")
			.regex(/^\+?\d+$/, "Format nomor telepon tidak valid"),
		role: z.enum(["admin", "driver"]),
	})
	.refine((data) => data.password === data.retypePassword, {
		message: "Password tidak sama",
		path: ["retypePassword"],
	});

const UpdateAdmin = ({ onSuccess, id, rowData }) => {
	const handleSubmit = async (values) => {
		try {
			// Jika password kosong, hapus dari payload
			const payload = { ...values };
			if (!payload.password) {
				delete payload.password;
				delete payload.retypePassword;
			}

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			if (!response.ok) throw new Error("Gagal mengupdate akun");
			return response;
		} catch (error) {
			throw error;
		}
	};

	return (
		<GenericFormDialog
			layoutType="grid"
			dialogClassName="max-h-[80dvh] overflow-y-auto sm:max-w-[800px]"
			formClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
			triggerVariant="edit"
			dialogTitle="Update Admin"
			dialogDescription="Update admin."
			formSchema={roleFormSchema}
			defaultValues={{
				nama: rowData.nama || "",
				email: rowData.email || "",
				password: "",
				retypePassword: "",
				telepon: rowData.telepon || "",
				role: rowData.role || "",
			}}
			fields={[
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
					name: "password",
					label: "Password Baru (opsional)",
					placeholder: "Kosongkan jika tidak ingin mengubah...",
					fieldType: "input",
					type: "password",
				},
				{
					name: "retypePassword",
					label: "Ulangi Password Baru",
					placeholder: "Kosongkan jika tidak ingin mengubah...",
					fieldType: "input",
					type: "password",
				},
				{
					name: "telepon",
					label: "Telepon",
					placeholder: "Masukkan telepon...",
					fieldType: "tel",
				},
				{
					name: "role",
					label: "Role",
					placeholder: "Pilih role...",
					fieldType: "select",
					options: [
						{ value: "admin", label: "Admin" },
						{ value: "driver", label: "Driver" },
					],
				},
			]}
			onSubmit={handleSubmit}
			onSuccess={onSuccess}
		/>
	);
};

export default UpdateAdmin;
