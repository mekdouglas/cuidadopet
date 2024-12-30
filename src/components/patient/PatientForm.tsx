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
import { Camera, Upload } from "lucide-react";

interface PatientFormData {
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  sex: "male" | "female";
  photo?: string;
}

interface PatientFormProps {
  initialData?: PatientFormData;
  onSubmit?: (data: PatientFormData) => void;
}

const defaultData: PatientFormData = {
  name: "",
  species: "",
  breed: "",
  age: "",
  weight: "",
  sex: "male",
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=pet",
};

const PatientForm = ({
  initialData = defaultData,
  onSubmit = (data) => console.log("Form submitted:", data),
}: PatientFormProps) => {
  const [formData, setFormData] = React.useState<PatientFormData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 bg-white max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Cadastro de Paciente
            </h2>

            <div className="space-y-2">
              <Label htmlFor="name">Nome do Pet</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nome do animal"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="species">Espécie</Label>
                <Select
                  value={formData.species}
                  onValueChange={(value) => handleInputChange("species", value)}
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
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Idade"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="Peso"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sex">Sexo</Label>
                <Select
                  value={formData.sex}
                  onValueChange={(value: "male" | "female") =>
                    handleInputChange("sex", value)
                  }
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
            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 text-center">
              {formData.photo ? (
                <img
                  src={formData.photo}
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
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => console.log("Upload photo")}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Foto
            </Button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Salvar Cadastro</Button>
        </div>
      </form>
    </Card>
  );
};

export default PatientForm;
