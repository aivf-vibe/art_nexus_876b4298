




// Sample leaderboard data
const leaderboardData = {
    overall: [
        { rank: 1, model: "GPT-4o", provider: "OpenAI", score: 95.2, price: 5.00, context: "128K", trend: "up" },
        { rank: 2, model: "Claude 3.5 Sonnet", provider: "Anthropic", score: 94.8, price: 3.00, context: "200K", trend: "up" },
        { rank: 3, model: "Gemini Pro", provider: "Google", score: 92.5, price: 0.50, context: "1M", trend: "stable" },
        { rank: 4, model: "Llama 3.1 405B", provider: "Meta", score: 91.2, price: 3.50, context: "128K", trend: "up" },
        { rank: 5, model: "Mistral Large", provider: "Mistral", score: 89.7, price: 2.00, context: "32K", trend: "down" },
        { rank: 6, model: "Command R+", provider: "Cohere", score: 88.3, price: 1.50, context: "128K", trend: "up" },
        { rank: 7, model: "GPT-4o Mini", provider: "OpenAI", score: 87.9, price: 0.60, context: "128K", trend: "new" },
        { rank: 8, model: "Claude 3 Haiku", provider: "Anthropic", score: 85.1, price: 0.25, context: "200K", trend: "stable" },
        { rank: 9, model: "Gemini Flash", provider: "Google", score: 84.7, price: 0.15, context: "1M", trend: "up" },
        { rank: 10, model: "Llama 3.1 70B", provider: "Meta", score: 83.5, price: 1.00, context: "128K", trend: "stable" }
    ],
    coding: [
        { rank: 1, model: "Claude 3.5 Sonnet", provider: "Anthropic", score: 94.8, price: 3.00, context: "200K", trend: "up" },
        { rank: 2, model: "GPT-4o", provider: "OpenAI", score: 94.5, price: 5.00, context: "128K", trend: "stable" },
        { rank: 3, model: "Llama 3.1 405B", provider: "Meta", score: 91.2, price: 3.50, context: "128K", trend: "up" },
        { rank: 4, model: "Gemini Pro", provider: "Google", score: 89.7, price: 0.50, context: "1M", trend: "stable" },
        { rank: 5, model: "Mistral Large", provider: "Mistral", score: 87.3, price: 2.00, context: "32K", trend: "down" }
    ],
    reasoning: [
        { rank: 1, model: "GPT-4o", provider: "OpenAI", score: 95.2, price: 5.00, context: "128K", trend: "up" },
        { rank: 2, model: "Claude 3.5 Sonnet", provider: "Anthropic", score: 94.8, price: 3.00, context: "200K", trend: "up" },
        { rank: 3, model: "Llama 3.1 405B", provider: "Meta", score: 91.2, price: 3.50, context: "128K", trend: "stable" },
        { rank: 4, model: "Gemini Pro", provider: "Google", score: 88.5, price: 0.50, context: "1M", trend: "stable" },
        { rank: 5, model: "Command R+", provider: "Cohere", score: 86.3, price: 1.50, context: "128K", trend: "up" }
    ],
    vision: [
        { rank: 1, model: "GPT-4o", provider: "OpenAI", score: 94.8, price: 5.00, context: "128K", trend: "up" },
        { rank: 2, model: "Gemini Pro", provider: "Google", score: 92.5, price: 0.50, context: "1M", trend: "stable" },
        { rank: 3, model: "Claude 3.5 Sonnet", provider: "Anthropic", score: 91.7, price: 3.00, context: "200K", trend: "up" },
        { rank: 4, model: "GPT-4o Mini", provider: "OpenAI", score: 87.9, price: 0.60, context: "128K", trend: "new" },
        { rank: 5, model: "Gemini Flash", provider: "Google", score: 84.7, price: 0.15, context: "1M", trend: "up" }
    ],
    multilingual: [
        { rank: 1, model: "Gemini Pro", provider: "Google", score: 92.5, price: 0.50, context: "1M", trend: "stable" },
        { rank: 2, model: "GPT-4o", provider: "OpenAI", score: 91.8, price: 5.00, context: "128K", trend: "stable" },
        { rank: 3, model: "Claude 3.5 Sonnet", provider: "Anthropic", score: 90.2, price: 3.00, context: "200K", trend: "up" },
        { rank: 4, model: "Mistral Large", provider: "Mistral", score: 88.7, price: 2.00, context: "32K", trend: "stable" },
        { rank: 5, model: "Command R+", provider: "Cohere", score: 87.3, price: 1.50, context: "128K", trend: "up" }
    ]
};

