import { CrudClient } from '~~/shared/base/CrudClient';
import type { Client } from '~~/shared/models';

export default new CrudClient<Client>('clients');