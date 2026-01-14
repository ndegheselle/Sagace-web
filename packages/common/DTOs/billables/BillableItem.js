export var VatRateType;
(function (VatRateType) {
    VatRateType[VatRateType["STANDARD"] = 0.2] = "STANDARD";
    VatRateType[VatRateType["INTERMEDIATE"] = 0.1] = "INTERMEDIATE";
    VatRateType[VatRateType["REDUCED"] = 0.055] = "REDUCED";
    VatRateType[VatRateType["SPECIAL"] = 0.021] = "SPECIAL";
    VatRateType[VatRateType["EXEMPT"] = 0] = "EXEMPT";
})(VatRateType || (VatRateType = {}));
export var BillableItemType;
(function (BillableItemType) {
    BillableItemType["ARTICLE"] = "article";
    BillableItemType["SERVICE"] = "service";
})(BillableItemType || (BillableItemType = {}));
