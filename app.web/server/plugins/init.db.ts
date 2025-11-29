import users from "../prisma/users";

export default defineNitroPlugin(async (nitroApp) => {
    console.log('Initializing database...');
    // Create default admin user if not exists (for development purposes)
    if (await users.GetByEmailAndPassword("admin@localhost.com", "Test1234") == null) {
        await users.create("admin@localhost.com", "Test1234", "Administrator");
    }
});