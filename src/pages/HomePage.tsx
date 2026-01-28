import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  TrendingUp,
  Calendar,
  Brain,
  Loader2,
  FileText,
  RefreshCw,
} from 'lucide-react';

const HomePage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Mock analysis report
  const mockAnalysisReport = `# Weekly Mood Analysis Report

## Overview
Based on your mood entries over the past 7 days, here's a comprehensive analysis of your emotional patterns and well-being.

## Mood Trends
Your average mood score this week was 3.4 out of 5, showing a slight improvement from the previous week. You experienced:
- 2 days with positive moods (4-5)
- 3 days with neutral moods (3)
- 2 days with challenging moods (1-2)

## Key Insights

### Stress Patterns
Work-related stress appears to be your primary trigger, mentioned in 60% of your entries. The stress levels tend to peak mid-week, suggesting a correlation with workload accumulation.

### Sleep Quality Impact
Your mood shows a strong correlation with sleep quality. Days following good sleep (7+ hours) consistently show higher mood scores, averaging 4.2 compared to 2.8 on days with less sleep.

### Positive Moments
You've been experiencing more positive interactions recently, particularly around social activities and personal growth. These moments are contributing to an overall upward trend in your emotional well-being.

## Recommendations

1. **Sleep Optimization**: Prioritize 7-8 hours of sleep, especially on weekdays. Consider establishing a consistent bedtime routine.

2. **Stress Management**: Implement short breaks during work hours. The data suggests that brief mindfulness exercises could help manage mid-week stress spikes.

3. **Social Connection**: Continue engaging in social activities - they're showing positive impact on your mood patterns.

4. **Mood Tracking**: Keep tracking your moods daily. The consistency in your entries is helping identify valuable patterns.

## Weekly Summary
This week shows resilience and growth. While challenges exist, your ability to recognize and track your emotional state is a positive step toward better mental well-being. Keep up the great work!

---
*Report generated on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}*`;

  // Simulate streaming text display
  const streamText = (text: string, onUpdate: (current: string) => void) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        onUpdate(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        setIsGenerating(false);
      }
    }, 20); // Adjust speed: lower = faster
  };

  // Generate mock analysis report with streaming
  const generateAnalysisReport = async () => {
    setIsGenerating(true);
    setIsStreaming(true);
    setAnalysisResult('');

    // Simulate API delay before starting stream
    setTimeout(() => {
      streamText(mockAnalysisReport, (currentText) => {
        setAnalysisResult(currentText);
      });
    }, 500);
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-apple-text mb-6 tracking-tight leading-tight">
          Welcome to MoodTrack
        </h1>
        <p className="text-xl text-apple-secondary leading-relaxed">
          Track your mood changes, understand emotional patterns, and make every day more meaningful
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="card text-center group hover:scale-105 transition-transform duration-500">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:shadow-xl group-hover:shadow-red-500/40 transition-all duration-500">
            <Heart className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-apple-text">Track Mood</h3>
          <p className="text-apple-secondary mb-6 leading-relaxed">Quickly record your current mood state</p>
          <Link to="/track" className="btn btn-primary w-full">
            Start Tracking
          </Link>
        </div>

        <div className="card text-center group hover:scale-105 transition-transform duration-500">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-500">
            <TrendingUp className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-apple-text">Trend Analysis</h3>
          <p className="text-apple-secondary mb-6 leading-relaxed">View mood change trends and statistics</p>
          <Link to="/history" className="btn btn-secondary w-full">
            View Analysis
          </Link>
        </div>

        <div className="card text-center group hover:scale-105 transition-transform duration-500">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-500">
            <Calendar className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-apple-text">History</h3>
          <p className="text-apple-secondary mb-6 leading-relaxed">Browse your past mood records</p>
          <Link to="/history" className="btn btn-secondary w-full">
            View History
          </Link>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="card bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-indigo-50/50 border-purple-200/30 shadow-apple-lg mt-16">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mr-4">
              <Brain className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-semibold text-apple-text tracking-tight">
              AI Mood Analysis
            </h2>
          </div>
          <p className="text-lg text-apple-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Generate personalized emotional analysis reports based on your mood records
          </p>

          {!analysisResult && !isGenerating ? (
            <button
              onClick={generateAnalysisReport}
              disabled={isGenerating}
              className={`btn text-lg px-10 py-4 ${
                isGenerating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary shadow-apple-lg hover:shadow-apple-xl'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="w-6 h-6 mr-2" strokeWidth={2.5} />
                  Generate Analysis Report
                </>
              )}
            </button>
          ) : (
            <div className="text-left">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-200/50 mb-6 max-h-[500px] overflow-y-auto shadow-inner">
                <div className="prose prose-base max-w-none">
                  <pre className="whitespace-pre-wrap text-base text-apple-text font-sf-pro leading-relaxed">
                    {analysisResult}
                    {isStreaming && (
                      <span className="inline-block w-0.5 h-5 bg-gradient-to-b from-purple-600 to-indigo-600 ml-1 animate-pulse">|</span>
                    )}
                  </pre>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={generateAnalysisReport}
                  disabled={isGenerating}
                  className="btn btn-secondary px-6 py-3"
                >
                  <RefreshCw className="w-5 h-5 mr-2" strokeWidth={2.5} />
                  Regenerate Analysis
                </button>
                <button
                  onClick={() => {
                    setAnalysisResult('');
                    setIsGenerating(false);
                    setIsStreaming(false);
                  }}
                  className="btn btn-secondary px-6 py-3"
                >
                  <FileText className="w-5 h-5 mr-2" strokeWidth={2.5} />
                  New Report
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
