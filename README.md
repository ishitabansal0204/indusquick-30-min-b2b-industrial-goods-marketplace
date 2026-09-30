# IndusQuick: 30-Minute B2B Industrial Goods Marketplace

Prototype Link : https://indusquick-30-min-b2b-industrial-goods-marketplac.ai.studio/

> **"Industrial essentials. At your job site in 30 minutes."**

IndusQuick is a high-fidelity frontend prototype of a hyper-local B2B quick-commerce marketplace designed specifically for Indian industrial corridors, manufacturing plants, civil construction sites, and fabrication workshops.

It bridges the gap between **IndiaMART's** extensive B2B catalog breadth and **Blinkit's** lightning-fast 30-minute delivery model, eliminating costly construction and factory downtime.

---

## ⚡ The Industrial Downtime Problem

When a critical 10mm SDS-plus drill bit snaps, a 63A MCB trips and burns out, or safety harnesses run out during concrete slab casting, entire work shifts grind to a halt. In Indian industrial clusters (e.g. Okhla, IMT Manesar, Noida Expressway, Peenya, Sanand), sending a technician on a two-wheeler to a physical hardware mandi takes **2 to 3 hours** in traffic with uncertain inventory, counterfeit risks, and no GST input tax invoices.

Unplanned industrial downtime costs **₹15,000 to ₹75,000 per hour** in idle skilled labor and machinery overhead.

**IndusQuick solves this with micro-fulfillment darkstores located within a 5km radius of major industrial zones, delivering genuine OEM equipment in 30 minutes via electric cargo three-wheelers.**

---

## 🚀 Key Features & Modules

### 1. Hyperlocal Darkstore Geofencing & Site Selection
- Toggle between registered industrial sites:
  - **Plant #2 (Okhla Industrial Area Phase-III, New Delhi)**
  - **Site Office Gate 3 (Noida Metro Depot Project, Sector 142)**
  - **Manesar Assembly Works (IMT Manesar, Gurugram)**
  - Custom site office with security gate pass codes (e.g., `SHARMA-B2`).
- Real-time stock binding to local micro-hubs with live SLA indicator (20–30 mins).

### 2. Deep B2B Catalog & Multi-Attribute Search
- **8 Core Industrial Categories**: Power Tools, Electrical & FR Cables, Hardware & Fasteners, Safety PPE, Industrial Plumbing, Bearings & Transmission, Adhesives & Lubricants, Packaging.
- **Top OEM Brands**: Bosch Professional, Polycab, Havells, Schneider Electric, Karam, SKF, Unbrako, 3M, Taparia, Loctite, Supreme.
- **Search Capabilities**: Exact SKU / part number search (`BSH-SDS-10-160`, `LC1D25M7`), HSN code lookup, voice search, and barcode scanner stubs.
- **Faceted Filters**: OEM Brand, Category, Price Range slider, Minimum Order Quantity (MOQ), and ⚡ 30-Min Fast Dispatch filter.

### 3. High-Density Product Detail Page (PDP) & Smart Substitutions
- **Contiguous Purchase Module**: Dynamic bulk slab rate calculator (e.g. 1–4 pcs: ₹240; 5–19 pcs: ₹215; 20+ pcs: ₹190).
- **Datasheets & Standards**: Standardized technical specifications (Wattage, Voltage, Impact Energy, HSN, Chuck type, Country of origin).
- **Regulatory Verification**: BIS / ISI license numbers, CE marks, and PGM masonry certifications.
- **Smart Product Substitution Engine**: Real-time technical alternates (e.g. Bosch 10mm bit low stock ➔ suggests Makita & Taparia equivalents with a 1-click "Switch" action).
- **Bulk RFQ & Technical Inquiry**: Built-in modals for institutional orders (500+ units) and direct questions to OEM engineers.

### 4. B2B Quick-Commerce Cart & Surchargeless Logistics
- Automatic bulk slab savings calculation (`"You saved ₹350 with bulk tier pricing"`).
- **Fulfillment Speed Selector**:
  - ⚡ **30-Min Priority Cargo** (Free for orders > ₹999)
  - **60-Min Standard**
  - **Tomorrow Scheduled**
- **B2B Metadata**: Mandatory Purchase Order (PO) reference numbers and Cost-Center / Project codes (e.g., `CC-DEL-CIVIL-04`).
- **Itemized Tax Breakdown**: Real-time separation of Taxable Subtotal, CGST (9%), and SGST (9%).

### 5. Multi-Step B2B Checkout & Credit Facilities
- Automatic verification of company GSTIN (`07AABCS1429B1Z0` - Sharma Engineering Works Pvt Ltd).
- **Payment Methods Supported**:
  - **Instant UPI** (Google Pay, PhonePe, Paytm, BHIM with zero merchant fees).
  - **30-Day Revolving B2B Credit Line** (₹2,50,000 credit limit with ₹1,82,400 available).
  - **Corporate NetBanking** (HDFC, ICICI, SBI corporate approval chains).
  - **Pay on Site Delivery (POD)** via courier QR or company cheque.

