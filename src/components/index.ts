// Exportação centralizada de componentes globais
// Permite imports mais limpos: import { Header, Sidebar, BarraSaldo } from '@/components'

// Componentes de Layout
export { Header } from './Header';
export { HeaderSimplified } from './HeaderSimplified';
export { default as Sidebar } from './Sidebar';

// Componentes de Navegação
export { PublicRoutes } from './PublicRoutes';
export { FiltroProjetoGlobal } from './FiltroProjetoGlobal';
export { TabScrollContainer } from './TabScrollContainer';

// Componentes de Dados
export { BarraSaldo } from './BarraSaldo';
export { KPIsLiquidez } from './KPIsLiquidez';
export { GraficoProgressoPED } from './GraficoProgressoPED';

// Componentes de Exibição
export { CardCarousel } from './CardCarousel';
export { ToolbarCarousel } from './ToolbarCarousel';

// Componentes de Planilha
export { SpreadsheetGrid } from './SpreadsheetGrid';
export { SpreadsheetGridExample } from './SpreadsheetGridExample';
