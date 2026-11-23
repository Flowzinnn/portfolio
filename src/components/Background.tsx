/** Fundo fixo: três manchas de cor que se movem bem devagar + textura sutil. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="noise absolute inset-0" />
    </div>
  )
}
