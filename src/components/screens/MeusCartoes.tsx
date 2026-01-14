/**
 * MOVIOCA - Meus Cartões
 * 
 * Tela de gestão de cartões corporativos para Equipe Dedicada.
 * Permite cadastrar novos cartões, editar apelidos, visualizar extrato
 * e solicitar cargas.
 * 
 * PRD 007 - História 1: Cadastrar dados do Cartão Físico
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Eye,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

// Mock data
const mockCartoes = [
  {
    id: 1,
    apelido: "Cartão Arte",
    final: "1234",
    bandeira: "Visa",
    saldo: 1250.0,
    status: "Ativo",
    dataCadastro: "2024-11-15",
    cargasConfirmadas: 5000.0,
    despesasLancadas: 3750.0,
  },
  {
    id: 2,
    apelido: "Cartão Figurino",
    final: "5678",
    bandeira: "Mastercard",
    saldo: 320.5,
    status: "Ativo",
    dataCadastro: "2024-11-20",
    cargasConfirmadas: 3000.0,
    despesasLancadas: 2679.5,
  },
];

export default function MeusCartoes() {
  const [cartoes, setCartoes] = useState(mockCartoes);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCarga, setModalCarga] = useState(false);
  const [modalExtrato, setModalExtrato] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [cartaoSelecionado, setCartaoSelecionado] = useState<any>(null);

  // Form fields - Novo Cartão
  const [apelido, setApelido] = useState("");
  const [final, setFinal] = useState("");
  const [bandeira, setBandeira] = useState("");

  // Form fields - Solicitação de Carga
  const [valorCarga, setValorCarga] = useState("");
  const [dataNecessaria, setDataNecessaria] = useState("");
  const [justificativa, setJustificativa] = useState("");

  const handleNovoCartao = () => {
    setApelido("");
    setFinal("");
    setBandeira("");
    setCartaoSelecionado(null);
    setModalAberto(true);
  };

  const handleEditarCartao = (cartao: any) => {
    setCartaoSelecionado(cartao);
    setApelido(cartao.apelido);
    setFinal(cartao.final);
    setBandeira(cartao.bandeira);
    setModalAberto(true);
  };

  const handleSalvarCartao = () => {
    if (!apelido || !final || !bandeira) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (final.length !== 4) {
      toast.error("Digite os 4 últimos dígitos do cartão");
      return;
    }

    if (cartaoSelecionado) {
      // Editar
      setCartoes(
        cartoes.map((c) =>
          c.id === cartaoSelecionado.id
            ? { ...c, apelido, final, bandeira }
            : c
        )
      );
      toast.success("Cartão atualizado com sucesso!");
    } else {
      // Criar novo
      const novoCartao = {
        id: cartoes.length + 1,
        apelido,
        final,
        bandeira,
        saldo: 0,
        status: "Ativo",
        dataCadastro: new Date().toISOString().split("T")[0],
        cargasConfirmadas: 0,
        despesasLancadas: 0,
      };
      setCartoes([...cartoes, novoCartao]);
      toast.success("Cartão cadastrado com sucesso!");
    }

    setModalAberto(false);
  };

  const handleExcluirCartao = (id: number) => {
    const cartao = cartoes.find((c) => c.id === id);
    if (cartao && cartao.saldo > 0) {
      toast.error("Não é possível excluir cartão com saldo disponível");
      return;
    }

    setCartoes(cartoes.filter((c) => c.id !== id));
    toast.success("Cartão removido com sucesso");
    setModalExcluir(false);
  };

  const handleSolicitarCarga = (cartao: any) => {
    setCartaoSelecionado(cartao);
    setValorCarga("");
    setDataNecessaria(new Date().toISOString().split("T")[0]);
    setJustificativa("");
    setModalCarga(true);
  };

  const handleEnviarSolicitacao = () => {
    if (!valorCarga || !dataNecessaria || !justificativa) {
      toast.error("Preencha todos os campos");
      return;
    }

    const valor = parseFloat(valorCarga);
    if (valor <= 0) {
      toast.error("Valor deve ser maior que zero");
      return;
    }

    toast.success(
      `Solicitação de carga de R$ ${valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })} enviada com sucesso!`
    );
    setModalCarga(false);
  };

  const handleVerExtrato = (cartao: any) => {
    setCartaoSelecionado(cartao);
    setModalExtrato(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-500/10 text-green-600";
      case "Bloqueado":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  // Mock extrato
  const mockExtrato = [
    {
      id: 1,
      tipo: "Carga",
      descricao: "Carga aprovada - Material cenário",
      valor: 2000.0,
      data: "2024-12-08",
    },
    {
      id: 2,
      tipo: "Despesa",
      descricao: "Loja das Tintas - Tinta látex",
      valor: -450.0,
      data: "2024-12-07",
    },
    {
      id: 3,
      tipo: "Despesa",
      descricao: "Casa do Construtor - Ferramentas",
      valor: -320.0,
      data: "2024-12-06",
    },
    {
      id: 4,
      tipo: "Carga",
      descricao: "Carga aprovada - Compras iniciais",
      valor: 3000.0,
      data: "2024-11-15",
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Meus Cartões</h2>
          <p className="text-muted-foreground mt-2">
            Gerencie seus cartões corporativos e solicite cargas
          </p>
        </div>
        <Button onClick={handleNovoCartao} className="bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cartão
        </Button>
      </div>

      {/* Lista de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartoes.map((cartao) => (
          <Card
            key={cartao.id}
            className="hover:shadow-lg transition-shadow h-[480px] flex flex-col"
          >
            <CardContent className="pt-6 space-y-4 flex-1 flex flex-col">
              {/* Card Visual */}
              <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 rounded-xl space-y-4 relative">
                {/* Dropdown de 3 pontos no topo direito */}
                <div className="absolute top-3 right-3 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-white/20 text-white"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditarCartao(cartao)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setCartaoSelecionado(cartao);
                          setModalExcluir(true);
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Bandeira do Cartão */}
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm font-medium">{cartao.bandeira}</span>
                </div>

                {/* Apelido */}
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wide mb-1">Apelido</p>
                  <p className="text-xl font-bold">{cartao.apelido}</p>
                </div>

                {/* Final e Saldo */}
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wide mb-1">Final</p>
                    <p className="font-mono text-lg tracking-widest">•••• {cartao.final}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70 uppercase tracking-wide mb-1">Saldo Disponível</p>
                    <p className="text-2xl font-bold">
                      R${" "}
                      {cartao.saldo.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Alerta de Saldo Baixo */}
              {cartao.saldo < 500 && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-600">
                    Saldo baixo. Considere solicitar recarga.
                  </p>
                </div>
              )}

              {/* Estatísticas */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-1 text-green-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium">Cargas Recebidas</span>
                  </div>
                  <p className="font-bold text-foreground">
                    R${" "}
                    {cartao.cargasConfirmadas.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-1 text-orange-600 mb-1">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-xs font-medium">Total Gasto</span>
                  </div>
                  <p className="font-bold text-foreground">
                    R${" "}
                    {cartao.despesasLancadas.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              {/* Ações */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <Button
                  onClick={() => handleSolicitarCarga(cartao)}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Solicitar Carga
                </Button>
                <Button
                  onClick={() => handleVerExtrato(cartao)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Extrato
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado Vazio */}
      {cartoes.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-6 rounded-full">
                <CreditCard className="w-12 h-12 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-lg">Nenhum cartão cadastrado</p>
                <p className="text-muted-foreground mt-1">
                  Cadastre o cartão que recebeu da produção para começar
                </p>
              </div>
              <Button onClick={handleNovoCartao} className="bg-primary">
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Primeiro Cartão
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal: Novo/Editar Cartão */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {cartaoSelecionado ? "Editar Cartão" : "Novo Cartão"}
            </DialogTitle>
            <DialogDescription>
              {cartaoSelecionado
                ? "Altere as informações do cartão corporativo"
                : "Cadastre os dados do seu cartão corporativo"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="apelido">
                Apelido do Cartão <span className="text-destructive">*</span>
              </Label>
              <Input
                id="apelido"
                placeholder="Ex: Cartão Arte, Ticket Figurino..."
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Nome para identificar facilmente o cartão
              </p>
            </div>

            <div>
              <Label htmlFor="bandeira">
                Bandeira <span className="text-destructive">*</span>
              </Label>
              <Select value={bandeira} onValueChange={setBandeira}>
                <SelectTrigger id="bandeira">
                  <SelectValue placeholder="Selecione a bandeira" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visa">Visa</SelectItem>
                  <SelectItem value="Mastercard">Mastercard</SelectItem>
                  <SelectItem value="Elo">Elo</SelectItem>
                  <SelectItem value="Amex">American Express</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="final">
                4 Últimos Dígitos <span className="text-destructive">*</span>
              </Label>
              <Input
                id="final"
                placeholder="1234"
                maxLength={4}
                value={final}
                onChange={(e) => setFinal(e.target.value.replace(/\D/g, ""))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Apenas os 4 últimos dígitos do cartão físico
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSalvarCartao} className="bg-primary">
              {cartaoSelecionado ? "Salvar Alterações" : "Cadastrar Cartão"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Solicitação de Carga */}
      <Dialog open={modalCarga} onOpenChange={setModalCarga}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Carga</DialogTitle>
            <DialogDescription>
              Solicite uma carga para o cartão{" "}
              {cartaoSelecionado?.apelido} (Final {cartaoSelecionado?.final})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Saldo Atual</p>
              <p className="text-2xl font-bold">
                R${" "}
                {cartaoSelecionado?.saldo.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div>
              <Label htmlFor="valorCarga">
                Valor da Carga (R$) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="valorCarga"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={valorCarga}
                onChange={(e) => setValorCarga(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dataNecessaria">
                Data Necessária <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dataNecessaria"
                type="date"
                value={dataNecessaria}
                onChange={(e) => setDataNecessaria(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="justificativa">
                Justificativa <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="justificativa"
                placeholder="Ex: Compras na 25 de março para cenário X"
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Descreva a finalidade da carga solicitada
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalCarga(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEnviarSolicitacao} className="bg-primary">
              Enviar Solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Extrato do Cartão */}
      <Dialog open={modalExtrato} onOpenChange={setModalExtrato}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Extrato do Cartão</DialogTitle>
            <DialogDescription>
              {cartaoSelecionado?.apelido} - Final {cartaoSelecionado?.final}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockExtrato.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {new Date(item.data).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.tipo === "Carga"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-orange-500/10 text-orange-600"
                        }
                      >
                        {item.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        item.valor > 0 ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {item.valor > 0 ? "+" : ""}R${" "}
                      {Math.abs(item.valor).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalExtrato(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Excluir Cartão */}
      <Dialog open={modalExcluir} onOpenChange={setModalExcluir}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Cartão</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir o cartão{" "}
              {cartaoSelecionado?.apelido} (Final {cartaoSelecionado?.final})?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalExcluir(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleExcluirCartao(cartaoSelecionado?.id)}
              className="bg-red-500"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}