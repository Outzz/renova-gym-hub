import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-gym.jpg';
import musculacaoImg from '@/assets/musculacao.jpg';
import pilatesImg from '@/assets/pilates.jpg';
import zumbaImg from '@/assets/zumba.jpg';
import comboMusculacaoPilatesImg from '@/assets/combo-musculacao-pilates.jpg';
import comboMusculacaoZumbaImg from '@/assets/combo-musculacao-zumba.jpg';
import comboZumbaPilatesImg from '@/assets/combo-zumba-pilates.jpg';

const Landing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Musculação',
      price: 'R$ 150',
      description: 'Treinos focados em ganho de massa e força muscular',
      image: musculacaoImg,
      type: 'single',
    },
    {
      name: 'Pilates',
      price: 'R$ 210',
      description: 'Exercícios de alongamento e fortalecimento',
      image: pilatesImg,
      type: 'single',
    },
    {
      name: 'Zumba',
      price: 'R$ 120',
      description: 'Aulas de dança fitness energéticas',
      image: zumbaImg,
      type: 'single',
    },
    {
      name: 'Musculação + Pilates',
      price: 'R$ 350',
      description: 'Combo completo: força e flexibilidade',
      image: comboMusculacaoPilatesImg,
      type: 'combo',
    },
    {
      name: 'Musculação + Zumba',
      price: 'R$ 200',
      description: 'Combo: treino de força e cardio dançante',
      image: comboMusculacaoZumbaImg,
      type: 'combo',
    },
    {
      name: 'Zumba + Pilates',
      price: 'R$ 299,99',
      description: 'Combo: dança fitness e alongamento',
      image: comboZumbaPilatesImg,
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
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className="hover-scale overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={plan.image} 
                    alt={plan.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                    {plan.price}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">por mês</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate('/login')}>
                    Contratar
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
