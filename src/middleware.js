// middleware.ts
import { NextResponse } from "next/server";

export async function middleware(request) {
	const token = request.cookies.get("token")?.value;
	const userRole = request.cookies.get("userRole")?.value;
	const { pathname } = request.nextUrl;

	// Daftar route yang diproteksi
	const protectedRoutes = [
		"/dashboard",
		"/dashboard/(.*)", // semua subroute dashboard
	];

	// Daftar route admin-only
	const adminRoutes = [
		"/dashboard/pesanan",
		"/dashboard/admin",
		"/dashboard/customer",
		"/dashboard/driver",
		"/dashboard/kendaraan",
		"/dashboard/produk",
		"/dashboard/aplikasi",
		"/dashboard/jadwal",
		"/dashboard/jadwal-driver",
	];

	// Cek jika route termasuk yang diproteksi
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.match(new RegExp(`^${route}$`.replace("*", ".*")))
	);

	if (isProtectedRoute) {
		// Jika tidak ada token, redirect ke login
		if (!token) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		// Jika mencoba akses route admin tapi bukan admin
		const isAdminRoute = adminRoutes.some((route) =>
			pathname.startsWith(route)
		);
		if (isAdminRoute && userRole !== "admin") {
			return NextResponse.redirect(new URL("/unauthorized", request.url));
		}
	}

	return NextResponse.next();
}

// Konfigurasi matcher untuk middleware
export const config = {
	matcher: [
		"/dashboard/:path*",
		"/((?!_next/static|_next/image|favicon.ico|images|login|unauthorized).*)",
	],
};
