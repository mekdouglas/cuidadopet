import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { CalendarDays, Syringe, Stethoscope } from "lucide-react";
import {
  getMedicalRecords,
  type MedicalRecord,
} from "@/lib/services/medical-records";
import { useToast } from "../ui/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MedicalTimelineProps {
  patientId: string;
}

const getEventIcon = (type: MedicalRecord["type"]) => {
  switch (type) {
    case "consultation":
      return <Stethoscope className="h-5 w-5" />;
    case "vaccine":
      return <Syringe className="h-5 w-5" />;
    case "procedure":
      return <CalendarDays className="h-5 w-5" />;
  }
};

const getEventColor = (type: MedicalRecord["type"]) => {
  switch (type) {
    case "consultation":
      return "bg-blue-100 text-blue-800";
    case "vaccine":
      return "bg-green-100 text-green-800";
    case "procedure":
      return "bg-purple-100 text-purple-800";
  }
};

const MedicalTimeline = ({ patientId }: MedicalTimelineProps) => {
  const [records, setRecords] = React.useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    const loadMedicalRecords = async () => {
      try {
        const data = await getMedicalRecords(patientId);
        setRecords(data);
      } catch (error) {
        console.error("Error loading medical records:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar histórico médico. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      loadMedicalRecords();
    }
  }, [patientId, toast]);

  if (isLoading) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Histórico Médico</h2>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-4 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Histórico Médico</h2>
        <Card className="p-6 text-center text-gray-500">
          Nenhum registro médico encontrado
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Histórico Médico</h2>
      <div className="space-y-6">
        {records.map((record, index) => (
          <div key={record.id} className="relative">
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-full ${getEventColor(record.type)}`}
                >
                  {getEventIcon(record.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{record.title}</h3>
                      <p className="text-sm text-gray-500">
                        {record.professional}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {format(new Date(record.date), "PPp", { locale: ptBR })}
                    </Badge>
                  </div>
                  <p className="mt-2 text-gray-600">{record.description}</p>
                </div>
              </div>
            </Card>
            {index < records.length - 1 && (
              <div className="absolute left-7 top-[calc(100%+1px)] bottom-0 w-px bg-gray-200 h-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalTimeline;
