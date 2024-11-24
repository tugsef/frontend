import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderItem } from "@/interfaces/Order";

type SiparisDetayProps = {
  orderItem: OrderItem;
};

export const SiparisDetayModal = ({ orderItem }: SiparisDetayProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Detay</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Ürün Detayı</DialogTitle>
 
        </DialogHeader>

        <div className="max-h-96 overflow-auto">
          <ul>
            <li>
              <div className="space-y-4">
                <div>
                  <label className="font-bold">Müşteri</label>
                  <div className="ps-2">
                    <span className="font-semibold text-sm">Adı: </span>{" "}
                    {orderItem.customer.firstName} {orderItem.customer.lastName}
                  </div>
                  
                  <div className="ps-2">
                    <span className="font-semibold text-sm">
                     Konum:
                    </span>{" "}
                    {orderItem.delivery.address.entrance}
                    {orderItem.delivery.address.line2}
                  </div>
                  <div className="ps-2">
                    <span className="font-semibold text-sm">
                      Telefon Numarası:{" "}
                    </span>{" "}
                    {orderItem.customer.mobilePhone}
                  </div>
                </div>
                <div className="space-y-2">
                  {" "}
                  <label className="font-bold">Siparişler</label>
                  {orderItem.products.map((product,index) => (
                    <div key={index} className="border p-2" >
                      <div className="text-sm">
                        <span className="font-semibold">Ürün Adı:</span>{" "}
                        {product.name}
                      </div>
                      <div className="text-sm">
                        <span className=" font-semibold">Miktar: </span>
                        {product.quantity} adet
                      </div>
                  
                      <div className="text-sm">
                        <span className=" font-semibold">Açıklama: </span>
                        {product.description} 
                      </div>
                      <div className="text-sm">
                        <span className=" font-semibold">İndirim: </span>
                        {product.discountAmount} 
                      </div>
                      <div className="text-sm">
                        <span className=" font-semibold">Birim Fiyat: </span>
                        {product.unitPrice} ₺
                      </div>
                      <div className="text-sm">
                        <span className=" font-semibold">Ürün Toplam: </span>
                        {product.paidPrice} ₺
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 w-full">
                <div><span className=" font-bold">Açıklamalar </span>{orderItem.comments.customerComment}  ₺</div>
                </div>
                
                <div className="space-y-2 w-full">
                <div className="text-end"><span className=" font-bold">Genel Toplam: </span>{orderItem.price.totalNet}  ₺</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
