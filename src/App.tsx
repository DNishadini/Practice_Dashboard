import React from "react";
import {
  LayoutDashboard,
  Users,
  Truck,
  ClipboardList,
  Route,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Search,
  Download,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type KpiCard = {
  title: string;
  value: string;
  sub: string;
  accent: "violet" | "cyan" | "pink" | "blue";
  icon: React.ReactNode;
};

const kpis: KpiCard[] = [
  {
    title: "Milk Collected Today",
    value: "1,240 L",
    sub: "+12% vs yesterday",
    accent: "cyan",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "Pending Requests Today",
    value: "23",
    sub: "Needs assignment",
    accent: "pink",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Drivers Available Today",
    value: "14",
    sub: "2 on route",
    accent: "blue",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Trucks Available Today",
    value: "7",
    sub: "1 in maintenance",
    accent: "violet",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Unassigned Requests",
    value: "5",
    sub: "Assign before dispatch",
    accent: "pink",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    title: "Routes Generated Today",
    value: "4",
    sub: "2 not dispatched",
    accent: "violet",
    icon: <Route className="h-5 w-5" />,
  },
  {
    title: "Late Pickup Risk",
    value: "3",
    sub: "Ready-by time soon",
    accent: "pink",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    title: "Avg Capacity Utilization",
    value: "78%",
    sub: "Balanced loads",
    accent: "cyan",
    icon: <TrendingUp className="h-5 w-5" />,
  },
];

const accentStyle: Record<KpiCard["accent"], string> = {
  violet:
    "bg-[#101033] from-violet-500/45 to-fuchsia-500/20 border-violet-400/30",
  cyan: "bg-[#101033] from-cyan-500/45 to-sky-500/20 border-cyan-400/30",
  pink: "bg-[#101033] from-pink-500/45 to-rose-500/20 border-pink-400/30",
  blue: "bg-[#101033] from-blue-500/45 to-indigo-500/20 border-blue-400/30",
};

const chartData = [
  { day: "Mon", liters: 1200 },
  { day: "Tue", liters: 1400 },
  { day: "Wed", liters: 1100 },
  { day: "Thu", liters: 1600 },
  { day: "Fri", liters: 1500 },
  { day: "Sat", liters: 1700 },
  { day: "Sun", liters: 1800 },
];

const pieData = [
  { name: "On-time", value: 84 },
  { name: "Late", value: 16 },
];

function Panel({
  title,
  right,
  children,
  className = "",
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-[#101033] shadow-lg " + className
      }
    >
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-sm font-semibold tracking-wide text-white/90">
          {title}
        </h3>
        {right}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

function Kpi({ card }: { card: KpiCard }) {
  return (
    <div
      className={
        "rounded-2xl border bg-gradient-to-br p-5 shadow-lg " +
        accentStyle[card.accent]
      }
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/85">
            {card.title}
          </p>
          <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
          <p className="mt-2 text-xs text-white/75">{card.sub}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/10 p-2 text-white/90">
          {card.icon}
        </div>
      </div>
    </div>
  );
}

function Chip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={
        "rounded-full border px-3 py-1 text-xs transition " +
        (active
          ? "border-violet-400/40 bg-violet-500/20 text-white"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10")
      }
      type="button"
    >
      {label}
    </button>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0c2b] px-3 py-2 text-xs text-white/90">
      <div className="font-semibold">{label}</div>
      <div>{payload[0].value} L</div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#08071f] text-white">
      <div className="mx-auto flex max-w-[1400px] gap-6 px-6 py-6">
        {/* Sidebar */}
        <aside className="hidden w-[260px] shrink-0 lg:block">
          <div className="rounded-2xl border border-white/10 bg-[#101033] shadow-lg">
            <div className="flex items-center gap-3 px-5 py-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/20 ring-1 ring-violet-400/30">
                <LayoutDashboard className="h-5 w-5 text-white/90" />
              </div>
              <div>
                <p className="text-sm font-semibold">Supply & Logistics</p>
                <p className="text-xs text-white/60">Admin Dashboard</p>
              </div>
            </div>

            <div className="px-4 pb-5">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <Search className="h-4 w-4 text-white/50" />
                <input
                  className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/40 outline-none"
                  placeholder="Search..."
                />
              </div>

              <p className="mt-5 px-2 text-[11px] uppercase tracking-widest text-white/40">
                Menu
              </p>

              <nav className="mt-2 space-y-1">
                {[
                  {
                    t: "Dashboard",
                    i: <LayoutDashboard className="h-4 w-4" />,
                  },
                  { t: "Farmers", i: <Users className="h-4 w-4" /> },
                  { t: "Fleet", i: <Truck className="h-4 w-4" /> },
                  { t: "Production", i: <ClipboardList className="h-4 w-4" /> },
                  { t: "Routes", i: <Route className="h-4 w-4" /> },
                  { t: "Tracking", i: <MapPin className="h-4 w-4" /> },
                ].map((x, idx) => (
                  <button
                    key={x.t}
                    className={
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition " +
                      (idx === 0
                        ? "bg-violet-500/20 text-white ring-1 ring-violet-400/30"
                        : "text-white/70 hover:bg-white/5 hover:text-white")
                    }
                    type="button"
                  >
                    <span className="text-white/70">{x.i}</span>
                    {x.t}
                  </button>
                ))}
              </nav>

              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/25 to-fuchsia-500/10 p-4">
                <p className="text-sm font-semibold">Quick Actions</p>
                <p className="mt-1 text-xs text-white/70">
                  Generate routes and dispatch trucks quickly.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <button className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
                    Generate Routes
                  </button>
                  <button className="rounded-xl bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                    Approve & Dispatch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 space-y-6">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-sm text-white/60">
                Today’s operations, fleet availability, and route status.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Chip label="Today" active />
              <Chip label="Weekly" />
              <Chip label="Monthly" />
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          {/* KPI grid */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {kpis.map((c) => (
              <Kpi key={c.title} card={c} />
            ))}
          </section>

          {/* Charts row */}
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Panel
              title="Milk Collected (Last 7 Days)"
              right={<span className="text-xs text-white/60">Line Chart</span>}
              className="xl:col-span-2"
            >
              <div className="h-[300px] rounded-2xl border border-white/10 bg-[#0c0c2b] p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.55)" />
                    <YAxis stroke="rgba(255,255,255,0.55)" />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="liters"
                      stroke="rgba(34,211,238,0.95)"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel
              title="On-time vs Late Pickups"
              right={<span className="text-xs text-white/60">Donut</span>}
            >
              <div className="h-[300px] rounded-2xl border border-white/10 bg-[#0c0c2b] p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                    >
                      <Cell fill="rgba(34,211,238,0.95)" />
                      <Cell fill="rgba(236,72,153,0.95)" />
                    </Pie>
                    <Legend
                      wrapperStyle={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/70">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  On-time: 84%
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  Late: 16%
                </div>
              </div>
            </Panel>
          </section>

          {/* Routes + Alerts */}
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Panel title="Today’s Routes" className="xl:col-span-2">
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-white/70">
                    <tr>
                      <th className="px-3 py-3 text-left">Route</th>
                      <th className="px-3 py-3 text-left">Truck</th>
                      <th className="px-3 py-3 text-left">Driver</th>
                      <th className="px-3 py-3 text-left">Stops</th>
                      <th className="px-3 py-3 text-left">Load</th>
                      <th className="px-3 py-3 text-left">Status</th>
                      <th className="px-3 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 bg-black/10 text-white/80">
                    {[
                      {
                        r: "R-01",
                        t: "T-04",
                        d: "Nimal",
                        s: 8,
                        load: 72,
                        st: "Planned",
                      },
                      {
                        r: "R-02",
                        t: "T-01",
                        d: "Suresh",
                        s: 6,
                        load: 95,
                        st: "In Progress",
                      },
                      {
                        r: "R-03",
                        t: "T-03",
                        d: "Kasun",
                        s: 7,
                        load: 108,
                        st: "Over Capacity",
                      },
                    ].map((x) => (
                      <tr key={x.r}>
                        <td className="px-3 py-3">{x.r}</td>
                        <td className="px-3 py-3">{x.t}</td>
                        <td className="px-3 py-3">{x.d}</td>
                        <td className="px-3 py-3">{x.s}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-white/10">
                              <div
                                className="h-2 rounded-full bg-violet-500/70"
                                style={{ width: `${Math.min(x.load, 100)}%` }}
                              />
                            </div>
                            <span
                              className={
                                "text-xs " +
                                (x.load > 100
                                  ? "text-pink-300"
                                  : "text-white/70")
                              }
                            >
                              {x.load}%
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={
                              "rounded-full border px-2 py-1 text-xs " +
                              (x.st === "Over Capacity"
                                ? "border-pink-400/30 bg-pink-500/15 text-pink-200"
                                : x.st === "In Progress"
                                  ? "border-cyan-400/30 bg-cyan-500/15 text-cyan-200"
                                  : "border-white/10 bg-white/5 text-white/70")
                            }
                          >
                            {x.st}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <button className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs hover:bg-white/10">
                            View
                          </button>
                          <button className="ml-2 rounded-lg border border-violet-400/30 bg-violet-500/15 px-2 py-1 text-xs hover:bg-violet-500/25">
                            Re-opt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel title="Alerts & Exceptions">
              <div className="space-y-3">
                {[
                  {
                    t: "3 requests not assigned",
                    s: "Assign to a route before 10:30 AM",
                    type: "warn",
                  },
                  {
                    t: "Truck T-03 over capacity",
                    s: "Re-balance load or change truck",
                    type: "danger",
                  },
                  {
                    t: "Driver missing start",
                    s: "Route R-02 not started",
                    type: "info",
                  },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={
                      "rounded-2xl border p-3 " +
                      (a.type === "danger"
                        ? "border-pink-400/30 bg-pink-500/10"
                        : a.type === "warn"
                          ? "border-violet-400/30 bg-violet-500/10"
                          : "border-cyan-400/30 bg-cyan-500/10")
                    }
                  >
                    <p className="text-sm font-semibold text-white">{a.t}</p>
                    <p className="mt-1 text-xs text-white/70">{a.s}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15">
                        Open
                      </button>
                      <button className="rounded-lg bg-white/5 px-2 py-1 text-xs text-white/70 hover:bg-white/10">
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </section>
        </main>
      </div>
    </div>
  );
}
