




// Provider data
const providersData = [
    {
        name: "OpenAI",
        description: "Leading AI research company with GPT models",
        models: 15,
        minPrice: 0.15,
        maxContext: "128K",
        vision: true,
        code: true,
        uptime: "99.9%",
        logo: null,
        popularModels: ["GPT-4o", "GPT-4o Mini", "GPT-3.5 Turbo", "DALL-E"]
    },
    {
        name: "Anthropic",
        description: "AI safety-focused company with Claude models",
        models: 8,
        minPrice: 0.25,
        maxContext: "200K",
        vision: true,
        code: true,
        uptime: "99.8%",
        logo: null,
        popularModels: ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 3 Haiku"]
    },
    {
        name: "Google",
        description: "Multimodal AI models with Gemini family",
        models: 12,
        minPrice: 0.15,
        maxContext: "1M",
        vision: true,
        code: true,
        uptime: "99.9%",
        logo: null,
        popularModels: ["Gemini Pro", "Gemini Flash", "Gemini Ultra"]
    },
    {
        name: "Meta",
        description: "Open-source Llama models for developers",
        models: 10,
        minPrice: 0.30,
        maxContext: "128K",
        vision: false,
        code: true,
        uptime: "99.7%",
        logo: null,
        popularModels: ["Llama 3.1 405B", "Llama 3.1 70B", "Llama 3.1 8B"]
    },
    {
        name: "Mistral",
        description: "European AI company with efficient models",
        models: 9,
        minPrice: 0.20,
        maxContext: "32K",
        vision: true,
        code: true,
        uptime: "99.8%",
        logo: null,
        popularModels: ["Mistral Large", "Mixtral 8x7B", "Mistral 7B"]
    },
    {
        name: "Cohere",
        description: "Enterprise-focused language models",
        models: 7,
        minPrice: 0.15,
        maxContext: "128K",
        vision: false,
        code: true,
        uptime: "99.6%",
        logo: null,
        popularModels: ["Command R+", "Command R", "Command"]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProviders();
    setupEventListeners();
});

// Render providers
function renderProviders() {
    const providersGrid = document.querySelector('.providers-grid');
    providersGrid.innerHTML = '';
    
    providersData.forEach(provider => {
        const card = createProviderCard(provider);
        providersGrid.appendChild(card);
    });
}

function createProviderCard(provider) {
    const card = document.createElement('div');
    card.className = 'provider-card';

    // Get provider color and initial
    const providerColors = {
        'OpenAI': '#10a37f',
        'Anthropic': '#7c3aed',
        'Google': '#4285f4',
        'Meta': '#ff6b35',
        'Mistral': '#22c55e',
        'Cohere': '#3b82f6'
    };
    
    const color = providerColors[provider.name] || '#6b7280';
    const initial = provider.name === 'Mistral' ? 'Mi' : provider.name.charAt(0);
    
    card.innerHTML = `
        <div class="provider-header">
            <div class="provider-logo" style="background: ${color}; color: white; font-weight: bold; display: flex; align-items: center; justify-content: center;">
                ${initial}
            </div>
            <div class="provider-info">
                <h3>${provider.name}</h3>
                <p class="provider-description">${provider.description}</p>
            </div>
        </div>
        <div class="provider-stats">
            <div class="stat-item">
                <span class="stat-number">${provider.models}</span>
                <span class="stat-label">Models</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">$${provider.minPrice}</span>
                <span class="stat-label">Min Price</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${provider.uptime}</span>
                <span class="stat-label">Uptime</span>
            </div>
        </div>
        <div class="provider-models">
            ${provider.popularModels.map(model => `<span class="model-tag">${model}</span>`).join('')}
        </div>
        <div class="provider-actions">
            <button class="btn-primary" onclick="viewModels('${provider.name}')">View Models</button>
            <button class="btn-outline" onclick="viewDocs('${provider.name}')">Documentation</button>
        </div>
    `;
    return card;
}

// Event listeners
function setupEventListeners() {
    // Filter functionality
    const filters = document.querySelectorAll('select');
    filters.forEach(filter => {
        filter.addEventListener('change', handleFilter);
    });
}

// Filter handlers
function handleFilter() {
    // Implementation for filtering providers
    console.log('Filtering providers...');
}

// Utility functions
function viewModels(providerName) {
    alert(`Redirecting to ${providerName} models...`);
}

function viewDocs(providerName) {
    alert(`Opening ${providerName} documentation...`);
}

// Comparison table functionality
function sortTable(columnIndex) {
    const table = document.querySelector('.comparison-table table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // Handle different data types
        if (columnIndex === 1 || columnIndex === 3) {
            // Numeric values
            return parseFloat(aValue) - parseFloat(bValue);
        } else if (columnIndex === 2) {
            // Price values
            return parseFloat(aValue.replace('$', '')) - parseFloat(bValue.replace('$', ''));
        } else {
            // String values
            return aValue.localeCompare(bValue);
        }
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

// Add sorting indicators
document.querySelectorAll('.comparison-table th').forEach((header, index) => {
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => sortTable(index));
});




