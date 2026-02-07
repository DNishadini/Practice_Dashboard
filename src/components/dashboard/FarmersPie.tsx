import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { farmersPieData } from "../../data/dummyData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FarmersPie() {
  const remaining =
    farmersPieData.totalRegisteredFarmers -
    farmersPieData.farmersSentRequestToday;

  const data = {
    labels: ["Registered farmers (total)", "Farmers sent request today"],
    datasets: [
      {
        data: [remaining, farmersPieData.farmersSentRequestToday],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="card bg-white border border-base-200">
      <div className="card-body p-5">
        <h2 className="text-lg font-semibold">Farmers Overview</h2>
        <p className="text-sm text-base-content/70 mt-1">
          2 parts: total registered vs farmers who sent request today
        </p>

        <div className="mt-4">
          <Pie data={data} options={options} />
        </div>

        <div className="mt-4 text-sm">
          <div className="flex justify-between">
            <span>Total registered</span>
            <span className="font-semibold">
              {farmersPieData.totalRegisteredFarmers}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Requests today</span>
            <span className="font-semibold">
              {farmersPieData.farmersSentRequestToday}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
