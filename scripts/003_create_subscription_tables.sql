-- Create subscription plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2),
  features JSONB DEFAULT '[]',
  max_subscribers INTEGER,
  max_file_storage_gb INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, description, price_monthly, price_yearly, features, max_subscribers, max_file_storage_gb) VALUES
('Free', 'Perfect for getting started', 0.00, 0.00, '["Up to 5 subscribers", "1GB file storage", "Basic calendar", "Email support"]', 5, 1, true),
('Premium', 'For growing businesses', 29.00, 290.00, '["Up to 100 subscribers", "50GB file storage", "Advanced calendar", "Priority support", "Custom branding", "Analytics dashboard"]', 100, 50, true),
('Enterprise', 'For large organizations', 99.00, 990.00, '["Unlimited subscribers", "500GB file storage", "Advanced analytics", "24/7 phone support", "Custom integrations", "White-label solution", "API access"]', -1, 500, true);

-- Create user subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.subscription_plans(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '1 month',
  cancel_at_period_end BOOLEAN DEFAULT false,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for subscription tables
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subscription_plans (public read access)
CREATE POLICY "subscription_plans_select_all" ON public.subscription_plans 
  FOR SELECT USING (is_active = true);

-- Create RLS policies for user_subscriptions
CREATE POLICY "user_subscriptions_select_own" ON public.user_subscriptions 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_subscriptions_insert_own" ON public.user_subscriptions 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_subscriptions_update_own" ON public.user_subscriptions 
  FOR UPDATE USING (auth.uid() = user_id);

-- Create billing history table
CREATE TABLE IF NOT EXISTS public.billing_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.user_subscriptions(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  stripe_invoice_id TEXT,
  billing_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for billing history
ALTER TABLE public.billing_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for billing_history
CREATE POLICY "billing_history_select_own" ON public.billing_history 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "billing_history_insert_own" ON public.billing_history 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
