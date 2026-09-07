import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // Check for explicit admin login session
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("gsss_sangla_admin_auth");
      if (storedAuth === "true") {
        const adminEmail =
          localStorage.getItem("gsss_sangla_admin_email") || "principal5010sangla@gmail.com";
        setUser({
          id: "admin-master-id",
          email: adminEmail,
          user_metadata: { full_name: "Principal Admin" },
          aud: "authenticated",
          role: "authenticated",
          created_at: new Date().toISOString(),
        });
        setIsAdmin(true);
        setLoading(false);
        return;
      }
    }

    async function checkRole(userId: string) {
      const { data } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      if (active) setIsAdmin(!!data);
    }

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user ?? null);
      if (data.user) {
        void checkRole(data.user.id).finally(() => active && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) void checkRole(u.id);
      else setIsAdmin(false);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, isAdmin, loading };
}

