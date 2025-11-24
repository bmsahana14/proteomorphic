# Technology Stack & Software Requirements

## 📚 Technology Stack

### **Frontend Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | Latest | Structure and semantic markup for web pages |
| **CSS3** | Latest | Styling, animations, and responsive design |
| **JavaScript (ES6+)** | Latest | Client-side logic and interactivity |
| **3Dmol.js** | 2.0+ | Interactive 3D protein structure visualization |

### **Backend/Logic Layer**

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Analysis Engine** | Custom JavaScript | Protein risk assessment algorithms |
| **CRISPR Design Module** | Custom JavaScript | Guide RNA generation with PAM sequences |
| **Hotspot Detection** | Custom JavaScript | Mutation identification and severity analysis |
| **Authentication** | JavaScript + LocalStorage | User session management |

### **Data Storage**

| Technology | Purpose |
|------------|---------|
| **LocalStorage** | Browser-based data persistence for user projects |
| **JSON** | Data serialization format for analysis results |
| **Session Storage** | Temporary session data management |

### **External APIs & Databases**

| Service | Purpose | Access Method |
|---------|---------|---------------|
| **UniProt API** | Protein sequence and metadata retrieval | REST API (HTTPS) |
| **PDB (Protein Data Bank)** | 3D protein structure files | Direct file download |
| **AlphaFold Database** | AI-predicted protein structures | Web links/references |
| **NCBI Protein** | Alternative protein data source | REST API (HTTPS) |

### **IoT Integration** (Optional)

| Component | Technology | Purpose |
|-----------|------------|---------|
| **ESP32 Microcontroller** | Arduino/C++ | Sensor data collection |
| **DHT22 Sensor** | Temperature/Humidity | Environmental monitoring |
| **Pulse Sensor** | Analog | Heart rate monitoring |
| **Web Serial API** | JavaScript | Browser-to-device communication |

---

## 💻 Software Requirements

### **Development Environment**

| Software | Version | Required/Optional | Purpose |
|----------|---------|-------------------|---------|
| **Web Browser** | Chrome 90+, Firefox 88+, Edge 90+ | **Required** | Running the application |
| **Text Editor/IDE** | VS Code, Sublime, Atom | **Required** | Code editing |
| **Live Server** | Any HTTP server | **Required** | Local development server |
| **Git** | 2.0+ | Optional | Version control |

### **Recommended: Visual Studio Code Extensions**

| Extension | Purpose |
|-----------|---------|
| **Live Server** | Local development server with auto-reload |
| **HTML CSS Support** | IntelliSense for HTML/CSS |
| **JavaScript (ES6) code snippets** | Code completion |
| **Prettier** | Code formatting |

---

## 🖥️ System Requirements

### **Minimum Requirements**

| Component | Specification |
|-----------|---------------|
| **Operating System** | Windows 10, macOS 10.14+, Linux (Ubuntu 18.04+) |
| **Processor** | Intel Core i3 or equivalent |
| **RAM** | 4 GB |
| **Storage** | 500 MB free space |
| **Internet Connection** | Required for API access |
| **Browser** | Chrome 90+, Firefox 88+, Edge 90+ |

### **Recommended Requirements**

| Component | Specification |
|-----------|---------------|
| **Operating System** | Windows 11, macOS 12+, Linux (Ubuntu 22.04+) |
| **Processor** | Intel Core i5 or equivalent |
| **RAM** | 8 GB or more |
| **Storage** | 1 GB free space |
| **Internet Connection** | Broadband (5 Mbps+) |
| **Browser** | Latest Chrome or Edge |

---

## 📦 Dependencies & Libraries

### **JavaScript Libraries**

```javascript
// Core Dependencies
- 3Dmol.js (v2.0+)          // 3D molecular visualization
- No additional npm packages required (vanilla JavaScript)
```

### **External Resources**

```
// Fonts
- Google Fonts: Inter (400, 500, 600, 700, 800)

// APIs
- UniProt REST API: https://rest.uniprot.org/
- NCBI E-utilities: https://eutils.ncbi.nlm.nih.gov/
- PDB Files: https://files.rcsb.org/download/
```

---

## 🔧 Development Tools

### **Required Tools**

1. **Code Editor**
   - Visual Studio Code (Recommended)
   - Sublime Text
   - Atom
   - Any modern text editor

2. **Web Server**
   - VS Code Live Server extension
   - Python HTTP Server: `python -m http.server`
   - Node.js http-server: `npx http-server`
   - XAMPP/WAMP (for Windows)

3. **Web Browser**
   - Google Chrome (Recommended for DevTools)
   - Mozilla Firefox
   - Microsoft Edge

### **Optional Tools**

1. **Version Control**
   - Git
   - GitHub Desktop

2. **Testing Tools**
   - Browser DevTools (F12)
   - Lighthouse (Performance testing)

