# KYC Login System

A modern, responsive login system with unified design across all authentication pages.

## 🎯 Features

- **Unified Design**: Consistent visual style across login, signup, and forgot password pages
- **Modern UI**: Clean, professional interface with Ant Design SVG icons
- **Responsive**: Works perfectly on desktop and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support
- **Email-based Authentication**: Simplified login using email instead of username
- **Password Visibility Toggle**: Professional eye icons for password show/hide
- **Form Validation**: Real-time validation with user-friendly error messages
- **English Interface**: Fully internationalized English interface

## 📱 Pages

### 1. Login Page (`login.html`)
- Email + Password authentication
- "Remember me" option
- Forgot password link
- Sign up redirect

### 2. Signup Page (`signup.html`)
- Email + Password + Confirm Password
- Real-time password strength indicator
- Login redirect for existing users

### 3. Forgot Password Page (`forgot-password.html`)
- Email-based password reset
- Success confirmation with resend option
- Back to login navigation

## 🎨 Design System

### Colors
- **Primary**: Cattai Green `#00281F`
- **Background**: Light gray `#f5f5f5`
- **Container**: White `#ffffff`
- **Icons**: Black `#333333`
- **Error**: Red `#ff0000`

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif
- **Logo**: 36px, bold, letter-spacing 4px
- **Headers**: 18px, normal weight
- **Body**: 16px, normal weight

### Icons
- **Email**: Ant Design MailOutlined SVG
- **Password**: Ant Design LockOutlined SVG
- **Show Password**: Ant Design EyeOutlined SVG
- **Hide Password**: EyeInvisibleOutlined with diagonal line

## 🛠 Technical Implementation

### Structure
```
├── index.html              # Demo homepage
├── login.html              # Login page
├── signup.html             # Registration page
├── forgot-password.html    # Password reset page
├── styles.css              # Unified stylesheet (legacy)
├── auth.js                 # Authentication logic (legacy)
└── README.md               # This file
```

### Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactions
- **SVG Icons**: Ant Design icon library
- **Responsive Design**: Mobile-first approach

### Browser Support
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🚀 Getting Started

### Quick Start
1. Clone the repository
2. Open `index.html` in your browser to see the demo
3. Navigate to individual pages to test functionality

### Development
1. Each HTML file is self-contained with inline CSS and JavaScript
2. No build process required
3. No external dependencies

### Integration
To integrate with your backend:
1. Replace the `simulateApiCall()` functions in JavaScript with actual API calls
2. Update form action URLs as needed
3. Customize validation rules in the JavaScript sections

## 📝 Customization

### Colors
Modify the CSS custom properties in each HTML file:
```css
:root {
    --primary-color: #00281F;    /* Cattai Green */
    --bg-color: #f5f5f5;         /* Background */
    --container-bg: #ffffff;     /* Container */
    --icon-color: #333333;       /* Icons */
}
```

### Content
- Update placeholder text in input fields
- Modify button text and labels
- Customize error messages in JavaScript

### Styling
- Adjust container dimensions
- Modify spacing and typography
- Update border radius and shadows

## 🔧 API Integration

The forms are ready for backend integration. Update these functions:

```javascript
// In each HTML file, replace simulation with actual API calls
async function handleLogin(email, password) {
    // Replace with actual login API
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}
```

## 📋 Requirements Document

See `KYC登录系统重构需求文档.md` for detailed requirements and improvement records.

## 🎯 Key Improvements

1. **Simplified Architecture**: Removed username requirement, email-only authentication
2. **Visual Consistency**: Unified design system across all pages
3. **Better UX**: Reduced error message prominence, single-line field validation
4. **Modern Icons**: Professional Ant Design SVG icons instead of emoji
5. **Responsive Design**: Mobile-first, works on all devices
6. **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 📞 Support

For questions or issues, please refer to the requirements document or create an issue in this repository.

---

**Last Updated**: 2025-07-08
**Version**: 1.0.0
**License**: MIT
