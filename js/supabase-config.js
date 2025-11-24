// Supabase Configuration
// Replace these with YOUR actual values from Supabase dashboard
// Get them from: Settings > API in your Supabase project

const SUPABASE_URL = 'https://vdnifkgjscivwixobcfw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmlma2dqc2NpdndpeG9iY2Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjUzNTYsImV4cCI6MjA3OTIwMTM1Nn0.Fuk3zdPJxHSv6mR3c9XOSWMekBUJNfdhQ8ILS_fI3nQ'

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Export for use in other files
window.supabase = supabase
