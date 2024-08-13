import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gnjawoiswmlmhqgumlnp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduamF3b2lzd21sbWhxZ3VtbG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2NTc4NDksImV4cCI6MjAzNjIzMzg0OX0.TVchF_ALclSmrS458lnVpBXhlGDYKBuUD-5kgbnsa8Q';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
