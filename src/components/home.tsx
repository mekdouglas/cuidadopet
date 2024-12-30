import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import SearchBar from "./patient/SearchBar";
import PatientForm from "./patient/PatientForm";
import PatientRecord from "./patient/PatientRecord";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface HomeProps {
  initialView?: "list" | "record";
  patientId?: string;
}

const Home = ({ initialView = "list", patientId }: HomeProps) => {
  const [view, setView] = React.useState(initialView);
  const [selectedPatientId, setSelectedPatientId] = React.useState(patientId);
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] =
    React.useState(false);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleFilter = (filters: string[]) => {
    console.log("Applying filters:", filters);
  };

  const handlePatientSubmit = (data: any) => {
    console.log("Patient data submitted:", data);
    setIsNewPatientDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Prontuário Eletrônico Veterinário
          </h1>
          <Dialog
            open={isNewPatientDialogOpen}
            onOpenChange={setIsNewPatientDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
              </DialogHeader>
              <PatientForm onSubmit={handlePatientSubmit} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} />

        {/* Main Content */}
        {view === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for patient list */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setView("record");
                  setSelectedPatientId(`patient-${index}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=pet${index}`}
                    alt="Pet avatar"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">Pet {index + 1}</h3>
                    <p className="text-sm text-gray-500">Espécie • Raça</p>
                    <p className="text-sm text-gray-500">
                      Tutor: Nome do Tutor
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <PatientRecord />
        )}
      </div>
    </div>
  );
};

export default Home;
