// src/components/Hero.tsx
import { FaArrowRight } from 'react-icons/fa'

interface HeroProps {
  scrollToSection: (id: string) => void
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section 
      className="relative bg-gradient-to-br from-[#ff6b35] via-[#e85d2e] to-[#d14a20] text-white overflow-hidden h-screen"
      aria-labelledby="hero-heading"
    >
      {/* Decoración de fondo mejorada */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Círculos de luz más sutiles */}
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] xl:w-[560px] xl:h-[560px] 2xl:w-[800px] 2xl:h-[800px] bg-[#ffb84d]/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[520px] h-[520px] xl:w-[420px] xl:h-[420px] 2xl:w-[600px] 2xl:h-[600px] bg-[#1a1a2e]/20 rounded-full blur-[100px]"></div>
        
        {/* Textura sutil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Contenido principal - con flex para distribuir el espacio */}
      <div className="relative z-10 h-full flex flex-col pt-24 xl:pt-24 2xl:pt-24 pb-24 sm:pb-28 lg:pb-36 xl:pb-32 2xl:pb-36">
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-10 2xl:gap-16 items-center">
              
              {/* Contenido Izquierdo */}
              <div className="text-center lg:text-left">
                <h1 
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.1] mb-3 sm:mb-5 tracking-tight"
                >
                  Lavandería en{' '}
                  <span className="block text-[#ffb84d] mt-2">Calama</span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-white/90 mb-5 sm:mb-8 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                  Servicios de lavandería industrial, corporativa y doméstica en Calama.
                </p>
                
                {/* Botones CTA mejorados */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection('contacto')} 
                    className="group bg-white text-[#ff6b35] px-6 sm:px-8 2xl:px-10 py-3 sm:py-4 2xl:py-5 rounded-2xl hover:bg-[#fff4f0] transition-all duration-300 font-bold text-sm sm:text-base 2xl:text-lg flex items-center justify-center gap-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_-15px_rgba(255,107,53,0.4)] transform hover:-translate-y-1"
                    aria-label="Solicitar cotización"
                  >
                    Solicitar Cotización 
                    <FaArrowRight className="text-sm sm:text-base 2xl:text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('servicios')} 
                    className="border-2 border-white/90 bg-white/5 backdrop-blur-sm text-white px-6 sm:px-8 2xl:px-10 py-3 sm:py-4 2xl:py-5 rounded-2xl hover:bg-white hover:text-[#ff6b35] hover:border-white transition-all duration-300 font-bold text-sm sm:text-base 2xl:text-lg"
                    aria-label="Ver servicios disponibles"
                  >
                    Ver Servicios
                  </button>
                </div>
              </div>

              {/* Imagen Derecha - OPTIMIZADA PARA MÓVILES */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[460px] lg:max-w-[560px] xl:max-w-[520px] 2xl:max-w-[600px] pb-8 sm:pb-10 lg:pb-12 px-4 md:px-2 lg:pr-4 xl:px-0">
                  {/* Resplandor de fondo elegante */}
                  <div className="absolute -inset-6 lg:-inset-8 bg-gradient-to-br from-[#ffb84d]/25 via-[#ff8c5e]/15 to-transparent rounded-[2rem] blur-3xl"></div>
                  
                  {/* Container de imagen con mejor diseño */}
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
                    <img 
                      src="/placeholder.svg" 
                      alt="Instalaciones de Lavandería del Cobre en Calama" 
                      className="w-full h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[440px] 2xl:h-[520px] max-h-[40vh] sm:max-h-[45vh] lg:max-h-[50vh] xl:max-h-[55vh] 2xl:max-h-[60vh] object-cover"
                      loading="eager"
                    />
                    
                    {/* Overlay de fusión más elegante */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/15 via-transparent to-[#e85d2e]/25 mix-blend-overlay pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d14a20]/40 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Viñeta en bordes */}
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] rounded-2xl lg:rounded-3xl pointer-events-none"></div>
                  </div>

                  {/* Decoración flotante sutil */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 lg:w-28 lg:h-28 xl:w-24 xl:h-24 2xl:w-32 2xl:h-32 bg-[#ffb84d]/20 rounded-full blur-2xl hidden md:block" aria-hidden="true"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-white/15 rounded-full blur-xl hidden md:block" aria-hidden="true"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Ola mejorada y más profesional - SIEMPRE ABAJO */}
      <div className="absolute bottom-0 left-0 right-0 w-full" aria-hidden="true">
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 1440 200" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Ola con degradado suave */}
          <path 
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" 
            fill="url(#wave-gradient)"
            opacity="0.8"
          />
          {/* Segunda capa de ola para más profundidad */}
          <path 
            d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,144C672,139,768,149,864,149.3C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" 
            fill="#ffffff"
          />
          
          {/* Degradado para la ola */}
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}