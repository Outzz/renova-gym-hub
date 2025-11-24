-- Criar função para atribuir roles automaticamente aos usuários de teste
CREATE OR REPLACE FUNCTION public.assign_test_user_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Se for o email do admin, atribuir role de admin
  IF NEW.email = 'admin@renova.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  -- Se for o email do aluno, atribuir role de student
  ELSIF NEW.email = 'aluno@renova.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student')
    ON CONFLICT (user_id, role) DO NOTHING;
  -- Para todos os outros usuários, atribuir role de student por padrão
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Criar trigger que chama a função após inserir um novo perfil
DROP TRIGGER IF EXISTS assign_role_on_profile_creation ON public.profiles;
CREATE TRIGGER assign_role_on_profile_creation
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_test_user_role();