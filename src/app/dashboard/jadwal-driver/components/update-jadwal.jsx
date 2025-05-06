import { z } from "zod";
import GenericFormDialog from "@/components/input-form/text-input";

const jadwalFormSchema = z.object({
	status: z.enum(["scheduled", "in_transit", "completed"]).optional(),
});

const UpdateJadwal = ({ onSuccess, id, rowData }) => {
	const handleSubmit = async (values) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/jadwal-pengiriman/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			if (!response.ok) throw new Error("Gagal update jadwal");
			return response; // Return response untuk ditangani di GenericFormDialog
		} catch (error) {
			throw error; // Lempar error untuk ditangani di GenericFormDialog
		}
	};

	return (
		<GenericFormDialog
			dialogClassName="max-h-[80dvh] overflow-y-auto sm:max-w-[600px]"
			triggerVariant="edit"
			dialogTitle="Update Jadwal Pengiriman"
			dialogDescription="Update jadwal pengiriman baru."
			formSchema={jadwalFormSchema}
			defaultValues={{
				status: rowData?.status || "",
			}}
			fields={[
				{
					name: "status",
					label: "Status",
					placeholder: "Pilih status...",
					fieldType: "select",
					options: [
						{ value: "scheduled", label: "Scheduled" },
						{ value: "in_transit", label: "In Transit" },
						{ value: "completed", label: "Completed" },
					],
				},
			]}
			onSubmit={handleSubmit}
			onSuccess={onSuccess}
		/>
	);
};

export default UpdateJadwal;
