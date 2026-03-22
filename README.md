# HeroIO — App Discovery Platform

A modern app discovery platform where users can browse, search, and install their favorite apps.



## Live Demo

[https://69bfa3ec7955c606e9fa9b69--rococo-dolphin-0ee7eb.netlify.app/]

## GitHub Repository

[https://github.com/Ishrat-02/hero-io]



## Description

HeroIO is a fully responsive React web application that allows users to:
- Browse a curated collection of top-rated apps
- Search apps by name with live filtering
- Sort apps by download count
- View detailed app information with review charts
- Install and uninstall apps with localStorage persistence



## Technologies

Technology && Purpose 

1. React 18 = UI library 
2. Vite = Build tool 
3. React Router DOM = Client-side routing 
4. Tailwind CSS v3 = Styling 
5. Recharts = Review bar chart 
6. React Hot Toast = Toast notifications 
7. localStorage = Install persistence 


## Pages

 Page -> Route -> Description 

1. Home | `/` | Banner, stats, top 8 apps |
2. All Apps | `/apps` | Full grid with search and sort |
| App Details | `/apps/:id` | App info, install button, review chart |
| My Installation | `/installation` | Installed apps with uninstall option |
| 404 Error | `*` | Custom not found page |

---

## ✨ Features

- ✅ Fully responsive for all devices
- ✅ Live search with loading animation
- ✅ Sort by downloads (High→Low / Low→High)
- ✅ Install / Uninstall with localStorage
- ✅ Toast notifications
- ✅ Recharts review bar chart
- ✅ Active route indication in navbar
- ✅ Custom 404 error page
- ✅ No reload errors after deployment

---

## 🚀 Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
