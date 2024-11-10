'use server'
import { createClient } from "@/utils/supabase/server";

const supabase = await createClient();

export default async function getSeminars() {
  const { data, error } = await supabase.from("seminars").select("*");

  if (error) {
    throw error;
  }

  return data;
}
