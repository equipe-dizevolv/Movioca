"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { LogIn, AlertCircle, Moon, Sun, UserPlus } from "lucide-react";
import { toast } from "sonner";
import logoRoxo from "figma:asset/b7e03c12d593d9e2b23b60a6ec0dd6044617d2b3.png";
import logoBranco from "figma:asset/0e588a2cd1ae883ddc283f360db1fd55b9002906.png";

interface LoginProps {
  onForgotPassword: () => void;
  onCadastro?: () => void;
  onAccessFornecedor?: () => void;
  onAccessElenco?: () => void;
}

export default function Login({ onForgotPassword, onCadastro, onAccessFornecedor, onAccessElenco }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      // Login reconhece automaticamente o tipo de usuário pelas credenciais
      const success = login(username, password);
      
      if (success) {
        toast.success("Login realizado com sucesso!");
      } else {
        setError("Usuário ou senha incorretos");
        toast.error("Credenciais inválidas");
      }
      
      setIsLoading(false);
    }, 800);
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full shadow-2xl backdrop-blur-sm dark:bg-background/95">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
              <LogIn className="w-10 h-10 text-primary" />
            </div>
            {/* Logo MOVIOCA - dinâmica para light/dark mode */}
            <div className="flex items-center justify-center py-2">
              {darkMode ? (
                <img 
                  src={logoBranco} 
                  alt="MOVIOCA" 
                  className="h-12 w-auto"
                />
              ) : (
                <img 
                  src={logoRoxo} 
                  alt="MOVIOCA" 
                  className="h-12 w-auto"
                />
              )}
            </div>
            <CardDescription className="text-base">
              Sistema de Gestão de Projetos Audiovisuais
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
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueci a senha
                  </button>
                </div>
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
                    Entrando...
                  </div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>

              {onCadastro && (
                <div className="space-y-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-2 hover:bg-primary/5 flex flex-col items-center justify-center gap-1 h-auto py-3"
                    size="lg"
                    onClick={onCadastro}
                  >
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Fazer Cadastro</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Cadastro exclusivo para fornecedores</span>
                  </Button>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  <strong>Credenciais de teste:</strong>
                </p>
                <p className="text-xs text-center text-muted-foreground mt-1">
                  Perfis Internos: admin / 1234
                </p>
                <p className="text-xs text-center text-muted-foreground">
                  Fornecedor: fornecedor / 1234
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}