import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { CalendarDays, Syringe, Stethoscope } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  type: "consultation" | "vaccine" | "procedure";
  title: string;
  description: string;
  professional: string;
}

interface MedicalTimelineProps {
  events?: TimelineEvent[];
}

const defaultEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "consultation",
    title: "Consulta de Rotina",
    description: "Checkup geral com exame físico completo",
    professional: "Dra. Maria Silva",
  },
  {
    id: "2",
    date: "2024-01-01",
    type: "vaccine",
    title: "Vacinação V10",
    description: "Dose anual da vacina V10",
    professional: "Dr. João Santos",
  },
  {
    id: "3",
    date: "2023-12-20",
    type: "procedure",
    title: "Limpeza Dentária",
    description: "Procedimento de profilaxia dentária sob anestesia",
    professional: "Dra. Ana Costa",
  },
];

const getEventIcon = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "consultation":
      return <Stethoscope className="h-5 w-5" />;
    case "vaccine":
      return <Syringe className="h-5 w-5" />;
    case "procedure":
      return <CalendarDays className="h-5 w-5" />;
  }
};

const getEventColor = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "consultation":
      return "bg-blue-100 text-blue-800";
    case "vaccine":
      return "bg-green-100 text-green-800";
    case "procedure":
      return "bg-purple-100 text-purple-800";
  }
};

const MedicalTimeline = ({ events = defaultEvents }: MedicalTimelineProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Histórico Médico</h2>
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative">
            <Card className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-full ${getEventColor(event.type)}`}
                >
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {event.professional}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {new Date(event.date).toLocaleDateString("pt-BR")}
                    </Badge>
                  </div>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                </div>
              </div>
            </Card>
            {index < events.length - 1 && (
              <div className="absolute left-7 top-[calc(100%+1px)] bottom-0 w-px bg-gray-200 h-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalTimeline;
