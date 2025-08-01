// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('visible');
                    item.classList.remove('hidden');
                }, 100);
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !service || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, phone, service, message });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 8px;
        padding: 15px 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                margin-left: 15px;
                opacity: 0.7;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
    animateElements.forEach(el => observer.observe(el));
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .service-card,
    .portfolio-item,
    .about-content,
    .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyles);

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    color: #2c3e50;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effects for back to top button
backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-3px)';
    backToTopButton.style.boxShadow = '0 6px 20px rgba(255, 165, 0, 0.4)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0)';
    backToTopButton.style.boxShadow = '0 4px 12px rgba(255, 165, 0, 0.3)';
});

// Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 80);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// AI Chatbot Functionality
class AIPhotographyChatbot {
    constructor() {
        this.chatbotToggle = document.getElementById('chatbotToggle');
        this.chatbotContainer = document.getElementById('ai-chatbot');
        this.chatbotClose = document.getElementById('closeChatbot');
        this.chatbotInput = document.getElementById('chatbotInput');
        this.sendButton = document.getElementById('sendMessage');
        this.messagesContainer = document.getElementById('chatbotMessages');
        
        this.isOpen = false;
        this.responses = this.initializeResponses();
        
        this.bindEvents();
    }
    
    initializeResponses() {
        return {
            greetings: [
                "Hello! Welcome to G Studio - The Art of Capturing Memories! How can I help you today?",
                "Hi there! I'm here to assist you with all your photography needs. What would you like to know?",
                "Welcome! I'm G Studio's AI assistant. Let me help you find the perfect photography service!"
            ],
            pricing: {
                portrait: "Our portrait photography starts at $200 and includes individual portraits, family sessions, corporate headshots, and personal branding photos. Would you like more details about any specific type?",
                wedding: "Wedding photography packages start at $1,500 and include full day coverage, engagement sessions, bridal portraits, and a digital gallery. We capture every precious moment of your special day!",
                event: "Event photography starts at $300 and covers corporate events, birthday parties, conferences, and social gatherings. We ensure every important moment is beautifully documented.",
                lifestyle: "Lifestyle photography starts at $250 and includes lifestyle sessions, maternity photos, newborn sessions, and pet photography. We capture authentic, natural moments."
            },
            services: {
                general: "G Studio offers four main photography services: Portrait Photography, Wedding Photography, Event Photography, and Lifestyle Photography. Each service uses AI-enhanced techniques for the best results. Which one interests you most?",
                ai: "Our AI-powered features include Smart Shot Recommendations, AI-Enhanced Editing, Intelligent Scene Detection, and Style Personalization. These technologies help us capture and enhance your memories perfectly!"
            },
            booking: [
                "To book a session, you can contact us at hello@gstudio.com or call +1 (555) 123-4567. We're located in Bidar, Karnataka. Would you like me to help you choose the right photography package?",
                "I'd be happy to help you book! First, let me know what type of photography session you're interested in, and I can provide more specific information and availability."
            ],
            location: "G Studio is located in Bidar, Karnataka. We work with clients locally and internationally, bringing professional quality to every project. Would you like to know about our travel services?",
            default: [
                "That's a great question! For detailed information, I recommend contacting our team at hello@gstudio.com. Is there anything specific about our photography services I can help you with?",
                "I'd love to help you with that! Could you tell me more about what you're looking for? Are you interested in portraits, weddings, events, or lifestyle photography?",
                "Let me connect you with the right information! What type of photography session are you considering?"
            ]
        };
    }
    
    bindEvents() {
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.chatbotClose.addEventListener('click', () => this.closeChatbot());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }
    
    openChatbot() {
        this.chatbotContainer.classList.add('active');
        this.isOpen = true;
        this.chatbotInput.focus();
    }
    
    closeChatbot() {
        this.chatbotContainer.classList.remove('active');
        this.isOpen = false;
    }
    
    sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        this.chatbotInput.value = '';
        
