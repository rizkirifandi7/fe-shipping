"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check, ChevronsUpDown, PlusIcon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Textarea } from '@/components/ui/textarea';

// Data dummy kendaraan dan driver
const dummyKendaraan = [
  { id: 1, plat_nomor: 'B 1234 ABC', jenis: 'Pickup' },
  { id: 2, plat_nomor: 'B 5678 DEF', jenis: 'Truk Box' },
  { id: 3, plat_nomor: 'B 9012 GHI', jenis: 'L300' },
];

const dummyDriver = [
  { id: 1, nama: 'Budi Santoso', telepon: '08123456789' },
  { id: 2, nama: 'Ani Wijaya', telepon: '08234567890' },
  { id: 3, nama: 'Joko Susilo', telepon: '08345678901' },
];

export function TambahJadwal({ open, onOpenChange, orders }) {
  const [formData, setFormData] = useState({
    id_order: '',
    id_kendaraan: '',
    id_driver: '',
    tgl_pengiriman: new Date(),
    perkiraan_sampai: new Date(new Date().setHours(new Date().getHours() + 2)),
    catatan: '',
    status: 'scheduled'
  });

  const [openOrderDropdown, setOpenOrderDropdown] = useState(false);
  const [openKendaraanDropdown, setOpenKendaraanDropdown] = useState(false);
  const [openDriverDropdown, setOpenDriverDropdown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data yang dikirim:', formData);
    // Di sini Anda bisa menambahkan logika untuk mengirim data ke API
    onOpenChange(false);
  };

  const getOrderLabel = (id) => {
    const order = orders.find(o => o.id === parseInt(id));
    return order 
      ? `Order #${order.id} - ${order.customer.nama} (${format(new Date(order.tanggal_order), 'dd/MM/yyyy')})` 
      : "Pilih Order";
  };

  const getKendaraanLabel = (id) => {
    const kendaraan = dummyKendaraan.find(k => k.id === parseInt(id));
    return kendaraan ? `${kendaraan.plat_nomor} (${kendaraan.jenis})` : "Pilih Kendaraan";
  };

  const getDriverLabel = (id) => {
    const driver = dummyDriver.find(d => d.id === parseInt(id));
    return driver ? `${driver.nama} (${driver.telepon})` : "Pilih Driver";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tambah Jadwal Pengiriman</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pilih Order */}
          <div className="grid gap-2">
            <Label htmlFor="id_order">Order</Label>
            <Popover open={openOrderDropdown} onOpenChange={setOpenOrderDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openOrderDropdown}
                  className="w-full justify-between"
                >
                  {formData.id_order ? getOrderLabel(formData.id_order) : "Pilih Order"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Cari order..." />
                  <CommandEmpty>Order tidak ditemukan</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-y-auto">
                    {orders.map((order) => (
                      <CommandItem
                        key={order.id}
                        value={order.id.toString()}
                        onSelect={() => {
                          setFormData({...formData, id_order: order.id.toString()});
                          setOpenOrderDropdown(false);
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            formData.id_order === order.id.toString() ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {`Order #${order.id} - ${order.customer.nama} (${format(new Date(order.tanggal_order), 'dd/MM/yyyy')})`}
                        <span className="ml-auto font-medium">
                          {order.order_detail.length} item
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Info Order */}
          {formData.id_order && (
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Detail Order</h4>
              <div className="space-y-2">
                {orders.find(o => o.id === parseInt(formData.id_order)).order_detail.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.produk.nama} (x{item.jumlah})</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.harga)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                      orders.find(o => o.id === parseInt(formData.id_order)).total_harga
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* Pilih Kendaraan */}
            <div className="space-y-2">
              <Label htmlFor="id_kendaraan">Kendaraan</Label>
              <Popover open={openKendaraanDropdown} onOpenChange={setOpenKendaraanDropdown}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openKendaraanDropdown}
                    className="w-full justify-between"
                  >
                    {formData.id_kendaraan ? getKendaraanLabel(formData.id_kendaraan) : "Pilih Kendaraan"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Cari kendaraan..." />
                    <CommandEmpty>Kendaraan tidak ditemukan</CommandEmpty>
                    <CommandGroup>
                      {dummyKendaraan.map((kendaraan) => (
                        <CommandItem
                          key={kendaraan.id}
                          value={kendaraan.id.toString()}
                          onSelect={() => {
                            setFormData({...formData, id_kendaraan: kendaraan.id.toString()});
                            setOpenKendaraanDropdown(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              formData.id_kendaraan === kendaraan.id.toString() ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {`${kendaraan.plat_nomor} (${kendaraan.jenis})`}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Pilih Driver */}
            <div className="space-y-2">
              <Label htmlFor="id_driver">Driver</Label>
              <Popover open={openDriverDropdown} onOpenChange={setOpenDriverDropdown}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openDriverDropdown}
                    className="w-full justify-between"
                  >
                    {formData.id_driver ? getDriverLabel(formData.id_driver) : "Pilih Driver"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Cari driver..." />
                    <CommandEmpty>Driver tidak ditemukan</CommandEmpty>
                    <CommandGroup>
                      {dummyDriver.map((driver) => (
                        <CommandItem
                          key={driver.id}
                          value={driver.id.toString()}
                          onSelect={() => {
                            setFormData({...formData, id_driver: driver.id.toString()});
                            setOpenDriverDropdown(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              formData.id_driver === driver.id.toString() ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {`${driver.nama} (${driver.telepon})`}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tanggal Pengiriman */}
            <div className="space-y-2">
              <Label>Tanggal Pengiriman</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.tgl_pengiriman, 'PPP', { locale: id })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.tgl_pengiriman}
                    onSelect={(date) => setFormData({...formData, tgl_pengiriman: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Perkiraan Sampai */}
            <div className="space-y-2">
              <Label>Perkiraan Sampai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.perkiraan_sampai, 'PPP', { locale: id })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.perkiraan_sampai}
                    onSelect={(date) => setFormData({...formData, perkiraan_sampai: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Catatan */}
          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan</Label>
            <Textarea
              id="catatan"
              value={formData.catatan}
              onChange={(e) => setFormData({...formData, catatan: e.target.value})}
              placeholder="Tambahkan catatan pengiriman..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={!formData.id_order || !formData.id_kendaraan || !formData.id_driver}>
              Simpan Jadwal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
  