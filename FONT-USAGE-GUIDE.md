# Premium Font Usage Guide 🎨

## Professional Fonts Available

### 1. **Kudryashev Display** - For creative emphasis and display text
```css
font-family: var(--font-kudryashev-display);
```
- **Contrast Sans** (400 weight) - Regular display text
- **Extra Contrast Sans** (700 weight) - Bold emphasis

### 2. **Neue Haas Grotesk Display** - For titles, body text, and versatile use
```css
font-family: var(--font-neue-haas-grotesk);
```
- Complete weight range: 100 (XXThin) to 800 (Black)
- Includes italic variants for all weights
- Swiss typography excellence

### 3. **Cofo Raffine** - For special emphasis (Adobe Fonts)
```css
font-family: "cofo-raffine", serif;
```
✅ **Available via Adobe Fonts/Typekit**

## Font Usage Strategy

### **Kudryashev Display** - Creative & Display
- Large headings and hero text
- Creative emphasis words
- Logo text and branding
- Artistic/expressive content

### **Neue Haas Grotesk** - Versatile & Professional  
- Body text and paragraphs
- Navigation and UI elements
- Subheadings and secondary text
- Professional/corporate content

### **Cofo Raffine** - Special Accent
- Artistic flourishes
- Special emphasis words
- Creative mixed-font compositions

## CSS Classes Available

### **Kudryashev Display Classes**
```jsx
<h1 className="font-kudryashev-display">Creative Display</h1>
<span className="font-kudryashev-extra-contrast">Bold Emphasis</span>
<span className="word-kudryashev">Creative</span>
<span className="word-kudryashev-bold">Bold</span>
```

### **Neue Haas Grotesk Classes**
```jsx
<h2 className="font-neue-haas-grotesk">Professional Title</h2>
<p className="font-neue-haas-light">Light body text</p>
<span className="font-neue-haas-thin">Thin text</span>
<span className="font-neue-haas-medium">Medium weight</span>
<span className="font-neue-haas-bold">Bold text</span>
<span className="font-neue-haas-black">Black weight</span>

{/* Word-level mixing */}
<span className="word-neue-haas">Regular</span>
<span className="word-neue-haas-thin">Thin</span>
<span className="word-neue-haas-bold">Bold</span>
```

### **Semantic Classes**
```jsx
<h1 className="font-title">Main Title (Neue Haas Medium)</h1>
<p className="font-body">Body Text (Neue Haas Light)</p>
<span className="font-emphasis">Emphasis (Kudryashev Bold)</span>
<h2 className="font-display-large">Large Display (Kudryashev)</h2>
```

## Creative Font Mixing Examples

### **Method 1: Mixed Line Typography**
```jsx
<h1 className="mixed-fonts-line text-6xl">
  I'm a <span className="emphasis">Creative</span>{' '}
  <span className="title">Developer</span>{' '}
  <span className="cofo">with style</span>
</h1>
```

### **Method 2: Word-by-Word Mixing**
```jsx
<h2 className="text-4xl">
  <span className="word-kudryashev-bold">Design</span>{' '}
  <span className="word-neue-haas">meets</span>{' '}
  <span className="word-cofo">Innovation</span>
</h2>
```

### **Method 3: Contextual Usage**
```jsx
// Hero Section
<h1 className="font-kudryashev-display text-8xl">CHROME</h1>
<p className="font-neue-haas-light text-xl">Industrial Electronics Engineer</p>

// About Section  
<h2 className="font-neue-haas-medium text-4xl">About Me</h2>
<p className="font-neue-haas-grotesk">
  Professional content with <span className="font-emphasis">creative emphasis</span>
</p>

// Projects
<h3 className="mixed-fonts-line">
  <span className="emphasis">Featured</span>{' '}
  <span className="title">Projects</span>
</h3>
```

## Tailwind CSS Classes

You can also use Tailwind's font-family utilities:

```jsx
<div className="font-kudryashev-display">Creative Display</div>
<div className="font-neue-haas-grotesk">Professional Text</div>  
<div className="font-cofo-raffine">Artistic Accent</div>
```

## Font Weight Guidelines

### **Neue Haas Grotesk Weights:**
- `font-weight: 100` - XXThin (ultra-light, decorative)
- `font-weight: 200` - XThin (very light)
- `font-weight: 300` - Thin (light body text)
- `font-weight: 400` - Light (regular body text)
- `font-weight: 500` - Roman (medium text)
- `font-weight: 600` - Medium (subheadings)
- `font-weight: 700` - Bold (headings)
- `font-weight: 800` - Black (strong emphasis)

### **Kudryashev Display Weights:**
- `font-weight: 400` - Contrast Sans (regular display)
- `font-weight: 700` - Extra Contrast Sans (bold display)

## ✨ **Ready-to-Use Examples:**

```jsx
// Modern Hero Section
<div className="hero">
  <h1 className="font-kudryashev-display text-8xl font-bold">
    CHROME
  </h1>
  <p className="font-neue-haas-thin text-2xl">
    Industrial Electronics Engineer
  </p>
</div>

// Creative Project Titles
<h2 className="mixed-fonts-line text-5xl">
  <span className="emphasis">AI/ML</span>{' '}
  <span className="title">Projects</span>
</h2>

// Professional About Section
<div className="about">
  <h2 className="font-neue-haas-medium text-4xl mb-4">About</h2>
  <p className="font-neue-haas-grotesk text-lg leading-relaxed">
    I'm passionate about <span className="font-emphasis">innovation</span> in 
    electronics and <span className="word-cofo">creative</span> problem-solving.
  </p>
</div>
```

These fonts will give your portfolio a **premium, professional** look while maintaining creative flexibility! 🚀