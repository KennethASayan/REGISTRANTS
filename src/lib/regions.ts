export const regions: Record<string, string[]> = {
  "NCR": ["Manila", "Quezon City", "Makati", "Pasig", "Taguig"],
  "CAR": ["Baguio", "Tabuk", "Bontoc", "Lagawe", "Kabugao"],
  "Region I": ["Laoag", "Dagupan", "Vigan", "Urdaneta"],
  "Region II": ["Tuguegarao", "Ilagan", "Santiago"],
  "Region III": ["San Fernando", "Olongapo", "Balanga", "Malolos"],
  "Region IV-A": ["Calamba", "Antipolo", "Batangas City", "Lucena"],
  "Region IV-B": ["Puerto Princesa", "Calapan"],
  "Region V": ["Legazpi", "Naga", "Iriga", "Sorsogon City"],
  "Region VI": ["Iloilo City", "Bacolod", "Roxas", "San Jose de Buenavista"],
  "Region VII": ["Cebu City", "Dumaguete", "Tagbilaran"],
  "Region VIII": ["Tacloban", "Ormoc", "Catbalogan"],
  "Region IX": ["Zamboanga City", "Pagadian", "Dipolog"],
  "Region X": ["Cagayan de Oro", "Malaybalay", "Iligan"],
  "Region XI": ["Davao City", "Tagum", "Panabo"],
  "Region XII": ["General Santos", "Koronadal", "Kidapawan"],
  "Region XIII": ["Butuan", "Surigao", "Bislig"],
  "BARMM": ["Cotabato City", "Marawi"]
};

export function getCities(region: keyof typeof regions): string[] {
  return regions[region] || [];
}
