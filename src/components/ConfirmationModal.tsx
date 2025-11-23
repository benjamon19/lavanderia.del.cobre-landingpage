// src/components/ConfirmationModal.tsx
import { useEffect, useState } from 'react'
import { FaQuestionCircle, FaTimes } from 'react-icons/fa'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info' // Para cambiar el color del encabezado/botón
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning'
}: ConfirmationModalProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    } else {
      const timer = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!show && !isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  // Configuración de colores según el tipo
  const colors = {
    danger: { bar: 'bg-red-500', icon: 'bg-red-100 text-red-500', btn: 'bg-red-500 hover:bg-red-600 shadow-red-200' },
    warning: { bar: 'bg-[#ff6b35]', icon: 'bg-orange-100 text-[#ff6b35]', btn: 'bg-[#ff6b35] hover:bg-[#e85d2e] shadow-orange-200' },
    info: { bar: 'bg-blue-500', icon: 'bg-blue-100 text-blue-500', btn: 'bg-blue-500 hover:bg-blue-600 shadow-blue-200' }
  }

  const currentStyle = colors[type]

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'bg-black/50 backdrop-blur-sm opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden transform transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Barra de color superior */}
        <div className={`h-2 w-full ${currentStyle.bar}`} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes />
        </button>

        <div className="p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${currentStyle.icon}`}>
            <FaQuestionCircle className="text-3xl" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h3>

          <p className="text-gray-600 mb-6">
            {message}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 py-2.5 font-semibold text-white rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${currentStyle.btn}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}