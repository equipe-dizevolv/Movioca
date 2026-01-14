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
import { Plus, Search, MoreVertical, FileText, Eye, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";
import { useAuth, permissions } from "../../contexts/AuthContext";

export default function Fornecedores() {
  const { currentUser, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjeto, setSelectedProjeto] = useState("todos");
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openVisualizar, setOpenVisualizar] = useState(false);
  const [openContratos, setOpenContratos] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Verificar permissões
  const canEdit = hasPermission(permissions.canEditFornecedor);

  // Form states
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpjCpf, setCnpjCpf] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");

  const fornecedores = [
    {
      id: "1",
      razaoSocial: "Produtora XYZ Ltda",
      fornecedor: "Carlos Roberto Silva",
      cnpjCpf: "12.345.678/0001-99",
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "12345-6",
      tipoConta: "Conta Corrente",
      chavePix: "12.345.678/0001-99",
      projetos: ["Projeto Alpha", "Projeto Beta"],
      historicoCompleto: [
        { projeto: "Projeto Alpha", funcao: "Produtora", ano: "2024" },
        { projeto: "Projeto Beta", funcao: "Produtora", ano: "2023" },
        { projeto: "Série Documentário", funcao: "Produtora", ano: "2022" },
      ],
    },
    {
      id: "2",
      razaoSocial: "João Silva",
      fornecedor: "João Silva",
      cnpjCpf: "123.456.789-00",
      banco: "Itaú",
      agencia: "5678",
      conta: "98765-4",
      tipoConta: "Conta Corrente",
      chavePix: "joao.silva@email.com",
      projetos: ["Projeto Alpha"],
      historicoCompleto: [
        { projeto: "Projeto Alpha", funcao: "Diretor de Fotografia", ano: "2024" },
        { projeto: "Filme Independente", funcao: "Diretor de Fotografia", ano: "2023" },
      ],
    },
    {
      id: "3",
      razaoSocial: "Estúdio ABC",
      fornecedor: "Maria José Santos",
      cnpjCpf: "98.765.432/0001-00",
      banco: "Santander",
      agencia: "0123",
      conta: "54321-0",
      tipoConta: "Conta Poupança",
      chavePix: "",
      projetos: ["Projeto Gama"],
      historicoCompleto: [
        { projeto: "Projeto Gama", funcao: "Pós-produção", ano: "2024" },
        { projeto: "Série TV", funcao: "Edição", ano: "2023" },
      ],
    },
    {
      id: "4",
      razaoSocial: "Mariana Guedes",
      fornecedor: "Mariana Guedes",
      cnpjCpf: "987.654.321-00",
      banco: "",
      agencia: "",
      conta: "",
      tipoConta: "",
      chavePix: "",
      projetos: ["Projeto Alpha", "Projeto Beta", "Projeto Gama"],
      historicoCompleto: [
        { projeto: "Projeto Alpha", funcao: "Figurinista", ano: "2024" },
        { projeto: "Projeto Beta", funcao: "Figurinista", ano: "2024" },
        { projeto: "Projeto Gama", funcao: "Direção de Arte", ano: "2023" },
      ],
    },
  ];

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Validar primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = remainder >= 10 ? 0 : remainder;
    
    if (digit1 !== parseInt(cpf.charAt(9))) return false;
    
    // Validar segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = remainder >= 10 ? 0 : remainder;
    
    return digit2 === parseInt(cpf.charAt(10));
  };

  const validateCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]/g, "");
    if (cnpj.length !== 14) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) return false;
    
    // Validar primeiro dígito verificador
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
    
    // Validar segundo dígito verificador
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  };

  const validateCnpjCpf = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, "");
    if (cleaned.length === 11) {
      return validateCPF(value);
    } else if (cleaned.length === 14) {
      return validateCNPJ(value);
    }
    return false;
  };

  const handleSave = () => {
    if (!razaoSocial || !cnpjCpf) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    if (!validateCnpjCpf(cnpjCpf)) {
      toast.error("CNPJ/CPF inválido. Verifique os dígitos verificadores.");
      return;
    }

    console.log("Salvando fornecedor:", {
      razaoSocial,
      cnpjCpf,
      banco,
      agencia,
      conta,
    });

    toast.success("Fornecedor cadastrado com sucesso");
    setOpenNovo(false);

    // Reset form
    setRazaoSocial("");
    setCnpjCpf("");
    setBanco("");
    setAgencia("");
    setConta("");
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setOpenVisualizar(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setRazaoSocial(item.razaoSocial);
    setCnpjCpf(item.cnpjCpf);
    setBanco(item.banco);
    setAgencia(item.agencia);
    setConta(item.conta);
    setOpenEditar(true);
  };

  const handleUpdate = () => {
    if (!razaoSocial || !cnpjCpf) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    if (!validateCnpjCpf(cnpjCpf)) {
      toast.error("CNPJ/CPF inválido. Verifique os dígitos verificadores.");
      return;
    }

    console.log("Atualizando fornecedor:", {
      id: selectedItem.id,
      razaoSocial,
      cnpjCpf,
      banco,
      agencia,
      conta,
    });

    toast.success("Fornecedor atualizado com sucesso");
    setOpenEditar(false);

    // Reset form
    setRazaoSocial("");
    setCnpjCpf("");
    setBanco("");
    setAgencia("");
    setConta("");
    setSelectedItem(null);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setDeleteConfirmText(item.razaoSocial);
    setOpenDelete(true);
  };

  // Filtrar fornecedores
  const fornecedoresFiltrados = fornecedores.filter((fornecedor) => {
    const matchSearch = 
      fornecedor.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.cnpjCpf.includes(searchTerm);
    
    const matchProjeto = 
      selectedProjeto === "todos" || 
      fornecedor.projetos.includes(selectedProjeto);
    
    return matchSearch && matchProjeto;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Fornecedores</h2>
          <p className="text-muted-foreground mt-1">
            Cadastro e manutenção dos dados de fornecedores, pessoas físicas e jurídicas. Fonte de verdade para razão social, CNPJ/CPF e dados bancários.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar fornecedor por nome ou CNPJ/CPF"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-[250px]">
              <Select value={selectedProjeto} onValueChange={setSelectedProjeto}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os projetos</SelectItem>
                  <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                  <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                  <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fornecedores cadastrados</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {fornecedoresFiltrados.length} {fornecedoresFiltrados.length === 1 ? "fornecedor encontrado" : "fornecedores encontrados"}
                {selectedProjeto !== "todos" && ` em ${selectedProjeto}`}
              </p>
            </div>
            {canEdit && (
              <Dialog open={openNovo} onOpenChange={setOpenNovo}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo fornecedor
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby="dialog-novo-fornecedor-description">
                  <DialogHeader>
                    <DialogTitle>Cadastrar fornecedor</DialogTitle>
                    <DialogDescription id="dialog-novo-fornecedor-description">
                      Adicione um novo fornecedor ao sistema
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Razão social / nome <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="Nome completo ou razão social"
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>CNPJ / CPF <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="00.000.000/0000-00 ou 000.000.000-00"
                        value={cnpjCpf}
                        onChange={(e) => setCnpjCpf(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        O sistema valida o dígito verificador automaticamente
                      </p>
                    </div>
                    <div>
                      <Label>Banco</Label>
                      <Input
                        placeholder="Nome do banco"
                        value={banco}
                        onChange={(e) => setBanco(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Agência</Label>
                        <Input
                          placeholder="0000"
                          value={agencia}
                          onChange={(e) => setAgencia(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Conta</Label>
                        <Input
                          placeholder="00000-0"
                          value={conta}
                          onChange={(e) => setConta(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      Esse cadastro é usado para auto-preencher a contratação. O fornecedor pode depois completar/atualizar os próprios dados.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenNovo(false)}>
                      Cancelar
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleSave}>
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Razão social / nome</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>CNPJ / CPF</TableHead>
                  <TableHead>Projetos</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fornecedoresFiltrados.map((fornecedor) => (
                  <TableRow key={fornecedor.id}>
                    <TableCell>{fornecedor.razaoSocial}</TableCell>
                    <TableCell>{fornecedor.fornecedor}</TableCell>
                    <TableCell>{fornecedor.cnpjCpf}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {fornecedor.projetos.slice(0, 2).map((projeto, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {projeto}
                          </Badge>
                        ))}
                        {fornecedor.projetos.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{fornecedor.projetos.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleView(fornecedor)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          {canEdit && (
                            <>
                              <DropdownMenuItem onClick={() => handleEdit(fornecedor)}>
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(fornecedor)}>
                                Excluir
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* View Dialog */}
      <Dialog open={openVisualizar} onOpenChange={setOpenVisualizar}>
        <DialogContent className="max-h-[85vh]" aria-describedby="dialog-visualizar-fornecedor-description">
          <DialogHeader>
            <DialogTitle>Cadastro do Fornecedor</DialogTitle>
            <DialogDescription id="dialog-visualizar-fornecedor-description">
              Visualize todos os dados cadastrais do fornecedor
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 mt-4 overflow-y-auto max-h-[calc(85vh-180px)] pr-2">
              <div>
                <Label className="text-muted-foreground">Razão social / nome</Label>
                <p className="mt-1">{selectedItem.razaoSocial}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Fornecedor</Label>
                <p className="mt-1">{selectedItem.fornecedor}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">CNPJ / CPF</Label>
                <p className="mt-1">{selectedItem.cnpjCpf}</p>
              </div>
              <div className="border-t pt-4">
                <Label className="text-muted-foreground mb-3 block">Dados bancários</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Banco</p>
                    <p>{selectedItem.banco || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Agência</p>
                    <p>{selectedItem.agencia || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Conta</p>
                    <p>{selectedItem.conta || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tipo de Conta</p>
                    <p>{selectedItem.tipoConta || "—"}</p>
                  </div>
                  {selectedItem.chavePix && (
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Chave PIX</p>
                      <p>{selectedItem.chavePix}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t pt-4">
                <Label className="text-muted-foreground mb-3 block">Histórico de projetos</Label>
                <div className="space-y-2">
                  {selectedItem.historicoCompleto && selectedItem.historicoCompleto.length > 0 ? (
                    <div className="max-h-[200px] overflow-y-auto">
                      {selectedItem.historicoCompleto.map((item: any, idx: number) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-lg mb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{item.projeto}</p>
                              <p className="text-sm text-muted-foreground">{item.funcao}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {item.ano}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Nenhum projeto no histórico
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Este histórico é usado para montar a ficha técnica dos projetos
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenVisualizar(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditar} onOpenChange={setOpenEditar}>
        <DialogContent className="max-h-[85vh]" aria-describedby="dialog-editar-fornecedor-description">
          <DialogHeader>
            <DialogTitle>Editar fornecedor</DialogTitle>
            <DialogDescription id="dialog-editar-fornecedor-description">
              Atualize os dados cadastrais do fornecedor
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4 overflow-y-auto max-h-[calc(85vh-180px)] pr-2">
            <div>
              <Label>Razão social / nome <span className="text-destructive">*</span></Label>
              <Input
                placeholder="Nome completo ou razão social"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
              />
            </div>
            <div>
              <Label>CNPJ / CPF <span className="text-destructive">*</span></Label>
              <Input
                placeholder="00.000.000/0000-00 ou 000.000.000-00"
                value={cnpjCpf}
                onChange={(e) => setCnpjCpf(e.target.value)}
              />
            </div>
            <div>
              <Label>Banco</Label>
              <Input
                placeholder="Nome do banco"
                value={banco}
                onChange={(e) => setBanco(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Agência</Label>
                <Input
                  placeholder="0000"
                  value={agencia}
                  onChange={(e) => setAgencia(e.target.value)}
                />
              </div>
              <div>
                <Label>Conta</Label>
                <Input
                  placeholder="00000-0"
                  value={conta}
                  onChange={(e) => setConta(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditar(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleUpdate}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent aria-describedby="dialog-delete-fornecedor-description">
          <DialogHeader>
            <DialogTitle>Excluir fornecedor</DialogTitle>
            <DialogDescription id="dialog-delete-fornecedor-description">
              Você tem certeza que deseja excluir o fornecedor <strong>{deleteConfirmText}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancelar
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={() => setOpenDelete(false)}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}