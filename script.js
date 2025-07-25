

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
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
document.querySelectorAll('.feature-card, .model-card, .provider-card, .app-card').forEach(el => {
    observer.observe(el);
});

// Add animation classes
const style = document.createElement('style');
style.textContent = `
    .feature-card, .model-card, .provider-card, .app-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }
`;
document.head.appendChild(style);

// Counter Animation for Hero Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 2000;

    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        let current = 0;
        const increment = numericValue / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Model Search Functionality (for future use)
function setupModelSearch() {
    const searchInput = document.querySelector('.model-search');
    const modelCards = document.querySelectorAll('.model-card');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        modelCards.forEach(card => {
            const modelName = card.querySelector('h3').textContent.toLowerCase();
            const provider = card.querySelector('.provider').textContent.toLowerCase();
            
            if (modelName.includes(searchTerm) || provider.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Copy Code Functionality
function setupCodeCopy() {
    const codeBlocks = document.querySelectorAll('.code-content pre');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            padding: 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background 0.3s ease;
        `;
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(button);
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent);
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    });
}

// Terminal Animation
function initTerminalAnimation() {
    const commands = [
        {
            cmd: 'startflow models list',
            output: `Available Models:
├── GPT-4o (OpenAI) - $5.00/1M tokens
├── Claude 3.5 Sonnet (Anthropic) - $3.00/1M tokens
├── Gemini Pro (Google) - $0.50/1M tokens
└── Llama 3.1 405B (Meta) - $3.50/1M tokens`
        },
        {
            cmd: 'startflow chat --model gpt-4o --message "Create a React component"',
            output: `Response:
import React from 'react';

const MyComponent = () => {
  return (
    <div className="card">
      <h2>Hello World</h2>
      <p>This is a React component!</p>
    </div>
  );
};

export default MyComponent;`
        },
        {
            cmd: 'startflow usage --today',
            output: `Today's Usage:
├── Requests: 1,247
├── Tokens: 892,341
├── Cost: $2.34
└── Status: All systems operational`
        }
    ];

    let currentCommand = 0;
    let isTyping = false;

    function typeCommand(command, elementId, callback) {
        if (isTyping) return;
        isTyping = true;
        
        const element = document.getElementById(elementId);
        const text = command.cmd;
        let index = 0;
        
        element.textContent = '';
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
                isTyping = false;
                setTimeout(callback, 500);
            }
        }, 50);
    }

    function showOutput(output, elementId, callback) {
        const element = document.getElementById(elementId);
        element.textContent = output;
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            setTimeout(callback, 2000);
        }, 100);
    }

    function startAnimation() {
        if (currentCommand >= commands.length) {
            currentCommand = 0;
        }
        
        const command = commands[currentCommand];
        
        switch(currentCommand) {
            case 0:
                typeCommand(command, 'cmd1', () => {
                    showOutput(command.output, 'output1', () => {
                        currentCommand++;
                        startAnimation();
                    });
                });
                break;
            case 1:
                typeCommand(command, 'cmd2', () => {
                    showOutput(command.output, 'output2', () => {
                        currentCommand++;
                        startAnimation();
                    });
                });
                break;
            case 2:
                typeCommand(command, 'cmd3', () => {
                    showOutput(command.output, 'output3', () => {
                        currentCommand = 0;
                        setTimeout(() => {
                            // Reset for next cycle
                            document.getElementById('cmd1').textContent = '';
                            document.getElementById('output1').textContent = '';
                            document.getElementById('cmd2').textContent = '';
                            document.getElementById('output2').textContent = '';
                            document.getElementById('cmd3').textContent = '';
                            document.getElementById('output3').textContent = '';
                            
                            setTimeout(startAnimation, 1000);
                        }, 3000);
                    });
                });
                break;
        }
    }

    // Start animation when terminal is visible
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(startAnimation, 1000);
                terminalObserver.unobserve(entry.target);
            }
        });
    });

    const terminalSection = document.querySelector('.terminal-section');
    if (terminalSection) {
        terminalObserver.observe(terminalSection);
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    setupModelSearch();
    setupCodeCopy();
    initTerminalAnimation();
});

// Add hover effects for interactive elements
document.querySelectorAll('.model-card, .provider-card, .app-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click tracking for analytics (optional)
function trackClick(element, eventName) {
    element.addEventListener('click', () => {
        // In a real app, this would send to analytics
        console.log(`Event: ${eventName}`);
    });
}

// Track important button clicks
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    trackClick(btn, 'cta_click');
});

// Add loading states for buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('loading')) return;
        
        const originalText = this.innerHTML;
        this.classList.add('loading');
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        setTimeout(() => {
            this.classList.remove('loading');
            this.innerHTML = originalText;
        }, 2000);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

