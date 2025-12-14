// A curated list of major world cities with their IANA Timezones
// Sourced/Expanded for the World Clock App

export interface CityData {
  name: string
  country: string
  tz: string
  keywords?: string[] // For things like "State" or "Region"
}

export const CITIES: CityData[] = [
  // North America
  { name: "New York", country: "USA", tz: "America/New_York", keywords: ["NY", "NYC"] },
  { name: "Los Angeles", country: "USA", tz: "America/Los_Angeles", keywords: ["LA", "California", "CA"] },
  { name: "Chicago", country: "USA", tz: "America/Chicago", keywords: ["Illinois", "IL"] },
  { name: "Houston", country: "USA", tz: "America/Chicago", keywords: ["Texas", "TX"] },
  { name: "Phoenix", country: "USA", tz: "America/Phoenix", keywords: ["Arizona", "AZ"] },
  { name: "Philadelphia", country: "USA", tz: "America/New_York", keywords: ["PA"] },
  { name: "San Antonio", country: "USA", tz: "America/Chicago", keywords: ["Texas", "TX"] },
  { name: "San Diego", country: "USA", tz: "America/Los_Angeles", keywords: ["California", "CA"] },
  { name: "Dallas", country: "USA", tz: "America/Chicago", keywords: ["Texas", "TX"] },
  { name: "San Jose", country: "USA", tz: "America/Los_Angeles", keywords: ["California", "CA"] },
  { name: "Austin", country: "USA", tz: "America/Chicago", keywords: ["Texas", "TX"] },
  { name: "San Francisco", country: "USA", tz: "America/Los_Angeles", keywords: ["California", "CA", "SF"] },
  { name: "Seattle", country: "USA", tz: "America/Los_Angeles", keywords: ["Washington", "WA"] },
  { name: "Denver", country: "USA", tz: "America/Denver", keywords: ["Colorado", "CO"] },
  { name: "Boston", country: "USA", tz: "America/New_York", keywords: ["Massachusetts", "MA"] },
  { name: "Miami", country: "USA", tz: "America/New_York", keywords: ["Florida", "FL"] },
  { name: "Atlanta", country: "USA", tz: "America/New_York", keywords: ["Georgia", "GA"] },
  { name: "Toronto", country: "Canada", tz: "America/Toronto", keywords: ["Ontario"] },
  { name: "Vancouver", country: "Canada", tz: "America/Vancouver", keywords: ["BC", "British Columbia"] },
  { name: "Montreal", country: "Canada", tz: "America/Toronto", keywords: ["Quebec"] },
  { name: "Mexico City", country: "Mexico", tz: "America/Mexico_City", keywords: ["CDMX"] },

  // South America
  { name: "Sao Paulo", country: "Brazil", tz: "America/Sao_Paulo" },
  { name: "Buenos Aires", country: "Argentina", tz: "America/Argentina/Buenos_Aires" },
  { name: "Rio de Janeiro", country: "Brazil", tz: "America/Sao_Paulo" },
  { name: "Bogota", country: "Colombia", tz: "America/Bogota" },
  { name: "Lima", country: "Peru", tz: "America/Lima" },
  { name: "Santiago", country: "Chile", tz: "America/Santiago" },

  // Europe
  { name: "London", country: "UK", tz: "Europe/London", keywords: ["England", "Britain"] },
  { name: "Paris", country: "France", tz: "Europe/Paris" },
  { name: "Berlin", country: "Germany", tz: "Europe/Berlin" },
  { name: "Madrid", country: "Spain", tz: "Europe/Madrid" },
  { name: "Rome", country: "Italy", tz: "Europe/Rome" },
  { name: "Kyiv", country: "Ukraine", tz: "Europe/Kyiv", keywords: ["Kiev"] },
  { name: "Moscow", country: "Russia", tz: "Europe/Moscow" },
  { name: "Istanbul", country: "Turkey", tz: "Europe/Istanbul" },
  { name: "Amsterdam", country: "Netherlands", tz: "Europe/Amsterdam", keywords: ["Holland"] },
  { name: "Brussels", country: "Belgium", tz: "Europe/Brussels" },
  { name: "Vienna", country: "Austria", tz: "Europe/Vienna" },
  { name: "Zurich", country: "Switzerland", tz: "Europe/Zurich" },
  { name: "Stockholm", country: "Sweden", tz: "Europe/Stockholm" },
  { name: "Oslo", country: "Norway", tz: "Europe/Oslo" },
  { name: "Copenhagen", country: "Denmark", tz: "Europe/Copenhagen" },
  { name: "Dublin", country: "Ireland", tz: "Europe/Dublin" },
  { name: "Lisbon", country: "Portugal", tz: "Europe/Lisbon" },
  { name: "Athens", country: "Greece", tz: "Europe/Athens" },
  { name: "Warsaw", country: "Poland", tz: "Europe/Warsaw" },
  { name: "Prague", country: "Czech Republic", tz: "Europe/Prague" },
  { name: "Budapest", country: "Hungary", tz: "Europe/Budapest" },

  // Asia
  { name: "Tokyo", country: "Japan", tz: "Asia/Tokyo" },
  { name: "Delhi", country: "India", tz: "Asia/Kolkata", keywords: ["New Delhi"] },
  { name: "Shanghai", country: "China", tz: "Asia/Shanghai" },
  { name: "Mumbai", country: "India", tz: "Asia/Kolkata" },
  { name: "Beijing", country: "China", tz: "Asia/Shanghai" },
  { name: "Dhaka", country: "Bangladesh", tz: "Asia/Dhaka" },
  { name: "Osaka", country: "Japan", tz: "Asia/Tokyo" },
  { name: "Karachi", country: "Pakistan", tz: "Asia/Karachi" },
  { name: "Chongqing", country: "China", tz: "Asia/Shanghai" },
  { name: "Kolkata", country: "India", tz: "Asia/Kolkata", keywords: ["Calcutta"] },
  { name: "Manila", country: "Philippines", tz: "Asia/Manila" },
  { name: "Bangalore", country: "India", tz: "Asia/Kolkata", keywords: ["Bengaluru"] },
  { name: "Chennai", country: "India", tz: "Asia/Kolkata", keywords: ["Madras"] },
  { name: "Hyderabad", country: "India", tz: "Asia/Kolkata" },
  { name: "Seoul", country: "South Korea", tz: "Asia/Seoul" },
  { name: "Jakarta", country: "Indonesia", tz: "Asia/Jakarta" },
  { name: "Bangkok", country: "Thailand", tz: "Asia/Bangkok" },
  { name: "Hong Kong", country: "Hong Kong", tz: "Asia/Hong_Kong" },
  { name: "Singapore", country: "Singapore", tz: "Asia/Singapore" },
  { name: "Dubai", country: "UAE", tz: "Asia/Dubai", keywords: ["United Arab Emirates"] },
  { name: "Riyadh", country: "Saudi Arabia", tz: "Asia/Riyadh" },
  { name: "Tel Aviv", country: "Israel", tz: "Asia/Jerusalem" },
  { name: "Kuala Lumpur", country: "Malaysia", tz: "Asia/Kuala_Lumpur" },
  { name: "Taipei", country: "Taiwan", tz: "Asia/Taipei" },
  { name: "Ho Chi Minh City", country: "Vietnam", tz: "Asia/Ho_Chi_Minh", keywords: ["Saigon"] },

  // Oceania
  { name: "Sydney", country: "Australia", tz: "Australia/Sydney" },
  { name: "Melbourne", country: "Australia", tz: "Australia/Melbourne" },
  { name: "Brisbane", country: "Australia", tz: "Australia/Brisbane" },
  { name: "Perth", country: "Australia", tz: "Australia/Perth" },
  { name: "Auckland", country: "New Zealand", tz: "Pacific/Auckland" },
  { name: "Wellington", country: "New Zealand", tz: "Pacific/Auckland" },

  // Africa
  { name: "Cairo", country: "Egypt", tz: "Africa/Cairo" },
  { name: "Lagos", country: "Nigeria", tz: "Africa/Lagos" },
  { name: "Johannesburg", country: "South Africa", tz: "Africa/Johannesburg" },
  { name: "Nairobi", country: "Kenya", tz: "Africa/Nairobi" },
  { name: "Cape Town", country: "South Africa", tz: "Africa/Johannesburg" },
]

export const COUNTRY_TIMEZONES: Record<string, string> = {
  "India": "Asia/Kolkata",
  "China": "Asia/Shanghai",
  "Japan": "Asia/Tokyo",
  "UK": "Europe/London",
  "United Kingdom": "Europe/London",
  "France": "Europe/Paris",
  "Germany": "Europe/Berlin",
  "Italy": "Europe/Rome",
  "Spain": "Europe/Madrid",
  "Russia": "Europe/Moscow",
  "Brazil": "America/Sao_Paulo",
  "Argentina": "America/Argentina/Buenos_Aires",
  "Mexico": "America/Mexico_City",
  "South Africa": "Africa/Johannesburg",
  "Australia": "Australia/Sydney",
  "New Zealand": "Pacific/Auckland",
  "Singapore": "Asia/Singapore",
  "USA": "America/New_York",
  "United States": "America/New_York",
  "Canada": "America/Toronto",
}
