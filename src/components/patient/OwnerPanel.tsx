import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Syringe, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MedicalRecordForm from "./MedicalRecordForm";
import type { MedicalRecord } from "@/lib/services/medical-records";

interface OwnerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface OwnerPanelProps {
  ownerInfo?: OwnerInfo;
  patientId: string;
  onRecordCreated?: (record: MedicalRecord) => void;
}

const defaultOwnerInfo: OwnerInfo = {
  name: "João Silva",
  phone: "(11) 99999-9999",
  email: "joao.silva@email.com",
  address: "Rua das Flores, 123 - São Paulo, SP",
};

const OwnerPanel = ({
  ownerInfo = defaultOwnerInfo,
  patientId,
  onRecordCreated,
}: OwnerPanelProps) => {
  const [isNewConsultationOpen, setIsNewConsultationOpen] =
    React.useState(false);
  const [isNewVaccineOpen, setIsNewVaccineOpen] = React.useState(false);
  const [isNewProcedureOpen, setIsNewProcedureOpen] = React.useState(false);

  const handleRecordCreated = (record: MedicalRecord) => {
    if (onRecordCreated) {
      onRecordCreated(record);
    }
    setIsNewConsultationOpen(false);
    setIsNewVaccineOpen(false);
    setIsNewProcedureOpen(false);
  };

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
            <Dialog
              open={isNewConsultationOpen}
              onOpenChange={setIsNewConsultationOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="default">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Consulta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Consulta</DialogTitle>
                </DialogHeader>
                <MedicalRecordForm
                  patientId={patientId}
                  initialType="consultation"
                  onSubmit={handleRecordCreated}
                  onCancel={() => setIsNewConsultationOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={isNewVaccineOpen} onOpenChange={setIsNewVaccineOpen}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="secondary">
                  <Syringe className="mr-2 h-4 w-4" />
                  Adicionar Vacina
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Vacina</DialogTitle>
                </DialogHeader>
                <MedicalRecordForm
                  patientId={patientId}
                  initialType="vaccine"
                  onSubmit={handleRecordCreated}
                  onCancel={() => setIsNewVaccineOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog
              open={isNewProcedureOpen}
              onOpenChange={setIsNewProcedureOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Novo Procedimento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Procedimento</DialogTitle>
                </DialogHeader>
                <MedicalRecordForm
                  patientId={patientId}
                  initialType="procedure"
                  onSubmit={handleRecordCreated}
                  onCancel={() => setIsNewProcedureOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OwnerPanel;
