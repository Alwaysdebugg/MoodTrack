import { Link } from 'react-router-dom';
import { Heart, TrendingUp, Calendar, Brain } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MoodCharts } from '@/components/MoodCharts';

const HomePage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4 px-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome to MoodTrack
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your mood changes, understand emotional patterns, and make every
          day more meaningful.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="text-center transition-shadow hover:shadow-md">
          <CardHeader className="p-4 sm:p-6">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg sm:text-xl">Track Mood</CardTitle>
            <CardDescription>Quickly record your current mood</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Button asChild className="w-full min-h-[44px]">
              <Link to="/track">Start Tracking</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center transition-shadow hover:shadow-md">
          <CardHeader className="p-4 sm:p-6">
            <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg sm:text-xl">Trend Analysis</CardTitle>
            <CardDescription>View mood trends and statistics</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Button asChild className="w-full min-h-[44px]">
              <Link to="/analysis">View Analysis</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center transition-shadow hover:shadow-md">
          <CardHeader className="p-4 sm:p-6">
            <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg sm:text-xl">History</CardTitle>
            <CardDescription>Browse past mood records</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Button asChild className="w-full min-h-[44px]">
              <Link to="/history">View History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            Trend Analysis
          </CardTitle>
          <CardDescription>
            Mood curve (last 7 days) and distribution. Data shown is mock for
            demo.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <MoodCharts theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="text-center p-4 sm:p-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            <CardTitle className="text-2xl">AI Mood Analysis</CardTitle>
          </div>
          <CardDescription className="text-base text-center">
            Generate personalized emotional analysis reports based on your mood
            records (coming soon).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-4 sm:p-6 pt-0">
          <Button variant="outline" size="lg" disabled className="min-h-[44px]">
            Coming Soon
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
