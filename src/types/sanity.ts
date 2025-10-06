export interface FlorizeConfig {
  _id: string;
  _type: 'florizeConfig';
  title?: string;
  lastUpdated?: string;
  affiliateLinks?: AffiliateLink[];
  globalHeaderTags?: GlobalHeaderTag[];
}

export interface AffiliateLink {
  serviceId: string;
  affiliateUrl?: string;
  banner?: {
    code?: string;
    description?: string;
    enabled?: boolean;
  };
  notes?: string;
}

export interface GlobalHeaderTag {
  tag: {
    code: string;
    language: 'html' | 'javascript';
  };
  description?: string;
  active?: boolean;
}

export interface AffiliateBanner {
  serviceId: string;
  htmlCode: string;
  description: string;
}
