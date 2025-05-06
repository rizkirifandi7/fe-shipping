// Di fungsi formatDateIndonesian
export const formatDateIndonesian = (dateString) => {
  if (!dateString) return "-";
  
  // Handle case where dateString is already a Date object
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  if (isNaN(date.getTime())) return "-";

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: 'Asia/Jakarta' // Tambahkan timezone khusus
  };
  
  try {
    const formattedDate = date.toLocaleDateString("id-ID", options);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  } catch (e) {
    return "-";
  }
};

export const formatDateIndonesianShort = (dateString) => {
	if (!dateString) return "-";

	const date = new Date(dateString);
	const options = {
		day: "numeric",
		month: "2-digit",
		year: "2-digit",
	};
	const formattedDate = date.toLocaleDateString("id-ID", options);

	return formattedDate;
};

export const formatDateIndonesianTime = (dateString) => {
	if (!dateString) return "-";

	const date = new Date(dateString);
	const options = {
		day: "numeric",
		month: "2-digit",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};
	const formattedDate = date.toLocaleDateString("id-ID", options);

	return formattedDate;
};

// ...existing code...

export const formatDateShortMonth = (dateString) => {
	if (!dateString) return "-";

	const date = new Date(dateString);

	// Get day with leading zero if needed
	const day = date.getDate().toString().padStart(2, "0");

	// Get month in Indonesian short form
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agt",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	];
	const month = months[date.getMonth()];

	// Get full year
	const year = date.getFullYear();

	// Format as "DD-MMM-YYYY"
	return `${day}-${month}-${year}`;
};

export function getDayName(date) {
	const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
	return days[date.getDay()];
}
