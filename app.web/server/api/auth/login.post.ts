import users from '../../../prisma/repos/users';

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        });
    }

    // Find user
    const user = await users.GetByEmailAndPassword(email, password);
    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Invalid credentials'
        })
    }

    // Set user session
    await setUserSession(event, {
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    })

    return {
        id: user.id,
        email: user.email,
        name: user.name
    };
})