// src/components/Contact.tsx
import { useState, type ChangeEvent, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const [status, setStatus] = useState<{
    loading: boolean
    success: string | null
    error: string | null
  }>({
    loading: false,
    success: null,
    error: null
  })

  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const fallbackTargetEmail = 'geometry257@gmail.com'
  const contactReceiverEmail = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || fallbackTargetEmail

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus({ loading: true, success: null, error: null })

    try {
      if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
        throw new Error('Falta configurar las credenciales de EmailJS en las variables de entorno.')
      }

      await emailjs.send(
        emailServiceId,
        emailTemplateId,
        {
          to_email: contactReceiverEmail,
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone || 'No proporcionado',
          service: formData.service,
          message: formData.message
        },
        {
          publicKey: emailPublicKey
        }
      )

      setStatus({
        loading: false,
        success: '¡Mensaje enviado! Te contactaremos pronto.',
        error: null
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
    } catch (error: any) {
      console.error('Error al enviar el mensaje de contacto:', error)
      setStatus({
        loading: false,
        success: null,
        error: error?.message || 'No pudimos enviar tu mensaje. Intenta nuevamente.'
      })
    }
  }

  return (
    <section
      id="contacto"
      className="py-20 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Contacto
          </h2>
          <p className="text-xl md:text-2xl text-[#ffe8e0]">Envíanos un mensaje</p>
        </header>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Imagen */}
          <div className="hidden lg:block lg:col-span-2">
            <img
              src="/images/contact/contacto-principal.png"
              alt="Contacto Lavandería el Cobre"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3 bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-base font-semibold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-[#ffe8e0] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-[#ffe8e0] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-semibold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-[#ffe8e0] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors"
                  placeholder="+56 9 XXXX XXXX"
                />
              </div>

              <div className="relative">
                <label htmlFor="service" className="block text-base font-semibold mb-2">
                  Servicio
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full appearance-none px-4 pr-12 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors"
                  required
                >
                  <option value="" className="text-[#1a1a2e]">Selecciona un servicio</option>
                  <option value="industrial-corporativa" className="text-[#1a1a2e]">Lavandería Industrial y Corporativa</option>
                  <option value="domestica-particular" className="text-[#1a1a2e]">Lavandería Doméstica y Particular</option>
                  <option value="retiro-entrega" className="text-[#1a1a2e]">Servicio de Retiro y Entrega</option>
                  <option value="otro" className="text-[#1a1a2e]">Otro / Consulta general</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-5 top-8 flex items-center text-white/70">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-semibold mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-[#ffe8e0] focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors"
                  placeholder="Cuéntanos qué necesitas..."
                  required
                ></textarea>
              </div>

              {status.success && (
                <p className="text-sm font-semibold text-green-200 bg-green-900/30 border border-green-300/40 rounded-xl px-4 py-3">
                  {status.success}
                </p>
              )}

              {status.error && (
                <p className="text-sm font-semibold text-red-100 bg-red-900/30 border border-red-300/40 rounded-xl px-4 py-3">
                  {status.error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-white text-[#ff6b35] px-8 py-4 rounded-xl hover:bg-[#fff4f0] transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={status.loading}
                aria-label="Enviar mensaje"
              >
                {status.loading ? 'Enviando...' : 'Enviar Mensaje'} <FaPaperPlane aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}