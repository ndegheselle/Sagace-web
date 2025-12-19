import type { Client } from '~~/shared/models/Client';
import { CrudClient } from '../CrudClient';

export default new CrudClient<Client>('clients');