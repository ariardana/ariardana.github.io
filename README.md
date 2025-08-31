# 🌟 Ari Ardn Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript, optimized for GitHub Pages deployment.

## ✨ Features

- **🎨 Modern Design**: Clean, professional aesthetic with smooth animations
- **🌙 Dark/Light Mode**: Toggle between themes with system preference detection
- **📱 Fully Responsive**: Mobile-first design that looks great on all devices
- **⚡ Fast Loading**: Single HTML file with embedded CSS and JavaScript
- **🎯 SEO Optimized**: Proper meta tags and semantic HTML structure
- **🔧 Easy to Customize**: Edit content through the `config.ts` file
- **🚀 GitHub Pages Ready**: Automated deployment workflow included

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework via CDN
- **Vanilla JavaScript** - No external dependencies
- **Google Fonts** - Inter font family
- **GitHub Actions** - Automated deployment

## 📁 Project Structure

```
├── index.html          # Main portfolio page
├── src/
│   └── config.ts       # Configuration file for easy content editing
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment workflow
└── README.md           # Project documentation
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### GitHub Pages Deployment

1. **Fork or clone this repository**

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "GitHub Actions" as the source

3. **Customize your content**
   - Edit `src/config.ts` with your personal information
   - Commit and push changes

4. **Automatic Deployment**
   - The workflow will automatically deploy on push to main branch
   - Your site will be available at `https://yourusername.github.io/repository-name`

## ⚙️ Customization

### Editing Content

All content can be customized by editing the `src/config.ts` file:

```typescript
export const portfolioConfig = {
  // Personal Information
  name: "Your Name",
  title: "Your Title/Position",
  greeting: "Hi, I'm [Name] 👋",
  
  // About Section
  about: {
    description: "Your description...",
    skills: ["Skill 1", "Skill 2", "Skill 3"]
  },

  // Projects Section
  projects: [
    {
      title: "Project Name",
      description: "Project description...",
      githubUrl: "https://github.com/username/repo",
      technologies: ["Tech 1", "Tech 2"]
    }
  ],

  // Contact Information
  contact: {
    email: "your.email@example.com",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username"
  }
};
```

### Styling Customization

The website uses Tailwind CSS for styling. You can customize:

- **Colors**: Edit the Tailwind config in `index.html`
- **Fonts**: Change the Google Fonts import
- **Animations**: Modify CSS animations in the `<style>` section
- **Layout**: Adjust Tailwind classes in the HTML

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Slate grays
- **Dark Mode**: Deep slate backgrounds
- **Light Mode**: Clean white/gray backgrounds

### Typography
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Clear heading and body text scales

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio/issues).

## 📞 Contact

**Ari Ardn**
- Email: ari.ardn@example.com
- LinkedIn: [linkedin.com/in/ariardn](https://linkedin.com/in/ariardn)
- GitHub: [github.com/ariardn](https://github.com/ariardn)

---

⭐ Don't forget to star this repository if you found it helpful!