// ============================================
// TIPOS E INTERFACES - PORTAL DO FORNECEDOR
// ============================================

// Status dos Pagamentos
export type StatusPagamento = 
  | "aguardando_nf" 
  | "em_analise" 
  | "agendado" 
  | "pago" 
  | "correcao_solicitada";

// Status dos Contratos
export type StatusContrato = 
  | "ativo" 
  | "encerrado" 
  | "pendente_assinatura";

// Interface: Dados Cadastrais PJ
export interface DadosCadastraisPJ {
  // Dados Básicos
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  inscricaoMunicipal?: string;
  inscricaoEstadual?: string;
  
  // Endereço
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  
  // Dados Bancários
  banco: string;
  agencia: string;
  conta: string;
  chavePix?: string;
  
  // Documentos
  cartaoCnpjUrl?: string;
  comprovanteBancarioUrl?: string;
  
  // Metadata
  cadastroCompleto: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

// Interface: Pagamento/Parcela
export interface Pagamento {
  id: string;
  projeto: string;
  referencia: string; // ex: "Parcela 1/3"
  dataPrevista: Date;
  valorBruto: number;
  status: StatusPagamento;
  
  // Nota Fiscal
  numeroNota?: string;
  dataEmissaoNota?: Date;
  valorNota?: number;
  notaFiscalUrl?: string;
  
  // Comprovante (quando pago)
  comprovanteUrl?: string;
  dataPagamento?: Date;
  
  // Correção/Recusa
  motivoRecusa?: string;
  
  // Metadata
  codigoProjeto?: string; // Para incluir na NF
}

// Interface: Contrato
export interface Contrato {
  id: string;
  nomeContrato: string;
  projeto: string;
  dataAssinatura?: Date;
  dataInicio: Date;
  dataFim: Date;
  status: StatusContrato;
  contratoUrl?: string;
  valorTotal: number;
  observacoes?: string;
}

// Interface: Notificação
export interface Notificacao {
  id: string;
  tipo: "pagamento" | "nota_fiscal" | "contrato" | "alerta";
  titulo: string;
  mensagem: string;
  data: Date;
  lida: boolean;
  link?: string;
}

// Interface: Resumo Dashboard
export interface ResumoDashboard {
  proximaDataPagamento: Date | null;
  quantidadePagamentos: number;
  valorTotal: number;
  valorAReceber: number;
  valorPago: number;
  alertas: {
    pagamentosAtrasados: number;
  };
}

// Helpers de formatação
export const formatarCNPJ = (cnpj: string): string => {
  const numbers = cnpj.replace(/\D/g, '');
  return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

export const formatarCEP = (cep: string): string => {
  const numbers = cep.replace(/\D/g, '');
  return numbers.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

export const formatarMoeda = (valor: number): string => {
  try {
    return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } catch {
    // Fallback simples caso toLocaleString não funcione
    const valorFormatado = valor.toFixed(2).replace('.', ',');
    return `R$ ${valorFormatado.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }
};

export const formatarData = (data: Date): string => {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

// Helpers de Status
export const getStatusPagamentoLabel = (status: StatusPagamento): string => {
  const labels: Record<StatusPagamento, string> = {
    aguardando_nf: "Aguardando NF",
    em_analise: "Em Análise",
    agendado: "Agendado",
    pago: "Pago",
    correcao_solicitada: "Correção Solicitada",
  };
  return labels[status];
};

export const getStatusPagamentoColor = (status: StatusPagamento): string => {
  const colors: Record<StatusPagamento, string> = {
    aguardando_nf: "warning",
    em_analise: "default",
    agendado: "success",
    pago: "success",
    correcao_solicitada: "destructive",
  };
  return colors[status];
};

export const getStatusContratoLabel = (status: StatusContrato): string => {
  const labels: Record<StatusContrato, string> = {
    ativo: "Ativo",
    encerrado: "Encerrado",
    pendente_assinatura: "Pendente Assinatura",
  };
  return labels[status];
};

export const getStatusContratoColor = (status: StatusContrato): string => {
  const colors: Record<StatusContrato, string> = {
    ativo: "success",
    encerrado: "secondary",
    pendente_assinatura: "warning",
  };
  return colors[status];
};