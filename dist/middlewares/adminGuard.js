/**
 * Middleware de Rota: Protecção de Endpoints Administrativos
 * Exige o cabeçalho 'x-admin-key' com valor 'secret123'
 */
export function adminGuard(req, res, next) {
    const adminKey = req.headers["x-admin-key"];
    if (!adminKey || adminKey !== "secret123") {
        return res.status(403).json({
            success: false,
            error: "Acesso negado: cabeçalho 'x-admin-key' inválido ou ausente.",
        });
    }
    return next();
}
