# 🧬 Proteomorphic

> **AI-Powered Protein Misfolding Analysis & CRISPR Therapeutic Design Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

A comprehensive web-based platform for analyzing protein misfolding risks, detecting pathogenic mutations, and designing CRISPR-Cas9 therapeutic interventions for neurodegenerative diseases.

---

## 🎯 Overview

**Proteomorphic** is an advanced bioinformatics tool that combines AI-driven analysis with molecular biology to:

- 🔬 **Analyze protein structures** for misfolding risks
- 🧬 **Detect mutation hotspots** associated with diseases
- 💉 **Design CRISPR-Cas9 guide RNAs** for therapeutic interventions
- 📊 **Generate comprehensive reports** with 3D visualizations
- 🏥 **Support clinical decision-making** for neurodegenerative disorders

### Key Features

✅ **Smart Protein Recognition** - Automatically identifies healthy vs. disease-associated proteins  
✅ **Real-time Risk Assessment** - AI-powered misfolding risk calculation  
✅ **3D Structure Visualization** - Interactive protein structure viewer using 3Dmol.js  
✅ **CRISPR Guide RNA Design** - Scientifically accurate gRNA generation with PAM sequences  
✅ **Clinical Interpretation** - Disease association and pathogenicity assessment  
✅ **IoT Integration** - Real-time patient monitoring with ESP32 sensors  
✅ **AI Chatbot Assistant** - Interactive help and protein information  

---

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Edge 90+)
- Local web server (Live Server, Python HTTP server, or Node.js)
- Internet connection (for API access)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bmsahana14/proteomorphic.git
   cd proteomorphic
   ```

2. **Start a local server**

   **Option A: Using VS Code Live Server**
   - Install the Live Server extension
   - Right-click `index.html` → "Open with Live Server"

   **Option B: Using Python**
   ```bash
   python -m http.server 8000
   ```

   **Option C: Using Node.js**
   ```bash
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

4. **Create an account or use demo mode**

---

## 📸 Screenshots

### Dashboard
![Dashboard](images/dashboard_preview.png)
*User dashboard showing analysis history and quick actions*

### Analysis Report
![Report](images/report_preview.png)
*Comprehensive protein analysis with 3D visualization and CRISPR design*

### 3D Protein Viewer
![3D Viewer](images/3d_viewer_preview.png)
*Interactive 3D protein structure visualization*

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Presentation Layer                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │Dashboard │ │ Analysis │ │  Report  │ │IoT Monitor│ │
│  │          │ │  Input   │ │  Viewer  │ │          │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              Core Logic / Backend                       │
│  ┌────────────────┐ ┌────────────────┐ ┌─────────────┐ │
│  │ Risk Assessment│ │ CRISPR Design  │ │  Hotspot    │ │
│  │   Algorithm    │ │    Module      │ │  Detection  │ │
│  └────────────────┘ └────────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────┘
         ↕                                        ↕
┌──────────────────┐                    ┌──────────────────┐
│ External Services│                    │  Data Storage    │
│ • UniProt API    │                    │ • User Projects  │
│ • AlphaFold DB   │                    │ • Analysis Data  │
│ • PDB Data       │                    │ • LocalStorage   │
└──────────────────┘                    └──────────────────┘
```

---

## 🔬 How It Works

### 1. **Protein Input**
Users can input proteins via:
- Protein name (e.g., "Amyloid Beta", "HSP70")
- UniProt ID (e.g., "P05067")
- PDB ID (e.g., "1AAP")

### 2. **AI Analysis Pipeline**

```
Input → Structure Parsing → Hotspot Detection → Risk Calculation → CRISPR Design
```

- **Structure Parsing**: Analyzes alpha-helix and beta-sheet composition
- **Hotspot Detection**: Identifies pathogenic mutations
- **Risk Calculation**: Computes misfolding probability (0-100)
- **CRISPR Design**: Generates guide RNAs with PAM sequences

### 3. **Report Generation**

The system generates a comprehensive report including:
- ✅ Risk score and folding status
- ✅ 3D protein structure visualization
- ✅ Mutation hotspots table
- ✅ Clinical interpretation
- ✅ CRISPR therapeutic protocol
- ✅ Disease associations

---

## 💻 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Client-side logic
- **3Dmol.js** - 3D molecular visualization

### Core Logic
- **Custom AI Algorithms** - Risk assessment and analysis
- **CRISPR Design Engine** - Guide RNA generation
- **Hotspot Detection** - Mutation identification

### Data & APIs
- **LocalStorage** - Client-side data persistence
- **UniProt API** - Protein sequence data
- **PDB** - 3D structure files
- **AlphaFold** - AI-predicted structures

### Optional
- **ESP32** - IoT sensor integration
- **Web Serial API** - Device communication

---

## 📊 Supported Proteins

### Disease-Associated Proteins
- **Amyloid Beta (APP)** - Alzheimer's disease
- **Tau (MAPT)** - Frontotemporal dementia
- **Alpha-Synuclein (SNCA)** - Parkinson's disease
- **Huntingtin (HTT)** - Huntington's disease
- **Prion (PRNP)** - Creutzfeldt-Jakob disease
- **SOD1** - ALS (Lou Gehrig's disease)

### Healthy Proteins
- **Heat Shock Proteins (HSP70, HSP90)** - Molecular chaperones
- **Protein Supplements** - Whey, casein, MuscleBlaze
- **Normal Body Proteins** - Hemoglobin, myoglobin, actin
- **Enzymes** - Catalase, superoxide dismutase

---

## 🧬 CRISPR Design Features

Our CRISPR module generates scientifically accurate guide RNAs:

- ✅ **20bp guide sequences** with proper nucleotide distribution
- ✅ **NGG PAM motifs** (required for SpCas9)
- ✅ **GC content analysis** (40-60% optimal)
- ✅ **Off-target prediction** (0-3 off-targets)
- ✅ **Protein-specific gene mapping** (APP, MAPT, SNCA, etc.)
- ✅ **Mutation-specific targeting**
- ✅ **Tissue-specific delivery vectors** (AAV-PHP.eB for brain)

### Example Output

```
CRISPR-Cas9 Gene Therapy Protocol (APP Gene)

