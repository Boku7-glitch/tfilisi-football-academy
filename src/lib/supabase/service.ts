import { createClient } from './client';

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url && 
    key && 
    !url.includes('placeholder') && 
    !url.includes('your-project') &&
    !key.includes('placeholder') &&
    !key.includes('your-anon-key')
  );
}

export const supabaseAuth = {
  async signUp(email: string, password: string, userData: { fullName: string; role: 'parent' | 'coach'; phone?: string }) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured yet. Using local state.') };
    }
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.fullName,
          role: userData.role,
          phone: userData.phone || ''
        }
      }
    });

    if (data.user && !error) {
      // Also insert profile record
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: data.user.email,
        full_name: userData.fullName,
        phone: userData.phone || '',
        role: userData.role
      });
    }

    return { data, error };
  },

  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured yet. Using local state.') };
    }
    const supabase = createClient();
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    return await supabase.auth.signOut();
  },

  async getCurrentUser() {
    if (!isSupabaseConfigured()) return null;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};
