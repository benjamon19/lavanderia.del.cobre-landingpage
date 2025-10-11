// src/components/Contact.tsx
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-xl text-orange-100">Envíanos un mensaje</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Teléfono</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="+56 9 XXXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Servicio</label>
                <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <option value="" className="text-gray-900">Selecciona</option>
                  <option value="hoteles" className="text-gray-900">Hoteles</option>
                  <option value="particular" className="text-gray-900">Particular</option>
                  <option value="agua" className="text-gray-900">Agua</option>
                  <option value="transporte" className="text-gray-900">Transporte</option>
                  <option value="mineria" className="text-gray-900">Minería</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mensaje</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Cuéntanos qué necesitas..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-orange-50 transition-all font-bold text-lg flex items-center justify-center gap-2"
              >
                Enviar Mensaje <FaPaperPlane />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Información</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Teléfono</p>
                    <p className="text-orange-100">+56 9 XXXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Email</p>
                    <p className="text-orange-100">contacto@lavanderiacobre.cl</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Dirección</p>
                    <p className="text-orange-100">Calama, Antofagasta, Chile</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Horario</p>
                    <p className="text-orange-100">Lun-Vie: 8:00-20:00 | Sáb: 9:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}