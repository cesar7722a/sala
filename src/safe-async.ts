export type SafeResult<T> = [Error, null] | [null, T];

export async function safeAsync<T>(
  promise: Promise<T>,
): Promise<SafeResult<T>> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return [error, null];
  }
}

async function processarInscricao(alunoId: number) {
  // Chamada 1: Sem precisar de try/catch
  const [errPagamento, pagamento] = await safeAsync(
    verificarPagamento(alunoId),
  );
  if (errPagamento) {
    console.error("❌ Falha no pagamento:", errPagamento.message);
    return; // Pára aqui se der erro
  }
  console.log("✅ Pagamento confirmado:", pagamento);

  // Chamada 2: Liberação de acesso
  const [errAcesso, acesso] = await safeAsync(liberarAcessoCurso(5));
  if (errAcesso) {
    console.error("❌ Erro ao liberar acesso:", errAcesso.message);
    return;
  }
  console.log("🔓 Acesso libertado:", acesso);
  console.log("🎉 Aluno matriculado com sucesso no curso de Node.js!\n");
}

async function liberarAcessoCurso(
  cursoId: number,
): Promise<{ cursoId: number; liberado: boolean }> {
  return { cursoId, liberado: true };
}
async function main() {
  console.log("--- CENÁRIO 1: Aluno com Pagamento Válido (ID 101) ---");
  await processarInscricao(101);

  console.log(
    "--- CENÁRIO 2: Aluno sem Pagamento (ID 999 - Simulação de Falha) ---",
  );
  await processarInscricao(999);
}

main();

interface PagamentoInfo {
  alunoId: number;
  status: "pago" | "pendente";
  valor: number;
}

// Marcamos como 'async' para devolver uma Promise real com tipagem estrita
async function verificarPagamento(id: number): Promise<PagamentoInfo> {
  if (id === 101) {
    return { alunoId: id, status: "pago", valor: 15000 };
  } else {
    throw new Error("Aluno não efectuou o pagamento do curso!");
  }
}
