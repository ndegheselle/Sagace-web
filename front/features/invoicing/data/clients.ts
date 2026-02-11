import { PocketbaseCrud } from '@common/database/pocketbase';
import type { ClientsResponse } from '@common/database/types.g';

export type ClientData = ClientsResponse;
export const clients = new PocketbaseCrud<ClientData>('clients', ['firstName', 'lastName', 'email']);