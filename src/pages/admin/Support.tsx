import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Clock } from 'lucide-react';

export default function Support() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      studentName: 'João Silva',
      message: 'Gostaria de alterar meu horário de treino.',
      date: '2025-01-15',
      status: 'pending',
      time: '14:30'
    },
    {
      id: 2,
      studentName: 'Maria Santos',
      message: 'Como faço para renovar meu plano?',
      date: '2025-01-15',
      status: 'answered',
      time: '10:15',
      response: 'Você pode renovar diretamente pelo aplicativo ou na recepção.'
    },
    {
      id: 3,
      studentName: 'Pedro Costa',
      message: 'Preciso cancelar minha aula de amanhã.',
      date: '2025-01-14',
      status: 'pending',
      time: '16:45'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [response, setResponse] = useState('');

  const handleSendResponse = () => {
    if (!selectedMessage || !response.trim()) return;

    setMessages(messages.map(msg =>
      msg.id === selectedMessage.id
        ? { ...msg, status: 'answered', response }
        : msg
    ));

    setResponse('');
    setSelectedMessage(null);
  };

  const getStatusVariant = (status: string) => {
    return status === 'pending' ? 'destructive' : 'default';
  };

  const getStatusLabel = (status: string) => {
    return status === 'pending' ? 'Pendente' : 'Respondido';
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Suporte ao Cliente</h1>
          <p className="text-muted-foreground">Gerencie mensagens e dúvidas dos alunos</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Mensagens Recebidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    Nenhuma mensagem recebida
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-secondary/50 ${
                        selectedMessage?.id === msg.id ? 'bg-secondary' : ''
                      }`}
                      onClick={() => setSelectedMessage(msg)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{msg.studentName}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {new Date(msg.date).toLocaleDateString('pt-BR')} às {msg.time}
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(msg.status)}>
                          {getStatusLabel(msg.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedMessage ? 'Responder Mensagem' : 'Selecione uma mensagem'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{selectedMessage.studentName}</h4>
                      <Badge variant={getStatusVariant(selectedMessage.status)}>
                        {getStatusLabel(selectedMessage.status)}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{selectedMessage.message}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(selectedMessage.date).toLocaleDateString('pt-BR')} às {selectedMessage.time}
                    </div>
                  </div>

                  {selectedMessage.response ? (
                    <div className="p-4 bg-primary/10 border-l-4 border-primary rounded">
                      <p className="text-sm font-medium mb-1">Sua resposta:</p>
                      <p className="text-sm">{selectedMessage.response}</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Digite sua resposta
                        </label>
                        <Textarea
                          placeholder="Digite aqui sua mensagem..."
                          className="min-h-[150px]"
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                        />
                      </div>
                      <Button
                        className="w-full gap-2"
                        onClick={handleSendResponse}
                        disabled={!response.trim()}
                      >
                        <Send className="h-4 w-4" />
                        Enviar Resposta
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Selecione uma mensagem para visualizar e responder</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
