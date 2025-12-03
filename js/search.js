// ==========================================
// SEARCH FUNCTIONALITY - search.js
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.querySelector('.search-input');
    const searchSubmit = document.querySelector('.search-submit');
    
    // Open search overlay
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (searchOverlay) {
                searchOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus on input after animation
                setTimeout(() => {
                    if (searchInput) {
                        searchInput.focus();
                    }
                }, 300);
            }
        });
    }
    
    // Close search overlay
    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }
    
    // Close on overlay click (outside search box)
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
    
    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (searchInput) {
                searchInput.value = '';
            }
            hideSearchSuggestions();
        }
    }
    
    // Search submission
    if (searchSubmit) {
        searchSubmit.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        // Submit on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Live search suggestions
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    showSearchSuggestions(query);
                }, 300);
            } else {
                hideSearchSuggestions();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput ? searchInput.value.trim() : '';
        
        if (query) {
            console.log('Searching for:', query);
            
            // Option 1: Redirect to search results page
            // window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            
            // Option 2: Show results inline (for demo)
            alert(`Searching for: "${query}"\n\nSearch results page will be implemented with:\n- Test catalog results\n- Service matches\n- Location results\n- FAQ results`);
            
            closeSearch();
        }
    }
    
    function showSearchSuggestions(query) {
        // Sample search data - replace with real data from your database
        const searchData = [
            // Tests
            { type: 'test', name: 'Complete Blood Count (CBC)', category: 'Blood Tests', url: 'test-menu.html#cbc' },
            { type: 'test', name: 'Basic Metabolic Panel', category: 'Blood Tests', url: 'test-menu.html#bmp' },
            { type: 'test', name: 'Lipid Panel', category: 'Cholesterol', url: 'test-menu.html#lipid' },
            { type: 'test', name: 'Thyroid Function Tests (TSH, T3, T4)', category: 'Hormone Tests', url: 'test-menu.html#thyroid' },
            { type: 'test', name: 'Hemoglobin A1C', category: 'Diabetes', url: 'test-menu.html#a1c' },
            { type: 'test', name: 'Urinalysis', category: 'Urine Tests', url: 'test-menu.html#urinalysis' },
            { type: 'test', name: 'COVID-19 PCR Test', category: 'Infectious Disease', url: 'test-menu.html#covid' },
            { type: 'test', name: 'Vitamin D Test', category: 'Vitamins', url: 'test-menu.html#vitamin-d' },
            
            // Services
            { type: 'service', name: 'Wellness Programs', category: 'Services', url: 'wellness.html' },
            { type: 'service', name: 'Specialty Testing', category: 'Services', url: 'specialty-testing.html' },
            { type: 'service', name: 'Corporate Health Screening', category: 'Services', url: 'services.html#corporate' },
            
            // Pages
            { type: 'page', name: 'Find a Location', category: 'Information', url: 'find-location.html' },
            { type: 'page', name: 'Book Appointment', category: 'Information', url: 'book-appointment.html' },
            { type: 'page', name: 'Patient Portal', category: 'Information', url: 'patient-portal.html' },
            { type: 'page', name: 'Insurance Information', category: 'Information', url: 'insurance.html' },
            { type: 'page', name: 'Test Results', category: 'Information', url: 'results.html' },
            { type: 'page', name: 'Pay Bill Online', category: 'Information', url: 'billing.html' }
        ];
        
        // Filter suggestions based on query
        const filtered = searchData.filter(item => {
            const searchText = (item.name + ' ' + item.category).toLowerCase();
            return searchText.includes(query.toLowerCase());
        }).slice(0, 8); // Limit to 8 results
        
        if (filtered.length > 0) {
            displaySuggestions(filtered, query);
        } else {
            showNoResults(query);
        }
    }
    
    function displaySuggestions(suggestions, query) {
        hideSearchSuggestions();
        
        const suggestionsBox = document.createElement('div');
        suggestionsBox.className = 'search-suggestions';
        suggestionsBox.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-radius: 12px;
            margin-top: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            max-height: 450px;
            overflow-y: auto;
            z-index: 10;
            animation: slideDown 0.3s ease-out;
        `;
        
        suggestionsBox.innerHTML = suggestions.map(item => `
            <a href="${item.url}" class="suggestion-item" style="
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px 20px;
                color: #374151;
                text-decoration: none;
                border-bottom: 1px solid #E5E7EB;
                transition: all 0.2s;
            ">
                <div style="
                    width: 40px;
                    height: 40px;
                    background: ${getTypeColor(item.type)};
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                ">
                    <i class="fas fa-${getIcon(item.type)}" style="color: white; font-size: 18px;"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 500; margin-bottom: 3px;">${highlightMatch(item.name, query)}</div>
                    <div style="font-size: 12px; color: #6B7280;">${item.category}</div>
                </div>
                <i class="fas fa-arrow-right" style="color: #D1D5DB; font-size: 14px;"></i>
            </a>
        `).join('');
        
        // Add hover effects
        const items = suggestionsBox.querySelectorAll('.suggestion-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.background = '#F9FAFB';
                this.style.paddingLeft = '25px';
            });
            item.addEventListener('mouseleave', function() {
                this.style.background = 'white';
                this.style.paddingLeft = '20px';
            });
        });
        
        document.querySelector('.search-container').appendChild(suggestionsBox);
    }
    
    function showNoResults(query) {
        hideSearchSuggestions();
        
        const noResults = document.createElement('div');
        noResults.className = 'search-suggestions';
        noResults.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-radius: 12px;
            margin-top: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            padding: 40px 20px;
            text-align: center;
            z-index: 10;
        `;
        
        noResults.innerHTML = `
            <i class="fas fa-search" style="font-size: 48px; color: #D1D5DB; margin-bottom: 15px;"></i>
            <h3 style="font-size: 18px; color: #374151; margin-bottom: 8px;">No results found</h3>
            <p style="font-size: 14px; color: #6B7280;">Try searching for tests, services, or locations</p>
        `;
        
        document.querySelector('.search-container').appendChild(noResults);
    }
    
    function hideSearchSuggestions() {
        const suggestionsBox = document.querySelector('.search-suggestions');
        if (suggestionsBox) {
            suggestionsBox.remove();
        }
    }
    
    function getIcon(type) {
        const icons = {
            'test': 'flask',
            'service': 'heartbeat',
            'page': 'file-alt',
            'location': 'map-marker-alt'
        };
        return icons[type] || 'circle';
    }
    
    function getTypeColor(type) {
        const colors = {
            'test': '#0066CC',
            'service': '#00A86B',
            'page': '#3B82F6',
            'location': '#F59E0B'
        };
        return colors[type] || '#6B7280';
    }
    
    function highlightMatch(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong style="color: #0066CC;">$1</strong>');
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchBtn) {
                searchBtn.click();
            }
        }
    });
    
    // Add slideDown animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Search functionality initialized');
    console.log('Tip: Press Ctrl+K (or Cmd+K on Mac) to open search');
    
});