import { PocketbaseCrud } from '@common/database/pocketbase';
import type { ServicesResponse } from '@common/database/types.g';

export type ServiceData = ServicesResponse;
export const services = new PocketbaseCrud<ServiceData>('services', ['name', 'description', 'code']);