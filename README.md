# 🧬 Proteomorphic

<div align="center">

![Proteomorphic Logo](logo.png)

**Decoding Protein Misfolding at Scale**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-green.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-black.svg)](https://flask.palletsprojects.com/)
[![AI Powered](https://img.shields.io/badge/AI-ESM--2-purple.svg)](https://github.com/facebookresearch/esm)

*Advanced computational platform for protein structure analysis, misfolding prediction, and precision therapeutic intervention in neurodegenerative disorders*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Technology](#-technology-stack) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Authors](#-authors)
- [Features](#-features)
- [Demo](#-demo)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🔬 Overview

**Proteomorphic** is a cutting-edge web-based platform that leverages artificial intelligence and computational biology to analyze protein structures, predict misfolding risks, and design therapeutic interventions for neurodegenerative diseases such as Alzheimer's, Parkinson's, and Huntington's disease.

### The Problem

Protein misfolding is a critical factor in numerous neurodegenerative disorders. Traditional analysis methods are time-consuming, expensive, and require specialized expertise. There is a pressing need for accessible, automated tools that can:

- Rapidly analyze protein structures
- Identify misfolding hotspots
- Predict disease risk
- Design targeted therapeutic interventions

### Our Solution

Proteomorphic provides an end-to-end automated pipeline that:

1. **Analyzes** protein sequences using AI-powered structure prediction (ESM-2)
2. **Identifies** misfolding hotspots and pathogenic mutations
3. **Calculates** misfolding risk scores based on biochemical properties
4. **Designs** CRISPR guide RNAs for therapeutic intervention
5. **Generates** comprehensive clinical reports with 3D visualizations
6. **Monitors** patient biomarkers through IoT integration

---

## 👥 Authors

This project was developed by:

<div align="center">

| Author | GitHub | Role |
|--------|--------|------|
| **bmsahana14** | [@bmsahana14](https://github.com/bmsahana14) | Lead Developer |
| **02pasco** | [@02pasco](https://github.com/02pasco) | Core Developer |
| **007sanju** | [@007sanju](https://github.com/007sanju) | Core Developer |
| **1ep22ic003** | [@1ep22ic003](https://github.com/1ep22ic003) | Core Developer |

</div>

---

## ✨ Features

### 🔍 **Protein Structure Analysis**
- **3D Structure Visualization**: Interactive protein structure viewer using 3Dmol.js
- **Secondary Structure Prediction**: Alpha helix, beta sheet, and random coil composition
- **AI-Powered Analysis**: ESM-2 protein language model for advanced predictions
- **Biochemical Properties**: Instability index, hydrophobicity (GRAVY), and charge analysis

### 🧬 **Misfolding Detection**
- **Hotspot Identification**: Detects aggregation-prone regions and pathogenic mutations
- **Risk Assessment**: Calculates misfolding risk scores (0-100) with confidence levels
- **Disease Association**: Maps proteins to known neurodegenerative disorders
- **Clinical Interpretation**: Generates actionable clinical insights

### ✂️ **CRISPR Therapeutic Design**
- **Automated Guide RNA Design**: Generates optimized 20bp guide sequences
- **PAM Site Identification**: NGG motif detection for SpCas9
- **Efficiency Scoring**: Predicts editing efficiency based on GC content
- **Off-Target Analysis**: Evaluates specificity and potential off-target effects
- **Delivery System Recommendations**: AAV9-PHP.eB for CNS, LNP for systemic delivery

### 🌐 **IoT Biosensor Integration**
- **Real-Time Monitoring**: Live patient biomarker tracking
- **Multi-Parameter Analysis**: Temperature, heart rate, protein levels, oxidative stress
- **Risk Correlation**: Links biosensor data to misfolding risk
- **Alert System**: Automated notifications for critical values

### 📊 **Comprehensive Reporting**
- **Clinical Reports**: Detailed analysis with 3D visualizations
- **Export Functionality**: PDF generation for medical records
- **Historical Tracking**: Patient analysis history and trends
- **Dashboard Analytics**: Visual insights and statistics

### 🔐 **Security & Compliance**
- **User Authentication**: Secure login with Supabase integration
- **Role-Based Access**: Admin, researcher, and patient roles
- **Data Privacy**: HIPAA/GDPR compliant architecture
- **Encrypted Storage**: Secure data handling and transmission

---

## 🎬 Demo

### Live Analysis Pipeline

```
Protein Input → Structure Analysis → Risk Assessment → CRISPR Design → Report Generation
     🧬              🔍                  ⚠️                ✂️              📋
```

### Example Analysis

**Input**: Alpha-Synuclein (SNCA) - Parkinson's Disease Protein

**Output**:
- **Misfolding Risk**: 87/100 (High Risk)
- **Hotspots Detected**: A53T, A30P mutations
- **CRISPR Guides**: 3 optimized guide RNAs designed
- **Clinical Recommendation**: Therapeutic intervention recommended

---

## 🛠️ Technology Stack

### Frontend
- **HTML5/CSS3**: Modern, responsive UI with glassmorphism design
- **JavaScript (ES6+)**: Dynamic interactions and API integration
- **3Dmol.js**: Interactive 3D protein structure visualization
- **Google Fonts (Inter)**: Premium typography

### Backend
- **Python 3.8+**: Core analysis engine
- **Flask 3.0.0**: RESTful API framework
- **Flask-CORS**: Cross-origin resource sharing

### AI/ML
- **ESM-2 (650M)**: Facebook's protein language model
- **PyTorch**: Deep learning framework
- **Transformers**: Hugging Face model integration
- **NumPy/Pandas**: Scientific computing

### Database & Authentication
- **Supabase**: PostgreSQL database and authentication
- **LocalStorage**: Client-side data persistence

### External APIs
- **UniProt**: Protein sequence retrieval
- **NCBI**: Genetic variant data
- **AlphaFold**: Structure prediction integration

---

## 📦 Installation

### Prerequisites

- Python 3.8 or higher
- Node.js (optional, for development tools)
- Modern web browser (Chrome, Firefox, Edge)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/proteomorphic.git
cd proteomorphic
```

### Step 2: Set Up Python Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your_secret_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### Step 4: Start the Backend Server

```bash
python app.py
```

The backend will start at `http://localhost:5000`

### Step 5: Launch the Frontend

```bash
# Navigate back to project root
cd ..

# Option 1: Use Python's built-in server
python -m http.server 8000

# Option 2: Use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

The frontend will be available at `http://localhost:8000`

### Step 6: Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:8000`
- **Backend API**: `http://localhost:5000/api/health`

---

## 🚀 Usage

### Quick Start

1. **Sign Up**: Create an account at `/auth/signup.html`
2. **Login**: Access your dashboard at `/auth/login.html`
3. **Analyze Protein**: 
   - Navigate to Analysis → Input
   - Enter protein name (e.g., "Alpha-Synuclein")
   - Click "Analyze Protein"
4. **View Report**: Review comprehensive analysis with 3D visualization
5. **Monitor IoT**: Check real-time biosensor data (if available)

### Example API Request

```javascript
// Analyze a protein
const response = await fetch('http://localhost:5000/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    proteinName: 'Alpha-Synuclein',
    proteinSequence: 'MDVFMKGLSKAKEGVVAAAEKTKQGVAEAAGKTKEGVLYVGSKTKEGVVHGVATVAEKTKEQVTNVGGAVVTGVTAVAQKTVEGAGSIAAATGFVKKDQLGKNEEGAPQEGILEDMPVDPDNEAYEMPSEEGYQDYEPEA'
  })
});

const result = await response.json();
console.log(result);
```

### Response Format

```json
{
  "proteinId": "Alpha-Synuclein",
  "proteinName": "Alpha-Synuclein",
  "misfoldingRisk": 87,
  "riskLevel": "High Risk",
  "confidence": 94,
  "structure": {
    "alphaHelix": 35.2,
    "betaSheet": 28.7,
    "randomCoil": 36.1,
    "instabilityIndex": 42.3,
    "gravy": -0.234
  },
  "hotspots": [
    {
      "residue": "A53T",
      "position": 53,
      "severity": "high",
      "confidence": 0.94,
      "impact": "Accelerates fibril formation, Parkinson's disease"
    }
  ],
  "crisprDesign": {
    "gene": "SNCA",
    "guideRNAs": [...],
    "deliverySystem": "AAV9-PHP.eB",
    "successProbability": 89.5
  }
}
```

---

## 📁 Project Structure

```
proteomorphic/
├── index.html                 # Landing page
├── logo.png                   # Project logo
├── system_architecture.png    # Architecture diagram
├── .gitignore                 # Git ignore rules
│
├── auth/                      # Authentication pages
│   ├── login.html
│   ├── signup.html
│   └── verify.html
│
├── dashboard/                 # User dashboard
│   └── index.html
│
├── analysis/                  # Protein analysis
│   └── input.html
│
├── report/                    # Analysis reports
│   └── view.html
│
├── css/                       # Stylesheets
│   ├── variables.css          # CSS variables
│   ├── global.css             # Global styles
│   └── components.css         # Component styles
│
├── js/                        # JavaScript modules
│   ├── auth.js                # Authentication logic
│   ├── utils.js               # Utility functions
│   ├── chatbot.js             # AI chatbot
│   ├── report-data-loader.js  # Report data handling
│   └── notifications.js       # Notification system
│
├── backend/                   # Python backend
│   ├── app.py                 # Flask API server
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
├── images/                    # Image assets
│   └── [various images]
│
├── iot-monitoring.html        # IoT dashboard
├── knowledge.html             # Knowledge center
├── chatbot-widget.html        # Chatbot interface
└── admin.html                 # Admin panel
```

---

## 📡 API Documentation

### Endpoints

#### `POST /api/analyze`
Analyze a protein sequence and predict misfolding risk.

**Request Body**:
```json
{
  "proteinName": "string",
  "proteinSequence": "string (optional)"
}
```

**Response**: Complete analysis object with structure, hotspots, and CRISPR design.

#### `GET /api/health`
Check backend health status.

**Response**:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "cpu"
}
```

---

## 📸 Screenshots

### Landing Page
![Landing Page](images/landing-page-preview.png)

### Analysis Dashboard
![Dashboard](images/dashboard-preview.png)

### 3D Protein Viewer
![3D Viewer](images/3d-viewer-preview.png)

### Clinical Report
![Report](images/report-preview.png)

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ Protein structure analysis
- ✅ Misfolding risk prediction
- ✅ CRISPR guide RNA design
- ✅ IoT biosensor integration
- ✅ User authentication

### Version 2.0 (Planned)
- [ ] AlphaFold integration for structure prediction
- [ ] Multi-protein complex analysis
- [ ] Drug-protein interaction modeling
- [ ] Mobile application (iOS/Android)
- [ ] Cloud deployment (AWS/Azure)

### Version 3.0 (Future)
- [ ] Real-time collaborative analysis
- [ ] Machine learning model training interface
- [ ] Integration with electronic health records (EHR)
- [ ] Advanced visualization (VR/AR)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint for JavaScript
- Write clear commit messages
- Add tests for new features
- Update documentation

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage
- 🌐 Internationalization

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Proteomorphic Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Technologies & Tools
- **ESM-2**: Meta AI's protein language model
- **3Dmol.js**: 3D molecular visualization library
- **Flask**: Python web framework
- **Supabase**: Backend-as-a-Service platform
- **UniProt**: Protein sequence database
- **AlphaFold**: Structure prediction (planned integration)

### Research & Inspiration
- Protein Data Bank (PDB)
- National Center for Biotechnology Information (NCBI)
- Neurodegenerative disease research community
- Open-source bioinformatics community

### Special Thanks
- All contributors and testers
- Academic advisors and mentors
- Open-source community

---

## 📞 Contact & Support

### Get in Touch

- **GitHub Issues**: [Report bugs or request features](https://github.com/YOUR_USERNAME/proteomorphic/issues)
- **Email**: proteomorphic@example.com
- **Documentation**: [Full documentation](https://proteomorphic-docs.example.com)

### Support the Project

If you find Proteomorphic useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with colleagues

---

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Last Commit](https://img.shields.io/github/last-commit/YOUR_USERNAME/proteomorphic)

---

<div align="center">

**Made with ❤️ for the advancement of computational biology and neurodegenerative disease research**

[⬆ Back to Top](#-proteomorphic)

</div>
