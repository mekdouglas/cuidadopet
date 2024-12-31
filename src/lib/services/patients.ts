import { supabase } from "../supabase";
import type { Tables } from "@/types/supabase";

export type Patient = Tables<"patients">;

export const getPatients = async () => {
  const { data, error } = await supabase
    .from("patients")
    .select("*, owners(*)");

  if (error) throw error;
  return data;
};

export const searchPatients = async (
  query: string,
  filters: Record<string, string>,
) => {
  let queryBuilder = supabase.from("patients").select("*, owners(*)");

  // Apply search query
  if (query) {
    queryBuilder = queryBuilder.or(
      `name.ilike.%${query}%,breed.ilike.%${query}%`,
    );
  }

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      switch (key) {
        case "species":
          queryBuilder = queryBuilder.eq("species", value);
          break;
        case "age":
          // Age ranges: puppy (0-1), young (1-3), adult (3-8), senior (8+)
          const ageRanges = {
            puppy: [0, 1],
            young: [1, 3],
            adult: [3, 8],
            senior: [8, 100],
          };
          const [min, max] = ageRanges[value as keyof typeof ageRanges];
          queryBuilder = queryBuilder.gte("age", min).lt("age", max);
          break;
      }
    }
  });

  const { data, error } = await queryBuilder;

  if (error) throw error;
  return data;
};

export const getPatientById = async (id: string) => {
  const { data, error } = await supabase
    .from("patients")
    .select("*, owners(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createPatient = async (
  patient: Omit<Patient, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("patients")
    .insert(patient)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePatient = async (id: string, patient: Partial<Patient>) => {
  const { data, error } = await supabase
    .from("patients")
    .update(patient)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePatient = async (id: string) => {
  const { error } = await supabase.from("patients").delete().eq("id", id);

  if (error) throw error;
};
