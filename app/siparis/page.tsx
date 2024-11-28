"use client"
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";
import { SiparisHeader } from "@/components/siparis-header";
import { OrderItem } from "@/interfaces/Order";
import { SiparisDetayModal } from "@/components/siparis-detay-modal";
import axios from "axios";

interface Order {
  orderId: number;
  orderRemoteID: string;
  orderFirmaID: number;
  orderStatus: string;
  orderDateTime: string;
  orderJson: OrderItem; // orderJson'ı nesne olarak tutuyoruz
}

function SiparisPage() {
  const searchParams = useSearchParams();
  const orderStatus = searchParams.get("orderStatus");
  const firmaId = searchParams.get("firmaId");

  const [orderData, setOrderData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firmaId) return;

    const fetchOrderData = async () => {
      setLoading(true);
      try {
        let url = `${process.env.BACKEND_API_URL}/api/siparis?firmaId=${firmaId}`;  // API URL'i ortam değişkeninden alınır
        if (orderStatus) url += `&orderStatus=${orderStatus}`;

        const response = await axios.get(url, { timeout: 10000 });

        if (response.status === 200) {
          const ordersWithParsedJson = response.data.map((order: any) => ({
            ...order,
            orderJson: JSON.parse(order.orderJson), // JSON.parse ile string'i nesneye çeviriyoruz
          }));
          console.log(ordersWithParsedJson);
          
          setOrderData(ordersWithParsedJson);
        } else {
          throw new Error("Sunucu hatası");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [firmaId, orderStatus]);

  if (error) {
    return (
      <div className="error-message bg-red-100 text-red-800 p-4 rounded">
        <p>Hata: {error}</p>
        <p>Lütfen daha sonra tekrar deneyiniz.</p>
      </div>
    );
  }

  return (
    <div className="relative sm:max-w-2xl mx-auto mt-10 space-y-10 p-4">
      <SiparisHeader firmaId={firmaId} orderStatus={orderStatus} />

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul className="space-y-4 text-sm">
          {orderData.length > 0 ? (
            orderData.map((order, index) => (
              <OrderItemComponent key={order.orderId} order={order} />
            ))
          ) : (
            <p>Veri bulunamadı.</p>
          )}
        </ul>
      )}
    </div>
  );
}

interface OrderItemProps {
  order: Order;
}

const OrderItemComponent: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <li
      className="border flex items-center p-3 rounded-2xl justify-between relative shadow"
    >
      <div>
        <div>
          <strong>Müşteri Adı:</strong>{" "}
          {order.orderJson.customer?.firstName || "Belirtilmemiş"}
        </div>
        <div>
          <strong>Telefon:</strong>{" "}
          {order.orderJson.customer?.mobilePhone || "Belirtilmemiş"}
        </div>
        <div>
          <strong>Siparişler:</strong>
          <ul className="list-disc pl-5">
            {order.orderJson.products?.length > 0 ? (
              order.orderJson.products.map((product, index) => (
                <li key={product.id + index}>{product.name}</li>
              ))
            ) : (
              <li>Ürün bulunamadı.</li>
            )}
          </ul>
          <div>
            <span className="font-bold">Toplam Net:</span>{" "}
            {order.orderJson.price?.totalNet}
          </div>
        </div>
      </div>

      <div>
        <SiparisDetayModal orderItem={order.orderJson} />
      </div>

      <div
        className={classNames(
          "absolute top-1 right-1 px-2 p-1 text-xs rounded-xl",
          order.orderStatus === "ONAY" && "bg-blue-700 text-white text-center font-medium",
          order.orderStatus === "TESLIM" && "bg-green-700 text-white text-center font-medium",
          order.orderStatus === "BEKLIYOR" && "bg-gray-600 text-white text-center font-medium",
          order.orderStatus === "IPTAL" && "bg-red-700 text-white text-center font-medium"
        )}
      >
        {order.orderStatus.charAt(0).toUpperCase() +
          order.orderStatus.slice(1).toLowerCase()}
      </div>
    </li>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SiparisPage />
    </Suspense>
  );
}