### 6. Live 30-Minute Order Tracking & Interactive Stage Simulator
- **6-Stage Progress Stepper**: Order Confirmed ➔ Picking Items ➔ Packed & Sealed ➔ Out for Delivery ➔ Arriving at Gate ➔ Delivered & Handed Over.
- **Interactive Route Map Visual**: Simulated polyline trajectory from Darkstore Hub #04 to Destination Plant with dynamic EV cargo van positioning.
- **Courier Profile Card**: Driver name (*Rameshwar Kumar*), vehicle (*Mahindra Treo Zor EV Cargo Van*), direct phone call, and WhatsApp chat actions.
- **Prototype Stage Simulator**: Buttons to **Advance Next Stage** and **Mark as Delivered** for live demo flows.

### 7. Rule 46 Compliant GST Tax Invoicing
- Formal GST Tax Invoice compliant with Rule 46 of CGST Rules, 2017.
- Complete supplier & buyer GSTINs, state codes (07 Delhi / 06 Haryana), HSN itemization, CGST 9%, SGST 9%, and digital signature stamp.
- Browser print styling and mock PDF download trigger.

### 8. Multi-User Procurement Governance & Spend Approvals
- Hierarchical approval workflow:
  - **Owner / Director**: Unlimited spend.
  - **Works Manager**: Up to ₹25,000 / order.
  - **Site Purchaser / Electrician**: Up to ₹15,000 / order.
- Orders exceeding approval limits automatically queue for Director authorization with live **Authorize & Dispatch** and **Reject** actions.

### 9. Doorstep Reverse Logistics & Dual-Track Reviews
- **30-Minute Defect Replacement**: Doorstep exchange or instant credit note for transit damage, incorrect specifications, or quality defects.
- **Dual-Track Feedback**: Independent ratings for Product Quality (1–5 Stars) vs. Delivery Speed & Courier Handover (1–5 Stars).

### 10. Darkstore Operations & 24x7 Site Support Desk
- **Darkstore Hub Dashboard**: Real-time picker manifest, daily GMV tracking (₹4,28,450), average picker time (3m 12s), active EV fleet, and inventory restock alerts.
- **Support Chat Desk**: Quick action chips for order location, tax invoice downloads, damage claims, and credit expansions.

---

## 🖥️ Key End-to-End Demo Journey (Section 34)

To experience the full end-to-end prototype workflow:

1. **Homepage**: Observe the 30-min delivery promise, active darkstore at Okhla Phase 3, and quick keyword chips.
2. **Delivery Site Selector**: Click the location button in the navbar to switch between Plant #2 Okhla, Noida Metro Site, or Manesar Works.
3. **Search**: Search for `"10mm drill bit"` or click a quick chip to view matching Bosch and Taparia bits.
4. **Catalog Filters**: Filter by OEM Brand (e.g. Bosch), adjust the price slider, or toggle ⚡ 30-Min Fast Dispatch.
5. **Product Detail Page**: Click **Bosch 10mm SDS-Plus Masonry Drill Bit** to open the PDP. Notice the bulk pricing tiers, technical specs table, and smart substitutes.
6. **Add to Cart**: Select quantity (e.g. 5 pcs) and click **Add to Job Site Cart**.
7. **Cart Drawer**: Review bulk savings, select **⚡ 30 Mins** delivery speed, enter PO Number (`PO-2026/SEW/0492`), and proceed to checkout.
8. **Checkout**: Verify the job site gate instructions and company GSTIN, choose **Instant UPI** or **30-Day Credit Line**, and click **Place Order & Dispatch 30M**.
9. **Live Tracking**: Watch the order enter the live tracking view with driver details and the interactive map.
10. **Simulator**: Click **Advance Next Stage** or **Mark as Delivered** to watch the status transition.
11. **Tax Invoice**: Click **View Tax Invoice** to inspect the printable Rule 46 GST invoice.
12. **Reorder**: Go to the **Orders** tab and click **Buy Again** to reload the same items into the cart in 1 click!

---

## 📄 Official PRD Documentation

A detailed 15-feature **Product Requirements Document (PRD)** has been compiled and saved:
- File: `IndusQuick_Product_Requirements_Document.docx` (in root)
- Download link in the app: Click **`PRD (.docx)`** in the top navigation utility strip or in the Support chat window.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (TypeScript)
- **Bundler & Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Document Generation**: `docx` library (Node.js/TypeScript)
- **Architecture**: 100% Frontend Prototype (Self-contained state store with mock realistic B2B Indian data)

---

## 📦 Getting Started

### Installation

```bash
# Clone the repository and install dependencies
npm install

# Run the development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Re-generating the PRD Document

To regenerate the `.docx` file from source:

```bash
npx tsx scripts/generate_prd_docx.ts
```

---

## ⚖️ License

Proprietary prototype developed for IndusQuick B2B Technologies Pvt Ltd. All rights reserved.
