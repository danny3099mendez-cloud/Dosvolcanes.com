// js/supabase-client.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔧 Reemplaza estos valores con los de tu proyecto Supabase
const SUPABASE_URL = "https://wyfewuylgdwgyhxqqmvc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5ZmV3dXlsZ2R3Z3loeHFxbXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzAyMDIsImV4cCI6MjA3NzIwNjIwMn0.EGxCIgDJbBCAhteqpxj5ODZQ2yXggf2CVT8yv2dRqMA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
