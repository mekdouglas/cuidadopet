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
import { getPatients, type Patient } from "@/lib/services/patients";
import { useToast } from "./ui/use-toast";

interface HomeProps {
  initialView?: "list" | "record";
  patientId?: string;
}

const Home = ({ initialView = "list", patientId }: HomeProps) => {
  const [view, setView] = React.useState(initialView);
  const [selectedPatientId, setSelectedPatientId] = React.useState(patientId);
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] =
    React.useState(false);
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  // Initial load of patients
  React.useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error loading patients:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar pacientes. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSubmit = async (data: any) => {
    setIsNewPatientDialogOpen(false);
    await loadPatients(); // Reload the patient list
  };

  const handleSearchResults = (results: Patient[]) => {
    setPatients(results);
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedPatientId(undefined);
  };

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  return (
    <div className="min-h-screen bg-gray-100">
      {view === "list" ? (
        <div className="p-6">
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
            <SearchBar onResults={handleSearchResults} />

            {/* Patient List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-white rounded-lg shadow p-4 animate-pulse"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))
              ) : patients.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Nenhum paciente encontrado</p>
                </div>
              ) : (
                patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setView("record");
                      setSelectedPatientId(patient.id);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          patient.photo_url ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.id}`
                        }
                        alt={`${patient.name}'s photo`}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {patient.species} • {patient.breed}
                        </p>
                        <p className="text-sm text-gray-500">
                          {patient.owners?.name
                            ? `Tutor: ${patient.owners.name}`
                            : "Sem tutor cadastrado"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        selectedPatient && (
          <PatientRecord patient={selectedPatient} onBack={handleBackToList} />
        )
      )}
    </div>
  );
};

export default Home;
