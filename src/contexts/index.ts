// Exportação centralizada de todos os contexts
// Permite imports mais limpos: import { AuthProvider, useAuth } from '@/contexts'

export { AuthProvider, useAuth } from './AuthContext';
export { ProjectFilterProvider, useProjectFilter } from './ProjectFilterContext';
