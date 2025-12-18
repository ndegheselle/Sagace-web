import { defineEventHandler, getQuery, H3Event, readBody } from 'h3';
import { BaseEntity } from '~~/shared/base/BaseEntity';

export default function(repo: any) {
    return defineEventHandler(async (event: H3Event) => {
        await repo.count();
    });
};