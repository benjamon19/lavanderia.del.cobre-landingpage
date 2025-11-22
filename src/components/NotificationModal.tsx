import { useEffect, useState } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa'

interface NotificationModalProps {
    isOpen: boolean
    onClose: () => void
    type: 'success' | 'error'
    title: string
    message: string
}

export default function NotificationModal({ isOpen, onClose, type, title, message }: NotificationModalProps) {
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

    return (
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'bg-black/50 backdrop-blur-sm opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'
                }`}
        >
            <div
                className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
            >
                {/* Header Color Bar */}
                <div className={`h-2 w-full ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FaTimes />
                </button>

                <div className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${type === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                        }`}>
                        {type === 'success' ? (
                            <FaCheckCircle className="text-3xl" />
                        ) : (
                            <FaExclamationCircle className="text-3xl" />
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition-all transform hover:-translate-y-0.5 hover:shadow-lg ${type === 'success'
                                ? 'bg-green-500 hover:bg-green-600 shadow-green-200'
                                : 'bg-red-500 hover:bg-red-600 shadow-red-200'
                            }`}
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    )
}
