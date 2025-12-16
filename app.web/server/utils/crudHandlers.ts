import {
  defineEventHandler,
  getQuery,
  readBody,
  H3Event,
} from 'h3'
import { PaginationOptions } from '~~/shared/base/paginated'

/* LIST */
export function createListHandler<T>(repo: {
  getAll: (options: PaginationOptions) => Promise<any>
}) {
  return defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event)

    return repo.getAll({
      page: Number(query.page ?? 1),
      limit: Number(query.limit ?? 10),
      orderBy: (query.orderBy as string) ?? 'createdAt',
      orderDirection: query.orderDirection as any,
    })
  })
}

/* GET BY ID */
export function createGetHandler<T>(repo: {
  getById: (id: string) => Promise<T | null>
}) {
  return defineEventHandler(async (event: H3Event) => {
    return repo.getById(event.context.params!.id)
  })
}

/* CREATE */
export function createCreateHandler<T>(repo: {
  create: (data: any) => Promise<T>
}) {
  return defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    return repo.create(body)
  })
}

/* UPDATE */
export function createUpdateHandler<T>(repo: {
  update: (id: string, data: any) => Promise<T>
}) {
  return defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    return repo.update(event.context.params!.id, body)
  })
}

/* DELETE */
export function createDeleteHandler<T>(repo: {
  delete: (id: string) => Promise<T>
}) {
  return defineEventHandler(async (event: H3Event) => {
    return repo.delete(event.context.params!.id)
  })
}