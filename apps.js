





// Sample apps data
const appsData = [
    {
        name: "ChatFlow",
        description: "AI-powered chat application with multi-model support and real-time switching between providers.",
        users: "50K+",
        rating: "4.8★",
        category: "Chat",
        tags: ["Chat", "Multi-Model", "Real-time"],
        featured: true,
        icon: "fas fa-comments"
    },
    {
        name: "CodeGenius",
        description: "Advanced code generation and debugging assistant with support for 50+ programming languages.",
        users: "25K+",
        rating: "4.9★",
        category: "Development",
        tags: ["Code", "Debugging", "Multi-language"],
        featured: true,
        icon: "fas fa-code"
    },
    {
        name: "Artisan AI",
        description: "Creative content generation and image creation platform with multiple AI models.",
        users: "100K+",
        rating: "4.7★",
        category: "Creative",
        tags: ["Creative", "Image", "Content"],
        featured: true,
        icon: "fas fa-palette"
    },
    {
        name: "AI Assistant Pro",
        description: "Smart personal assistant with memory and context awareness.",
        users: "15K+",
        rating: "4.6★",
        category: "Productivity",
        tags: ["Assistant", "Memory", "Context"],
        featured: false,
        icon: "fas fa-robot"
    },
    {
        name: "Translate Master",
        description: "Real-time translation with context and cultural understanding.",
        users: "30K+",
        rating: "4.5★",
        category: "Language",
        tags: ["Translation", "Real-time", "Context"],
        featured: false,
        icon: "fas fa-language"
    },
    {
        name: "Image Enhancer",
        description: "AI-powered image enhancement and restoration tools.",
        users: "40K+",
        rating: "4.4★",
        category: "Creative",
        tags: ["Image", "Enhancement", "Restoration"],
        featured: false,
        icon: "fas fa-image"
    }
];

// Categories data
const categoriesData = [
    { name: "Chat & Conversational", count: "250+", icon: "fas fa-comments" },
    { name: "Development", count: "180+", icon: "fas fa-code" },
    { name: "Creative", count: "150+", icon: "fas fa-palette" },
    { name: "Analytics", count: "120+", icon: "fas fa-chart-line" },
    { name: "Education", count: "100+", icon: "fas fa-graduation-cap" },
    { name: "Business", count: "200+", icon: "fas fa-briefcase" }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedApps();
    renderCategories();
    setupEventListeners();
});

// Render featured apps
function renderFeaturedApps() {
    const appsGrid = document.querySelector('.apps-grid');
    appsGrid.innerHTML = '';
    
    const featuredApps = appsData.filter(app => app.featured);
    featuredApps.forEach(app => {
        const card = createAppCard(app);
        appsGrid.appendChild(card);
    });
}

function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card featured';
    card.innerHTML = `
        <div class="app-header">
            <div class="app-icon">
                <i class="${app.icon}"></i>
            </div>
            <div class="app-badge">Featured</div>
        </div>
        <h3>${app.name}</h3>
        <p>${app.description}</p>
        <div class="app-stats">
            <div class="stat">
                <span class="stat-number">${app.users}</span>
                <span class="stat-label">Users</span>
            </div>
            <div class="stat">
                <span class="stat-number">${app.rating}</span>
                <span class="stat-label">Rating</span>
            </div>
        </div>
        <div class="app-tags">
            ${app.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="app-actions">
            <button class="btn-primary" onclick="tryDemo('${app.name}')">Try Demo</button>
            <button class="btn-outline" onclick="viewCode('${app.name}')">View Code</button>
        </div>
    `;
    return card;
}

// Render categories
function renderCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    categoriesGrid.innerHTML = '';
    
    categoriesData.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>Discover amazing applications in this category</p>
            <span class="category-count">${category.count} apps</span>
        `;
        
        card.addEventListener('click', () => filterByCategory(category.name));
        categoriesGrid.appendChild(card);
    });
}

// Event listeners
function setupEventListeners() {
    // Category filtering
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            filterByCategory(category);
        });
    });
}

// Filter functions
function filterByCategory(category) {
    const filteredApps = appsData.filter(app => app.category === category || category.includes(app.category));
    renderFilteredApps(filteredApps);
}

function renderFilteredApps(apps) {
    const appsGrid = document.querySelector('.apps-grid');
    appsGrid.innerHTML = '';
    
    apps.forEach(app => {
        const card = createAppCard(app);
        appsGrid.appendChild(card);
    });
}

// Utility functions
function tryDemo(appName) {
    alert(`Launching demo for ${appName}...`);
}

function viewCode(appName) {
    alert(`Opening code repository for ${appName}...`);
}

// Search functionality
function searchApps(query) {
    const filteredApps = appsData.filter(app => 
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase()) ||
        app.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    renderFilteredApps(filteredApps);
}

// Add search input dynamically
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search apps...';
searchInput.className = 'search-input';
searchInput.addEventListener('input', (e) => searchApps(e.target.value));

// Add search to page
const featuredApps = document.querySelector('.featured-apps .container');
featuredApps.insertBefore(searchInput, featuredApps.querySelector('.apps-grid'));






