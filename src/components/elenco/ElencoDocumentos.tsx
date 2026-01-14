/**
 * MOVIOCA - Documentos do Elenco
 * 
 * Upload e gestão de documentos:
 * - Contratos assinados
 * - RG, CPF
 * - Atestado médico admissional
 * - Comprovante de vacinação
 * - Autorização de imagem
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Upload,
  FileText,
  Eye,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ElencoDocumentosProps {
  elencoData: any;
}

export default function ElencoDocumentos({ elencoData }: ElencoDocumentosProps) {
  const [openUpload, setOpenUpload] = useState(false);
  const [tipoDoc, setTipoDoc] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const [documentos, setDocumentos] = useState([
    {
      id: "doc-001",
      tipo: "Contrato",
      nome: "Contrato_Elenco_Serie_Documentario.pdf",
      projeto: "Série Documentário - História",
      dataUpload: "05/12/2024",
      status: "Aprovado",
    },
    {
      id: "doc-002",
      tipo: "RG",
      nome: "RG_frente_verso.pdf",
      projeto: "Geral",
      dataUpload: "01/12/2024",
      status: "Aprovado",
    },
    {
      id: "doc-003",
      tipo: "Atestado Médico",
      nome: "Atestado_Admissional.pdf",
      projeto: "Longa-metragem - Drama",
      dataUpload: "Pendente",
      status: "Pendente",
    },
  ]);

  const tiposDocumento = [
    "Contrato Assinado",
    "RG (Frente e Verso)",
    "CPF",
    "Comprovante de Residência",
    "Atestado Médico Admissional",
    "Cartão de Vacinação",
    "Autorização de Uso de Imagem",
    "DRT",
    "Outro",
  ];

  const handleUpload = () => {
    if (!arquivo || !tipoDoc) {
      toast.error("Selecione o tipo e o arquivo");
      return;
    }

    console.log("Uploading:", { tipoDoc, arquivo });
    toast.success(`Documento "${arquivo.name}" enviado com sucesso!`);
    setOpenUpload(false);
    setArquivo(null);
    setTipoDoc("");
  };

  const getStatusColor = (status: string) => {
    return status === "Aprovado" ? "bg-green-500" : "bg-yellow-500";
  };

  const handleDelete = (id: string) => {
    setDocumentToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      const updatedDocumentos = documentos.filter((doc) => doc.id !== documentToDelete);
      console.log("Deleting:", documentToDelete);
      toast.success(`Documento "${documentToDelete}" excluído com sucesso!`);
      setDocumentos(updatedDocumentos);
      setShowDeleteConfirm(false);
      setDocumentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDocumentToDelete(null);
  };

  const handleView = (doc: any) => {
    setSelectedDocument(doc);
    setShowViewDialog(true);
  };

  const handleDownload = (doc: any) => {
    toast.success(`Download iniciado: ${doc.nome}`);
    console.log("Downloading:", doc);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Meus Documentos</h2>
          <p className="text-muted-foreground mt-1">
            Gerencie seus documentos e contratos
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setOpenUpload(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Enviar Documento
        </Button>
      </div>

      {/* Alertas de Documentos Pendentes */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-100">
                1 documento pendente
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
                É necessário enviar o <strong>Atestado Médico Admissional</strong> para o projeto
                "Longa-metragem - Drama" antes do início das filmagens (15/01/2025).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Total de Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {documentos.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Aprovados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {documentos.filter((d) => d.status === "Aprovado").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">
              {documentos.filter((d) => d.status === "Pendente").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Nome do Arquivo</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Data de Upload</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentos.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <Badge variant="outline">{doc.tipo}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{doc.nome}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {doc.projeto}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {doc.dataUpload}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(doc)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)}>
                        <Download className="w-4 h-4" />
                      </Button>
                      {doc.status === "Pendente" && (
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Upload */}
      <Dialog open={openUpload} onOpenChange={setOpenUpload}>
        <DialogContent aria-describedby="dialog-upload-description">
          <DialogHeader>
            <DialogTitle>Enviar Documento</DialogTitle>
            <DialogDescription id="dialog-upload-description">
              Faça upload de um novo documento para o seu perfil
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Documento <span className="text-destructive">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={tipoDoc}
                onChange={(e) => setTipoDoc(e.target.value)}
              >
                <option value="">Selecione...</option>
                {tiposDocumento.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Arquivo <span className="text-destructive">*</span>
              </label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
              </p>
            </div>

            {arquivo && (
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">Arquivo selecionado:</p>
                <p className="text-sm text-muted-foreground">{arquivo.name}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenUpload(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent aria-describedby="dialog-delete-description">
          <DialogHeader>
            <DialogTitle>Excluir Documento</DialogTitle>
            <DialogDescription id="dialog-delete-description">
              Você tem certeza de que deseja excluir este documento?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancelar
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Visualização de Documento */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent aria-describedby="dialog-view-description">
          <DialogHeader>
            <DialogTitle>Visualizar Documento</DialogTitle>
            <DialogDescription id="dialog-view-description">
              Visualize o documento selecionado
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Documento
              </label>
              <p className="text-sm text-muted-foreground">{selectedDocument?.tipo}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Nome do Arquivo
              </label>
              <p className="text-sm text-muted-foreground">{selectedDocument?.nome}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Projeto
              </label>
              <p className="text-sm text-muted-foreground">{selectedDocument?.projeto}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Data de Upload
              </label>
              <p className="text-sm text-muted-foreground">{selectedDocument?.dataUpload}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Status
              </label>
              <Badge className={getStatusColor(selectedDocument?.status)}>
                {selectedDocument?.status}
              </Badge>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}