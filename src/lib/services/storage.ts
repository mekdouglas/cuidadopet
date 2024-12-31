import { supabase } from "../supabase";

export const uploadPetPhoto = async (file: File, patientId: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${patientId}.${fileExt}`;
  const filePath = `pet-photos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("pets")
    .upload(filePath, file, {
      upsert: true,
      cacheControl: "3600",
    });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("pets").getPublicUrl(filePath);

  return publicUrl;
};

export const deletePetPhoto = async (photoUrl: string) => {
  const filePath = photoUrl.split("/").pop();
  if (!filePath) return;

  const { error } = await supabase.storage
    .from("pets")
    .remove([`pet-photos/${filePath}`]);

  if (error) throw error;
};
