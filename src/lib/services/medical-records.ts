import { supabase } from "../supabase";
import type { Tables } from "@/types/supabase";

export type MedicalRecord = Tables<"medical_records">;

export const getMedicalRecords = async (patientId: string) => {
  const { data, error } = await supabase
    .from("medical_records")
    .select("*")
    .eq("patient_id", patientId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

export const getMedicalRecordById = async (id: string) => {
  const { data, error } = await supabase
    .from("medical_records")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createMedicalRecord = async (
  record: Omit<MedicalRecord, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("medical_records")
    .insert(record)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateMedicalRecord = async (
  id: string,
  record: Partial<MedicalRecord>,
) => {
  const { data, error } = await supabase
    .from("medical_records")
    .update(record)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteMedicalRecord = async (id: string) => {
  const { error } = await supabase
    .from("medical_records")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