// DOM Elements
const leaderboardBody = document.getElementById('leaderboardBody');
const leaderboardCards = document.getElementById('leaderboardCards');
const modelCount = document.getElementById('modelCount');
const tabBtns = document.querySelectorAll('.tab-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const timeFilter = document.getElementById('timeFilter');
const providerFilter = document.getElementById('providerFilter');
const priceFilter = document.getElementById('priceFilter');

// State
let currentCategory = 'overall';
let currentView = 'table';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', handleTabChange);
    });

    viewBtns.forEach(btn => {
        btn.addEventListener('click', handleViewChange);
    });

    [timeFilter, providerFilter, priceFilter].forEach(filter => {
        filter.addEventListener('change', renderLeaderboard);
    });
}

// Render Functions
function renderLeaderboard() {
    const data = getFilteredData();
    
    if (currentView === 'table') {
        renderTable(data);
    } else {
        renderCards(data);
    }
    
    updateModelCount(data.length);
}

function renderTable(data) {
    leaderboardBody.innerHTML = '';
    
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="rank-badge rank-${item.rank <= 3 ? item.rank : 'other'}">
                    ${item.rank}
                </span>
            </td>
            <td>
                <div class="model-info">
                    <div class="model-avatar" style="background: ${getProviderColor(item.provider)}">
                        ${item.provider.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 600;">${item.model}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">${item.provider}</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="provider-badge">${item.provider}</span>
            </td>
            <td>
                <span class="score-badge score-${getScoreClass(item.score)}">
                    ${item.score}%
                    ${getTrendIcon(item.trend)}
                </span>
            </td>
            <td>
                <span class="price-tag">$${item.price}</span>
            </td>
            <td>
                <span class="context-badge">${item.context}</span>
            </td>
            <td>
                <button class="action-btn" onclick="useModel('${item.model}')">
                    Use Model
                </button>
            </td>
        `;
        leaderboardBody.appendChild(row);
    });
}

function renderCards(data) {
    leaderboardCards.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'leaderboard-card';
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <div class="card-rank">#${item.rank}</div>
                    <div class="card-model">${item.model}</div>
                    <div class="card-provider">${item.provider}</div>
                </div>
                <div class="model-avatar" style="background: ${getProviderColor(item.provider)}">
                    ${item.provider.charAt(0)}
                </div>
            </div>
            <div class="card-metrics">
                <div class="card-metric">
                    <div class="card-metric-label">Score</div>
                    <div class="card-metric-value">${item.score}%</div>
                </div>
                <div class="card-metric">
                    <div class="card-metric-label">Price</div>
                    <div class="card-metric-value">$${item.price}</div>
                </div>
                <div class="card-metric">
                    <div class="card-metric-label">Context</div>
                    <div class="card-metric-value">${item.context}</div>
                </div>
            </div>
            <button class="action-btn" onclick="useModel('${item.model}')" style="width: 100%;">
                Use Model
            </button>
        `;
        leaderboardCards.appendChild(card);
    });
}

// Filter Functions
function getFilteredData() {
    let data = leaderboardData[currentCategory] || [];
    
    // Apply filters
    const provider = providerFilter.value;
    const priceRange = priceFilter.value;
    
    if (provider) {
        data = data.filter(item => item.provider.toLowerCase() === provider);
    }
    
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
        data = data.filter(item => item.price >= min && item.price <= max);
    }
    
    return data;
}

// Event Handlers
function handleTabChange(e) {
    tabBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.category;
    renderLeaderboard();
}

function handleViewChange(e) {
    viewBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentView = e.target.dataset.view;
    
    const tableContainer = document.querySelector('.leaderboard-table-container');
    const cardsContainer = document.getElementById('leaderboardCards');
    
    if (currentView === 'table') {
        tableContainer.style.display = 'block';
        cardsContainer.style.display = 'none';
    } else {
        tableContainer.style.display = 'none';
        cardsContainer.style.display = 'grid';
    }
    
    renderLeaderboard();
}

// Utility Functions
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

function getScoreClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    return 'average';
}

function getTrendIcon(trend) {
    switch(trend) {
        case 'up': return '<i class="fas fa-arrow-up" style="margin-left: 0.25rem; color: #10b981;"></i>';
        case 'down': return '<i class="fas fa-arrow-down" style="margin-left: 0.25rem; color: #ef4444;"></i>';
        case 'stable': return '<i class="fas fa-minus" style="margin-left: 0.25rem; color: #6b7280;"></i>';
        case 'new': return '<i class="fas fa-star" style="margin-left: 0.25rem; color: #f59e0b;"></i>';
        default: return '';
    }
}

function updateModelCount(count) {
    modelCount.textContent = `(${count})`;
}

function useModel(modelName) {
    alert(`Redirecting to API documentation for ${modelName}...`);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '1') handleTabChange({ target: tabBtns[0] });
    if (e.key === '2') handleTabChange({ target: tabBtns[1] });
    if (e.key === '3') handleTabChange({ target: tabBtns[2] });
    if (e.key === '4') handleTabChange({ target: tabBtns[3] });
    if (e.key === '5') handleTabChange({ target: tabBtns[4] });
});




