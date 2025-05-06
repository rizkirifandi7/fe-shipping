export const getCompanyLogo = async (filename) => {
	try {
		const response = await fetch(
			`http://localhost:8012/aplikasi/logo/${filename}`
		);
		if (!response.ok) throw new Error("Failed to fetch logo");
		return response.url; // Return the full image URL
	} catch (error) {
		console.error("Error fetching logo:", error);
		return null;
	}
};

export const updateCompanyData = async (id, data) => {
	const formData = new FormData();

	// Append all fields except logo
	Object.keys(data).forEach((key) => {
		if (key !== "logo" && data[key] !== undefined) {
			formData.append(key, data[key]);
		}
	});

	// Append logo file if exists
	if (data.logo instanceof File) {
		formData.append("logo", data.logo);
	}

	const response = await fetch(`http://localhost:8012/aplikasi/${id}`, {
		method: "PUT",
		body: formData,
	});

	if (!response.ok) throw new Error("Failed to update company data");
	return await response.json();
};
