import DeleteDialog from "@/components/input-form/hapus-input";
import axios from "axios";

const HapusKendaraan = ({ id, onSuccess }) => {
	const deleteAction = async (id) => {
		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/kendaraan/${id}`
		);
		return response.data;
	};

	return (
		<DeleteDialog
			id={id}
			entityName="Kendaraan"
			onSuccess={onSuccess}
			deleteFn={deleteAction}
			triggerVariant="icon" // atau "text" atau "both"
			description="Apakah Anda yakin ingin menghapus kendaraan ini? Data yang terkait juga akan terpengaruh."
		/>
	);
};

export default HapusKendaraan;
