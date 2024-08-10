import {
  Car,
  CarFront,
  Home,
  NotebookPen,
  Package,
  PaintRoller,
  ShieldAlert,
  Users,
  Warehouse,
} from 'lucide-react';

export const userStatuses = [
  {
    value: 'CUSTOMER',
    label: 'CUSTOMER',
  },
  {
    value: 'INACTIVE',
    label: 'DEALER FORM SUBMITTED',
  },
  {
    value: 'DEALER_REJECTED',
    label: 'DEALER REJECTED',
  },
  {
    value: 'DEALER',
    label: 'DEALER',
  },
  {
    value: 'BLOCKED',
    label: 'BLOCKED',
  },
  {
    value: 'DELETED',
    label: 'DELETED',
  },
];
export const adminStatuses = [
  {
    value: 'ACTIVE',
    label: 'ACTIVE',
  },
  {
    value: 'INACTIVE',
    label: 'INACTIVE',
  },
];

export const sideBarItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Auctions',
    href: '/auctions',
    icon: NotebookPen,
  },
  {
    label: 'Inspections',
    href: '/inspections',
    icon: ShieldAlert,
  },
  {
    label: 'Dealer Vehicle',
    href: '/dealer-vehicle',
    icon: CarFront,
  },
  {
    label: 'Vehicle Enquery',
    href: '/vehicle-enquery',
    icon: Car,
  },
  {
    label: 'Brands',
    href: '/brands',
    icon: Package,
  },
  {
    label: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    label: 'Inspectors',
    href: '/inspectors',
    icon: Users,
  },
  {
    label: 'Colors',
    href: '/colors',
    icon: PaintRoller,
  },
  {
    label: 'RTOs',
    href: '/rtos',
    icon: Warehouse,
  },
];
