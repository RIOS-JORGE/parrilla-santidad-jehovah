import { STORE_NAME } from '../lib/constants'

export function AboutSection() {
  return (
    <section className="bg-brand-bg text-brand-text px-4 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-brand-accent">
          Nuestra Historia
        </h2>
        <div className="space-y-4 text-brand-text/80 text-lg leading-relaxed">
          <p>
            En {STORE_NAME}, cada hamburguesa es el resultado de una obsesión
            por la calidad. Seleccionamos los mejores cortes de carne, los
            molinos en nuestro local y los cocinamos a la parrilla para que
            cada bocado sea una experiencia única.
          </p>
          <p>
            Nacimos en Baradero con una idea simple: hamburguesas artesanales
            hechas como se merecen, con ingredientes frescos y mucho carácter.
            Sin vueltas, sin pretensiones. Solo buena comida.
          </p>
          <p>
            Creemos en lo simple bien hecho. Por eso nuestras papas se cortan
            a mano, nuestras salsas se preparan en el día y cada pedido se
            arma en el momento. Todo al fuego, todo fresco, todo brutal.
          </p>
        </div>
      </div>
    </section>
  )
}
