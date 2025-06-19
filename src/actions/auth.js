"use server";

import { setCookie, removeCookie, getCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";

// actions/auth.js
export const loginAction = async (prevState, formData) => {
	try {
		const email = formData.get("email");
		const password = formData.get("password");

		if (!email || !password) {
			throw new Error("Email dan password harus diisi");
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Login failed");
		}

		await setCookie("token", data.data.token, {
			maxAge: 60 * 60 * 6,
			httpOnly: true,
			sameSite: "strict",
		});

		await setCookie("userRole", data.data.role, {
			maxAge: 60 * 60 * 6,
			httpOnly: true,
			sameSite: "strict",
		});

		return {
			success: true,
			role: data.data.role,
			error: null,
		};
	} catch (error) {
		return { success: false, error: error.message, role: null };
	}
};

export const logoutAction = async () => {
	try {
		// Hapus cookie token
		await removeCookie("token");

		// Redirect ke halaman login (client-side)
		if (typeof window !== "undefined") {
			window.location.href = "/login";
		}
	} catch (error) {
		console.error("Logout failed:", error);
		throw error;
	}
};
