import { useEffect, useRef } from 'react';
import { authAPI } from '../utils/api';

interface GoogleLoginButtonProps {
  onSuccess?: (res: any) => void;
  onError?: (error: any) => void;
  className?: string;
  disabled?: boolean;
}

const GoogleLoginButton = ({
  onSuccess,
  onError,
  className = '',
  disabled = false,
}: GoogleLoginButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleCallbackResponse = async (response: any) => {
    try {
      // Verify Google Credential with backend
      const res = await authAPI.verifyGoogleCredential(response.credential);
      if (res) {
        if (onSuccess) onSuccess(res);
      } else {
        console.error('Google login error:', res);
        if (onError) onError(res);
      }
    } catch (error) {
      console.error('Error initiating Google login:', error);
      if (onError) {
        onError(error);
      }
    }
  };

  useEffect(() => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(buttonRef.current!, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
    });
  }, [GOOGLE_CLIENT_ID, onSuccess, onError]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button disabled className={className}>
        Google login not configured
      </button>
    );
  }

  return (
    <div className={className}>
      <div
        ref={buttonRef}
        className={disabled ? 'opacity-50 pointer-events-none' : ''}
      />
    </div>
  );
};

export default GoogleLoginButton;
