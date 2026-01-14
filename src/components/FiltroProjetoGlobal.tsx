import { Building2 } from "lucide-react@0.487.0";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useProjectFilter } from "../contexts/ProjectFilterContext";

interface Projeto {
  id: string;
  nome: string;
  status: string;
}

interface FiltroProjetoGlobalProps {
  projetos: Projeto[];
  className?: string;
}

export default function FiltroProjetoGlobal({ projetos, className = "" }: FiltroProjetoGlobalProps) {
  const { selectedProject, setSelectedProject } = useProjectFilter();

  const getProjectLabel = () => {
    if (selectedProject === "todos") return "Todos os Projetos";
    const project = projetos.find(p => p.id === selectedProject);
    return project?.nome || "Todos os Projetos";
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Building2 className="w-5 h-5" />
        <span className="text-sm">Projeto:</span>
      </div>
      <Select value={selectedProject} onValueChange={setSelectedProject}>
        <SelectTrigger className="w-[320px]">
          <SelectValue>{getProjectLabel()}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Todos os Projetos</span>
            </div>
          </SelectItem>
          {projetos.map(project => (
            <SelectItem key={project.id} value={project.id}>
              <div className="flex items-center justify-between gap-2 w-full">
                <span>{project.nome}</span>
                {project.status === "ativo" && (
                  <span className="text-xs text-green-600 dark:text-green-400">Ativo</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}