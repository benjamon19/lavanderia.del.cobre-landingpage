// src/components/Footer.tsx
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

interface FooterProps {
  scrollToSection: (id: string) => void
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">LC</span>
              </div>
              <span className="ml-3 text-xl font-bold">Lavandería del Cobre</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Servicios de lavandería, transporte y logística en Calama.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('servicios')} className="hover:text-orange-400 transition-colors">Lavandería</button></li>
              <li><button onClick={() => scrollToSection('transporte')} className="hover:text-orange-400 transition-colors">Transporte</button></li>
              <li><button onClick={() => scrollToSection('servicios')} className="hover:text-orange-400 transition-colors">Agua</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+56 9 XXXX XXXX</li>
              <li>contacto@lavanderiacobre.cl</li>
              <li>Calama, Antofagasta</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Lavandería del Cobre
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}