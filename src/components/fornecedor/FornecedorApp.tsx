"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";
import HeaderSimplified from "../HeaderSimplified";
import FornecedorDashboard from "./FornecedorDashboard";
import FornecedorPagamentos from "./FornecedorPagamentos";
import FornecedorDocumentos from "./FornecedorDocumentos";
import ConfiguracoesFornecedor from "./ConfiguracoesFornecedor";

export default function FornecedorApp() {
  const [currentScreen, setCurrentScreen] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Mapear telas do Fornecedor
  const renderContent = () => {
    switch (currentScreen) {
      case "Dashboard":
        return <FornecedorDashboard onNavigate={(tela) => {
          // Converter navegação interna para nome de menu
          const screenMap: Record<string, string> = {
            "dashboard": "Dashboard",
            "meus-dados": "Configurações",
            "pagamentos": "Pagamentos",
            "documentos": "Documentos",
          };
          setCurrentScreen(screenMap[tela] || "Dashboard");
        }} />;
      
      case "Configurações":
        return <ConfiguracoesFornecedor />;
      
      case "Pagamentos":
        return <FornecedorPagamentos />;
      
      case "Documentos":
        return <FornecedorDocumentos />;
      
      default:
        return <FornecedorDashboard onNavigate={(tela) => {
          const screenMap: Record<string, string> = {
            "dashboard": "Dashboard",
            "meus-dados": "Configurações",
            "pagamentos": "Pagamentos",
            "documentos": "Documentos",
          };
          setCurrentScreen(screenMap[tela] || "Dashboard");
        }} />;
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar - Componente compartilhado */}
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Header - Componente compartilhado */}
        <HeaderSimplified 
          darkMode={darkMode} 
          onToggleDarkMode={toggleDarkMode} 
          title="Portal do Fornecedor - MOVIOCA"
        />

        {/* Content */}
        <main className="flex-1 overflow-auto bg-background">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}