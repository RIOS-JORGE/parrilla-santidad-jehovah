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
            Parrilla Santidad a Jehovah nació de una idea simple: hacer comidas de parrilla como nos gusta comerlas a nosotros. Sin vueltas, con carne de calidad, ingredientes frescos y ese sabor ahumado que solo la parrilla puede dar.
          </p>
          <p>
            Empezamos con la ilusión de crear un lugar donde cada plato se preparara en el momento, cuidando cada detalle para que cada pedido fuera una experiencia.
          </p>
          <p>
            Hoy seguimos con la misma pasión del primer día, buscando que cada persona que pruebe nuestra parrilla quiera volver por otra.
          </p>
          <p>
            Porque una buena parrilla no se explica, se prueba. 🔥
          </p>
        </div>
      </div>
    </section>
  )
}
