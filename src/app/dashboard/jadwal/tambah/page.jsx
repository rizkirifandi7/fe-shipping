"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  User,
  ClipboardList,
  Truck,
  Package,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Loader2,
  Check,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function TambahJadwalPage() {
  const router = useRouter();
  const [drivers, setDrivers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    id_driver: "",
    tgl_pengiriman: "",
    perkiraan_sampai: "",
    catatan: "",
    id_orders: [],
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  // Memoize selected orders to prevent unnecessary re-renders
  const selectedOrders = useCallback(() => {
    return orders.filter(order => form.id_orders.includes(order.id));
  }, [form.id_orders, orders]);

  // Fetch data functions
  const fetchDrivers = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`);
      const data = await res.json();
      setDrivers(data.data.filter(u => u.role === "driver"));
    } catch (error) {
      setErr("Gagal memuat data driver");
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`);
      const data = await res.json();
      setOrders(data.data.filter(o => o.status === "pending"));
    } catch (error) {
      setErr("Gagal memuat data order");
    }
  }, []);

  useEffect(() => {
    fetchDrivers();
    fetchOrders();
  }, [fetchDrivers, fetchOrders]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDriverSelect = (value) => {
    setForm(prev => ({ ...prev, id_driver: value }));
  };

  const toggleOrderSelection = (orderId) => {
    setForm(prev => {
      const newOrders = prev.id_orders.includes(orderId)
        ? prev.id_orders.filter(id => id !== orderId)
        : [...prev.id_orders, orderId];
      return { ...prev, id_orders: newOrders };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setSuccess(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/jadwal-pengiriman/optimasi`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal menambah jadwal");
      }

      setSuccess("Jadwal pengiriman berhasil ditambahkan!");
      toast.success("Jadwal pengiriman berhasil ditambahkan!");
      setTimeout(() => router.push("/dashboard/jadwal"), 1200);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/jadwal")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              Buat Jadwal Pengiriman Baru
            </h1>
            <p className="text-sm text-muted-foreground">
              Tambah jadwal pengiriman baru dengan mengisi form berikut
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Section */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Form Jadwal Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form id="jadwalForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Driver Information */}
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-2 p-4 pb-2">
                      <User className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Informasi Driver</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2">
                        <Label>Pilih Driver</Label>
                        <Select
                          onValueChange={handleDriverSelect}
                          value={form.id_driver}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Driver" />
                          </SelectTrigger>
                          <SelectContent>
                            {drivers.map((driver) => (
                              <SelectItem key={driver.id} value={driver.id.toString()}>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{driver.nama}</span>
                                  <Badge variant="secondary">{driver.telepon}</Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Delivery Time Information */}
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-2 p-4 pb-2">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Informasi Waktu</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tanggal Pengiriman</Label>
                          <Input
                            type="date"
                            name="tgl_pengiriman"
                            value={form.tgl_pengiriman}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Perkiraan Sampai</Label>
                          <Input
                            type="date"
                            name="perkiraan_sampai"
                            value={form.perkiraan_sampai}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Selection */}
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-2 p-4 pb-2">
                      <Package className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Pilih Order</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2">
                        <Label>Order (Status: Pending)</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {form.id_orders.length > 0
                                ? `${form.id_orders.length} order terpilih`
                                : "Pilih order..."}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Cari order..." />
                              <CommandList>
                                <CommandEmpty>Tidak ada order pending</CommandEmpty>
                                <CommandGroup>
                                  {orders.map((order) => (
                                    <CommandItem
                                      key={order.id}
                                      value={order.id}
                                      onSelect={() => toggleOrderSelection(order.id)}
                                    >
                                      <div className="flex items-center gap-2 w-full">
                                        <Check
                                          className={`h-4 w-4 ${
                                            form.id_orders.includes(order.id)
                                              ? "opacity-100"
                                              : "opacity-0"
                                          }`}
                                        />
                                        <div className="flex-1">
                                          <div className="flex justify-between">
                                            <span>Order #{order.id}</span>
                                            <Badge variant="outline">
                                              {order.order_detail.length} item
                                            </Badge>
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            {order.customer?.nama} - {order.customer?.kota}
                                          </div>
                                        </div>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label>Catatan</Label>
                    <Textarea
                      name="catatan"
                      value={form.catatan}
                      onChange={handleChange}
                      placeholder="Catatan tambahan (opsional)"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/jadwal")}
              >
                Batal
              </Button>
              <Button
                type="submit"
                form="jadwalForm"
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Simpan Jadwal
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Selected Orders Sidebar */}
          <div className="col-span-1 space-y-4">
            {err && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{err}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Berhasil</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-primary" />
                  Order Terpilih
                  <Badge variant="secondary">{form.id_orders.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Daftar order yang akan dikirim dalam jadwal ini
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {selectedOrders().length > 0 ? (
                  <div className="space-y-3">
                    {selectedOrders().map((order) => (
                      <Card key={order.id} className="p-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline">Order #{order.id}</Badge>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="cursor-default">
                                {order.order_detail.length} item
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {order.order_detail
                                  .map((item) => item.produk.nama)
                                  .join(", ")}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="mt-2">
                          <h4 className="font-medium">{order.customer?.nama}</h4>
                          <p className="text-sm text-muted-foreground">
                            {order.customer?.alamat}, {order.customer?.kota}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Package className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Belum ada order yang dipilih
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}