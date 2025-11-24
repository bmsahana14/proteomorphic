// Mock API Data
const MockAPI = {
    proteins: [
        { id: 'P04637', name: 'TP53', fullName: 'Tumor Protein P53', organism: 'Homo sapiens' },
        { id: 'P42212', name: 'APP', fullName: 'Amyloid Beta Precursor Protein', organism: 'Homo sapiens' },
        { id: 'P10636', name: 'MAPT', fullName: 'Microtubule-Associated Protein Tau', organism: 'Homo sapiens' },
        { id: 'P37840', name: 'SNCA', fullName: 'Alpha-Synuclein', organism: 'Homo sapiens' }
    ],

    getProteinStructure(proteinId) {
        return {
            proteinId,
            pdbId: `AF-${proteinId}-F1`,
            confidence: 92.5,
            misfoldingRisk: Math.random() * 100,
            structure: {
                alphaHelix: 45,
                betaSheet: 30,
                coil: 25
            },
            hotspots: [
                { residue: 'R175H', position: 175, severity: 'high', confidence: 0.95 },
                { residue: 'G245S', position: 245, severity: 'medium', confidence: 0.87 }
            ]
        };
    },

    getCRISPRDesign(mutation) {
        return {
            guideRNAs: [
                { sequence: 'GCTAGCTAGCTAGCTAGCTA', efficiency: 0.92, offTargets: 2 },
                { sequence: 'ATCGATCGATCGATCGATCG', efficiency: 0.88, offTargets: 1 }
            ],
            repairTemplate: 'ATCGATCGATCGATCGATCGATCGATCGATCG',
            deliverySystem: 'AAV9',
            successProbability: 0.85
        };
    }
};

window.MockAPI = MockAPI;
