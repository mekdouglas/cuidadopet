import React from "react";
import { Card } from "../ui/card";
import MedicalTimeline from "./MedicalTimeline";
import OwnerPanel from "./OwnerPanel";
import TagSystem from "./TagSystem";

interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  sex: "male" | "female";
  photoUrl: string;
}

interface PatientRecordProps {
  patient?: Patient;
}

const defaultPatient: Patient = {
  id: "1",
  name: "Max",
  species: "Cachorro",
  breed: "Labrador",
  age: 5,
  weight: 25,
  sex: "male",
  photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=pet1",
};

const PatientRecord = ({ patient = defaultPatient }: PatientRecordProps) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <Card className="p-6 bg-white">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={patient.photoUrl}
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
            <MedicalTimeline />
          </div>

          {/* Owner Panel */}
          <OwnerPanel />
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;
