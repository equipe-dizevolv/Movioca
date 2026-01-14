/**
 * MOVIOCA - Onboarding do Elenco
 * 
 * Tela de login e primeiro acesso para elenco/equipe técnica (PF).
 * Permite acesso via:
 * - Convite por e-mail (token único)
 * - CPF + Senha (se já cadastrado)
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Film, Mail, Lock, User, AlertCircle, Moon, Sun } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ElencoOnboardingProps {
  onLogin: (data: any) => void;
  onBackToLogin?: () => void;
}

type AccessType = "interno" | "fornecedor" | "elenco";

export default function ElencoOnboarding({ onLogin, onBackToLogin }: ElencoOnboardingProps) {
  const [mode, setMode] = useState<"token" | "login">("token");
  const [token, setToken] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [accessType, setAccessType] = useState<AccessType>("elenco");

  // Quando o accessType mudar para outro que não seja "elenco", redireciona
  const handleAccessTypeChange = (value: AccessType) => {
    setAccessType(value);
    if (value !== "elenco" && onBackToLogin) {
      onBackToLogin();
    }
  };

  const handleTokenLogin = () => {
    if (!token) {
      toast.error("Insira o código de acesso recebido por e-mail");
      return;
    }

    setIsLoading(true);

    // Simula validação do token
    setTimeout(() => {
      // Código de acesso deve ser "1234"
      if (token === "1234") {
        const mockData = {
          id: "elenco-001",
          nome: "Maria Silva",
          nomeArtistico: "Maria da Luz",
          email: "maria.silva@email.com",
          cpf: "123.456.789-00",
          drt: "DRT 12345/SP",
        };
        
        toast.success("Bem-vindo(a) ao Portal do Elenco!");
        onLogin(mockData);
      } else {
        toast.error("Código de acesso inválido");
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleCPFLogin = () => {
    if (!cpf || !senha) {
      toast.error("Preencha CPF e senha");
      return;
    }

    setIsLoading(true);

    // Simula validação
    setTimeout(() => {
      const mockData = {
        id: "elenco-002",
        nome: "João Santos",
        nomeArtistico: "João Astro",
        email: "joao.santos@email.com",
        cpf: cpf,
        drt: "DRT 54321/RJ",
      };
      
      toast.success("Login realizado com sucesso!");
      onLogin(mockData);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Background with enhanced dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 dark:from-[#1a0b2e] dark:via-[#16213e] dark:to-[#0f3460]" />
      
      {/* Animated gradient orbs for dark mode */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-0 dark:opacity-5 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Top Right Controls */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        {/* Access Type Selector */}
        {onBackToLogin && (
          <Select value={accessType} onValueChange={handleAccessTypeChange}>
            <SelectTrigger className="w-[180px] bg-background/95 backdrop-blur-sm shadow-lg border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interno">Perfis Internos</SelectItem>
              <SelectItem value="fornecedor">Fornecedor</SelectItem>
              <SelectItem value="elenco">Elenco</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Dark Mode Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 rounded-full shadow-lg bg-background hover:bg-muted border-2"
          title={darkMode ? "Modo Claro" : "Modo Escuro"}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </Button>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <Film className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Portal do Elenco</h1>
          <p className="text-muted-foreground">Sistema MOVIOCA - Gestão Audiovisual</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Acesso ao Portal</CardTitle>
            <CardDescription>
              Entre com seu código de acesso ou CPF e senha
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Modo de acesso */}
            <div className="flex gap-2">
              <Button
                variant={mode === "token" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setMode("token")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Código de Acesso
              </Button>
              <Button
                variant={mode === "login" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setMode("login")}
              >
                <User className="w-4 h-4 mr-2" />
                CPF e Senha
              </Button>
            </div>

            {/* Acesso por Token */}
            {mode === "token" && (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Insira o código de 10 dígitos recebido por e-mail da produção
                  </AlertDescription>
                </Alert>

                {/* Código de teste visível */}
                <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-center font-semibold text-primary mb-1">
                    ✓ Código de teste para demonstração:
                  </p>
                  <p className="text-2xl text-center font-bold text-primary tracking-wider">
                    1234
                  </p>
                </div>
                
                <div>
                  <Label>Código de Acesso</Label>
                  <Input
                    placeholder="Ex: ABC123XYZ9"
                    value={token}
                    onChange={(e) => setToken(e.target.value.toUpperCase())}
                    className="text-center text-lg tracking-wider"
                    maxLength={10}
                  />
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleTokenLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Validando..." : "Acessar Portal"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Não recebeu o código? Entre em contato com a produção
                </p>
              </div>
            )}

            {/* Acesso por CPF/Senha */}
            {mode === "login" && (
              <div className="space-y-4">
                <div>
                  <Label>CPF</Label>
                  <Input
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Senha</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleCPFLogin}
                  disabled={isLoading}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                <button className="w-full text-sm text-primary hover:underline">
                  Esqueci minha senha
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info adicional */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">1</span>
                </div>
                <p className="text-muted-foreground">
                  Receba o convite da produção por e-mail
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">2</span>
                </div>
                <p className="text-muted-foreground">
                  Complete sua ficha cadastral (nome artístico, DRT, medidas)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">3</span>
                </div>
                <p className="text-muted-foreground">
                  Acompanhe seus cachês, contratos e documentos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          MOVIOCA © 2024 - Seus dados estão protegidos (LGPD)
        </p>
      </div>
    </div>
  );
}