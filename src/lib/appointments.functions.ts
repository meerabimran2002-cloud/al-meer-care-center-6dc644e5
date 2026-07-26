import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type NewAppointment = {
  patient_name: string;
  patient_phone: string;
  department: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
};

export const createAppointment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: NewAppointment) => d)
  .handler(async ({ data, context }) => {
    const { error, data: row } = await context.supabase
      .from("appointments")
      .insert({ ...data, patient_id: context.userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const listMyAppointments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("appointments")
      .select("*")
      .eq("patient_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });
