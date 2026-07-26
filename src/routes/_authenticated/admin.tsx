import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  CalendarCheck,
  Users,
  Clock,
  ShieldCheck,
  Trash2,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  adminDeleteAppointment,
  adminGetStats,
  adminListAppointments,
  adminListPatients,
  adminUpdateAppointmentStatus,
  claimFirstAdmin,
  getMyRoles,
} from "@/lib/admin.functions";
import { listMyAppointments } from "@/lib/appointments.functions";
import { doctors } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Al Meer Hospital" },
      { name: "description", content: "Manage appointments, patients, doctors and view analytics." },
      { property: "og:title", content: "Admin Dashboard — Al Meer Hospital" },
      { property: "og:description", content: "Secure hospital management portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const rolesFn = useServerFn(getMyRoles);
  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ["my-roles"],
    queryFn: () => rolesFn(),
  });

  if (rolesLoading) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-muted-foreground">Loading portal...</div>;
  }

  const isAdmin = roles?.includes("admin");
  return isAdmin ? <AdminDashboard /> : <PatientDashboard />;
}

function AdminDashboard() {
  const qc = useQueryClient();
  const statsFn = useServerFn(adminGetStats);
  const listFn = useServerFn(adminListAppointments);
  const patientsFn = useServerFn(adminListPatients);
  const updateFn = useServerFn(adminUpdateAppointmentStatus);
  const deleteFn = useServerFn(adminDeleteAppointment);

  const { data: stats } = useQuery({ queryKey: ["admin-stats"], queryFn: () => statsFn() });
  const { data: appointments } = useQuery({ queryKey: ["admin-appointments"], queryFn: () => listFn() });
  const { data: patients } = useQuery({ queryKey: ["admin-patients"], queryFn: () => patientsFn() });

  const updateMut = useMutation({
    mutationFn: (v: { id: string; status: string }) => updateFn({ data: v }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-appointments"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-appointments"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <PortalHeader
        title="Admin Dashboard"
        subtitle="Manage everything at Al Meer Hospital"
        badge="Administrator"
      />

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<CalendarCheck className="h-5 w-5" />} label="Total Appointments" value={stats?.totalAppointments ?? 0} />
        <StatCard icon={<Clock className="h-5 w-5" />} label="Pending" value={stats?.pending ?? 0} />
        <StatCard icon={<Activity className="h-5 w-5" />} label="Confirmed" value={stats?.confirmed ?? 0} />
        <StatCard icon={<Users className="h-5 w-5" />} label="Patients" value={stats?.totalPatients ?? 0} />
      </div>

      {/* Analytics */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold">Appointments by Department</h3>
          <div className="mt-4 space-y-3">
            {Object.entries(stats?.deptCounts ?? {}).length === 0 && (
              <p className="text-sm text-muted-foreground">No data yet.</p>
            )}
            {Object.entries(stats?.deptCounts ?? {}).map(([dept, count]) => {
              const max = Math.max(...Object.values(stats?.deptCounts ?? { x: 1 }));
              const pct = (count / max) * 100;
              return (
                <div key={dept}>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{dept}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/5">
                    <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-semibold">Doctors on Staff</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {doctors.map((d) => (
              <li key={d.id} className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Stethoscope className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.specialty}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Appointments table */}
      <div className="glass mt-6 rounded-3xl p-6">
        <h3 className="text-lg font-semibold">Manage Appointments</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>
                <th className="pb-2 pr-3">Patient</th>
                <th className="pb-2 pr-3">Department</th>
                <th className="pb-2 pr-3">Doctor</th>
                <th className="pb-2 pr-3">Date / Time</th>
                <th className="pb-2 pr-3">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(appointments ?? []).map((a: any) => (
                <tr key={a.id} className="border-t border-black/5">
                  <td className="py-3 pr-3">
                    <div className="font-medium">{a.patient_name}</div>
                    <div className="text-xs text-muted-foreground">{a.patient_phone}</div>
                  </td>
                  <td className="pr-3">{a.department}</td>
                  <td className="pr-3">{a.doctor_name}</td>
                  <td className="pr-3">
                    {a.appointment_date} · {a.appointment_time}
                  </td>
                  <td className="pr-3">
                    <select
                      value={a.status}
                      onChange={(e) => updateMut.mutate({ id: a.id, status: e.target.value })}
                      className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (confirm("Delete this appointment?")) deleteMut.mutate(a.id);
                      }}
                      className="grid h-8 w-8 place-items-center rounded-lg text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {(appointments ?? []).length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-sm text-muted-foreground">
                    No appointments yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patients */}
      <div className="glass mt-6 rounded-3xl p-6">
        <h3 className="text-lg font-semibold">Registered Patients</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(patients ?? []).map((p: any) => (
            <div key={p.id} className="rounded-2xl border border-black/5 bg-white/70 p-4">
              <div className="font-medium">{p.full_name || "Unnamed"}</div>
              <div className="text-xs text-muted-foreground">{p.phone || "No phone"}</div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                Joined {new Date(p.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
          {(patients ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground">No patients yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PatientDashboard() {
  const listFn = useServerFn(listMyAppointments);
  const claimFn = useServerFn(claimFirstAdmin);
  const qc = useQueryClient();
  const { data: appts } = useQuery({ queryKey: ["my-appointments"], queryFn: () => listFn() });
  const claim = useMutation({
    mutationFn: () => claimFn(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-roles"] }),
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <PortalHeader title="Patient Portal" subtitle="Your appointments and records" badge="Patient" />

      <div className="glass mt-8 rounded-3xl p-6">
        <h3 className="text-lg font-semibold">Your Appointments</h3>
        <div className="mt-4 space-y-3">
          {(appts ?? []).map((a: any) => (
            <div key={a.id} className="flex items-center justify-between rounded-2xl border border-black/5 bg-white/70 p-4">
              <div>
                <div className="font-medium">
                  {a.doctor_name} · <span className="text-muted-foreground">{a.department}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {a.appointment_date} at {a.appointment_time}
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                {a.status}
              </span>
            </div>
          ))}
          {(appts ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground">
              You haven't booked any appointments yet.
            </p>
          )}
        </div>
      </div>

      <div className="glass mt-6 rounded-3xl p-6">
        <h3 className="text-lg font-semibold">Admin bootstrap</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No admin exists in this system? Claim the first admin role for yourself.
          This works only once — the very first user to click it becomes the sole admin.
        </p>
        <button
          onClick={() => claim.mutate()}
          disabled={claim.isPending}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-60"
        >
          <ShieldCheck className="h-4 w-4" />
          {claim.isPending ? "Claiming..." : "Become Admin"}
        </button>
        {claim.isError && (
          <p className="mt-3 text-xs text-destructive">{(claim.error as Error).message}</p>
        )}
        {claim.isSuccess && (
          <p className="mt-3 text-xs text-primary">Success! Refresh to enter the admin dashboard.</p>
        )}
      </div>
    </div>
  );
}

function PortalHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          {badge}
        </div>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <button
        onClick={signOut}
        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-black/5"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}
