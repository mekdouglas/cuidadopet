import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Syringe, FileText } from "lucide-react";

interface OwnerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface OwnerPanelProps {
  ownerInfo?: OwnerInfo;
  onNewConsultation?: () => void;
  onAddVaccine?: () => void;
  onGenerateDocument?: () => void;
}

const defaultOwnerInfo: OwnerInfo = {
  name: "João Silva",
  phone: "(11) 99999-9999",
  email: "joao.silva@email.com",
  address: "Rua das Flores, 123 - São Paulo, SP",
};

const OwnerPanel = ({
  ownerInfo = defaultOwnerInfo,
  onNewConsultation = () => console.log("New consultation"),
  onAddVaccine = () => console.log("Add vaccine"),
  onGenerateDocument = () => console.log("Generate document"),
}: OwnerPanelProps) => {
  return (
    <Card className="w-[300px] h-full p-4 bg-white">
      <div className="space-y-6">
        {/* Owner Information Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Informações do Tutor
          </h2>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">
              {ownerInfo.name}
            </p>
            <p className="text-sm text-gray-600">{ownerInfo.phone}</p>
            <p className="text-sm text-gray-600">{ownerInfo.email}</p>
            <p className="text-sm text-gray-600">{ownerInfo.address}</p>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900">Ações</h3>
          <div className="space-y-2">
            <Button
              className="w-full justify-start"
              variant="default"
              onClick={onNewConsultation}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>

            <Button
              className="w-full justify-start"
              variant="secondary"
              onClick={onAddVaccine}
            >
              <Syringe className="mr-2 h-4 w-4" />
              Adicionar Vacina
            </Button>

            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={onGenerateDocument}
            >
              <FileText className="mr-2 h-4 w-4" />
              Gerar Documentos
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OwnerPanel;
