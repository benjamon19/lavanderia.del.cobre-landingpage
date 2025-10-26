// src/components/Reception.tsx
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

export default function Reception() {
  const contactInfo = [
    {
      icon: FaClock,
      title: 'Horario',
      lines: ['Lun-Vie: 8:00 - 20:00', 'Sábados: 9:00 - 14:00']
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Ubicación',
      lines: ['Av. Balmaceda 1276', 'Calama, Región de Antofagasta']
    },
    {
      icon: FaPhone,
      title: 'Teléfono',
      lines: ['+56 9 XXXX XXXX']
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      lines: ['contacto@lavanderiacobre.cl']
    }
  ]

  return (
    <section 
      id="recepcion" 
      className="py-20 bg-[#fff4f0]"
      aria-labelledby="reception-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="reception-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-6">
              Recepción
            </h2>
            <p className="text-xl md:text-2xl text-[#2c2c3e] mb-8">
              Atención personalizada en nuestras instalaciones.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div 
                    className="w-14 h-14 bg-[#ffe8e0] rounded-xl flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <info.icon className="text-2xl text-[#ff6b35]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a1a2e] mb-1">
                      {info.title}
                    </h3>
                    {info.lines.map((line, idx) => (
                      <p key={idx} className="text-base md:text-lg text-[#2c2c3e]">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img 
              src="/images/reception.webp"
              alt="Recepción Lavandería del Cobre en Calama"
              className="w-full h-96 object-cover object-top rounded-2xl shadow-2xl" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}