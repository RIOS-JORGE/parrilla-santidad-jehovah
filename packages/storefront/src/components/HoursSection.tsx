import { STORE_HOURS, STORE_ADDRESS, STORE_MAPS_URL } from '../lib/constants'

const DAY_LABELS: Record<keyof typeof STORE_HOURS, string> = {
  fri: 'Viernes',
}

export function HoursSection() {
  return (
    <section className="bg-brand-bg text-brand-text px-4 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-10 text-brand-accent">
          Horarios y Ubicación
        </h2>

        <div className="bg-brand-surface p-6 md:p-8 mb-8">
          <table className="w-full text-left">
            <tbody>
              {(Object.keys(STORE_HOURS) as Array<keyof typeof STORE_HOURS>).map(
                (day) => (
                  <tr key={day} className="border-b border-brand-bg last:border-none">
                    <td className="py-3 font-bold text-brand-text">
                      {DAY_LABELS[day]}
                    </td>
                    <td className="py-3 text-brand-text/70 text-right">
                      {STORE_HOURS[day]}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <div className="text-brand-text/80 space-y-2">
          <a
            href={STORE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-brand-text hover:text-brand-accent transition-colors inline-flex items-center gap-2"
          >
            📍 {STORE_ADDRESS}
          </a>
          <p>
            <a
              href={STORE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
            >
              Cómo llegar en Google Maps
            </a>
          </p>
          <p>Solo delivery y take away</p>
        </div>
      </div>
    </section>
  )
}
