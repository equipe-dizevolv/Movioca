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
import { Upload, Search, Download, Eye, Trash2, Edit, MoreVertical } from "lucide-react";
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
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Documentos() {
  const [selectedProject, setSelectedProject] = useState("Projeto Alpha");
  const [tipoFilter, setTipoFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const documentos = [
    {
      nome: "Contrato_PROJ001_v2.pdf",
      tipo: "Contrato",
      projeto: "Projeto Alpha",
      atualizacao: "20/01/2024 14:30",
      descricao: "Contrato de prestação de serviços versão 2",
    },
    {
      nome: "Nota_Fiscal_12345.pdf",
      tipo: "Nota Fiscal",
      projeto: "Projeto Beta",
      atualizacao: "18/01/2024 09:15",
      descricao: "Nota fiscal de equipamentos",
    },
    {
      nome: "Prestacao_Contas_Janeiro.xlsx",
      tipo: "Prestação de Contas",
      projeto: "Projeto Alpha",
      atualizacao: "22/01/2024 16:45",
      descricao: "Prestação de contas do mês de janeiro",
    },
  ];

  const getTipoBadge = (tipo: string) => {
    const colors: Record<string, string> = {
      "Contrato": "bg-blue-100 text-blue-800",
      "Nota Fiscal": "bg-green-100 text-green-800",
      "Prestação de Contas": "bg-purple-100 text-purple-800",
    };
    return <Badge className={colors[tipo] || "bg-gray-100 text-gray-800"}>{tipo}</Badge>;
  };

  const handleView = (doc: any) => {
    setSelectedDoc(doc);
    setOpenView(true);
  };

  const handleEdit = (doc: any) => {
    setSelectedDoc(doc);
    setOpenEdit(true);
  };

  const handleDelete = (doc: any) => {
    setSelectedDoc(doc);
    setDeleteConfirmName("");
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    if (deleteConfirmName === selectedDoc?.nome) {
      setOpenDelete(false);
      setDeleteConfirmName("");
      // Execute delete logic here
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Documentos</h2>
          <p className="text-muted-foreground mt-1">
            Gerenciamento de documentos do sistema
          </p>
        </div>
        <Dialog open={openUpload} onOpenChange={setOpenUpload}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              Enviar Documento
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby="dialog-upload-doc-description">
            <DialogHeader>
              <DialogTitle>Upload de Documento</DialogTitle>
              <DialogDescription id="dialog-upload-doc-description">
                Envie um novo documento para o sistema
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Nome</Label>
                <Input placeholder="Nome do documento" />
              </div>
              <div>
                <Label>Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contrato">Contrato</SelectItem>
                    <SelectItem value="nota-fiscal">Nota Fiscal</SelectItem>
                    <SelectItem value="prestacao">Prestação de Contas</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Projeto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alpha">Projeto Alpha</SelectItem>
                    <SelectItem value="beta">Projeto Beta</SelectItem>
                    <SelectItem value="gama">Projeto Gama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Arquivo *</Label>
                <Input type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenUpload(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setOpenUpload(false)}>
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Projeto <span className="text-destructive">*</span></Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                  <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                  <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Contrato">Contrato</SelectItem>
                  <SelectItem value="NF">NF</SelectItem>
                  <SelectItem value="Comprovante">Comprovante</SelectItem>
                  <SelectItem value="Planilha">Planilha</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar documentos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Última atualização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentos.map((documento, idx) => (
                <TableRow key={idx}>
                  <TableCell>{documento.nome}</TableCell>
                  <TableCell>{getTipoBadge(documento.tipo)}</TableCell>
                  <TableCell>{documento.projeto}</TableCell>
                  <TableCell className="text-muted-foreground">{documento.atualizacao}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleView(documento)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(documento)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(documento)}>
                          <Trash2 className="w-4 h-4 mr-2" />
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

      {/* View Modal */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent aria-describedby="dialog-view-doc-description">
          <DialogHeader>
            <DialogTitle>Visualizar Documento</DialogTitle>
            <DialogDescription id="dialog-view-doc-description">
              Detalhes completos do documento
            </DialogDescription>
          </DialogHeader>
          {selectedDoc && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Nome</Label>
                <Input value={selectedDoc.nome} readOnly className="bg-muted" />
              </div>
              <div>
                <Label>Tipo</Label>
                <Input value={selectedDoc.tipo} readOnly className="bg-muted" />
              </div>
              <div>
                <Label>Projeto</Label>
                <Input value={selectedDoc.projeto} readOnly className="bg-muted" />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea value={selectedDoc.descricao} readOnly className="bg-muted" />
              </div>
              <div>
                <Label>Última Atualização</Label>
                <Input value={selectedDoc.atualizacao} readOnly className="bg-muted" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenView(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent aria-describedby="dialog-edit-doc-description">
          <DialogHeader>
            <DialogTitle>Editar Documento</DialogTitle>
            <DialogDescription id="dialog-edit-doc-description">
              Atualize as informações do documento
            </DialogDescription>
          </DialogHeader>
          {selectedDoc && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Nome</Label>
                <Input defaultValue={selectedDoc.nome} />
              </div>
              <div>
                <Label>Tipo</Label>
                <Select defaultValue={selectedDoc.tipo.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contrato">Contrato</SelectItem>
                    <SelectItem value="nota fiscal">Nota Fiscal</SelectItem>
                    <SelectItem value="prestação de contas">Prestação de Contas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Projeto</Label>
                <Input defaultValue={selectedDoc.projeto} />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea defaultValue={selectedDoc.descricao} />
              </div>
              <div>
                <Label>Arquivo (opcional)</Label>
                <Input type="file" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setOpenEdit(false)}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent aria-describedby="dialog-delete-doc-description">
          <DialogHeader>
            <DialogTitle>Excluir Documento</DialogTitle>
            <DialogDescription id="dialog-delete-doc-description">
              Esta ação não pode ser desfeita. Para confirmar a exclusão, digite o nome do documento abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedDoc && (
              <>
                <div>
                  <Label>Documento a ser excluído:</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedDoc.nome}</p>
                </div>
                <div>
                  <Label>Digite o nome do documento para confirmar</Label>
                  <Input
                    value={deleteConfirmName}
                    onChange={(e) => setDeleteConfirmName(e.target.value)}
                    placeholder={selectedDoc.nome}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteConfirmName !== selectedDoc?.nome}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}