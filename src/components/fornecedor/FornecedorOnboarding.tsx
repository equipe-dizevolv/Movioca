/**
 * MOVIOCA - Onboarding do Fornecedor
 * 
 * PRD 008 - Seção 3.1: Login e Onboarding (Primeiro Acesso)
 * 
 * Tela de ativação de conta via link de convite único.
 * O fornecedor recebe um link por e-mail, define sua senha e ativa a conta.
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface FornecedorOnboardingProps {
  projectName?: string;
  email?: string;
  token?: string;
  onComplete: () => void;
}

export default function FornecedorOnboarding({
  projectName = "Projeto Alpha",
  email = "contato@empresaabc.com",
  token = "valid-token-123",
  onComplete,
}: FornecedorOnboardingProps) {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValido, setTokenValido] = useState(true);

  // Validação de força da senha
  const validarForcaSenha = (senha: string) => {
    const checks = {
      minLength: senha.length >= 8,
      hasUpperCase: /[A-Z]/.test(senha),
      hasLowerCase: /[a-z]/.test(senha),
      hasNumber: /[0-9]/.test(senha),
    };

    return checks;
  };

  const forcaSenha = validarForcaSenha(senha);
  const senhaForte =
    forcaSenha.minLength &&
    forcaSenha.hasUpperCase &&
    forcaSenha.hasLowerCase &&
    forcaSenha.hasNumber;

  const handleAtivarConta = async () => {
    // Validações
    if (!senha || !confirmarSenha) {
      toast.error("Preencha todos os campos de senha");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (!senhaForte) {
      toast.error("A senha não atende aos requisitos mínimos de segurança");
      return;
    }

    setIsLoading(true);

    // Simular validação de token e criação de conta
    setTimeout(() => {
      // Verificar se o token é válido
      if (token !== "valid-token-123") {
        setTokenValido(false);
        toast.error("Link de convite inválido ou expirado");
        setIsLoading(false);
        return;
      }

      toast.success("Conta ativada com sucesso! Bem-vindo ao Portal Movioca.");
      setIsLoading(false);

      // Redirecionar para a tela principal após 1 segundo
      setTimeout(() => {
        onComplete();
      }, 1000);
    }, 1500);
  };

  // Estado de token inválido
  if (!tokenValido) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl">Link Inválido ou Expirado</h2>
              <CardDescription className="mt-2">
                Este link de convite não é mais válido ou já foi utilizado.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Entre em contato com a equipe de produção da Movioca para receber um novo convite.
            </p>
            <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="mx-auto">
            <div className="text-primary text-3xl">Movioca</div>
          </div>

          {/* Mensagem de Boas-vindas */}
          <div>
            <h2 className="text-2xl">Bem-vindo ao Portal Movioca</h2>
            <CardDescription className="mt-2">
              Você foi convidado para participar do projeto{" "}
              <span className="font-semibold text-foreground">{projectName}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informação do E-mail */}
          <div className="bg-muted/50 border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Seu login será:</p>
            <p className="font-semibold">{email}</p>
          </div>

          {/* Formulário de Senha */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="senha">
                Senha <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showSenha ? "text" : "password"}
                  placeholder="Crie uma senha forte"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmar">
                Confirmar Senha <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmar"
                  type={showConfirmar ? "text" : "password"}
                  placeholder="Digite a senha novamente"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmar(!showConfirmar)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Indicadores de Força da Senha */}
          {senha && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">A senha deve conter:</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      forcaSenha.minLength ? "text-green-600" : "text-muted-foreground"
                    }`}
                  />
                  <span className={forcaSenha.minLength ? "text-foreground" : "text-muted-foreground"}>
                    Pelo menos 8 caracteres
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      forcaSenha.hasUpperCase ? "text-green-600" : "text-muted-foreground"
                    }`}
                  />
                  <span className={forcaSenha.hasUpperCase ? "text-foreground" : "text-muted-foreground"}>
                    Uma letra maiúscula
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      forcaSenha.hasLowerCase ? "text-green-600" : "text-muted-foreground"
                    }`}
                  />
                  <span className={forcaSenha.hasLowerCase ? "text-foreground" : "text-muted-foreground"}>
                    Uma letra minúscula
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      forcaSenha.hasNumber ? "text-green-600" : "text-muted-foreground"
                    }`}
                  />
                  <span className={forcaSenha.hasNumber ? "text-foreground" : "text-muted-foreground"}>
                    Um número
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Match de Senhas */}
          {confirmarSenha && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2
                className={`w-4 h-4 ${
                  senha === confirmarSenha ? "text-green-600" : "text-destructive"
                }`}
              />
              <span className={senha === confirmarSenha ? "text-green-600" : "text-destructive"}>
                {senha === confirmarSenha ? "As senhas coincidem" : "As senhas não coincidem"}
              </span>
            </div>
          )}

          {/* Botão Ativar Conta */}
          <Button
            onClick={handleAtivarConta}
            disabled={isLoading || !senhaForte || senha !== confirmarSenha}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Ativando conta..." : "Ativar Conta"}
          </Button>

          {/* Nota de Segurança */}
          <p className="text-xs text-center text-muted-foreground">
            Ao ativar sua conta, você concorda com os termos de uso e política de privacidade da Movioca.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