3. **Design Tools**
   - Figma (UI mockups)
   - Adobe XD (Prototyping)

---

## 🌐 Browser Compatibility

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| **Google Chrome** | 90+ | ✅ Fully Supported |
| **Mozilla Firefox** | 88+ | ✅ Fully Supported |
| **Microsoft Edge** | 90+ | ✅ Fully Supported |
| **Safari** | 14+ | ⚠️ Partial (Web Serial API not supported) |
| **Opera** | 76+ | ✅ Fully Supported |

### **Required Browser Features**

- ✅ ES6+ JavaScript support
- ✅ LocalStorage API
- ✅ Fetch API
- ✅ WebGL (for 3D visualization)
- ⚠️ Web Serial API (optional, for IoT features)

---

## 📁 Project Structure

```
proteiomorpic/
├── index.html              # Landing page
├── logo.png               # Application logo
├── css/
│   ├── variables.css      # CSS custom properties
│   ├── global.css         # Global styles
│   └── components.css     # Reusable components
├── js/
│   ├── auth.js           # Authentication logic
│   ├── utils.js          # Analysis engine & utilities
│   ├── chatbot.js        # AI chatbot integration
│   └── report-data-loader.js  # Report data handler
├── auth/
│   ├── login.html        # Login page
│   └── signup.html       # Registration page
├── dashboard/
│   └── index.html        # User dashboard
├── analysis/
│   └── input.html        # Analysis input form
├── report/
│   └── view.html         # Analysis report viewer
├── iot-monitoring.html   # IoT sensor dashboard
├── knowledge.html        # Knowledge center
└── images/               # Generated diagrams
```

---

## 🚀 Installation & Setup

### **Step 1: Clone/Download Project**
```bash
# Option 1: Git clone (if using version control)
git clone <repository-url>

# Option 2: Download ZIP
# Extract to desired location
```

### **Step 2: Install VS Code (Recommended)**
1. Download from https://code.visualstudio.com/
2. Install Live Server extension
3. Open project folder in VS Code

### **Step 3: Start Development Server**

**Using VS Code Live Server:**
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Browser opens automatically at `http://localhost:5500`

**Using Python:**
```bash
cd "path/to/proteiomorpic/major project"
python -m http.server 8000
# Open browser to http://localhost:8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
# Open browser to http://localhost:8000
```

### **Step 4: Access Application**
- Open browser to `http://localhost:5500` (or your server port)
- Create account or use demo mode
- Start analyzing proteins!

---

## 🔒 Security Considerations

| Aspect | Implementation |
|--------|----------------|
| **Authentication** | Client-side validation with session management |
| **Data Storage** | LocalStorage (client-side only) |
| **API Calls** | HTTPS only for external services |
| **Input Validation** | Sanitization of user inputs |
| **XSS Protection** | Content Security Policy headers |

---

## 📊 Performance Optimization

| Technique | Implementation |
|-----------|----------------|
| **Code Minification** | Minified CSS/JS for production |
| **Lazy Loading** | 3D structures loaded on demand |
| **Caching** | Browser caching for static assets |
| **Async Operations** | Non-blocking API calls |
| **Debouncing** | Input validation optimization |

---

## 🆘 Troubleshooting

### **Common Issues**

**Issue: "Cannot access application"**
- ✅ Solution: Must use a web server (not file:// protocol)
- Use Live Server or Python HTTP server

**Issue: "3D viewer not loading"**
- ✅ Solution: Check internet connection (3Dmol.js loads from CDN)
- Ensure WebGL is enabled in browser

**Issue: "API calls failing"**
- ✅ Solution: Check internet connection
- Verify CORS is not blocking requests
- Try different protein ID

**Issue: "LocalStorage full"**
- ✅ Solution: Clear old analysis data from dashboard
- Browser limit: ~5-10MB per domain

---

## 📚 Additional Resources

### **Documentation**
- 3Dmol.js: https://3dmol.csb.pitt.edu/
- UniProt API: https://www.uniprot.org/help/api
- PDB Format: https://www.wwpdb.org/documentation/file-format

### **Learning Resources**
- JavaScript ES6: https://javascript.info/
- Web APIs: https://developer.mozilla.org/
- Protein Structure: https://www.rcsb.org/

---

## ✅ Summary

**Core Technologies:**
- HTML5, CSS3, JavaScript (ES6+)
- 3Dmol.js for visualization
- LocalStorage for data persistence

**External Services:**
- UniProt API (protein data)
- PDB (3D structures)
- AlphaFold (AI predictions)

**Development:**
- Any modern code editor
- Local web server required
- Modern browser (Chrome/Firefox/Edge)

**No Installation Required:**
- Pure web application
- No backend server needed
- No database setup required
- Works offline (after initial load)

---

**Last Updated:** November 2025  
**Project:** Proteomorphic - AI-Based Protein Misfolding Analysis Platform
