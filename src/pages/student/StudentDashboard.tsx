import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Dumbbell, Calendar, CreditCard, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Sale {
  id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  status: string;
  plans: {
    name: string;
    price: number;
  };
}

interface Invoice {
  id: string;
  amount: number;
  due_date: string;
  payment_date: string | null;
  status: string;
  payment_method: string | null;
}

interface TrainingSchedule {
  day_of_week: number;
  exercises: any;
}

export default function StudentDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = useState<Sale | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [schedule, setSchedule] = useState<TrainingSchedule[]>([]);
  const [profile, setProfile] = useState({ full_name: '', phone: '' });

  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    if (!user) return;

    try {
      // Fetch active plan
      const { data: salesData } = await supabase
        .from('sales')
        .select('*, plans(name, price)')
        .eq('student_id', user.id)
        .eq('status', 'active')
        .single();

      if (salesData) setActivePlan(salesData);

      // Fetch invoices
      const { data: invoicesData } = await supabase
        .from('invoices')
        .select('*')
        .eq('student_id', user.id)
        .order('due_date', { ascending: false });

      if (invoicesData) setInvoices(invoicesData);

      // Fetch training schedule
      const { data: scheduleData } = await supabase
        .from('training_schedules')
        .select('*')
        .eq('student_id', user.id)
        .order('day_of_week');

      if (scheduleData) setSchedule(scheduleData);

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) setProfile(profileData);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-bold text-xl">Renova Academia</h1>
              <p className="text-xs text-muted-foreground">Área do Aluno</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Olá, {profile.full_name || 'Aluno'}!</h2>
          <p className="text-muted-foreground">Bem-vindo à sua área pessoal</p>
        </div>

        <Tabs defaultValue="training" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="training">
              <Calendar className="mr-2 h-4 w-4" />
              Treinos
            </TabsTrigger>
            <TabsTrigger value="plan">
              <Dumbbell className="mr-2 h-4 w-4" />
              Meu Plano
            </TabsTrigger>
            <TabsTrigger value="invoices">
              <CreditCard className="mr-2 h-4 w-4" />
              Faturas
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </TabsTrigger>
          </TabsList>

          {/* Training Schedule Tab */}
          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agenda de Treinos</CardTitle>
                <CardDescription>Seus treinos organizados por dia da semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {daysOfWeek.map((day, index) => {
                    const daySchedule = schedule.find(s => s.day_of_week === index);
                    const isRestDay = index >= 5; // Sábado e Domingo

                    return (
                      <Card key={index} className={isRestDay ? 'bg-muted/50' : ''}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{day}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isRestDay ? (
                            <p className="text-sm text-muted-foreground">Dia de descanso</p>
                          ) : daySchedule && Array.isArray(daySchedule.exercises) && daySchedule.exercises.length > 0 ? (
                            <ul className="space-y-2">
                              {daySchedule.exercises.map((exercise: any, i: number) => (
                                <li key={i} className="text-sm">
                                  • {exercise.name || `Exercício ${i + 1}`}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">Nenhum treino cadastrado</p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meu Plano Atual</CardTitle>
                <CardDescription>Detalhes da sua assinatura</CardDescription>
              </CardHeader>
              <CardContent>
                {activePlan ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{activePlan.plans.name}</h3>
                        <p className="text-3xl font-bold text-primary mt-2">
                          R$ {Number(activePlan.plans.price).toFixed(2)}
                          <span className="text-base text-muted-foreground font-normal">/mês</span>
                        </p>
                      </div>
                      <Badge variant={activePlan.status === 'active' ? 'default' : 'secondary'}>
                        {activePlan.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Data de início</p>
                        <p className="font-medium">{new Date(activePlan.start_date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data de vencimento</p>
                        <p className="font-medium">{new Date(activePlan.end_date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>

                    <Button className="w-full">Renovar Plano</Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Você não possui um plano ativo</p>
                    <Button onClick={() => navigate('/')}>Ver Planos Disponíveis</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Faturas</CardTitle>
                <CardDescription>Histórico de pagamentos</CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.length > 0 ? (
                  <div className="space-y-3">
                    {invoices.map((invoice) => (
                      <Card key={invoice.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Fatura #{invoice.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">
                                Vencimento: {new Date(invoice.due_date).toLocaleDateString('pt-BR')}
                              </p>
                              {invoice.payment_method && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {invoice.payment_method === 'credit_card' ? 'Cartão de Crédito' : 
                                   invoice.payment_method === 'debit_card' ? 'Cartão de Débito' : 'Boleto'}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">R$ {Number(invoice.amount).toFixed(2)}</p>
                              <Badge 
                                variant={
                                  invoice.status === 'paid' ? 'default' : 
                                  invoice.status === 'overdue' ? 'destructive' : 'secondary'
                                }
                              >
                                {invoice.status === 'paid' ? 'Pago' : 
                                 invoice.status === 'overdue' ? 'Atrasado' : 'Pendente'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">Nenhuma fatura encontrada</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription>Suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome Completo</label>
                  <p className="text-lg">{profile.full_name || 'Não informado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">E-mail</label>
                  <p className="text-lg">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <p className="text-lg">{profile.phone || 'Não informado'}</p>
                </div>
                <Button variant="outline" className="w-full">Editar Perfil</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
