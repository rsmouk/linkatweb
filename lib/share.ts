import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SharedLink = {
  id: string;
  url: string;
  title: string;
  domain: string;
  favicon_url: string | null;
  stumble_link_id: string | null;
};

export type SharedFolder = {
  id: string;
  short_code: string;
  name: string;
  expires_at: string;
  links: SharedLink[];
};

function getClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function extractShareCode(input: string): string {
  const value = input.trim();
  if (!value) return "";
  try {
    const uri = new URL(value);
    const parts = uri.pathname.split("/").filter(Boolean);
    if (parts.length > 0) {
      const last = parts[parts.length - 1];
      if (/^[A-Za-z0-9]{6,12}$/.test(last)) return last.toUpperCase();
    }
  } catch {
    // not a URL
  }
  const match = value.match(/([A-Za-z0-9]{6,12})\s*$/);
  return (match?.[1] ?? value).toUpperCase();
}

export async function getSharedFolder(
  codeOrUrl: string,
): Promise<SharedFolder | null> {
  const code = extractShareCode(codeOrUrl);
  if (!code) return null;

  const supabase = getClient();
  const { data, error } = await supabase.rpc("get_shared_folder_by_code", {
    p_code: code,
  });

  if (error || data == null) return null;

  const row = data as SharedFolder;
  return {
    ...row,
    links: Array.isArray(row.links) ? row.links : [],
  };
}
