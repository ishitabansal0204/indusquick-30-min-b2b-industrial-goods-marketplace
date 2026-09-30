import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { LocationModal } from './components/layout/LocationModal';
import { ToastContainer } from './components/layout/ToastContainer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryShortcuts } from './components/home/CategoryShortcuts';
import { UrgentReorderSection } from './components/home/UrgentReorderSection';
import { FeaturedProductGrid } from './components/home/FeaturedProductGrid';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { QuoteRequestModal } from './components/product/QuoteRequestModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackingView } from './components/tracking/OrderTrackingView';
import { OrderHistoryView } from './components/orders/OrderHistoryView';
import { InvoiceModal } from './components/orders/InvoiceModal';
import { ReturnModal } from './components/orders/ReturnModal';
import { ReviewModal } from './components/orders/ReviewModal';
import { ProcurementModal } from './components/procurement/ProcurementModal';
import { SellerDashboardModal } from './components/seller/SellerDashboardModal';
import { SearchDiscoveryModal } from './components/search/SearchDiscoveryModal';
import { SupportChatModal } from './components/support/SupportChatModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';
import { AuthModal } from './components/auth/AuthModal';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeView === 'home' && (
          <>
            <HeroBanner />
            <CategoryShortcuts />
            <UrgentReorderSection />
            <FeaturedProductGrid />
          </>
        )}

        {activeView === 'search' && <SearchDiscoveryModal />}
        {activeView === 'orders' && <OrderHistoryView />}
        {activeView === 'tracking' && <OrderTrackingView />}
        {activeView === 'seller' && <SellerDashboardModal />}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Mobile Bottom Thumb Navigation */}
      <MobileNav />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <QuoteRequestModal />
      <CartDrawer />
      <CheckoutModal />
      <LocationModal />
      <InvoiceModal />
      <ReturnModal />
      <ReviewModal />
      <ProcurementModal />
      <AuthModal />
      <SupportChatModal />
      <NotificationDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
