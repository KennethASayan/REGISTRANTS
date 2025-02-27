export type TicketStatus = 'available' | 'sold_out' | 'countdown' | 'date_restricted';

export interface Ticket {
  id: string;
  name: string;
  price: number;
  status: TicketStatus;
  remainingCount?: number;
  countdownTime?: string;
  availableFrom?: string;
  availableTo?: string;
}

export const tickets: Ticket[] = [
  {
    id: 'vip',
    name: 'VIP Ticket',
    price: 5000,
    status: 'available',
    remainingCount: 50
  },
  {
    id: 'regular',
    name: 'Regular Ticket',
    price: 2500,
    status: 'available',
    remainingCount: 200
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    price: 1800,
    status: 'sold_out'
  },
  {
    id: 'student',
    name: 'Student Ticket',
    price: 1200,
    status: 'available',
    remainingCount: 100
  },
  {
    id: 'flash-sale',
    name: 'Flash Sale',
    price: 1500,
    status: 'countdown',
    countdownTime: '01:30:00'
  },
  {
    id: 'weekend-pass',
    name: 'Weekend Pass',
    price: 3500,
    status: 'date_restricted',
    availableFrom: '2025-06-01',
    availableTo: '2025-06-15'
  }
];