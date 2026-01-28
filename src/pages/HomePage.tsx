import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  TrendingUp,
  Calendar,
  Brain,
  Loader2,
  FileText,
} from 'lucide-react';
import { apiRequest } from '../utils/api';

const HomePage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  // Get date range for last 7 days
  const getLast7DateRange = (): { startDate: string; endDate: string } => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };

  // AI analysis API call
  const generateAnalysisReport = async () => {
    setIsGenerating(true);
    setAnalysisResult(null);

    try {
      const dateRange = getLast7DateRange();
      const reqBody = {
        analysisType: 'weekly',
        dateRange,
        preferences: {
          language: 'en-US',
          depth: 'detailed',
          focusAreas: ['stress', 'sleep', 'work'],
        },
      };

      const response = await apiRequest('/api/v1/ai-analysis/generate', {
        method: 'POST',
        data: reqBody,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Analysis request failed');
      }

      console.log('AI analysis result:', result.data);
      setAnalysisResult(result.data);
    } catch (error) {
      console.error('Failed to generate analysis:', error);
      setAnalysisResult('An error occurred during analysis. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to MoodTrack
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your mood changes, understand emotional patterns, and make every day more meaningful
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card text-center">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Track Mood</h3>
          <p className="text-gray-600 mb-4">Quickly record your current mood</p>
          <Link to="/track" className="btn btn-primary">
            Start Tracking
          </Link>
        </div>

        <div className="card text-center">
          <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
          <p className="text-gray-600 mb-4">View mood trends and statistics</p>
          <Link to="/history" className="btn btn-secondary">
            View Analysis
          </Link>
        </div>

        <div className="card text-center">
          <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">History</h3>
          <p className="text-gray-600 mb-4">Browse past mood records</p>
          <Link to="/history" className="btn btn-secondary">
            View History
          </Link>
        </div>
      </div>

      {/* AI Analysis Panel */}
      <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-none">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-purple-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">
              AI Mood Analysis
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Generate personalized emotional analysis reports based on your mood records
          </p>

          {!analysisResult ? (
            <button
              onClick={generateAnalysisReport}
              disabled={isGenerating}
              className={`btn text-lg px-8 py-3 ${
                isGenerating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Analysis Report
                </>
              )}
            </button>
          ) : (
            <div className="text-left">
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-4 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                    {analysisResult}
                  </pre>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={generateAnalysisReport}
                  disabled={isGenerating}
                  className="btn btn-secondary"
                >
                  🔄 Regenerate Analysis
                </button>
                <button
                  onClick={() => setAnalysisResult(null)}
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  ✨ Generate New Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
