import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { email, password, full_name } = await request.json();
        if (!email || !password) {
          return new Response("Missing email/password", { status: 400 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Only allow if no admin exists yet
        const { count } = await supabaseAdmin
          .from("user_roles")
          .select("*", { count: "exact", head: true })
          .eq("role", "admin");
        if ((count ?? 0) > 0) {
          return new Response(JSON.stringify({ error: "Admin already exists" }), { status: 409 });
        }

        // Create (or reuse) the auth user
        let userId: string | undefined;
        const { data: created, error: cErr } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { full_name: full_name ?? "" },
        });
        if (cErr && !/registered|exists/i.test(cErr.message)) {
          return new Response(JSON.stringify({ error: cErr.message }), { status: 500 });
        }
        userId = created?.user?.id;
        if (!userId) {
          const { data: list } = await supabaseAdmin.auth.admin.listUsers();
          userId = list.users.find((u) => u.email === email)?.id;
        }
        if (!userId) return new Response(JSON.stringify({ error: "User not found" }), { status: 500 });

        await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);
        const { error: rErr } = await supabaseAdmin
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });
        if (rErr) return new Response(JSON.stringify({ error: rErr.message }), { status: 500 });

        return new Response(JSON.stringify({ ok: true, userId }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
