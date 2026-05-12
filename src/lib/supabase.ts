import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lvyzfktrwqacahelofww.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__wwVy7CycWx84RI-MO5NXQ_M9v8NvBw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
