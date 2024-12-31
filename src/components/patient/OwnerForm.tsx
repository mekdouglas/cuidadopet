import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { createOwner, updateOwner, type Owner } from "@/lib/services/owners";
import { useToast } from "../ui/use-toast";

interface OwnerFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface OwnerFormProps {
  initialData?: Partial<OwnerFormData>;
  onSubmit?: (owner: Owner) => void;
  onCancel?: () => void;
  ownerId?: string;
}

const defaultData: OwnerFormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

const OwnerForm = ({
  initialData = defaultData,
  onSubmit,
  onCancel,
  ownerId,
}: OwnerFormProps) => {
  const [formData, setFormData] = React.useState<OwnerFormData>({
    ...defaultData,
    ...initialData,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let owner;
      if (ownerId) {
        owner = await updateOwner(ownerId, formData);
      } else {
        owner = await createOwner(formData);
      }

      toast({
        title: "Sucesso!",
        description: `Tutor ${ownerId ? "atualizado" : "cadastrado"} com sucesso.`,
      });

      if (onSubmit) {
        onSubmit(owner);
      }
    } catch (error) {
      console.error("Error saving owner:", error);
      toast({
        title: "Erro",
        description: `Erro ao ${ownerId ? "atualizar" : "cadastrar"} tutor. Tente novamente.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof OwnerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Tutor</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Nome completo"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="(00) 00000-0000"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="email@exemplo.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Rua, número, bairro, cidade - Estado"
          required
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
          {isLoading ? "Salvando..." : ownerId ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
};

export default OwnerForm;
