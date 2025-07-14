// src/app/utils/chart-register.ts
import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
  DoughnutController,
  RadarController,
  RadialLinearScale,
  PolarAreaController,
  BubbleController,
  ScatterController,
} from 'chart.js';

export function registerChartJS(): void {
  Chart.register(
    BarController,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PieController,
    ArcElement,
    DoughnutController,
    RadarController,
    RadialLinearScale,
    PolarAreaController,
    BubbleController,
    ScatterController
  );
}
