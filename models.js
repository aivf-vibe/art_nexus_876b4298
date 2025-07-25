



// Sample model data
const modelsData = [
    {
        id: 1,
        name: "GPT-4o",
        provider: "OpenAI",
        providerId: "openai",
        price: 5.00,
        context: "128K",
        performance: 95.2,
        tags: ["vision", "code", "reasoning"],
        description: "Most capable OpenAI model for complex tasks",
        capabilities: ["Text generation", "Code generation", "Vision", "Function calling"],
        strengths: ["Complex reasoning", "Code generation", "Creative writing"],
        weaknesses: ["Higher cost", "Rate limits"],
        avatar: "null"
    },
    {
        id: 2,
        name: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        providerId: "anthropic",
        price: 3.00,
        context: "200K",
        performance: 94.8,
        tags: ["reasoning", "safe", "code"],
        description: "Anthropic's most capable model for complex reasoning",
        capabilities: ["Text generation", "Code generation", "Analysis", "Reasoning"],
        strengths: ["Long context", "Safe outputs", "Complex reasoning"],
        weaknesses: ["Slower responses", "Higher cost"],
        avatar: "null"
    },
    {
        id: 3,
        name: "Gemini Pro",
        provider: "Google",
        providerId: "google",
        price: 0.50,
        context: "1M",
        performance: 92.5,
        tags: ["multilingual", "fast", "vision"],
        description: "Google's versatile multimodal AI model",
        capabilities: ["Text generation", "Vision", "Multilingual", "Code"],
        strengths: ["Fast responses", "Multilingual", "Cost-effective"],
        weaknesses: ["Less creative", "Occasional inaccuracies"],
        avatar: "null"
    },
    {
        id: 4,
        name: "Llama 3.1 405B",
        provider: "Meta",
        providerId: "meta",
        price: 3.50,
        context: "128K",
        performance: 91.2,
        tags: ["open-source", "large", "reasoning"],
        description: "Meta's largest open-source language model",
        capabilities: ["Text generation", "Code generation", "Reasoning", "Analysis"],
        strengths: ["Open source", "Strong performance", "Large context"],
        weaknesses: ["Resource intensive", "Higher cost"],
        avatar: "null"
    },
    {
        id: 5,
        name: "Mistral Large",
        provider: "Mistral",
        providerId: "mistral",
        price: 2.00,
        context: "32K",
        performance: 89.7,
        tags: ["fast", "multilingual", "code"],
        description: "Mistral's most capable model for complex tasks",
        capabilities: ["Text generation", "Code generation", "Multilingual", "Analysis"],
        strengths: ["Fast responses", "Multilingual", "Good balance"],
        weaknesses: ["Smaller context", "Limited vision"],
        avatar: "null"
    },
    {
        id: 6,
        name: "Command R+",
        provider: "Cohere",
        providerId: "cohere",
        price: 1.50,
        context: "128K",
        performance: 88.3,
        tags: ["retrieval", "multilingual", "business"],
        description: "Cohere's model optimized for RAG and business use cases",
        capabilities: ["Text generation", "Retrieval", "Multilingual", "Business"],
        strengths: ["RAG optimized", "Business focus", "Good pricing"],
        weaknesses: ["Limited creative tasks", "Newer model"],
        avatar: "null"
    },
    {
        id: 7,
        name: "GPT-4o Mini",
        provider: "OpenAI",
        providerId: "openai",
        price: 0.60,
        context: "128K",
        performance: 87.9,
        tags: ["fast", "cost-effective", "vision"],
        description: "Smaller and faster version of GPT-4o",
        capabilities: ["Text generation", "Vision", "Code generation"],
        strengths: ["Fast responses", "Cost-effective", "Good performance"],
        weaknesses: ["Less capable than GPT-4o", "Rate limits"],
        avatar: "null"
    },
    {
        id: 8,
        name: "Claude 3 Haiku",
        provider: "Anthropic",
        providerId: "anthropic",
        price: 0.25,
        context: "200K",
        performance: 85.1,
        tags: ["fast", "cost-effective", "safe"],
        description: "Fastest and most cost-effective Claude model",
        capabilities: ["Text generation", "Analysis", "Summarization"],
        strengths: ["Very fast", "Cost-effective", "Safe outputs"],
        weaknesses: ["Less capable", "Limited complex reasoning"],
        avatar: "null"
    }
];

// DOM Elements
const modelsGrid = document.getElementById('modelsGrid');
const modelSearch = document.getElementById('modelSearch');
const providerFilter = document.getElementById('providerFilter');
const priceFilter = document.getElementById('priceFilter');
const contextFilter = document.getElementById('contextFilter');
const sortFilter = document.getElementById('sortFilter');
const modelCount = document.getElementById('modelCount');
const loadMoreBtn = document.getElementById('loadMore');
const modal = document.getElementById('modelModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// State
let filteredModels = [...modelsData];
let currentPage = 1;
const modelsPerPage = 12;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderModels();
    setupEventListeners();
    updateModelCount();
});

// Helper functions for provider colors and letters
function getProviderColor(provider) {
    const colors = {
        'OpenAI': '#10a37f',
        'Anthropic': '#7c3aed',
        'Google': '#4285f4',
        'Meta': '#ff6b35',
        'Mistral': '#22c55e',
        'Cohere': '#3b82f6'
    };
    return colors[provider] || '#6366f1';
}

function getProviderLetter(provider) {
    const letters = {
        'OpenAI': 'O',
        'Anthropic': 'A',
        'Google': 'G',
        'Meta': 'M',
        'Mistral': 'Mi',
        'Cohere': 'C'
    };
    return letters[provider] || provider.charAt(0);
}

