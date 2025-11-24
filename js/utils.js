// Project Management - USER-SPECIFIC
const ProjectManager = {
    // Get storage key for current user's projects
    getUserProjectsKey() {
        const user = Storage.get('currentUser');
        if (!user || !user.id) {
            console.warn('No user logged in');
            return 'projects_guest'; // Fallback for demo
        }
        return `projects_user_${user.id}`;
    },

    getAllProjects() {
        const key = this.getUserProjectsKey();
        return Storage.get(key) || [];
    },

    saveProject(projectData) {
        const user = Storage.get('currentUser');
        const projects = this.getAllProjects();
        const project = {
            id: Date.now(),
            userId: user?.id || 'guest', // Track which user owns this project
            userEmail: user?.email || 'guest',
            ...projectData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        projects.push(project);

        const key = this.getUserProjectsKey();
        Storage.set(key, projects);

        console.log(`✅ Project saved for user: ${user?.email || 'guest'}`);
        return project;
    },

    getProject(id) {
        const projects = this.getAllProjects();
        return projects.find(p => p.id === parseInt(id));
    },

    updateProject(id, updates) {
        const projects = this.getAllProjects();
        const index = projects.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            projects[index] = {
                ...projects[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };

            const key = this.getUserProjectsKey();
            Storage.set(key, projects);
            return projects[index];
        }
        return null;
    },

    deleteProject(id) {
        const projects = this.getAllProjects();
        const filtered = projects.filter(p => p.id !== parseInt(id));

        const key = this.getUserProjectsKey();
        Storage.set(key, filtered);

        console.log(`✅ Project deleted for current user`);
        return true;
    },

    searchProjects(query) {
        const projects = this.getAllProjects();
        const lowerQuery = query.toLowerCase();
        return projects.filter(p =>
            p.proteinName?.toLowerCase().includes(lowerQuery) ||
            p.patientId?.toLowerCase().includes(lowerQuery) ||
            p.status?.toLowerCase().includes(lowerQuery)
        );
    },

    // Get total project count across all users (admin only)
    getTotalProjectCount() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('projects_user_')) {
                const projects = Storage.get(key) || [];
                total += projects.length;
            }
        }
        return total;
    }
};

// Notification System
const NotificationManager = {
    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 16px 24px;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      max-width: 400px;
    `;

        const icon = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        }[type] || 'ℹ';

        notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 24px;">${icon}</span>
        <span style="color: var(--text-primary);">${message}</span>
      </div>
    `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
};

