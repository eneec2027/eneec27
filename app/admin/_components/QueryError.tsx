/** A consulta à base de dados falhou — mostra o que falhou, não um ecrã vazio. */
export function QueryError({ message }: { message: string }) {
  return (
    <div className="p-5 sm:p-8">
      <div className="border border-red-400/25 bg-red-400/[0.04] rounded-sm p-5 max-w-xl">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-red-400/80 mb-2">
          Falha na leitura
        </p>
        <p className="text-foreground text-sm leading-relaxed mb-3">
          Não foi possível ler os dados. Recarrega a página; se continuar, é a
          ligação à base de dados que está em baixo.
        </p>
        <p className="font-mono text-[11px] text-muted-foreground/70 break-words">{message}</p>
      </div>
    </div>
  )
}
