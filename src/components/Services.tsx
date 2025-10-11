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
    <section id="servicios" className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Servicios</h2>
          <p className="text-xl text-gray-600">Soluciones para cada necesidad</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <img src="/placeholder.svg" alt={service.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="text-2xl text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-orange-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}