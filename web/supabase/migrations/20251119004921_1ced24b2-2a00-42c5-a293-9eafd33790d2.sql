-- Remover trigger existente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Atualizar função para incluir atribuição de roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Criar perfil
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );

  -- Atribuir role baseado no email
  IF NEW.email = 'admin@renova.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSIF NEW.email = 'aluno@renova.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student');
  ELSE
    -- Todos os outros usuários são students por padrão
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recriar trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Atribuir roles aos usuários existentes que ainda não têm role
INSERT INTO public.user_roles (user_id, role)
SELECT 
  p.id,
  CASE 
    WHEN u.email = 'admin@renova.com' THEN 'admin'::app_role
    WHEN u.email = 'aluno@renova.com' THEN 'student'::app_role
    ELSE 'student'::app_role
  END as role
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
LEFT JOIN public.user_roles ur ON ur.user_id = p.id
WHERE ur.user_id IS NULL
ON CONFLICT (user_id, role) DO NOTHING;