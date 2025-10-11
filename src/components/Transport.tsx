// src/components/Transport.tsx
import { FaBus, FaTruck } from 'react-icons/fa'

export default function Transport() {
  return (
    <section id="transporte" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Transporte</h2>
          <p className="text-xl text-gray-600">Servicios de logística</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Transporte Personal */}
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 shadow-lg border border-orange-100">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <FaBus className="text-3xl text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Personal</h3>
            <p className="text-gray-600 mb-6">
              Movilización segura para trabajadores.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="text-orange-600 mr-3">✓</span>
                <span>Vehículos modernos</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-orange-600 mr-3">✓</span>
                <span>Conductores con licencia A1</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-orange-600 mr-3">✓</span>
                <span>Seguimiento GPS</span>
              </li>
            </ul>
            <img src="/placeholder.svg" alt="Transporte Personal" className="w-full h-48 object-cover rounded-xl" />
          </div>

          {/* Transporte de Carga */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
              <FaTruck className="text-3xl text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Carga</h3>
            <p className="text-gray-600 mb-6">
              Logística eficiente para empresas.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="text-orange-600 mr-3">✓</span>
                <span>Flota propia</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-orange-600 mr-3">✓</span>
                <span>Carga seca y refrigerada</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-orange-600 mr-3">✓</span>
                <span>Seguro incluido</span>
              </li>
            </ul>
            <img src="/placeholder.svg" alt="Transporte de Carga" className="w-full h-48 object-cover rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}