// Event Listeners
function setupEventListeners() {
    modelSearch.addEventListener('input', handleSearch);
    providerFilter.addEventListener('change', handleFilter);
    priceFilter.addEventListener('change', handleFilter);
    contextFilter.addEventListener('change', handleFilter);
    sortFilter.addEventListener('change', handleFilter);
    loadMoreBtn.addEventListener('click', loadMoreModels);

    // Filter tags
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', handleTagFilter);
    });

    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });

    // Modal close
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Render Models
function renderModels() {
    const startIndex = (currentPage - 1) * modelsPerPage;
    const endIndex = startIndex + modelsPerPage;
    const modelsToShow = filteredModels.slice(0, endIndex);

    modelsGrid.innerHTML = '';
    
    modelsToShow.forEach(model => {
        const modelCard = createModelCard(model);
        modelsGrid.appendChild(modelCard);
    });

    updateLoadMoreButton();
}

function createModelCard(model) {
    const card = document.createElement('div');
    card.className = 'model-card-detailed';
    card.innerHTML = `
        <div class="model-header-detailed">
            <div class="model-avatar" style="background: ${getProviderColor(model.provider)}; color: white; font-weight: bold; display: flex; align-items: center; justify-content: center;">
                ${getProviderLetter(model.provider)}
            </div>
            <div class="model-info">
                <h3>${model.name}</h3>
                <span class="model-provider">${model.provider}</span>
            </div>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">${model.description}</p>
        <div class="model-specs">
            <div class="spec-item">
                <span class="spec-label">Price:</span>
                <span class="spec-value">$${model.price}/1M tokens</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Context:</span>
                <span class="spec-value">${model.context}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Performance:</span>
                <span class="spec-value">${model.performance}%</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Provider:</span>
                <span class="spec-value">${model.provider}</span>
            </div>
        </div>
        <div class="model-tags-detailed">
            ${model.tags.map(tag => `<span class="tag-detailed">${tag}</span>`).join('')}
        </div>
        <div class="model-actions">
            <button class="btn-small btn-primary-small" onclick="openModelModal(${model.id})">
                <i class="fas fa-info-circle"></i> Details
            </button>
            <button class="btn-small btn-outline-small" onclick="useModel('${model.name}')">
                <i class="fas fa-play"></i> Use Model
            </button>
        </div>
    `;
    return card;
}

// Filter and Search
function handleSearch() {
    const searchTerm = modelSearch.value.toLowerCase();
    filteredModels = modelsData.filter(model => 
        model.name.toLowerCase().includes(searchTerm) ||
        model.provider.toLowerCase().includes(searchTerm) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    currentPage = 1;
    renderModels();
    updateModelCount();
}

function handleFilter() {
    const provider = providerFilter.value;
    const priceRange = priceFilter.value;
    const context = contextFilter.value;

    filteredModels = modelsData.filter(model => {
        let matches = true;

        if (provider && model.providerId !== provider) matches = false;
        
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
            if (model.price < min || model.price > max) matches = false;
        }

        if (context && model.context !== context) matches = false;

        return matches;
    });

    // Sort
    const sortBy = sortFilter.value;
    filteredModels.sort((a, b) => {
        switch(sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'performance': return b.performance - a.performance;
            case 'newest': return b.id - a.id;
            default: return 0;
        }
    });

    currentPage = 1;
    renderModels();
    updateModelCount();
}

function handleTagFilter(e) {
    document.querySelectorAll('.filter-tag').forEach(tag => tag.classList.remove('active'));
    e.target.classList.add('active');
    
    const filter = e.target.dataset.filter;
    if (filter === 'all') {
        filteredModels = [...modelsData];
    } else {
        filteredModels = modelsData.filter(model => model.tags.includes(filter));
    }
    
    currentPage = 1;
    renderModels();
    updateModelCount();
}

function handleViewToggle(e) {
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    const view = e.target.dataset.view;
    if (view === 'list') {
        modelsGrid.className = 'models-list';
    } else {
        modelsGrid.className = 'models-grid';
    }
}

// Modal Functions
function openModelModal(modelId) {
    const model = modelsData.find(m => m.id === modelId);
    if (!model) return;

    modalTitle.textContent = `${model.name} - ${model.provider}`;
    modalBody.innerHTML = `
        <div style="display: grid; gap: 1.5rem;">
            <div>
                <h4>Description</h4>
                <p>${model.description}</p>
            </div>
            <div>
                <h4>Capabilities</h4>
                <ul style="margin: 0; padding-left: 1.5rem;">
                    ${model.capabilities.map(cap => `<li>${cap}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h4>Strengths</h4>
                <ul style="margin: 0; padding-left: 1.5rem; color: var(--success-color);">
                    ${model.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h4>Considerations</h4>
                <ul style="margin: 0; padding-left: 1.5rem; color: var(--warning-color);">
                    ${model.weaknesses.map(w => `<li>${w}</li>`).join('')}
                </ul>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <strong>Price:</strong> $${model.price}/1M tokens
                </div>
                <div>
                    <strong>Context:</strong> ${model.context}
                </div>
                <div>
                    <strong>Performance:</strong> ${model.performance}%
                </div>
                <div>
                    <strong>Provider:</strong> ${model.provider}
                </div>
            </div>
            <div>
                <h4>Tags</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${model.tags.map(tag => `<span class="tag-detailed">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

// Utility Functions
function updateModelCount() {
    modelCount.textContent = `(${filteredModels.length})`;
}

function loadMoreModels() {
    currentPage++;
    renderModels();
}

function useModel(modelName) {
    alert(`Redirecting to API documentation for ${modelName}...`);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});



