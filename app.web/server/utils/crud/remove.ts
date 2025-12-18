import { defineEventHandler, getQuery, H3Event, readBody } from 'h3';
import { BaseEntity } from '~~/shared/base/BaseEntity';

export default function(repo: any) {
    return defineEventHandler(async (event: H3Event) => {
        const id = getRouterParam(event, 'id');

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing id parameter.',
            });
        }
        return await repo.delete({
            where: { id },
        });
    });
};