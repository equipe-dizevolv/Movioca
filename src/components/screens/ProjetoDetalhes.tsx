import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ArrowLeft, Plus, X, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";

interface ProjetoDetalhesProps {
  projeto: any;
  onBack: () => void;
  onSave?: (projeto: any) => void;
}

export default function ProjetoDetalhes({ projeto, onBack, onSave }: ProjetoDetalhesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(projeto);
  const [coprodutores, setCoprodutores] = useState<string[]>(projeto.coprodutores || []);
  const [coproInput, setCoproInput] = useState("");
  const [fontesDetalhes, setFontesDetalhes] = useState(projeto.fontesDetalhes || []);
  const [openFonteModal, setOpenFonteModal] = useState(false);
  const [editingFonteIndex, setEditingFonteIndex] = useState<number | null>(null);
  const [currentFonte, setCurrentFonte] = useState({
    fonte: "",
    codigoProjeto: "",
    agencia: "",
    contaCorrente: "",
    valor: ""
  });

  const addCoprodutor = () => {
    if (coproInput.trim()) {
      setCoprodutores([...coprodutores, coproInput.trim()]);
      setCoproInput("");
    }
  };

  const removeCoprodutor = (index: number) => {
    setCoprodutores(coprodutores.filter((_, i) => i !== index));
  };

  const handleAddFonte = () => {
    setCurrentFonte({
      fonte: "",
      codigoProjeto: "",
      agencia: "",
      contaCorrente: "",
      valor: ""
    });
    setEditingFonteIndex(null);
    setOpenFonteModal(true);
  };

  const handleEditFonte = (index: number) => {
    setCurrentFonte(fontesDetalhes[index]);
    setEditingFonteIndex(index);
    setOpenFonteModal(true);
  };

  const handleSaveFonte = () => {
    if (editingFonteIndex !== null) {
      const updated = [...fontesDetalhes];
      updated[editingFonteIndex] = currentFonte;
      setFontesDetalhes(updated);
    } else {
      setFontesDetalhes([...fontesDetalhes, currentFonte]);
    }
    setOpenFonteModal(false);
  };

  const handleDeleteFonte = (index: number) => {
    setFontesDetalhes(fontesDetalhes.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedProject = {
      ...editedProject,
      coprodutores,
      fontesDetalhes
    };
    if (onSave) {
      onSave(updatedProject);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProject(projeto);
    setCoprodutores(projeto.coprodutores || []);
    setFontesDetalhes(projeto.fontesDetalhes || []);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-3xl text-foreground">{projeto.nome}</h2>
            <p className="text-muted-foreground mt-1">
              Código: {projeto.codigo}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              Editar Projeto
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleSave}>
                Salvar Alterações
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Informações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Código</Label>
              {isEditing ? (
                <Input
                  value={editedProject.codigo}
                  onChange={(e) => setEditedProject({ ...editedProject, codigo: e.target.value })}
                />
              ) : (
                <p className="mt-2">{projeto.codigo}</p>
              )}
            </div>
            <div>
              <Label>Nome</Label>
              {isEditing ? (
                <Input
                  value={editedProject.nome}
                  onChange={(e) => setEditedProject({ ...editedProject, nome: e.target.value })}
                />
              ) : (
                <p className="mt-2">{projeto.nome}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Formato</Label>
              {isEditing ? (
                <Select
                  value={editedProject.formato}
                  onValueChange={(value) => setEditedProject({ ...editedProject, formato: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Série">Série</SelectItem>
                    <SelectItem value="Longa-metragem">Longa-metragem</SelectItem>
                    <SelectItem value="Curta-metragem">Curta-metragem</SelectItem>
                    <SelectItem value="Média-metragem">Média-metragem</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-2">{projeto.formato}</p>
              )}
            </div>
            <div>
              <Label>Gênero</Label>
              {isEditing ? (
                <Select
                  value={editedProject.genero}
                  onValueChange={(value) => setEditedProject({ ...editedProject, genero: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Documentário">Documentário</SelectItem>
                    <SelectItem value="Ficção">Ficção</SelectItem>
                    <SelectItem value="Animação">Animação</SelectItem>
                    <SelectItem value="Experimental">Experimental</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-2">{projeto.genero}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Ano</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProject.ano}
                  onChange={(e) => setEditedProject({ ...editedProject, ano: parseInt(e.target.value) })}
                />
              ) : (
                <p className="mt-2">{projeto.ano}</p>
              )}
            </div>
            <div>
              <Label>Temporadas</Label>
              {isEditing ? (
                <Input
                  value={editedProject.temporadas}
                  onChange={(e) => setEditedProject({ ...editedProject, temporadas: e.target.value })}
                />
              ) : (
                <p className="mt-2">{projeto.temporadas || "—"}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Canal</Label>
              {isEditing ? (
                <Input
                  value={editedProject.canal}
                  onChange={(e) => setEditedProject({ ...editedProject, canal: e.target.value })}
                />
              ) : (
                <p className="mt-2">{projeto.canal}</p>
              )}
            </div>
            <div>
              <Label>Distribuidora</Label>
              {isEditing ? (
                <Input
                  value={editedProject.distribuidora}
                  onChange={(e) => setEditedProject({ ...editedProject, distribuidora: e.target.value })}
                />
              ) : (
                <p className="mt-2">{projeto.distribuidora || "—"}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coprodutores */}
      <Card>
        <CardHeader>
          <CardTitle>Coprodutores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Nome do coprodutor"
                value={coproInput}
                onChange={(e) => setCoproInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCoprodutor()}
              />
              <Button onClick={addCoprodutor}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {coprodutores.length === 0 ? (
              <p className="text-muted-foreground">Nenhum coprodutor</p>
            ) : (
              coprodutores.map((copro, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  {copro}
                  {isEditing && (
                    <button onClick={() => removeCoprodutor(index)}>
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fontes de Financiamento */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fontes de Financiamento</CardTitle>
          {isEditing && (
            <Button onClick={handleAddFonte} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Fonte
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fonte</TableHead>
                <TableHead>Código do Projeto</TableHead>
                <TableHead>Agência</TableHead>
                <TableHead>Conta Corrente</TableHead>
                <TableHead>Valor</TableHead>
                {isEditing && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {fontesDetalhes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isEditing ? 6 : 5} className="text-center text-muted-foreground">
                    Nenhuma fonte cadastrada
                  </TableCell>
                </TableRow>
              ) : (
                fontesDetalhes.map((fonte: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{fonte.fonte}</TableCell>
                    <TableCell>{fonte.codigoProjeto}</TableCell>
                    <TableCell>{fonte.agencia || "—"}</TableCell>
                    <TableCell>{fonte.contaCorrente || "—"}</TableCell>
                    <TableCell>{fonte.valor}</TableCell>
                    {isEditing && (
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditFonte(index)}>
                            Editar
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteFonte(index)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Fonte */}
      <Dialog open={openFonteModal} onOpenChange={setOpenFonteModal}>
        <DialogContent aria-describedby="dialog-fonte-description">
          <DialogHeader>
            <DialogTitle>
              {editingFonteIndex !== null ? "Editar Fonte" : "Nova Fonte de Financiamento"}
            </DialogTitle>
            <DialogDescription id="dialog-fonte-description">
              {editingFonteIndex !== null ? "Atualize os dados desta fonte de financiamento" : "Adicione uma nova fonte de financiamento ao projeto"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Fonte</Label>
              <Select
                value={currentFonte.fonte}
                onValueChange={(value) => setCurrentFonte({ ...currentFonte, fonte: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ANCINE">ANCINE</SelectItem>
                  <SelectItem value="FSA">FSA</SelectItem>
                  <SelectItem value="Editais">Editais</SelectItem>
                  <SelectItem value="Recursos Próprios">Recursos Próprios</SelectItem>
                  <SelectItem value="Patrocínio">Patrocínio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Código do Projeto</Label>
              <Input
                placeholder="Ex: ANC-2024-001"
                value={currentFonte.codigoProjeto}
                onChange={(e) => setCurrentFonte({ ...currentFonte, codigoProjeto: e.target.value })}
              />
            </div>
            <div>
              <Label>Agência</Label>
              <Input
                placeholder="Ex: Banco do Brasil 1234-5"
                value={currentFonte.agencia}
                onChange={(e) => setCurrentFonte({ ...currentFonte, agencia: e.target.value })}
              />
            </div>
            <div>
              <Label>Conta Corrente</Label>
              <Input
                placeholder="Ex: 12345-6"
                value={currentFonte.contaCorrente}
                onChange={(e) => setCurrentFonte({ ...currentFonte, contaCorrente: e.target.value })}
              />
            </div>
            <div>
              <Label>Valor</Label>
              <Input
                placeholder="Ex: R$ 500.000,00"
                value={currentFonte.valor}
                onChange={(e) => setCurrentFonte({ ...currentFonte, valor: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenFonteModal(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveFonte}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}