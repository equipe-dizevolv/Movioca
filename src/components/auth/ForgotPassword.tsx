"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Moon, Sun } from "lucide-react";
import { toast } from "sonner";

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export default function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular envio de e-mail
    setTimeout(() => {
      const result = resetPassword(email);
      
      if (result) {
        setSuccess(true);
        toast.success("E-mail de recuperação enviado!");
      } else {
        setError("E-mail inválido. Por favor, verifique e tente novamente.");
        toast.error("E-mail inválido");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  if (success) {
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

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Dark Mode Toggle - Canto superior direito */}
          <div className="fixed top-6 right-6 z-50">
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

          <Card className="w-full shadow-2xl backdrop-blur-sm dark:bg-background/95">
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-2">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">E-mail Enviado!</CardTitle>
              <CardDescription className="text-base">
                Instruções de recuperação de senha foram enviadas para seu e-mail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  <strong>Próximos passos:</strong>
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-400 mt-2 space-y-1 list-disc list-inside">
                  <li>Verifique sua caixa de entrada em <strong>{email}</strong></li>
                  <li>Clique no link de recuperação (válido por 24h)</li>
                  <li>Crie uma nova senha segura</li>
                </ul>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Não recebeu o e-mail? Verifique sua pasta de spam ou tente novamente em alguns minutos.
              </p>

              <Button 
                onClick={onBackToLogin}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Dark Mode Toggle - Canto superior direito */}
        <div className="fixed top-6 right-6 z-50">
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

        <Card className="w-full shadow-2xl backdrop-blur-sm dark:bg-background/95">
          <CardHeader className="space-y-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToLogin}
              className="w-fit -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
              <Mail className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Esqueci a Senha</CardTitle>
            <CardDescription className="text-base text-center">
              Digite seu e-mail para receber instruções de recuperação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  Enviaremos um link de recuperação para este endereço
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </div>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Link de Recuperação
                  </>
                )}
              </Button>

              <div className="pt-4 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  Lembrou sua senha?{" "}
                  <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-primary hover:underline"
                  >
                    Faça login
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}