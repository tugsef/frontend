export interface OrderItem {
    token: string;
    code: string;
    shortCode: string;
    preOrder: boolean;
    expiryDate: string;
    createdAt: string;
    localInfo: LocalInfo;
    platformRestaurant: PlatformRestaurant;
    customer: Customer;
    payment: Payment;
    expeditionType: string;
    products: Product[];
    corporateTaxId: string;
    comments: Comments;
    vouchers: unknown[]; // Eğer detay yoksa `unknown` bırakabilirsiniz
    discounts: Discount[];
    price: Price;
    webOrder: boolean;
    mobileOrder: boolean;
    corporateOrder: boolean;
    integrationInfo: unknown[]; // Detay belirtilmemişse
    test: boolean;
    delivery: Delivery;
    callbackUrls: CallbackUrls;
  }
  
  export interface LocalInfo {
    platform: string;
    platformKey: string;
    countryCode: string;
    currencySymbol: string;
    currencySymbolPosition: string;
    currencySymbolSpaces: string;
    decimalSeparator: string;
    decimalDigits: string;
    thousandsSeparator: string;
    website: string;
    email: string;
    phone: string;
  }
  
  export interface PlatformRestaurant {
    id: string;
  }
  
  export interface Customer {
    id: string;
    code: string;
    mobilePhone: string;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhoneCountryCode: string;
    flags: string[];
  }
  
  export interface Payment {
    type: string;
    remoteCode: string;
    status: string;
    requiredMoneyChange: string;
    vatName: string;
    vatId: string;
  }
  
  export interface Product {
    id: string;
    remoteCode: string;
    name: string;
    description: string;
    comment: string;
    categoryName: string | null;
    variation: Variation;
    unitPrice: string;
    paidPrice: string;
    discountAmount: string;
    quantity: string;
    halfHalf: boolean;
    vatPercentage: string;
    selectedChoices: unknown[];
    selectedToppings: SelectedTopping[];
    discounts: unknown[];
  }
  
  export interface Variation {
    name: string;
  }
  
  export interface SelectedTopping {
    id: string;
    remoteCode: string;
    name: string;
    quantity: number;
    children: SelectedToppingChild[];
    price: string;
    type: string;
    discounts: unknown[];
  }
  
  export interface SelectedToppingChild {
    id: string;
    remoteCode: string;
    name: string;
    quantity: number;
    children: unknown[];
    price: string;
    type: string;
    discounts: unknown[];
  }
  
  export interface Comments {
    customerComment: string;
    vendorComment: string;
  }
  
  export interface Discount {
    name: string;
    type: string;
    amount: string;
    sponsorships: Sponsorship[];
  }
  
  export interface Sponsorship {
    sponsor: string;
    amount: string;
  }
  
  export interface Price {
    minimumDeliveryValue: string;
    comission: string;
    deliveryFee: string;
    deliveryFees: unknown[];
    containerCharge: string;
    deliveryFeeDiscount: string;
    serviceFeePercent: string;
    serviceFeeTotal: string;
    serviceTax: number;
    serviceTaxValue: number;
    subTotal: string;
    totalNet: string;
    vatVisible: boolean;
    vatPercent: string;
    vatTotal: string;
    grandTotal: string;
    discountAmountTotal: string;
    differenceToMinimumDeliveryValue: string;
    payRestaurant: string;
    collectFromCustomer: string;
    riderTip: string;
  }
  
  export interface Delivery {
    expressDelivery: boolean;
    expectedDeliveryTime: string;
    riderPickupTime: string | null;
    address: Address;
  }
  
  export interface Address {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    street: string;
    number: string;
    room: string;
    flatNumber: string;
    building: string;
    intercom: string;
    entrance: string;
    structure: string;
    floor: string;
    district: string;
    other: string;
    city: string;
    postcode: string;
    company: string;
    deliveryMainArea: string;
    deliveryMainAreaPostcode: string;
    deliveryArea: string;
    deliveryAreaPostcode: string;
    deliveryInstructions: string;
    latitude: number;
    longitude: number;
  }
  
  export interface CallbackUrls {
    orderAcceptedUrl: string;
    orderRejectedUrl: string;
    orderPickedUpUrl: string;
    orderPreparedUrl: string;
  }
  