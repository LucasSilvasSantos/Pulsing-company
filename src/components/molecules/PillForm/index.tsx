import { useState, useId } from 'react'
import { Button } from '@/components/atoms/Button'

interface PillFormProps {
  onSuccess?: () => void
  placeholder?: string
  buttonLabel?: string
}

const EMAIL_RE = /^[^@]+@[^@.]+\.[^@]+$/

export function PillForm({
  onSuccess,
  placeholder = 'Seu e-mail',
  buttonLabel = 'Enviar',
}: PillFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const errorId = useId()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('Insira um e-mail válido.')
      return
    }
    setError('')
    setEmail('')
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        className="flex items-center gap-1 p-[6px] rounded-full bg-white/[0.04] border border-line-2 focus-within:border-accent transition-colors duration-200"
      >
        <label htmlFor={`${errorId}-input`} className="sr-only">
          {placeholder}
        </label>
        <input
          id={`${errorId}-input`}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          placeholder={placeholder}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          className="flex-1 bg-transparent text-[13px] text-fg placeholder:text-fg-4 px-4 py-1 outline-none min-w-0"
        />
        <Button type="submit" variant="primary" size="compact">
          {buttonLabel}
        </Button>
      </div>
      {error && (
        <p
          id={errorId}
          aria-live="polite"
          className="mt-2 text-[12px] text-accent pl-4"
        >
          {error}
        </p>
      )}
    </form>
  )
}
