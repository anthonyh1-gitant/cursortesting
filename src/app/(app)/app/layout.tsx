import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/login");
      }
    } catch {
      redirect("/login");
    }
  }

  return <AppShell>{children}</AppShell>;
}
