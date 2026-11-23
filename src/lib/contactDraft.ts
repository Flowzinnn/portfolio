// Guarda a mensagem que o quiz monta, para pré-preencher o formulário de contato.
type Listener = () => void

let draft = ''
const listeners = new Set<Listener>()

export const contactDraft = {
  get: () => draft,
  set(value: string) {
    draft = value
    listeners.forEach((listener) => listener())
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
