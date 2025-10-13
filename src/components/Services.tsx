// src/components/Services.tsx
import { FaIndustry, FaTshirt, FaTruck } from 'react-icons/fa'

export default function Services() {
  const services = [
    {
      icon: FaIndustry,
      title: 'Lavandería Industrial y Corporativa',
      description: 'Servicio especializado para la industria hotelera, minera y clientes corporativos.',
      features: [
        'Procesamiento de grandes volúmenes',
        'Tratamiento especializado por tipo de tejido',
        'Cumplimiento de normativas industriales',
        'Servicio programado y express'
      ]
    },
    {
      icon: FaTshirt,
      title: 'Lavandería Doméstica y Particular',
      description: 'Tratamiento experto para todo tipo de tejidos y prendas del hogar.',
      features: [
        'Lavado y planchado profesional',
        'Cuidado especializado de prendas delicadas',
        'Conocimiento técnico en diversos tejidos',
        'Atención personalizada'
      ]
    },
    {
      icon: FaTruck,
      title: 'Servicio de Retiro y Entrega',
      description: 'Valor agregado para tu comodidad y mejor atención al cliente.',
      features: [
        'Recogida programada en tu domicilio',
        'Entrega puntual y segura',
        'Rutas establecidas',
        'Seguimiento de tu pedido'
      ]
    }
  ]

  return (
    <section 
      id="servicios" 
      className="py-20 bg-[#fff4f0]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
            Servicios
          </h2>
          <p className="text-xl md:text-2xl text-[#2c2c3e]">Soluciones para cada necesidad</p>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <article 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <img 
                src="/placeholder.svg" 
                alt={`Servicio de ${service.title}`}
                className="w-full h-48 object-cover" 
                loading="lazy"
              />
              <div className="p-6">
                <div 
                  className="w-12 h-12 bg-[#ffe8e0] rounded-lg flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <service.icon className="text-2xl text-[#ff6b35]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">{service.title}</h3>
                <p className="text-[#6b6b7e] mb-4">{service.description}</p>
                <ul className="text-sm text-[#2c2c3e] space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-[#ff6b35] mr-2" aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}