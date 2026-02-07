import { Droplet, Users, Truck, UserCheck } from "lucide-react";
import { summaryData } from "../data/dummyData";

function StatCard({
  title,
  value,
  icon,
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="card bg-white border border-base-200">
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-base-content/70">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            {subtitle ? (
              <p className="text-xs text-base-content/60 mt-1">{subtitle}</p>
            ) : null}
          </div>

          <div className="p-2 rounded-lg border border-base-200">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Total milk collection today"
        value={`${summaryData.totalMilkTodayLiters.toLocaleString()} L`}
        subtitle="Dummy data"
        icon={<Droplet size={20} />}
      />
      <StatCard
        title="Farmers provided milk today"
        value={`${summaryData.farmersProvidedToday}`}
        subtitle="Dummy data"
        icon={<Users size={20} />}
      />
      <StatCard
        title="Available trucks today"
        value={`${summaryData.availableTrucksToday}`}
        subtitle="Dummy data"
        icon={<Truck size={20} />}
      />
      <StatCard
        title="Available drivers today"
        value={`${summaryData.availableDriversToday}`}
        subtitle="Dummy data"
        icon={<UserCheck size={20} />}
      />
    </div>
  );
}
