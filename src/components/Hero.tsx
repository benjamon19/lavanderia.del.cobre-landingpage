// src/components/Hero.tsx
import { FaArrowRight } from 'react-icons/fa'

interface HeroProps {
  scrollToSection: (id: string) => void
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section className="pt-16 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Lavandería en Calama
            </h1>
            <p className="text-xl text-orange-50 mb-8">
              Servicios de lavandería, transporte y logística para empresas y particulares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contacto')} 
                className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-all font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                Solicitar Cotización <FaArrowRight />
              </button>
              <button 
                onClick={() => scrollToSection('servicios')} 
                className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-all font-semibold"
              >
                Ver Servicios
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/placeholder.svg" 
              alt="Lavandería" 
              className="rounded-2xl shadow-2xl w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}