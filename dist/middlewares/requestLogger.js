export function requestLogger(req, _res, next) {
    console.log(`[INFO] ${req.method} ${req.originalUrl}`);
    next();
}
