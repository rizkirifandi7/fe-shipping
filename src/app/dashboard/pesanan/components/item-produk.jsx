import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatUangIDR } from "@/lib/formatUang";
import React from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

const ItemProduk = ({ data, cartProduk, removeFromCart, addToCart }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{data.map((item) => {
				const cartItem = cartProduk.find((cart) => cart.id === item.id);
				const quantity = cartItem?.quantity || 0;

				return (
					<Card
						className={`p-3 transition-all ${
							quantity > 0 ? "ring-2 ring-orange-500" : ""
						}`}
						key={item.id}
					>
						<div className="flex justify-between items-start gap-3">
							<div className="space-y-1 flex-1">
								<h1 className="font-medium line-clamp-1">{item.nama}</h1>
								<p className="text-xs text-muted-foreground">{item.kategori}</p>
								<p className="font-bold text-sm">{formatUangIDR(item.harga)}</p>
							</div>
							<div className="flex items-center gap-2">
								{quantity > 0 && (
									<>
										<Button
											size="sm"
											variant="outline"
											className="h-8 w-8 p-0"
											onClick={() => removeFromCart(item)}
										>
											<LuMinus className="h-4 w-4" />
										</Button>
										<span className="text-sm w-6 text-center">{quantity}</span>
									</>
								)}
								<Button
									size="sm"
									variant="outline"
									className="h-8 w-8 p-0"
									onClick={() => addToCart(item)}
								>
									<LuPlus className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</Card>
				);
			})}
		</div>
	);
};

export default ItemProduk;
