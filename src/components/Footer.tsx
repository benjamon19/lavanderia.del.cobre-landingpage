// src/components/Footer.tsx
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

interface FooterProps {
  scrollToSection: (id: string) => void
}

export default function Footer({ scrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'Servicios de Lavandería', id: 'servicios' },
    { label: 'Maquinaria', id: 'maquinaria' },
    { label: 'Recepción', id: 'recepcion' }
  ]

  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook', href: '#' },
    { icon: FaInstagram, label: 'Instagram', href: '#' },
    { icon: FaLinkedin, label: 'LinkedIn', href: '#' }
  ]

  return (
    <footer className="bg-[#1a1a2e] text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl" aria-hidden="true">LC</span>
              </div>
              <span className="ml-3 text-xl font-bold">Lavandería el Cobre</span>
            </div>
            <p className="text-[#a8a8ba] max-w-md text-base">
              Servicios de lavandería industrial, corporativa y doméstica en Calama.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <nav aria-label="Enlaces de servicios">
              <ul className="space-y-2 text-[#a8a8ba]">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(link.id)} 
                      className="hover:text-[#ff6b35] transition-colors text-base"
                      aria-label={`Ir a ${link.label}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <address className="not-italic space-y-2 text-[#a8a8ba] text-base">
              <p>+56 9 XXXX XXXX</p>
              <p>contacto@lavanderiacobre.cl</p>
              <p>Av. Balmaceda 1276, Calama</p>
            </address>
          </div>
        </div>

        <div className="border-t border-[#2c2c3e] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#a8a8ba] text-sm">
            © {currentYear} Lavandería el Cobre
          </p>
          <nav aria-label="Redes sociales">
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="text-[#a8a8ba] hover:text-[#ff6b35] transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="text-2xl" aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}