import { STORE_HOURS, STORE_ADDRESS } from '../lib/constants'

const DAY_LABELS: Record<keyof typeof STORE_HOURS, string> = {
  fri: 'Viernes',
  sat: 'Sábados',
  sun: 'Domingo',
}

export function HoursSection() {
  return (
    <section className="bg-[#0a0a0a] text-[#f5f5f5] px-4 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-10 text-[#f59e0b]">
          Horarios y Ubicación
        </h2>

        <div className="bg-[#1a1a1a] p-6 md:p-8 mb-8">
          <table className="w-full text-left">
            <tbody>
              {(Object.keys(STORE_HOURS) as Array<keyof typeof STORE_HOURS>).map(
                (day) => (
                  <tr key={day} className="border-b border-[#0a0a0a] last:border-none">
                    <td className="py-3 font-bold text-[#f5f5f5]">
                      {DAY_LABELS[day]}
                    </td>
                    <td className="py-3 text-[#f5f5f5]/70 text-right">
                      {STORE_HOURS[day]}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <div className="text-[#f5f5f5]/80 space-y-2">
          <p className="font-bold text-[#f5f5f5]">{STORE_ADDRESS}</p>
          <p>Solo delivery y take away</p>
        </div>
      </div>
    </section>
  )
}
