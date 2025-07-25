







// Documentation functionality
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
    setupCodeCopy();
    setupSearch();
});

// Smooth scrolling for documentation navigation
function setupSmoothScrolling() {
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
}

// Copy code functionality
function setupCodeCopy() {
    document.querySelectorAll('.code-block').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            font-size: 0.875rem;
            transition: background 0.3s ease;
        `;
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(button);
        
        button.addEventListener('click', () => {
            const code = block.querySelector('pre code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search documentation...';
    searchInput.className = 'docs-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        font-size: 1rem;
        margin-bottom: 2rem;
    `;
    
    const docsNav = document.querySelector('.docs-nav .container');
    docsNav.appendChild(searchInput);
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchDocumentation(query);
    });
}

// Search implementation
function searchDocumentation(query) {
    const sections = document.querySelectorAll('.docs-section');
    const navCards = document.querySelectorAll('.nav-card');
    
    if (!query) {
        // Show all sections
        sections.forEach(section => section.style.display = 'block');
        navCards.forEach(card => card.style.display = 'block');
        return;
    }
    
    // Filter sections based on search query
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        section.style.display = text.includes(query) ? 'block' : 'none';
    });
    
    // Filter navigation cards
    navCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

// API endpoint examples
const apiExamples = {
    'chat-completions': {
        title: 'Chat Completions',
        description: 'Generate text completions using any supported model',
        method: 'POST',
        endpoint: '/v1/chat/completions',
        example: `{
  "model": "gpt-4o",
  "messages": [
    {"role": "user", "content": "Hello, how are you?"}
  ],
  "max_tokens": 100
}`
    },
    'image-generation': {
        title: 'Image Generation',
        description: 'Create images using DALL-E and other image models',
        method: 'POST',
        endpoint: '/v1/images/generations',
        example: `{
  "model": "dall-e-3",
  "prompt": "A futuristic city at sunset",
  "size": "1024x1024",
  "quality": "hd"
}`
    }
};

// Interactive API explorer
function setupAPIExplorer() {
    const apiCards = document.querySelectorAll('.api-card');
    apiCards.forEach(card => {
        card.addEventListener('click', () => {
            const apiType = card.querySelector('h3').textContent.toLowerCase().replace(' ', '-');
            showAPIExample(apiType);
        });
    });
}

function showAPIExample(apiType) {
    const example = apiExamples[apiType];
    if (!example) return;
    
    const modal = document.createElement('div');
    modal.className = 'api-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${example.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${example.description}</p>
                <div class="endpoint">
                    <span class="method">${example.method}</span>
                    <span class="path">${example.endpoint}</span>
                </div>
                <div class="code-block">
                    <pre><code>${example.example}</code></pre>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Initialize API explorer
document.addEventListener('DOMContentLoaded', () => {
    setupAPIExplorer();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const searchInput = document.querySelector('.docs-search');
        if (searchInput) searchInput.focus();
    }
    
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.api-modal');
        modals.forEach(modal => modal.remove());
    }
});








