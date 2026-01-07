import { database } from "@/database";

import type { StockArticle } from "sagace-common/models/billables/article";
import type { Service } from "sagace-common/models/billables/service";
import type { Client } from "sagace-common/models/client";
import type { Estimate } from "sagace-common/models/documents/estimate";
import type { Invoice } from "sagace-common/models/documents/invoice";

import { fakeArticles } from '@/seeders/fake/billables/articles';
import { fakeServices } from '@/seeders/fake/billables/services';
import { fakeClients } from '@/seeders/fake/clients';
import { fakeEstimates } from '@/seeders/fake/documents/estimates';
import { fakeInvoices } from '@/seeders/fake/documents/invoices';


async function seed() : Promise<void> {
    const clientsCollection = database.collection<Client>('clients');
    const articlesCollection = database.collection<StockArticle>('articles');
    const servicesCollection = database.collection<Service>('services');
    const estimatesCollection = database.collection<Estimate>('estimates');
    const invoicesCollection = database.collection<Invoice>('invoices');

    await clientsCollection.deleteMany({});
    await clientsCollection.insertMany(fakeClients);

    await articlesCollection.deleteMany({});
    await articlesCollection.insertMany(fakeArticles);

    await servicesCollection.deleteMany({});
    await servicesCollection.insertMany(fakeServices);

    await estimatesCollection.deleteMany({});
    await estimatesCollection.insertMany(fakeEstimates);
    
    await invoicesCollection.deleteMany({});
    await invoicesCollection.insertMany(fakeInvoices);
}

await seed()
    .then(() => {
        console.log("Client seeding completed.");
        process.exit(0);
    })
    .catch((err: any) => {
        console.error(err);
        process.exit(1);
    });