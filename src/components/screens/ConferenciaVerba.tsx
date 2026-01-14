import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
  FolderCheck,
  Upload,
  CheckCircle2,
  XCircle,
  Edit,
  FileText,
  AlertCircle,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

interface ConferenciaVerbaProps {
  onVoltar?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function ConferenciaVerba({ onVoltar, onNavigate }: ConferenciaVerbaProps) {
  const [lotes, setLotes] = useState([
    {
      id: 1,
      solicitante: "Produtor de Arte",
      qtdDespesas: 18,
      valorTotal: 2450.0,
      dataSolicitacao: "2025-12-05",
      status: "Aguardando Conferência CD",
      despesas: [
        { id: 1, descricao: "Tinta acrílica", valor: 150.0, io: "3.02.01 - Material de Consumo", glosado: false },
        { id: 2, descricao: "Tecido algodão", valor: 280.0, io: "3.02.01 - Material de Consumo", glosado: false },
        { id: 3, descricao: "Cola quente", valor: 45.0, io: "3.02.01 - Material de Consumo", glosado: false },
      ],
    },
    {
      id: 2,
      solicitante: "Diretor de Fotografia",
      qtdDespesas: 7,
      valorTotal: 890.0,
      dataSolicitacao: "2025-12-06",
      status: "Aguardando Conferência CD",
      despesas: [
        { id: 4, descricao: "Bateria extra", valor: 450.0, io: "4.01.02 - Câmeras", glosado: false },
        { id: 5, descricao: "Filtro ND", valor: 320.0, io: "4.01.02 - Câmeras", glosado: false },
        { id: 6, descricao: "Almoço da equipe", valor: 120.0, io: "4.01.02 - Câmeras", glosado: false },
      ],
    },
  ]);

  const handleAbrirConferencia = (lote: any) => {
    // Navega para a tela de Mesa de Conferência
    if (onNavigate) {
      onNavigate("Mesa de Conferência CD");
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Conferência de Verba</h2>
        <p className="text-muted-foreground mt-2">
          Confira os lotes de prestação de contas enviados pela equipe e valide a documentação
        </p>
      </div>

      {/* Lista de Lotes */}
      <div className="grid gap-4">
        {lotes.map((lote) => (
          <Card key={lote.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{lote.solicitante}</h3>
                    <Badge variant="secondary">{lote.status}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                    <div>
                      <span className="text-muted-foreground">Despesas:</span>
                      <p className="font-medium">{lote.qtdDespesas} itens</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Valor Total:</span>
                      <p className="font-medium">R$ {lote.valorTotal.toLocaleString("pt-BR")}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Data de Envio:</span>
                      <p className="font-medium">
                        {new Date(lote.dataSolicitacao).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleAbrirConferencia(lote)}>
                  <FolderCheck className="w-4 h-4 mr-2" />
                  Conferir Lote
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {lotes.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FolderCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum lote aguardando conferência no momento</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}