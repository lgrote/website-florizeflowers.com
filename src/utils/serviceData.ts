import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Service = CollectionEntry<'services'>;

/**
 * Get top-rated services sorted by rating
 * @param limit - Maximum number of services to return (default: 7)
 * @returns Array of top-rated services
 */
export async function getTopServices(limit: number = 7): Promise<Service[]> {
  const services = await getCollection('services');
  return services
    .sort((a, b) => b.data.rating - a.data.rating)
    .slice(0, limit);
}

/**
 * Sort services by rating (descending)
 * @param services - Array of services to sort
 * @returns Sorted array
 */
export function sortServicesByRating(services: Service[]): Service[] {
  return [...services].sort((a, b) => b.data.rating - a.data.rating);
}

/**
 * Sort services by price range
 * @param services - Array of services to sort
 * @param order - 'asc' for budget-first, 'desc' for luxury-first
 * @returns Sorted array
 */
export function sortServicesByPrice(
  services: Service[],
  order: 'asc' | 'desc' = 'asc'
): Service[] {
  const priceOrder = { '£': 1, '££': 2, '£££': 3, '££-£££': 2.5 };

  return [...services].sort((a, b) => {
    const priceA = priceOrder[a.data.price_range as keyof typeof priceOrder] || 2;
    const priceB = priceOrder[b.data.price_range as keyof typeof priceOrder] || 2;
    return order === 'asc' ? priceA - priceB : priceB - priceA;
  });
}

/**
 * Get services by price category
 * @param category - Price category ('budget', 'mid-range', 'luxury')
 * @returns Array of services in that price range
 */
export async function getServicesByPriceCategory(
  category: 'budget' | 'mid-range' | 'luxury'
): Promise<Service[]> {
  const services = await getCollection('services');

  const priceMap: Record<string, string[]> = {
    'budget': ['£'],
    'mid-range': ['££', '££-£££'],
    'luxury': ['£££']
  };

  return services.filter((service) =>
    priceMap[category]?.includes(service.data.price_range)
  );
}

/**
 * Get service by ID
 * @param serviceId - Service identifier (e.g., 'interflora')
 * @returns Service or undefined if not found
 */
export async function getServiceById(serviceId: string): Promise<Service | undefined> {
  const services = await getCollection('services');
  return services.find((service) => service.data.service_id === serviceId);
}

/**
 * Get services that have a specific feature
 * @param feature - Feature to search for (e.g., 'same-day delivery')
 * @returns Array of services with that feature
 */
export async function getServicesByFeature(feature: string): Promise<Service[]> {
  const services = await getCollection('services');
  const featureLower = feature.toLowerCase();

  return services.filter((service) =>
    service.data.key_features.some((f) =>
      f.toLowerCase().includes(featureLower)
    ) || service.data.delivery_options.some((d) =>
      d.toLowerCase().includes(featureLower)
    )
  );
}

/**
 * Get services that are best for a specific use case
 * @param useCase - Use case (e.g., 'luxury', 'budget', 'same-day')
 * @returns Recommended services for that use case
 */
export async function getServicesForUseCase(useCase: string): Promise<Service[]> {
  const services = await getCollection('services');
  const useCaseLower = useCase.toLowerCase();

  // Define use case mappings
  const useCaseMappings: Record<string, { rating?: number; price?: string[]; features?: string[] }> = {
    'luxury': { rating: 4.5, price: ['£££'] },
    'budget': { price: ['£'] },
    'same-day': { features: ['same-day', 'same day'] },
    'international': { features: ['international', 'worldwide'] },
    'reliable': { rating: 4.3 }
  };

  const criteria = useCaseMappings[useCaseLower];
  if (!criteria) return [];

  return services.filter((service) => {
    if (criteria.rating && service.data.rating < criteria.rating) return false;
    if (criteria.price && !criteria.price.includes(service.data.price_range)) return false;
    if (criteria.features) {
      const hasFeature = criteria.features.some((f) =>
        service.data.key_features.some((kf) => kf.toLowerCase().includes(f)) ||
        service.data.delivery_options.some((d) => d.toLowerCase().includes(f))
      );
      if (!hasFeature) return false;
    }
    return true;
  });
}

/**
 * Get services with winner badges
 * @returns Services that have won awards or badges
 */
export async function getAwardWinners(): Promise<Service[]> {
  const services = await getCollection('services');
  return services.filter((service) => service.data.winner_badge);
}

/**
 * Search services by name or description
 * @param query - Search query
 * @returns Matching services
 */
export async function searchServices(query: string): Promise<Service[]> {
  const services = await getCollection('services');
  const queryLower = query.toLowerCase();

  return services.filter((service) =>
    service.data.service_name.toLowerCase().includes(queryLower) ||
    service.data.description.toLowerCase().includes(queryLower) ||
    service.data.keywords?.toLowerCase().includes(queryLower)
  );
}

/**
 * Get service count by price range
 * @returns Object with counts for each price range
 */
export async function getServiceCountByPrice(): Promise<Record<string, number>> {
  const services = await getCollection('services');
  const counts: Record<string, number> = { '£': 0, '££': 0, '£££': 0, '££-£££': 0 };

  services.forEach((service) => {
    const price = service.data.price_range;
    if (price in counts) counts[price]++;
  });

  return counts;
}
