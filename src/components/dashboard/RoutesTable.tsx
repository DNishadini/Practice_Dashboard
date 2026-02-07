import { RouteRow } from "../data/dummyData";
import { routesTableData } from "../data/dummyData";

function statusBadge(status: RouteRow["status"]) {
  if (status === "Not Started") return "badge badge-ghost";
  if (status === "In Progress") return "badge badge-info";
  return "badge badge-success";
}

export default function RoutesTable() {
  return (
    <div className="card bg-white border border-base-200">
      <div className="card-body p-5">
        <h2 className="text-lg font-semibold">Today&apos;s Routes</h2>

        <div className="overflow-x-auto mt-3">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Route No</th>
                <th>Truck No</th>
                <th>Truck ID</th>
                <th>Driver</th>
                <th>Total Stops</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {routesTableData.map((r) => {
                const percent =
                  r.totalStops === 0
                    ? 0
                    : Math.round((r.coveredStops / r.totalStops) * 100);

                return (
                  <tr key={r.routeNo}>
                    <td className="font-medium">{r.routeNo}</td>
                    <td>{r.truckNo}</td>
                    <td>{r.truckId}</td>
                    <td>{r.driverName}</td>
                    <td>{r.totalStops}</td>
                    <td className="min-w-[220px]">
                      <div className="flex items-center gap-3">
                        <progress
                          className="progress progress-primary w-40"
                          value={percent}
                          max={100}
                        />
                        <span className="text-sm">{percent}%</span>
                      </div>
                      <p className="text-xs text-base-content/60 mt-1">
                        Covered: {r.coveredStops} / {r.totalStops}
                      </p>
                    </td>
                    <td>
                      <span className={statusBadge(r.status)}>{r.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
