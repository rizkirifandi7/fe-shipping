"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Eye } from "lucide-react";
import PdfPreview from "./pdf-viewer";

const DeliveryLettersWrapper = ({ deliveryData, order }) => {
	const [previewOpen, setPreviewOpen] = useState(false);

	return (
		<>
			<Button
				variant="outline"
				size="sm"
				className="gap-1"
				onClick={() => setPreviewOpen(true)}
			>
				<ArrowDownToLine className="h-3.5 w-3.5" />
				<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
					Unduh Surat
				</span>
			</Button>

			<PdfPreview
				deliveryData={deliveryData}
				order={order}
				open={previewOpen}
				onOpenChange={setPreviewOpen}
			/>
		</>
	);
};

export default DeliveryLettersWrapper;