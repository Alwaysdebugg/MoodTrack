import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Heart } from 'lucide-react';

const LoginPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/home');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <Heart className="h-12 w-12 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">MoodTrack</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Mood Tracker
          </h2>
          <p className="text-gray-600 mb-8">
            Record your daily moods, share emotional experiences with others, and build better emotional health habits
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Login to Your Account
            </h3>
            <p className="text-gray-600 text-sm">
              Quick login with Google account, secure and convenient
            </p>
          </div>

          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By logging in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
              Mood Tracking
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
              Social Sharing
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              Data Analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
