import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Packer,
  AlignmentType,
  ShadingType,
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';

async function generatePRD() {
  const primaryColor = '0F172A'; // Slate 900
  const accentColor = 'D97706'; // Amber 600
  const subtextColor = '64748B'; // Slate 500
  const tableHeaderBg = '1E293B'; // Slate 800

  const doc = new Document({
    title: 'IndusQuick - B2B Industrial Quick-Commerce PRD',
    description: 'Comprehensive Product Requirements Document for IndusQuick 30-Minute Industrial Goods Marketplace',
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22, // 11pt
            color: '1E293B',
          },
          paragraph: {
            spacing: {
              after: 140,
              line: 276,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // Document Header / Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'PRODUCT REQUIREMENTS DOCUMENT (PRD)',
                size: 28,
                bold: true,
                color: accentColor,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'IndusQuick: Hyperlocal 30-Minute B2B Industrial Goods Marketplace',
                size: 36,
                bold: true,
                color: primaryColor,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'Core Proposition: "Industrial Essentials. At Your Job Site in 30 Minutes."',
                italics: true,
                size: 24,
                color: '475569',
              }),
            ],
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Author & Role', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Senior Product Manager & Principal UX Strategist' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Target Launch Phase', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'v1.0 MVP & High-Fidelity Prototype' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Geography & Hubs', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Delhi NCR (Okhla Phase-III, Manesar, Noida), Bengaluru (Peenya), Ahmedabad (Sanand)' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Regulatory Baseline', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Rule 46 CGST Rules (2017), HSN Code Classification, BIS / IS Certification Standards' })] })],
                  }),
                ],
              }),
            ],
          }),

          // Section 1: Executive Summary & Strategic Opportunity
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: '1. Executive Summary & Market Opportunity', bold: true, color: primaryColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Modern infrastructure, manufacturing plants, and high-precision workshops across India face recurring operational crises due to unexpected tool breakage, cable short-circuits, fastener shortages, or safety gear deficits. When a critical 10mm SDS-plus drill bit or 63A MCB blows out, concrete pouring, machine assembly, or production shifts grind to an immediate halt. Unplanned industrial downtime carries catastrophic economic costs ranging from ₹15,000 to over ₹75,000 per hour in idle skilled labor and machinery overhead.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'The current Indian B2B landscape is bifurcated with no hybrid solution available:\n',
                bold: true,
              }),
              new TextRun({
                text: '• IndiaMART / Traditional Wholesale: Unrivaled catalog breadth, but operates purely as a delayed lead-generation directory. Inquiries require 24–72 hours of back-and-forth negotiations, offline bank transfers, and 3–5 day logistics.\n• Blinkit / Zepto / Instamart: Pioneers of hyper-convenient 10–15 minute darkstore delivery, but completely tailored to B2C consumers (grocery, FMCG, electronics). They offer zero industrial tooling, lack GST input credit tax invoices, have no multi-user approval structures, and cannot accommodate bulk volume pricing slabs.\n\n',
              }),
              new TextRun({
                text: 'IndusQuick synthesizes both paradigms: A specialized hyper-local network of industrial micro-fulfillment centers ("darkstores") positioned strategically within 5 kilometers of major industrial clusters, guaranteeing 30-minute doorstep delivery of genuine OEM equipment, instant GST tax invoices, and B2B credit terms.',
              }),
            ],
          }),

          // Section 2: Target User Personas
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: '2. Target User Personas & ICPs', bold: true, color: primaryColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '1. Ramesh Patel – Workshop / Site Works Supervisor\n',
                bold: true,
              }),
              new TextRun({
                text: '• Context: Managing active concrete casting or precision CNC tooling on site.\n• Pain Point: Tools burn out mid-shift. Sending a helper on a two-wheeler to a physical hardware mandi takes 2–3 hours in Delhi traffic with no invoice and unpredictable counterfeit risks.\n• Need: Immediate 30-minute drop at specific factory gates or construction boom barriers with pre-authorized company credit.\n\n',
              }),
              new TextRun({
                text: '2. Rahul Verma – Site Electrical Engineer / Subcontractor\n',
                bold: true,
              }),
              new TextRun({
                text: '• Context: Commissioning distribution boards and motor panels for infrastructure projects.\n• Pain Point: Needs exact technical specs (FR-LSH copper wires, 10kA breaking capacity MCBs) that match government tender specs.\n• Need: Filter by HSN codes, IS/IEC standards, and smart substitution recommendations if initial stock is depleted.\n\n',
              }),
              new TextRun({
                text: '3. Amitabh Joshi – Works Procurement Manager\n',
                bold: true,
              }),
              new TextRun({
                text: '• Context: Managing scheduled plant maintenance and monthly consumables (bearings, lubricants, PPE).\n• Pain Point: Handling hundreds of fragmented petty-cash cash memos with zero GST input tax credit.\n• Need: Consolidated monthly GSTR-2B automated invoices, tiered bulk discounts, and 1-click repeat reordering.\n\n',
              }),
              new TextRun({
                text: '4. Sunil Sharma – Managing Director & Owner\n',
                bold: true,
              }),
              new TextRun({
                text: '• Context: Ultimate financial authority for Sharma Engineering Works Pvt Ltd.\n• Pain Point: Employee theft, unapproved job-site purchases, and liquidity drag.\n• Need: Multi-user procurement authorization limits (e.g., all purchases above ₹15,000 require director one-tap signoff) and 30-day revolving credit lines.',
              }),
            ],
          }),

          // Section 3: Strategic Product Pillars
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: '3. Strategic Product Pillars', bold: true, color: primaryColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Pillar 1: 30-Minute SLA as an Operational Invariant\nAll darkstores maintain dynamic picker staging (target pick time < 3 minutes) and dedicated fleets of electric cargo 3-wheelers (Mahindra Treo Zor / Bajaj Maxima EV) stationed within 15 minutes of job-site delivery points.\n\nPillar 2: 100% Genuine OEM Sourcing & Traceability\nZero tolerance for unbranded or counterfeit duplicates. Direct supply tie-ups with Bosch, Polycab, Havells, Schneider Electric, Karam, SKF, and Taparia, backed by manufacturer test certificates and hologram verification.\n\nPillar 3: B2B Commercial & Tax Native\nAutomated Rule 46 CGST compliance, dual-tax rate calculation (18% and 28%), HSN itemization, Purchase Order (PO) and Cost-Center attribution, and revolving 30-day trade credit.\n\nPillar 4: Zero-Friction Repeat Purchasing\nJob sites consume the same drills, tapes, and grease on weekly schedules. 1-click "Buy Again" allows repeat procurement in under 15 seconds without re-entering addresses or billing info.',
              }),
            ],
          }),

          // Section 4: Detailed Functional Specifications
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: '4. Detailed Functional Specifications', bold: true, color: primaryColor })],
          }),

          // Feature 4.1
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.1 Hyperlocal Darkstore Geofencing & Site Selector', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Functionality: Allows commercial users to toggle between registered plant facilities (e.g., Plant #2 Okhla, Sector 142 Noida Metro Site, IMT Manesar Works) or pin new temporary project gates.\n• Darkstore Dynamic Binding: System automatically locks inventory and delivery times to the nearest hub (e.g., Okhla Hub #04). If user selects an address outside the 30-min polygon, the SLA automatically toggles to 60-min standard or scheduled next-day dispatch.\n• Gate Security Protocols: Captures critical site security credentials (e.g., "Enter Gate No. 2 via Container Depot road; Security pass code: SHARMA-B2; Mandatory helmet check").',
              }),
            ],
          }),

          // Feature 4.2
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.2 B2B Industrial Catalog & Taxonomy Architecture', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'The catalog spans 8 core enterprise categories engineered for heavy fabrication and assembly:\n1. Power Tools: Rotary Hammers, SDS Bits, Angle Grinders, Cut-off Saws, Cordless Impact Wrenches.\n2. Electrical & Switchgear: FR Copper Building Wires, 4-Pole MCBs, Heavy Duty Magnetic Contactors, Industrial Distribution Boards.\n3. Hardware & Fasteners: Grade 8.8 High-Tensile Hex Head Bolts, SS304 Screws, Drop-Forged C-Clamps, Measuring Instruments.\n4. Safety & PPE: IS 3521 Certified Full Body Fall Arrest Harnesses, 6-Point Ratchet Shelmets, 3M Respirators, Steel-Toe Shoes.\n5. Plumbing & Piping: Schedule 40 CPVC Industrial Pipes, High-Pressure Ball Valves, Solvent Cements.\n6. Bearings & Power Transmission: Deep Groove Ball Bearings (2RSH Rubber Sealed), Pillow Blocks, Industrial V-Belts.\n7. Adhesives & Lubricants: Loctite 243 Threadlockers, WD-40 Degreasers, Hydraulic Oils.\n8. Industrial Packaging: 23-Micron Stretch Films, Corrugated Storage Cartons, Heavy Strapping Rolls.',
              }),
            ],
          }),

          // Feature 4.3
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.3 Intelligent Search & Discovery Engine', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• SKU & Part Number Matching: Supports direct technical searches like "BSH-SDS-10-160", "LC1D25M7", or "6205-2RSH" alongside colloquial job-site queries ("10mm bit", "red copper wire", "63A MCB").\n• Voice & Barcode Mock Stubs: Integrated voice-search and camera barcode scanning for technicians wearing work gloves at dark job sites.\n• Multi-Attribute Faceted Filters: Filter by Category, OEM Brand, Minimum Order Quantity (MOQ), Max Price Slider, and 30-Min Fast Dispatch toggle.\n• Dynamic Sorting: Sort by Most Relevant, Fastest 30-Min Delivery ETA, Price Low-to-High, Price High-to-Low, and Contractor Rating.',
              }),
            ],
          }),

          // Feature 4.4
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.4 High-Information Density Product Detail Page (PDP)', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Contiguous Purchase Module: Fixed purchase sidebar keeping unit price, GST rate, available stock count, delivery location, and CTA immediately visible.\n• Interactive Bulk Quantity Slabs: Real-time unit price calculator adjusting savings across volume slabs (e.g., 1–4 units: ₹240; 5–19 units: ₹215; 20+ units: ₹190).\n• Comprehensive Datasheet Table: Standardized technical parameters (Wattage, Voltage, Impact Energy, HSN, Chuck type, Country of origin).\n• Compliance & Verification: Direct visibility of BIS / ISI license numbers, CE marks, and PGM masonry certifications.\n• Request RFQ & Technical Query: Secondary triggers for institutional volume orders (500+ pieces) and direct question submission to factory engineers.',
              }),
            ],
          }),

          // Feature 4.5
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.5 Smart Product Substitution Engine', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Core Logic: When critical items have low stock or are unavailable (e.g., Bosch 10mm SDS Drill Bit down to 8 units), the system immediately presents verified technical alternates (Makita 10mm SDS Plus or Taparia 10mm Heavy Duty).\n• One-Click Swap: Displays comparative pricing, stock, and ETA with an instant "Switch" action, preventing dropped job-site carts and project delays.',
              }),
            ],
          }),

          // Feature 4.6
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.6 B2B Quick-Commerce Cart & Delivery Options', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Dynamic Volume Surcharge & Savings: Automatic computation of bulk slab savings ("You saved ₹350 with bulk tier pricing").\n• Fulfillment Speed Selector: Users can choose ⚡ 30-Min Priority Cargo (Free for orders > ₹999), 60-Min Standard, or Next-Day Scheduled.\n• B2B Accounting Metadata: Built-in fields for mandatory PO Reference # and Cost-Center / Project Code (e.g., "CC-DEL-CIVIL-04").\n• Tax Calculation Engine: Real-time itemized tax breakdown distinguishing Taxable Subtotal from CGST (9%) and SGST (9%).',
              }),
            ],
          }),

          // Feature 4.7
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.7 Multi-Step Checkout & Payment Facilities', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Address & Gate Confirmation: Visual verification of delivery gate instructions and site receiver contact.\n• Automated GSTIN Match: Pre-populates verified company GSTIN (07AABCS1429B1Z0) with live MCA status indicator.\n• Simulated Payment Rail Suite:\n  1. Instant UPI (Google Pay, PhonePe, Paytm, BHIM with zero merchant markup).\n  2. Revolving 30-Day B2B Credit Line (Linked to pre-approved ₹2,50,000 credit limit).\n  3. Corporate NetBanking (HDFC, ICICI, SBI corporate approval chains).\n  4. Pay on Site Delivery (POD) via courier QR or company cheque.',
              }),
            ],
          }),

          // Feature 4.8
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.8 Live 30-Minute Order Tracking & Stage Simulator', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Real-Time Stepper: 6 progressive order states:\n  1. Order Confirmed (0m) -> 2. Picking Items (3m) -> 3. Packed & Sealed (6m) -> 4. Out for Delivery (12m) -> 5. Arriving at Gate (20m) -> 6. Delivered & Handed Over (24m).\n• Interactive Map Visual: Visualized polyline trajectory from Darkstore Hub #04 to Destination Plant with dynamic EV cargo van positioning.\n• Courier Profile: Driver name (Rameshwar Kumar), Vehicle number (DL 1E K 8842), Driver rating (4.92), Direct Phone Call, and WhatsApp chat actions.\n• Interactive Prototype Stage Simulator: Allows demo evaluators to manually click "Advance Next Stage" or "Mark as Delivered" to test post-delivery workflows.',
              }),
            ],
          }),

          // Feature 4.9
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.9 Rule 46 Compliant GST Tax Invoicing', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Full Legal Compliance: Follows Rule 46 of CGST Rules, 2017 with Supplier & Buyer legal names, physical addresses, state codes (07 Delhi / 06 Haryana), and registered GSTINs.\n• HSN Level Tax Itemization: Displays exact HSN codes, quantity, unit rates, taxable value, CGST 9%, SGST 9%, and total invoice sum.\n• Download & Print: Clean CSS print media styling and mock PDF download trigger for plant accounting records.',
              }),
            ],
          }),

          // Feature 4.10
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.10 Multi-User Procurement Governance & Spend Approvals', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Role Hierarchy: Company Owner (Unlimited spend), Works Manager (Limit ₹25,000/order), Site Purchaser (Limit ₹15,000/order).\n• Automatic Spend Threshold Enforcement: Requisitions exceeding a user\'s limit automatically trigger a high-priority approval prompt in the Director\'s queue.\n• One-Tap Decisioning: Real-time "Authorize & Dispatch" and "Reject" actions update state across all sessions with instant toast confirmation.',
              }),
            ],
          }),

          // Feature 4.11
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.11 Doorstep Reverse Logistics (Returns & Replacements)', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Reason Categorization: Damaged during transit, wrong specification, failed site testing, missing parts, or over-ordered.\n• Photo Upload Evidence: Mock image upload module for job-site proof of defect.\n• Resolution Modes: Instant 30-minute replacement dispatch or credit note refunded to GSTIN wallet.',
              }),
            ],
          }),

          // Feature 4.12
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.12 Dual-Track Ratings & Reputation Ledger', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Separation of Concerns: Distinct rating tracks for Product Quality / Specification Accuracy (1–5 Stars) vs. 30-Minute Courier Speed & Gate Handover (1–5 Stars).\n• Verified Contractor Badging: Display of company affiliations (e.g., "Singhania Highrise Infrastructure") to build high-trust peer proof.',
              }),
            ],
          }),

          // Feature 4.13
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.13 1-Click Fast Reorder Engine ("Buy Again")', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Order History Integration: "Buy Again" button immediately transfers all line items and historical quantities into the active cart.\n• Dynamic Quantity & Price Re-check: Validates current warehouse inventory and adjusts tier pricing before checkout drawer opens.',
              }),
            ],
          }),

          // Feature 4.14
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.14 Darkstore Micro-Fulfillment Operations Dashboard', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Operational Console: Displays real-time darkstore metrics (Daily Hub GMV: ₹4,28,450; Average Picker Time: 3m 12s; Active Fleet: 12 EVs).\n• Live Picker Queue: Real-time list of pending orders with "Print Shelf Tag" action for warehouse pick-and-pack staff.\n• Automated Restock PO Generator: Low stock warning flags (e.g., Bosch 10mm bit down to 8 units) triggering instant PO creation to OEM central depots.',
              }),
            ],
          }),

          // Feature 4.15
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [new TextRun({ text: '4.15 24x7 Job Site Incident & Technical Support Desk', bold: true, color: accentColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Interactive Chat Assistant: Instant conversational answers for order location, tax invoice downloads, damage claims, and credit expansions.\n• Quick Action Chips: Fast clickable prompts ensuring non-technical job-site users get rapid solutions without typing.',
              }),
            ],
          }),

          // Section 5: Non-Functional Requirements & Performance
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: '5. Non-Functional Requirements (NFRs)', bold: true, color: primaryColor })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Interaction Latency Budget: Micro-interactions, filter updates, and cart operations must settle in <= 150ms.\n• Zero-Pill Design System Compliance: Strictly adheres to human-designed typography rules; no pseudo-technical comment clutter, no ornamental scorecards, and clean tabular numerals for all pricing and SKUs.\n• Responsive Touch Targets: Minimum 44px touch targets across mobile views, catering to site supervisors operating smartphones in rugged, outdoor conditions.\n• Resilient Fallbacks: 100% Zero-Broken-Image compliance with styled CSS mesh containers for all product and hero assets.',
              }),
            ],
          }),

          // Section 6: Key Performance Indicators & SLA Targets
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [new TextRun({ text: '6. Success Metrics & Launch Targets', bold: true, color: primaryColor })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Metric', bold: true, color: 'FFFFFF' })] })],
                  }),
                  new TableCell({
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Benchmark (IndiaMART/B2B)', bold: true, color: 'FFFFFF' })] })],
                  }),
                  new TableCell({
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'IndusQuick Target SLA', bold: true, color: 'FFFFFF' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Order Fulfillment Time' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '24 to 96 Hours' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Under 30 Minutes', bold: true, color: accentColor })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'On-Time In-Full (OTIF)' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '82% - 87%' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '>= 98.0%', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Darkstore Pick-to-Dispatch' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'N/A (Multi-day)' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '< 4 Minutes', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'GST Tax Invoice Turnaround' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Manual (5-15 Days)' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Real-time (0 seconds)', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '14-Day Repeat Purchase Rate' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '22%' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '>= 65%', bold: true })] })] }),
                ],
              }),
            ],
          }),

          // Sign-off Block
          new Paragraph({
            spacing: { before: 400, after: 100 },
            children: [
              new TextRun({
                text: 'Document Sign-off & Approval Authority:',
                bold: true,
                size: 24,
                color: primaryColor,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Approved by Principal Product Manager & Lead Architect · IndusQuick Technologies Pvt Ltd\nDocument hash: IQ-PRD-2026-V1.0-FINAL · Status: Released to Engineering & Executive Stakeholders',
                italics: true,
                size: 20,
                color: subtextColor,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  // Write to public folder for direct client browser download
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicFilePath = path.join(publicDir, 'IndusQuick_Product_Requirements_Document.docx');
  fs.writeFileSync(publicFilePath, buffer);

  // Also write to workspace root
  const rootFilePath = path.resolve(process.cwd(), 'IndusQuick_Product_Requirements_Document.docx');
  fs.writeFileSync(rootFilePath, buffer);

  console.log(`PRD successfully generated at:`);
  console.log(`- ${publicFilePath}`);
  console.log(`- ${rootFilePath}`);
}

generatePRD().catch((err) => {
  console.error('Error generating PRD document:', err);
  process.exit(1);
});
