import bcrypt from "bcrypt";
import { VatRateType, EstimateStatus, InvoiceStatus } from "./generated/client";
import { prisma } from './prisma';

async function createUser() {
  const hashedPassword = await bcrypt.hash("Test123", 10);

  await prisma.user.upsert({
    where: { email: "admin" },
    update: {},
    create: {
      email: "admin",
      password: hashedPassword,
      name: "Admin",
    },
  });
}

/* ----------------------------- ARTICLES ----------------------------- */
async function createArticles() {
  return prisma.stockArticle.createMany({
    data: [
      {
        name: "Wireless Mouse",
        sku: "MOUSE-WL-001",
        description: "Wireless Mouse",
        unitPrice: 29.99,
        quantity: 150,
        vatRateType: VatRateType.REDUCED,
      },
      {
        name: "Mechanical Keyboard",
        sku: "KEY-MECH-002",
        description: "Mechanical Keyboard",
        unitPrice: 89.99,
        quantity: 8,
        vatRateType: VatRateType.STANDARD,
      },
      {
        name: "USB-C Cable",
        sku: "CABLE-USBC-003",
        description: "USB-C Cable",
        unitPrice: 9.99,
        quantity: 500,
        vatRateType: VatRateType.STANDARD,
      },
      {
        name: '27" Monitor',
        sku: "MON-27-004",
        description: '27" Monitor',
        unitPrice: 249.99,
        quantity: 45,
        vatRateType: VatRateType.STANDARD,
      },
      {
        name: "Laptop Stand",
        sku: "STAND-LAP-005",
        description: "Laptop Stand",
        unitPrice: 39.99,
        quantity: 0,
        vatRateType: VatRateType.STANDARD,
      },
    ]
  });
}

/* ----------------------------- SERVICES ------------------------------ */
async function createServices() {
  return prisma.service.createMany({
    data: [
      {
        name: "Website Development",
        code: "SRV-WEB-001",
        description: "Website Development",
        unitPrice: 75,
        durationHours: 40,
        vatRateType: VatRateType.STANDARD,
      },
      {
        name: "UI/UX Design",
        code: "SRV-DESIGN-002",
        description: "UI/UX Design",
        unitPrice: 65,
        durationHours: 20,
        vatRateType: VatRateType.STANDARD,
      },
      {
        name: "SEO Optimization",
        code: "SRV-SEO-003",
        description: "SEO Optimization",
        unitPrice: 55,
        durationHours: 10,
        vatRateType: VatRateType.STANDARD,
      },
      {
        name: "Server Maintenance",
        code: "SRV-MAINT-004",
        description: "Server Maintenance",
        unitPrice: 90,
        durationHours: 5,
        vatRateType: VatRateType.STANDARD,
      },
      {
        name: "Consulting",
        code: "SRV-CONSULT-005",
        description: "Consulting",
        unitPrice: 120,
        vatRateType: VatRateType.STANDARD,
      },
    ],
  });
}

/* ------------------------------ CLIENTS ------------------------------ */
async function createClients() {
  return prisma.client.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        company: "Doe Inc",
        phone: "+1234567890",
        address: "1 Main St",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        company: "Smith Corp",
        phone: "+1234567890",
        address: "2 Main St",
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        company: "Johnson Ltd",
        phone: "+1234567890",
        address: "3 Main St",
      },
      {
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@example.com",
        company: "Brown & Co",
        phone: "+1234567890",
        address: "4 Main St",
      },
      {
        firstName: "Charlie",
        lastName: "Davis",
        email: "charlie.davis@example.com",
        company: "Davis Tech",
        phone: "+1234567890",
        address: "5 Main St",
      },
    ],
  });
}

/* ----------------------------- ESTIMATES ----------------------------- */
async function createEstimates() {
  const clients = await prisma.client.findMany();
  const articles = await prisma.stockArticle.findMany();
  const services = await prisma.service.findMany();

  for (let i = 0; i < 4; i++) {
    const estimate = await prisma.estimate.create({
      data: {
        reference: `EST-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        status:
          i === 2
            ? EstimateStatus.Sent
            : i === 3
            ? EstimateStatus.Accepted
            : EstimateStatus.Draft,
        clientId: clients[i % clients.length].id,
        lines: {
          create: [
            {
              articleId: articles[0].id,
              quantity: 2,
              unitPrice: articles[0].unitPrice,
            },
            {
              articleId: articles[1].id,
              quantity: 1,
              unitPrice: articles[1].unitPrice,
            },
            {
              serviceId: services[0].id,
              quantity: 10,
              unitPrice: services[0].unitPrice,
            },
            {
              serviceId: services[1].id,
              quantity: 5,
              unitPrice: services[1].unitPrice,
            },
          ],
        },
      },
    });

    // Create invoice if accepted
    if (estimate.status === EstimateStatus.Accepted) {
      await prisma.invoice.create({
        data: {
          invoiceNumber: `F-${new Date().getFullYear()}-${String(i + 1).padStart(6, "0")}`,
          clientId: estimate.clientId,
          estimateId: estimate.id,
          issuedAt: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          lines: {
            create: estimate.lines.map((line: any) => ({
              articleId: line.articleId,
              serviceId: line.serviceId,
              quantity: line.quantity,
              unitPrice: line.unitPrice,
            })),
          },
        },
      });
    }
  }
}

/* ------------------------------- SEED ------------------------------- */
async function seed() {
  await createUser();
  await createArticles();
  await createServices();
  await createClients();
  await createEstimates();
}

seed()
  .then(() => console.log("🌱 Database seeded successfully"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });