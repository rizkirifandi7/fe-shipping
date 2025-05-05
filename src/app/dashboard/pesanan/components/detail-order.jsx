import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Eye } from "lucide-react";
import { useState } from "react";

const DetailOrder = ({ rowData }) => {
	const [openTambah, setOpenTambah] = useState(false);

	return (
		<Dialog open={openTambah} onOpenChange={setOpenTambah}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Eye />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Detail Order Bahan Baku</DialogTitle>
					<DialogDescription>
						Berikut ini detail pesanan dari bahan baku yang dipesan.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="">
						<h1 className="font-bold">Status</h1>
						<p className="capitalize">{rowData.status ? rowData.status : "Tidak ada kategori"}</p>
					</div>
					<div className="">
						<h1 className="font-bold">Nama</h1>
						<p className="text-base capitalize">{rowData.user?.nama}</p>
					</div>
					<div className="">
						<h1 className="font-bold">Order Bahan</h1>
						{rowData.order_bahan_detail.map((item, index) => (
							<div key={index}>
								{item.bahan_baku.nama_bahan} - {item.jumlah}
							</div>
						))}
					</div>

					<div className="">
						<h1 className="font-bold">Total Harga</h1>
						<p>
							{new Intl.NumberFormat("id-ID", {
								style: "currency",
								currency: "IDR",
							}).format(parseFloat(rowData.total_harga))}
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DetailOrder;