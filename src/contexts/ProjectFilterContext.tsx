import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectFilterContextType {
  selectedProject: string;
  setSelectedProject: (projectId: string) => void;
}

const ProjectFilterContext = createContext<ProjectFilterContextType | undefined>(undefined);

export function ProjectFilterProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState("todos");

  return (
    <ProjectFilterContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectFilterContext.Provider>
  );
}

export function useProjectFilter() {
  const context = useContext(ProjectFilterContext);
  if (context === undefined) {
    throw new Error("useProjectFilter must be used within a ProjectFilterProvider");
  }
  return context;
}
