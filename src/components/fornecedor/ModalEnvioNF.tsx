/**
 * MOVIOCA - Modal de Envio de Nota Fiscal
 * 
 * PRD 008 - Seção 3.4: Upload de Faturamento
 * 
 * Modal para upload de Nota Fiscal vinculada a uma parcela específica.
 * Exibe dados da Movioca (tomador) para orientar a emissão da nota.
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ModalEnvioNFProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parcela: {
    projeto: string;
    referencia: string;
    valor: number;
    dataVencimento: string;
  };
  onEnviar: (dados: {
    numeroNota: string;
    dataEmissao: string;
    valorNota: number;
    arquivo: File;
  }) => void;
}

export default function ModalEnvioNF({
  open,
  onOpenChange,
  parcela,
  onEnviar,
}: ModalEnvioNFProps) {
  const [numeroNota, setNumeroNota] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [valorNota, setValorNota] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dados da Movioca (Tomador) - Em produção, virão da API
  const dadosTomador = {
    razaoSocial: "Movioca Produções Audiovisuais Ltda",
    cnpj: "12.345.678/0001-99",
    endereco: "Rua das Produções, 123 - São Paulo/SP",
    codigoProjeto: "PROJ-2025-001",
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validar tipo de arquivo
    const tiposPermitidos = ["application/pdf", "text/xml", "application/xml"];
    if (!tiposPermitidos.includes(file.type) && !file.name.endsWith(".xml")) {
      toast.error("Apenas arquivos PDF ou XML são permitidos");
      return;
    }

    // Validar tamanho (máx 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("O arquivo deve ter no máximo 10MB");
      return;
    }

    setArquivo(file);
    toast.success("Arquivo anexado com sucesso");
  };

  const handleEnviar = () => {
    // Validações
    if (!numeroNota) {
      toast.error("Informe o número da nota fiscal");
      return;
    }

    if (!dataEmissao) {
      toast.error("Informe a data de emissão");
      return;
    }

    if (!valorNota) {
      toast.error("Informe o valor da nota fiscal");
      return;
    }

    const valorNumerico = parseFloat(valorNota.replace(/\D/g, "")) / 100;
    
    if (valorNumerico <= 0) {
      toast.error("O valor da nota deve ser maior que zero");
      return;
    }

    if (!arquivo) {
      toast.error("Anexe o arquivo da nota fiscal (PDF ou XML)");
      return;
    }

    setIsLoading(true);

    // Simular envio
    setTimeout(() => {
      onEnviar({
        numeroNota,
        dataEmissao,
        valorNota: valorNumerico,
        arquivo,
      });

      toast.success("Nota fiscal enviada com sucesso. Aguarde a análise.");
      
      // Reset do formulário
      setNumeroNota("");
      setDataEmissao("");
      setValorNota("");
      setArquivo(null);
      setIsLoading(false);
      onOpenChange(false);
    }, 1500);
  };

  const formatarMoeda = (valor: string) => {
    const numeros = valor.replace(/\D/g, "");
    const valorNumerico = parseFloat(numeros) / 100;
    
    return valorNumerico.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleValorChange = (valor: string) => {
    setValorNota(formatarMoeda(valor));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Envio de Nota Fiscal</DialogTitle>
          <DialogDescription>
            Preencha os dados e anexe a nota fiscal para esta parcela
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Resumo do Pedido */}
          <div className="bg-muted/50 border rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm">Resumo da Parcela</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Projeto:</p>
                <p className="font-medium">{parcela.projeto}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Referência:</p>
                <p className="font-medium">{parcela.referencia}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Valor Programado:</p>
                <p className="font-medium">
                  R$ {parcela.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Vencimento:</p>
                <p className="font-medium">{parcela.dataVencimento}</p>
              </div>
            </div>
          </div>

          {/* Dados para Emissão (Orientação) */}
          <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-2">
                  Dados do Tomador (Emitir nota para):
                </h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[120px]">Razão Social:</span>
                    <span className="font-medium">{dadosTomador.razaoSocial}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[120px]">CNPJ:</span>
                    <span className="font-medium">{dadosTomador.cnpj}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[120px]">Endereço:</span>
                    <span className="font-medium">{dadosTomador.endereco}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[120px]">Cód. Projeto:</span>
                    <span className="font-medium">{dadosTomador.codigoProjeto}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  💡 Inclua o código do projeto na descrição da nota para facilitar a identificação.
                </p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numeroNota">
                  Número da Nota <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="numeroNota"
                  placeholder="Ex: 12345"
                  value={numeroNota}
                  onChange={(e) => setNumeroNota(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dataEmissao">
                  Data de Emissão <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dataEmissao"
                  type="date"
                  value={dataEmissao}
                  onChange={(e) => setDataEmissao(e.target.value)}
                />
              </div>
            </div>

            <div className="max-w-xs">
              <Label htmlFor="valorNota">
                Valor da Nota <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  R$
                </span>
                <Input
                  id="valorNota"
                  placeholder="0,00"
                  value={valorNota}
                  onChange={(e) => handleValorChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Pode variar do valor programado devido a impostos
              </p>
            </div>

            {/* Upload */}
            <div>
              <Label>
                Arquivo da Nota Fiscal <span className="text-destructive">*</span>
              </Label>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Formatos aceitos: PDF ou XML | Tamanho máximo: 10MB
              </p>
              <div>
                <input
                  type="file"
                  id="upload-nf"
                  accept=".pdf,.xml"
                  className="hidden"
                  onChange={handleUpload}
                />
                {!arquivo ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-20 border-dashed"
                    onClick={() => document.getElementById("upload-nf")?.click()}
                  >
                    <Upload className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium">Clique para fazer upload</p>
                      <p className="text-xs text-muted-foreground">
                        ou arraste o arquivo aqui
                      </p>
                    </div>
                  </Button>
                ) : (
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{arquivo.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(arquivo.size / 1024).toFixed(0)} KB •{" "}
                          {arquivo.type.includes("pdf") ? "PDF" : "XML"}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setArquivo(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEnviar}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Enviando..." : "Enviar para Análise"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
