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

export function LoginForm({ className, ...props }) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(loginAction, {
		success: false,
		error: null,
		role: null,
	});

	useEffect(() => {
		if (state?.success) {
			toast.success("Login berhasil");
			if (state.role === "admin") {
				router.push("/dashboard/admin");
			} else {
				router.push("/dashboard");
			}
		} else if (state?.error) {
			toast.error(state.error);
		}
	}, [state, router]);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					{state?.error && (
						<div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800">
							{state.error}
						</div>
					)}
					<form action={formAction}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									aria-invalid={!!state?.fieldErrors?.email}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									placeholder="********"
									aria-invalid={!!state?.fieldErrors?.password}
								/>
							</div>
							<Button type="submit" className="w-full" disabled={isPending}>
								{isPending ? "Loading..." : "Login"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