        // Simulate AI thinking delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 1000);
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-camera"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting detection
        if (lowerMessage.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)) {
            return this.getRandomResponse(this.responses.greetings);
        }
        
        // Pricing inquiries
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            if (lowerMessage.includes('portrait')) return this.responses.pricing.portrait;
            if (lowerMessage.includes('wedding')) return this.responses.pricing.wedding;
            if (lowerMessage.includes('event')) return this.responses.pricing.event;
            if (lowerMessage.includes('lifestyle')) return this.responses.pricing.lifestyle;
            return "Our photography packages start at $200 for portraits, $250 for lifestyle, $300 for events, and $1,500 for weddings. Which service interests you most?";
        }
        
        // Service inquiries
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
            if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
                return this.responses.services.ai;
            }
            return this.responses.services.general;
        }
        
        // Booking inquiries
        if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
            return this.getRandomResponse(this.responses.booking);
        }
        
        // Location inquiries
        if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('address')) {
            return this.responses.location;
        }
        
        // AI features
        if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('smart')) {
            return this.responses.services.ai;
        }
        
        // Portfolio inquiries
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('photos') || lowerMessage.includes('gallery')) {
            return "You can view our portfolio in the Portfolio section above! We showcase our work in portraits, weddings, events, and lifestyle photography. Each image demonstrates our AI-enhanced photography techniques. Which style interests you most?";
        }
        
        // Contact inquiries
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            return "You can reach G Studio at hello@gstudio.com or call +1 (555) 123-4567. We're located in Bidar, Karnataka. Feel free to contact us for any photography needs!";
        }
        
        // Default response
        return this.getRandomResponse(this.responses.default);
    }
    
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize AI Chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new AIPhotographyChatbot();
    
    // Add some AI-enhanced interactions
    addAIInteractions();
    
    // Initialize contextual AI throughout website
    initializeContextualAI();
    
    // Show welcome notification after page loads
    setTimeout(() => {
        showChatbotWelcome();
    }, 3000);
});

// Initialize contextual AI features throughout the website
function initializeContextualAI() {
    // Track which section user is viewing
    const sections = document.querySelectorAll('section[id]');
    const chatbotToggle = document.getElementById('chatbotToggle');
    
    // Create section observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateChatbotContext(entry.target.id);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add AI hints to different sections
    addSectionAIHints();
    
    // Initialize floating scroll animation for chatbot
    initializeFloatingChatbot();
}

// Initialize floating animation for chatbot icon
function initializeFloatingChatbot() {
    // Wait for chatbot element to be ready
    setTimeout(() => {
        const chatbotToggle = document.getElementById('chatbotToggle');
        
        if (!chatbotToggle) {
            console.log('Chatbot toggle not found, retrying...');
            setTimeout(() => initializeFloatingChatbot(), 500);
            return;
        }
        
        console.log('Initializing floating chatbot animation');
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        let animationId;
        
        function updateChatbotPosition() {
            if (!chatbotToggle) return;
            
            const scrollY = window.scrollY;
            const scrollDelta = scrollY - lastScrollY;
            
            // Create floating effect based on scroll direction and speed
            const floatOffset = Math.sin(scrollY * 0.01) * 5; // Increased movement for visibility
            const scrollInfluence = Math.min(Math.abs(scrollDelta) * 0.8, 15); // More responsive
            
            // Apply transform with floating animation
            const scale = 1 + scrollInfluence * 0.03;
            const rotation = scrollDelta > 0 ? 5 : -5; // More noticeable rotation
            
            chatbotToggle.style.transform = `translateY(${floatOffset}px) scale(${scale}) rotate(${rotation}deg)`;
            chatbotToggle.style.transition = 'transform 0.1s ease-out';
            
            // Reset transform gradually
            clearTimeout(animationId);
            animationId = setTimeout(() => {
                if (chatbotToggle) {
                    chatbotToggle.style.transform = `translateY(${floatOffset}px) scale(1) rotate(0deg)`;
                    chatbotToggle.style.transition = 'transform 0.3s ease';
                }
            }, 200);
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking && chatbotToggle) {
                requestAnimationFrame(updateChatbotPosition);
                ticking = true;
            }
        }
        
        // Add scroll event listener with throttling
        window.addEventListener('scroll', requestTick, { passive: true });
        console.log('Scroll listener attached');
        
        // Add continuous floating animation even when not scrolling
        let floatingInterval = setInterval(() => {
            if (chatbotToggle && !ticking) {
                const time = Date.now() * 0.003;
                const gentleFloat = Math.sin(time) * 3;
                chatbotToggle.style.transform = `translateY(${gentleFloat}px)`;
                chatbotToggle.style.transition = 'transform 0.2s ease';
            }
        }, 150);
        
        // Test scroll responsiveness
        console.log('Testing scroll animation...');
        
    }, 100);
}