Guide RNA Design:
┌─────────────────────────────────────────────────────────┐
│ gRNA Sequence              │ Target  │ Eff. │ Off-Targets│
├─────────────────────────────────────────────────────────┤
│ GCATCGATCGTAGCTAGCTA + AGG │ Exon 16 │ 92% │ 1 (Good)   │
│ GC: 55%                    │ V717I   │     │            │
└─────────────────────────────────────────────────────────┘

Delivery Vector: AAV-PHP.eB (brain-penetrating)
Success Rate: 89%
```

---

## 🔒 Security & Privacy

- ✅ Client-side authentication
- ✅ Local data storage (no server uploads)
- ✅ Input sanitization
- ✅ HTTPS API calls only
- ✅ No personal health data transmitted

---

## 📱 IoT Integration

Connect ESP32 sensors for real-time patient monitoring:

- **Temperature Sensor (DHT22)** - Body temperature
- **Pulse Sensor** - Heart rate monitoring
- **Environmental Monitoring** - Room conditions

Data is displayed in real-time on the IoT dashboard and can be linked to patient analysis records.

---

## 🤖 AI Chatbot

Interactive chatbot for:
- Protein information lookup
- Analysis guidance
- CRISPR explanation
- Disease information
- Technical support

---

## 📚 Documentation

- [Installation Guide](QUICK_START.md)
- [Technology Stack](TECH_STACK_AND_REQUIREMENTS.md)
- [Architecture Diagrams](ARCHITECTURE_IMAGES_GUIDE.md)
- [CRISPR Implementation](ACCURATE_CRISPR_IMPLEMENTATION.md)
- [IoT Integration](IOT_INTEGRATION.md)
- [Chatbot Guide](CHATBOT_INTEGRATION.md)

---

## 🧪 Testing

### Test Cases

**Test 1: Healthy Protein (HSP70)**
```
Expected:
- Risk Score: 15-45 (Low)
- Hotspots: 0
- Status: "Properly Folded"
- CRISPR: Hidden
```

**Test 2: Disease Protein (Amyloid Beta)**
```
Expected:
- Risk Score: 65-95 (High)
- Hotspots: 2+ (R175H, G245S)
- Status: "Misfolded"
- CRISPR: Shown with APP gene targeting
```

**Test 3: Protein Supplement (MuscleBlaze)**
```
Expected:
- Risk Score: 15-45 (Low)
- Hotspots: 0
- Clinical: "No disease association"
- CRISPR: Hidden
```

---

## 🛠️ Development

### Project Structure

```
proteiomorpic/
├── index.html              # Landing page
├── css/
│   ├── variables.css       # CSS custom properties
│   ├── global.css          # Global styles
│   └── components.css      # Reusable components
├── js/
│   ├── auth.js            # Authentication
│   ├── utils.js           # Analysis engine
│   ├── chatbot.js         # AI chatbot
│   └── report-data-loader.js  # Report handler
├── auth/                  # Login/signup pages
├── dashboard/             # User dashboard
├── analysis/              # Analysis input
├── report/                # Report viewer
├── images/                # Diagrams & assets
└── docs/                  # Documentation
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🎓 Educational Value

This project demonstrates:
- **Bioinformatics** - Protein structure analysis
- **Molecular Biology** - CRISPR-Cas9 gene editing
- **AI/ML** - Risk prediction algorithms
- **Web Development** - Modern frontend architecture
- **API Integration** - External database connectivity
- **IoT** - Hardware-software integration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Sahana BM**
- GitHub: [@bmsahana14](https://github.com/bmsahana14)
- Project: Proteomorphic - AI-Based Protein Misfolding Analysis Platform

---

## 🙏 Acknowledgments

- **UniProt** - Protein sequence database
- **PDB** - Protein structure data
- **AlphaFold** - AI protein structure predictions
- **3Dmol.js** - 3D visualization library
- **NCBI** - Biological databases

---

## 📞 Support

For questions or issues:
- 📧 Email: proteomorphic.support@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/bmsahana14/proteomorphic/issues)
- 📖 Docs: [Documentation](https://github.com/bmsahana14/proteomorphic/wiki)

---

## 🔮 Future Enhancements

- [ ] Machine learning model training
- [ ] Multi-protein complex analysis
- [ ] Cloud database integration
- [ ] Mobile app version
- [ ] Advanced CRISPR off-target analysis
- [ ] Integration with clinical databases
- [ ] Real-time collaboration features

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

---

<div align="center">

**Made with ❤️ for advancing protein science and therapeutic development**

[🌐 Website](https://proteomorphic.com) • [📚 Documentation](https://docs.proteomorphic.com) • [💬 Community](https://community.proteomorphic.com)

</div>
