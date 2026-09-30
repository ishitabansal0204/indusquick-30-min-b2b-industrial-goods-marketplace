import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  BusinessProfile,
  Address,
  ProcurementApproval,
  NotificationItem,
  OrderStatus,
} from '../types';
import {
  MOCK_PRODUCTS,
  DEMO_BUSINESS,
  DEMO_ACTIVE_ORDER,
  DEMO_PAST_ORDERS,
  DEMO_APPROVALS,
  DEMO_NOTIFICATIONS,
} from '../data/mockData';

export type AppView = 'home' | 'search' | 'orders' | 'tracking' | 'account' | 'seller';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  products: Product[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: Address;
  setSelectedLocation: (addr: Address) => void;
  businessProfile: BusinessProfile;
  setBusinessProfile: React.Dispatch<React.SetStateAction<BusinessProfile>>;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartBulkSavings: number;
  cartGstTotal: number;
  cartTotal: number;
  cartItemCount: number;
  
  // Orders & Tracking
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (orderData: Partial<Order>) => Order;
  advanceOrderStep: (orderId: string) => void;
  markOrderDelivered: (orderId: string) => void;
  reorderPastOrder: (order: Order) => void;
  
  // Navigation & Modals
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProcurementModalOpen: boolean;
  setIsProcurementModalOpen: (open: boolean) => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  isReturnModalOpen: boolean;
  setIsReturnModalOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  
  selectedInvoiceOrder: Order | null;
  openInvoice: (order: Order) => void;
  selectedReturnOrder: Order | null;
  openReturn: (order: Order) => void;
  selectedReviewOrder: Order | null;
  openReview: (order: Order) => void;
  
  // Procurement & Approvals
  procurementApprovals: ProcurementApproval[];
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  
  // Toast
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(DEMO_BUSINESS);
  const [selectedLocation, setSelectedLocation] = useState<Address>(DEMO_BUSINESS.deliveryAddresses[0]);
  
  // Initialize cart with a common initial job-site item
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS[2], // Bosch 10mm SDS Drill Bit
      quantity: 5,
      unitPrice: 240,
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([DEMO_ACTIVE_ORDER, ...DEMO_PAST_ORDERS]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(DEMO_ACTIVE_ORDER);
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProcurementModalOpen, setIsProcurementModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [selectedReturnOrder, setSelectedReturnOrder] = useState<Order | null>(null);
  const [selectedReviewOrder, setSelectedReviewOrder] = useState<Order | null>(null);

  const [procurementApprovals, setProcurementApprovals] = useState<ProcurementApproval[]>(DEMO_APPROVALS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Calculate pricing considering bulk tiers
  const getProductPriceForQty = (product: Product, qty: number): number => {
    if (!product.bulkTiers || product.bulkTiers.length === 0) return product.price;
    const sorted = [...product.bulkTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sorted) {
      if (qty >= tier.minQty) {
        return tier.pricePerUnit;
      }
    }
    return product.price;
  };

  const addToCart = (product: Product, quantity: number = product.moq || 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        const newPrice = getProductPriceForQty(product, newQty);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQty, unitPrice: newPrice }
            : item
        );
      } else {
        const unitPrice = getProductPriceForQty(product, quantity);
        return [...prev, { product, quantity, unitPrice }];
      }
    });
    showToast(`Added ${quantity} ${product.unit} of ${product.brand} to site cart`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const unitPrice = getProductPriceForQty(item.product, quantity);
          return { ...item, quantity, unitPrice };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from site cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart financial computations
  const { cartSubtotal, cartBulkSavings, cartGstTotal, cartTotal, cartItemCount } = useMemo(() => {
    let subtotal = 0;
    let baseMrpTotal = 0;
    let gst = 0;
    let count = 0;

    cart.forEach((item) => {
      const lineTotal = item.unitPrice * item.quantity;
      const mrpLineTotal = item.product.mrp * item.quantity;
      subtotal += lineTotal;
      baseMrpTotal += mrpLineTotal;
      gst += Math.round(lineTotal * (item.product.gstRate / 100));
      count += item.quantity;
    });

    const bulkSavings = Math.max(0, baseMrpTotal - subtotal);
    const total = subtotal + gst;

    return {
      cartSubtotal: subtotal,
      cartBulkSavings: bulkSavings,
      cartGstTotal: gst,
      cartTotal: total,
      cartItemCount: count,
    };
  }, [cart]);

  // Order Placement
  const placeOrder = (orderData: Partial<Order>): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `ord-${randomSuffix}`,
      orderNumber: `IND-${randomSuffix}`,
      placedAt: 'Just now',
      status: 'confirmed',
      deliverySpeed: orderData.deliverySpeed || '30min',
      etaMinutes: orderData.deliverySpeed === '30min' ? 24 : 55,
      items: [...cart],
      subtotal: cartSubtotal,
      bulkDiscount: cartBulkSavings,
      gstTotal: cartGstTotal,
      deliveryFee: 0,
      total: cartTotal,
      shippingAddress: selectedLocation,
      billingAddress: businessProfile.billingAddress,
      gstin: businessProfile.gstin,
      companyName: businessProfile.companyName,
      poNumber: orderData.poNumber || `PO-2026/SEW/${Math.floor(100 + Math.random() * 900)}`,
      costCenter: orderData.costCenter || 'CC-OKHLA-MAIN',
      specialInstructions: orderData.specialInstructions || selectedLocation.gateInstructions || '',
      paymentMethod: orderData.paymentMethod || 'upi',
      paymentStatus: orderData.paymentMethod === 'credit_line' ? 'credit_billed' : 'paid',
      driver: {
        name: 'Rameshwar Kumar',
        phone: '+91 98711 02934',
        vehicle: 'Mahindra Treo Zor Electric 3W Cargo Van',
        vehicleNumber: 'DL 1E K 8842',
        rating: 4.92,
      },
      currentStepProgress: 0, // confirmed
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCheckoutModalOpen(false);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Order ${newOrder.orderNumber} Confirmed!`,
      message: `30-Min Dispatch assigned to ${newOrder.driver.name}. Picking started at Okhla Darkstore Hub.`,
      timestamp: 'Just now',
      type: 'order',
      read: false,
      orderId: newOrder.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`Order ${newOrder.orderNumber} placed successfully! ⚡ Dispatching in 30 mins`, 'success');
    return newOrder;
  };

  // Live order advancement for demo simulation
  const advanceOrderStep = (orderId: string) => {
    const steps: OrderStatus[] = [
      'confirmed',
      'picking',
      'packed',
      'out_for_delivery',
      'arriving',
      'delivered',
    ];

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const nextIndex = Math.min(order.currentStepProgress + 1, steps.length - 1);
          const nextStatus = steps[nextIndex];
          const updated: Order = {
            ...order,
            status: nextStatus,
            currentStepProgress: nextIndex,
            etaMinutes: Math.max(0, 24 - nextIndex * 5),
            deliveredAt: nextStatus === 'delivered' ? 'Just now' : order.deliveredAt,
          };
          if (activeOrder?.id === orderId) {
            setActiveOrder(updated);
          }
          showToast(`Order ${order.orderNumber} status: ${nextStatus.replace(/_/g, ' ').toUpperCase()}`, 'info');
          return updated;
        }
        return order;
      })
    );
  };

  const markOrderDelivered = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updated: Order = {
            ...order,
            status: 'delivered',
            currentStepProgress: 5,
            etaMinutes: 0,
            deliveredAt: 'Just now (Handed to Gate Supervisor)',
          };
          if (activeOrder?.id === orderId) {
            setActiveOrder(updated);
          }
          return updated;
        }
        return order;
      })
    );
    showToast(`Order delivered! Tax invoice & POD receipt available.`, 'success');
  };

  const reorderPastOrder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    setIsCartOpen(true);
    showToast(`Reordered ${order.items.length} items from ${order.orderNumber}`, 'success');
  };

  const openInvoice = (order: Order) => {
    setSelectedInvoiceOrder(order);
    setIsInvoiceModalOpen(true);
  };

  const openReturn = (order: Order) => {
    setSelectedReturnOrder(order);
    setIsReturnModalOpen(true);
  };

  const openReview = (order: Order) => {
    setSelectedReviewOrder(order);
    setIsReviewModalOpen(true);
  };

  const approveRequest = (id: string) => {
    setProcurementApprovals((prev) =>
      prev.map((appr) => (appr.id === id ? { ...appr, status: 'approved' } : appr))
    );
    showToast('Purchase Order approved for dispatch', 'success');
  };

  const rejectRequest = (id: string) => {
    setProcurementApprovals((prev) =>
      prev.map((appr) => (appr.id === id ? { ...appr, status: 'rejected' } : appr))
    );
    showToast('Purchase Order returned for revision', 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedLocation,
        setSelectedLocation,
        businessProfile,
        setBusinessProfile,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartBulkSavings,
        cartGstTotal,
        cartTotal,
        cartItemCount,
        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        advanceOrderStep,
        markOrderDelivered,
        reorderPastOrder,
        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProcurementModalOpen,
        setIsProcurementModalOpen,
        isSupportModalOpen,
        setIsSupportModalOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        isReturnModalOpen,
        setIsReturnModalOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        selectedInvoiceOrder,
        openInvoice,
        selectedReturnOrder,
        openReturn,
        selectedReviewOrder,
        openReview,
        procurementApprovals,
        approveRequest,
        rejectRequest,
        notifications,
        markNotificationRead,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
