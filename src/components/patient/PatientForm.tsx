import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Camera, Upload, UserPlus } from "lucide-react";
import { createPatient } from "@/lib/services/patients";
import { uploadPetPhoto } from "@/lib/services/storage";
import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import OwnerForm from "./OwnerForm";
import type { Owner } from "@/lib/services/owners";

interface PatientFormData {
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  sex: "male" | "female";
  photo_url?: string;
  owner_id?: string;
}

interface PatientFormProps {
  initialData?: PatientFormData;
  onSubmit?: (data: PatientFormData) => void;
  onCancel?: () => void;
}

const defaultData: PatientFormData = {
  name: "",
  species: "",
  breed: "",
  age: "",
  weight: "",
  sex: "male",
  photo_url: "",
};

const PatientForm = ({
  initialData = defaultData,
  onSubmit,
  onCancel,
}: PatientFormProps) => {
  const [formData, setFormData] = React.useState<PatientFormData>(initialData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isOwnerDialogOpen, setIsOwnerDialogOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert age and weight to numbers for database
      const patientData = {
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
      };

      const newPatient = await createPatient(patientData);

      toast({
        title: "Sucesso!",
        description: "Paciente cadastrado com sucesso.",
      });

      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      toast({
        title: "Erro",
        description: "Erro ao cadastrar paciente. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Generate a temporary ID for the photo
      const tempId = Math.random().toString(36).substring(7);
      const photoUrl = await uploadPetPhoto(file, tempId);

      handleInputChange("photo_url", photoUrl);
      toast({
        title: "Sucesso!",
        description: "Foto carregada com sucesso.",
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar a foto. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erro",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }

    handlePhotoUpload(file);
  };

  const handleOwnerSubmit = (owner: Owner) => {
    handleInputChange("owner_id", owner.id);
    setIsOwnerDialogOpen(false);
    toast({
      title: "Sucesso!",
      description: "Tutor vinculado ao paciente com sucesso.",
    });
  };

  return (
    <Card className="p-6 bg-white max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Cadastro de Paciente
              </h2>
              <Dialog
                open={isOwnerDialogOpen}
                onOpenChange={setIsOwnerDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" type="button">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Tutor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cadastrar Tutor</DialogTitle>
                  </DialogHeader>
                  <OwnerForm
                    onSubmit={handleOwnerSubmit}
                    onCancel={() => setIsOwnerDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome do Pet</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nome do animal"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="species">Espécie</Label>
                <Select
                  value={formData.species}
                  onValueChange={(value) => handleInputChange("species", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Cachorro</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="bird">Pássaro</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Raça</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => handleInputChange("breed", e.target.value)}
                  placeholder="Raça do animal"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Idade"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="Peso"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sex">Sexo</Label>
                <Select
                  value={formData.sex}
                  onValueChange={(value: "male" | "female") =>
                    handleInputChange("sex", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Macho</SelectItem>
                    <SelectItem value="female">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-48 space-y-4">
            <div
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.photo_url ? (
                <img
                  src={formData.photo_url}
                  alt="Pet photo"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-2">
                    Foto do Pet
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Carregando..." : "Upload Foto"}
            </Button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading || isUploading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading || isUploading}>
            {isLoading ? "Salvando..." : "Salvar Cadastro"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PatientForm;
