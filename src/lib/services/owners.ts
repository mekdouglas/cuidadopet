import { supabase } from "../supabase";
import type { Tables } from "@/types/supabase";

export type Owner = Tables<"owners">;

export const getOwners = async () => {
  const { data, error } = await supabase
    .from("owners")
    .select("*, patients(*)");

  if (error) throw error;
  return data;
};

export const getOwnerById = async (id: string) => {
  const { data, error } = await supabase
    .from("owners")
    .select("*, patients(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createOwner = async (
  owner: Omit<Owner, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("owners")
    .insert(owner)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateOwner = async (id: string, owner: Partial<Owner>) => {
  const { data, error } = await supabase
    .from("owners")
    .update(owner)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteOwner = async (id: string) => {
  const { error } = await supabase.from("owners").delete().eq("id", id);

  if (error) throw error;
};
