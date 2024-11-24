"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type FormProps = {
  sifre: string;
  ceptel: string;
};

export default function Home() {
  const [form, setForm] = useState<FormProps>({ sifre: "", ceptel: "" });
  const [response, setResponse] = useState<any>(null); // API'den dönen veriyi tutar
  const [error, setError] = useState<string | null>(null); // Hataları tutar
  const router = useRouter();

  const onClickHandle = async () => {
    try {
      setError(null); // Hataları sıfırla
      const res = await fetch("http://localhost:3001/api/eleman/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // Form verisini gönder
      });

      if (!res.ok) {
        throw new Error("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
      }

      const data = await res.json(); // JSON formatındaki yanıtı al
      if (!data.firmaid) {
        throw new Error("firmaid bulunamadı! Lütfen API yanıtını kontrol edin.");
      }
      router.push(`/siparis?firmaId=${data.firmaid}`);
      

      console.log(data);
      
      setResponse(data); // Yanıtı state'e ata
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
    }
  };

  return (
<div className="flex justify-center pt-36 px-10">
<div className="max-w-sm w-full">
  <div >
    <h1 className="pb-10 text-center text-3xl font-bold"> Sipariş Takibi</h1>
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Telefon Numarası</label>
    <input    type="text"
        name="ceptel"
        value={form.ceptel}
        onChange={(e) => setForm({ ...form, ceptel: e.target.value })}
        placeholder="Cep Tel" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  required />
  </div>
  <div className="mb-5">
    <label  htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900">Şifre</label>
    <input  placeholder="Şifre"   name="sifre"
        value={form.sifre}
        onChange={(e) => setForm({ ...form, sifre: e.target.value })} type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
  </div>



  <button tabIndex={-1} onClick={onClickHandle} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-4 py-2.5 text-center">Register new account</button>

  {response && (
        <div className="mt-4 p-4 border bg-green-100">
          <h2 className="font-bold">Giriş Başarılı!</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border bg-red-100 text-red-700">
          <h2 className="font-bold">Hata!</h2>
          <p>{error}</p>
        </div>
      )}
</div>
</div>



  );
}
