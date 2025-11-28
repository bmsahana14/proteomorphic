// Real AI Backend Integration
// Replaces the simulated analysis with actual API calls to Python backend

const RealAI = {
    baseURL: 'http://localhost:5000/api',

    /**
     * Check if backend is running and healthy
     */
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            const data = await response.json();
            console.log('✅ AI Backend Status:', data);
            return data.status === 'healthy';
        } catch (error) {
            console.warn('⚠️ AI Backend not available:', error.message);
            console.log('💡 Falling back to demo mode. To enable real AI:');
            console.log('   1. cd backend');
            console.log('   2. python -m venv venv');
            console.log('   3. venv\\Scripts\\activate  (Windows) or source venv/bin/activate (Mac/Linux)');
            console.log('   4. pip install -r requirements.txt');
            console.log('   5. python app.py');
            return false;
        }
    },

    /**
     * Analyze protein using real AI backend
     */
    async analyzeProtein(proteinData) {
        try {
            console.log('🧬 Sending protein to AI backend for analysis...');

            const response = await fetch(`${this.baseURL}/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    proteinName: proteinData.proteinName,
                    proteinSequence: proteinData.proteinSequence || ''
                })
            });

            if (!response.ok) {
                throw new Error(`Backend error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('✅ AI Analysis complete:', result);

            // Add metadata
            result.analysisMode = 'Real AI (ESM-2)';
            result.timestamp = new Date().toISOString();

            return result;

        } catch (error) {
            console.error('❌ AI Backend error:', error);
            console.log('⚠️ Falling back to demo analysis...');

            // Fallback to demo mode
            return await AnalysisEngine.analyzeProtein(proteinData);
        }
    }
};

// Export for use in other files
window.RealAI = RealAI;

// Auto-check backend status on load
document.addEventListener('DOMContentLoaded', async () => {
    const isHealthy = await RealAI.checkHealth();

    // Show notification to user
    if (isHealthy) {
        console.log('🚀 Real AI Mode: ENABLED');
        console.log('   Using ESM-2 protein language model');

        // Optional: Show success message in UI
        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.show('Real AI Backend Connected! 🧠', 'success', 3000);
        }
    } else {
        console.log('📊 Demo Mode: ACTIVE');
        console.log('   Using simulated analysis');
        console.log('   Start backend for real AI predictions');

        // Optional: Show info message in UI
        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.show('Running in Demo Mode. Start backend for real AI.', 'info', 5000);
        }
    }
});
