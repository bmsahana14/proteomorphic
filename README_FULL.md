# 🧬 Proteomorphic: Project Master Guide

## 1. Project Overview
**Proteomorphic** is an AI-powered bioinformatics platform designed to analyze protein sequences for misfolding risks—a key factor in neurodegenerative diseases like Alzheimer's and Parkinson's. It goes beyond simple analysis by proposing precision CRISPR-Cas9 gene-editing strategies to correct pathogenic mutations.

### **Core Problem Solved**
Traditional protein analysis is slow and expensive. Proteomorphic provides an instant, AI-driven assessment of protein stability and suggests genetic interventions, bridging the gap between diagnosis and potential cure.

---

## 2. Technical Implementation (How We Built It)

The project uses a **Hybrid Architecture** combining a responsive frontend with a powerful Python AI backend.

### **A. Technology Stack**
*   **Frontend:** HTML5, CSS3 (Custom Variables), JavaScript (ES6+).
*   **Backend:** Python 3.x, Flask (API Framework).
*   **AI Engine:** ESM-2 (Evolutionary Scale Modeling) by Meta AI (Facebook).
*   **Bioinformatics:** BioPython (sequence parsing), PyTorch (AI tensor processing).
*   **Visualization:** 3Dmol.js (3D protein rendering).

### **B. Key Components & Code Logic**

#### **1. The AI Backend (`app.py`)**
This is the brain of the operation.
*   **ESM-2 Integration:** We use the `facebook/esm2_t33_650M_UR50D` model. It's a "Large Language Model" but for proteins. Instead of predicting the next word in a sentence, it predicts the structure and properties of amino acids.
*   **Rule-Based Fallback:** To ensure reliability, we implemented a robust fallback system. If the AI model fails to load (e.g., network issues), the system switches to "Rule-Based Mode," using biochemical rules (hydrophobicity, charge instability) to calculate risk.
*   **CRISPR Design:** The `design_crispr_guides` function identifies mutations and generates 20-nucleotide guide RNA sequences. It checks for "off-target" effects by calculating GC content (aiming for 40-60% for stability).

#### **2. The Frontend Logic (`report-data-loader.js`)**
*   **Dynamic Data Binding:** The frontend doesn't just show static HTML. It fetches JSON data from the backend and dynamically populates the DOM.
*   **Intelligent Rendering:** It checks if a protein is "Healthy" (e.g., Hemoglobin) or "Diseased" (e.g., APP).
    *   *If Healthy:* It hides the CRISPR section and shows a green "Low Risk" badge.
    *   *If Diseased:* It reveals the gene-editing protocols and red "High Risk" alerts.

#### **3. 3D Visualization**
*   We integrated **3Dmol.js** to render PDB (Protein Data Bank) files directly in the browser.
*   The system maps protein names to specific PDB IDs (e.g., Hemoglobin -> `1A3N`) to fetch and display the correct 3D structure.

---

## 3. How It Works (The Workflow)

1.  **Input:** User enters a protein name (e.g., "APP") or sequence.
2.  **Fetch:** The system connects to **UniProt/NCBI** databases to retrieve the exact amino acid sequence.
3.  **Analysis (The "Black Box"):**
    *   The sequence is sent to the Python backend.
    *   The AI model/Algorithm scans for "Hotspots" (regions prone to breaking/clumping).
    *   It calculates a **Misfolding Risk Score (0-100)**.
4.  **Intervention:** If high risk, the system designs CRISPR guide RNAs to target the specific genetic mutation causing the issue.
5.  **Report:** A comprehensive dashboard displays the Risk Score, 3D Structure, and CRISPR Protocol.

---

## 4. How to Run the Project (Step-by-Step)

### **Option A: The "Full Power" Mode (Backend + Frontend)**
*Best for demonstrations to show the Python console running.*

1.  **Start the Backend:**
    *   Open Terminal 1.
    *   `cd backend`
    *   `python app.py`
    *   *Wait until you see "Proteomorphic AI Backend Ready!"*

2.  **Start the Frontend:**
    *   Open Terminal 2.
    *   `python -m http.server 8081 --bind 127.0.0.1`

3.  **Access:**
    *   Open Browser: `http://127.0.0.1:8081`

### **Option B: The "Safe Demo" Mode (Frontend Only)**
*Best if the internet is slow or Python is acting up.*

1.  **Start Server:**
    *   Open Terminal.
    *   `python -m http.server 8081 --bind 127.0.0.1`
2.  **Access:**
    *   Open Browser: `http://127.0.0.1:8081`
    *   *The system automatically detects the backend is missing and uses built-in JavaScript simulation.*

---

## 5. Interview & Project Review Q&A

### **Q1: Why did you choose ESM-2 for the AI model?**
**Answer:** "I chose ESM-2 because it is a state-of-the-art protein language model. Unlike older methods that rely purely on physical simulations (which take days), ESM-2 uses deep learning to predict structure and function in milliseconds. It has been trained on over 250 million protein sequences, giving it a deep 'understanding' of biological patterns."

### **Q2: How does your system handle 'Healthy' proteins like Hemoglobin?**
**Answer:** "This was a critical accuracy fix. I implemented a logic layer that cross-references the input protein against a known database of healthy proteins. If a protein like Hemoglobin or BDNF is detected, the system suppresses the 'Disease Association' flags, assigns a low risk score based on its stable structure, and hides the CRISPR intervention panel, as gene editing is unnecessary for healthy proteins."

### **Q3: What is the 'Rule-Based Fallback' you mentioned?**
**Answer:** "In real-world software, reliability is key. If the AI model fails to load (due to server limits or network issues), my system doesn't crash. It seamlessly switches to a biochemical algorithm that calculates risk based on known factors like **Hydrophobicity** (water-repelling regions clump together) and **Instability Index** (frequency of unstable amino acids). This ensures the user always gets a result."

### **Q4: How accurate is the CRISPR design?**
**Answer:** "The CRISPR module is designed to be realistic. It doesn't just generate random letters. It looks for the specific mutation site, translates the amino acids back into DNA codons, and then searches for a 20-base-pair sequence ending in a 'PAM' site (NGG). It also calculates GC-content to ensure the guide RNA binds strongly enough to work."

### **Q5: What was the most challenging part of this project?**
**Answer:** "The biggest challenge was integrating the Python backend with the static HTML frontend while handling CORS (Cross-Origin Resource Sharing) issues. I solved this by building a robust Flask API that serves as a bridge, allowing the frontend to send asynchronous JSON requests to the Python engine and receive real-time analysis data."

### **Q6: Future improvements?**
**Answer:** "I plan to integrate **AlphaFold 3** for even more precise 3D structure prediction and add a 'Batch Analysis' feature to process entire genomes at once. I also want to move the database from local storage to a cloud-based SQL database for better scalability."
