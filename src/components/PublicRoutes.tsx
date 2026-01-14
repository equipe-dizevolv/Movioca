import { useState } from "react";
import FormularioCadastralPublico from "./screens/FormularioCadastralPublico";

interface PublicRoutesProps {
  route: string;
  onBackToLogin?: () => void;
}

export default function PublicRoutes({ route, onBackToLogin }: PublicRoutesProps) {
  if (route === "formulario-cadastral") {
    return <FormularioCadastralPublico onBackToLogin={onBackToLogin} />;
  }

  // Se a rota não existir, redireciona para login
  if (onBackToLogin) {
    onBackToLogin();
  }
  
  return null;
}