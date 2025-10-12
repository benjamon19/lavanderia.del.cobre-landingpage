// src/components/Services.tsx
import { FaHotel, FaTshirt, FaTint, FaUsers, FaTruck, FaHardHat } from 'react-icons/fa'

export default function Services() {
  const services = [
    {
      icon: FaHotel,
      title: 'Hoteles',
      description: 'Servicio de lavandería para la industria hotelera.',
      features: ['Recogida programada', 'Lavado profesional', 'Servicio express']
    },
    {
      icon: FaTshirt,
      title: 'Particular',
      description: 'Lavado de ropa personal con cuidado profesional.',
      features: ['Lavado y planchado', 'Prendas delicadas', 'Precios accesibles']
    },
    {
      icon: FaTint,
      title: 'Venta de Agua',
      description: 'Agua purificada de calidad.',
      features: ['Bidones varios tamaños', 'Entrega a domicilio', 'Certificación sanitaria']
    },
    {
      icon: FaUsers,
      title: 'Transporte Personal',
      description: 'Movilización segura de trabajadores.',
      features: ['Vehículos modernos', 'Conductores profesionales', 'Rutas flexibles']
    },
    {
      icon: FaTruck,
      title: 'Transporte de Carga',
      description: 'Logística y transporte para empresas.',
      features: ['Carga liviana y pesada', 'Seguimiento GPS', 'Seguro incluido']
    },
    {
      icon: FaHardHat,
      title: 'Minería',
      description: 'Lavado industrial especializado.',
      features: ['Alto volumen', 'Tratamiento especializado', 'Normativas cumplidas']
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