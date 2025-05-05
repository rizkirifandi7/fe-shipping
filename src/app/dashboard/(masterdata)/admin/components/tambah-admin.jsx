import { z } from "zod";
import GenericFormDialog from "@/components/input-form/text-input";

const roleFormSchema = z.object({
	nama: z.string().min(1, "Nama role harus diisi"),
	email: z.string().email("Email tidak valid"),
	password: z.string().min(6, "Password minimal 6 karakter"),
	retypePassword: z.string().min(6, "Password minimal 6 karakter"),
	telepon: z
		.string()
		.min(10, "Nomor telepon minimal 10 digit")
		.max(15, "Nomor telepon maksimal 15 digit")
		.regex(/^\+?\d+$/, "Format nomor telepon tidak valid"),
	role: z.enum(["admin", "driver"]),
});

const TambahAdmin = ({ onSuccess }) => {
	const handleSubmit = async (values) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			if (!response.ok) throw new Error("Gagal menambahkan akun");
			return response; // Return response untuk ditangani di GenericFormDialog
		} catch (error) {
			throw error; // Lempar error untuk ditangani di GenericFormDialog
		}
	};

	return (
		<GenericFormDialog
			layoutType="grid"
			dialogClassName="max-h-[80dvh] overflow-y-auto sm:max-w-[800px]"
			formClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
			triggerVariant="add"
			triggerText="Tambah Admin"
			dialogTitle="Tambah Admin"
			dialogDescription="Tambahkan admin baru."
			formSchema={roleFormSchema}
			defaultValues={{
				nama: "",
				email: "",
				password: "",
				retypePassword: "",
				telepon: "",
				role: "admin",
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
					label: "Password",
					placeholder: "Masukkan password...",
					fieldType: "input",
				},
				{
					name: "retypePassword",
					label: "RetypePassword",
					placeholder: "Masukkan retypePassword...",
					fieldType: "input",
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

export default TambahAdmin;
