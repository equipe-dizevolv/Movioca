import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Cable, Check, X, Settings } from "lucide-react";

export default function Integracoes() {
  const integracoes = [
    {
      nome: "DocuSign",
      descricao: "Assinatura digital de contratos",
      status: "Conectado",
      icon: Cable,
    },
    {
      nome: "MXM/ERP",
      descricao: "Integração com sistema de gestão empresarial",
      status: "Conectado",
      icon: Cable,
    },
    {
      nome: "Google Drive",
      descricao: "Armazenamento de documentos",
      status: "Desconectado",
      icon: Cable,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl text-[#0F172A] dark:text-[#E5E7EB]">Integrações</h2>
        <p className="text-[#475569] dark:text-[#94A3B8] mt-1">
          Gerenciar integrações com sistemas externos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integracoes.map((integracao, idx) => {
          const Icon = integracao.icon;
          const conectado = integracao.status === "Conectado";

          return (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`${
                        conectado ? "bg-green-100" : "bg-gray-100"
                      } p-3 rounded-lg`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          conectado ? "text-green-600" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integracao.nome}</CardTitle>
                      <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
                        {integracao.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      conectado
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {conectado ? (
                      <Check className="w-3 h-3 mr-1" />
                    ) : (
                      <X className="w-3 h-3 mr-1" />
                    )}
                    {integracao.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Migração MXM</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#475569] dark:text-[#94A3B8] mb-4">
            Ferramenta de migração de dados do sistema MXM para o MOVIOCA
          </p>
          <Button className="bg-[#8B5CF6] hover:bg-[#7C4FE0]">
            Iniciar Migração
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Envio Automático</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#475569] dark:text-[#94A3B8] mb-4">
            Configurar envio automático de relatórios e notificações
          </p>
          <Button className="bg-[#8B5CF6] hover:bg-[#7C4FE0]">
            Configurar Envios
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
