import { routesTableData, RouteRow } from "../../data/dummyData";

function statusBadge(status: RouteRow["status"]) {
  if (status === "Finished") return "badge-success";
  if (status === "In Progress") return "badge-info";
  return "badge-ghost";
}

function progressColor(percent: number) {
  if (percent === 100) return "progress-success";
  if (percent > 0) return "progress-primary";
  return "progress-neutral";
}

export default function RoutesTable() {
  return (
    <div className="card bg-white border border-base-200">
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Today&apos;s Routes</h2>
            <p className="text-sm text-base-content/60 mt-1">
              Track route progress, truck assignment, and driver status.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="badge badge-outline">Live</span>
            <span className="badge badge-outline">Today</span>
          </div>
        </div>

        <div className="divider my-3" />

        {/* Table wrapper (mobile horizontal scroll only if needed) */}
        <div className="overflow-x-auto">
          <table className="table table-zebra table-auto w-full">
            <thead>
              <tr className="text-sm">
                <th className="px-4 py-3 align-middle">Route</th>
                <th className="px-4 py-3 align-middle">Truck No</th>
                <th className="px-4 py-3 align-middle">Truck ID</th>
                <th className="px-4 py-3 align-middle">Driver</th>
                <th className="px-4 py-3 align-middle">Stops</th>
                <th className="px-4 py-3 align-middle">Progress</th>
                <th className="px-4 py-3 align-middle">Status</th>
              </tr>
            </thead>

            <tbody>
              {routesTableData.map((r) => {
                const percent =
                  r.totalStops === 0
                    ? 0
                    : Math.round((r.coveredStops / r.totalStops) * 100);

                return (
                  <tr key={r.routeNo} className="hover:bg-base-200/40">
                    {/* Route */}
                    <td className="px-4 py-3 align-middle">
                      <span className="badge badge-outline font-semibold">
                        {r.routeNo}
                      </span>
                    </td>

                    {/* Truck No */}
                    <td className="px-4 py-3 align-middle">
                      <span className="badge badge-ghost">{r.truckNo}</span>
                    </td>

                    {/* Truck ID */}
                    <td className="px-4 py-3 align-middle font-medium">
                      {r.truckId}
                    </td>

                    {/* Driver */}
                    <td className="px-4 py-3 align-middle">{r.driverName}</td>

                    {/* Stops */}
                    <td className="px-4 py-3 align-middle">
                      <span className="font-semibold">{r.totalStops}</span>
                      <span className="text-xs text-base-content/60 ml-2">
                        total
                      </span>
                    </td>

                    {/* Progress */}
                    <td className="px-4 py-3 align-middle min-w-[300px]">
                      <div className="flex items-center gap-3">
                        <progress
                          className={`progress w-56 ${progressColor(percent)}`}
                          value={percent}
                          max={100}
                        />
                        <span className="text-sm font-semibold w-10">
                          {percent}%
                        </span>
                      </div>

                      <p className="text-xs text-base-content/60 mt-1">
                        Covered:{" "}
                        <span className="font-medium text-base-content">
                          {r.coveredStops}
                        </span>{" "}
                        / {r.totalStops}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 align-middle">
                      <span
                        className={`badge badge-sm ${statusBadge(r.status)}`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs text-base-content/60">
            Showing {routesTableData.length} routes
          </p>

          <div className="flex items-center gap-2">
            <span className="badge badge-ghost">Not Started</span>
            <span className="badge badge-info">In Progress</span>
            <span className="badge badge-success">Finished</span>
          </div>
        </div>
      </div>
    </div>
  );
}
