import type { CartItem, CartState, PaymentMethod } from './cart.types'

const ORDER_PREFIX = '🍔 Pedido - La Brutal Hamburguesería'
const MAX_MESSAGE_LENGTH = 2048

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('es-AR')}`
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function paymentMethodLabel(method: PaymentMethod): string {
  const labels: Record<PaymentMethod, string> = {
    efectivo: 'Efectivo',
    transferencia: 'Transferencia',

  }
  return labels[method]
}

export function formatCartMessage(state: CartState): string {
  const lines: string[] = []

  lines.push(ORDER_PREFIX)
  lines.push('')

  for (const item of state.items) {
    lines.push(`${item.quantity}x ${item.title} - ${formatPrice(item.price)}`)
  }

  lines.push('')
  lines.push('─────────────────')
  const total = calculateTotal(state.items)
  lines.push(`Total: ${formatPrice(total)}`)
  lines.push('')

  if (state.deliveryMode === 'delivery') {
    lines.push('📍 Delivery')
    lines.push(`   ${state.address}`)
    if (state.floor) {
      lines.push(`   ${state.floor}`)
    }
  } else {
    lines.push('📍 Takeaway')
  }

  lines.push(`💳 Pago: ${paymentMethodLabel(state.paymentMethod)}`)

  if (state.notes.trim()) {
    lines.push(`📝 ${state.notes.trim()}`)
  } else {
    lines.push('📝 Sin notas')
  }

  const message = lines.join('\n')

  if (message.length > MAX_MESSAGE_LENGTH) {
    return message.slice(0, MAX_MESSAGE_LENGTH - 1) + '…'
  }

  return message
}

export function buildWhatsAppUrl(
  message: string,
  phoneNumber: string,
): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
