
-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  mobile TEXT,
  state TEXT,
  district TEXT,
  village TEXT,
  primary_crops TEXT[],
  total_land_acres NUMERIC,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own profile delete" ON public.profiles FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- handle_new_user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, preferred_language)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)), 'en');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- FARM PLOTS
CREATE TABLE public.farm_plots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  area_acres NUMERIC,
  soil_type TEXT,
  current_crop TEXT,
  sowing_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.farm_plots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "plots select own" ON public.farm_plots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "plots insert own" ON public.farm_plots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "plots update own" ON public.farm_plots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "plots delete own" ON public.farm_plots FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER plots_updated BEFORE UPDATE ON public.farm_plots FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SAVED DIAGNOSES
CREATE TABLE public.saved_diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_name TEXT,
  disease_name TEXT,
  confidence INTEGER,
  symptoms TEXT,
  treatment TEXT,
  organic_treatment TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.saved_diagnoses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "diag select own" ON public.saved_diagnoses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "diag insert own" ON public.saved_diagnoses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "diag delete own" ON public.saved_diagnoses FOR DELETE USING (auth.uid() = user_id);

-- CROP REMINDERS
CREATE TABLE public.crop_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plot_id UUID REFERENCES public.farm_plots(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  task TEXT NOT NULL,
  due_date DATE NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.crop_reminders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rem select own" ON public.crop_reminders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "rem insert own" ON public.crop_reminders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "rem update own" ON public.crop_reminders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "rem delete own" ON public.crop_reminders FOR DELETE USING (auth.uid() = user_id);
