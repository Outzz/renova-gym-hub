import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Clock, Users, TrendingUp, Star, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-gym.jpg';
import musculacao from '@/assets/musculacao.jpg';
import pilates from '@/assets/pilates.jpg';
import zumba from '@/assets/zumba.jpg';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Renova</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#academias" className="text-sm font-medium hover:text-primary transition-colors">
              Academias
            </a>
            <a href="#planos" className="text-sm font-medium hover:text-primary transition-colors">
              Planos
            </a>
            <a href="#modalidades" className="text-sm font-medium hover:text-primary transition-colors">
              Modalidades
            </a>
            <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Entrar
            </Button>
            <Button onClick={() => navigate('/login')} className="font-semibold">
              Assinar Plano Black
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center pt-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-6 py-2 bg-accent/90 backdrop-blur-sm rounded-full">
              <p className="text-sm font-bold text-accent-foreground uppercase tracking-wide">
                Esquenta Black Friday - Até 25/11
              </p>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              PRIMEIRO<br />
              MÊS<br />
              <span className="text-accent">R$ 9,90*</span>
            </h1>
            
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 h-auto font-bold uppercase"
              onClick={() => navigate('/login')}
            >
              Escolha sua Academia
            </Button>
            
            <p className="text-white/80 text-sm mt-4">
              *Consulte em www.renova.com.br/contratos todas as regras da promoção no regulamento e a taxa de adesão em sua unidade.
            </p>
            
            <p className="text-white text-lg font-bold mt-8 tracking-wider">
              QUEM É RENOVA, SABE.
            </p>
          </div>
        </div>
      </section>

      {/* Find Academy */}
      <section id="academias" className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Encontre a academia <span className="text-accent">mais próxima!</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Mais de 50 unidades em todo o Brasil
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-card p-6">
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Digite seu CEP ou cidade"
                className="flex-1 h-14 px-4 rounded-md border border-input bg-background"
              />
              <Button size="lg" className="px-8 font-semibold">
                <MapPin className="mr-2 h-5 w-5" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section id="modalidades" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nossas Modalidades</h2>
            <p className="text-muted-foreground text-lg">
              Escolha o treino ideal para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden group hover:shadow-elevated transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={musculacao} 
                  alt="Musculação" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  Musculação
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Equipamentos modernos e ambiente completo para seus treinos
                </p>
                <Button variant="outline" className="w-full">Saiba Mais</Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-elevated transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pilates} 
                  alt="Pilates" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  Pilates
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Fortalecimento, flexibilidade e bem-estar
                </p>
                <Button variant="outline" className="w-full">Saiba Mais</Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-elevated transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={zumba} 
                  alt="Zumba" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  Zumba
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Dança, diversão e muita energia
                </p>
                <Button variant="outline" className="w-full">Saiba Mais</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Por que escolher a Renova?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">24 Horas</h3>
              <p className="text-muted-foreground">Treino quando quiser</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Professores</h3>
              <p className="text-muted-foreground">Equipe qualificada</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Resultados</h3>
              <p className="text-muted-foreground">Acompanhamento personalizado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Qualidade</h3>
              <p className="text-muted-foreground">Equipamentos modernos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="planos" className="py-20 bg-gradient-accent">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comece sua transformação hoje!
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Primeiro mês por apenas R$ 9,90. Não perca essa oportunidade!
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 h-auto font-bold uppercase"
            onClick={() => navigate('/login')}
          >
            Assinar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-card py-12 border-t">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Renova</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Sua melhor versão começa aqui.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Academia</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-primary">Unidades</a></li>
                <li><a href="#" className="hover:text-primary">Modalidades</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ajuda</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Planos</a></li>
                <li><a href="#" className="hover:text-primary">Contato</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>(11) 98888-8888</li>
                <li>contato@renova.com</li>
                <li>Segunda a Sexta, 6h às 22h</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Renova Academia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
