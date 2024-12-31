import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  createMedicalRecord,
  type MedicalRecord,
} from "@/lib/services/medical-records";
import { useToast } from "../ui/use-toast";

interface MedicalRecordFormData {
  type: MedicalRecord["type"];
  title: string;
  description: string;
  professional: string;
  date: string;
}

interface MedicalRecordFormProps {
  patientId: string;
  onSubmit?: (record: MedicalRecord) => void;
  onCancel?: () => void;
  initialType?: MedicalRecord["type"];
}

const defaultData: MedicalRecordFormData = {
  type: "consultation",
  title: "",
  description: "",
  professional: "",
  date: new Date().toISOString().split("T")[0],
};

const MedicalRecordForm = ({
  patientId,
  onSubmit,
  onCancel,
  initialType,
}: MedicalRecordFormProps) => {
  const [formData, setFormData] = React.useState<MedicalRecordFormData>({
    ...defaultData,
    type: initialType || defaultData.type,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const record = await createMedicalRecord({
        ...formData,
        patient_id: patientId,
      });

      toast({
        title: "Sucesso!",
        description: "Registro médico criado com sucesso.",
      });

      if (onSubmit) {
        onSubmit(record);
      }
    } catch (error) {
      console.error("Error creating medical record:", error);
      toast({
        title: "Erro",
        description: "Erro ao criar registro médico. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof MedicalRecordFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select
            value={formData.type}
            onValueChange={(value: MedicalRecord["type"]) =>
              handleInputChange("type", value)
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Consulta</SelectItem>
              <SelectItem value="vaccine">Vacina</SelectItem>
              <SelectItem value="procedure">Procedimento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Ex: Consulta de rotina, Vacina antirrábica"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="professional">Profissional</Label>
        <Input
          id="professional"
          value={formData.professional}
          onChange={(e) => handleInputChange("professional", e.target.value)}
          placeholder="Nome do veterinário"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Detalhes do atendimento"
          required
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar Registro"}
        </Button>
      </div>
    </form>
  );
};

export default MedicalRecordForm;
