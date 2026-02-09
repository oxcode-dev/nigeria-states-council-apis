
const adminMiddleware = (req, res, next) => {
    // Assuming authMiddleware has run and attached req.user
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
    next();
};

export { adminMiddleware };