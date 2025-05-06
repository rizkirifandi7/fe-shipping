import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
	Font,
} from "@react-pdf/renderer";

// Register fonts (you'll need to load actual font files)
Font.register({
	family: "Open Sans",
	fonts: [
		{
			src: "https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf",
		}, // Regular
		{
			src: "https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhs.ttf",
			fontWeight: 600,
		}, // Semi-bold
		{
			src: "https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhs.ttf",
			fontWeight: 700,
		}, // Bold
	],
});

// Create enhanced styles
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		padding: 40,
		fontFamily: "Open Sans",
	},
	header: {
		marginBottom: 30,
		position: "relative",
	},
	companyHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	logoContainer: {
		width: 100,
		height: 100,
		backgroundColor: "#3f51b5",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	logoText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	companyInfo: {
		flex: 1,
		paddingLeft: 20,
	},
	companyName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#3f51b5",
		marginBottom: 5,
	},
	companyAddress: {
		fontSize: 10,
		color: "#666",
		lineHeight: 1.4,
	},
	titleContainer: {
		backgroundColor: "#3f51b5",
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 4,
		marginBottom: 15,
	},
	title: {
		fontSize: 16,
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	documentInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		paddingBottom: 10,
		borderBottom: "1px solid #e0e0e0",
	},
	infoBox: {
		width: "48%",
	},
	infoLabel: {
		fontSize: 10,
		color: "#666",
		marginBottom: 3,
	},
	infoValue: {
		fontSize: 12,
		fontWeight: "bold",
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#3f51b5",
		marginBottom: 8,
		borderBottom: "1px solid #3f51b5",
		paddingBottom: 3,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
		paddingHorizontal: 5,
	},
	label: {
		fontWeight: "bold",
		width: "30%",
		fontSize: 10,
		color: "#555",
	},
	value: {
		width: "65%",
		fontSize: 10,
	},
	table: {
		display: "table",
		width: "auto",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#e0e0e0",
		borderRightWidth: 0,
		borderBottomWidth: 0,
		marginTop: 10,
		fontSize: 9,
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: "#3f51b5",
	},
	tableRow: {
		flexDirection: "row",
	},
	tableCol: {
		width: "20%",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#e0e0e0",
		borderLeftWidth: 0,
		borderTopWidth: 0,
		paddingVertical: 5,
	},
	tableColWide: {
		width: "60%",
	},
	tableColNarrow: {
		width: "15%",
	},
	tableCell: {
		margin: 5,
		fontSize: 9,
		color: "#333",
	},
	headerCell: {
		margin: 5,
		fontSize: 9,
		color: "white",
		fontWeight: "bold",
	},
	footer: {
		paddingTop: 15,
		borderTop: "1px solid #3f51b5",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	signatureBox: {
		width: "45%",
		alignItems: "center",
	},
	signatureLine: {
		width: "80%",
		height: 1,
		backgroundColor: "#333",
		marginTop: 40,
		marginBottom: 5,
	},
	signatureText: {
		fontSize: 10,
		fontWeight: "bold",
	},
	notes: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#f5f5f5",
		borderRadius: 4,
		borderLeft: "4px solid #3f51b5",
	},
	notesTitle: {
		fontSize: 10,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#3f51b5",
	},
	notesContent: {
		fontSize: 9,
		lineHeight: 1.4,
	},
	logo: {
		width: 100,
		height: 100,
		borderRadius: 8,
	},
});

const DeliveryLetter = ({ deliveryData, order, companyData }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			{/* Company Header */}
			<View style={styles.companyHeader}>
				{companyData?.logo && (
					<Image
						src={`http://localhost:8012/${companyData.logo}`}
						style={styles.logo}
					/>
				)}
				<View style={styles.companyInfo}>
					<Text style={styles.companyName}>{companyData?.nama_perusahaan}</Text>
					<Text style={styles.companyAddress}>
						{companyData?.alamat}
						{"\n"}
						Telp: {companyData?.telepon} | Email: {companyData?.email}
					</Text>
				</View>
			</View>

			{/* Document Title */}
			<View style={styles.titleContainer}>
				<Text style={styles.title}>SURAT JALAN PENGIRIMAN BARANG</Text>
			</View>

			{/* Document Info */}
			<View style={styles.documentInfo}>
				<View style={styles.infoBox}>
					<Text style={styles.infoLabel}>No. Surat Jalan</Text>
					<Text style={styles.infoValue}>
						{deliveryData.dokumen_pengiriman.nomor_dokumen}
					</Text>
				</View>
				<View style={styles.infoBox}>
					<Text style={styles.infoLabel}>No. Order</Text>
					<Text style={styles.infoValue}>ORD-{order.id}</Text>
				</View>
				<View style={styles.infoBox}>
					<Text style={styles.infoLabel}>Customer</Text>
					<Text style={styles.infoValue}>{order.customer.nama}</Text>
				</View>
			</View>

			{/* Delivery Information */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>INFORMASI PENGIRIMAN</Text>

				<View style={styles.row}>
					<Text style={styles.label}>Driver</Text>
					<Text style={styles.value}>
						{deliveryData.driver.nama} ({deliveryData.driver.telepon})
					</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Kendaraan</Text>
					<Text style={styles.value}>
						{deliveryData.kendaraan.nama} | {deliveryData.kendaraan.plat_nomor}
					</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Alamat Tujuan</Text>
					<Text style={styles.value}>
						{order.customer.alamat} | {order.customer.kota},{" "}
						{order.customer.provinsi}
					</Text>
				</View>
			</View>

			{/* Order Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>DETAIL PESANAN</Text>

				<View style={styles.table}>
					{/* Table Header */}
					<View style={styles.tableHeader}>
						<View style={[styles.tableCol, styles.tableColWide]}>
							<Text style={styles.headerCell}>Nama Barang</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.headerCell}>Jumlah</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.headerCell}>Berat (kg)</Text>
						</View>
					</View>

					{/* Table Rows */}
					{order.order_detail.map((item, idx) => (
						<View style={styles.tableRow} key={idx}>
							<View style={[styles.tableCol, styles.tableColWide]}>
								<Text style={styles.tableCell}>{item.produk.nama}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>{item.jumlah}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{(item.produk.berat * item.jumlah).toLocaleString("id-ID")}
								</Text>
							</View>
						</View>
					))}
				</View>
			</View>

			{/* Footer with Signatures */}
			<View style={styles.footer}>
				<View style={styles.signatureBox}>
					<Text style={styles.signatureText}>DRIVER,</Text>
					<View style={styles.signatureLine} />
				</View>

				<View style={styles.signatureBox}>
					<Text style={styles.signatureText}>PENERIMA,</Text>
					<View style={styles.signatureLine} />
				</View>

				<View style={styles.signatureBox}>
					<Text style={styles.signatureText}>HORMAT KAMI,</Text>
					<View style={styles.signatureLine} />
				</View>
			</View>
		</Page>
	</Document>
);

export default DeliveryLetter;
