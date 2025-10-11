// src/components/Reception.tsx
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

export default function Reception() {
  return (
    <section id="recepcion" className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Recepción</h2>
            <p className="text-xl text-gray-600 mb-8">
              Atención personalizada en nuestras instalaciones.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-2xl text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Horario</h3>
                  <p className="text-gray-600">Lun-Vie: 8:00 - 20:00</p>
                  <p className="text-gray-600">Sábados: 9:00 - 14:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-2xl text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Ubicación</h3>
                  <p className="text-gray-600">Calama, Región de Antofagasta</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-2xl text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Teléfono</h3>
                  <p className="text-gray-600">+56 9 XXXX XXXX</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-2xl text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">contacto@lavanderiacobre.cl</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <img src="/placeholder.svg" alt="Recepción" className="w-full h-96 object-cover rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}