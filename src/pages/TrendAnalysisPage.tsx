import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import {
  mockMoodTrendData30Days,
  mockMoodDistribution,
  mockMoodByWeekday,
  mockTriggerDistribution,
  mockWeeklyAverages,
} from '@/data/mockChartData';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const TrendAnalysisPage = () => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const isDark = theme === 'dark';

  const line30Ref = useRef<HTMLDivElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);
  const barWeekdayRef = useRef<HTMLDivElement>(null);
  const barTriggerRef = useRef<HTMLDivElement>(null);
  const barWeeklyRef = useRef<HTMLDivElement>(null);
  const chartRefs = useRef<echarts.ECharts[]>([]);

  const trend30 = useMemo(() => mockMoodTrendData30Days(), []);
  const distribution = useMemo(() => mockMoodDistribution(), []);
  const byWeekday = useMemo(() => mockMoodByWeekday(), []);
  const triggers = useMemo(() => mockTriggerDistribution(), []);
  const weeklyAvgs = useMemo(() => mockWeeklyAverages(), []);

  const textColor = isDark ? '#94a3b8' : '#64748b';
  const lineColor = isDark ? '#334155' : '#e2e8f0';

  const line30Option: EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '12%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: trend30.map(d => d.date),
        axisLabel: { color: textColor, rotate: 30 },
        axisLine: { lineStyle: { color: lineColor } },
      },
      yAxis: {
        type: 'value',
        min: 1,
        max: 5,
        interval: 1,
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: lineColor, type: 'dashed' } },
      },
      series: [
        {
          name: 'Mood',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          data: trend30.map(d => d.score),
          lineStyle: { width: 2 },
          areaStyle: { opacity: 0.25 },
        },
      ],
    }),
    [trend30, textColor, lineColor]
  );

  const pieOption: EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: 'item' },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        textStyle: { color: textColor },
      },
      series: [
        {
          name: 'Mood',
          type: 'pie',
          radius: ['38%', '68%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderColor: isDark ? '#1e293b' : '#fff',
            borderWidth: 2,
          },
          label: { color: isDark ? '#e2e8f0' : '#0f172a' },
          data: distribution.map((d, i) => ({
            value: d.value,
            name: d.name,
            itemStyle: {
              color: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#ec4899'][i],
            },
          })),
        },
      ],
    }),
    [distribution, textColor, isDark]
  );

  const barWeekdayOption: EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '12%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: byWeekday.map(d => d.day),
        axisLabel: { color: textColor },
        axisLine: { lineStyle: { color: lineColor } },
      },
      yAxis: {
        type: 'value',
        min: 1,
        max: 5,
        interval: 1,
        name: 'Avg mood',
        nameTextStyle: { color: textColor },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: lineColor, type: 'dashed' } },
      },
      series: [
        {
          name: 'Avg mood',
          type: 'bar',
          data: byWeekday.map(d => Math.round(d.avg * 10) / 10),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#60a5fa' },
            ]),
          },
          barWidth: '50%',
        },
      ],
    }),
    [byWeekday, textColor, lineColor]
  );

  const barTriggerOption: EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: triggers.map(d => d.name),
        axisLabel: { color: textColor, rotate: 25 },
        axisLine: { lineStyle: { color: lineColor } },
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        nameTextStyle: { color: textColor },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: lineColor, type: 'dashed' } },
      },
      series: [
        {
          name: 'Count',
          type: 'bar',
          data: triggers.map(d => d.value),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#22c55e' },
              { offset: 1, color: '#4ade80' },
            ]),
          },
          barWidth: '55%',
        },
      ],
    }),
    [triggers, textColor, lineColor]
  );

  const barWeeklyOption: EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '12%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: weeklyAvgs.map(d => d.week),
        axisLabel: { color: textColor, rotate: 20 },
        axisLine: { lineStyle: { color: lineColor } },
      },
      yAxis: {
        type: 'value',
        min: 1,
        max: 5,
        interval: 1,
        name: 'Avg mood',
        nameTextStyle: { color: textColor },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: lineColor, type: 'dashed' } },
      },
      series: [
        {
          name: 'Weekly avg',
          type: 'bar',
          data: weeklyAvgs.map(d => Math.round(d.avg * 100) / 100),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#8b5cf6' },
              { offset: 1, color: '#a78bfa' },
            ]),
          },
          barWidth: '45%',
        },
      ],
    }),
    [weeklyAvgs, textColor, lineColor]
  );

  const options = [
    { ref: line30Ref, option: line30Option },
    { ref: pieRef, option: pieOption },
    { ref: barWeekdayRef, option: barWeekdayOption },
    { ref: barTriggerRef, option: barTriggerOption },
    { ref: barWeeklyRef, option: barWeeklyOption },
  ];

  useEffect(() => {
    const chartTheme = isDark ? 'dark' : undefined;
    options.forEach(({ ref: r, option }) => {
      if (!r.current) return;
      const chart = echarts.init(r.current, chartTheme);
      chart.setOption(option);
      chartRefs.current.push(chart);
    });
    return () => {
      chartRefs.current.forEach(c => c.dispose());
      chartRefs.current = [];
    };
  }, [theme]);

  useEffect(() => {
    options.forEach(({ ref: r, option }, i) => {
      const chart = chartRefs.current[i];
      if (chart && r.current) chart.setOption(option);
    });
  }, [
    line30Option,
    pieOption,
    barWeekdayOption,
    barTriggerOption,
    barWeeklyOption,
  ]);

  useEffect(() => {
    const handleResize = () => chartRefs.current.forEach(c => c?.resize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-1 shrink-0 min-h-[44px]"
          >
            <Link to="/home">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
              Trend Analysis
            </h1>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">
            Mood trend (last 30 days)
          </CardTitle>
          <CardDescription className="text-sm">
            Daily mood score over the past 30 days. Data shown is mock for demo.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div
            ref={line30Ref}
            className="h-[260px] sm:h-[320px] w-full min-h-[220px]"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Mood distribution
            </CardTitle>
            <CardDescription className="text-sm">
              Share of each mood type in your records.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div
              ref={pieRef}
              className="h-[260px] sm:h-[320px] w-full min-h-[220px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Average mood by weekday
            </CardTitle>
            <CardDescription className="text-sm">
              Which days you tend to feel better or worse.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div
              ref={barWeekdayRef}
              className="h-[240px] sm:h-[280px] w-full min-h-[200px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">
            Weekly comparison
          </CardTitle>
          <CardDescription className="text-sm">
            Average mood for the last 4 weeks.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div
            ref={barWeeklyRef}
            className="h-[240px] sm:h-[280px] w-full min-h-[200px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">
            Trigger frequency
          </CardTitle>
          <CardDescription className="text-sm">
            How often each trigger appears in your mood entries.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div
            ref={barTriggerRef}
            className="h-[260px] sm:h-[320px] w-full min-h-[220px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysisPage;
