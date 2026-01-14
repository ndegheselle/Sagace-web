import { database } from "@/database.js";

import type { StockArticle } from "@/models/billables/ArticlesRepository.js";
import type { Service } from "@/models/billables/ServicesRepository.js";
import type { Client } from "@/models/ClientsRepository.js";
import type { Estimate } from "@/models/documents/EstimatesRepository.js";
import type { Invoice } from "@/models/documents/InvoicesRepository.js";
import type { User } from "@/models/UsersRepository.js";

import { fakeArticles } from '@/seeders/fake/billables/articles.js';
import { fakeServices } from '@/seeders/fake/billables/services.js';
import { fakeClients } from '@/seeders/fake/clients.js';
import { fakeEstimates } from '@/seeders/fake/documents/estimates.js';
import { fakeInvoices } from '@/seeders/fake/documents/invoices.js';
import { fakeUser } from '@/seeders/fake/users.js';

async function seed() : Promise<void> {
    const clientsCollection = database.collection<Client>('clients');
    const articlesCollection = database.collection<StockArticle>('articles');
    const servicesCollection = database.collection<Service>('services');
    const estimatesCollection = database.collection<Estimate>('estimates');
    const invoicesCollection = database.collection<Invoice>('invoices');
    const usersCollection = database.collection<User>('users');

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

    await usersCollection.deleteMany({});
    await usersCollection.insertOne(fakeUser);
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