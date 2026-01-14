import { useState } from "react";
import SpreadsheetGrid, { Column } from "./SpreadsheetGrid";

// Exemplo de uso do SpreadsheetGrid
export default function SpreadsheetGridExample() {
  // Dados de exemplo
  const [tableData, setTableData] = useState([
    { id: 1, item: "Aluguel de Câmera", quantidade: 5, valorUnitario: 1500, valorTotal: 0, comprometido: 6000, realizado: 5500 },
    { id: 2, item: "Locação de Estúdio", quantidade: 3, valorUnitario: 2000, valorTotal: 0, comprometido: 4500, realizado: 4500 },
    { id: 3, item: "Cachê Ator Principal", quantidade: 1, valorUnitario: 15000, valorTotal: 0, comprometido: 15000, realizado: 0 },
    { id: 4, item: "Figurino", quantidade: 10, valorUnitario: 300, valorTotal: 0, comprometido: 2000, realizado: 1800 },
    { id: 5, item: "Catering (Alimentação)", quantidade: 20, valorUnitario: 80, valorTotal: 0, comprometido: 1600, realizado: 1600 },
  ]);

  // Definição das colunas
  const columns: Column[] = [
    { key: "item", header: "Item/Descrição", width: "300px", align: "left", type: "text" },
    { key: "quantidade", header: "Quantidade", width: "120px", align: "center", type: "number" },
    { key: "valorUnitario", header: "Valor Unitário", width: "150px", align: "right", type: "currency" },
    { key: "valorTotal", header: "Valor Total", width: "150px", align: "right", type: "currency" },
    { key: "comprometido", header: "Comprometido", width: "150px", align: "right", type: "currency" },
    { key: "realizado", header: "Realizado", width: "150px", align: "right", type: "currency" },
    { key: "saldoDisponivel", header: "Saldo Disponível", width: "150px", align: "right", type: "currency" },
  ];

  // Handler de edição de células
  const handleCellEdit = (rowIndex: number, columnKey: string, newValue: any) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [columnKey]: newValue,
      };
      return newData;
    });
  };

  // Colunas editáveis
  const editableColumns = ["item", "quantidade", "valorUnitario", "comprometido", "realizado"];

  // Colunas calculadas (readonly)
  const calculatedColumns = {
    valorTotal: (row: any) => {
      const quantidade = parseFloat(row.quantidade) || 0;
      const valorUnitario = parseFloat(row.valorUnitario) || 0;
      return quantidade * valorUnitario;
    },
    saldoDisponivel: (row: any) => {
      const comprometido = parseFloat(row.comprometido) || 0;
      const realizado = parseFloat(row.realizado) || 0;
      return comprometido - realizado;
    },
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Exemplo: SpreadsheetGrid</h2>
        <p className="text-sm text-gray-600 mt-1">
          Planilha editável com navegação por teclado, copiar/colar e cálculos automáticos
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Atalhos disponíveis:</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Tab</kbd> / <kbd className="px-1.5 py-0.5 bg-white border rounded">Shift+Tab</kbd> - Navegar horizontal</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Enter</kbd> / <kbd className="px-1.5 py-0.5 bg-white border rounded">Shift+Enter</kbd> - Navegar vertical</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">↑↓←→</kbd> - Navegar com setas</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Enter</kbd> ou <strong>Duplo clique</strong> - Editar célula</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Escape</kbd> - Cancelar edição</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Delete</kbd> - Limpar célula</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Backspace</kbd> - Limpar e editar</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Ctrl+C</kbd> / <kbd className="px-1.5 py-0.5 bg-white border rounded">Ctrl+V</kbd> - Copiar/Colar</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Ctrl+Z</kbd> / <kbd className="px-1.5 py-0.5 bg-white border rounded">Ctrl+Y</kbd> - Desfazer/Refazer</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Ctrl+A</kbd> - Selecionar tudo</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Home</kbd> / <kbd className="px-1.5 py-0.5 bg-white border rounded">End</kbd> - Ir para início/fim da linha</li>
            <li><kbd className="px-1.5 py-0.5 bg-white border rounded">Ctrl+Home</kbd> / <kbd className="px-1.5 py-0.5 bg-white border rounded">Ctrl+End</kbd> - Ir para primeira/última célula</li>
          </ul>
        </div>

        <SpreadsheetGrid
          columns={columns}
          data={tableData}
          onCellEdit={handleCellEdit}
          editableColumns={editableColumns}
          calculatedColumns={calculatedColumns}
          className="max-h-[600px]"
        />

        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Informações:</h3>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>✅ <strong>Colunas editáveis:</strong> Item, Quantidade, Valor Unitário, Comprometido, Realizado</li>
            <li>🔒 <strong>Colunas calculadas:</strong> Valor Total, Saldo Disponível</li>
            <li>📊 <strong>Cálculos automáticos:</strong> Atualizados em tempo real</li>
            <li>🎨 <strong>Visual:</strong> Célula selecionada (borda roxa), Range (fundo azul), Readonly (cinza)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
