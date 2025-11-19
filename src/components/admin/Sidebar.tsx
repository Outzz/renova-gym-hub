import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  FileText, 
  LogOut,
  Dumbbell,
  MessageCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Sidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Painel', path: '/admin' },
    { icon: Users, label: 'Alunos', path: '/admin/students' },
    { icon: ShoppingCart, label: 'Vendas', path: '/admin/sales' },
    { icon: CreditCard, label: 'Pagamentos', path: '/admin/payments' },
    { icon: FileText, label: 'Relatórios', path: '/admin/reports' },
    { icon: MessageCircle, label: 'Suporte', path: '/admin/support' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-primary" />
          <div>
            <h2 className="font-bold text-xl">Renova</h2>
            <p className="text-xs text-muted-foreground">Painel Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(item.path)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
