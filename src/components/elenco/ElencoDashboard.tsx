/**
 * MOVIOCA - Dashboard do Elenco
 * 
 * Página inicial do portal com:
 * - Resumo de cachês
 * - Contratos ativos
 * - Pagamentos programados
 * - Avisos importantes
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
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
  DollarSign,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Eye,
  Download,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ElencoDashboardProps {
  elencoData: any;
  onNavigateToFicha?: () => void;
}

export default function ElencoDashboard({ elencoData, onNavigateToFicha }: ElencoDashboardProps) {
  // Mock data
  const contratos = [
    {
      id: "cnt-001",
      projeto: "Série Documentário - História",
      personagem: "Narrador",
      tipo: "Voz",
      valor: 15000,
      status: "Ativo",
      dataInicio: "01/12/2024",
      dataFim: "31/03/2025",
    },
    {
      id: "cnt-002",
      projeto: "Longa-metragem - Drama",
      personagem: "Protagonista",
      tipo: "Elenco Principal",
      valor: 80000,
      status: "Assinado",
      dataInicio: "15/01/2025",
      dataFim: "30/04/2025",
    },
  ];

  const pagamentos = [
    {
      id: "pag-001",
      descricao: "Cachê - 1ª Parcela",
      projeto: "Série Documentário",
      valor: 5000,
      vencimento: "15/12/2024",
      status: "Programado",
    },
    {
      id: "pag-002",
      descricao: "Cachê - 2ª Parcela",
      projeto: "Série Documentário",
      valor: 5000,
      vencimento: "15/01/2025",
      status: "Pendente",
    },
    {
      id: "pag-003",
      descricao: "Cachê - Protagonista",
      projeto: "Longa-metragem",
      valor: 40000,
      vencimento: "01/02/2025",
      status: "Programado",
    },
  ];

  const totalContratos = contratos.reduce((sum, c) => sum + c.valor, 0);
  const totalReceber = pagamentos
    .filter((p) => p.status !== "Pago")
    .reduce((sum, p) => sum + p.valor, 0);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Ativo: "bg-green-500",
      Assinado: "bg-blue-500",
      Programado: "bg-yellow-500",
      Pendente: "bg-orange-500",
      Pago: "bg-green-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">
          Bem-vindo(a), {elencoData?.nomeArtistico || elencoData?.nome}!
        </h2>
        <p className="text-muted-foreground mt-1">
          Aqui voce acompanha seus contratos, caches e documentos
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Contratos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">
                {contratos.filter((c) => c.status === "Ativo").length}
              </p>
              <p className="text-sm text-muted-foreground">de {contratos.length} total</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Contratado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              R$ {totalContratos.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              A Receber
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              R$ {totalReceber.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Próximo Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-foreground">15/12/2024</p>
            <p className="text-sm text-muted-foreground">R$ 5.000,00</p>
          </CardContent>
        </Card>
      </div>

      {/* Avisos */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-100">
                Documentos Pendentes
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
                Você precisa fazer upload do seu Atestado Médico (Admissional) para o projeto
                "Longa-metragem - Drama". Acesse a aba Documentos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contratos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Meus Contratos</CardTitle>
            <Badge variant="outline">{contratos.length} contratos</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Personagem/Função</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratos.map((contrato) => (
                <TableRow key={contrato.id}>
                  <TableCell className="font-medium">{contrato.projeto}</TableCell>
                  <TableCell>{contrato.personagem}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{contrato.tipo}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {contrato.dataInicio} - {contrato.dataFim}
                  </TableCell>
                  <TableCell className="font-mono">
                    R$ {contrato.valor.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contrato.status)}>
                      {contrato.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagamentos Programados */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pagamentos Programados</CardTitle>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              R$ {totalReceber.toLocaleString("pt-BR")} a receber
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pagamentos.map((pagamento) => (
              <div
                key={pagamento.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${getStatusColor(
                      pagamento.status
                    )} flex items-center justify-center`}
                  >
                    {pagamento.status === "Pago" ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <Clock className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{pagamento.descricao}</p>
                    <p className="text-sm text-muted-foreground">{pagamento.projeto}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-foreground">
                    R$ {pagamento.valor.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-sm text-muted-foreground">{pagamento.vencimento}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Ficha Cadastral Completa?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Mantenha seus dados atualizados para evitar atrasos nos pagamentos
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => {
              if (onNavigateToFicha) {
                onNavigateToFicha();
              } else {
                setIsDialogOpen(true);
              }
            }}>Atualizar Ficha</Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog para atualizar ficha */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby="dialog-ficha-description">
          <DialogHeader>
            <DialogTitle>Atualizar Ficha Cadastral</DialogTitle>
            <DialogDescription id="dialog-ficha-description">
              Para atualizar sua ficha cadastral, entre em contato com o suporte.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                toast.success("Solicitação enviada!");
                setIsDialogOpen(false);
              }}
            >
              Solicitar Atualização
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}