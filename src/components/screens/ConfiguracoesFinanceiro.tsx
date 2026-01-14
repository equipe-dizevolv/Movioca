/**
 * MOVIOCA - Configurações Financeiro
 * 
 * Tela de configurações para o perfil Financeiro.
 * 
 * Diferenças em relação à visão Admin:
 * - Remove aba "Permissões" (exclusivo Admin)
 * - Mantém: Meu Perfil, Preferências e Notificações
 * - Parâmetros são apenas de preferências pessoais (não afetam sistema global)
 * 
 * PRD 004 - Configurações do Perfil Financeiro
 */

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Camera, User } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";

export default function ConfiguracoesFinanceiro() {
  const { currentUser } = useAuth();

  // Dados do Perfil
  const [nome, setNome] = useState(currentUser?.name || "Carla Mendes");
  const [email, setEmail] = useState("carla.mendes@movioca.com");
  const [telefone, setTelefone] = useState("(11) 99876-5432");
  const [cargo, setCargo] = useState("Financeiro");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

  // Parâmetros Pessoais
  const [moeda, setMoeda] = useState("BRL");
  const [formatoData, setFormatoData] = useState("dd/MM/yyyy");
  const [casasDecimais, setCasasDecimais] = useState("2");

  // Notificações específicas do Financeiro
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [alertaPagamentosLiberados, setAlertaPagamentosLiberados] = useState(true);
  const [alertaCargasPendentes, setAlertaCargasPendentes] = useState(true);
  const [alertaReembolsosPendentes, setAlertaReembolsosPendentes] = useState(true);
  const [alertaIntegracaoOmie, setAlertaIntegracaoOmie] = useState(true);
  const [alertaVencimentosProximos, setAlertaVencimentosProximos] = useState(true);
  const [resumoDiario, setResumoDiario] = useState(true);

  const handleSalvarParametros = () => {
    toast.success("Preferências salvas com sucesso");
  };

  const handleSalvarNotificacoes = () => {
    toast.success("Configurações de notificações salvas");
  };

  const handleSalvarPerfil = () => {
    if (!nome || !email) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleAlterarSenha = () => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      toast.error("Preencha todos os campos de senha");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }
    if (novaSenha.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    toast.success("Senha alterada com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
  };

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string);
        toast.success("Foto de perfil atualizada!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl text-foreground">Minhas Configurações</h2>
        <p className="text-muted-foreground mt-1">
          Gerencie suas preferências pessoais e notificações financeiras
        </p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
          <TabsTrigger value="parametros">Preferências</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Foto de perfil */}
                <div className="flex items-center gap-6 pb-6 border-b">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      {fotoPerfil ? (
                        <AvatarImage src={fotoPerfil} alt={nome} />
                      ) : (
                        <AvatarFallback className="bg-green-100 text-green-700 text-2xl">
                          <User className="w-12 h-12" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <input
                        type="file"
                        id="foto-perfil"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadFoto}
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full h-8 w-8"
                        onClick={() =>
                          document.getElementById("foto-perfil")?.click()
                        }
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{nome}</h3>
                    <p className="text-sm text-muted-foreground">{cargo}</p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                </div>

                {/* Dados pessoais */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Dados pessoais</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>
                        Nome completo{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Telefone</Label>
                      <Input
                        placeholder="(00) 00000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Cargo</Label>
                      <Input value={cargo} disabled className="bg-muted" />
                    </div>
                  </div>

                  <Button onClick={handleSalvarPerfil} className="bg-primary">
                    Salvar Alterações
                  </Button>
                </div>

                {/* Alterar senha */}
                <div className="space-y-4 pt-6 border-t">
                  <h4 className="font-semibold">Alterar senha</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Senha atual</Label>
                      <Input
                        type="password"
                        placeholder="Digite sua senha atual"
                        value={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Nova senha</Label>
                      <Input
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Confirmar nova senha</Label>
                      <Input
                        type="password"
                        placeholder="Digite novamente"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAlterarSenha} variant="outline">
                      Alterar Senha
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferências */}
        <TabsContent value="parametros" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Preferências de exibição financeira</h4>
                  <div className="space-y-4">
                    <div>
                      <Label>Moeda</Label>
                      <Select value={moeda} onValueChange={setMoeda}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BRL">Real (R$)</SelectItem>
                          <SelectItem value="USD">Dólar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Formato de data</Label>
                      <Select value={formatoData} onValueChange={setFormatoData}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/MM/yyyy">DD/MM/AAAA</SelectItem>
                          <SelectItem value="MM/dd/yyyy">MM/DD/AAAA</SelectItem>
                          <SelectItem value="yyyy-MM-dd">AAAA-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Casas decimais em valores</Label>
                      <Select
                        value={casasDecimais}
                        onValueChange={setCasasDecimais}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 (ex: R$ 1.500)</SelectItem>
                          <SelectItem value="2">2 (ex: R$ 1.500,00)</SelectItem>
                          <SelectItem value="3">3 (ex: R$ 1.500,000)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSalvarParametros} className="bg-primary">
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Canais de notificação</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificações por e-mail</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba alertas importantes no seu e-mail
                        </p>
                      </div>
                      <Switch
                        checked={notifEmail}
                        onCheckedChange={setNotifEmail}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificações push no navegador</Label>
                        <p className="text-sm text-muted-foreground">
                          Alertas em tempo real enquanto usa o sistema
                        </p>
                      </div>
                      <Switch
                        checked={notifPush}
                        onCheckedChange={setNotifPush}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-4">Alertas específicos do Financeiro</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Pagamentos liberados pela Controladoria</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar quando novos pagamentos forem aprovados
                        </p>
                      </div>
                      <Switch
                        checked={alertaPagamentosLiberados}
                        onCheckedChange={setAlertaPagamentosLiberados}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Cargas de verba pendentes</Label>
                        <p className="text-sm text-muted-foreground">
                          Alertar sobre solicitações de carga aprovadas aguardando transferência (História 4)
                        </p>
                      </div>
                      <Switch
                        checked={alertaCargasPendentes}
                        onCheckedChange={setAlertaCargasPendentes}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Reembolsos de verba pendentes</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar sobre lotes de prestação aprovados para reembolso (História 6)
                        </p>
                      </div>
                      <Switch
                        checked={alertaReembolsosPendentes}
                        onCheckedChange={setAlertaReembolsosPendentes}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Erros de integração OMIE</Label>
                        <p className="text-sm text-muted-foreground">
                          Alertar imediatamente sobre falhas no envio de dados ao ERP (História 3)
                        </p>
                      </div>
                      <Switch
                        checked={alertaIntegracaoOmie}
                        onCheckedChange={setAlertaIntegracaoOmie}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Vencimentos próximos (3 dias)</Label>
                        <p className="text-sm text-muted-foreground">
                          Alertar sobre pagamentos com vencimento em até 3 dias
                        </p>
                      </div>
                      <Switch
                        checked={alertaVencimentosProximos}
                        onCheckedChange={setAlertaVencimentosProximos}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Resumo diário de atividades</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba um resumo das execuções do dia às 18h
                        </p>
                      </div>
                      <Switch
                        checked={resumoDiario}
                        onCheckedChange={setResumoDiario}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSalvarNotificacoes} className="bg-primary">
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}