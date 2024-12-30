import React from "react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Tag {
  id: string;
  label: string;
  type: "allergy" | "chronic";
  severity?: "low" | "medium" | "high";
}

interface TagSystemProps {
  tags?: Tag[];
}

const defaultTags: Tag[] = [
  { id: "1", label: "Alergia a Penicilina", type: "allergy", severity: "high" },
  { id: "2", label: "Diabetes", type: "chronic", severity: "medium" },
  { id: "3", label: "Alergia a Ração", type: "allergy", severity: "low" },
];

const TagSystem = ({ tags = defaultTags }: TagSystemProps) => {
  const getTagColor = (type: Tag["type"], severity?: Tag["severity"]) => {
    if (type === "allergy") {
      switch (severity) {
        case "high":
          return "bg-red-100 text-red-800 hover:bg-red-200";
        case "medium":
          return "bg-orange-100 text-orange-800 hover:bg-orange-200";
        default:
          return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      }
    }
    return "bg-blue-100 text-blue-800 hover:bg-blue-200";
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white rounded-md">
      <TooltipProvider>
        {tags.map((tag) => (
          <Tooltip key={tag.id}>
            <TooltipTrigger>
              <Badge
                className={`cursor-pointer ${getTagColor(tag.type, tag.severity)}`}
                variant="secondary"
              >
                {tag.label}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tag.type === "allergy" ? "Alergia" : "Condição Crônica"}</p>
              {tag.severity && (
                <p className="capitalize">Severidade: {tag.severity}</p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default TagSystem;
