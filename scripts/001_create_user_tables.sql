-- Create user profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own" ON public.profiles 
  FOR DELETE USING (auth.uid() = id);

-- Create subscribers table for the family/subscribers hub
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  subscription_type TEXT DEFAULT 'free' CHECK (subscription_type IN ('free', 'premium', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subscribers
CREATE POLICY "subscribers_select_own" ON public.subscribers 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "subscribers_insert_own" ON public.subscribers 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "subscribers_update_own" ON public.subscribers 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "subscribers_delete_own" ON public.subscribers 
  FOR DELETE USING (auth.uid() = user_id);

-- Create files table for file management
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for files
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for files
CREATE POLICY "files_select_own" ON public.files 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "files_insert_own" ON public.files 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "files_update_own" ON public.files 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "files_delete_own" ON public.files 
  FOR DELETE USING (auth.uid() = user_id);
