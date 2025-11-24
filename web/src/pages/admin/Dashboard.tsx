import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { StatsCard } from '@/components/admin/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSales: 0,
    totalRevenue: 0,
    activeStudents: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Count total students
      const { count: studentsCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      // Count total sales
      const { count: salesCount } = await supabase
        .from('sales')
        .select('*', { count: 'exact', head: true });

      // Calculate total revenue
      const { data: invoicesData } = await supabase
        .from('invoices')
        .select('amount')
        .eq('status', 'paid');

      const totalRevenue = invoicesData?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;

      // Count active students
      const { count: activeCount } = await supabase
        .from('sales')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      setStats({
        totalStudents: studentsCount || 0,
        totalSales: salesCount || 0,
        totalRevenue,
        activeStudents: activeCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Alunos"
            value={stats.totalStudents}
            icon={Users}
            description="Alunos cadastrados"
          />
          <StatsCard
            title="Total de Vendas"
            value={stats.totalSales}
            icon={TrendingUp}
            description="Planos contratados"
          />
          <StatsCard
            title="Faturamento"
            value={`R$ ${stats.totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            description="Pagamentos confirmados"
          />
          <StatsCard
            title="Alunos Ativos"
            value={stats.activeStudents}
            icon={Activity}
            description="Com planos ativos"
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Modalidades Mais Contratadas</CardTitle>
              <CardDescription>Distribuição por tipo de plano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Musculação</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '45%' }} />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium">Pilates</span>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-accent rounded-full h-2" style={{ width: '30%' }} />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium">Zumba</span>
                  <span className="text-sm text-muted-foreground">25%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-warning rounded-full h-2" style={{ width: '25%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status dos Alunos</CardTitle>
              <CardDescription>Distribuição por situação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <span className="text-sm font-medium">Ativos</span>
                  <span className="text-lg font-bold text-success">{stats.activeStudents}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <span className="text-sm font-medium">Em débito</span>
                  <span className="text-lg font-bold text-warning">3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                  <span className="text-sm font-medium">Cancelados</span>
                  <span className="text-lg font-bold text-destructive">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo aluno cadastrado</p>
                  <p className="text-xs text-muted-foreground">há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Pagamento confirmado</p>
                  <p className="text-xs text-muted-foreground">há 3 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Nova venda realizada</p>
                  <p className="text-xs text-muted-foreground">há 5 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
