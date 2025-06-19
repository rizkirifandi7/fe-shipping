import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatUangIDR } from "@/lib/formatUang";

const ListItem = ({ data, removeItemFromCart }) => {
	return (
		<div className="space-y-3">
			{data.map((item) => (
				<Card key={item.id} className="p-3">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="font-medium">{item.nama}</h1>
							<p className="text-xs text-muted-foreground">{item.kategori}</p>
							<div className="flex items-center gap-2 mt-1">
								<p className="text-sm font-bold">{formatUangIDR(item.harga)}</p>
								<span className="text-sm">× {item.quantity}</span>
							</div>
						</div>
						<div className="flex flex-col items-end gap-y-4">
							<Button
								variant="ghost"
								size="sm"
								className="h-8 w-8 p-0 text-destructive hover:text-destructive"
								onClick={() => removeItemFromCart(item)}
							>
								<FiTrash2 className="h-4 w-4" />
							</Button>
							<p className="text-sm font-bold ml-auto">
								{formatUangIDR(item.harga * item.quantity)}
							</p>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
};

export default ListItem;
