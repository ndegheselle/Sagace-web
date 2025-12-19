import { defineEventHandler, H3Event, readBody } from 'h3';
import { BaseEntity } from '~~/shared/base/BaseEntity';

export default function<T extends BaseEntity>(repo: any) {
    return defineEventHandler(async (event: H3Event) => {
        const body = await readBody<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>(event);
        return await repo.create({
            data: body
        });
    });
};