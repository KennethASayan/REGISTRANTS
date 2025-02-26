export const tickets = [
    { name: 'VVIP', price: 5500 },
    { name: 'VIP', price: 3500 },
    { name: 'PATRON A', price: 2000 },
    { name: 'PATRON B', price: 1500 },
    { name: 'Upper Box', price: 700 },
    { name: 'Lower Box', price: 1000 },
    { name: 'STANDING A', price: 800 },
    { name: 'STANDING B', price: 800 },
    { name: 'STANDING C', price: 800 },
    { name: 'STANDING D', price: 800 }
  ];

  export interface TicketSelection {
    type: string;
    price: number;
    quantity: number;
  }