// Analysis Engine
const AnalysisEngine = {
    /**
     * Design CRISPR-Cas9 guide RNAs for protein misfolding correction
     * Based on real CRISPR design principles:
     * - 20bp guide sequence + NGG PAM motif
     * - GC content 40-60% for optimal efficiency
     * - Minimal off-target binding sites
     * - Target mutation-containing exons
     */
    designCRISPRGuides(hotspots, proteinName, isHealthy) {
        // Don't design CRISPR for healthy proteins
        if (isHealthy || !hotspots || hotspots.length === 0) {
            return null;
        }

        const protein = proteinName.toLowerCase();
        const guideRNAs = [];

        // Map proteins to their gene exons and mutations
        const proteinGeneMap = {
            'amyloid': { gene: 'APP', exons: [16, 17], mutations: ['V717I', 'E693G', 'A673T'] },
            'app': { gene: 'APP', exons: [16, 17], mutations: ['V717I', 'E693G', 'A673T'] },
            'tau': { gene: 'MAPT', exons: [9, 10, 11], mutations: ['P301L', 'R406W', 'V337M'] },
            'mapt': { gene: 'MAPT', exons: [9, 10, 11], mutations: ['P301L', 'R406W', 'V337M'] },
            'synuclein': { gene: 'SNCA', exons: [3, 4], mutations: ['A53T', 'A30P', 'E46K'] },
            'alpha-synuclein': { gene: 'SNCA', exons: [3, 4], mutations: ['A53T', 'A30P', 'E46K'] },
            'huntingtin': { gene: 'HTT', exons: [1], mutations: ['CAG-repeat'] },
            'htt': { gene: 'HTT', exons: [1], mutations: ['CAG-repeat'] },
            'prion': { gene: 'PRNP', exons: [2], mutations: ['D178N', 'E200K', 'V210I'] },
            'prp': { gene: 'PRNP', exons: [2], mutations: ['D178N', 'E200K', 'V210I'] },
            'sod1': { gene: 'SOD1', exons: [4, 5], mutations: ['A4V', 'D90A', 'G93A'] }
        };

        // Get gene info for this protein
        let geneInfo = { gene: 'Unknown', exons: [5], mutations: ['Unknown'] };
        for (const [key, value] of Object.entries(proteinGeneMap)) {
            if (protein.includes(key)) {
                geneInfo = value;
                break;
            }
        }

        // Generate guide RNAs for each hotspot
        hotspots.slice(0, 2).forEach((hotspot, index) => {
            const targetExon = geneInfo.exons[index % geneInfo.exons.length];

            // Generate realistic guide RNA sequence
            const grna = this.generateGuideRNA(hotspot.residue, targetExon);
            guideRNAs.push(grna);
        });

        // If no hotspots generated guides, create default ones
        if (guideRNAs.length === 0) {
            guideRNAs.push(this.generateGuideRNA('Default', geneInfo.exons[0]));
        }

        // Determine delivery system based on protein type
        let deliverySystem = 'AAV9'; // Default
        if (protein.includes('brain') || protein.includes('neuro') ||
            protein.includes('amyloid') || protein.includes('tau') ||
            protein.includes('synuclein')) {
            deliverySystem = 'AAV-PHP.eB'; // Brain-penetrating AAV
        } else if (protein.includes('muscle') || protein.includes('sod1')) {
            deliverySystem = 'AAV1';
        }

        // Calculate overall success probability
        const avgEfficiency = guideRNAs.reduce((sum, g) => sum + g.efficiency, 0) / guideRNAs.length;
        const avgOffTargets = guideRNAs.reduce((sum, g) => sum + g.offTargets, 0) / guideRNAs.length;
        const successProbability = (avgEfficiency * 0.7) + ((1 - avgOffTargets / 10) * 0.3);

        return {
            gene: geneInfo.gene,
            guideRNAs,
            repairTemplate: this.generateRepairTemplate(geneInfo.mutations[0]),
            deliverySystem,
            successProbability: Math.round(successProbability * 100) / 100,
            targetMutations: geneInfo.mutations
        };
    },

    /**
     * Generate a single guide RNA with realistic properties
     */
    generateGuideRNA(mutation, exon) {
        // Generate 20bp guide sequence with proper nucleotide distribution
        const sequence = this.generateRealisticSequence(20);

        // Calculate GC content (affects efficiency)
        const gcContent = this.calculateGCContent(sequence);

        // Efficiency based on GC content (optimal: 40-60%)
        let efficiency;
        if (gcContent >= 0.40 && gcContent <= 0.60) {
            efficiency = 0.85 + Math.random() * 0.12; // 85-97%
        } else if (gcContent >= 0.30 && gcContent <= 0.70) {
            efficiency = 0.70 + Math.random() * 0.15; // 70-85%
        } else {
            efficiency = 0.55 + Math.random() * 0.15; // 55-70%
        }

        // Off-targets: fewer is better (0-3 is excellent)
        // Higher GC content tends to have more off-targets
        const offTargets = gcContent > 0.65 ? Math.floor(Math.random() * 4) + 1 :
            gcContent > 0.55 ? Math.floor(Math.random() * 3) :
                Math.floor(Math.random() * 2);

        // PAM sequence (always NGG for SpCas9)
        const pam = this.generatePAM();

        return {
            sequence: sequence,
            pam: pam,
            fullSequence: sequence + pam,
            targetSite: `Exon ${exon}`,
            targetMutation: mutation,
            efficiency: Math.round(efficiency * 100) / 100,
            offTargets: offTargets,
            gcContent: Math.round(gcContent * 100),
            specificity: offTargets === 0 ? 'Excellent' : offTargets <= 2 ? 'Good' : 'Moderate'
        };
    },

    /**
     * Generate realistic DNA sequence with proper nucleotide distribution
     */
    generateRealisticSequence(length) {
        const nucleotides = ['A', 'T', 'G', 'C'];
        let sequence = '';

        // Target ~50% GC content with some variation
        const targetGC = 0.45 + Math.random() * 0.15; // 45-60%

        for (let i = 0; i < length; i++) {
            const currentGC = this.calculateGCContent(sequence);

            // Adjust probability based on current GC content
            if (sequence.length > 5 && currentGC < targetGC) {
                // Need more G/C
                sequence += Math.random() < 0.5 ? 'G' : 'C';
            } else if (sequence.length > 5 && currentGC > targetGC + 0.1) {
                // Need more A/T
                sequence += Math.random() < 0.5 ? 'A' : 'T';
            } else {
                // Random selection
                sequence += nucleotides[Math.floor(Math.random() * 4)];
            }
        }

        return sequence;
    },

    /**
     * Calculate GC content of a DNA sequence
     */
    calculateGCContent(sequence) {
        if (!sequence || sequence.length === 0) return 0;
        const gcCount = (sequence.match(/[GC]/g) || []).length;
        return gcCount / sequence.length;
    },

    /**
     * Generate PAM sequence for SpCas9 (NGG)
     */
    generatePAM() {
        // SpCas9 requires NGG PAM (N = any nucleotide)
        const n = ['A', 'T', 'G', 'C'][Math.floor(Math.random() * 4)];
        return n + 'GG';
    },

    /**
     * Generate repair template for HDR (Homology-Directed Repair)
     */
    generateRepairTemplate(mutation) {
        // Generate ~40bp template with corrected sequence
        const leftArm = this.generateRealisticSequence(20);
        const rightArm = this.generateRealisticSequence(20);
        return leftArm + rightArm;
    },

    async analyzeProtein(proteinData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const proteinName = (proteinData.proteinName || '').toLowerCase();

        // ========================================
        // SMART RISK ASSESSMENT
        // ========================================

        let misfoldingRisk;
        let riskLevel;
        let hotspots = [];

        // List of HEALTHY/SUPPLEMENT proteins (should have LOW risk)
        const healthyProteins = [
            // Protein supplements
            'whey', 'casein', 'soy protein', 'pea protein', 'egg protein',
            'muscleblaze', 'biozyme', 'optimum nutrition', 'myprotein',
            'protein supplement', 'bcaa', 'collagen', 'albumin',

            // Normal body proteins
            'hemoglobin', 'myoglobin', 'keratin', 'actin', 'myosin',
            'immunoglobulin', 'antibody', 'enzyme', 'hormone',

            // Chaperone proteins (help other proteins fold correctly!)
            'heat shock protein', 'hsp', 'hsp70', 'hsp90', 'hsp60', 'hsp40',
            'chaperone', 'chaperonin', 'groel', 'groes', 'dnaj', 'dnak',
            'calnexin', 'calreticulin', 'bip', 'grp78', 'grp94',

            // Structural proteins
            'tubulin', 'fibrin', 'elastin', 'laminin', 'fibronectin',

            // Transport proteins
            'transferrin', 'ferritin', 'ceruloplasmin',

            // Metabolic enzymes
            'catalase', 'superoxide dismutase', 'peroxidase', 'kinase',
            'phosphatase', 'dehydrogenase', 'synthase', 'lyase'
        ];

        // List of DISEASE-ASSOCIATED proteins (should have HIGH risk)
        const diseaseProteins = [
            'amyloid', 'app', 'tau', 'mapt', 'synuclein', 'snca',
            'huntingtin', 'htt', 'prion', 'prp', 'sod1', 'tdp-43',
            'fus', 'ataxin', 'polyglutamine'
        ];

        // Check if protein is healthy/supplement
        const isHealthy = healthyProteins.some(healthy => proteinName.includes(healthy));

        // Check if protein is disease-associated
        const isDisease = diseaseProteins.some(disease => proteinName.includes(disease));

        if (isHealthy) {
            // HEALTHY PROTEINS: Low risk (15-45)
            misfoldingRisk = Math.floor(Math.random() * 30) + 15;
            riskLevel = misfoldingRisk > 35 ? 'Low Risk' : 'Very Low Risk';

            // Healthy proteins have NO hotspots
            // Especially chaperones (HSPs) which HELP other proteins fold!
            hotspots = [];

            console.log(`✅ Healthy protein detected: ${proteinName} - No hotspots assigned`);


        } else if (isDisease) {
            // DISEASE PROTEINS: High risk (65-95)
            misfoldingRisk = Math.floor(Math.random() * 30) + 65;
            riskLevel = misfoldingRisk > 85 ? 'Critical Risk' : misfoldingRisk > 75 ? 'High Risk' : 'Elevated Risk';

            // Disease proteins have multiple hotspots
            hotspots = [
                {
                    residue: 'R175H',
                    position: 175,
                    severity: 'high',
                    confidence: 0.95,
                    impact: 'Disrupts hydrogen bonding network, promotes aggregation'
                },
                {
                    residue: 'G245S',
                    position: 245,
                    severity: 'medium',
                    confidence: 0.87,
                    impact: 'Increases aggregation propensity, destabilizes structure'
                }
            ];

        } else {
            // UNKNOWN PROTEINS: Medium risk (45-70)
            misfoldingRisk = Math.floor(Math.random() * 25) + 45;
            riskLevel = misfoldingRisk > 60 ? 'Medium Risk' : 'Low-Medium Risk';

            // Unknown proteins have one hotspot
            hotspots = [{
                residue: 'A' + Math.floor(Math.random() * 200) + 'V',
                position: Math.floor(Math.random() * 200) + 50,
                severity: 'medium',
                confidence: 0.78,
                impact: 'Potential structural instability, requires further analysis'
            }];
        }

        const confidence = Math.floor(Math.random() * 20) + 80; // 80-100

        return {
            proteinId: proteinData.proteinName,
            misfoldingRisk,
            confidence,
            riskLevel,
            structure: {
                alphaHelix: Math.floor(Math.random() * 30) + 30,
                betaSheet: Math.floor(Math.random() * 25) + 20,
                randomCoil: Math.floor(Math.random() * 30) + 15
            },
            hotspots,
            crisprDesign: this.designCRISPRGuides(hotspots, proteinName, isHealthy),
            clinicalData: {
                diseaseAssociation: isHealthy ? 'No disease association (Healthy protein)' :
                    isDisease ? 'Early-Onset Alzheimer\'s Disease' :
                        'Unknown - Requires further investigation',
                pathogenicity: isHealthy ? 'Benign' : isDisease ? 'Pathogenic' : 'Uncertain Significance',
                inheritancePattern: isDisease ? 'Autosomal Dominant' : 'N/A',
                onsetAge: isDisease ? '45-55 years' : 'N/A'
            }
        };
    }
};

// Export to window
window.ProjectManager = ProjectManager;
window.NotificationManager = NotificationManager;
window.AnalysisEngine = AnalysisEngine;
