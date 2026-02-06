import { PocketbaseCrud } from '@common/database/pocketbase';
import type { EstimatesResponse } from '@common/database/types.g';

export const estimates = new PocketbaseCrud<EstimatesResponse>('estimates', ['reference'], ['services', 'articles']);