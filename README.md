# WellCare Diagnostics Website

## 📁 Project Structure

```
wellcare-diagnostics/
│
├── index.html                 # Homepage
├── README.md                  # This file
│
├── css/                       # Stylesheets
│   ├── variables.css         # CSS custom properties
│   ├── reset.css             # Reset & base styles
│   ├── header.css            # Top header bar
│   ├── navigation.css        # Main navigation menu
│   ├── hero.css              # Hero section
│   ├── features.css          # Features & cards
│   ├── footer.css            # Footer styles
│   └── responsive.css        # Media queries
│
├── js/                        # JavaScript files
│   ├── navigation.js         # Navigation functionality
│   ├── scroll.js             # Scroll effects
│   ├── search.js             # Search overlay
│   └── main.js               # Main JS file
│
├── pages/                     # Additional pages
│   ├── patient-portal.html
│   ├── find-location.html
│   ├── test-menu.html
│   ├── results.html
│   ├── billing.html
│   ├── insurance.html
│   ├── about.html
│   ├── contact.html
│   └── book-appointment.html
│
├── images/                    # Image assets
│   ├── logo/
│   ├── hero/
│   ├── features/
│   └── team/
│
└── assets/                    # Other assets
    ├── fonts/
    ├── icons/
    └── documents/
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #0066CC
- **Secondary Green**: #00A86B
- **Accent Orange**: #FF6B35
- **Neutrals**: Gray scale from 50-900

### Typography
- **Primary Font**: Inter (body text)
- **Secondary Font**: Poppins (headings)

### Spacing Scale
Based on 4px increments (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)

## 🚀 Features

### Navigation
- Sticky navigation with dropdown menus
- Search overlay
- Mobile responsive menu
- Smooth scroll behavior

### Homepage Sections
1. **Hero Section** - Main banner with CTAs
2. **Quick Access Cards** - Fast links to key features
3. **Features Grid** - 6 key benefits
4. **Stats Section** - Company statistics
5. **Footer** - Comprehensive links and contact info

### Interactive Elements
- Dropdown menus with smooth animations
- Search overlay
- Scroll-to-top button
- Mobile menu toggle
- Hover effects on all interactive elements

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: > 1440px

## 🔧 Setup Instructions

1. **Download all files** and maintain the folder structure
2. **Link CSS files** in order (variables → reset → specific styles)
3. **Add Font Awesome** for icons (already linked in HTML)
4. **Optional**: Add Google Fonts for Inter and Poppins

### Google Fonts (Add to `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

## 📄 Next Steps

### Phase 1: Core Structure (Completed)
- ✅ HTML structure
- ✅ CSS variables
- ✅ Reset styles
- ✅ Header & Navigation
- 🔄 Hero section (in progress)
- 🔄 Features section (in progress)
- 🔄 Footer (in progress)

### Phase 2: Styling (Next)
- Navigation complete styling
- Hero section with background
- Features grid
- Stats section
- Footer complete

### Phase 3: JavaScript
- Navigation dropdowns
- Mobile menu
- Search functionality
- Scroll effects
- Form validation

### Phase 4: Additional Pages
- Patient Portal
- Test Menu
- Results Page
- Billing System
- Insurance Information
- Contact Form
- Appointment Booking

## 🎯 Key Features to Implement

1. **Patient Portal**
   - Login/Registration
   - View test results
   - Download reports
   - Appointment history

2. **Test Menu**
   - Searchable test catalog
   - Filter by category
   - Pricing information
   - Test descriptions

3. **Location Finder**
   - Interactive map
   - Search by ZIP code
   - Directions
   - Hours of operation

4. **Appointment Booking**
   - Calendar interface
   - Time slot selection
   - Test selection
   - Confirmation system

5. **Billing & Insurance**
   - Payment portal
   - Insurance verification
   - Cost estimator
   - Payment plans

## 💡 Development Tips

1. **File Organization**: Keep CSS modular for easy maintenance
2. **Naming Convention**: Use BEM (Block Element Modifier)
3. **Comments**: Document complex sections
4. **Version Control**: Use Git for tracking changes
5. **Testing**: Test on multiple browsers and devices

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📞 Support

For questions or issues, refer to the documentation or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: In Development