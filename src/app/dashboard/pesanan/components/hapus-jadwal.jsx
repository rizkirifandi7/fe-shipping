import DeleteDialog from "@/components/input-form/hapus-input";
import axios from "axios";

const HapusOrder = ({ id, onSuccess }) => {
	const deleteAction = async (id) => {
		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`
		);
		return response.data;
	};

	return (
		<DeleteDialog
			id={id}
			entityName="Order"
			onSuccess={onSuccess}
			deleteFn={deleteAction}
			triggerVariant="icon" // atau "text" atau "both"
			description="Apakah Anda yakin ingin menghapus order ini? Data yang terkait juga akan terpengaruh."
		/>
	);
};

export default HapusOrder;
