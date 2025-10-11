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
    <section id="maquinaria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Maquinaria</h2>
          <p className="text-xl text-gray-600">Equipamiento moderno</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {machines.map((machine, index) => (
            <div key={index} className="relative group">
              <img src="/placeholder.svg" alt={machine.title} className="w-full h-72 object-cover rounded-2xl shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent rounded-2xl flex items-end p-6">
                <div className="text-white">
                  <machine.icon className="text-3xl mb-3 text-orange-300" />
                  <h3 className="text-2xl font-bold mb-2">{machine.title}</h3>
                  <p className="text-sm text-orange-100">{machine.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}