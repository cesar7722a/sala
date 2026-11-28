/**
 * Middleware Global de Tratamento de Erros
 * Obrigatório ter exactamente 4 argumentos: (err, req, res, next)
 */
export function errorHandler(err, _req, res, _next) {
    console.error("💥 [Erro Global Capturado]:", err.message);
    return res.status(400).json({
        success: false,
        error: "Erro na requisição",
        details: err.message,
        timestamp: new Date().toISOString(),
    });
}
