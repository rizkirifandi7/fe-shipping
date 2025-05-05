"use client";

import { CgFileDocument } from "react-icons/cg";
import { HiOutlineDownload, HiOutlinePrinter } from "react-icons/hi";
import { FiShare2 } from "react-icons/fi";
import Invoice from "./dokumen";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
	() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
	{ ssr: false }
);

const BlobProvider = dynamic(
	() => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
	{ ssr: false }
);

const PdfCard = ({ title }) => {
	const styles = {
		container: {
			width: "220px",
			borderRadius: "5px",
			padding: "15px 12px",
			display: "flex",
			flexDirection: "column",
			gap: "15px",
			boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
		},
		flex: { width: "100%", display: "flex", gap: "5px", alignItems: "center" },
		bold: { fontSize: "13px", fontWeight: 600 },
		thin: { fontSize: "11px", color: "#6f6f6f", fontWeight: 500 },
		btn: {
			borderRadius: "3px",
			border: "1px solid gray",
			display: "flex",
			alignItems: "center",
			gap: "2px",
			padding: "3px",
			fontSize: "11px",
			color: "#4f4f4f",
			fontWeight: 600,
			cursor: "pointer",
			userSelect: "none",
		},
	};

	return (
		<div style={styles.container}>
			<div style={styles.flex}>
				<CgFileDocument color="#90e0ef" size={20} />
				<span style={styles.bold}>{title}</span>
			</div>
			<div style={styles.thin}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
				eligendi reiciendis fuga doloremque
			</div>

			<div style={{ ...styles.flex, ...{ justifyContent: "space-between" } }}>
				<PDFDownloadLink document={<Invoice />} fileName="invoice.pdf">
					<div style={styles.btn}>
						<HiOutlineDownload size={14} />
						<span>Download</span>
					</div>
				</PDFDownloadLink>

				<BlobProvider document={<Invoice />}>
					{({ url, blob }) => (
						<a href={url} target="_blank" style={styles.btn}>
							<HiOutlinePrinter size={14} />
							<span>Print</span>
						</a>
					)}
				</BlobProvider>
				<div style={styles.btn}>
					<FiShare2 size={14} />
					<span>Share</span>
				</div>
			</div>
		</div>
	);
};

export default PdfCard;
