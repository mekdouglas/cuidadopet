import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import MedicalTimeline from "./MedicalTimeline";
import OwnerPanel from "./OwnerPanel";
import TagSystem from "./TagSystem";
import type { MedicalRecord } from "@/lib/services/medical-records";

interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  sex: "male" | "female";
  photo_url: string;
}

interface PatientRecordProps {
  patient?: Patient;
  onBack?: () => void;
}

const defaultPatient: Patient = {
  id: "1",
  name: "Max",
  species: "Cachorro",
  breed: "Labrador",
  age: 5,
  weight: 25,
  sex: "male",
  photo_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=pet1",
};

const PatientRecord = ({
  patient = defaultPatient,
  onBack,
}: PatientRecordProps) => {
  const [records, setRecords] = React.useState<MedicalRecord[]>([]);

  const handleRecordCreated = (newRecord: MedicalRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Button variant="ghost" className="h-8 px-2" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar para Lista
          </Button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Prontuário</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{patient.name}</span>
        </nav>

        {/* Header Section */}
        <Card className="p-6 bg-white">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={patient.photo_url}
                alt={patient.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {patient.name}
                  </h1>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-600">
                      {patient.species} • {patient.breed}
                    </p>
                    <p className="text-gray-600">
                      {patient.age} anos • {patient.weight}kg •{" "}
                      {patient.sex === "male" ? "Macho" : "Fêmea"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <TagSystem />
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Medical Timeline */}
          <div className="flex-1">
            <MedicalTimeline patientId={patient.id} />
          </div>

          {/* Owner Panel */}
          <OwnerPanel
            patientId={patient.id}
            onRecordCreated={handleRecordCreated}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;
