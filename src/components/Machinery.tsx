// src/components/Machinery.tsx
import { FaCog, FaWind, FaShower } from 'react-icons/fa'

export default function Machinery() {
  const machines = [
    {
      icon: FaCog,
      title: 'Lavadoras Industriales',
      description: 'Alta capacidad'
    },
    {
      icon: FaWind,
      title: 'Secadoras Eficientes',
      description: 'Secado rápido'
    },
    {
      icon: FaShower,
      title: 'Sistema de Planchado',
      description: 'Acabado profesional'
    }
  ]

  return (
    <section 
      id="maquinaria" 
      className="py-20 bg-white"
      aria-labelledby="machinery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="machinery-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
            Maquinaria
          </h2>
          <p className="text-xl md:text-2xl text-[#2c2c3e]">Equipamiento moderno</p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-8">
          {machines.map((machine, index) => (
            <article 
              key={index} 
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src="/placeholder.svg" 
                alt={machine.title}
                className="w-full h-72 object-cover" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/50 to-transparent rounded-2xl flex items-end p-6 group-hover:from-[#ff6b35]/90 group-hover:via-[#ff6b35]/50 transition-all duration-300">
                <div className="text-white">
                  <div 
                    className="mb-3 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                    aria-hidden="true"
                  >
                    <machine.icon className="text-2xl" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{machine.title}</h3>
                  <p className="text-base text-white/90">{machine.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}