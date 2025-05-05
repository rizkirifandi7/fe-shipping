export const formatUangIDR = (value) => {
	if (value === null || value === undefined) {
		return "0";
	}

	const numberValue = Number(value);
	if (isNaN(numberValue)) {
		return "0";
	}

	const formattedValue = numberValue.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return formattedValue;
};
