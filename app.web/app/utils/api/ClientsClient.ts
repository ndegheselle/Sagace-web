import { CrudClient } from '~~/shared/base/CrudClient';
import type { ClientDTO } from '~~/shared/DTOs/ClientDTO';

export default new CrudClient<ClientDTO>('clients');