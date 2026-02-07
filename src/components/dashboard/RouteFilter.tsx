import { RouteId } from "../../data/dummyData";

const routes: (RouteId | "ALL")[] = ["ALL", "R1", "R2", "R3", "R4", "R5", "R6"];

export default function RouteFilter({
  active,
  onChange,
}: {
  active: RouteId | "ALL";
  onChange: (val: RouteId | "ALL") => void;
}) {
  return (
    <div className="mt-4">
      {/* one-line scroll row */}
      <div className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap pb-2">
        {routes.map((r) => {
          const isActive = r === active;

          return (
            <button
              key={r}
              type="button"
              onClick={() => onChange(r)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition
                border shrink-0
                ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-base-content/70 border-base-200 hover:bg-base-100"
                }
              `}
            >
              {r === "ALL" ? "All" : `Route ${r.replace("R", "")}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}
