import { formatUangIDR } from "@/lib/formatUang";
import React from "react";

const DetailTotal = ({ getCartTotal }) => {
	const subtotal = getCartTotal();
	const discount = 0;
	const taxRate = 0.11;
	const taxAmount = subtotal * taxRate;
	const total = subtotal - discount + taxAmount;

	return (
		<div className="flex flex-col gap-2 mt-4">
			<div className="flex justify-between items-center">
				<h1 className="text-sm text-slate-500">Subtotal</h1>
				<p className="text-sm font-semibold">{formatUangIDR(subtotal)}</p>
			</div>
			<div className="flex justify-between items-center">
				<h1 className="text-sm text-slate-500">Diskon</h1>
				<p className="text-sm font-semibold">{formatUangIDR(discount)}</p>
			</div>
			<div className="flex justify-between items-center">
				<h1 className="text-sm text-slate-500">Pajak (11%)</h1>
				<p className="text-sm font-semibold">{formatUangIDR(taxAmount)}</p>
			</div>
			<div className="flex justify-between items-center border-t pt-3 mt-2">
				<h1 className="text-lg font-bold">Total</h1>
				<p className="text-lg font-bold">{formatUangIDR(total)}</p>
			</div>
		</div>
	);
};

export default DetailTotal;
