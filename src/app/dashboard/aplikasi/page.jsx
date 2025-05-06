"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

const PageAplikasi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLogo, setCurrentLogo] = useState("");
  const [previewLogo, setPreviewLogo] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const logoFile = watch("logo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8012/aplikasi");
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const appData = data.data[0];
          reset({
            nama_perusahaan: appData.nama_perusahaan,
            alamat: appData.alamat,
            telepon: appData.telepon,
            email: appData.email,
          });
          
          // Clean the logo path by removing 'uploads\' or 'uploads/'
          const cleanLogoPath = appData.logo?.replace(/^uploads[\\/]/, '');
          setCurrentLogo(cleanLogoPath ? `http://localhost:8012/aplikasi/logo/${cleanLogoPath}` : "");
        }
      } catch (error) {
        toast.error("Gagal memuat data perusahaan");
      }
    };

    fetchData();
  }, [reset]);

  useEffect(() => {
    if (logoFile && logoFile.length > 0) {
      const file = logoFile[0];
      setPreviewLogo(URL.createObjectURL(file));
    }
  }, [logoFile]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama_perusahaan", data.nama_perusahaan);
      formData.append("alamat", data.alamat);
      formData.append("telepon", data.telepon);
      formData.append("email", data.email);

      if (data.logo && data.logo.length > 0) {
        formData.append("logo", data.logo[0]);
      }

      const response = await fetch("http://localhost:8012/aplikasi/1", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Pengaturan perusahaan berhasil diperbarui");
        
        // Update the logo preview if a new one was uploaded
        if (data.logo && data.logo.length > 0) {
          const file = data.logo[0];
          setPreviewLogo(URL.createObjectURL(file));
          // Clear current logo since we're using the preview now
          setCurrentLogo("");
        }
        
        // Refetch data to get updated logo path if changed
        const refetch = await fetch("http://localhost:8012/aplikasi");
        const newData = await refetch.json();
        if (newData.data && newData.data.length > 0) {
          const cleanLogoPath = newData.data[0].logo?.replace(/^uploads[\\/]/, '');
          setCurrentLogo(cleanLogoPath ? `http://localhost:8012/aplikasi/logo/${cleanLogoPath}` : "");
        }
      } else {
        throw new Error("Update gagal");
      }
    } catch (error) {
      toast.error("Gagal memperbarui pengaturan perusahaan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Setting Detail Perusahaan</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Perusahaan</CardTitle>
          <CardDescription>
            Update detail informasi perusahaan Anda di sini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div className="space-y-4">
                <Label htmlFor="logo">Logo Perusahaan</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                    {(previewLogo || currentLogo) ? (
                      <Image
                        src={previewLogo || currentLogo}
                        alt="Logo Perusahaan"
                        fill
                        className="object-cover"
                        onError={() => setCurrentLogo("")} // Fallback if image fails to load
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Logo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      {...register("logo")}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Ukuran disarankan: 200x200px
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="nama_perusahaan">Nama Perusahaan</Label>
                <Input
                  id="nama_perusahaan"
                  placeholder="Masukkan nama perusahaan"
                  {...register("nama_perusahaan", {
                    required: "Nama perusahaan wajib diisi",
                  })}
                />
                {errors.nama_perusahaan && (
                  <p className="text-sm text-red-500">
                    {errors.nama_perusahaan.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Textarea
                  id="alamat"
                  placeholder="Masukkan alamat perusahaan"
                  {...register("alamat", { required: "Alamat wajib diisi" })}
                />
                {errors.alamat && (
                  <p className="text-sm text-red-500">
                    {errors.alamat.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="telepon">Nomor Telepon</Label>
                <Input
                  id="telepon"
                  placeholder="Masukkan nomor telepon"
                  {...register("telepon", {
                    required: "Nomor telepon wajib diisi",
                  })}
                />
                {errors.telepon && (
                  <p className="text-sm text-red-500">
                    {errors.telepon.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan alamat email"
                  {...register("email", {
                    required: "Email wajib diisi",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Format email tidak valid",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageAplikasi;