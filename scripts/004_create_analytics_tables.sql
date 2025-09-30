-- Create analytics events table for tracking user actions
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);

-- Enable RLS for analytics events
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for analytics events
CREATE POLICY "analytics_events_select_own" ON public.analytics_events 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "analytics_events_insert_own" ON public.analytics_events 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create system metrics table for monitoring application performance
CREATE TABLE IF NOT EXISTS public.system_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  value DECIMAL(15,4) NOT NULL,
  unit TEXT,
  tags JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for system metrics
CREATE INDEX IF NOT EXISTS idx_system_metrics_type ON public.system_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_system_metrics_name ON public.system_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_system_metrics_created_at ON public.system_metrics(created_at);

-- Enable RLS for system metrics (admin only)
ALTER TABLE public.system_metrics ENABLE ROW LEVEL SECURITY;

-- Create user activity summary table for quick analytics
CREATE TABLE IF NOT EXISTS public.user_activity_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_events INTEGER DEFAULT 0,
  unique_sessions INTEGER DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0, -- in seconds
  pages_visited INTEGER DEFAULT 0,
  files_uploaded INTEGER DEFAULT 0,
  subscribers_added INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for user activity summary
CREATE INDEX IF NOT EXISTS idx_user_activity_summary_user_id ON public.user_activity_summary(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_summary_date ON public.user_activity_summary(date);

-- Enable RLS for user activity summary
ALTER TABLE public.user_activity_summary ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user activity summary
CREATE POLICY "user_activity_summary_select_own" ON public.user_activity_summary 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_activity_summary_insert_own" ON public.user_activity_summary 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_activity_summary_update_own" ON public.user_activity_summary 
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update user activity summary
CREATE OR REPLACE FUNCTION update_user_activity_summary()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_activity_summary (user_id, date, total_events)
  VALUES (NEW.user_id, DATE(NEW.created_at), 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    total_events = user_activity_summary.total_events + 1,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update activity summary
CREATE TRIGGER trigger_update_user_activity_summary
  AFTER INSERT ON public.analytics_events
  FOR EACH ROW
  EXECUTE FUNCTION update_user_activity_summary();

-- Insert some sample system metrics
INSERT INTO public.system_metrics (metric_type, metric_name, value, unit, tags) VALUES
('performance', 'page_load_time', 1.2, 'seconds', '{"page": "dashboard"}'),
('performance', 'api_response_time', 0.3, 'seconds', '{"endpoint": "/api/subscribers"}'),
('usage', 'active_users', 150, 'count', '{"period": "daily"}'),
('usage', 'total_subscribers', 1250, 'count', '{}'),
('storage', 'total_files', 5680, 'count', '{}'),
('storage', 'storage_used', 45.7, 'GB', '{}');
