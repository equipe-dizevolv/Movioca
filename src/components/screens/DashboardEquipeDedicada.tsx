/**
 * MOVIOCA - Dashboard Equipe Dedicada
 * 
 * Tela: "Minha Carteira de Produção"
 * 
 * Dashboard principal para o perfil Equipe Dedicada (Gestor de Verba).
 * Exibe carrossel de cartões corporativos, saldo disponível, histórico de cargas
 * e atalhos para as principais ações (solicitar carga, lançar despesas).
 * 
 * PRD 007 - Seção 3.1: Tela: Meus Cartões (Home da Equipe)
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  CreditCard,
  Plus,
  TrendingUp,
  Receipt,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Wallet,
  ArrowRight,
  Camera,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// Mock data para cartões
const mockCartoes = [
  {
    id: 1,
    apelido: "Cartão Arte",
    final: "1234",
    bandeira: "Visa",
    saldo: 1250.0,
    status: "Ativo",
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
    cargasConfirmadas: 3000.0,
    despesasLancadas: 2679.5,
  },
];

// Mock data para histórico de cargas
const mockHistoricoCargas = [
  {
    id: 1,
    cartao: "Cartão Arte (1234)",
    valor: 2000.0,
    data: "2024-12-08",
    status: "Carregado",
    justificativa: "Compras de material para cenário principal",
  },
  {
    id: 2,
    cartao: "Cartão Arte (1234)",
    valor: 1500.0,
    data: "2024-12-05",
    status: "Pendente",
    justificativa: "Tinta e material de pintura",
  },
  {
    id: 3,
    cartao: "Cartão Figurino (5678)",
    valor: 1000.0,
    data: "2024-12-03",
    status: "Carregado",
    justificativa: "Tecidos para costumes período",
  },
];

export default function DashboardEquipeDedicada({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const { currentUser } = useAuth();
  const [selectedCartao, setSelectedCartao] = useState(mockCartoes[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Bloqueado":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getCargaStatusColor = (status: string) => {
    switch (status) {
      case "Carregado":
        return "bg-green-500/10 text-green-600";
      case "Pendente":
        return "bg-yellow-500/10 text-yellow-600";
      case "Reprovado":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const getCargaStatusIcon = (status: string) => {
    switch (status) {
      case "Carregado":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Pendente":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Cálculo de totais
  const totalSaldoDisponivel = mockCartoes.reduce(
    (sum, cartao) => sum + cartao.saldo,
    0
  );
  const totalCargas = mockCartoes.reduce(
    (sum, cartao) => sum + cartao.cargasConfirmadas,
    0
  );
  const totalDespesas = mockCartoes.reduce(
    (sum, cartao) => sum + cartao.despesasLancadas,
    0
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Minha Carteira de Produção</h2>
        <p className="text-muted-foreground mt-2">
          Gerencie seus cartões corporativos, saldo disponível e despesas
        </p>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo Total</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  R$ {totalSaldoDisponivel.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Carregado</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  R$ {totalCargas.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Gasto</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  R$ {totalDespesas.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-lg">
                <Receipt className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Carrossel de Cartões */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Meus Cartões</h3>
          <Button variant="outline" size="sm" onClick={() => onNavigate("Meus Cartões")}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Cartão
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCartoes.map((cartao) => (
            <Card
              key={cartao.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCartao?.id === cartao.id
                  ? "border-primary shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCartao(cartao)}
            >
              <CardContent className="pt-6">
                {/* Card Visual - Estilo cartão de crédito */}
                <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 rounded-xl space-y-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-6 h-6" />
                      <span className="font-medium">{cartao.bandeira}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusColor(cartao.status)}
                    >
                      {cartao.status}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-white/80">Apelido do Cartão</p>
                    <p className="text-xl font-bold">{cartao.apelido}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/80">Final</p>
                      <p className="text-lg font-mono tracking-wider">
                        •••• {cartao.final}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/80">Saldo Disponível</p>
                      <p className="text-2xl font-bold">
                        R${" "}
                        {cartao.saldo.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ações Rápidas */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className="w-full bg-primary" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("Meus Cartões");
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Solicitar Carga
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("Lançar Despesas");
                    }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Lançar Despesa
                  </Button>
                </div>

                {/* Detalhes do Saldo */}
                {cartao.saldo < 500 && (
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-600">
                        Saldo baixo
                      </p>
                      <p className="text-muted-foreground">
                        Considere solicitar uma recarga para evitar
                        constrangimentos na compra
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estado Vazio */}
        {mockCartoes.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-muted p-6 rounded-full">
                  <CreditCard className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-lg">
                    Você não tem cartões cadastrados
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Cadastre o cartão que recebeu da produção para começar
                  </p>
                </div>
                <Button className="bg-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Primeiro Cartão
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Histórico de Solicitações de Carga */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histórico de Cargas</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("Meus Cartões")}>
              Ver Todos <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHistoricoCargas.map((carga) => (
              <div
                key={carga.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`p-2 rounded-lg ${getCargaStatusColor(
                      carga.status
                    )}`}
                  >
                    {getCargaStatusIcon(carga.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{carga.cartao}</p>
                      <Badge
                        variant="outline"
                        className={getCargaStatusColor(carga.status)}
                      >
                        {carga.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {carga.justificativa}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(carga.data).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    R${" "}
                    {carga.valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas - Mobile First */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20"
          onClick={() => onNavigate("Lançar Despesas")}
        >
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-lg">Lançar Nova Despesa</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Tire foto da nota fiscal e registre o gasto imediatamente
                </p>
                <Button 
                  variant="link" 
                  className="px-0 mt-2 text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("Lançar Despesas");
                  }}
                >
                  Abrir câmera <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onNavigate("Prestação de Contas")}
        >
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-lg">Prestação de Contas</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Envie suas despesas lançadas para a Controladoria
                </p>
                <Button 
                  variant="link" 
                  className="px-0 mt-2 text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("Prestação de Contas");
                  }}
                >
                  Criar lote <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}