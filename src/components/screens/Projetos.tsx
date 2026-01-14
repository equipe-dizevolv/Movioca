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
import { Plus, Search, MoreVertical, X, ArrowLeft, ChevronRight, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner@2.0.3";
import { useAuth, permissions } from "../../contexts/AuthContext";

interface ProjetosProps {
  onViewProject?: (project: any) => void;
}

type View = 'list' | 'create' | 'edit';

export default function Projetos({ onViewProject }: ProjetosProps) {
  const { currentUser, hasPermission } = useAuth();
  const canManage = hasPermission(permissions.canManageProjetos);
  
  const [view, setView] = useState<View>('list');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [deleteConfirmCode, setDeleteConfirmCode] = useState("");
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDuplicate, setOpenDuplicate] = useState(false);
  const [copyBudget, setCopyBudget] = useState(false);
  const [openFonteModal, setOpenFonteModal] = useState(false);
  const [editingFonteIndex, setEditingFonteIndex] = useState<number | null>(null);
  const [coprodutores, setCoprodutores] = useState<string[]>([]);
  const [coproInput, setCoproInput] = useState("");
  const [formatoSelecionado, setFormatoSelecionado] = useState("");
  const [episodios, setEpisodios] = useState("");
  const [duracaoEpisodios, setDuracaoEpisodios] = useState("");
  const [fontesFinanciamento, setFontesFinanciamento] = useState<any[]>([]);

  const projetos = [
    {
      codigo: "PROJ-001",
      nome: "Série Documentário - História",
      genero: "Documentário",
      formato: "Série",
      ano: 2024,
      temporadas: "1ª temporada",
      canal: "TV Cultura",
      coprodutores: ["Produtora ABC", "Canal XYZ"],
      distribuidora: "Distribuidora Nacional",
      fontesDetalhes: [
        { 
          fonte: "ANCINE", 
          codigoProjeto: "ANC-2024-001",
          agencia: "Banco do Brasil 1234-5",
          contaCorrente: "12345-6",
          valor: "R$ 500.000,00" 
        },
        { 
          fonte: "FSA", 
          codigoProjeto: "FSA-2024-012",
          agencia: "Caixa 9876-1",
          contaCorrente: "98765-4",
          valor: "R$ 300.000,00" 
        }
      ],
    },
    {
      codigo: "PROJ-002",
      nome: "Longa-metragem - Drama",
      genero: "Ficção",
      formato: "Longa-metragem",
      ano: 2025,
      temporadas: "",
      canal: "Cinema",
      coprodutores: ["Produtora XYZ"],
      distribuidora: "Paris Filmes",
      fontesDetalhes: [
        { 
          fonte: "ANCINE", 
          codigoProjeto: "ANC-2025-003",
          agencia: "",
          contaCorrente: "",
          valor: "R$ 800.000,00" 
        }
      ],
    },
    {
      codigo: "PROJ-003",
      nome: "Curta - Animação",
      genero: "Animação",
      formato: "Curta-metragem",
      ano: 2023,
      temporadas: "",
      canal: "Festivais",
      coprodutores: [],
      distribuidora: "",
      fontesDetalhes: [
        { 
          fonte: "FSA", 
          codigoProjeto: "FSA-2023-045",
          agencia: "",
          contaCorrente: "",
          valor: "R$ 150.000,00" 
        },
        { 
          fonte: "Editais", 
          codigoProjeto: "EDT-2023-789",
          agencia: "",
          contaCorrente: "",
          valor: "R$ 100.000,00" 
        }
      ],
    },
  ];

  const handleView = (project: any) => {
    setSelectedProject(project);
    setOpenView(true);
    if (onViewProject) {
      onViewProject(project);
    }
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setCoprodutores(project.coprodutores || []);
    setFontesFinanciamento(project.fontesDetalhes || []);
    setView('edit');
  };

  const handleDelete = (project: any) => {
    setSelectedProject(project);
    setDeleteConfirmCode("");
    setOpenDelete(true);
  };

  const handleDuplicate = (project: any) => {
    setSelectedProject(project);
    setCopyBudget(false);
    setOpenDuplicate(true);
  };

  const confirmDuplicate = () => {
    const newCode = `${selectedProject.codigo}-COPY`;
    const budgetMsg = copyBudget ? " com orçamento copiado" : "";
    toast.success(`Projeto duplicado com sucesso! Novo código: ${newCode}${budgetMsg}`);
    setOpenDuplicate(false);
    setCopyBudget(false);
  };

  const confirmDelete = () => {
    if (deleteConfirmCode === selectedProject?.codigo) {
      setOpenDelete(false);
      setDeleteConfirmCode("");
      // Execute delete logic
    }
  };

  const addCoprodutor = () => {
    if (coproInput.trim()) {
      setCoprodutores([...coprodutores, coproInput.trim()]);
      setCoproInput("");
    }
  };

  const removeCoprodutor = (index: number) => {
    setCoprodutores(coprodutores.filter((_, i) => i !== index));
  };

  const handleCreateNew = () => {
    setCoprodutores([]);
    setFontesFinanciamento([]);
    setFormatoSelecionado("");
    setEpisodios("");
    setDuracaoEpisodios("");
    setView('create');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedProject(null);
  };

  // Renderização condicional baseada na view
  if (view === 'create') {
    return <NovoProjetoScreen 
      onBack={handleBackToList}
      coprodutores={coprodutores}
      setCoprodutores={setCoprodutores}
      coproInput={coproInput}
      setCoproInput={setCoproInput}
      addCoprodutor={addCoprodutor}
      removeCoprodutor={removeCoprodutor}
      formatoSelecionado={formatoSelecionado}
      setFormatoSelecionado={setFormatoSelecionado}
      episodios={episodios}
      setEpisodios={setEpisodios}
      duracaoEpisodios={duracaoEpisodios}
      setDuracaoEpisodios={setDuracaoEpisodios}
      fontesFinanciamento={fontesFinanciamento}
      setFontesFinanciamento={setFontesFinanciamento}
      openFonteModal={openFonteModal}
      setOpenFonteModal={setOpenFonteModal}
      editingFonteIndex={editingFonteIndex}
      setEditingFonteIndex={setEditingFonteIndex}
    />;
  }

  if (view === 'edit' && selectedProject) {
    return <EditarProjetoScreen 
      project={selectedProject}
      onBack={handleBackToList}
      coprodutores={coprodutores}
      setCoprodutores={setCoprodutores}
      coproInput={coproInput}
      setCoproInput={setCoproInput}
      addCoprodutor={addCoprodutor}
      removeCoprodutor={removeCoprodutor}
      formatoSelecionado={formatoSelecionado}
      setFormatoSelecionado={setFormatoSelecionado}
      episodios={episodios}
      setEpisodios={setEpisodios}
      duracaoEpisodios={duracaoEpisodios}
      setDuracaoEpisodios={setDuracaoEpisodios}
      fontesFinanciamento={fontesFinanciamento}
      setFontesFinanciamento={setFontesFinanciamento}
      openFonteModal={openFonteModal}
      setOpenFonteModal={setOpenFonteModal}
      editingFonteIndex={editingFonteIndex}
      setEditingFonteIndex={setEditingFonteIndex}
    />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Projetos</h2>
          <p className="text-muted-foreground mt-1">
            Gestão de projetos audiovisuais
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo projeto
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por código, nome, formato, gênero ou ano..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Projetos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead>Gênero</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projetos.map((projeto, idx) => (
                <TableRow 
                  key={idx}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleView(projeto)}
                >
                  <TableCell>{projeto.codigo}</TableCell>
                  <TableCell>{projeto.nome}</TableCell>
                  <TableCell>{projeto.formato}</TableCell>
                  <TableCell>{projeto.genero}</TableCell>
                  <TableCell>{projeto.ano}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleView(projeto)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(projeto)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(projeto)}
                        >
                          Excluir
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-primary focus:text-primary"
                          onClick={() => handleDuplicate(projeto)}
                        >
                          Duplicar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="dialog-view-project-description">
          <DialogHeader>
            <DialogTitle>Projeto • Visualização</DialogTitle>
            <DialogDescription id="dialog-view-project-description">
              Visualize todos os detalhes e informações do projeto
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Código</Label>
                  <Input value={selectedProject.codigo} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Nome</Label>
                  <Input value={selectedProject.nome} readOnly className="bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Formato</Label>
                  <Input value={selectedProject.formato} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Gênero</Label>
                  <Input value={selectedProject.genero} readOnly className="bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ano</Label>
                  <Input value={selectedProject.ano} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Temporadas</Label>
                  <Input value={selectedProject.temporadas || "—"} readOnly className="bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Canal</Label>
                  <Input value={selectedProject.canal} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Distribuidora</Label>
                  <Input value={selectedProject.distribuidora || "—"} readOnly className="bg-muted" />
                </div>
              </div>
              <div>
                <Label>Coprodutores</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.coprodutores.length > 0 ? (
                    selectedProject.coprodutores.map((copro: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {copro}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum coprodutor</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="mb-3 block">Fontes de Financiamento</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fonte</TableHead>
                      <TableHead>Código do projeto</TableHead>
                      <TableHead>Agência</TableHead>
                      <TableHead>Conta corrente</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProject.fontesDetalhes.map((fonte: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{fonte.fonte}</TableCell>
                        <TableCell>{fonte.codigoProjeto}</TableCell>
                        <TableCell>{fonte.agencia || "—"}</TableCell>
                        <TableCell>{fonte.contaCorrente || "—"}</TableCell>
                        <TableCell>{fonte.valor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenView(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent aria-describedby="dialog-delete-project-description">
          <DialogHeader>
            <DialogTitle>Excluir Projeto</DialogTitle>
            <DialogDescription id="dialog-delete-project-description">
              Esta ação é irreversível. Digite o CÓDIGO do projeto para confirmar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedProject && (
              <>
                <div>
                  <Label>Projeto a ser excluído:</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-semibold">{selectedProject.codigo}</span> - {selectedProject.nome}
                  </p>
                </div>
                <div>
                  <Label>Digite o código do projeto para confirmar</Label>
                  <Input
                    value={deleteConfirmCode}
                    onChange={(e) => setDeleteConfirmCode(e.target.value)}
                    placeholder={selectedProject.codigo}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancelar</Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteConfirmCode !== selectedProject?.codigo}
            >
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Duplicate Modal - PRD 001 História 3 */}
      <Dialog open={openDuplicate} onOpenChange={setOpenDuplicate}>
        <DialogContent className="max-w-2xl" aria-describedby="dialog-duplicate-project-description">
          <DialogHeader>
            <DialogTitle>Duplicar Projeto</DialogTitle>
            <DialogDescription id="dialog-duplicate-project-description">
              Crie um novo projeto a partir de um existente, copiando metadados, fontes de financiamento e opcionalmente o orçamento.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {selectedProject && (
              <>
                {/* Projeto Origem */}
                <div className="bg-muted/30 border rounded-lg p-4">
                  <Label className="text-xs text-muted-foreground">Projeto Origem:</Label>
                  <p className="text-sm mt-1">
                    <span className="font-semibold">{selectedProject.codigo}</span> - {selectedProject.nome}
                  </p>
                  <div className="mt-2 flex gap-2 text-xs">
                    <Badge variant="outline">{selectedProject.formato}</Badge>
                    <Badge variant="outline">{selectedProject.genero}</Badge>
                  </div>
                </div>

                {/* Novo Código e Nome */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Novo Código <span className="text-destructive">*</span></Label>
                    <Input placeholder="Ex: PROJ-003" />
                  </div>
                  <div>
                    <Label>Novo Nome <span className="text-destructive">*</span></Label>
                    <Input placeholder="Ex: Série X - Temp 2" />
                  </div>
                </div>

                {/* O que Copiar */}
                <div className="space-y-3">
                  <Label className="font-semibold">O que deseja copiar?</Label>
                  
                  <div className="flex items-start gap-3 border rounded-lg p-3 hover:bg-muted/30">
                    <Checkbox id="copy-metadata" defaultChecked disabled />
                    <div className="flex-1">
                      <Label htmlFor="copy-metadata" className="cursor-pointer">
                        Metadados do Projeto
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Gênero, formato, coprodutores, distribuidora (sempre copiado)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border rounded-lg p-3 hover:bg-muted/30">
                    <Checkbox id="copy-fontes" defaultChecked disabled />
                    <div className="flex-1">
                      <Label htmlFor="copy-fontes" className="cursor-pointer">
                        Fontes de Financiamento
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Copia estrutura das fontes (ANCINE, FSA, etc.) sem valores
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border rounded-lg p-3 hover:bg-muted/30">
                    <Checkbox 
                      id="copy-budget" 
                      checked={copyBudget}
                      onCheckedChange={(checked) => setCopyBudget(checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="copy-budget" className="cursor-pointer font-semibold">
                        Copiar Orçamento
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Copia toda a estrutura orçamentária com valores (nasce como "Orçamento de Trabalho")
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alertas */}
                <div className="space-y-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      <strong>ℹ️ Importante:</strong> O orçamento copiado sempre nasce com status "Orçamento de Trabalho" (editável), nunca como "Aprovado/Congelado", exigindo nova revisão antes do congelamento.
                    </p>
                  </div>
                  {copyBudget && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                      <p className="text-xs text-amber-800 dark:text-amber-200">
                        <strong>⚠️ Atenção:</strong> A cópia do orçamento pode levar alguns segundos. Aguarde a confirmação antes de fazer edições.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setOpenDuplicate(false);
              setCopyBudget(false);
            }}>
              Cancelar
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={confirmDuplicate}
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Projeto Duplicado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente para Novo Projeto
function NovoProjetoScreen({ 
  onBack, 
  coprodutores, 
  setCoprodutores, 
  coproInput, 
  setCoproInput,
  addCoprodutor,
  removeCoprodutor,
  formatoSelecionado,
  setFormatoSelecionado,
  episodios,
  setEpisodios,
  duracaoEpisodios,
  setDuracaoEpisodios,
  fontesFinanciamento,
  setFontesFinanciamento,
  openFonteModal,
  setOpenFonteModal,
  editingFonteIndex,
  setEditingFonteIndex
}: any) {
  const [fonteNome, setFonteNome] = useState("");
  const [fonteCodigo, setFonteCodigo] = useState("");
  const [fonteAgencia, setFonteAgencia] = useState("");
  const [fonteConta, setFonteConta] = useState("");
  const [fonteValor, setFonteValor] = useState("");

  const handleSaveFonte = () => {
    const novaFonte = {
      fonte: fonteNome,
      codigoProjeto: fonteCodigo,
      agencia: fonteAgencia,
      contaCorrente: fonteConta,
      valor: fonteValor
    };

    if (editingFonteIndex !== null) {
      const updated = [...fontesFinanciamento];
      updated[editingFonteIndex] = novaFonte;
      setFontesFinanciamento(updated);
    } else {
      setFontesFinanciamento([...fontesFinanciamento, novaFonte]);
    }

    setOpenFonteModal(false);
    setFonteNome("");
    setFonteCodigo("");
    setFonteAgencia("");
    setFonteConta("");
    setFonteValor("");
  };

  const handleEditFonte = (index: number) => {
    const fonte = fontesFinanciamento[index];
    setFonteNome(fonte.fonte);
    setFonteCodigo(fonte.codigoProjeto);
    setFonteAgencia(fonte.agencia || "");
    setFonteConta(fonte.contaCorrente || "");
    setFonteValor(fonte.valor);
    setEditingFonteIndex(index);
    setOpenFonteModal(true);
  };

  const handleDeleteFonte = (index: number) => {
    setFontesFinanciamento(fontesFinanciamento.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb e Botão Voltar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={onBack} className="hover:text-foreground transition-colors">
            Projetos
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Novo Projeto</span>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* Título */}
      <div>
        <h2 className="text-3xl text-foreground">Novo Projeto</h2>
        <p className="text-muted-foreground mt-1">
          Preencha os dados para cadastrar um novo projeto
        </p>
      </div>

      {/* Formulário */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Código</Label>
                <Input placeholder="PROJ-XXX" />
              </div>
              <div>
                <Label>Nome <span className="text-destructive">*</span></Label>
                <Input placeholder="Nome do projeto" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Formato <span className="text-destructive">*</span></Label>
                <Select value={formatoSelecionado} onValueChange={setFormatoSelecionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="filme">Filme</SelectItem>
                    <SelectItem value="serie">Série</SelectItem>
                    <SelectItem value="documentario">Documentário</SelectItem>
                    <SelectItem value="curta">Curta</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Gênero <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="comedia">Comédia</SelectItem>
                    <SelectItem value="documental">Documental</SelectItem>
                    <SelectItem value="acao">Ação</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ano <span className="text-destructive">*</span></Label>
                <Input type="number" placeholder="2024" />
              </div>
              <div>
                <Label>Temporadas</Label>
                <Input placeholder="Ex: 1ª temporada" />
              </div>
            </div>
            {formatoSelecionado === "serie" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Episódios <span className="text-destructive">*</span></Label>
                  <Input 
                    type="number" 
                    placeholder="Número de episódios"
                    value={episodios}
                    onChange={(e) => setEpisodios(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Duração dos episódios (minutos) <span className="text-destructive">*</span></Label>
                  <Input 
                    type="number" 
                    placeholder="Duração em minutos"
                    value={duracaoEpisodios}
                    onChange={(e) => setDuracaoEpisodios(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Canal</Label>
                <Input placeholder="Nome do canal" />
              </div>
              <div>
                <Label>Distribuidora</Label>
                <Input placeholder="Nome da distribuidora" />
              </div>
            </div>
            <div>
              <Label>Coprodutores</Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  placeholder="Nome do coprodutor" 
                  value={coproInput}
                  onChange={(e) => setCoproInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCoprodutor())}
                />
                <Button type="button" variant="outline" onClick={addCoprodutor}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {coprodutores.map((copro: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1">
                    {copro}
                    <button 
                      onClick={() => removeCoprodutor(idx)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <Label>Fontes de Financiamento</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setEditingFonteIndex(null);
                    setFonteNome("");
                    setFonteCodigo("");
                    setFonteAgencia("");
                    setFonteConta("");
                    setFonteValor("");
                    setOpenFonteModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Fonte
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fonte</TableHead>
                    <TableHead>Código do projeto</TableHead>
                    <TableHead>Agência</TableHead>
                    <TableHead>Conta corrente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fontesFinanciamento.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Nenhuma fonte cadastrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    fontesFinanciamento.map((fonte: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{fonte.fonte}</TableCell>
                        <TableCell>{fonte.codigoProjeto}</TableCell>
                        <TableCell>{fonte.agencia || "—"}</TableCell>
                        <TableCell>{fonte.contaCorrente || "—"}</TableCell>
                        <TableCell>{fonte.valor}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleEditFonte(idx)}>
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteFonte(idx)}
                              >
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Cancelar
        </Button>
        <Button className="bg-primary hover:bg-primary/90" onClick={onBack}>
          Criar Projeto
        </Button>
      </div>

      {/* Modal Fonte de Financiamento */}
      <Dialog open={openFonteModal} onOpenChange={setOpenFonteModal}>
        <DialogContent aria-describedby="dialog-nova-fonte-description">
          <DialogHeader>
            <DialogTitle>Fonte de financiamento</DialogTitle>
            <DialogDescription id="dialog-nova-fonte-description">
              {editingFonteIndex !== null ? "Editar" : "Adicionar"} fonte de financiamento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Fonte <span className="text-destructive">*</span></Label>
              <Input 
                placeholder="Nome da fonte" 
                value={fonteNome}
                onChange={(e) => setFonteNome(e.target.value)}
              />
            </div>
            <div>
              <Label>Código do projeto na fonte <span className="text-destructive">*</span></Label>
              <Input 
                placeholder="Código do projeto" 
                value={fonteCodigo}
                onChange={(e) => setFonteCodigo(e.target.value)}
              />
            </div>
            <div>
              <Label>Agência (opcional)</Label>
              <Input 
                placeholder="Agência bancária" 
                value={fonteAgencia}
                onChange={(e) => setFonteAgencia(e.target.value)}
              />
            </div>
            <div>
              <Label>Conta corrente (opcional)</Label>
              <Input 
                placeholder="Número da conta" 
                value={fonteConta}
                onChange={(e) => setFonteConta(e.target.value)}
              />
            </div>
            <div>
              <Label>Valor <span className="text-destructive">*</span></Label>
              <Input 
                placeholder="R$ 0,00" 
                value={fonteValor}
                onChange={(e) => setFonteValor(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenFonteModal(false)}>Cancelar</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveFonte}>
              {editingFonteIndex !== null ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente para Editar Projeto
function EditarProjetoScreen({ 
  project,
  onBack, 
  coprodutores, 
  setCoprodutores, 
  coproInput, 
  setCoproInput,
  addCoprodutor,
  removeCoprodutor,
  formatoSelecionado,
  setFormatoSelecionado,
  episodios,
  setEpisodios,
  duracaoEpisodios,
  setDuracaoEpisodios,
  fontesFinanciamento,
  setFontesFinanciamento,
  openFonteModal,
  setOpenFonteModal,
  editingFonteIndex,
  setEditingFonteIndex
}: any) {
  const [fonteNome, setFonteNome] = useState("");
  const [fonteCodigo, setFonteCodigo] = useState("");
  const [fonteAgencia, setFonteAgencia] = useState("");
  const [fonteConta, setFonteConta] = useState("");
  const [fonteValor, setFonteValor] = useState("");

  const handleSaveFonte = () => {
    const novaFonte = {
      fonte: fonteNome,
      codigoProjeto: fonteCodigo,
      agencia: fonteAgencia,
      contaCorrente: fonteConta,
      valor: fonteValor
    };

    if (editingFonteIndex !== null) {
      const updated = [...fontesFinanciamento];
      updated[editingFonteIndex] = novaFonte;
      setFontesFinanciamento(updated);
    } else {
      setFontesFinanciamento([...fontesFinanciamento, novaFonte]);
    }

    setOpenFonteModal(false);
    setFonteNome("");
    setFonteCodigo("");
    setFonteAgencia("");
    setFonteConta("");
    setFonteValor("");
  };

  const handleEditFonte = (index: number) => {
    const fonte = fontesFinanciamento[index];
    setFonteNome(fonte.fonte);
    setFonteCodigo(fonte.codigoProjeto);
    setFonteAgencia(fonte.agencia || "");
    setFonteConta(fonte.contaCorrente || "");
    setFonteValor(fonte.valor);
    setEditingFonteIndex(index);
    setOpenFonteModal(true);
  };

  const handleDeleteFonte = (index: number) => {
    setFontesFinanciamento(fontesFinanciamento.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb e Botão Voltar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={onBack} className="hover:text-foreground transition-colors">
            Projetos
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Editar Projeto</span>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* Título */}
      <div>
        <h2 className="text-3xl text-foreground">Editar Projeto</h2>
        <p className="text-muted-foreground mt-1">
          {project.codigo} - {project.nome}
        </p>
      </div>

      {/* Formulário */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Código</Label>
                <Input defaultValue={project.codigo} readOnly className="bg-muted" />
              </div>
              <div>
                <Label>Nome <span className="text-destructive">*</span></Label>
                <Input defaultValue={project.nome} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Formato <span className="text-destructive">*</span></Label>
                <Select defaultValue={project.formato.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="longa-metragem">Longa-metragem</SelectItem>
                    <SelectItem value="série">Série</SelectItem>
                    <SelectItem value="curta-metragem">Curta-metragem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Gênero <span className="text-destructive">*</span></Label>
                <Select defaultValue={project.genero.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ficção">Ficção</SelectItem>
                    <SelectItem value="documentário">Documentário</SelectItem>
                    <SelectItem value="reality show">Reality Show</SelectItem>
                    <SelectItem value="animação">Animação</SelectItem>
                    <SelectItem value="variedades">Variedades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ano <span className="text-destructive">*</span></Label>
                <Input type="number" defaultValue={project.ano} />
              </div>
              <div>
                <Label>Temporadas</Label>
                <Input defaultValue={project.temporadas} placeholder="Ex: 1ª temporada" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Canal</Label>
                <Input defaultValue={project.canal} />
              </div>
              <div>
                <Label>Distribuidora</Label>
                <Input defaultValue={project.distribuidora} />
              </div>
            </div>
            <div>
              <Label>Coprodutores</Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  placeholder="Nome do coprodutor" 
                  value={coproInput}
                  onChange={(e) => setCoproInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCoprodutor())}
                />
                <Button type="button" variant="outline" onClick={addCoprodutor}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {coprodutores.map((copro: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1">
                    {copro}
                    <button 
                      onClick={() => removeCoprodutor(idx)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <Label>Fontes de Financiamento</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setEditingFonteIndex(null);
                    setFonteNome("");
                    setFonteCodigo("");
                    setFonteAgencia("");
                    setFonteConta("");
                    setFonteValor("");
                    setOpenFonteModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Fonte
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fonte</TableHead>
                    <TableHead>Código do projeto</TableHead>
                    <TableHead>Agência</TableHead>
                    <TableHead>Conta corrente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fontesFinanciamento.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Nenhuma fonte cadastrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    fontesFinanciamento.map((fonte: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{fonte.fonte}</TableCell>
                        <TableCell>{fonte.codigoProjeto}</TableCell>
                        <TableCell>{fonte.agencia || "—"}</TableCell>
                        <TableCell>{fonte.contaCorrente || "—"}</TableCell>
                        <TableCell>{fonte.valor}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleEditFonte(idx)}>
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteFonte(idx)}
                              >
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Cancelar
        </Button>
        <Button className="bg-primary hover:bg-primary/90" onClick={onBack}>
          Salvar Alterações
        </Button>
      </div>

      {/* Modal Fonte de Financiamento */}
      <Dialog open={openFonteModal} onOpenChange={setOpenFonteModal}>
        <DialogContent aria-describedby="dialog-nova-fonte-description">
          <DialogHeader>
            <DialogTitle>Fonte de financiamento</DialogTitle>
            <DialogDescription id="dialog-nova-fonte-description">
              {editingFonteIndex !== null ? "Editar" : "Adicionar"} fonte de financiamento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Fonte <span className="text-destructive">*</span></Label>
              <Input 
                placeholder="Nome da fonte" 
                value={fonteNome}
                onChange={(e) => setFonteNome(e.target.value)}
              />
            </div>
            <div>
              <Label>Código do projeto na fonte <span className="text-destructive">*</span></Label>
              <Input 
                placeholder="Código do projeto" 
                value={fonteCodigo}
                onChange={(e) => setFonteCodigo(e.target.value)}
              />
            </div>
            <div>
              <Label>Agência (opcional)</Label>
              <Input 
                placeholder="Agência bancária" 
                value={fonteAgencia}
                onChange={(e) => setFonteAgencia(e.target.value)}
              />
            </div>
            <div>
              <Label>Conta corrente (opcional)</Label>
              <Input 
                placeholder="Número da conta" 
                value={fonteConta}
                onChange={(e) => setFonteConta(e.target.value)}
              />
            </div>
            <div>
              <Label>Valor <span className="text-destructive">*</span></Label>
              <Input 
                placeholder="R$ 0,00" 
                value={fonteValor}
                onChange={(e) => setFonteValor(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenFonteModal(false)}>Cancelar</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveFonte}>
              {editingFonteIndex !== null ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}