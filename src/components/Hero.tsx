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
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#ffb84d]/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a1a2e]/20 rounded-full blur-[100px]"></div>
        
        {/* Textura sutil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Contenido principal - con flex para distribuir el espacio */}
      <div className="relative z-10 h-full flex flex-col pt-20 pb-24 sm:pb-32 lg:pb-40">
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Contenido Izquierdo */}
              <div className="text-center lg:text-left">
                <h1 
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4 sm:mb-6 tracking-tight"
                >
                  Lavandería en{' '}
                  <span className="block text-[#ffb84d] mt-2">Calama</span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-10 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                  Servicios de lavandería, transporte y logística para empresas y particulares.
                </p>
                
                {/* Botones CTA mejorados */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection('contacto')} 
                    className="group bg-white text-[#ff6b35] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl hover:bg-[#fff4f0] transition-all duration-300 font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_-15px_rgba(255,107,53,0.4)] transform hover:-translate-y-1"
                    aria-label="Solicitar cotización"
                  >
                    Solicitar Cotización 
                    <FaArrowRight className="text-base sm:text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('servicios')} 
                    className="border-2 border-white/90 bg-white/5 backdrop-blur-sm text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl hover:bg-white hover:text-[#ff6b35] hover:border-white transition-all duration-300 font-bold text-base sm:text-lg"
                    aria-label="Ver servicios disponibles"
                  >
                    Ver Servicios
                  </button>
                </div>
              </div>

              {/* Imagen Derecha - OPTIMIZADA PARA MÓVILES */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
                  {/* Resplandor de fondo elegante */}
                  <div className="absolute -inset-6 lg:-inset-8 bg-gradient-to-br from-[#ffb84d]/25 via-[#ff8c5e]/15 to-transparent rounded-[2rem] blur-3xl"></div>
                  
                  {/* Container de imagen con mejor diseño */}
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
                    <img 
                      src="/placeholder.svg" 
                      alt="Instalaciones de Lavandería del Cobre en Calama" 
                      className="w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[480px] xl:h-[520px] object-cover"
                      loading="eager"
                    />
                    
                    {/* Overlay de fusión más elegante */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/15 via-transparent to-[#e85d2e]/25 mix-blend-overlay pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d14a20]/40 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Viñeta en bordes */}
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] rounded-2xl lg:rounded-3xl pointer-events-none"></div>
                  </div>

                  {/* Decoración flotante sutil */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 bg-[#ffb84d]/20 rounded-full blur-2xl hidden md:block" aria-hidden="true"></div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 lg:w-24 lg:h-24 bg-white/15 rounded-full blur-xl hidden md:block" aria-hidden="true"></div>
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