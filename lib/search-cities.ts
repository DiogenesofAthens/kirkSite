
import cityTimezones from 'city-timezones';

export interface CityResult {
  city: string;
  country: string;
  province?: string;
  timezone: string;
  pop?: number;
}

export function searchCities(query: string): CityResult[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();

  // city-timezones lookup is mainly exact match or lookup via helper
  // But the helper `findFromCityStateProvince` is stricter.
  // We can filter the raw list for better partial matching if needed,
  // but let's try the library's method first or filter the raw array if it's exposed.

  // The library exposes .cityMapping (array) usually or similar.
  // Let's check what the default export has.
  // Actually, city-timezones default export has .findFromCityStateProvince
  // and .lookupViaCity.

  // Let's just filter the raw list if possible, or use the lookup.
  // Inspecting the library structure in previous steps showed it exports `cityMapping`.

  // Wait, looking at docs or typical usage:
  // import cityTimezones from 'city-timezones';
  // cityTimezones.findFromCityStateProvince("Chicago")

  // Let's try to filter manually for better fuzzy search feel if the library methods are too strict.
  // However, the library might strictly export functions.

  // Actually, let's look at the installed library structure to be sure.
  // I will assume standard usage first: filter the list if I can get it.

  // If I can't access the list directly, I'll use the provided methods.
  // But usually `cityTimezones.cityMapping` is the array.

  const allCities = cityTimezones.cityMapping;

  const results = allCities.filter((c: any) => {
    return c.city.toLowerCase().includes(lowerQuery) ||
           c.country.toLowerCase().includes(lowerQuery) ||
           (c.province && c.province.toLowerCase().includes(lowerQuery));
  });

  // Sort by population if available to show relevant cities first
  // The library data usually has 'pop'
  results.sort((a: any, b: any) => (b.pop || 0) - (a.pop || 0));

  return results.slice(0, 20).map((c: any) => ({
    city: c.city,
    country: c.country,
    province: c.province,
    timezone: c.timezone,
    pop: c.pop
  }));
}
