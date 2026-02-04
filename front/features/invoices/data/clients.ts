import { PocketbaseCrud } from '@common/database/pocketbase';
import type { ClientsResponse } from '@common/database/types.g';

export const clients = new PocketbaseCrud<ClientsResponse>('clients', undefined, ['firstName', 'lastName', 'email']);