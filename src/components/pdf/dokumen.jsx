"use client";
import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const Dokumen = () => {
	return (
		<Document>
			<Page size="A4">
				<View>
					<Text>Hallo</Text>
				</View>
			</Page>
		</Document>
	);
};

export default Dokumen;
