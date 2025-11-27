// src/components/Hero.tsx
import { FaArrowRight } from 'react-icons/fa'

interface HeroProps {
  scrollToSection: (id: string) => void
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section 
      id="inicio" 
      className="relative text-gray-900 overflow-hidden h-screen"
      style={{ backgroundColor: '#fdfdfc' }}
      aria-labelledby="hero-heading"
    >
      {/* Contenido principal */}
      <div className="relative z-10 h-full flex flex-col pt-20 lg:pt-16 xl:pt-20 2xl:pt-24 pb-16 sm:pb-20 lg:pb-20 xl:pb-24 2xl:pb-36">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-center">
              
              <div className="text-center lg:text-left">
                <h1 
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-bold leading-[1.1] mb-3 sm:mb-4 lg:mb-3 xl:mb-4 2xl:mb-5 tracking-tight text-gray-900"
                >
                  Lavandería <br className="hidden sm:block lg:hidden" />
                  El Cobre
                  {/* CORRECCIÓN CONTRASTE: Usamos un naranja más oscuro (#d64e1e) */}
                  <span className="block text-[#d64e1e] mt-2 text-3xl sm:text-4xl lg:text-4xl xl:text-5xl">
                    Servicio Experto en Calama
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-lg xl:text-xl 2xl:text-2xl text-gray-600 mb-5 sm:mb-6 lg:mb-5 xl:mb-7 2xl:mb-8 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                  Servicios de lavandería industrial, corporativa y doméstica en Calama.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  {/* Botón con naranja más oscuro */}
                  <button 
                    onClick={() => scrollToSection('contacto')} 
                    className="group bg-gradient-to-r from-[#e85d2e] to-[#c2410c] text-white px-6 sm:px-8 lg:px-7 xl:px-8 2xl:px-10 py-3 sm:py-4 lg:py-3.5 xl:py-4 2xl:py-5 rounded-2xl hover:shadow-lg transition-all duration-300 font-bold text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_-5px_rgba(232,93,46,0.3)] transform hover:-translate-y-1"
                    aria-label="Solicitar cotización"
                  >
                    Solicitar Cotización 
                    <FaArrowRight className="text-sm sm:text-base 2xl:text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                  {/* Botón secundario con bordes y texto más oscuros */}
                  <button 
                    onClick={() => scrollToSection('servicios')} 
                    // CAMBIO: Reemplazamos [#d64e1e] por [#c2410c] (Naranja accesible)
                    className="border-2 border-[#c2410c] bg-white text-[#c2410c] px-6 sm:px-8 lg:px-7 xl:px-8 2xl:px-10 py-3 sm:py-4 lg:py-3.5 xl:py-4 2xl:py-5 rounded-2xl hover:bg-[#fff4f0] transition-all duration-300 font-bold text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg shadow-sm"
                    aria-label="Ver servicios disponibles"
                  >
                    Ver Servicios
                  </button>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[460px] lg:max-w-[480px] xl:max-w-[520px] 2xl:max-w-[600px] pb-6 sm:pb-8 lg:pb-6 xl:pb-10 2xl:pb-12 px-4 md:px-2 lg:pr-4 xl:px-0">
                  <img 
                    src="/images/hero/lavanderia-principal.png" 
                    alt="Ilustración de servicios de Lavandería del Cobre en Calama" 
                    className="w-full h-auto object-contain"
                    loading="eager"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full" aria-hidden="true">
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 1440 200" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" 
            fill="url(#wave-gradient)"
            opacity="0.8"
          />
          <path 
            d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,144C672,139,768,149,864,149.3C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" 
            fill="#ff6b35"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#ff6b35', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}