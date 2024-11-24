import classNames from "classnames";
import Link from "next/link";

type SiparisHeaderProps = {
    orderStatus?:string | null;
    firmaId?:string | null
}

export const SiparisHeader = ({orderStatus,firmaId}:SiparisHeaderProps)=>{

  return  <div className="space-y-5 sticky top-0 bg-white z-10">
        <h1 className="text-3xl font-bold">Siparişler</h1>
        <div className="flex text-xs text-white justify-center items-center h-12">
          <Link
            href={`/siparis?firmaId=${firmaId}`}
            className={classNames(
              orderStatus === null && " text-sm font-semibold",
              "p-1  bg-gray-800 flex-1 text-center text-balance", 
              "h-full flex justify-center items-center"
            )}
          >
            Tüm Siparişler
          </Link>
          <Link
            href={`/siparis?firmaId=${firmaId}&orderStatus=ONAY`}
            className={classNames(
              orderStatus === "ONAY" && "  text-sm font-semibold",
              "p-1  bg-blue-700 flex-1 text-balance",
              "h-full flex justify-center items-center"

            )}
          >
            Onay
          </Link>
          <Link
            href={`/siparis?firmaId=${firmaId}&orderStatus=TESLIM`}
            className={classNames(
              orderStatus === "TESLIM" && "text-sm font-semibold",
              "p-1 text-white bg-green-700 flex-1 text-balance",
                "h-full flex justify-center items-center"

            )}
          >
            Teslim
          </Link>
          <Link
            href={`/siparis?firmaId=${firmaId}&orderStatus=BEKLIYOR`}
            className={classNames(
              orderStatus === "BEKLIYOR" && "text-sm font-semibold",
              "p-1  bg-gray-600 flex-1 text-balance",
                 "h-full flex justify-center items-center"

            )}
          >
            Bekliyor
          </Link>
          <Link
            href={`/siparis?firmaId=${firmaId}&orderStatus=IPTAL`}
            className={classNames(
              orderStatus === "IPTAL" && "text-sm font-semibold",
              "p-1  bg-red-700 flex-1 text-balance",
               "h-full flex justify-center items-center"

            )}
          >
            İptal
          </Link>
        </div>
      </div>
}