"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function LoginForm({ className, ...props }) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(loginAction, {
		success: false,
		error: null,
		role: null,
	});

	useEffect(() => {
		if (state?.success) {
			toast.success("Login successful!");
			const roleRedirectMap = {
				admin: "/dashboard/home",
				manager: "/dashboard/home",
				driver: "/dashboard/home",
			};

			const redirectPath = roleRedirectMap[state.role];
			if (redirectPath) {
				router.push(redirectPath);
			} else {
				toast.error("Unrecognized role");
			}
		} else if (state?.error) {
			toast.error(state.error);
		}
	}, [state, router]);

	return (
		<div
			className={cn(
				"flex flex-col gap-6 max-w-md w-full mx-auto px-4",
				className
			)}
			{...props}
		>
			<Card className="shadow-md border rounded-xl">
				<CardHeader className="text-center space-y-1">
					{/* Logo Section */}
					<div className="flex justify-center mb-2">
						<div className="bg-white rounded-full p-4 shadow-md border">
							<Image
								src="/logobrand.png"
								alt="Company Logo"
								width={40}
								height={40}
								className="object-cover"
							/>
						</div>
					</div>
					<CardTitle className="text-2xl font-bold text-gray-800">
						Selamat Datang
					</CardTitle>
					<CardDescription className="text-gray-500">
						Masuk ke akun Anda untuk melanjutkan
					</CardDescription>
				</CardHeader>

				<CardContent>
					{state?.error && (
						<div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100">
							{state.error}
						</div>
					)}

					<form action={formAction}>
						<div className="flex flex-col gap-5">
							{["email", "password"].map((field) => (
								<div key={field} className="grid gap-2">
									<Label htmlFor={field} className="text-gray-700">
										{field.charAt(0).toUpperCase() + field.slice(1)}
									</Label>
									<Input
										id={field}
										name={field}
										type={field}
										placeholder={
											field === "email" ? "example@email.com" : "••••••••"
										}
										aria-invalid={!!state?.fieldErrors?.[field]}
										className="py-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							))}

							<Button
								type="submit"
								className="w-full py-4 text-sm font-medium"
								disabled={isPending}
							>
								{isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Signing in...
									</>
								) : (
									"Login"
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
