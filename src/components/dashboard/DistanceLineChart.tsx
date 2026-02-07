import { useMemo, useState } from "react";
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
import { distanceByRouteWeekly, RouteId } from "../../data/dummyData";
import RouteFilter from "./RouteFilter";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

type Filter = RouteId | "ALL";

export default function DistanceLineChart() {
  const [active, setActive] = useState<Filter>("ALL");

  const { labels, values, title } = useMemo(() => {
    const baseLabels = distanceByRouteWeekly[0].weekly.map((p) => p.day);

    if (active === "ALL") {
      // sum all routes per day
      const summed = baseLabels.map((day) => {
        let total = 0;
        for (const r of distanceByRouteWeekly) {
          const point = r.weekly.find((x) => x.day === day);
          total += point ? point.value : 0;
        }
        return total;
      });

      return {
        labels: baseLabels,
        values: summed,
        title: "Total distance covered by trucks (All routes)",
      };
    }

    const routeData = distanceByRouteWeekly.find((r) => r.route === active);
    return {
      labels: baseLabels,
      values: routeData ? routeData.weekly.map((p) => p.value) : [],
      title: `Total distance covered per week (Route ${active.replace("R", "")})`,
    };
  }, [active]);

  const data = {
    labels,
    datasets: [
      {
        label: "Distance (km)",
        data: values,
        tension: 0.35,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="card bg-white border border-base-200">
      <div className="card-body p-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-base-content/70 mt-1">
          Click buttons below to filter distance by route
        </p>

        <RouteFilter active={active} onChange={setActive} />

        <div className="mt-4">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
