// src/components/Contact.tsx
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  const contactDetails = [
    {
      icon: FaPhone,
      title: 'Teléfono',
      content: '+56 9 XXXX XXXX'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'contacto@lavanderiacobre.cl'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Dirección',
      content: 'Calama, Antofagasta, Chile'
    },
    {
      icon: FaClock,
      title: 'Horario',
      content: 'Lun-Vie: 8:00-20:00 | Sáb: 9:00-14:00'
    }
  ]

  return (
    <section 
      id="contacto" 
      className="py-20 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Contacto
          </h2>
          <p className="text-xl md:text-2xl text-[#ffe8e0]">Envíanos un mensaje</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-base font-semibold mb-2">
                  Nombre
                </label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-[#ffe8e0] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-semibold mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-[#ffe8e0] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-semibold mb-2">
                  Teléfono
                </label>
                <input 
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-[#ffe8e0] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="+56 9 XXXX XXXX"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-base font-semibold mb-2">
                  Servicio
                </label>
                <select 
                  id="service"
                  name="service"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  required
                >
                  <option value="" className="text-[#1a1a2e]">Selecciona</option>
                  <option value="hoteles" className="text-[#1a1a2e]">Hoteles</option>
                  <option value="particular" className="text-[#1a1a2e]">Particular</option>
                  <option value="agua" className="text-[#1a1a2e]">Agua</option>
                  <option value="transporte" className="text-[#1a1a2e]">Transporte</option>
                  <option value="mineria" className="text-[#1a1a2e]">Minería</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-semibold mb-2">
                  Mensaje
                </label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-[#ffe8e0] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Cuéntanos qué necesitas..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-[#ff6b35] px-8 py-4 rounded-xl hover:bg-[#fff4f0] transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                aria-label="Enviar mensaje"
              >
                Enviar Mensaje <FaPaperPlane aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Información</h3>
              <div className="space-y-4">
                {contactDetails.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
                      aria-hidden="true"
                    >
                      <detail.icon className="text-2xl" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-lg">{detail.title}</p>
                      <p className="text-[#ffe8e0] text-base">{detail.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}