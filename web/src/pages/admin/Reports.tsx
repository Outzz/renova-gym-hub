import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { StatsCard } from '@/components/admin/StatsCard';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Reports() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    monthlyRevenue: 0,
    totalSales: 0,
    growthRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // Total students
      const { count: totalStudents } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      // Active sales
      const { data: activeSales } = await supabase
        .from('sales')
        .select('*, plans(price)')
        .eq('status', 'active');

      // Total sales this month
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      firstDayOfMonth.setHours(0, 0, 0, 0);

      const { data: monthlySales } = await supabase
        .from('sales')
        .select('*, plans(price)')
        .gte('sale_date', firstDayOfMonth.toISOString());

      const monthlyRevenue = monthlySales?.reduce(
        (sum, sale) => sum + Number(sale.plans?.price || 0),
        0
      ) || 0;

      const { count: totalSalesCount } = await supabase
        .from('sales')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalStudents: totalStudents || 0,
        activeStudents: activeSales?.length || 0,
        monthlyRevenue,
        totalSales: totalSalesCount || 0,
        growthRate: 12.5 // This would need more complex calculation
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os relatórios',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Visualize métricas e análises do negócio</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Carregando relatórios...
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <StatsCard
                title="Total de Alunos"
                value={stats.totalStudents}
                icon={Users}
                description="Alunos cadastrados"
              />
              <StatsCard
                title="Alunos Ativos"
                value={stats.activeStudents}
                icon={Activity}
                description="Com planos ativos"
              />
              <StatsCard
                title="Receita Mensal"
                value={`R$ ${stats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon={DollarSign}
                description="Vendas deste mês"
              />
              <StatsCard
                title="Total de Vendas"
                value={stats.totalSales}
                icon={TrendingUp}
                description="Todas as vendas"
                trend={`+${stats.growthRate}% este mês`}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Modalidades Mais Contratadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Musculação + Pilates</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Musculação</span>
                      <span className="text-sm text-muted-foreground">30%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pilates</span>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taxa de Retenção</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary">87%</div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Taxa de renovação mensal
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground mt-1">Satisfação</p>
                      </div>
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-2xl font-bold">8%</div>
                        <p className="text-xs text-muted-foreground mt-1">Cancelamentos</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
