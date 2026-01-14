import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner@2.0.3";
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
import { Plus, Search, MoreVertical, ArrowLeft, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export default function PlanoDeContas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlano, setSelectedPlano] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [deleteConfirmCode, setDeleteConfirmCode] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [openWizard, setOpenWizard] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [uploadStep, setUploadStep] = useState<"upload" | "mapping" | "confirm">("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    projeto: "",
    origem: "plano",
    planoContas: "",
    orcamentoOrigem: "",
  });

  const planos = [
    {
      id: "1",
      nome: "Plano Padrão ANCINE",
      versao: "2024.1",
      itens: 245,
    },
    {
      id: "2",
      nome: "Plano Customizado - Séries",
      versao: "1.0",
      itens: 180,
    },
    {
      id: "3",
      nome: "Plano Documentário",
      versao: "2.3",
      itens: 120,
    },
  ];

  const itensPlano = [
    {
      id: "1",
      codigo: "001",
      descricao: "Roteiro",
      grupo: "Desenvolvimento",
    },
    {
      id: "2",
      codigo: "001.001",
      descricao: "Chefe de roteiro",
      grupo: "Desenvolvimento",
    },
    {
      id: "3",
      codigo: "001.002",
      descricao: "Supervisão de roteiro",
      grupo: "Desenvolvimento",
    },
    {
      id: "4",
      codigo: "001.003",
      descricao: "Roteirista",
      grupo: "Desenvolvimento",
    },
    {
      id: "5",
      codigo: "002",
      descricao: "Cessão de direitos",
      grupo: "Desenvolvimento",
    },
    {
      id: "6",
      codigo: "002.001",
      descricao: "Cessão de direitos de roteiro",
      grupo: "Desenvolvimento",
    },
    {
      id: "7",
      codigo: "003",
      descricao: "Direção",
      grupo: "Pré-produção",
    },
    {
      id: "8",
      codigo: "003.001",
      descricao: "Diretor(a)",
      grupo: "Pré-produção",
    },
    {
      id: "9",
      codigo: "004",
      descricao: "Elenco",
      grupo: "Produção",
    },
    {
      id: "10",
      codigo: "004.001",
      descricao: "Ator principal",
      grupo: "Produção",
    },
  ];

  const handleView = (plano: any) => {
    setSelectedPlano(plano);
    setViewMode("detail");
  };

  const handleEdit = (plano: any) => {
    setSelectedPlano(plano);
    setOpenEdit(true);
  };

  const handleDelete = (plano: any) => {
    setSelectedPlano(plano);
    setDeleteConfirmCode("");
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    if (deleteConfirmCode === selectedPlano?.nome) {
      setOpenDelete(false);
      setDeleteConfirmCode("");
      // Execute delete logic
    }
  };

  const handleWizardNext = () => {
    if (wizardStep < 3) {
      setWizardStep(wizardStep + 1);
    } else {
      // Finalizar wizard
      console.log("Criar orçamento com:", wizardData);
      setOpenWizard(false);
      setWizardStep(1);
      setWizardData({
        projeto: "",
        origem: "plano",
        planoContas: "",
        orcamentoOrigem: "",
      });
    }
  };

  const handleWizardBack = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Validate file type
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error("Formato inválido! Use apenas arquivos CSV ou XLS/XLSX");
      return;
    }

    setUploadedFile(file);
    // Simulate processing and preview
    setPreviewData([
      { codigo: "001", descricao: "Roteiro", grupo: "Desenvolvimento" },
      { codigo: "001.001", descricao: "Chefe de roteiro", grupo: "Desenvolvimento" },
      { codigo: "002", descricao: "Cessão de direitos", grupo: "Desenvolvimento" },
      { codigo: "003", descricao: "Direção", grupo: "Pré-produção" },
      { codigo: "004", descricao: "Elenco", grupo: "Produção" },
    ]);
    setUploadStep("mapping");
    toast.success(`Arquivo "${file.name}" carregado com sucesso!`);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleUploadConfirm = () => {
    toast.success(`${previewData.length} itens importados com sucesso!`);
    setOpenUpload(false);
    setUploadStep("upload");
    setUploadedFile(null);
    setPreviewData([]);
  };

  const handleUploadCancel = () => {
    setOpenUpload(false);
    setUploadStep("upload");
    setUploadedFile(null);
    setPreviewData([]);
  };

  if (viewMode === "detail" && selectedPlano) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setViewMode("list");
                setSelectedPlano(null);
              }}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-3xl text-foreground">{selectedPlano.nome}</h2>
              <p className="text-muted-foreground mt-1">
                Versão {selectedPlano.versao} • {selectedPlano.itens} itens
              </p>
            </div>
          </div>
          <Dialog open={openItemModal} onOpenChange={setOpenItemModal}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Novo Item
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-item-plano-description">
              <DialogHeader>
                <DialogTitle>Item do plano</DialogTitle>
                <DialogDescription id="dialog-item-plano-description">
                  Adicionar novo item ao plano de contas
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Plano de contas <span className="text-destructive">*</span></Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ancine">Ancine</SelectItem>
                      <SelectItem value="netflix">Netflix</SelectItem>
                      <SelectItem value="netflix-v3">Netflix v3</SelectItem>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Código da rubrica <span className="text-destructive">*</span></Label>
                  <Input placeholder="001.001" />
                </div>
                <div>
                  <Label>Descrição / função <span className="text-destructive">*</span></Label>
                  <Input placeholder="Ex: Chefe de roteiro" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenItemModal(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90" 
                  onClick={() => setOpenItemModal(false)}
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por código ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Itens do Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código da rubrica</TableHead>
                    <TableHead>Descrição / função</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itensPlano.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.codigo}</TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Plano de Contas</h2>
          <p className="text-muted-foreground mt-1">
            Gerenciamento de planos de contas orçamentários
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={openWizard} onOpenChange={setOpenWizard}>
            <DialogTrigger asChild>
              
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-novo-orcamento-description">
              <DialogHeader>
                <DialogTitle>Novo Orçamento - Passo {wizardStep} de 3</DialogTitle>
                <DialogDescription id="dialog-novo-orcamento-description">
                  {wizardStep === 1 && "Selecione o projeto"}
                  {wizardStep === 2 && "Escolha a origem do orçamento"}
                  {wizardStep === 3 && wizardData.origem === "plano" && "Selecione o plano de contas"}
                  {wizardStep === 3 && wizardData.origem === "copiar" && "Selecione o orçamento a copiar"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                {wizardStep === 1 && (
                  <div>
                    <Label>Projeto</Label>
                    <Select 
                      value={wizardData.projeto}
                      onValueChange={(value) => setWizardData({...wizardData, projeto: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o projeto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proj-001">PROJ-001 - Série Documentário</SelectItem>
                        <SelectItem value="proj-002">PROJ-002 - Longa-metragem Drama</SelectItem>
                        <SelectItem value="proj-003">PROJ-003 - Curta Animação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div>
                    <Label>Origem do orçamento</Label>
                    <RadioGroup 
                      value={wizardData.origem}
                      onValueChange={(value) => setWizardData({...wizardData, origem: value})}
                      className="mt-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="plano" id="plano" />
                        <Label htmlFor="plano" className="cursor-pointer">
                          Criar a partir de Plano de contas
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="copiar" id="copiar" />
                        <Label htmlFor="copiar" className="cursor-pointer">
                          Copiar de orçamento existente
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {wizardStep === 3 && wizardData.origem === "plano" && (
                  <div>
                    <Label>Plano de contas</Label>
                    <Select 
                      value={wizardData.planoContas}
                      onValueChange={(value) => setWizardData({...wizardData, planoContas: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o plano de contas" />
                      </SelectTrigger>
                      <SelectContent>
                        {planos.map((plano) => (
                          <SelectItem key={plano.id} value={plano.id}>
                            {plano.nome} (v{plano.versao})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {wizardStep === 3 && wizardData.origem === "copiar" && (
                  <div>
                    <Label>Orçamento de origem</Label>
                    <Select 
                      value={wizardData.orcamentoOrigem}
                      onValueChange={(value) => setWizardData({...wizardData, orcamentoOrigem: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o orçamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orc-001">PROJ-001 - Orçamento 2024</SelectItem>
                        <SelectItem value="orc-002">PROJ-002 - Orçamento 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <DialogFooter>
                {wizardStep > 1 && (
                  <Button variant="outline" onClick={handleWizardBack}>
                    Voltar
                  </Button>
                )}
                <Button 
                  className="bg-primary hover:bg-primary/90" 
                  onClick={handleWizardNext}
                  disabled={
                    (wizardStep === 1 && !wizardData.projeto) ||
                    (wizardStep === 3 && wizardData.origem === "plano" && !wizardData.planoContas) ||
                    (wizardStep === 3 && wizardData.origem === "copiar" && !wizardData.orcamentoOrigem)
                  }
                >
                  {wizardStep === 3 ? "Criar Orçamento" : "Próximo"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-plano-contas-description">
              <DialogHeader>
                <DialogTitle>Plano de contas</DialogTitle>
                <DialogDescription id="dialog-plano-contas-description">
                  Criar novo plano de contas
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Nome do plano <span className="text-destructive">*</span></Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ancine">Ancine</SelectItem>
                      <SelectItem value="netflix">Netflix</SelectItem>
                      <SelectItem value="netflix-v3">Netflix v3</SelectItem>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenCreate(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90" 
                  onClick={() => setOpenCreate(false)}
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por nome ou versão..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Planos Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Planos</CardTitle>
            <Dialog open={openUpload} onOpenChange={setOpenUpload}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Importar planilha (.xlsx / .csv)
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl" aria-describedby="dialog-importar-planilha-description">
                <DialogHeader>
                  <DialogTitle>Importar Planilha</DialogTitle>
                  <DialogDescription id="dialog-importar-planilha-description">
                    {uploadStep === "upload" && "Selecione um arquivo CSV ou XLS/XLSX para importar"}
                    {uploadStep === "mapping" && "Confira os dados antes de importar"}
                  </DialogDescription>
                </DialogHeader>

                {uploadStep === "upload" && (
                  <div className="space-y-4 mt-4">
                    <div
                      className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <FileSpreadsheet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm mb-2">
                        Arraste e solte seu arquivo aqui ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Formatos suportados: CSV, XLS, XLSX (máx. 10MB)
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".csv,.xls,.xlsx"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-sm mb-2">Requisitos do arquivo:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Coluna 1: Código da rubrica (ex: 001, 001.001)</li>
                        <li>• Coluna 2: Descrição / função</li>
                        <li>• Coluna 3: Grupo (opcional)</li>
                      </ul>
                    </div>
                  </div>
                )}

                {uploadStep === "mapping" && uploadedFile && (
                  <div className="space-y-4 mt-4">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm"><span className="font-semibold">{uploadedFile.name}</span></p>
                        <p className="text-xs text-muted-foreground">{previewData.length} linhas detectadas</p>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Preview dos dados</Label>
                      <div className="border rounded-lg max-h-[400px] overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Código</TableHead>
                              <TableHead>Descrição</TableHead>
                              <TableHead>Grupo</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {previewData.map((item, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{item.codigo}</TableCell>
                                <TableCell>{item.descricao}</TableCell>
                                <TableCell>{item.grupo || "—"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                )}

                <DialogFooter>
                  {uploadStep === "upload" ? (
                    <Button variant="outline" onClick={handleUploadCancel}>
                      Cancelar
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setUploadStep("upload")}>
                        Voltar
                      </Button>
                      <Button 
                        className="bg-primary hover:bg-primary/90"
                        onClick={handleUploadConfirm}
                      >
                        Confirmar Importação
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Para carregar planos com centenas de linhas de uma vez
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plano de contas</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planos.map((plano) => (
                <TableRow 
                  key={plano.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleView(plano)}
                >
                  <TableCell>{plano.nome}</TableCell>
                  <TableCell>{plano.itens} itens</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(plano)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(plano)}
                        >
                          Excluir
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

      {/* Edit Modal */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent aria-describedby="dialog-edit-plano-description">
          <DialogHeader>
            <DialogTitle>Editar Plano de Contas</DialogTitle>
            <DialogDescription id="dialog-edit-plano-description">
              Atualize as informações deste plano de contas
            </DialogDescription>
          </DialogHeader>
          {selectedPlano && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Nome do plano</Label>
                <Input defaultValue={selectedPlano.nome} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>Cancelar</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setOpenEdit(false)}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Delete */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent aria-describedby="dialog-delete-plano-description">
          <DialogHeader>
            <DialogTitle>Excluir Plano de Contas</DialogTitle>
            <DialogDescription id="dialog-delete-plano-description">
              Esta ação é irreversível. Digite o NOME do plano para confirmar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedPlano && (
              <>
                <div>
                  <Label>Plano a ser excluído:</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-semibold">{selectedPlano.nome}</span> (v{selectedPlano.versao})
                  </p>
                </div>
                <div>
                  <Label>Digite o nome do plano para confirmar</Label>
                  <Input
                    value={deleteConfirmCode}
                    onChange={(e) => setDeleteConfirmCode(e.target.value)}
                    placeholder={selectedPlano.nome}
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
              disabled={deleteConfirmCode !== selectedPlano?.nome}
            >
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}