import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Heart, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-gym.jpg';

const Landing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Musculação',
      price: 'R$ 150',
      description: 'Treinos focados em ganho de massa e força muscular',
      icon: Dumbbell,
      type: 'single',
    },
    {
      name: 'Pilates',
      price: 'R$ 210',
      description: 'Exercícios de alongamento e fortalecimento',
      icon: Heart,
      type: 'single',
    },
    {
      name: 'Zumba',
      price: 'R$ 120',
      description: 'Aulas de dança fitness energéticas',
      icon: Music,
      type: 'single',
    },
    {
      name: 'Musculação + Pilates',
      price: 'R$ 350',
      description: 'Combo completo: força e flexibilidade',
      icon: Dumbbell,
      type: 'combo',
    },
    {
      name: 'Musculação + Zumba',
      price: 'R$ 200',
      description: 'Combo: treino de força e cardio dançante',
      icon: Dumbbell,
      type: 'combo',
    },
    {
      name: 'Zumba + Pilates',
      price: 'R$ 299,99',
      description: 'Combo: dança fitness e alongamento',
      icon: Music,
      type: 'combo',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="bg-gradient-hero bg-clip-text text-transparent">Renova Academia</span>
          </div>
          <Button onClick={() => navigate('/login')} variant="default">
            Entrar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Renova Academia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6 animate-fade-in">
              Transforme seu corpo, <span className="bg-gradient-hero bg-clip-text text-transparent">renove sua energia</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              A academia completa para você alcançar seus objetivos com treinos personalizados e instrutores qualificados
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 shadow-elevated hover:scale-105 transition-transform"
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conheça nossos planos
            </Button>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Escolha seu plano ideal</h2>
            <p className="text-xl text-muted-foreground">Opções individuais e combos especiais</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {plan.price}
                      <span className="text-base text-muted-foreground font-normal">/mês</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => navigate('/login')}>
                      Contratar
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2025 Renova Academia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
