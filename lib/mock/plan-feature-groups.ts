import type { LucideIcon } from "lucide-react";
import { Package, Boxes, Link2, Bot, Users } from "lucide-react";

export type FeatureTagTone = "metered" | "addon" | "neutral" | "warning";

export interface PlanFeatureTag {
  label: string;
  tone: FeatureTagTone;
}

export interface PlanFeatureOption {
  id: string;
  name: string;
  description?: string;
  tags?: PlanFeatureTag[];
  metered?: boolean;
}

export interface PlanFeatureGroup {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  features: PlanFeatureOption[];
}

export const PLAN_FEATURE_GROUPS: PlanFeatureGroup[] = [
  {
    id: "warehouse-operations",
    name: "Warehouse Operations",
    description: "Order Fulfillment, Returns Management, Shipping Label",
    icon: Package,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    features: [
      {
        id: "order-fulfillment",
        name: "Order Fulfillment",
        description: "Fulfilled orders per cycle",
        tags: [
          { label: "Metered", tone: "metered" },
          { label: "order", tone: "neutral" },
        ],
        metered: true,
      },
      {
        id: "returns-management",
        name: "Returns Management",
        description: "Handle return requests",
        tags: [{ label: "Add-on", tone: "addon" }],
      },
      {
        id: "shipping-label",
        name: "Shipping Label",
        description: "Shipping labels generated per cycle",
        tags: [
          { label: "Metered", tone: "metered" },
          { label: "label", tone: "neutral" },
        ],
        metered: true,
      },
    ],
  },
  {
    id: "inventory",
    name: "Inventory",
    description: "Warehouses, Bin Locations, Purchase Orders",
    icon: Boxes,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    features: [
      { id: "warehouses", name: "Warehouses", description: "Number of warehouses allowed", metered: true },
      { id: "bin-locations", name: "Bin Locations", description: "Organize stock inside a warehouse" },
      { id: "purchase-orders", name: "Purchase Orders", description: "Create and track purchase orders" },
    ],
  },
  {
    id: "integrations-connections",
    name: "Integrations & Connections",
    description: "E-commerce Stores, Shipping Carriers",
    icon: Link2,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    features: [
      { id: "ecommerce-stores", name: "E-commerce Stores", description: "Connect Zid, Salla and other stores" },
      { id: "shipping-carriers", name: "Shipping Carriers", description: "Connect shipping carrier accounts" },
    ],
  },
  {
    id: "automation-ai",
    name: "Automation & AI",
    description: "Automated Scenarios, AI-Powered Recommendations",
    icon: Bot,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    features: [
      { id: "automated-scenarios", name: "Automated Scenarios", description: "Rule-based workflow automation" },
      {
        id: "ai-recommendations",
        name: "AI-Powered Recommendations",
        description: "Smart suggestions across the dashboard",
      },
    ],
  },
  {
    id: "team-permissions",
    name: "Team & Permissions",
    description: "Additional Employee",
    icon: Users,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    features: [
      {
        id: "additional-employee",
        name: "Additional Employee",
        description: "Number of employees allowed",
        tags: [
          { label: "Metered", tone: "metered" },
          { label: "employee", tone: "neutral" },
          { label: "Complete the terms", tone: "warning" },
        ],
        metered: true,
      },
    ],
  },
];
