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
    <div className="flex flex-wrap gap-2 mt-3">
      {routes.map((r) => {
        const isActive = r === active;
        return (
          <button
            key={r}
            className={`btn btn-sm ${isActive ? "btn-primary" : "btn-outline"}`}
            onClick={() => onChange(r)}
            type="button"
          >
            {r === "ALL" ? "All" : `Route ${r.replace("R", "")}`}
          </button>
        );
      })}
    </div>
  );
}
