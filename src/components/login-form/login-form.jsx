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
			if (state.role === "admin") {
				router.push("/dashboard/home");
			} else if (state.role === "driver") {
				router.push("/dashboard/home");
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
								src="/logobrand.png" // Replace with your logo path
								alt="Company Logo"
								width={80}
								height={80}
								className="object-contain"
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
							<div className="grid gap-2">
								<Label htmlFor="email" className="text-gray-700">
									Email
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="your@email.com"
									aria-invalid={!!state?.fieldErrors?.email}
									className="py-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="password" className="text-gray-700">
									Password
								</Label>
								<Input
									id="password"
									name="password"
									type="password"
									placeholder="••••••••"
									aria-invalid={!!state?.fieldErrors?.password}
									className="py-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<Button
								type="submit"
								className="w-full py-4 text-base font-medium"
								disabled={isPending}
							>
								{isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Signing in...
									</>
								) : (
									"Sign In"
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
