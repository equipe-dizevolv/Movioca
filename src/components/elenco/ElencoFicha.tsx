/**
 * MOVIOCA - Ficha Cadastral do Elenco
 * 
 * Formulário completo com campos específicos para elenco/equipe técnica:
 * - Dados pessoais + Nome Artístico
 * - DRT, OMB, sindicatos
 * - Medidas (altura, camisa, calça, sapato)
 * - Dados sensíveis (alergias, restrições alimentares) - LGPD
 * - Agenciamento (se houver)
 * - Contatos de emergência
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import { Save, User, Ruler, AlertTriangle, Briefcase, Phone, Shield } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ElencoFichaProps {
  elencoData: any;
  onUpdate: (data: any) => void;
}

export default function ElencoFicha({ elencoData, onUpdate }: ElencoFichaProps) {
  // Dados Pessoais
  const [nomeCivil, setNomeCivil] = useState(elencoData?.nome || "");
  const [nomeArtistico, setNomeArtistico] = useState(elencoData?.nomeArtistico || "");
  const [cpf, setCpf] = useState(elencoData?.cpf || "");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState(elencoData?.email || "");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");

  // Dados Profissionais
  const [drt, setDrt] = useState(elencoData?.drt || "");
  const [omb, setOmb] = useState("");
  const [sindicato, setSindicato] = useState("");

  // Medidas
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [manequim, setManequim] = useState("");
  const [camisa, setCamisa] = useState("");
  const [calca, setCalca] = useState("");
  const [sapato, setSapato] = useState("");
  const [corOlhos, setCorOlhos] = useState("");
  const [corCabelos, setCorCabelos] = useState("");

  // Dados Sensíveis (LGPD)
  const [aceitaLGPD, setAceitaLGPD] = useState(false);
  const [alergias, setAlergias] = useState("");
  const [restricoesAlimentares, setRestricoesAlimentares] = useState("");
  const [medicamentos, setMedicamentos] = useState("");
  const [deficiencias, setDeficiencias] = useState("");

  // Agenciamento
  const [temAgente, setTemAgente] = useState(false);
  const [nomeAgente, setNomeAgente] = useState("");
  const [emailAgente, setEmailAgente] = useState("");
  const [telefoneAgente, setTelefoneAgente] = useState("");
  const [percentualAgente, setPercentualAgente] = useState("");

  // Contato de Emergência
  const [nomeEmergencia, setNomeEmergencia] = useState("");
  const [telefoneEmergencia, setTelefoneEmergencia] = useState("");
  const [parentescoEmergencia, setParentescoEmergencia] = useState("");

  const handleSalvar = () => {
    if (!aceitaLGPD && (alergias || restricoesAlimentares || medicamentos || deficiencias)) {
      toast.error("Aceite o termo LGPD para salvar dados sensíveis");
      return;
    }

    const dadosAtualizados = {
      ...elencoData,
      nome: nomeCivil,
      nomeArtistico,
      drt,
      altura,
      // ... outros campos
    };

    onUpdate(dadosAtualizados);
    toast.success("Ficha atualizada com sucesso!");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Minha Ficha Cadastral</h2>
        <p className="text-muted-foreground mt-1">
          Mantenha seus dados atualizados para facilitar a produção
        </p>
      </div>

      {/* SEÇÃO 1: Dados Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Dados Pessoais
          </CardTitle>
          <CardDescription>Informações básicas e identificação</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome Civil Completo <span className="text-destructive">*</span></Label>
              <Input
                value={nomeCivil}
                onChange={(e) => setNomeCivil(e.target.value)}
                placeholder="Conforme RG"
              />
            </div>
            <div>
              <Label>Nome Artístico <span className="text-muted-foreground">(opcional)</span></Label>
              <Input
                value={nomeArtistico}
                onChange={(e) => setNomeArtistico(e.target.value)}
                placeholder="Como quer ser creditado(a)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>CPF <span className="text-destructive">*</span></Label>
              <Input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                disabled
              />
            </div>
            <div>
              <Label>RG</Label>
              <Input
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                placeholder="00.000.000-0"
              />
            </div>
            <div>
              <Label>Data de Nascimento</Label>
              <Input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>E-mail <span className="text-destructive">*</span></Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <Label>Telefone Fixo</Label>
              <Input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(11) 3333-4444"
              />
            </div>
            <div>
              <Label>Celular <span className="text-destructive">*</span></Label>
              <Input
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="(11) 98888-9999"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEÇÃO 2: Dados Profissionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Dados Profissionais
          </CardTitle>
          <CardDescription>Registros e filiações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>DRT (Registro Profissional)</Label>
              <Input
                value={drt}
                onChange={(e) => setDrt(e.target.value)}
                placeholder="Ex: DRT 12345/SP"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Delegacia Regional do Trabalho
              </p>
            </div>
            <div>
              <Label>OMB (Se Músico)</Label>
              <Input
                value={omb}
                onChange={(e) => setOmb(e.target.value)}
                placeholder="Ex: OMB 54321"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ordem dos Músicos do Brasil
              </p>
            </div>
            <div>
              <Label>Sindicato</Label>
              <Select value={sindicato} onValueChange={setSindicato}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sated-sp">SATED-SP</SelectItem>
                  <SelectItem value="sated-rj">SATED-RJ</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                  <SelectItem value="nao-filiado">Não filiado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEÇÃO 3: Medidas (Figurino) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            Medidas (Para Figurino)
          </CardTitle>
          <CardDescription>Importante para confecção de roupas e caracterização</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>Altura (cm)</Label>
              <Input
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Ex: 175"
              />
            </div>
            <div>
              <Label>Peso (kg)</Label>
              <Input
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ex: 70"
              />
            </div>
            <div>
              <Label>Manequim</Label>
              <Input
                value={manequim}
                onChange={(e) => setManequim(e.target.value)}
                placeholder="Ex: 42"
              />
            </div>
            <div>
              <Label>Camisa</Label>
              <Select value={camisa} onValueChange={setCamisa}>
                <SelectTrigger>
                  <SelectValue placeholder="Tam." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PP">PP</SelectItem>
                  <SelectItem value="P">P</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="GG">GG</SelectItem>
                  <SelectItem value="XGG">XGG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>Calça (Cintura)</Label>
              <Input
                value={calca}
                onChange={(e) => setCalca(e.target.value)}
                placeholder="Ex: 40"
              />
            </div>
            <div>
              <Label>Sapato</Label>
              <Input
                value={sapato}
                onChange={(e) => setSapato(e.target.value)}
                placeholder="Ex: 38"
              />
            </div>
            <div>
              <Label>Cor dos Olhos</Label>
              <Select value={corOlhos} onValueChange={setCorOlhos}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="castanhos">Castanhos</SelectItem>
                  <SelectItem value="verdes">Verdes</SelectItem>
                  <SelectItem value="azuis">Azuis</SelectItem>
                  <SelectItem value="pretos">Pretos</SelectItem>
                  <SelectItem value="mel">Mel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cor dos Cabelos</Label>
              <Select value={corCabelos} onValueChange={setCorCabelos}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preto">Preto</SelectItem>
                  <SelectItem value="castanho">Castanho</SelectItem>
                  <SelectItem value="loiro">Loiro</SelectItem>
                  <SelectItem value="ruivo">Ruivo</SelectItem>
                  <SelectItem value="grisalho">Grisalho</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEÇÃO 4: Dados Sensíveis (LGPD) */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            Dados Sensíveis (LGPD)
          </CardTitle>
          <CardDescription>
            Informações de saúde - Acesso restrito à produção e equipe médica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/10">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>Importante:</strong> Estas informações são confidenciais e serão usadas apenas
              para sua segurança durante as filmagens (alergias a produtos de maquiagem, restrições
              alimentares, etc.). Você pode atualizar ou excluir a qualquer momento.
            </AlertDescription>
          </Alert>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-semibold">Autorizar uso de dados sensíveis</p>
              <p className="text-sm text-muted-foreground">
                Concordo com o armazenamento de informações de saúde (Lei 13.709/2018 - LGPD)
              </p>
            </div>
            <Switch checked={aceitaLGPD} onCheckedChange={setAceitaLGPD} />
          </div>

          {aceitaLGPD && (
            <div className="space-y-4 pl-4 border-l-2 border-primary">
              <div>
                <Label>Alergias</Label>
                <Textarea
                  value={alergias}
                  onChange={(e) => setAlergias(e.target.value)}
                  placeholder="Ex: Látex, poeira, pólen, crustáceos..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Restrições Alimentares</Label>
                <Textarea
                  value={restricoesAlimentares}
                  onChange={(e) => setRestricoesAlimentares(e.target.value)}
                  placeholder="Ex: Vegetariano, intolerância à lactose, celíaco..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Medicamentos de Uso Contínuo</Label>
                <Textarea
                  value={medicamentos}
                  onChange={(e) => setMedicamentos(e.target.value)}
                  placeholder="Ex: Anti-hipertensivo, insulina..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Deficiências ou Necessidades Especiais</Label>
                <Textarea
                  value={deficiencias}
                  onChange={(e) => setDeficiencias(e.target.value)}
                  placeholder="Ex: Mobilidade reduzida, deficiência auditiva..."
                  rows={2}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEÇÃO 5: Agenciamento */}
      <Card>
        <CardHeader>
          <CardTitle>Agenciamento</CardTitle>
          <CardDescription>Se você possui agente/empresário</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Possui agente ou empresário?</Label>
            <Switch checked={temAgente} onCheckedChange={setTemAgente} />
          </div>

          {temAgente && (
            <div className="space-y-4 pl-4 border-l-2 border-primary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome do Agente/Empresário</Label>
                  <Input
                    value={nomeAgente}
                    onChange={(e) => setNomeAgente(e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label>Percentual de Comissão (%)</Label>
                  <Input
                    type="number"
                    value={percentualAgente}
                    onChange={(e) => setPercentualAgente(e.target.value)}
                    placeholder="Ex: 10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>E-mail do Agente</Label>
                  <Input
                    type="email"
                    value={emailAgente}
                    onChange={(e) => setEmailAgente(e.target.value)}
                    placeholder="agente@email.com"
                  />
                </div>
                <div>
                  <Label>Telefone do Agente</Label>
                  <Input
                    value={telefoneAgente}
                    onChange={(e) => setTelefoneAgente(e.target.value)}
                    placeholder="(11) 98888-7777"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEÇÃO 6: Contato de Emergência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contato de Emergência
          </CardTitle>
          <CardDescription>Para casos de urgência durante as filmagens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Nome Completo <span className="text-destructive">*</span></Label>
              <Input
                value={nomeEmergencia}
                onChange={(e) => setNomeEmergencia(e.target.value)}
                placeholder="Nome do contato"
              />
            </div>
            <div>
              <Label>Telefone <span className="text-destructive">*</span></Label>
              <Input
                value={telefoneEmergencia}
                onChange={(e) => setTelefoneEmergencia(e.target.value)}
                placeholder="(11) 98888-6666"
              />
            </div>
            <div>
              <Label>Parentesco</Label>
              <Select value={parentescoEmergencia} onValueChange={setParentescoEmergencia}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mae">Mãe</SelectItem>
                  <SelectItem value="pai">Pai</SelectItem>
                  <SelectItem value="conjuge">Cônjuge</SelectItem>
                  <SelectItem value="irmao">Irmão/Irmã</SelectItem>
                  <SelectItem value="filho">Filho/Filha</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-primary hover:bg-primary/90" onClick={handleSalvar}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
