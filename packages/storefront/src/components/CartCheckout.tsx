import { type FormEvent } from 'react'
import { useCart } from '../context/CartContext'
import type { PaymentMethod } from '../lib/cart.types'

interface CartCheckoutProps {
  onClose: () => void
}

export function CartCheckout({ onClose }: CartCheckoutProps) {
  const { state, updateDeliveryInfo, sendToWhatsApp } = useCart()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendToWhatsApp()
    onClose()
  }

  const setPaymentMethod = (method: PaymentMethod) => {
    updateDeliveryInfo({ paymentMethod: method })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Payment method */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-text/60 mb-2">
          Método de pago
        </p>
        <div className="flex gap-3">
          {(
            [
              { value: 'efectivo', label: 'Efectivo' },
              { value: 'transferencia', label: 'Transferencia' },
            ] as { value: PaymentMethod; label: string }[]
          ).map(({ value, label }) => (
            <label
              key={value}
              className={`flex items-center gap-1.5 cursor-pointer text-sm ${
                state.paymentMethod === value
                  ? 'text-brand-accent font-bold'
                  : 'text-brand-text/60'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={value}
                checked={state.paymentMethod === value}
                onChange={() => setPaymentMethod(value)}
                className="accent-brand-accent"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="checkout-notes"
          className="text-xs font-semibold uppercase tracking-wide text-brand-text/60 mb-1 block"
        >
          Notas (opcional)
        </label>
        <textarea
          id="checkout-notes"
          value={state.notes}
          onChange={(e) => updateDeliveryInfo({ notes: e.target.value })}
          placeholder="Algún detalle para tu pedido..."
          rows={2}
          className="w-full bg-brand-muted text-brand-text px-3 py-2 rounded text-sm placeholder:text-brand-text/30 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-brand-accent text-black font-bold py-3 rounded text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors"
      >
        📤 Enviar pedido por WhatsApp
      </button>
    </form>
  )
}
