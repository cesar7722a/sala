import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
export async function analyzeDirectory(dirPath) {
    const resolvedPath = path.resolve(dirPath);
    try {
        // 1. Ler o conteúdo da pasta de forma assíncrona
        const entries = await fs.readdir(resolvedPath, { withFileTypes: true });
        const reports = [];
        // Extensões de texto suportadas para contagem de linhas
        const textExtensions = [".ts", ".js", ".json", ".md", ".txt", ".env"];
        for (const entry of entries) {
            if (entry.isFile()) {
                const ext = path.extname(entry.name);
                if (textExtensions.includes(ext) || entry.name.startsWith(".")) {
                    const filePath = path.join(resolvedPath, entry.name);
                    // 2. Metadados do ficheiro (tamanho em bytes)
                    const fileStat = await fs.stat(filePath);
                    // 3. Leitura assíncrona para contagem de linhas
                    const content = await fs.readFile(filePath, "utf-8");
                    const lineCount = content.split("\n").length;
                    reports.push({
                        fileName: entry.name,
                        extension: ext || "sem extensão",
                        sizeBytes: fileStat.size,
                        lineCount,
                    });
                }
            }
        }
        if (reports.length === 0) {
            console.log(`Nenhum ficheiro de texto encontrado na directoria: ${resolvedPath}`);
            return;
        }
        // 4. Apresentação dos resultados
        console.log(`\n Relatório de Análise da Pasta: ${resolvedPath}`);
        console.table(reports);
        const totalLines = reports.reduce((acc, curr) => acc + curr.lineCount, 0);
        const totalBytes = reports.reduce((acc, curr) => acc + curr.sizeBytes, 0);
        console.log(`Totais: ${reports.length} ficheiros | ${totalLines} linhas | ${(totalBytes / 1024).toFixed(2)} KB\n`);
    }
    catch (error) {
        if (error.code === "ENOENT") {
            console.error(`[ERRO]: A directoria "${resolvedPath}" não existe!`);
        }
        else {
            console.error(`[ERRO INESPERADO]:`, error.message);
        }
        process.exit(1);
    }
}
// 5. Captura do argumento via terminal
const targetDir = process.argv[2];
if (!targetDir) {
    console.error("[ERRO]: Deves informar o caminho da pasta a analisar.");
    console.log("Exemplo de uso: npm run analyze src");
    process.exit(1);
}
await analyzeDirectory(targetDir);
