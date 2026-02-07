import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { milkWeekly } from "../../data/dummyData";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

export default function MilkLineChart() {
  const labels = milkWeekly.map((p) => p.day);

  const data = {
    labels,
    datasets: [
      {
        label: "Milk collected (L)",
        data: milkWeekly.map((p) => p.value),
        tension: 0.35,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="card bg-white border border-base-200">
      <div className="card-body p-5">
        <h2 className="text-lg font-semibold">
          Total milk collection per week
        </h2>
        <p className="text-sm text-base-content/70 mt-1">
          Dummy weekly data (Mon–Sun)
        </p>
        <div className="mt-4">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
