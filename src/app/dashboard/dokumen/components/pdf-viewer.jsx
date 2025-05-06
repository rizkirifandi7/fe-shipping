"use client";

import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DeliveryLetter from "./surat-pengiriman";

const PdfPreview = ({ deliveryData, order, open, onOpenChange }) => {
	const [companyData, setCompanyData] = useState(null);

	// Fetch company data
	useEffect(() => {
		const fetchCompanyData = async () => {
			try {
				const response = await fetch("http://localhost:8012/aplikasi");
				const result = await response.json();
				setCompanyData(result.data[0]); // Assuming the first item is the company data
			} catch (error) {
				console.error("Error fetching company data:", error);
			}
		};

		fetchCompanyData();
	}, []);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl h-[90vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Preview Surat Jalan</DialogTitle>
					<div className="flex justify-between items-center">
						<p className="text-sm text-muted-foreground">
							Order #{order.id} - {order.customer.nama}
						</p>
						<PDFDownloadLink
							document={
								<DeliveryLetter
									deliveryData={deliveryData}
									order={order}
									companyData={companyData} // Pass company data to DeliveryLetter
								/>
							}
							fileName={`surat-jalan-${deliveryData.id}-${order.customer.nama}.pdf`}
						>
							{({ loading }) => (
								<Button size="sm" disabled={loading}>
									{loading ? "Menyiapkan..." : "Download PDF"}
								</Button>
							)}
						</PDFDownloadLink>
					</div>
				</DialogHeader>
				<div className="flex-1 min-h-0">
					<PDFViewer width="100%" height="100%">
						<DeliveryLetter
							deliveryData={deliveryData}
							order={order}
							companyData={companyData} // Pass company data to DeliveryLetter
						/>
					</PDFViewer>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PdfPreview;
