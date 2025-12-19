export default defineEventHandler(async (event) => {
    const path = event.path || '';
    if (path.startsWith('/api') == false) return;
    // Exclude all routes under /api/auth/*
    if (path.startsWith('/api/auth/')) return;

    // Require user session for all other routes
    await requireUserSession(event);
});