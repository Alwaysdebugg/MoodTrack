import { useEffect, useRef } from 'react'
import { GoogleButtonConfig } from '../types'

interface GoogleLoginButtonProps {
  onSuccess?: () => void
  onError?: (error: any) => void
  theme?: GoogleButtonConfig['theme']
  size?: GoogleButtonConfig['size']
  text?: GoogleButtonConfig['text']
  shape?: GoogleButtonConfig['shape']
  width?: GoogleButtonConfig['width']
  className?: string
}

const GoogleLoginButton = ({
  onSuccess,
  onError,
  theme = 'outline',
  size = 'large',
  text = 'signin_with',
  shape = 'rectangular',
  width = 300,
  className = ''
}: GoogleLoginButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderButton = () => {
      if (window.google && buttonRef.current) {
        try {
          window.google.accounts.id.renderButton(buttonRef.current, {
            theme,
            size,
            text,
            shape,
            width,
            locale: 'zh_CN'
          })
          
          if (onSuccess) {
            onSuccess()
          }
        } catch (error) {
          console.error('Error rendering Google button:', error)
          if (onError) {
            onError(error)
          }
        }
      }
    }

    if (window.google) {
      renderButton()
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          renderButton()
          clearInterval(checkGoogle)
        }
      }, 100)

      return () => clearInterval(checkGoogle)
    }
  }, [theme, size, text, shape, width, onSuccess, onError])

  return (
    <div className={`google-login-button ${className}`}>
      <div ref={buttonRef}></div>
    </div>
  )
}

export default GoogleLoginButton