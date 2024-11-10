// app/actions/volunteer-actions.ts
'use server'

import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";

export interface VolunteerPersonalDetails {
  user_id: string;
  district: string;
  full_name: string;
  phone_number: string;
  birthday: string;
  nic_number: string;
  address: string;
  gender: string;
  created_at?: string;
  updated_at?: string;
}

export interface VolunteerEducationalDetails {
  user_id: string;
  school: string;
  al_year: string;
  al_stream: string;
  university: string;
  degree_program: string;
  expected_graduate_year: string;
  created_at?: string;
  updated_at?: string;
}

export async function submitPersonalDetails(
  formData: Omit<VolunteerPersonalDetails, 'user_id' | 'created_at' | 'updated_at'>
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Authentication required");

  const supabase = await createClient();
  
  const { error } = await supabase
    .from("volunteer_personal_details")
    .upsert({
      user_id: userId,
      ...formData,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });

  if (error) throw error;
  return { success: true, message: "Personal details saved successfully" };
}

export async function submitEducationalDetails(
  formData: Omit<VolunteerEducationalDetails, 'user_id' | 'created_at' | 'updated_at'>
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Authentication required");

  const supabase = await createClient();

  const { error } = await supabase
    .from("volunteer_educational_details")
    .upsert({
      user_id: userId,
      ...formData,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });

  if (error) throw error;
  return { success: true, message: "Educational details saved successfully" };
}

export async function getPersonalDetails(): Promise<VolunteerPersonalDetails | null> {
  const { userId } = await auth();
  if (!userId) throw new Error("Authentication required");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("volunteer_personal_details")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getEducationalDetails(): Promise<VolunteerEducationalDetails | null> {
  const { userId } = await auth();
  if (!userId) throw new Error("Authentication required");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("volunteer_educational_details")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}