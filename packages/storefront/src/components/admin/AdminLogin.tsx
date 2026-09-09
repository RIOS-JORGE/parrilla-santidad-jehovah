import { useState, type FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'

export function AdminLogin() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const result = await signIn(email, password)
    setSubmitting(false)

    if (result.error) {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-brand-text font-black text-2xl uppercase tracking-wide">
            Admin
          </h1>
          <p className="text-brand-text/60 text-sm mt-1">
            Parrilla Santidad a Jehovah
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-brand-surface p-6 flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-brand-text/70 text-xs uppercase tracking-wider mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full bg-brand-bg border border-brand-muted p-2 text-brand-text text-sm outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-brand-text/70 text-xs uppercase tracking-wider mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-brand-bg border border-brand-muted p-2 text-brand-text text-sm outline-none focus:border-brand-accent"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-accent text-black font-bold py-2 text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
          >
            {submitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
