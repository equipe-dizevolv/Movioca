/**
 * MOVIOCA - Configurações do Elenco
 * 
 * Tela de configurações:
 * - Trocar senha
 * - Notificações
 * - Privacidade (LGPD)
 * - Dados bancários
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { Lock, Bell, Shield, CreditCard, AlertCircle, Save, Download, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ElencoConfiguracoesProps {
  elencoData: any;
}

export default function ElencoConfiguracoes({ elencoData }: ElencoConfiguracoesProps) {
  // Senha
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Notificações
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [notifPagamento, setNotifPagamento] = useState(true);
  const [notifDocumento, setNotifDocumento] = useState(true);

  // Dados Bancários
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [tipoConta, setTipoConta] = useState("");
  const [pix, setPix] = useState("");

  // Modais de confirmação
  const [showDeleteSensitiveData, setShowDeleteSensitiveData] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showExportData, setShowExportData] = useState(false);

  const handleTrocarSenha = () => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (novaSenha.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres");
      return;
    }

    toast.success("Senha alterada com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
  };

  const handleSalvarDadosBancarios = () => {
    if (!banco || !agencia || !conta || !tipoConta) {
      toast.error("Preencha todos os campos bancários");
      return;
    }

    toast.success("Dados bancários atualizados!");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Configurações</h2>
        <p className="text-muted-foreground mt-1">
          Gerencie sua conta e preferências
        </p>
      </div>

      {/* SEÇÃO 1: Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Segurança
          </CardTitle>
          <CardDescription>Altere sua senha de acesso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Senha Atual</Label>
            <Input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label>Nova Senha</Label>
            <Input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <div>
            <Label>Confirmar Nova Senha</Label>
            <Input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite novamente"
            />
          </div>

          <Button onClick={handleTrocarSenha} className="bg-primary hover:bg-primary/90">
            <Lock className="w-4 h-4 mr-2" />
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      {/* SEÇÃO 2: Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificações
          </CardTitle>
          <CardDescription>Escolha como deseja ser notificado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">E-mail</p>
              <p className="text-sm text-muted-foreground">
                Receber notificações por e-mail
              </p>
            </div>
            <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS</p>
              <p className="text-sm text-muted-foreground">
                Receber notificações por mensagem de texto
              </p>
            </div>
            <Switch checked={notifSMS} onCheckedChange={setNotifSMS} />
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="font-semibold mb-3">Tipos de Notificação</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm">Confirmação de pagamentos</p>
                <Switch
                  checked={notifPagamento}
                  onCheckedChange={setNotifPagamento}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm">Solicitações de documentos</p>
                <Switch
                  checked={notifDocumento}
                  onCheckedChange={setNotifDocumento}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEÇÃO 3: Privacidade (LGPD) */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            Privacidade e Dados (LGPD)
          </CardTitle>
          <CardDescription>Gerencie suas permissões de dados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/10">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              Seus dados são protegidos pela Lei Geral de Proteção de Dados (LGPD - Lei
              13.709/2018). Você pode solicitar a exclusão dos seus dados a qualquer momento.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => setShowExportData(true)}>
              Baixar meus dados (exportar)
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setShowDeleteSensitiveData(true)}>
              Solicitar exclusão de dados sensíveis
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive" onClick={() => setShowDeleteAccount(true)}>
              Excluir minha conta permanentemente
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Para solicitar exclusão completa, entre em contato com{" "}
            <a href="mailto:lgpd@movioca.com" className="text-primary underline">
              lgpd@movioca.com
            </a>
          </p>
        </CardContent>
      </Card>

      {/* SEÇÃO 4: Dados Bancários */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Dados Bancários
          </CardTitle>
          <CardDescription>
            Para recebimento de cachês e pagamentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Banco</Label>
              <Select value={banco} onValueChange={setBanco}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="001">001 - Banco do Brasil</SelectItem>
                  <SelectItem value="104">104 - Caixa Econômica</SelectItem>
                  <SelectItem value="237">237 - Bradesco</SelectItem>
                  <SelectItem value="341">341 - Itaú</SelectItem>
                  <SelectItem value="033">033 - Santander</SelectItem>
                  <SelectItem value="212">212 - Banco Original</SelectItem>
                  <SelectItem value="260">260 - Nubank</SelectItem>
                  <SelectItem value="077">077 - Inter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Agência</Label>
              <Input
                value={agencia}
                onChange={(e) => setAgencia(e.target.value)}
                placeholder="0000"
              />
            </div>

            <div>
              <Label>Tipo de Conta</Label>
              <Select value={tipoConta} onValueChange={setTipoConta}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corrente">Conta Corrente</SelectItem>
                  <SelectItem value="poupanca">Conta Poupança</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Número da Conta</Label>
              <Input
                value={conta}
                onChange={(e) => setConta(e.target.value)}
                placeholder="00000-0"
              />
            </div>

            <div>
              <Label>Chave PIX (Opcional)</Label>
              <Input
                value={pix}
                onChange={(e) => setPix(e.target.value)}
                placeholder="CPF, e-mail ou telefone"
              />
            </div>
          </div>

          <Button
            onClick={handleSalvarDadosBancarios}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Dados Bancários
          </Button>
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>CPF:</strong> {elencoData?.cpf}
            </p>
            <p>
              <strong>E-mail:</strong> {elencoData?.email}
            </p>
            <p>
              <strong>Conta criada em:</strong> 01/12/2024
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modal de exclusão de dados sensíveis */}
      <Dialog open={showDeleteSensitiveData} onOpenChange={setShowDeleteSensitiveData}>
        <DialogContent aria-describedby="dialog-delete-sensitive-description">
          <DialogHeader>
            <DialogTitle>Excluir Dados Sensíveis</DialogTitle>
            <DialogDescription id="dialog-delete-sensitive-description">
              Você tem certeza de que deseja excluir seus dados sensíveis?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteSensitiveData(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                // Lógica para excluir dados sensíveis
                toast.success("Dados sensíveis excluídos com sucesso!");
                setShowDeleteSensitiveData(false);
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de exclusão de conta */}
      <Dialog open={showDeleteAccount} onOpenChange={setShowDeleteAccount}>
        <DialogContent aria-describedby="dialog-delete-account-description">
          <DialogHeader>
            <DialogTitle>Excluir Conta</DialogTitle>
            <DialogDescription id="dialog-delete-account-description">
              Você tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteAccount(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                // Lógica para excluir conta
                toast.success("Conta excluída com sucesso!");
                setShowDeleteAccount(false);
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de exportação de dados */}
      <Dialog open={showExportData} onOpenChange={setShowExportData}>
        <DialogContent aria-describedby="dialog-export-data-description">
          <DialogHeader>
            <DialogTitle>Baixar Dados</DialogTitle>
            <DialogDescription id="dialog-export-data-description">
              Você tem certeza de que deseja baixar seus dados? Esta ação irá gerar um arquivo com todas as suas informações.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowExportData(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                // Lógica para exportar dados
                toast.success("Dados exportados com sucesso!");
                setShowExportData(false);
              }}
            >
              Baixar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}