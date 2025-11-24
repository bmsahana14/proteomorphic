// Proteomorphic Health & Medical Chatbot
class ProteomorphicChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.init();
    }

    initializeKnowledgeBase() {
        return {
            greetings: [
                "Hello! I'm your Proteomorphic Health Assistant. I can help with questions about protein-related diseases, symptoms, and treatments. How can I help you today?",
                "Hi there! I'm here to answer your health questions about protein misfolding diseases like Alzheimer's, Parkinson's, and more. What would you like to know?",
                "Welcome! I can provide information about neurodegenerative diseases, protein analysis, and health concerns. How may I assist you?"
            ],

            healthTopics: {
                // Alzheimer's Disease
                'alzheimer': "Alzheimer's disease is a progressive neurodegenerative disorder caused by abnormal protein accumulation (Amyloid Beta and Tau). Symptoms include memory loss, confusion, difficulty with daily tasks, and personality changes. Early signs: forgetting recent events, difficulty planning, confusion with time/place. Risk factors: age (65+), family history, genetics (APOE-e4 gene). While there's no cure, treatments can slow progression. Consult a neurologist if you notice persistent memory problems.",

                'alzheimer symptoms': "Early Alzheimer's symptoms: 1) Memory loss affecting daily life, 2) Difficulty planning or problem-solving, 3) Confusion with time or place, 4) Trouble understanding visual images, 5) Problems with words in speaking/writing, 6) Misplacing things, 7) Decreased judgment, 8) Withdrawal from social activities, 9) Mood/personality changes. If you notice 2+ symptoms, consult a doctor immediately.",

                'alzheimer treatment': "Current Alzheimer's treatments: 1) Medications: Donepezil, Rivastigmine (cholinesterase inhibitors), Memantine (NMDA antagonist), 2) Lifestyle: Regular exercise, Mediterranean diet, mental stimulation, social engagement, 3) Emerging therapies: Aducanumab (amyloid-targeting), CRISPR gene therapy (experimental). Early diagnosis improves treatment effectiveness. Always consult a neurologist for personalized treatment.",

                // Parkinson's Disease
                'parkinson': "Parkinson's disease is caused by alpha-synuclein protein misfolding in brain cells. Symptoms: tremors (shaking), rigidity (stiff muscles), bradykinesia (slow movement), postural instability. Early signs: slight tremor in one hand, small handwriting, loss of smell, sleep problems. Risk factors: age (60+), genetics, environmental toxins. Treatment includes medications (Levodopa), physical therapy, and in some cases, deep brain stimulation.",

                'parkinson symptoms': "Parkinson's symptoms: Motor: 1) Resting tremor (shaking when relaxed), 2) Muscle rigidity, 3) Slow movement, 4) Balance problems. Non-motor: 1) Depression, 2) Sleep disorders, 3) Constipation, 4) Loss of smell, 5) Cognitive changes. Symptoms usually start on one side. See a neurologist if you experience persistent tremors or movement difficulties.",

                'parkinson treatment': "Parkinson's treatments: 1) Medications: Levodopa/Carbidopa (gold standard), Dopamine agonists, MAO-B inhibitors, 2) Therapies: Physical therapy, occupational therapy, speech therapy, 3) Surgery: Deep brain stimulation (DBS) for advanced cases, 4) Lifestyle: Regular exercise, balanced diet, stress management. Treatment is personalized - consult a movement disorder specialist.",

                // Huntington's Disease
                'huntington': "Huntington's disease is a genetic disorder caused by mutant huntingtin protein. Symptoms: involuntary movements (chorea), cognitive decline, psychiatric problems. It's inherited - if a parent has it, you have 50% chance. Symptoms typically appear age 30-50. Genetic testing available. While incurable, treatments manage symptoms. Family counseling and genetic counseling recommended for at-risk individuals.",

                // General Health Queries
                'memory loss': "Memory loss can have many causes: 1) Normal aging (mild forgetfulness), 2) Alzheimer's disease (progressive), 3) Vitamin B12 deficiency, 4) Thyroid problems, 5) Depression, 6) Medication side effects, 7) Sleep deprivation. Concerning signs: forgetting recent events, getting lost in familiar places, difficulty with daily tasks. See a doctor for proper evaluation and diagnosis.",

                'tremor': "Tremors (shaking) can be caused by: 1) Essential tremor (most common, benign), 2) Parkinson's disease (resting tremor), 3) Anxiety/stress, 4) Caffeine, 5) Medications, 6) Thyroid problems. Parkinson's tremor: occurs at rest, starts one side, pill-rolling motion. Essential tremor: occurs during movement, both sides, improves with alcohol. See a neurologist for accurate diagnosis.",

                'brain health': "Tips for brain health: 1) Exercise regularly (30 min/day), 2) Eat Mediterranean diet (fish, vegetables, olive oil), 3) Stay mentally active (puzzles, learning), 4) Get quality sleep (7-8 hours), 5) Manage stress, 6) Stay socially connected, 7) Avoid smoking, 8) Limit alcohol, 9) Control blood pressure/diabetes, 10) Protect your head from injury. Prevention is key!",

                'genetic testing': "Genetic testing for neurodegenerative diseases: Available for Huntington's (definitive), Alzheimer's (APOE gene - risk factor), Parkinson's (LRRK2, PARK genes). Considerations: 1) Emotional impact of results, 2) Insurance/employment implications, 3) No cure for most conditions, 4) Family implications. Genetic counseling strongly recommended before testing. Discuss with your doctor.",

                // Symptoms & When to See Doctor
                'when to see doctor': "See a doctor immediately if you experience: 1) Sudden confusion or memory loss, 2) Severe headache, 3) Vision changes, 4) Difficulty speaking, 5) Weakness/numbness, 6) Loss of consciousness, 7) Seizures. Schedule appointment for: persistent memory problems, tremors, balance issues, personality changes, depression, sleep problems. Early diagnosis improves outcomes.",

                'risk factors': "Risk factors for neurodegenerative diseases: 1) Age (biggest factor), 2) Family history, 3) Genetics (APOE-e4 for Alzheimer's), 4) Head injuries, 5) Cardiovascular disease, 6) Diabetes, 7) Smoking, 8) Obesity, 9) Depression, 10) Social isolation. Modifiable factors: exercise, diet, mental stimulation, social engagement. You can reduce risk even with genetic predisposition.",

                // Caregiving
                'caregiving': "Caregiving tips for dementia patients: 1) Establish routine, 2) Simplify tasks, 3) Use clear communication, 4) Ensure safety (remove hazards), 5) Encourage independence, 6) Manage behavioral changes calmly, 7) Take care of yourself (caregiver burnout is real), 8) Join support groups, 9) Use respite care, 10) Plan for future care needs. Resources: Alzheimer's Association, local support groups.",

                // Diet & Nutrition
                'diet': "Brain-healthy diet recommendations: 1) Mediterranean diet (proven benefits), 2) Omega-3 fatty acids (fish, walnuts), 3) Berries (antioxidants), 4) Leafy greens (vitamins), 5) Whole grains, 6) Nuts, 7) Olive oil, 8) Limit red meat, 9) Reduce sugar, 10) Stay hydrated. Foods to avoid: processed foods, trans fats, excess alcohol. Diet alone can't prevent disease but reduces risk.",

                // Exercise
                'exercise': "Exercise for brain health: 1) Aerobic: 150 min/week (walking, swimming, cycling), 2) Strength training: 2x/week, 3) Balance exercises (tai chi, yoga), 4) Coordination activities (dancing). Benefits: increases blood flow to brain, promotes new neuron growth, reduces inflammation, improves mood. Even light exercise helps. Start slowly, consult doctor before beginning new program.",

                // Clinical Trials
                'clinical trials': "Clinical trials for neurodegenerative diseases: Testing new treatments for Alzheimer's, Parkinson's, Huntington's. Benefits: access to cutting-edge treatments, expert care, contribute to research. Considerations: unknown side effects, time commitment, placebo possibility. Find trials: ClinicalTrials.gov, Alzheimer's Association Trial Match. Discuss with your doctor if interested.",

                // CRISPR & Gene Therapy
                'gene therapy': "Gene therapy for neurodegenerative diseases: CRISPR technology shows promise for correcting genetic mutations. Status: 1) Huntington's: Phase 1/2 trials, 2) Alzheimer's: Preclinical research, 3) Parkinson's: Early trials. Not yet available clinically. Challenges: delivery to brain, safety, long-term effects. Exciting future potential but years from routine use. Stay informed through reputable sources."
            },

            faqs: [
                {
                    question: "What are early signs of Alzheimer's?",
                    answer: "Early Alzheimer's signs: memory loss affecting daily life, difficulty planning, confusion with time/place, trouble with familiar tasks, misplacing things, poor judgment, withdrawal from activities, mood changes. If you notice these symptoms, see a doctor for evaluation. Early diagnosis allows for better treatment planning."
                },
                {
                    question: "Is memory loss normal with aging?",
                    answer: "Some memory changes are normal with aging (occasionally forgetting names, misplacing keys). Concerning signs: forgetting recent events, getting lost in familiar places, difficulty with daily tasks, personality changes. Normal aging doesn't interfere with daily life. If memory problems worry you or affect daily activities, see a doctor."
                },
                {
                    question: "Can Alzheimer's be prevented?",
                    answer: "While there's no guaranteed prevention, you can reduce risk: regular exercise, Mediterranean diet, mental stimulation, social engagement, quality sleep, manage cardiovascular risk factors (blood pressure, diabetes, cholesterol), avoid smoking, limit alcohol. These lifestyle factors can reduce risk by up to 40%."
                },
                {
                    question: "What causes Parkinson's tremors?",
                    answer: "Parkinson's tremors are caused by alpha-synuclein protein misfolding in brain cells that produce dopamine. This leads to dopamine deficiency, causing tremors (typically resting tremor, starts one side, pill-rolling motion). Treatment with Levodopa can help manage tremors. See a neurologist for proper diagnosis and treatment."
                },
                {
                    question: "Should I get genetic testing?",
                    answer: "Genetic testing considerations: Pros: know your risk, plan ahead, inform family. Cons: emotional impact, no cure for most conditions, insurance concerns. Recommended if: strong family history, planning family, participating in research. Always get genetic counseling first. Discuss with your doctor to make informed decision."
                },
                {
                    question: "What foods are good for brain health?",
                    answer: "Brain-healthy foods: fatty fish (omega-3), berries (antioxidants), leafy greens (vitamins), nuts (vitamin E), whole grains, olive oil, avocados, dark chocolate (moderate). Mediterranean diet is best studied. Avoid: processed foods, trans fats, excess sugar, high sodium. Stay hydrated. Diet is one part of overall brain health strategy."
                },
                {
                    question: "How much exercise do I need?",
                    answer: "Recommended exercise for brain health: 150 minutes moderate aerobic activity per week (30 min, 5 days), plus strength training 2x/week. Even light exercise helps! Walking, swimming, dancing, yoga all beneficial. Start slowly if inactive. Consult doctor before beginning new exercise program, especially if you have health conditions."
                },
                {
                    question: "When should I see a neurologist?",
                    answer: "See a neurologist if you experience: persistent memory problems, tremors, balance/coordination issues, numbness/tingling, severe headaches, seizures, movement disorders, cognitive changes, unexplained dizziness. Don't wait - early diagnosis and treatment improve outcomes. Your primary care doctor can refer you."
                }
            ],

            emergencyKeywords: ['emergency', 'urgent', 'severe', 'sudden', 'stroke', 'seizure', 'unconscious', 'chest pain', 'can\'t breathe']
        };
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-button" id="chatbot-toggle">
                    💬
                </button>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <h3>
                            <span>🏥</span>
                            <span>Health Assistant</span>
                        </h3>
                        <button class="chatbot-close" id="chatbot-close">×</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages"></div>
                    
                    <div class="chatbot-suggestions" id="chatbot-suggestions">
                        <button class="chatbot-suggestion" data-message="What are early signs of Alzheimer's?">Alzheimer's signs?</button>
                        <button class="chatbot-suggestion" data-message="Tell me about Parkinson's disease">Parkinson's info</button>
                        <button class="chatbot-suggestion" data-message="How can I improve brain health?">Brain health tips</button>
                        <button class="chatbot-suggestion" data-message="When should I see a doctor?">See a doctor?</button>
                    </div>
                    
                    <div class="chatbot-input-area">
                        <textarea 
                            class="chatbot-input" 
                            id="chatbot-input" 
                            placeholder="Ask about symptoms, diseases, or health concerns..."
                            rows="1"
                        ></textarea>
                        <button class="chatbot-send" id="chatbot-send">➤</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const suggestions = document.querySelectorAll('.chatbot-suggestion');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        suggestions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                input.value = message;
                this.sendMessage();
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-toggle');

        if (this.isOpen) {
            window.classList.add('active');
            button.classList.add('active');
            button.textContent = '✕';
            this.scrollToBottom();
        } else {
            window.classList.remove('active');
            button.classList.remove('active');
            button.textContent = '💬';
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatbot-window').classList.remove('active');
        document.getElementById('chatbot-toggle').classList.remove('active');
        document.getElementById('chatbot-toggle').textContent = '💬';
    }

    addWelcomeMessage() {
        const greeting = this.knowledgeBase.greetings[Math.floor(Math.random() * this.knowledgeBase.greetings.length)];
        this.addMessage(greeting, 'bot');

        // Add disclaimer
        setTimeout(() => {
            this.addMessage("⚠️ Disclaimer: I provide health information for educational purposes only. This is not medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.", 'bot');
        }, 500);
    }

    addMessage(text, sender = 'bot') {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageHTML = `
            <div class="chatbot-message ${sender}">
                <div class="chatbot-avatar">
                    ${sender === 'bot' ? '🏥' : '👤'}
                </div>
                <div class="chatbot-bubble">
                    ${text}
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.messages.push({ text, sender, timestamp: new Date() });
        this.scrollToBottom();
    }

    addTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="chatbot-message bot" id="typing-indicator">
                <div class="chatbot-avatar">🏥</div>
                <div class="chatbot-bubble">
                    <div class="chatbot-typing">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Check for emergency keywords
        if (this.isEmergency(message)) {
            this.addMessage("🚨 EMERGENCY: If you're experiencing a medical emergency, please call emergency services (911 in US, 112 in EU, or your local emergency number) immediately or go to the nearest emergency room. This chatbot cannot provide emergency medical care.", 'bot');
            return;
        }

        // Show typing indicator
        this.addTypingIndicator();

        // Simulate thinking delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate response
        const response = this.generateResponse(message);

        // Remove typing indicator and add bot response
        this.removeTypingIndicator();
        this.addMessage(response, 'bot');
    }

    isEmergency(message) {
        const lowerMessage = message.toLowerCase();
        return this.knowledgeBase.emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
    }

    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Check for greetings
        if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
            return this.knowledgeBase.greetings[Math.floor(Math.random() * this.knowledgeBase.greetings.length)];
        }

        // Check for thanks
        if (lowerMessage.match(/(thank|thanks|appreciate)/)) {
            return "You're welcome! Remember, if you have health concerns, please consult with a qualified healthcare professional. Feel free to ask more questions! 😊";
        }

        // Check health topics
        for (const [key, value] of Object.entries(this.knowledgeBase.healthTopics)) {
            if (lowerMessage.includes(key)) {
                return value;
            }
        }

        // Check FAQs
        for (const faq of this.knowledgeBase.faqs) {
            const questionWords = faq.question.toLowerCase().split(' ');
            if (questionWords.some(word => word.length > 4 && lowerMessage.includes(word))) {
                return faq.answer;
            }
        }

        // Check for specific keywords
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
            return "I can help you with:\n• Alzheimer's disease (symptoms, treatment, prevention)\n• Parkinson's disease (signs, management)\n• Memory loss and cognitive health\n• Brain health tips (diet, exercise)\n• When to see a doctor\n• Genetic testing information\n• Caregiving advice\n\nWhat would you like to know more about?";
        }

        if (lowerMessage.includes('doctor') || lowerMessage.includes('physician')) {
            return "I recommend seeing a doctor if you experience: persistent memory problems, tremors, balance issues, confusion, personality changes, or any concerning symptoms. A neurologist specializes in brain and nervous system disorders. Your primary care doctor can provide a referral. Early diagnosis is important for better treatment outcomes.";
        }

        // Default response
        return "I can provide information about neurodegenerative diseases like Alzheimer's and Parkinson's, brain health, symptoms, and when to seek medical care. Could you please rephrase your question or ask about:\n• Specific diseases (Alzheimer's, Parkinson's, Huntington's)\n• Symptoms and warning signs\n• Prevention and brain health\n• Treatment options\n• When to see a doctor\n\n⚠️ Remember: This is educational information only, not medical advice. Always consult a healthcare professional for personal medical concerns.";
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.proteomorphicChatbot = new ProteomorphicChatbot();
    });
} else {
    window.proteomorphicChatbot = new ProteomorphicChatbot();
}
