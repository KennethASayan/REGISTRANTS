
export interface Ticket {
  id: string;
  name: string;
  price: number;
  status: 'available' | 'sold_out' | 'countdown' | 'date_restricted';
  remainingCount?: number;
  countdownTime?: string;
  availableFrom?: string;
  availableTo?: string;
  color?: string;
}

 export let tickets: Ticket[] = [
  { 
    id: 'vip1', 
    name: 'VIP', 
    price: 5500, 
    status: 'sold_out',
    color: 'red'
  },
  { 
    id: 'vip2', 
    name: 'VIP', 
    price: 3500, 
    status: 'available',
    remainingCount: 50,
    color: 'yellow'
  },
  { 
    id: 'patrona', 
    name: 'PATRON A', 
    price: 3000, 
    status: 'available',
    remainingCount: 100,
    color: 'orange'
  },
  { 
    id: 'patronb', 
    name: 'PATRON B', 
    price: 1500, 
    status: 'available',
    remainingCount: 150,
    color: 'green'
  },
  { 
    id: 'la', 
    name: 'LA', 
    price: 1000, 
    status: 'countdown',
    countdownTime: '23:59:50',
    color: 'purple'
  },
  { 
    id: 'ua', 
    name: 'UA', 
    price: 1000, 
    status: 'countdown',
    countdownTime: '23:59:50',
    color: 'purple'
  },
  { 
    id: 'standinga', 
    name: 'STANDING A', 
    price: 800, 
    status: 'date_restricted',
    availableFrom: '2/19/25',
    availableTo: '3/22/25',
    color: 'red'
  },
  { 
    id: 'standingb', 
    name: 'STANDING B', 
    price: 800, 
    status: 'date_restricted',
    availableFrom: '2/19/25',
    availableTo: '3/22/25',
    color: 'red'
  }
];