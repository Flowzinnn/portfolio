// Pequenos "estados globais" compartilhados entre seções da página.
type Listener = () => void

function createStore<T>(initial: T) {
  let value = initial
  const listeners = new Set<Listener>()
  return {
    get: () => value,
    set(next: T) {
      value = next
      listeners.forEach((listener) => listener())
    },
    subscribe(listener: Listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

/** Mensagem montada pelo quiz para pré-preencher o formulário de contato. */
export const contactDraft = createStore<{ message: string; quizId?: number } | null>(null)

/** Ramo escolhido numa página "IA para…": o quiz já começa com ele respondido. */
export const quizPrefill = createStore<string | null>(null)
