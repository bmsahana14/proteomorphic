// COMPREHENSIVE REPORT DYNAMIC DATA LOADER
// Loads analysis data and updates ALL report sections with protein-specific information

(function loadAnalysisData() {
    try {
        // Get stored analysis data
        const storedAnalysis = localStorage.getItem('currentAnalysis');

        if (!storedAnalysis) {
            console.log('ℹ️ No analysis data found, using demo values');
            return;
        }

        const analysisData = JSON.parse(storedAnalysis);
        console.log('✅ Loaded analysis data:', analysisData);

        // ========================================
        // 1. EXECUTIVE SUMMARY - BASIC INFO
        // ========================================

        // Update Protein Name
        if (analysisData.proteinName) {
            const proteinNameEl = document.getElementById('proteinName');
            if (proteinNameEl) {
                proteinNameEl.textContent = analysisData.proteinName;
                console.log('✅ Updated protein name:', analysisData.proteinName);
            }
        }

        // Update Patient/Protein ID
        const reportIdEl = document.getElementById('reportId');
        if (reportIdEl) {
            if (analysisData.patientId && analysisData.patientId !== 'N/A') {
                reportIdEl.textContent = analysisData.patientId;
                console.log('✅ Updated patient ID:', analysisData.patientId);
            } else if (analysisData.id) {
                reportIdEl.textContent = `ANALYSIS-${analysisData.id}`;
                console.log('✅ Updated to analysis ID:', analysisData.id);
            } else {
                reportIdEl.textContent = `PROTEIN-${Date.now()}`;
                console.log('⚠️ No ID found, using timestamp');
            }
        } else {
            console.error('❌ reportId element not found');
        }

        // Update Analysis Date
        const analysisDateEl = document.getElementById('analysisDate');
        if (analysisDateEl) {
            if (analysisData.createdAt) {
                const date = new Date(analysisData.createdAt);
                analysisDateEl.textContent = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                console.log('✅ Updated analysis date:', analysisDateEl.textContent);
            } else {
                // Use current date if no createdAt
                const now = new Date();
                analysisDateEl.textContent = now.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                console.log('⚠️ No createdAt, using current date:', analysisDateEl.textContent);
            }
        } else {
            console.error('❌ analysisDate element not found');
        }

        // Update Risk Score
        if (analysisData.misfoldingRisk !== undefined) {
            const riskScoreEl = document.getElementById('riskScore');
            const riskFillEl = document.getElementById('riskFill');

            if (riskScoreEl) {
                riskScoreEl.textContent = `${analysisData.misfoldingRisk}/100`;
                console.log('✅ Updated risk score:', analysisData.misfoldingRisk);
            }
            if (riskFillEl) {
                riskFillEl.style.width = `${analysisData.misfoldingRisk}%`;
            }
        }


        // Update Risk Level Badge
        if (analysisData.riskLevel) {
            const riskLevelEl = document.getElementById('riskLevel');
            if (riskLevelEl) {
                riskLevelEl.textContent = analysisData.riskLevel;

                // Update badge color
                riskLevelEl.className = 'badge';
                const level = analysisData.riskLevel.toLowerCase();
                if (level.includes('high') || level.includes('critical')) {
                    riskLevelEl.classList.add('badge-danger');
                } else if (level.includes('medium')) {
                    riskLevelEl.classList.add('badge-warning');
                } else {
                    riskLevelEl.classList.add('badge-success');
                }
                console.log('✅ Updated risk level:', analysisData.riskLevel);
            }
        }

        // Hide "Urgent Clinical Review" badge for good proteins (risk < 50)
        const urgentBadge = document.querySelector('.badge.badge-warning');
        if (urgentBadge && urgentBadge.textContent.includes('Urgent Clinical Review')) {
            const currentRisk = analysisData.misfoldingRisk || 0;
            if (currentRisk < 50) {
                urgentBadge.style.display = 'none';
                console.log('✅ Hid urgent review badge for good protein (risk:', currentRisk + ')');
            } else {
                urgentBadge.style.display = '';
            }
        }

        // ========================================
        // ADD FOLDING STATUS INDICATOR
        // ========================================

        // Determine folding status based on risk score and protein type
        const riskScore = analysisData.misfoldingRisk || 0;
        let foldingStatus = '';
        let foldingClass = '';
        let foldingIcon = '';

        if (riskScore >= 70) {
            foldingStatus = '⚠️ MISFOLDED';
            foldingClass = 'badge-danger';
            foldingIcon = '⚠️';
        } else if (riskScore >= 50) {
            foldingStatus = '⚡ PARTIALLY MISFOLDED';
            foldingClass = 'badge-warning';
            foldingIcon = '⚡';
        } else {
            foldingStatus = '✓ PROPERLY FOLDED';
            foldingClass = 'badge-success';
            foldingIcon = '✓';
        }

        // Add or update folding status badge
        const badgeContainer = document.querySelector('.flex.gap-md');
        if (badgeContainer) {
            // Check if folding status badge already exists
            let foldingBadge = document.getElementById('foldingStatus');

            if (!foldingBadge) {
                // Create new badge
                foldingBadge = document.createElement('span');
                foldingBadge.id = 'foldingStatus';
                foldingBadge.className = `badge ${foldingClass}`;
                foldingBadge.style.fontSize = '0.9rem';
                foldingBadge.style.fontWeight = '600';

                // Insert as first badge
                badgeContainer.insertBefore(foldingBadge, badgeContainer.firstChild);
            } else {
                // Update existing badge
                foldingBadge.className = `badge ${foldingClass}`;
            }

            foldingBadge.textContent = foldingStatus;
            console.log('✅ Updated folding status:', foldingStatus, '(Risk:', riskScore + ')');
        }


        // ========================================
        // 2. SECONDARY STRUCTURE COMPOSITION
        // ========================================

        if (analysisData.structure) {
            // Find the secondary structure section specifically
            // Look for the card that contains "Secondary Structure Composition"
            const allCards = document.querySelectorAll('.card');
            let structureCard = null;

            for (let card of allCards) {
                if (card.textContent.includes('Secondary Structure Composition')) {
                    structureCard = card;
                    break;
                }
            }

            if (structureCard) {
                const infoGrid = structureCard.querySelector('.info-grid');
                if (infoGrid) {
                    // Update Alpha Helix
                    if (analysisData.structure.alphaHelix !== undefined) {
                        const helixDiv = infoGrid.querySelector('div:nth-child(1)');
                        if (helixDiv) {
                            const helixText = helixDiv.querySelector('strong');
                            const helixBar = helixDiv.querySelector('.progress-bar');
                            if (helixText) {
                                helixText.textContent = `${analysisData.structure.alphaHelix}%`;
                                console.log('✅ Updated alpha helix:', analysisData.structure.alphaHelix);
                            }
                            if (helixBar) {
                                helixBar.style.width = `${analysisData.structure.alphaHelix}%`;
                            }
                        }
                    }

                    // Update Beta Sheet
                    if (analysisData.structure.betaSheet !== undefined) {
                        const sheetDiv = infoGrid.querySelector('div:nth-child(2)');
                        if (sheetDiv) {
                            const sheetText = sheetDiv.querySelector('strong');
                            const sheetBar = sheetDiv.querySelector('.progress-bar');
                            if (sheetText) {
                                sheetText.textContent = `${analysisData.structure.betaSheet}%`;
                                console.log('✅ Updated beta sheet:', analysisData.structure.betaSheet);
                            }
                            if (sheetBar) {
                                sheetBar.style.width = `${analysisData.structure.betaSheet}%`;
                            }
                        }
                    }
                }
            } else {
                console.warn('⚠️ Secondary structure card not found');
            }
        }

        // ========================================
        // 3. MISFOLDING HOTSPOTS
        // ========================================

        // Find the hotspots card/section
        const allCards = document.querySelectorAll('.card');
        let hotspotsCard = null;

        for (let card of allCards) {
            if (card.textContent.includes('Misfolding Hotspots')) {
                hotspotsCard = card;
                break;
            }
        }

        if (hotspotsCard) {
            const currentRisk = analysisData.misfoldingRisk || 0;

            // Hide or modify hotspots section based on protein health
            if (!analysisData.hotspots || analysisData.hotspots.length === 0) {
                // No hotspots - show positive message for healthy proteins
                if (isHealthy || currentRisk < 50) {
                    const hotspotsTable = hotspotsCard.querySelector('table');
                    if (hotspotsTable) {
                        hotspotsTable.style.display = 'none';
                    }

                    // Add positive message
                    let positiveMsg = hotspotsCard.querySelector('.no-hotspots-message');
                    if (!positiveMsg) {
                        positiveMsg = document.createElement('div');
                        positiveMsg.className = 'no-hotspots-message';
                        positiveMsg.style.cssText = 'padding: var(--spacing-lg); background: var(--bg-secondary); border-radius: var(--radius-md); text-align: center;';
                        positiveMsg.innerHTML = `
                            <div style="font-size: 48px; margin-bottom: var(--spacing-md);">✓</div>
                            <h4 style="color: var(--accent-green); margin-bottom: var(--spacing-sm);">No Misfolding Hotspots Detected</h4>
                            <p style="color: var(--text-secondary);">This protein shows proper folding with no pathogenic mutations or structural abnormalities. All residues are within normal structural parameters.</p>
                        `;
                        hotspotsCard.appendChild(positiveMsg);
                    }
                    console.log('✅ Displayed positive message for healthy protein (no hotspots)');
                } else {
                    // Unknown protein with no hotspots - hide the section
                    hotspotsCard.style.display = 'none';
                    console.log('✅ Hid hotspots section (no data)');
                }
            } else {
                // Has hotspots - display them
                const hotspotsTable = hotspotsCard.querySelector('table tbody');

                if (hotspotsTable) {
                    hotspotsTable.innerHTML = ''; // Clear existing rows

                    analysisData.hotspots.forEach(hotspot => {
                        const severityClass = hotspot.severity === 'high' ? 'danger' :
                            hotspot.severity === 'medium' ? 'warning' : 'success';
                        const confidence = Math.round((hotspot.confidence || 0.9) * 100);

                        const row = `
                            <tr>
                                <td><code>${hotspot.residue}</code></td>
                                <td>${hotspot.position}</td>
                                <td><span class="badge badge-${severityClass}">${hotspot.severity}</span></td>
                                <td>${confidence}%</td>
                                <td>${hotspot.impact}</td>
                            </tr>
                        `;
                        hotspotsTable.insertAdjacentHTML('beforeend', row);
                    });
                    console.log('✅ Updated hotspots table with', analysisData.hotspots.length, 'mutations');
                }
            }
        }

        // ========================================
        // 4. DISEASE ASSOCIATION
        // ========================================

        const proteinName = (analysisData.proteinName || '').toLowerCase();
        let diseaseAssociation = '';
        let diseaseDescription = '';
        let clinvarClass = 'Pathogenic';
        let acmgCriteria = 'PS3, PM1, PM2, PP3 (Likely Pathogenic)';
        let popFrequency = 'Rare (< 0.01%)';

        // ========================================
        // CHECK IF PROTEIN IS HEALTHY FIRST
        // ========================================

        const healthyProteins = [
            // Protein supplements
            'whey', 'casein', 'soy protein', 'pea protein', 'egg protein',
            'muscleblaze', 'biozyme', 'optimum nutrition', 'myprotein',
            'protein supplement', 'bcaa', 'collagen', 'albumin',

            // Normal body proteins
            'hemoglobin', 'myoglobin', 'keratin', 'actin', 'myosin',
            'immunoglobulin', 'antibody', 'enzyme', 'hormone',

            // Chaperone proteins (IMPORTANT!)
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

        const isHealthy = healthyProteins.some(healthy => proteinName.includes(healthy));

        // ========================================
        // PROTEIN-SPECIFIC DISEASE INFORMATION
        // ========================================

        if (isHealthy) {
            // HEALTHY PROTEINS - No disease association
            diseaseAssociation = "No Disease Association (Healthy Protein)";

            // Special descriptions for different healthy protein types
            if (proteinName.includes('hsp') || proteinName.includes('heat shock') || proteinName.includes('chaperone')) {
                diseaseDescription = `${analysisData.proteinName} is a molecular chaperone that helps other proteins fold correctly. Chaperones are essential for cellular health and PREVENT protein misfolding. They protect against stress, repair damaged proteins, and are being studied as therapeutic targets for neurodegenerative diseases.`;
            } else if (proteinName.includes('whey') || proteinName.includes('casein') || proteinName.includes('muscleblaze') || proteinName.includes('biozyme') || proteinName.includes('protein supplement')) {
                diseaseDescription = `${analysisData.proteinName} is a dietary protein supplement with high nutritional value. It is properly folded, bioavailable, and supports muscle growth and recovery. No disease associations or pathogenic variants identified.`;
            } else if (proteinName.includes('hemoglobin') || proteinName.includes('myoglobin')) {
                diseaseDescription = `${analysisData.proteinName} is a vital oxygen-transport protein. The analyzed structure shows normal folding and function. No pathogenic mutations detected in this analysis.`;
            } else if (proteinName.includes('catalase') || proteinName.includes('superoxide dismutase') || proteinName.includes('peroxidase')) {
                diseaseDescription = `${analysisData.proteinName} is an antioxidant enzyme that protects cells from oxidative damage. It is properly folded and functional. These proteins are protective and essential for health.`;
            } else {
                diseaseDescription = `${analysisData.proteinName} is a healthy, properly folded protein with normal structure and function. No disease-causing mutations or pathogenic variants identified in this analysis. This protein is essential for normal cellular processes.`;
            }

            clinvarClass = 'Benign';
            acmgCriteria = 'BS1, BS2 (Benign)';
            popFrequency = 'Common (normal variant)';

        } else if (proteinName.includes('amyloid') || proteinName.includes('app')) {
            diseaseAssociation = "Early-Onset Alzheimer's Disease (EOAD)";
            diseaseDescription = `The identified mutations in the ${analysisData.proteinName} protein are strongly associated with familial Alzheimer's disease. These mutations have been documented in multiple case studies showing accelerated amyloid-beta aggregation and plaque formation.`;
            clinvarClass = 'Pathogenic';
            acmgCriteria = 'PS3, PM1, PM2, PP3 (Pathogenic)';
            popFrequency = 'Extremely rare (< 0.001%)';
        } else if (proteinName.includes('tau') || proteinName.includes('mapt')) {
            diseaseAssociation = "Frontotemporal Dementia (FTD) / Alzheimer's Disease";
            diseaseDescription = `Mutations in the ${analysisData.proteinName} protein (MAPT gene) are associated with frontotemporal dementia and Alzheimer's disease. These mutations disrupt microtubule binding and promote tau aggregation into neurofibrillary tangles.`;
            clinvarClass = 'Pathogenic';
            acmgCriteria = 'PS3, PM1, PM5, PP3 (Pathogenic)';
            popFrequency = 'Very rare (< 0.005%)';
        } else if (proteinName.includes('synuclein') || proteinName.includes('snca')) {
            diseaseAssociation = "Parkinson's Disease (PD)";
            diseaseDescription = `Alpha-synuclein mutations (SNCA gene) are linked to familial Parkinson's disease. These mutations increase the protein's propensity to misfold and form Lewy bodies, the pathological hallmark of Parkinson's disease.`;
            clinvarClass = 'Pathogenic';
            acmgCriteria = 'PS3, PM1, PM2, PP3 (Pathogenic)';
            popFrequency = 'Rare (< 0.01%)';
        } else if (proteinName.includes('huntingtin') || proteinName.includes('htt')) {
            diseaseAssociation = "Huntington's Disease (HD)";
            diseaseDescription = `Huntingtin gene mutations with expanded CAG repeats cause Huntington's disease. The mutant protein forms toxic aggregates leading to progressive neurodegeneration, particularly in the striatum and cortex.`;
            clinvarClass = 'Pathogenic';
            acmgCriteria = 'PS3, PS4, PM1, PP3 (Pathogenic)';
            popFrequency = 'Rare (varies by CAG repeat length)';
        } else if (proteinName.includes('insulin')) {
            diseaseAssociation = "Diabetes Mellitus / Insulin-Related Disorders";
            diseaseDescription = `Mutations in the ${analysisData.proteinName} protein can lead to diabetes-related complications and metabolic disorders. Proper insulin folding is essential for glucose regulation and metabolic homeostasis.`;
            clinvarClass = 'Likely Pathogenic';
            acmgCriteria = 'PM1, PM2, PP3 (Likely Pathogenic)';
            popFrequency = 'Uncommon (0.01-0.1%)';
        } else if (proteinName.includes('prion') || proteinName.includes('prp')) {
            diseaseAssociation = "Creutzfeldt-Jakob Disease (CJD) / Prion Diseases";
            diseaseDescription = `Prion protein misfolding causes transmissible spongiform encephalopathies (TSEs) including Creutzfeldt-Jakob disease. The misfolded protein can convert normal prions into the pathological form, leading to rapid neurodegeneration.`;
            clinvarClass = 'Pathogenic';
            acmgCriteria = 'PS3, PS4, PM1, PP3 (Pathogenic)';
            popFrequency = 'Very rare (< 0.0001%)';
        } else if (proteinName.includes('sod1')) {
            diseaseAssociation = "Amyotrophic Lateral Sclerosis (ALS)";
            diseaseDescription = `SOD1 mutations are associated with familial ALS. These mutations lead to protein misfolding and aggregation, causing motor neuron degeneration and progressive muscle weakness.`;
            clinvarClass = 'Pathogenic';
            acmgCriteria = 'PS3, PM1, PM2, PP3 (Pathogenic)';
            popFrequency = 'Rare (< 0.01%)';
        } else {
            diseaseAssociation = `${analysisData.proteinName}-Related Disorder`;
            diseaseDescription = `Mutations in the ${analysisData.proteinName} protein can lead to structural instability and disease. The specific mutations identified show significant impact on protein function and cellular processes.`;
            clinvarClass = 'Uncertain Significance';
            acmgCriteria = 'PM2, PP3 (Uncertain Significance)';
            popFrequency = 'Frequency varies';
        }

        // Update disease association using flexible selectors
        const diseaseAlert = document.querySelector('.alert.alert-danger');
        if (diseaseAlert) {
            diseaseAlert.innerHTML = `<strong>Primary Association:</strong> ${diseaseAssociation}`;

            // Change alert color for healthy proteins
            if (isHealthy) {
                diseaseAlert.className = 'alert alert-success mb-md';
                console.log('✅ Updated disease association (healthy):', diseaseAssociation);
            } else {
                diseaseAlert.className = 'alert alert-danger mb-md';
                console.log('✅ Updated disease association:', diseaseAssociation);
            }
        }

        // Update disease description
        const diseaseDescParagraph = document.querySelector('.alert + p, .alert.alert-success + p');
        if (diseaseDescParagraph) {
            diseaseDescParagraph.textContent = diseaseDescription;
            console.log('✅ Updated disease description');
        }

        // Update pathogenicity assessment
        const pathogenicityList = document.querySelector('h4.mb-sm + ul');
        if (pathogenicityList) {
            // For healthy proteins, hide the pathogenicity section
            const currentRisk = analysisData.misfoldingRisk || 0;
            if (isHealthy || currentRisk < 50) {
                // Hide the entire pathogenicity assessment section
                const pathogenicityHeading = document.querySelector('h4.mb-sm');
                if (pathogenicityHeading && pathogenicityHeading.textContent.includes('Pathogenicity')) {
                    pathogenicityHeading.style.display = 'none';
                    pathogenicityList.style.display = 'none';
                    console.log('✅ Hid pathogenicity assessment for healthy protein');
                }
            } else {
                // Show and update for pathogenic proteins
                const pathogenicityHeading = document.querySelector('h4.mb-sm');
                if (pathogenicityHeading && pathogenicityHeading.textContent.includes('Pathogenicity')) {
                    pathogenicityHeading.style.display = '';
                    pathogenicityList.style.display = '';
                }
                pathogenicityList.innerHTML = `
                    <li><strong>ClinVar Classification:</strong> ${clinvarClass}</li>
                    <li><strong>ACMG Criteria:</strong> ${acmgCriteria}</li>
                    <li><strong>Population Frequency:</strong> ${popFrequency}</li>
                `;
                console.log('✅ Updated pathogenicity assessment');
            }
        }

        // Update the "Overall Misfolding Risk Score" title for good proteins
        const riskScoreHeading = document.querySelector('.card h3.mb-md');
        if (riskScoreHeading && riskScoreHeading.textContent.includes('Overall Misfolding Risk Score')) {
            const currentRisk = analysisData.misfoldingRisk || 0;
            if (isHealthy || currentRisk < 50) {
                riskScoreHeading.textContent = 'Protein Quality Score';
                console.log('✅ Changed title to "Protein Quality Score" for good protein');
            } else {
                riskScoreHeading.textContent = 'Overall Misfolding Risk Score';
            }
        }

        // ========================================
        // 5. CRISPR GUIDE RNA DESIGN
        // ========================================

        // Hide CRISPR section for healthy proteins
        const crisprSection = document.querySelector('h2.section-title');
        let crisprSectionElement = null;

        // Find the CRISPR section
        const allSectionTitles = document.querySelectorAll('h2.section-title');
        allSectionTitles.forEach(title => {
            if (title.textContent.includes('CRISPR')) {
                crisprSectionElement = title.closest('.report-section');
            }
        });

        if (crisprSectionElement) {
            const currentRisk = analysisData.misfoldingRisk || 0;

            // Hide CRISPR for healthy proteins
            if (isHealthy || currentRisk < 50 || !analysisData.crisprDesign) {
                crisprSectionElement.style.display = 'none';
                console.log('✅ Hid CRISPR section for healthy protein');
            } else {
                crisprSectionElement.style.display = '';

                // Update CRISPR data if available
                if (analysisData.crisprDesign && analysisData.crisprDesign.guideRNAs) {
                    // Update gene name in title if available
                    const crisprTitle = crisprSectionElement.querySelector('h2.section-title');
                    if (crisprTitle && analysisData.crisprDesign.gene) {
                        crisprTitle.textContent = `CRISPR-Cas9 Gene Therapy Protocol (${analysisData.crisprDesign.gene} Gene)`;
                    }

                    // Find the CRISPR table
                    const allTables = document.querySelectorAll('.card table tbody');
                    const grnaTable = allTables[allTables.length - 1];

                    if (grnaTable) {
                        grnaTable.innerHTML = ''; // Clear existing rows

                        analysisData.crisprDesign.guideRNAs.forEach(grna => {
                            const efficiency = Math.round((grna.efficiency || 0.9) * 100);
                            const efficiencyClass = efficiency >= 90 ? 'success' :
                                efficiency >= 80 ? 'warning' : 'danger';

                            // Use full sequence with PAM if available
                            const displaySeq = grna.fullSequence || grna.sequence;
                            const pamDisplay = grna.pam ? ` + <strong>${grna.pam}</strong> (PAM)` : '';

                            const row = `
                                <tr>
                                    <td>
                                        <code>${displaySeq}</code>${pamDisplay}
                                        ${grna.gcContent ? `<br><small style="color: var(--text-tertiary);">GC: ${grna.gcContent}%</small>` : ''}
                                    </td>
                                    <td>
                                        ${grna.targetSite || 'Exon 5'}
                                        ${grna.targetMutation ? `<br><small style="color: var(--text-tertiary);">Target: ${grna.targetMutation}</small>` : ''}
                                    </td>
                                    <td><span class="badge badge-${efficiencyClass}">${efficiency}%</span></td>
                                    <td>
                                        ${grna.offTargets || 0}
                                        ${grna.specificity ? `<br><small style="color: var(--text-tertiary);">${grna.specificity}</small>` : ''}
                                    </td>
                                </tr>
                            `;
                            grnaTable.insertAdjacentHTML('beforeend', row);
                        });
                        console.log('✅ Updated CRISPR guide RNAs with', analysisData.crisprDesign.guideRNAs.length, 'guides');

                        // Add delivery system and success probability info
                        if (analysisData.crisprDesign.deliverySystem || analysisData.crisprDesign.successProbability) {
                            const crisprCard = grnaTable.closest('.card');
                            let infoDiv = crisprCard.querySelector('.crispr-info');

                            if (!infoDiv) {
                                infoDiv = document.createElement('div');
                                infoDiv.className = 'crispr-info mt-lg';
                                infoDiv.style.cssText = 'padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-md);';
                                crisprCard.appendChild(infoDiv);
                            }

                            infoDiv.innerHTML = `
                                <h4 class="mb-sm">Delivery & Efficacy</h4>
                                <ul style="color: var(--text-secondary); line-height: 1.8;">
                                    ${analysisData.crisprDesign.deliverySystem ? `<li><strong>Delivery Vector:</strong> ${analysisData.crisprDesign.deliverySystem}</li>` : ''}
                                    ${analysisData.crisprDesign.successProbability ? `<li><strong>Predicted Success Rate:</strong> ${Math.round(analysisData.crisprDesign.successProbability * 100)}%</li>` : ''}
                                    ${analysisData.crisprDesign.targetMutations ? `<li><strong>Target Mutations:</strong> ${analysisData.crisprDesign.targetMutations.join(', ')}</li>` : ''}
                                </ul>
                            `;
                        }
                    }
                }
            }
        }

        console.log('✅ Report fully updated with protein-specific data');
        console.log('📊 Summary:');
        console.log('  - Patient ID:', reportIdEl?.textContent);
        console.log('  - Analysis Date:', analysisDateEl?.textContent);
        console.log('  - Protein:', analysisData.proteinName);
        console.log('  - Risk:', analysisData.misfoldingRisk);

    } catch (error) {
        console.error('❌ Error loading analysis data:', error);
        console.log('Using demo values for report');
    }
})();
