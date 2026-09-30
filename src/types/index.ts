export type CategoryId =
  | 'electrical'
  | 'hardware'
  | 'powertools'
  | 'safety'
  | 'plumbing'
  | 'bearings'
  | 'adhesives'
  | 'packaging';

export interface BulkTier {
  minQty: number;
  maxQty?: number;
  pricePerUnit: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  categoryId: CategoryId;
  subCategory: string;
  image: string;
  price: number; // base tier price per unit (INR)
  mrp: number;
  gstRate: number; // percentage (e.g., 18 or 28)
  hsnCode: string;
  unit: string;
  moq: number; // minimum order quantity
  stock: number;
  darkstoreETA: string; // e.g. "22 min"
  darkstoreLocation: string; // e.g. "Okhla Phase-3 Hub"
  rating: number;
  reviewCount: number;
  bulkTiers: BulkTier[];
  specs: Record<string, string>;
  certifications: string[];
  description: string;
  isUrgentNeed?: boolean;
  isLowStock?: boolean;
  substituteIds?: string[];
  dimensions?: string;
  weight?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Address {
  id: string;
  title: string;
  siteType: 'Factory' | 'Job Site' | 'Workshop' | 'Warehouse' | 'Commercial Office';
  contactPerson: string;
  phone: string;
  addressLine: string;
  industrialArea: string;
  city: string;
  pincode: string;
  gateInstructions?: string;
  isDefault?: boolean;
}

export interface BusinessProfile {
  id: string;
  companyName: string;
  gstin: string;
  pan: string;
  businessType: 'Manufacturing' | 'Electrical Contracting' | 'Precision Engineering' | 'Civil Infrastructure' | 'Fabrication';
  contactPerson: string;
  email: string;
  phone: string;
  billingAddress: Address;
  deliveryAddresses: Address[];
  creditLimit: number;
  availableCredit: number;
}

export type OrderStatus =
  | 'confirmed'
  | 'picking'
  | 'packed'
  | 'out_for_delivery'
  | 'arriving'
  | 'delivered'
  | 'cancelled';

export interface DeliveryDriver {
  name: string;
  phone: string;
  vehicle: string;
  vehicleNumber: string;
  rating: number;
  photoUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  bulkDiscount: number;
  gstTotal: number;
  deliveryFee: number;
  total: number;
  deliverySpeed: '30min' | '60min' | 'tomorrow';
  etaMinutes: number;
  shippingAddress: Address;
  billingAddress: Address;
  gstin: string;
  companyName: string;
  poNumber?: string;
  costCenter?: string;
  specialInstructions?: string;
  paymentMethod: 'upi' | 'credit_line' | 'netbanking' | 'corporate_card' | 'cod';
  paymentStatus: 'paid' | 'pending_approval' | 'credit_billed';
  driver: DeliveryDriver;
  currentStepProgress: number; // 0 to 5
  deliveredAt?: string;
  hasProductReview?: boolean;
  hasDeliveryReview?: boolean;
}

export interface ProcurementApproval {
  id: string;
  orderNumber: string;
  requestedBy: string;
  role: string;
  department: string;
  amount: number;
  itemsCount: number;
  summary: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  approvalLimit: number;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  product: Product;
  quantity: number;
  reason: 'Damaged during transit' | 'Wrong specifications delivered' | 'Defective / Failed inspection' | 'Missing accessories' | 'Over-ordered';
  comments: string;
  resolution: 'replacement' | 'credit_refund';
  status: 'requested' | 'pickup_scheduled' | 'item_received' | 'refund_completed';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'inventory' | 'payment' | 'approval';
  read: boolean;
  orderId?: string;
}

export interface ReviewItem {
  id: string;
  productId: string;
  userName: string;
  company: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
}
