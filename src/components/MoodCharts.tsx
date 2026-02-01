import { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { mockMoodTrendData, mockMoodDistribution } from '@/data/mockChartData';

interface MoodChartsProps {
  theme: 'light' | 'dark';
}

export function MoodCharts({ theme }: MoodChartsProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<echarts.ECharts | null>(null);
  const pieChartRef = useRef<echarts.ECharts | null>(null);

  const resolvedTheme = theme;

  const trendData = useMemo(() => mockMoodTrendData(), []);
  const distributionData = useMemo(() => mockMoodDistribution(), []);

  const lineOption: EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: trendData.map(d => d.date),
        axisLabel: { color: resolvedTheme === 'dark' ? '#94a3b8' : '#64748b' },
        axisLine: {
          lineStyle: {
            color: resolvedTheme === 'dark' ? '#334155' : '#e2e8f0',
          },
        },
      },
      yAxis: {
        type: 'value',
        min: 1,
        max: 5,
        interval: 1,
        axisLabel: { color: resolvedTheme === 'dark' ? '#94a3b8' : '#64748b' },
        splitLine: {
          lineStyle: {
            color: resolvedTheme === 'dark' ? '#334155' : '#e2e8f0',
            type: 'dashed',
          },
        },
      },
      series: [
        {
          name: 'Mood',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: trendData.map(d => d.score),
          lineStyle: { width: 2 },
          areaStyle: { opacity: 0.2 },
        },
      ],
    }),
    [trendData, resolvedTheme]
  );

  const pieOption: EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: 'item' },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        textStyle: { color: resolvedTheme === 'dark' ? '#94a3b8' : '#64748b' },
      },
      series: [
        {
          name: 'Mood',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderColor: resolvedTheme === 'dark' ? '#1e293b' : '#fff',
            borderWidth: 2,
          },
          label: { color: resolvedTheme === 'dark' ? '#e2e8f0' : '#0f172a' },
          data: distributionData.map((d, i) => ({
            value: d.value,
            name: d.name,
            itemStyle: {
              color: [
                '#ef4444', // very bad
                '#f97316', // bad
                '#eab308', // neutral
                '#22c55e', // good
                '#ec4899', // excellent
              ][i],
            },
          })),
        },
      ],
    }),
    [distributionData, resolvedTheme]
  );

  useEffect(() => {
    if (!lineRef.current) return;
    lineChartRef.current = echarts.init(
      lineRef.current,
      resolvedTheme === 'dark' ? 'dark' : undefined
    );
    lineChartRef.current.setOption(lineOption);
    return () => {
      lineChartRef.current?.dispose();
      lineChartRef.current = null;
    };
  }, [resolvedTheme]);

  useEffect(() => {
    if (!lineChartRef.current) return;
    lineChartRef.current.setOption(lineOption);
  }, [lineOption]);

  useEffect(() => {
    if (!pieRef.current) return;
    pieChartRef.current = echarts.init(
      pieRef.current,
      resolvedTheme === 'dark' ? 'dark' : undefined
    );
    pieChartRef.current.setOption(pieOption);
    return () => {
      pieChartRef.current?.dispose();
      pieChartRef.current = null;
    };
  }, [resolvedTheme]);

  useEffect(() => {
    if (!pieChartRef.current) return;
    pieChartRef.current.setOption(pieOption);
  }, [pieOption]);

  useEffect(() => {
    const handleResize = () => {
      lineChartRef.current?.resize();
      pieChartRef.current?.resize();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Mood trend (last 7 days)
        </h3>
        <div
          ref={lineRef}
          className="h-[240px] sm:h-[280px] w-full min-h-[200px]"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Mood distribution
        </h3>
        <div
          ref={pieRef}
          className="h-[240px] sm:h-[280px] w-full min-h-[200px]"
        />
      </div>
    </div>
  );
}
