export interface Ticket {
  id: string;
  name: string;
  price: number;
  status: 'available' | 'sold_out' | 'countdown' | 'date_restricted';
  remainingCount?: number;
  countdownTime?: string;
  availableFrom?: string;
  availableTo?: string;
}

export const tickets: Ticket[] = [
  {
    id: '1',
    name: 'General Admission',
    price: 1500,
    status: 'available',
    remainingCount: 150
  },
  {
    id: '2',
    name: 'VIP Access',
    price: 3000,
    status: 'available',
    remainingCount: 50
  },
  {
    id: '3',
    name: 'Early Bird',
    price: 1200,
    status: 'sold_out'
  },
  {
    id: '4',
    name: 'Premium Package',
    price: 5000,
    status: 'countdown',
    countdownTime: '48:00:00'
  },
  {
    id: '5',
    name: 'Group Discount',
    price: 1200,
    status: 'date_restricted',
    availableFrom: '2025-06-01',
    availableTo: '2025-06-15'
  }
];