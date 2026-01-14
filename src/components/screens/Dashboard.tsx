import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Calendar,
  AlertTriangle,
  DollarSign,
  Search,
  Building2,
} from "lucide-react@0.487.0";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import KPIsLiquidez from "../KPIsLiquidez";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectVerbas, setSelectedProjectVerbas] = useState("todos");
  const [selectedProjectOrcamento, setSelectedProjectOrcamento] = useState("todos");

  // Mock data - Lista de projetos
  const projects = [
    { id: "proj-001", nome: "Love Taste 1T", status: "ativo" },
    { id: "proj-002", nome: "Love Taste 2T", status: "ativo" },
    { id: "proj-003", nome: "Série Documentário - História", status: "ativo" },
    { id: "proj-004", nome: "Longa-metragem - Drama", status: "ativo" },
    { id: "proj-005", nome: "Curta-metragem - Experimental", status: "ativo" },
    { id: "proj-006", nome: "Websérie - Comédia", status: "ativo" },
  ];

  // Mock data - Dados do "Esboço Padaria" para KPIs de Liquidez
  // Esses valores mudam conforme o projeto selecionado
  const getKPIsData = () => {
    // Dados base (todos os projetos)
    const baseData = {
      totalLiberado: 4600000,
      totalComprometido: 3800000,
      proximoCicloDia: 30 as const,
      proximoCicloValor: 187500,
      saldoInicial: 5000000,
      gastosReais: 2950000,
    };

    // Dados específicos por projeto
    const projectData: { [key: string]: typeof baseData } = {
      "proj-001": {
        totalLiberado: 1200000,
        totalComprometido: 980000,
        proximoCicloDia: 10 as const,
        proximoCicloValor: 45000,
        saldoInicial: 1500000,
        gastosReais: 750000,
      },
      "proj-002": {
        totalLiberado: 1800000,
        totalComprometido: 1650000,
        proximoCicloDia: 20 as const,
        proximoCicloValor: 78000,
        saldoInicial: 2000000,
        gastosReais: 1200000,
      },
      "proj-003": {
        totalLiberado: 800000,
        totalComprometido: 720000,
        proximoCicloDia: 30 as const,
        proximoCicloValor: 35000,
        saldoInicial: 900000,
        gastosReais: 450000,
      },
      "proj-004": {
        totalLiberado: 600000,
        totalComprometido: 350000,
        proximoCicloDia: 10 as const,
        proximoCicloValor: 18500,
        saldoInicial: 700000,
        gastosReais: 300000,
      },
      "proj-005": {
        totalLiberado: 150000,
        totalComprometido: 85000,
        proximoCicloDia: 20 as const,
        proximoCicloValor: 8000,
        saldoInicial: 180000,
        gastosReais: 65000,
      },
      "proj-006": {
        totalLiberado: 50000,
        totalComprometido: 15000,
        proximoCicloDia: 30 as const,
        proximoCicloValor: 3000,
        saldoInicial: 120000,
        gastosReais: 185000, // Estouro proposital para demonstração
      },
    };

    return selectedProjectOrcamento === "todos" ? baseData : (projectData[selectedProjectOrcamento] || baseData);
  };

  const kpisData = getKPIsData();
  
  // Mock data para verbas por departamento
  const verbasDeptos = [
    { depto: "Produção", solicitada: 250000, prestada: 180000, em_aberto: 70000, reembolsada: 15000 },
    { depto: "Direção de Arte", solicitada: 180000, prestada: 120000, em_aberto: 60000, reembolsada: 8000 },
    { depto: "Fotografia", solicitada: 120000, prestada: 90000, em_aberto: 30000, reembolsada: 5000 },
    { depto: "Som", solicitada: 85000, prestada: 60000, em_aberto: 25000, reembolsada: 3000 },
    { depto: "Figurino", solicitada: 95000, prestada: 70000, em_aberto: 25000, reembolsada: 4000 },
  ];

  const totalVerbas = verbasDeptos.reduce((acc, d) => ({
    solicitada: acc.solicitada + d.solicitada,
    prestada: acc.prestada + d.prestada,
    em_aberto: acc.em_aberto + d.em_aberto,
    reembolsada: acc.reembolsada + d.reembolsada,
  }), { solicitada: 0, prestada: 0, em_aberto: 0, reembolsada: 0 });

  const activities = [
    { text: "Contrato #C789 aprovado", status: "Aprovado", color: "bg-green-100 text-green-800", time: "Há 5 min" },
    { text: "Pagamento #P245 em validação", status: "Em análise", color: "bg-blue-100 text-blue-800", time: "Há 12 min" },
    { text: "Prestação #PR-032 atrasada", status: "Urgente", color: "bg-red-100 text-red-800", time: "Há 1 hora" },
    { text: "Orçamento #002.045 atualizado", status: "Concluído", color: "bg-green-100 text-green-800", time: "Há 2 horas" },
    { text: "Nova solicitação #S156 criada", status: "Pendente", color: "bg-yellow-100 text-yellow-800", time: "Há 3 horas" },
    { text: "Documento #DOC-089 anexado", status: "Concluído", color: "bg-green-100 text-green-800", time: "Há 4 horas" },
    { text: "Contrato #C790 aguardando assinatura", status: "Em análise", color: "bg-blue-100 text-blue-800", time: "Há 5 horas" },
    { text: "Carga #CR-045 processada", status: "Aprovado", color: "bg-green-100 text-green-800", time: "Há 6 horas" },
    { text: "Relatório mensal disponível", status: "Concluído", color: "bg-green-100 text-green-800", time: "Há 1 dia" },
    { text: "Novo usuário adicionado ao projeto", status: "Concluído", color: "bg-green-100 text-green-800", time: "Há 1 dia" },
  ];

  const filteredActivities = activities.filter(activity =>
    activity.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtra dados baseado no projeto selecionado (para verbas)
  const getProjectLabelVerbas = () => {
    if (selectedProjectVerbas === "todos") return "Todos os Projetos";
    const project = projects.find(p => p.id === selectedProjectVerbas);
    return project?.nome || "Todos os Projetos";
  };

  return (
    <div className="space-y-0 relative" style={{ pointerEvents: 'auto' }}>
      {/* KPIs de Liquidez - Sticky Header */}
      <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 30 }}>
        <KPIsLiquidez
          totalLiberado={kpisData.totalLiberado}
          totalComprometido={kpisData.totalComprometido}
          proximoCicloDia={kpisData.proximoCicloDia}
          proximoCicloValor={kpisData.proximoCicloValor}
          saldoInicial={kpisData.saldoInicial}
          gastosReais={kpisData.gastosReais}
          projects={projects}
          selectedProjectOrcamento={selectedProjectOrcamento}
          onProjectChange={setSelectedProjectOrcamento}
        />
      </div>

      {/* Conteúdo principal do Dashboard */}
      <div className="p-3 md:p-6 space-y-4 md:space-y-6" style={{ pointerEvents: 'auto' }}>
        {/* Header com título */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl text-foreground">Dashboard</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Resumo operacional
            </p>
          </div>
        </div>

        {/* Main Cards - Grid 4 colunas (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {/* Card 1: Pagamentos (novo) */}
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] pointer-events-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-base">Pagamentos</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Quantidade por próxima data de pagamento
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">Próxima data:</span>
                  <span className="text-foreground">30/01/2025</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">Quantidade de pagamentos:</span>
                  <span className="text-2xl text-purple-600 dark:text-purple-400">23</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">Valor total:</span>
                  <span className="text-lg text-foreground">R$ 187.500</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Alertas de prazo */}
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] pointer-events-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">Alertas de prazo</CardTitle>
                    <Badge variant="destructive">12</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Itens que exigem atenção imediata
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Pagamentos atrasados</p>
                    <p className="text-xs text-muted-foreground">(data vencida e status diferente de Pago)</p>
                    <Badge variant="outline" className="mt-1 text-xs">3 itens</Badge>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Contratos que terminam em até 7 dias</p>
                    <Badge variant="outline" className="mt-1 text-xs">5 itens</Badge>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Rubricas liberadas sem fornecedor definido</p>
                    <Badge variant="outline" className="mt-1 text-xs">4 itens</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Resumo de orçamento */}
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] pointer-events-auto">
            <CardHeader>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">Resumo de orçamento</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Totais consolidados de todos os projetos ativos
                    </p>
                  </div>
                </div>
                
                {/* Seletor de Projeto - APENAS DESKTOP */}
                <div className="hidden md:block">
                  <Select value={selectedProjectOrcamento} onValueChange={setSelectedProjectOrcamento}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">
                        <span className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Todos os Projetos
                        </span>
                      </SelectItem>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Aprovado:</span>
                  <span className="text-foreground">R$ 5.000.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Liberado:</span>
                  <span className="text-foreground">R$ 4.600.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Comprometido:</span>
                  <span className="text-foreground">R$ 3.800.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Realizado:</span>
                  <span className="text-foreground">R$ 2.950.000</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm">Saldo:</span>
                  <span className="text-lg text-green-600 dark:text-green-400">R$ 850.000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Verbas por departamento (novo) */}
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] pointer-events-auto">
            <CardHeader>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">Verbas por departamento</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {selectedProjectVerbas === "todos" 
                        ? "Resumo consolidado de todos os projetos ativos" 
                        : `Projeto: ${getProjectLabelVerbas()}`}
                    </p>
                  </div>
                </div>
                
                {/* Seletor de Projeto */}
                <Select value={selectedProjectVerbas} onValueChange={setSelectedProjectVerbas}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Todos os Projetos
                      </span>
                    </SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Totais gerais */}
                <div className="space-y-2 pb-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Solicitada:</span>
                    <span className="text-foreground">R$ {totalVerbas.solicitada.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Prestada:</span>
                    <span className="text-foreground">R$ {totalVerbas.prestada.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Em aberto:</span>
                    <span className="text-orange-600 dark:text-orange-400">R$ {totalVerbas.em_aberto.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reembolsada:</span>
                    <span className="text-green-600 dark:text-green-400">R$ {totalVerbas.reembolsada.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                {/* Lista de departamentos (preview dos 3 primeiros) */}
                <div className="space-y-2 max-h-[120px] overflow-y-auto">
                  {verbasDeptos.slice(0, 3).map((depto, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 rounded border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => {
                        // Ação futura: abrir_detalhe_departamento(depto.depto)
                        console.log('Abrir detalhe:', depto.depto);
                      }}
                    >
                      <span className="text-sm text-foreground">{depto.depto}</span>
                      <span className="text-xs text-muted-foreground">
                        R$ {depto.solicitada.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground pt-1">
                  Clique em um departamento para ver detalhes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Atividades recentes</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar no painel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 px-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="text-foreground">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ml-4 ${activity.color}`}>
                      {activity.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma atividade encontrada
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}