// Update chatbot context based on current section
function updateChatbotContext(sectionId) {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const badge = chatbotToggle.querySelector('.chatbot-badge');
    
    // Update badge text based on section
    const contextMap = {
        'home': 'AI',
        'about': 'INFO',
        'portfolio': 'VIEW',
        'services': 'PRICE',
        'contact': 'BOOK'
    };
    
    if (badge && contextMap[sectionId]) {
        badge.textContent = contextMap[sectionId];
        
        // Add subtle pulse animation when context changes
        chatbotToggle.style.animation = 'none';
        setTimeout(() => {
            chatbotToggle.style.animation = 'pulse 2s infinite, contextChange 0.5s ease';
        }, 10);
    }
}

// Add AI hints to different sections
function addSectionAIHints() {
    // Add AI hint to hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const aiHint = createAIHint(
            'Ask me about our photography services!',
            'hero-ai-hint'
        );
        heroSection.appendChild(aiHint);
    }
    
    // Add AI hint to portfolio section
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        const aiHint = createAIHint(
            'Want to know more about any style? Ask me!',
            'portfolio-ai-hint'
        );
        portfolioSection.appendChild(aiHint);
    }
    
    // Add AI hint to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const aiHint = createAIHint(
            'Need help choosing a package? I can help!',
            'services-ai-hint'
        );
        servicesSection.appendChild(aiHint);
    }
}

// Create AI hint element
function createAIHint(text, className) {
    const hint = document.createElement('div');
    hint.className = `ai-section-hint ${className}`;
    hint.innerHTML = `
        <div class="ai-hint-content">
            <i class="fas fa-robot"></i>
            <span>${text}</span>
        </div>
    `;
    
    // Add click handler to open chatbot
    hint.addEventListener('click', () => {
        const chatbot = document.getElementById('ai-chatbot');
        const toggle = document.getElementById('chatbotToggle');
        if (chatbot && !chatbot.classList.contains('active')) {
            toggle.click();
        }
    });
    
    return hint;
}

// Show welcome notification for AI chatbot
function showChatbotWelcome() {
    // Check if user has seen welcome before (using localStorage)
    if (localStorage.getItem('gstudio-chatbot-welcome-seen')) {
        return;
    }
    
    const welcomeNotification = document.createElement('div');
    welcomeNotification.className = 'chatbot-welcome-notification';
    welcomeNotification.innerHTML = `
        <div class="welcome-content">
            <div class="welcome-icon">
                <i class="fas fa-robot"></i>
            </div>
            <div class="welcome-text">
                <h4>👋 Hi! I'm G Studio's AI Assistant</h4>
                <p>I can help you with photography packages, pricing, and booking information. Click the chat button to get started!</p>
            </div>
            <button class="welcome-close" onclick="closeWelcomeNotification()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="welcome-arrow"></div>
    `;
    
    // Add styles for welcome notification
    welcomeNotification.style.cssText = `
        position: fixed;
        bottom: 120px;
        right: 30px;
        width: 320px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 999;
        animation: slideInFromRight 0.5s ease;
        border: 2px solid #FFD700;
    `;
    
    document.body.appendChild(welcomeNotification);
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        if (welcomeNotification.parentNode) {
            welcomeNotification.style.animation = 'slideOutToRight 0.5s ease';
            setTimeout(() => {
                if (welcomeNotification.parentNode) {
                    welcomeNotification.remove();
                }
            }, 500);
        }
    }, 8000);
    
    // Mark as seen
    localStorage.setItem('gstudio-chatbot-welcome-seen', 'true');
}

