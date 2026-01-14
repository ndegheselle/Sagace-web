import { CommercialDocument } from "./CommercialDocument.js";
export var EstimateStatus;
(function (EstimateStatus) {
    EstimateStatus[EstimateStatus["Template"] = 0] = "Template";
    EstimateStatus[EstimateStatus["Draft"] = 1] = "Draft";
    EstimateStatus[EstimateStatus["Sent"] = 2] = "Sent";
    EstimateStatus[EstimateStatus["Accepted"] = 3] = "Accepted";
    EstimateStatus[EstimateStatus["Refused"] = 4] = "Refused";
})(EstimateStatus || (EstimateStatus = {}));
export class EstimateDTO extends CommercialDocument {
    constructor(data = {}) {
        super(data); // Call the parent class constructor
        this.reference = '';
        this.status = EstimateStatus.Draft;
        this.reference = data.reference || '';
        this.generatedAt = data.generatedAt;
        this.status = data.status || EstimateStatus.Draft;
    }
}
