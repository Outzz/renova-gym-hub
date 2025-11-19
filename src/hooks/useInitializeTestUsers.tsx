import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useInitializeTestUsers() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeUsers = async () => {
      // Verificar se os usuários já existem tentando login
      const testUsers = [
        { email: 'admin@renova.com', password: 'admin123', fullName: 'Administrador da Academia', role: 'admin' },
        { email: 'aluno@renova.com', password: 'aluno123', fullName: 'Maria Silva', role: 'student' }
      ];

      for (const user of testUsers) {
        // Tentar fazer login para verificar se existe
        const { error } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: user.password,
        });

        // Se não existir, criar
        if (error?.message.includes('Invalid login credentials')) {
          const redirectUrl = `${window.location.origin}/`;
          
          await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
              emailRedirectTo: redirectUrl,
              data: {
                full_name: user.fullName,
                phone: '',
              }
            }
          });
        }

        // Fazer logout após verificar/criar
        await supabase.auth.signOut();
      }

      setInitialized(true);
    };

    initializeUsers();
  }, []);

  return initialized;
}
