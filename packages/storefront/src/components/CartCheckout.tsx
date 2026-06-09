import { type FormEvent } from 'react'
import { useCart } from '../context/CartContext'
import type { DeliveryMode, PaymentMethod } from '../lib/cart.types'

interface CartCheckoutProps {
  onClose: () => void
}

export function CartCheckout({ onClose }: CartCheckoutProps) {
  const { state, updateDeliveryInfo, sendToWhatsApp } = useCart()

  const isDelivery = state.deliveryMode === 'delivery'
  const canSubmit = !isDelivery || state.address.trim().length > 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    sendToWhatsApp()
    onClose()
  }

  const setDeliveryMode = (mode: DeliveryMode) => {
    updateDeliveryInfo({ deliveryMode: mode })
  }

  const setPaymentMethod = (method: PaymentMethod) => {
    updateDeliveryInfo({ paymentMethod: method })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Delivery/Take away toggle */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-text/60 mb-2">
          Retiro
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDeliveryMode('delivery')}
            className={`flex-1 py-2 rounded text-sm font-bold transition-colors ${
              isDelivery
                ? 'bg-brand-accent text-black'
                : 'bg-brand-muted text-brand-text/60'
            }`}
          >
            Delivery
          </button>
          <button
            type="button"
            onClick={() => setDeliveryMode('takeaway')}
            className={`flex-1 py-2 rounded text-sm font-bold transition-colors ${
              !isDelivery
                ? 'bg-brand-accent text-black'
                : 'bg-brand-muted text-brand-text/60'
            }`}
          >
            Take away
          </button>
        </div>
      </div>

      {/* Address field — only when delivery */}
      {isDelivery && (
        <div>
          <label
            htmlFor="checkout-address"
            className="text-xs font-semibold uppercase tracking-wide text-brand-text/60 mb-1 block"
          >
            Dirección
          </label>
          <input
            id="checkout-address"
            type="text"
            value={state.address}
            onChange={(e) => updateDeliveryInfo({ address: e.target.value })}
            placeholder="Calle y número"
            className="w-full bg-brand-muted text-brand-text px-3 py-2 rounded text-sm placeholder:text-brand-text/30"
          />
        </div>
      )}

      {/* Floor / Apt — optional, only when delivery */}
      {isDelivery && (
        <div>
          <label
            htmlFor="checkout-floor"
            className="text-xs font-semibold uppercase tracking-wide text-brand-text/60 mb-1 block"
          >
            Piso / Dpto (opcional)
          </label>
          <input
            id="checkout-floor"
            type="text"
            value={state.floor ?? ''}
            onChange={(e) => updateDeliveryInfo({ floor: e.target.value })}
            placeholder="Piso, departamento"
            className="w-full bg-brand-muted text-brand-text px-3 py-2 rounded text-sm placeholder:text-brand-text/30"
          />
        </div>
      )}

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
              { value: 'tarjeta', label: 'Tarjeta' },
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
        disabled={!canSubmit}
        className="w-full bg-brand-accent text-black font-bold py-3 rounded text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        📤 Enviar pedido por WhatsApp
      </button>
    </form>
  )
}
