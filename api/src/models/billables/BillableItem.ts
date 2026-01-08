export enum VatRateType {
    STANDARD = 0.2,       // 20%
    INTERMEDIATE = 0.1,   // 10%
    REDUCED = 0.055,      // 5.5%
    SPECIAL = 0.021,      // 2.1%
    EXEMPT = 0,           // 0% (exonéré)
}

export interface BillableItem {
    _id: string;
    name: string;
    description?: string;
    unitPrice: number;
    vatRateType: VatRateType;
}