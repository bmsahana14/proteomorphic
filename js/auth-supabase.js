// Supabase Authentication & Storage
// This replaces the LocalStorage-based auth system with real Supabase authentication

const SupabaseAuth = {
    // Sign up new user
    async signup(email, password, role, additionalData) {
        try {
            // Create user account with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role,
                        first_name: additionalData.firstName,
                        last_name: additionalData.lastName,
                        organization: additionalData.organization,
                        name: additionalData.name
                    }
                }
            });

            if (authError) throw authError;

            console.log('Auth user created:', authData.user);

            // Wait a moment for auth to complete
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Save to users table for easier querying
            if (authData.user) {
                const { data: userData, error: dbError } = await supabase
                    .from('users')
                    .upsert([{
                        id: authData.user.id,
                        email: authData.user.email,
                        password_hash: 'managed_by_supabase_auth',
                        role,
                        first_name: additionalData.firstName,
                        last_name: additionalData.lastName,
                        organization: additionalData.organization
                    }], {
                        onConflict: 'id'
                    })
                    .select();

                if (dbError) {
                    console.error('Error saving to users table:', dbError);
                } else {
                    console.log('User data saved to table:', userData);
                }
            }

            return authData.user;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    },

    // Sign in existing user
    async login(email, password, role) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            return data.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Sign out user
    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    },

    // Check if user is authenticated
    async isAuthenticated() {
        const user = await this.getCurrentUser();
        return user !== null;
    },

    // Require authentication (redirect if not logged in)
    async requireAuth() {
        const isAuth = await this.isAuthenticated();
        if (!isAuth) {
            window.location.href = '../auth/login.html';
        }
    }
};

// Project Management with Supabase
const SupabaseProjects = {
    // Save a new project
    async saveProject(projectData) {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('projects')
                .insert([{
                    user_id: user.id,
                    protein_name: projectData.proteinName,
                    protein_sequence: projectData.proteinSequence,
                    patient_id: projectData.patientId,
                    misfolding_risk: projectData.misfoldingRisk,
                    confidence: projectData.confidence,
                    risk_level: projectData.riskLevel,
                    status: projectData.status || 'completed',
                    analysis_data: {
                        structure: projectData.structure,
                        hotspots: projectData.hotspots,
                        crisprDesign: projectData.crisprDesign,
                        clinicalData: projectData.clinicalData
                    }
                }])
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Save project error:', error);
            throw error;
        }
    },

    // Get all projects for current user
    async getProjects() {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return data || [];
        } catch (error) {
            console.error('Get projects error:', error);
            return [];
        }
    },

    // Get a single project by ID
    async getProject(projectId) {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', projectId)
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Get project error:', error);
            return null;
        }
    },

    // Delete a project
    async deleteProject(projectId) {
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', projectId);

            if (error) throw error;

            return true;
        } catch (error) {
            console.error('Delete project error:', error);
            return false;
        }
    },

    // Search projects
    async searchProjects(searchTerm) {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', user.id)
                .or(`protein_name.ilike.%${searchTerm}%,patient_id.ilike.%${searchTerm}%`)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return data || [];
        } catch (error) {
            console.error('Search projects error:', error);
            return [];
        }
    }
};

// Backward compatibility - keep old Auth object working
const Auth = {
    signup: (email, password, role, additionalData) => {
        return SupabaseAuth.signup(email, password, role, additionalData);
    },
    login: (email, password, role) => {
        return SupabaseAuth.login(email, password, role);
    },
    logout: () => {
        return SupabaseAuth.logout();
    },
    getCurrentUser: () => {
        return SupabaseAuth.getCurrentUser();
    },
    isAuthenticated: () => {
        return SupabaseAuth.isAuthenticated();
    },
    requireAuth: () => {
        return SupabaseAuth.requireAuth();
    }
};

// Backward compatibility - keep old ProjectManager working
const ProjectManager = {
    saveProject: (projectData) => {
        return SupabaseProjects.saveProject(projectData);
    },
    getProjects: () => {
        return SupabaseProjects.getProjects();
    },
    deleteProject: (projectId) => {
        return SupabaseProjects.deleteProject(projectId);
    },
    searchProjects: (searchTerm) => {
        return SupabaseProjects.searchProjects(searchTerm);
    }
};

// Export for use in other files
window.SupabaseAuth = SupabaseAuth;
window.SupabaseProjects = SupabaseProjects;
window.Auth = Auth;
window.ProjectManager = ProjectManager;
