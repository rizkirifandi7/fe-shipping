import { cookies } from "next/headers";
import React from "react";
import MainPageAdmin from "./components/home-admin";
import MainPageDriver from "./components/home-driver";

const PageHome = async () => {
	const userRole = (await cookies()).get("userRole")?.value;

	return (
		<div>
			{userRole === "admin" || "manager" ? (
				<MainPageAdmin />
			) : (
				<MainPageDriver />
			)}
		</div>
	);
};

export default PageHome;
