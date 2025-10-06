import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Occasion = CollectionEntry<'occasions'>;

/**
 * Get all occasions sorted alphabetically by name
 * @returns Array of all occasions
 */
export async function getAllOccasions(): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');
  return occasions.sort((a, b) =>
    a.data.occasion_name.localeCompare(b.data.occasion_name)
  );
}

/**
 * Get seasonal occasions only
 * @returns Array of seasonal occasions
 */
export async function getSeasonalOccasions(): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');
  return occasions.filter((occasion) => occasion.data.seasonal === true);
}

/**
 * Get evergreen (non-seasonal) occasions
 * @returns Array of evergreen occasions
 */
export async function getEvergreenOccasions(): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');
  return occasions.filter((occasion) => occasion.data.seasonal !== true);
}

/**
 * Get occasions by month
 * @param month - Month number (1-12)
 * @returns Array of occasions typically celebrated in that month
 */
export async function getOccasionsByMonth(month: number): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');

  // Month mappings for UK seasonal occasions
  const monthMappings: Record<number, string[]> = {
    1: ['new-baby'], // January
    2: ['valentines-day'], // February
    3: ['mothers-day'], // March (UK Mother's Day)
    4: ['wedding'], // April - Spring weddings
    5: ['wedding'], // May
    6: ['graduation', 'wedding'], // June
    7: ['wedding'], // July
    8: ['wedding'], // August
    9: [], // September
    10: [], // October
    11: [], // November
    12: [] // December
  };

  const monthOccasions = monthMappings[month] || [];

  return occasions.filter((occasion) =>
    monthOccasions.includes(occasion.data.occasion_id) || !occasion.data.seasonal
  );
}

/**
 * Get upcoming seasonal occasions
 * @param withinMonths - Number of months ahead to look (default: 2)
 * @returns Array of upcoming seasonal occasions
 */
export async function getUpcomingOccasions(withinMonths: number = 2): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12

  const upcomingMonths = Array.from(
    { length: withinMonths },
    (_, i) => ((currentMonth + i - 1) % 12) + 1
  );

  const upcomingOccasionIds = upcomingMonths.flatMap(
    (month) => getOccasionIdsByMonth(month)
  );

  return occasions.filter((occasion) =>
    upcomingOccasionIds.includes(occasion.data.occasion_id)
  );
}

/**
 * Helper function to get occasion IDs by month
 * @param month - Month number (1-12)
 * @returns Array of occasion IDs
 */
function getOccasionIdsByMonth(month: number): string[] {
  const monthMappings: Record<number, string[]> = {
    2: ['valentines-day'], // February
    3: ['mothers-day'], // March (UK)
    5: ['wedding'], // May
    6: ['graduation', 'wedding'], // June
    12: [] // December
  };

  return monthMappings[month] || [];
}

/**
 * Get occasion by ID
 * @param occasionId - Occasion identifier (e.g., 'mothers-day')
 * @returns Occasion or undefined if not found
 */
export async function getOccasionById(occasionId: string): Promise<Occasion | undefined> {
  const occasions = await getCollection('occasions');
  return occasions.find((occasion) => occasion.data.occasion_id === occasionId);
}

/**
 * Get occasions that recommend a specific service
 * @param serviceId - Service identifier
 * @returns Array of occasions recommending that service
 */
export async function getOccasionsByService(serviceId: string): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');
  return occasions.filter((occasion) =>
    occasion.data.recommended_services.includes(serviceId)
  );
}

/**
 * Get occasions by budget level
 * @param budgetLevel - 'budget_friendly', 'mid_range', or 'luxury'
 * @returns Array of occasions with budget guidance
 */
export async function getOccasionsByBudget(
  budgetLevel: 'budget_friendly' | 'mid_range' | 'luxury'
): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');

  return occasions.filter((occasion) => {
    if (!occasion.data.budget_guide) return false;

    const budget = occasion.data.budget_guide[budgetLevel];
    if (!budget) return false;

    // Parse price and filter based on range
    const match = budget.match(/£(\d+)/);
    if (!match) return false;

    const price = parseInt(match[1], 10);

    const budgetRanges = {
      budget_friendly: [0, 30],
      mid_range: [31, 60],
      luxury: [61, Infinity]
    };

    const [min, max] = budgetRanges[budgetLevel];
    return price >= min && price <= max;
  });
}

/**
 * Get occasions that feature a specific flower
 * @param flowerName - Name of the flower
 * @returns Array of occasions recommending that flower
 */
export async function getOccasionsByFlower(flowerName: string): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');
  const flowerLower = flowerName.toLowerCase();

  return occasions.filter((occasion) =>
    occasion.data.recommended_flowers?.some((rf) =>
      rf.flower.toLowerCase().includes(flowerLower)
    )
  );
}

/**
 * Search occasions by name or description
 * @param query - Search query
 * @returns Matching occasions
 */
export async function searchOccasions(query: string): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');
  const queryLower = query.toLowerCase();

  return occasions.filter((occasion) =>
    occasion.data.occasion_name.toLowerCase().includes(queryLower) ||
    occasion.data.description.toLowerCase().includes(queryLower) ||
    occasion.data.keywords?.toLowerCase().includes(queryLower)
  );
}

/**
 * Get popular occasions (based on defined list)
 * @param limit - Maximum number to return (default: 5)
 * @returns Array of popular occasions
 */
export async function getPopularOccasions(limit: number = 5): Promise<Occasion[]> {
  const occasions = await getCollection('occasions');

  // Define popular occasions in priority order
  const popularOrder = [
    'mothers-day',
    'valentines-day',
    'birthday',
    'anniversary',
    'wedding'
  ];

  const popular = popularOrder
    .map((id) => occasions.find((o) => o.data.occasion_id === id))
    .filter((o): o is Occasion => o !== undefined)
    .slice(0, limit);

  return popular;
}

/**
 * Get occasions count by type
 * @returns Object with counts for seasonal vs evergreen
 */
export async function getOccasionCountByType(): Promise<{
  seasonal: number;
  evergreen: number;
  total: number;
}> {
  const occasions = await getCollection('occasions');

  const seasonal = occasions.filter((o) => o.data.seasonal === true).length;
  const evergreen = occasions.filter((o) => o.data.seasonal !== true).length;

  return {
    seasonal,
    evergreen,
    total: occasions.length
  };
}
