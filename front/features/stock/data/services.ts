import { PocketbaseCrud } from '@common/database/pocketbase';
import { type ServicesResponse, ServicesVatRateTypeOptions } from '@common/database/types.g';

export type ServiceData = ServicesResponse;
export { ServicesVatRateTypeOptions as EnumServiceVat };
export const services = new PocketbaseCrud<ServiceData>('services', ['name', 'description', 'code']);