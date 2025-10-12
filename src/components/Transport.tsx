// src/components/Transport.tsx
import { FaBus, FaTruck } from 'react-icons/fa'

export default function Transport() {
  const transportServices = [
    {
      icon: FaBus,
      title: 'Personal',
      description: 'Movilización segura para trabajadores.',
      features: [
        'Vehículos modernos',
        'Conductores con licencia A1',
        'Seguimiento GPS'
      ],
      bgColor: 'from-[#ff6b35] to-[#e85d2e]',
      bgLight: 'bg-[#fff4f0]'
    },
    {
      icon: FaTruck,
      title: 'Carga',
      description: 'Logística eficiente para empresas.',
      features: [
        'Flota propia',
        'Carga seca y refrigerada',
        'Seguro incluido'
      ],
      bgColor: 'from-[#1a1a2e] to-[#2c2c3e]',
      bgLight: 'bg-[#f5f5f7]'
    }
  ]

  return (
    <section 
      id="transporte" 
      className="py-20 bg-white"
      aria-labelledby="transport-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="transport-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
            Transporte
          </h2>
          <p className="text-xl md:text-2xl text-[#2c2c3e]">Servicios de logística</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {transportServices.map((service, index) => (
            <article 
              key={index}
              className={`${service.bgLight} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#e8e8ec]`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <service.icon className="text-3xl text-white" aria-hidden="true" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
                {service.title}
              </h3>
              <p className="text-lg text-[#2c2c3e] mb-6">
                {service.description}
              </p>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-base md:text-lg text-[#1a1a2e] font-medium">
                    <span className="text-[#ff6b35] mr-3 text-xl" aria-hidden="true">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <img 
                src="/placeholder.svg" 
                alt={`Servicio de transporte ${service.title.toLowerCase()}`}
                className="w-full h-48 object-cover rounded-xl shadow-lg" 
                loading="lazy"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}