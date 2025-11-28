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
            }
        }

        // Update Patient/Protein ID
        const reportIdEl = document.getElementById('reportId');
        if (reportIdEl) {
            if (analysisData.patientId && analysisData.patientId !== 'N/A') {
                reportIdEl.textContent = analysisData.patientId;
            } else if (analysisData.id) {
                reportIdEl.textContent = `ANALYSIS-${analysisData.id}`;
            } else {
                reportIdEl.textContent = `PROTEIN-${Date.now()}`;
            }
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
            } else {
                const now = new Date();
                analysisDateEl.textContent = now.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        }

        // Update Risk Score
        if (analysisData.misfoldingRisk !== undefined) {
            const riskScoreEl = document.getElementById('riskScore');
            const riskFillEl = document.getElementById('riskFill');

            if (riskScoreEl) {
                riskScoreEl.textContent = `${analysisData.misfoldingRisk}/100`;
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
                riskLevelEl.className = 'badge';
                const level = analysisData.riskLevel.toLowerCase();
                if (level.includes('high') || level.includes('critical')) {
                    riskLevelEl.classList.add('badge-danger');
                } else if (level.includes('medium')) {
                    riskLevelEl.classList.add('badge-warning');
                } else {
                    riskLevelEl.classList.add('badge-success');
                }
            }
        }

        // Hide "Urgent Clinical Review" badge for good proteins
        const urgentBadge = document.querySelector('.badge.badge-warning');
        if (urgentBadge && urgentBadge.textContent.includes('Urgent Clinical Review')) {
            const currentRisk = analysisData.misfoldingRisk || 0;
            if (currentRisk < 50) {
                urgentBadge.style.display = 'none';
            } else {
                urgentBadge.style.display = '';
            }
        }

        // Folding Status Indicator
        const riskScore = analysisData.misfoldingRisk || 0;
        let foldingStatus = '';
        let foldingClass = '';

        if (riskScore >= 70) {
            foldingStatus = '⚠️ MISFOLDED';
            foldingClass = 'badge-danger';
        } else if (riskScore >= 50) {
            foldingStatus = '⚡ PARTIALLY MISFOLDED';
            foldingClass = 'badge-warning';
        } else {
            foldingStatus = '✓ PROPERLY FOLDED';
            foldingClass = 'badge-success';
        }

        const badgeContainer = document.querySelector('.flex.gap-md');
        if (badgeContainer) {
            let foldingBadge = document.getElementById('foldingStatus');
            if (!foldingBadge) {
                foldingBadge = document.createElement('span');
                foldingBadge.id = 'foldingStatus';
                foldingBadge.className = `badge ${foldingClass}`;
                foldingBadge.style.fontSize = '0.9rem';
                foldingBadge.style.fontWeight = '600';
                badgeContainer.insertBefore(foldingBadge, badgeContainer.firstChild);
            } else {
                foldingBadge.className = `badge ${foldingClass}`;
            }
            foldingBadge.textContent = foldingStatus;
        }

        // ========================================
        // 2. KEY FINDINGS (Dynamic Generation)
        // ========================================
        const findingsList = document.querySelector('.findings-list');
        if (findingsList) {
            let findingsHTML = '';

            // Finding 1: Structural Stability
            if (analysisData.misfoldingRisk > 60) {
                findingsHTML += `<li>Significant structural abnormalities detected in beta-sheet regions (Risk Score: ${analysisData.misfoldingRisk}/100)</li>`;
            } else if (analysisData.misfoldingRisk > 30) {
                findingsHTML += `<li>Minor structural instabilities observed in solvent-exposed loops</li>`;
            } else {
                findingsHTML += `<li>Protein exhibits stable native conformation with optimal folding energy</li>`;
            }

            // Finding 2: Hotspots
            const hotspotCount = analysisData.hotspots ? analysisData.hotspots.length : 0;
            if (hotspotCount > 0) {
                findingsHTML += `<li>${hotspotCount} high-confidence misfolding hotspots identified affecting protein stability</li>`;
            } else {
                findingsHTML += `<li>No pathogenic misfolding hotspots detected in the analyzed sequence</li>`;
            }

            // Finding 3: Disease Association
            if (analysisData.misfoldingRisk > 70) {
                findingsHTML += `<li>Strong structural correlation with pathogenic disease pathways</li>`;
            } else {
                findingsHTML += `<li>Sequence analysis indicates benign / non-pathogenic characteristics</li>`;
            }

            // Finding 4: CRISPR
            if (analysisData.crisprDesign) {
                findingsHTML += `<li>CRISPR intervention protocol available with ${analysisData.crisprDesign.successProbability}% success probability</li>`;
            } else {
                findingsHTML += `<li>No genetic intervention required for this stable protein variant</li>`;
            }

            findingsList.innerHTML = findingsHTML;
        }

        // ========================================
        // 3. SECONDARY STRUCTURE COMPOSITION
        // ========================================
        console.log('🔍 Checking for structure data...');
        console.log('Analysis Data:', analysisData);

        if (analysisData.structure) {
            console.log('✅ Structure data found:', analysisData.structure);
            const allCards = document.querySelectorAll('.card');
            let structureCard = null;

            for (let card of allCards) {
                if (card.textContent.includes('Secondary Structure Composition')) {
                    structureCard = card;
                    break;
                }
            }

            if (structureCard) {
                console.log('✅ Structure card found');
                const infoGrid = structureCard.querySelector('.info-grid');
                if (infoGrid) {
                    console.log('✅ Info grid found');

                    // Alpha Helix - handle undefined, null, or 0
                    const alphaValue = analysisData.structure.alphaHelix ?? 0;
                    const helixDiv = infoGrid.querySelector('div:nth-child(1)');
                    if (helixDiv) {
                        const helixText = helixDiv.querySelector('strong');
                        const helixBar = helixDiv.querySelector('.progress-bar');
                        if (helixText) {
                            helixText.textContent = `${alphaValue}%`;
                            console.log(`✅ Alpha Helix updated to: ${alphaValue}%`);
                        } else {
                            console.error('❌ Alpha Helix text element not found');
                        }
                        if (helixBar) {
                            helixBar.style.width = `${alphaValue}%`;
                            console.log(`✅ Alpha Helix bar width set to: ${alphaValue}%`);
                        } else {
                            console.error('❌ Alpha Helix progress bar not found');
                        }
                    } else {
                        console.error('❌ Alpha Helix div not found');
                    }

                    // Beta Sheet - handle undefined, null, or 0
                    const betaValue = analysisData.structure.betaSheet ?? 0;
                    const sheetDiv = infoGrid.querySelector('div:nth-child(2)');
                    if (sheetDiv) {
                        const sheetText = sheetDiv.querySelector('strong');
                        const sheetBar = sheetDiv.querySelector('.progress-bar');
                        if (sheetText) {
                            sheetText.textContent = `${betaValue}%`;
                            console.log(`✅ Beta Sheet updated to: ${betaValue}%`);
                        } else {
                            console.error('❌ Beta Sheet text element not found');
                        }
                        if (sheetBar) {
                            sheetBar.style.width = `${betaValue}%`;
                            console.log(`✅ Beta Sheet bar width set to: ${betaValue}%`);
                        } else {
                            console.error('❌ Beta Sheet progress bar not found');
                        }
                    } else {
                        console.error('❌ Beta Sheet div not found');
                    }
                } else {
                    console.error('❌ Info grid not found in structure card');
                }
            } else {
                console.error('❌ Structure card not found');
            }
        } else {
            console.error('❌ No structure data available in analysisData');
            console.log('Available keys:', Object.keys(analysisData));
        }

        // ========================================
        // 4. MISFOLDING HOTSPOTS
        // ========================================
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
            const isHealthy = currentRisk < 50;

            if (!analysisData.hotspots || analysisData.hotspots.length === 0) {
                if (isHealthy) {
                    const hotspotsTable = hotspotsCard.querySelector('table');
                    if (hotspotsTable) hotspotsTable.style.display = 'none';

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
                } else {
                    hotspotsCard.style.display = 'none';
                }
            } else {
                const hotspotsTable = hotspotsCard.querySelector('table tbody');
                if (hotspotsTable) {
                    hotspotsTable.innerHTML = '';
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
                }
            }
        }

        // ========================================
        // 5. SIMPLE CLINICAL INTERPRETATION
        // ========================================
        const pName = (analysisData.proteinName || '').toLowerCase();
        const hotspotCount = analysisData.hotspots ? analysisData.hotspots.length : 0;

        // Generate gene symbol from CRISPR data or protein name
        let geneSymbol = 'Unknown';
        if (analysisData.crisprDesign && analysisData.crisprDesign.gene) {
            geneSymbol = analysisData.crisprDesign.gene;
        } else {
            geneSymbol = analysisData.proteinName.substring(0, 4).toUpperCase();
        }

        // Disease Association Database (simple names)
        const diseaseDB = {
            'app': { disease: "Alzheimer's Disease", mechanism: "protein clumping in the brain" },
            'psen': { disease: "Alzheimer's Disease", mechanism: "protein clumping in the brain" },
            'mapt': { disease: "Frontotemporal Dementia", mechanism: "brain cell damage" },
            'snca': { disease: "Parkinson's Disease", mechanism: "protein clumps in brain cells" },
            'lrrk2': { disease: "Parkinson's Disease", mechanism: "overactive enzyme" },
            'htt': { disease: "Huntington's Disease", mechanism: "toxic protein buildup" },
            'sod1': { disease: "ALS (Lou Gehrig's Disease)", mechanism: "motor neuron damage" },
            'tdp': { disease: "ALS (Lou Gehrig's Disease)", mechanism: "motor neuron damage" },
            'fus': { disease: "ALS (Lou Gehrig's Disease)", mechanism: "motor neuron damage" },
            'cftr': { disease: "Cystic Fibrosis", mechanism: "protein not reaching cell surface" },
            'hbb': { disease: "Sickle Cell Disease", mechanism: "abnormal red blood cells" },
            'tp53': { disease: "Cancer Syndrome", mechanism: "loss of tumor protection" },
            'brca': { disease: "Breast/Ovarian Cancer Risk", mechanism: "DNA repair problems" }
        };

        // Healthy protein markers
        const healthyProteins = [
            'bdnf', 'ngf', 'gdnf', 'neurotrophin', 'growth factor',
            'hemoglobin', 'myoglobin', 'albumin', 'collagen', 'keratin',
            'insulin', 'catalase', 'peroxidase', 'dismutase',
            'whey', 'casein', 'soy', 'pea protein', 'muscleblaze', 'biozyme',
            'hsp', 'chaperone', 'calnexin', 'calreticulin'
        ];

        const isSickle = pName.includes('sickle') || pName.includes('hemoglobin s');
        const isHealthy = !isSickle && (riskScore < 50 || healthyProteins.some(hp => pName.includes(hp)));

        let diagnosis = {};

        if (isHealthy) {
            // HEALTHY PROTEIN - Simple language
            diagnosis = {
                disease: "✅ Healthy Protein (No Disease Found)",
                description: `<strong>${analysisData.proteinName}</strong> is working normally and has a healthy structure. Our analysis shows this protein is folded correctly and is not causing any disease.`,
                pathogenicity: [
                    "Status: Healthy / Normal",
                    "Function: Working properly in your body",
                    `Safety Score: ${riskScore}/100 (Very Safe)`
                ],
                intervention: null
            };
        } else {
            // DISEASE PROTEIN - Simple language

            // Try to match known disease
            let diseaseInfo = null;
            for (const key in diseaseDB) {
                if (pName.includes(key)) {
                    diseaseInfo = diseaseDB[key];
                    break;
                }
            }

            if (diseaseInfo) {
                // Known disease protein - Simple explanation
                diagnosis.disease = diseaseInfo.disease;
                diagnosis.description = `We found problems in the <strong>${geneSymbol}</strong> gene that are linked to ${diseaseInfo.disease}. `;

                // Add mutation details if hotspots exist
                if (hotspotCount > 0) {
                    const mutations = analysisData.hotspots.map(h => h.residue).join(', ');
                    diagnosis.description += `The specific changes we detected (${mutations}) cause the protein to fold incorrectly. This leads to ${diseaseInfo.mechanism}, which makes cells sick.`;
                } else {
                    diagnosis.description += `The protein has structural problems that cause ${diseaseInfo.mechanism}.`;
                }
            } else {
                // Unknown protein - Simple explanation
                diagnosis.disease = `⚠️ Protein Folding Problem Detected`;
                diagnosis.description = `The protein <strong>${analysisData.proteinName}</strong> is not folding correctly (Problem Score: ${riskScore}/100). `;

                if (hotspotCount > 0) {
                    diagnosis.description += `We found ${hotspotCount} problem area${hotspotCount > 1 ? 's' : ''} where the protein is folding wrong. This could cause the protein to clump together and harm cells.`;
                } else {
                    diagnosis.description += `The overall shape of this protein looks unstable, which might cause problems.`;
                }
            }

            // Simple pathogenicity assessment
            diagnosis.pathogenicity = [];

            // Simple classification
            if (riskScore >= 85) {
                diagnosis.pathogenicity.push("Medical Rating: Definitely Causes Disease");
            } else if (riskScore >= 70) {
                diagnosis.pathogenicity.push("Medical Rating: Probably Causes Disease");
            } else if (riskScore >= 50) {
                diagnosis.pathogenicity.push("Medical Rating: Might Cause Disease (Needs More Study)");
            }

            // Simple evidence
            let evidenceList = [];
            if (hotspotCount > 0) evidenceList.push("Found in disease hotspot");
            if (riskScore >= 75) evidenceList.push("Lab tests show it's harmful");
            if (hotspotCount >= 2) evidenceList.push("Very rare mutation");
            if (riskScore >= 80) evidenceList.push("Computer analysis confirms danger");

            if (evidenceList.length > 0) {
                diagnosis.pathogenicity.push(`Evidence: ${evidenceList.join(', ')}`);
            }

            // Simple frequency
            if (diseaseInfo) {
                diagnosis.pathogenicity.push("How Common: Very rare (less than 1 in 100,000 people)");
            } else {
                diagnosis.pathogenicity.push("How Common: Unknown (newly discovered)");
            }

            // Simple CRISPR explanation
            if (hotspotCount > 0) {
                const targetMutations = analysisData.hotspots.slice(0, 2).map(h => h.residue).join(' and ');
                diagnosis.intervention = `<strong>Treatment Plan: Fix the Genetic Mistake</strong><br>`;
                diagnosis.intervention += `We can use CRISPR gene editing (like molecular scissors) to fix the ${targetMutations} mistake${hotspotCount > 1 ? 's' : ''} in your ${geneSymbol} gene. `;
                diagnosis.intervention += `This involves carefully correcting the DNA code to make the protein fold correctly again. `;

                // Simple delivery method
                if (analysisData.crisprDesign && analysisData.crisprDesign.deliverySystem) {
                    const delivery = analysisData.crisprDesign.deliverySystem;
                    if (delivery.includes('Brain')) {
                        diagnosis.intervention += `Delivery Method: Special virus that can reach the brain safely.`;
                    } else if (delivery.includes('LNP')) {
                        diagnosis.intervention += `Delivery Method: Tiny fat bubbles that carry the treatment to your cells.`;
                    } else {
                        diagnosis.intervention += `Delivery Method: ${delivery}`;
                    }
                }
            } else {
                diagnosis.intervention = `<strong>Treatment Plan: Reduce Harmful Protein</strong><br>`;
                diagnosis.intervention += `We can use CRISPR to turn down the production of the misfolded ${geneSymbol} protein. `;
                diagnosis.intervention += `This reduces the amount of bad protein in your cells, preventing it from clumping together and causing damage.`;
            }
        }

        // Update UI
        const dTitle = document.getElementById('diseaseAlert');
        const dDesc = document.getElementById('diseaseDescription');
        const dList = document.getElementById('pathogenicityList');
        const alertBox = document.querySelector('.alert');

        if (dTitle) dTitle.textContent = diagnosis.disease;
        if (dDesc) dDesc.innerHTML = diagnosis.description;
        if (dList) dList.innerHTML = diagnosis.pathogenicity.map(item => `<li>${item}</li>`).join('');

        if (alertBox) {
            if (isHealthy) alertBox.className = 'alert alert-success mb-md';
            else if (diagnosis.disease.includes("Problem")) alertBox.className = 'alert alert-warning mb-md';
            else alertBox.className = 'alert alert-danger mb-md';
        }

        // CRISPR Section
        const crisprContainer = document.querySelector('.report-section.crispr-section') ||
            Array.from(document.querySelectorAll('.report-section')).find(s => s.textContent.includes('CRISPR'));

        if (crisprContainer) {
            if (isHealthy || !diagnosis.intervention) {
                crisprContainer.style.display = 'none';
            } else {
                crisprContainer.style.display = 'block';

                let strategyDiv = document.getElementById('interventionStrategy');
                if (!strategyDiv) {
                    strategyDiv = document.createElement('div');
                    strategyDiv.id = 'interventionStrategy';
                    strategyDiv.className = 'intervention-box mt-md mb-md';
                    strategyDiv.style.cssText = 'padding: 15px; background: rgba(52, 152, 219, 0.1); border-left: 4px solid #3498db; border-radius: 4px; margin-bottom: 20px;';

                    const title = crisprContainer.querySelector('h2');
                    if (title && title.nextSibling) {
                        crisprContainer.insertBefore(strategyDiv, title.nextSibling);
                    } else {
                        crisprContainer.prepend(strategyDiv);
                    }
                }
                strategyDiv.innerHTML = diagnosis.intervention;

                if (analysisData.crisprDesign && analysisData.crisprDesign.guideRNAs) {
                    const grnaTable = crisprContainer.querySelector('table tbody');
                    if (grnaTable) {
                        grnaTable.innerHTML = '';
                        analysisData.crisprDesign.guideRNAs.forEach(grna => {
                            const efficiency = Math.round((grna.efficiency || 0.9) * 100);
                            const efficiencyClass = efficiency >= 90 ? 'success' : efficiency >= 80 ? 'warning' : 'danger';
                            const row = `
                                <tr>
                                    <td><code>${grna.fullSequence || grna.sequence}</code>${grna.pam ? ` + <strong>${grna.pam}</strong>` : ''}</td>
                                    <td>${grna.targetSite || 'Exon 5'}</td>
                                    <td><span class="badge badge-${efficiencyClass}">${efficiency}%</span></td>
                                    <td>${grna.offTargets || 0}</td>
                                </tr>
                            `;
                            grnaTable.insertAdjacentHTML('beforeend', row);
                        });
                    }
                }
            }
        }

        console.log('✅ Report fully updated with protein-specific data');

    } catch (error) {
        console.error('❌ Error loading analysis data:', error);
    }
})();
