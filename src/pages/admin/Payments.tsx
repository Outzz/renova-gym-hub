import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, DollarSign, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { StatsCard } from '@/components/admin/StatsCard';

export default function Payments() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalPending: 0,
    totalPaid: 0,
    totalOverdue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          profiles(full_name),
          sales(
            plans(name)
          )
        `)
        .order('due_date', { ascending: false });

      if (error) throw error;
      
      const invoicesData = data || [];
      setInvoices(invoicesData);

      // Calculate stats
      const pending = invoicesData
        .filter(i => i.status === 'pending')
        .reduce((sum, i) => sum + Number(i.amount), 0);
      
      const paid = invoicesData
        .filter(i => i.status === 'paid')
        .reduce((sum, i) => sum + Number(i.amount), 0);
      
      const overdue = invoicesData
        .filter(i => i.status === 'overdue')
        .reduce((sum, i) => sum + Number(i.amount), 0);

      setStats({
        totalPending: pending,
        totalPaid: paid,
        totalOverdue: overdue
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os pagamentos',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Vencido';
      default:
        return status;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Pagamentos</h1>
          <p className="text-muted-foreground">Gerencie faturas e pagamentos</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <StatsCard
            title="Pagamentos Pendentes"
            value={`R$ ${stats.totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={Calendar}
          />
          <StatsCard
            title="Recebido"
            value={`R$ ${stats.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={DollarSign}
          />
          <StatsCard
            title="Vencidos"
            value={`R$ ${stats.totalOverdue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={CreditCard}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Faturas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhuma fatura encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.profiles?.full_name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {invoice.sales?.plans?.name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 font-medium">
                          <DollarSign className="h-4 w-4 text-success" />
                          {Number(invoice.amount).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(invoice.due_date).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {invoice.payment_method || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(invoice.status)}>
                          {getStatusLabel(invoice.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