// Close welcome notification
function closeWelcomeNotification() {
    const notification = document.querySelector('.chatbot-welcome-notification');
    if (notification) {
        notification.style.animation = 'slideOutToRight 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }
}

// AI-Enhanced Interactions
function addAIInteractions() {
    // Smart portfolio hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Simulate AI analysis
            const overlay = item.querySelector('.portfolio-overlay');
            if (overlay) {
                const aiTag = document.createElement('span');
                aiTag.className = 'ai-analysis-tag';
                aiTag.innerHTML = '<i class="fas fa-brain"></i> AI Enhanced';
                aiTag.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #2c3e50;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.7rem;
                    font-weight: bold;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                `;
                overlay.appendChild(aiTag);
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const aiTag = item.querySelector('.ai-analysis-tag');
            if (aiTag) {
                aiTag.remove();
            }
        });
    });
    
    // Add AI loading animation to contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const originalSubmitHandler = contactForm.onsubmit;
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show AI processing
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-brain"></i> AI Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showNotification('Message sent! Our AI will help prioritize your request.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// Add CSS for AI animations and welcome notification
const aiStyles = document.createElement('style');
aiStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .ai-analysis-tag {
        animation: fadeIn 0.3s ease forwards;
    }
    
    .chatbot-toggle {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 6px 25px rgba(255, 165, 0, 0.4); }
        50% { box-shadow: 0 8px 35px rgba(255, 165, 0, 0.6); }
        100% { box-shadow: 0 6px 25px rgba(255, 165, 0, 0.4); }
    }
    
    /* Welcome Notification Styles */
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutToRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .chatbot-welcome-notification {
        font-family: 'Inter', sans-serif;
    }
    
    .welcome-content {
        padding: 1.5rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        position: relative;
    }
    
    .welcome-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #2c3e50;
        font-size: 1.2rem;
        flex-shrink: 0;
    }
    
    .welcome-text h4 {
        margin: 0 0 0.5rem 0;
        color: #2c3e50;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .welcome-text p {
        margin: 0;
        color: #7f8c8d;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .welcome-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: #7f8c8d;
        font-size: 1rem;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .welcome-close:hover {
        background: #f8f9fa;
        color: #2c3e50;
    }
    
    .welcome-arrow {
        position: absolute;
        bottom: -8px;
        right: 40px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #FFD700;
    }
    
    .welcome-arrow::after {
        content: '';
        position: absolute;
        top: -10px;
        left: -6px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid white;
    }
    
    /* AI Section Hints */
    .ai-section-hint {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        color: #2c3e50;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 100;
        box-shadow: 0 3px 15px rgba(255, 165, 0, 0.3);
        animation: aiHintFloat 3s ease-in-out infinite;
    }
    
    .ai-section-hint:hover {
        transform: translateX(-50%) translateY(-3px);
        box-shadow: 0 5px 20px rgba(255, 165, 0, 0.4);
    }
    
    .ai-hint-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .ai-hint-content i {
        font-size: 0.9rem;
        animation: aiIconSpin 4s linear infinite;
    }
    
    /* Specific positioning for different sections */
    .hero-ai-hint {
        top: 60%;
        left: 20px;
        transform: none;
    }
    
    .portfolio-ai-hint {
        top: 20px;
        right: 20px;
        left: auto;
        transform: none;
    }
    
    .services-ai-hint {
        top: 20px;
        left: 20px;
        transform: none;
    }
    
    /* Animations */
    @keyframes aiHintFloat {
        0%, 100% {
            transform: translateX(-50%) translateY(0);
        }
        50% {
            transform: translateX(-50%) translateY(-5px);
        }
    }
    
    @keyframes aiIconSpin {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(10deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-10deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
    
    @keyframes contextChange {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
    
    /* Mobile responsiveness for AI hints */
    @media (max-width: 768px) {
        .ai-section-hint {
            font-size: 0.75rem;
            padding: 6px 12px;
        }
        
        .hero-ai-hint {
            top: 50%;
            left: 10px;
        }
        
        .portfolio-ai-hint,
        .services-ai-hint {
            top: 10px;
            right: 10px;
            left: 10px;
            transform: none;
        }
    }
`;
document.head.appendChild(aiStyles);
