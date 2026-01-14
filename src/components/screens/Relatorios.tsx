import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { 
  FileText,
  Download,
  Filter,
  Settings,
  Eye,
  FileSpreadsheet,
  FileDown,
  X,
  Check,
  ChevronDown
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { toast } from "sonner@2.0.3";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface CampoDisponivel {
  id: string;
  label: string;
  categoria: string;
}

export default function Relatorios() {
  const [openBuilder, setOpenBuilder] = useState(false);
  const [openFiltros, setOpenFiltros] = useState(false);
  const [camposSelecionados, setCamposSelecionados] = useState<string[]>([
    "projeto",
    "departamento",
    "itemOrcamentario",
    "contratado",
    "realizado",
    "saldo"
  ]);
  const [agrupamento, setAgrupamento] = useState("");
  const [mostrarPrevia, setMostrarPrevia] = useState(false);

  // Filtros
  const [filtroProjeto, setFiltroProjeto] = useState("");
  const [filtroDepartamento, setFiltroDepartamento] = useState("");
  const [filtroGestao, setFiltroGestao] = useState("");
  const [filtroFase, setFiltroFase] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroGrandeItem, setFiltroGrandeItem] = useState("");
  const [tipoFiltroOrganizacional, setTipoFiltroOrganizacional] = useState<"departamento" | "gestao">("departamento");

  const camposDisponiveis: CampoDisponivel[] = [
    // Categoria: Projeto
    { id: "projeto", label: "Projeto", categoria: "Projeto" },
    { id: "departamento", label: "Departamento", categoria: "Projeto" },
    { id: "gestao", label: "Gestão", categoria: "Projeto" },
    { id: "fase", label: "Fase", categoria: "Projeto" },
    { id: "status", label: "Status", categoria: "Projeto" },
    
    // Categoria: Orçamento
    { id: "itemOrcamentario", label: "Item orçamentário", categoria: "Orçamento" },
    { id: "grandeItem", label: "Grande item", categoria: "Orçamento" },
    
    // Categoria: Valores
    { id: "contratado", label: "Contratado", categoria: "Valores" },
    { id: "comprometido", label: "Comprometido", categoria: "Valores" },
    { id: "realizado", label: "Realizado", categoria: "Valores" },
    { id: "liberado", label: "Liberado", categoria: "Valores" },
    { id: "saldo", label: "Saldo", categoria: "Valores" },
    
    // Categoria: Pagamento
    { id: "fornecedor", label: "Fornecedor", categoria: "Pagamento" },
    { id: "dataPagamento", label: "Data de pagamento", categoria: "Pagamento" },
    { id: "formaPagamento", label: "Forma de pagamento", categoria: "Pagamento" },
    { id: "rpa", label: "RPA", categoria: "Pagamento" },
  ];

  const dadosExemplo = [
    {
      projeto: "Projeto Alpha",
      departamento: "Produção",
      gestao: "Interna",
      fase: "Pré-produção",
      status: "Ativo",
      itemOrcamentario: "003.001 - Diretor(a)",
      grandeItem: "003 - Direção",
      contratado: 50000,
      comprometido: 25000,
      realizado: 25000,
      liberado: 50000,
      saldo: 25000,
      fornecedor: "João Silva",
      dataPagamento: "15/11/2024",
      formaPagamento: "Transferência",
      rpa: "Não",
    },
    {
      projeto: "Projeto Alpha",
      departamento: "Produção",
      gestao: "Interna",
      fase: "Pré-produção",
      status: "Ativo",
      itemOrcamentario: "003.002 - Assistente de direção",
      grandeItem: "003 - Direção",
      contratado: 20000,
      comprometido: 10000,
      realizado: 10000,
      liberado: 20000,
      saldo: 10000,
      fornecedor: "Paula Rodrigues",
      dataPagamento: "18/11/2024",
      formaPagamento: "PIX",
      rpa: "Sim",
    },
    {
      projeto: "Projeto Beta",
      departamento: "Direção",
      gestao: "Dedicada",
      fase: "Produção",
      status: "Ativo",
      itemOrcamentario: "001.001 - Chefe de roteiro",
      grandeItem: "001 - Roteiro",
      contratado: 30000,
      comprometido: 15000,
      realizado: 10000,
      liberado: 30000,
      saldo: 20000,
      fornecedor: "Maria Santos",
      dataPagamento: "20/11/2024",
      formaPagamento: "PIX",
      rpa: "Sim",
    },
    {
      projeto: "Projeto Beta",
      departamento: "Direção",
      gestao: "Dedicada",
      fase: "Produção",
      status: "Ativo",
      itemOrcamentario: "001.002 - Roteirista",
      grandeItem: "001 - Roteiro",
      contratado: 25000,
      comprometido: 12500,
      realizado: 12500,
      liberado: 25000,
      saldo: 12500,
      fornecedor: "Carlos Almeida",
      dataPagamento: "22/11/2024",
      formaPagamento: "Transferência",
      rpa: "Não",
    },
    {
      projeto: "Projeto Alpha",
      departamento: "Arte",
      gestao: "Interna",
      fase: "Pré-produção",
      status: "Ativo",
      itemOrcamentario: "005.002 - Edição",
      grandeItem: "005 - Pós-produção",
      contratado: 80000,
      comprometido: 40000,
      realizado: 40000,
      liberado: 80000,
      saldo: 40000,
      fornecedor: "Estúdio XYZ",
      dataPagamento: "25/11/2024",
      formaPagamento: "Transferência",
      rpa: "Não",
    },
    {
      projeto: "Projeto Alpha",
      departamento: "Arte",
      gestao: "Interna",
      fase: "Pré-produção",
      status: "Ativo",
      itemOrcamentario: "005.001 - Colorização",
      grandeItem: "005 - Pós-produção",
      contratado: 45000,
      comprometido: 22500,
      realizado: 15000,
      liberado: 45000,
      saldo: 30000,
      fornecedor: "Color Studio",
      dataPagamento: "26/11/2024",
      formaPagamento: "Transferência",
      rpa: "Não",
    },
  ];

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR")}`;
  };

  const toggleCampo = (campoId: string) => {
    if (camposSelecionados.includes(campoId)) {
      setCamposSelecionados(camposSelecionados.filter(c => c !== campoId));
    } else {
      setCamposSelecionados([...camposSelecionados, campoId]);
    }
  };

  const getCampoLabel = (campoId: string) => {
    return camposDisponiveis.find(c => c.id === campoId)?.label || campoId;
  };

  const renderCellValue = (row: any, campoId: string) => {
    const value = row[campoId];
    
    if (campoId === "contratado" || campoId === "comprometido" || 
        campoId === "realizado" || campoId === "liberado" || campoId === "saldo") {
      return formatCurrency(value);
    }
    
    return value;
  };

  const handleExportar = (formato: "CSV" | "XLSX" | "PDF") => {
    toast.success(`Relatório exportado em ${formato} com sucesso!`);
  };

  const handleGerarRelatorio = () => {
    if (camposSelecionados.length === 0) {
      toast.error("Selecione pelo menos um campo para gerar o relatório");
      return;
    }
    setMostrarPrevia(true);
    toast.success("Relatório gerado com sucesso!");
  };

  const handleLimparFiltros = () => {
    setFiltroProjeto("");
    setFiltroDepartamento("");
    setFiltroGestao("");
    setFiltroFase("");
    setFiltroStatus("");
    setFiltroGrandeItem("");
    toast.success("Filtros limpos!");
  };

  const getCamposPorCategoria = () => {
    const categorias: Record<string, CampoDisponivel[]> = {};
    
    camposDisponiveis.forEach(campo => {
      if (!categorias[campo.categoria]) {
        categorias[campo.categoria] = [];
      }
      categorias[campo.categoria].push(campo);
    });
    
    return categorias;
  };

  const camposPorCategoria = getCamposPorCategoria();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Relatórios</h2>
          <p className="text-muted-foreground mt-1">
            Construtor flexível de relatórios personalizados
          </p>
        </div>
      </div>

      {/* Card de Instruções */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Como usar o construtor de relatórios</p>
              <p className="text-sm text-blue-700 mt-1">
                1. Escolha os campos que deseja visualizar • 
                2. Aplique filtros avançados (opcional) • 
                3. Selecione um agrupamento (opcional) • 
                4. Gere a prévia • 
                5. Exporte nos formatos disponíveis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Construtor de Relatório */}
      <Card>
        <CardHeader>
          <CardTitle>Construtor de relatório</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campos selecionados */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Campos selecionados ({camposSelecionados.length})</Label>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setOpenBuilder(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Escolher campos
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {camposSelecionados.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum campo selecionado</p>
              ) : (
                camposSelecionados.map(campoId => (
                  <Badge key={campoId} variant="secondary" className="gap-2">
                    {getCampoLabel(campoId)}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => toggleCampo(campoId)}
                    />
                  </Badge>
                ))
              )}
            </div>
          </div>

          <Separator />

          {/* Filtros e Agrupamento */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Agrupamento</Label>
              <Select value={agrupamento} onValueChange={setAgrupamento}>
                <SelectTrigger>
                  <SelectValue placeholder="Sem agrupamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nenhum">Sem agrupamento</SelectItem>
                  <SelectItem value="projeto">Projeto</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="fornecedor">Fornecedor</SelectItem>
                  <SelectItem value="grandeItem">Grande item</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setOpenFiltros(true)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros avançados
              </Button>
            </div>
          </div>

          <Separator />

          {/* Ações */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline"
              onClick={() => {
                setCamposSelecionados([]);
                setAgrupamento("");
                setMostrarPrevia(false);
                handleLimparFiltros();
              }}
            >
              Limpar tudo
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleGerarRelatorio}
              >
                <Eye className="w-4 h-4 mr-2" />
                Gerar prévia
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExportar("CSV")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportar("XLSX")}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Exportar XLSX
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportar("PDF")}>
                    <FileDown className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prévia do Relatório */}
      {mostrarPrevia && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Prévia do relatório</CardTitle>
              {agrupamento && agrupamento !== "nenhum" && (
                <Badge variant="outline">Agrupado por: {getCampoLabel(agrupamento)}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[600px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {camposSelecionados.map(campoId => (
                      <TableHead key={campoId}>
                        {getCampoLabel(campoId)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosExemplo.map((row, index) => (
                    <TableRow key={index}>
                      {camposSelecionados.map(campoId => (
                        <TableCell key={campoId}>
                          {renderCellValue(row, campoId)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                📊 Exibindo {dadosExemplo.length} de {dadosExemplo.length} registros • 
                {agrupamento && agrupamento !== "nenhum" ? ` Agrupado por ${getCampoLabel(agrupamento)} • ` : " "}
                {camposSelecionados.length} campo{camposSelecionados.length !== 1 ? 's' : ''} selecionado{camposSelecionados.length !== 1 ? 's' : ''}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal - Escolher Campos */}
      <Dialog open={openBuilder} onOpenChange={setOpenBuilder}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="dialog-builder-description">
          <DialogHeader>
            <DialogTitle>Escolher campos do relatório</DialogTitle>
            <DialogDescription id="dialog-builder-description">
              Selecione os campos que deseja visualizar no relatório (multiseleção)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {Object.entries(camposPorCategoria).map(([categoria, campos]) => (
              <div key={categoria}>
                <h4 className="font-medium mb-3 text-primary">{categoria}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {campos.map(campo => (
                    <div key={campo.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={campo.id}
                        checked={camposSelecionados.includes(campo.id)}
                        onCheckedChange={() => toggleCampo(campo.id)}
                      />
                      <label
                        htmlFor={campo.id}
                        className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {campo.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="mt-6">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-muted-foreground">
                {camposSelecionados.length} campo{camposSelecionados.length !== 1 ? 's' : ''} selecionado{camposSelecionados.length !== 1 ? 's' : ''}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCamposSelecionados([])}>
                  Limpar seleção
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90" 
                  onClick={() => setOpenBuilder(false)}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal - Filtros Avançados */}
      <Dialog open={openFiltros} onOpenChange={setOpenFiltros}>
        <DialogContent aria-describedby="dialog-filtros-description">
          <DialogHeader>
            <DialogTitle>Filtros avançados</DialogTitle>
            <DialogDescription id="dialog-filtros-description">
              Aplique filtros para refinar os dados do relatório
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label>Projeto</Label>
              <Select value={filtroProjeto} onValueChange={setFiltroProjeto}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os projetos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                  <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                  <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro Organizacional com Radio Group */}
            <div>
              <Label className="mb-3 block">Tipo de filtro organizacional</Label>
              <RadioGroup 
                value={tipoFiltroOrganizacional} 
                onValueChange={(value: "departamento" | "gestao") => {
                  setTipoFiltroOrganizacional(value);
                  // Limpar o outro filtro quando trocar
                  if (value === "departamento") {
                    setFiltroGestao("");
                  } else {
                    setFiltroDepartamento("");
                  }
                }}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="departamento" id="filtro-departamento" />
                  <label htmlFor="filtro-departamento" className="text-sm cursor-pointer">
                    Departamento
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gestao" id="filtro-gestao" />
                  <label htmlFor="filtro-gestao" className="text-sm cursor-pointer">
                    Gestão
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Mostrar apenas o filtro selecionado */}
            {tipoFiltroOrganizacional === "departamento" ? (
              <div>
                <Label>Departamento</Label>
                <Select value={filtroDepartamento} onValueChange={setFiltroDepartamento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os departamentos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Produção">Produção</SelectItem>
                    <SelectItem value="Direção">Direção</SelectItem>
                    <SelectItem value="Arte">Arte</SelectItem>
                    <SelectItem value="Fotografia">Fotografia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div>
                <Label>Gestão</Label>
                <Select value={filtroGestao} onValueChange={setFiltroGestao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as gestões" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    <SelectItem value="Interna">Interna</SelectItem>
                    <SelectItem value="Dedicada">Dedicada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Grande item</Label>
              <Select value={filtroGrandeItem} onValueChange={setFiltroGrandeItem}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os grandes itens" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="003 - Direção">003 - Direção</SelectItem>
                  <SelectItem value="001 - Roteiro">001 - Roteiro</SelectItem>
                  <SelectItem value="005 - Pós-produção">005 - Pós-produção</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Fase</Label>
              <Select value={filtroFase} onValueChange={setFiltroFase}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as fases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  <SelectItem value="Pré-produção">Pré-produção</SelectItem>
                  <SelectItem value="Produção">Produção</SelectItem>
                  <SelectItem value="Pós-produção">Pós-produção</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Pausado">Pausado</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={handleLimparFiltros}>
              Limpar filtros
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90" 
              onClick={() => {
                setOpenFiltros(false);
                toast.success("Filtros aplicados!");
              }}
            >
              Aplicar filtros
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}