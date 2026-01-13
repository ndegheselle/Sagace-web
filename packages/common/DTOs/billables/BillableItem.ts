export enum VatRateType {
  STANDARD = 0.2,       // 20%
  INTERMEDIATE = 0.1,   // 10%
  REDUCED = 0.055,      // 5.5%
  SPECIAL = 0.021,      // 2.1%
  EXEMPT = 0,           // 0% (exonéré)
}

export enum BillableItemType {
    ARTICLE = 'article',
    SERVICE = 'service',
}

export interface BillableItem {
    _id: string;
    type: BillableItemType;
    name: string;
    description?: string;
    unitPrice: number;
    vatRateType: VatRateType;
}