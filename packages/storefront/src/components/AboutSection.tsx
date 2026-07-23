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
            La Brutal nació de una idea simple: hacer smash burgers como nos gusta comerlas a nosotros. Sin vueltas, con carne de calidad, ingredientes frescos y ese sellado en la plancha que les da un sabor único.
          </p>
          <p>
            Empezamos con la ilusión de crear un lugar donde cada hamburguesa se preparara en el momento, cuidando cada detalle para que cada pedido fuera una experiencia.
          </p>
          <p>
            Hoy seguimos con la misma pasión del primer día, buscando que cada persona que pruebe una de nuestras burgers quiera volver por otra.
          </p>
          <p>
            Porque una buena smash burger no se explica, se prueba. 🍔🔥
          </p>
        </div>
      </div>
    </section>
  )
}
