import DeleteDialog from "@/components/input-form/hapus-input";
import axios from "axios";

const HapusDriver = ({ id, onSuccess }) => {
	const deleteAction = async (id) => {
		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
		);
		return response.data;
	};

	return (
		<DeleteDialog
			id={id}
			entityName="Driver"
			onSuccess={onSuccess}
			deleteFn={deleteAction}
			triggerVariant="icon" // atau "text" atau "both"
			description="Apakah Anda yakin ingin menghapus driver ini? Data yang terkait juga akan terpengaruh."
		/>
	);
};

export default HapusDriver;
