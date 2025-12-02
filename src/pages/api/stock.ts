import { supabase } from "../../lib/supabase";

export async function get({ url }) {
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("productos")
    .select("stock")
    .eq("id", id)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ stock: 0 }), { status: 200 });
  }

  return new Response(JSON.stringify({ stock: data.stock }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
