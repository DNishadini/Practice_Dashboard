import { routesTableData, RouteRow } from "../../data/dummyData";

function statusStyle(status: RouteRow["status"]) {
  if (status === "Finished") return "badge-success";
  if (status === "In Progress") return "badge-info";
  return "badge-ghost";
}

function progressStyle(percent: number) {
  if (percent === 100) return "progress-success";
  if (percent > 0) return "progress-primary";
  return "progress-neutral";
}

export default function RoutesTable() {
  return (
    <div className="bg-white border border-base-200 rounded-xl">
      {/* Title */}
      <div className="px-6 pt-5 pb-3">
        <h2 className="text-lg font-semibold">Today’s Routes</h2>
        <p className="text-sm text-base-content/60 mt-1">
          Monitor route progress and driver assignments
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-fixed w-full min-w-[1300px]">
          <thead className="bg-base-100">
            <tr className="text-xs uppercase tracking-wide text-base-content/60">
              <th className="px-6 py-4 w-24">Route</th>
              <th className="px-6 py-4 w-28">Truck</th>
              <th className="px-6 py-4 w-40">Truck ID</th>
              <th className="px-6 py-4 w-60">Driver</th>
              <th className="px-6 py-4 w-32 text-center">Stops</th>
              <th className="px-6 py-4 w-[480px]">Progress</th>
              <th className="px-6 py-4 w-36">Status</th>
            </tr>
          </thead>

          <tbody>
            {routesTableData.map((r) => {
              const percent =
                r.totalStops === 0
                  ? 0
                  : Math.round((r.coveredStops / r.totalStops) * 100);

              return (
                <tr
                  key={r.routeNo}
                  className="border-b border-base-200 hover:bg-base-200/40 transition"
                >
                  {/* Route */}
                  <td className="px-6 py-4 font-medium">
                    <span className="badge badge-outline">{r.routeNo}</span>
                  </td>

                  {/* Truck */}
                  <td className="px-6 py-4">
                    <span className="badge badge-ghost">{r.truckNo}</span>
                  </td>

                  {/* Truck ID */}
                  <td className="px-6 py-4 font-medium">{r.truckId}</td>

                  {/* Driver */}
                  <td className="px-6 py-4">
                    <div className="font-medium">{r.driverName}</div>
                    <div className="text-xs text-base-content/50">
                      Assigned driver
                    </div>
                  </td>

                  {/* Stops */}
                  <td className="px-6 py-4 text-center font-semibold">
                    {r.coveredStops}/{r.totalStops}
                  </td>

                  {/* Progress */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <progress
                        className={`progress w-80 ${progressStyle(percent)}`}
                        value={percent}
                        max={100}
                      />
                      <span className="text-sm font-semibold w-12">
                        {percent}%
                      </span>
                    </div>
                    <div className="text-xs text-base-content/50 mt-1">
                      Stops covered
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`badge ${statusStyle(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
