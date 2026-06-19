# React for Flutter Developers

> **How to use this file:** Ask any question about **HTML, CSS, React, or JavaScript** in chat. Answers will be explained in a beginner-friendly way and compared to **Flutter/Dart** so you can paste them here as notes.
>
> **Your starting point:** You know Flutter, but HTML and CSS are new. That’s fine — JSX is basically HTML inside JavaScript, and styling is CSS. The sections below build HTML → CSS → React in that order.

---
## Code Explanation Guidelines

**When explaining any code** (React, HTML, JavaScript, or framework-related):
1. **Always explain the JavaScript/language code in detail** — don't assume syntax is obvious
2. **Provide side-by-side Dart/Flutter comparisons** for every significant language feature
3. **Break down syntax step-by-step**: What does `=>` mean? What's the difference between `const` and `let`? Why use `?.` instead of `!`?
4. **Show equivalent Dart code** for patterns like async/await, arrow functions, destructuring, template literals, etc.
5. **Explain the "why"** behind the language choice (e.g., why JavaScript uses `===` instead of `==`)

---
## Quick Mental Model

| Concept | Flutter / Dart | Web (HTML / CSS / React) |
|---------|--------------|---------------------------|
| What the screen is made of | `Widget` tree | **HTML** elements → **React** components |
| How things look | `Theme`, `BoxDecoration`, `TextStyle` | **CSS** rules |
| UI building blocks | `Widget` | `Component` (returns JSX) |
| Rebuild UI when data changes | `setState()` / `StateNotifier` / `Bloc` | `useState` / `useReducer` / external state libs |
| Reuse UI | Custom widgets | Custom components |
| Pass data down | Constructor params / `Widget` fields | `props` |
| Pass data up | Callbacks (`onPressed`, `VoidCallback`) | Callback props (`onClick`, `onChange`) |
| Conditional UI | `if` in build / ternary / `Visibility` | `if` / ternary / `&&` in JSX |
| Lists | `ListView.builder` | `.map()` in JSX |
| Navigation | `Navigator` / `go_router` | React Router / Next.js routing |
| Side effects (API, timers) | `initState`, `Future`, `Stream` | `useEffect` |
| Global state | Provider / Riverpod / Bloc | Context / Zustand / Redux |
| Language | Dart (typed, compiled) | JavaScript (dynamic) or TypeScript (typed) |
| Entry point | `main()` → `runApp()` | `index.html` → `main.jsx` → `createRoot().render()` |

---

# Part 1 — HTML Basics

## What is HTML?

**HTML** (HyperText Markup Language) describes **what** is on the page — structure and meaning. It is **not** a programming language. Think of it as declaring a tree of UI pieces.

| Flutter | HTML |
|---------|------|
| You write Dart code that builds widgets | You write **tags** that declare elements |
| `MaterialApp` → `Scaffold` → `Column` | `<html>` → `<body>` → `<div>` |
| Widget tree | **DOM tree** (Document Object Model) |

**Big idea:** In Flutter, the framework draws pixels. On the web, the **browser** reads HTML, builds a DOM tree, applies CSS, and paints the screen. React generates that HTML (via JSX) for you.

---

## Anatomy of an HTML document

```html
<!DOCTYPE html>          <!-- tells browser: this is modern HTML -->
<html lang="en">         <!-- root element -->
  <head>                 <!-- metadata — NOT visible on page -->
    <meta charset="UTF-8" />
    <title>My App</title>   <!-- browser tab title -->
    <link rel="stylesheet" href="styles.css" />  <!-- load CSS -->
  </head>
  <body>                 <!-- everything visible lives here -->
    <h1>Hello</h1>
    <p>Welcome to my app.</p>
    <script src="app.js"></script>  <!-- load JavaScript -->
  </body>
</html>
```

| HTML part | Flutter analogue |
|-----------|------------------|
| `<head>` | App metadata, theme setup, things not in the widget tree |
| `<body>` | What `runApp()` renders — the visible app |
| `<title>` | App name in task switcher / window title |
| `<script>` | Where your JS runs — like loading `main.dart` |
| `<link rel="stylesheet">` | Importing global theme/styles |

Your `index.html` in a React project is this file. React mounts into a `<div id="root">` inside `<body>` — like Flutter attaching to a single root widget.

---

## Tags, elements, and attributes

```html
<button class="primary" disabled>Save</button>
```

| Piece | Meaning | Flutter analogue |
|-------|---------|------------------|
| `<button>` | Opening tag — start of element | Widget type, e.g. `ElevatedButton` |
| `</button>` | Closing tag — end of element | End of widget subtree |
| `Save` | Text **content** between tags | `child: Text('Save')` |
| `class="primary"` | **Attribute** — extra info on the tag | Parameters like `style`, `key` |
| `disabled` | Boolean attribute (no value needed) | `onPressed: null` disables a button |

**Nesting = widget tree:**

```html
<article>
  <h2>Post title</h2>
  <p>Some body text.</p>
</article>
```

```dart
// Flutter equivalent (conceptually)
Column(
  children: [
    Text('Post title', style: headlineStyle),
    Text('Some body text.'),
  ],
)
```

---

## Essential HTML tags (your daily toolkit)

### Text & headings

| HTML | Purpose | Flutter |
|------|---------|---------|
| `<h1>` … `<h6>` | Headings (h1 = biggest) | `Text` with `Theme.of(context).textTheme.headlineLarge` etc. |
| `<p>` | Paragraph | `Text` with body style |
| `<span>` | Inline text snippet | `Text` inside a `Row` / inline |
| `<strong>` | Important / bold | `TextStyle(fontWeight: FontWeight.bold)` |
| `<em>` | Emphasis / italic | `TextStyle(fontStyle: FontStyle.italic)` |

### Layout containers

| HTML | Purpose | Flutter |
|------|---------|---------|
| `<div>` | Generic block container | `Container`, `SizedBox`, or unnamed wrapper |
| `<span>` | Generic inline container | Wrap part of a `Text.rich` / inline widget |
| `<section>` | Thematic section | `Column` / part of a screen |
| `<header>` | Page/section header | `AppBar` area |
| `<footer>` | Page/section footer | Bottom bar |
| `<main>` | Main content area | `Scaffold` body |

**`<div>` is used constantly.** It has no default look — like a plain `Container` with no decoration. You give it meaning with CSS.

### Lists

```html
<ul>           <!-- unordered list -->
  <li>Apple</li>
  <li>Banana</li>
</ul>

<ol>           <!-- ordered list (1, 2, 3…) -->
  <li>First</li>
  <li>Second</li>
</ol>
```

| HTML | Flutter |
|------|---------|
| `<ul>` + `<li>` | `ListView` with bullet items |
| `<ol>` + `<li>` | Numbered `ListView` |

### Links, images, buttons

| HTML | Purpose | Flutter |
|------|---------|---------|
| `<a href="/about">About</a>` | Link / navigation | `Navigator.push`, `InkWell` + route |
| `<img src="photo.jpg" alt="A cat" />` | Image | `Image.asset` / `Image.network` |
| `<button>Click</button>` | Clickable button | `ElevatedButton` |
| `<input type="text" />` | Text field | `TextField` |
| `<input type="checkbox" />` | Checkbox | `Checkbox` |
| `<form>` | Form wrapper | `Form` widget |

**`alt` on images** = accessibility text if image fails to load (like `Semantics` labels).

### Semantic vs generic

- `<div>` = generic box (use when nothing else fits)
- `<nav>`, `<article>`, `<button>` = **semantic** — describe *what* something is

Prefer semantic tags when they fit. Screen readers and SEO benefit — similar to using `Semantics` in Flutter.

---

## Block vs inline (important!)

| Type | Behavior | Examples |
|------|----------|----------|
| **Block** | Takes full width, stacks vertically | `div`, `p`, `h1`, `section`, `ul` |
| **Inline** | Sits in a line with text, no line break | `span`, `a`, `strong`, `img` |

**Flutter comparison:**
- Block ≈ `Column` children that each take their own vertical slot
- Inline ≈ children in a `Row` / `Wrap` flowing horizontally

This is why React tutorials use `<div>` everywhere — it’s the generic block box, like a default `Container`.

---

## HTML attributes you'll see in React

| HTML | In React (JSX) | Why different |
|------|----------------|---------------|
| `class="card"` | `className="card"` | `class` is reserved in JavaScript |
| `for="email"` | `htmlFor="email"` | `for` is reserved in JavaScript |
| `onclick="..."` | `onClick={handleClick}` | Events are functions, not strings |
| `style="color: red"` | `style={{ color: 'red' }}` | Style is a JS object |
| `readonly` | `readOnly` | camelCase convention |

```jsx
// React
<div className="card" onClick={handleClick}>
  <label htmlFor="email">Email</label>
  <input id="email" readOnly />
</div>
```

---

## How HTML connects to React

```
index.html          →  empty <div id="root"></div>
       ↓
main.jsx            →  ReactDOM.createRoot(...).render(<App />)
       ↓
App component       →  returns JSX (<div>, <button>, etc.)
       ↓
Browser DOM         →  real HTML elements on screen
```

**JSX** looks like HTML but is JavaScript. React turns `<button>Go</button>` into a real DOM `<button>`. You rarely write raw HTML by hand in components — you write JSX, which is 95% the same syntax.

---

# Part 2 — CSS Basics

## What is CSS?

**CSS** (Cascading Style Sheets) describes **how** HTML looks — colors, spacing, layout, fonts.

| Flutter | CSS |
|---------|-----|
| `Container(color: Colors.blue)` | `background-color: blue;` |
| `padding: EdgeInsets.all(16)` | `padding: 16px;` |
| `TextStyle(fontSize: 24)` | `font-size: 24px;` |
| `ThemeData` | Global CSS variables / shared classes |
| Everything inline on widgets | Rules in a `.css` file (usually) |

**Separation in web apps:** HTML = structure, CSS = style, JS = behavior. Flutter combines all three in Dart widgets; on the web they're split.

---

## How CSS attaches to HTML

### 1. Class (most common in React)

```html
<button class="btn primary">Save</button>
```

```css
.btn {
  padding: 12px 24px;
  border-radius: 8px;
}
.primary {
  background-color: #3b82f6;
  color: white;
}
```

```jsx
<button className="btn primary">Save</button>
```

**Flutter analogy:** `.btn` is like a reusable `ButtonStyle` or theme extension. `.primary` is a variant.

### 2. ID (one element only — use sparingly)

```css
#root { height: 100vh; }
```

Like giving a single widget a unique key — usually only for app root or anchors.

### 3. Element selector

```css
p { margin-bottom: 16px; }
button { cursor: pointer; }
```

Styles every `<p>` or `<button>` on the page — like `Theme.of(context).textTheme.bodyMedium` applied globally.

---

## CSS rule structure

```css
selector {
  property: value;
  another-property: value;
}
```

```css
.card {
  padding: 16px;           /* inner space — EdgeInsets */
  margin: 8px;             /* outer space — margin around widget */
  background: white;       /* fill color */
  border-radius: 12px;     /* rounded corners */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);  /* elevation */
}
```

| CSS property | Flutter equivalent |
|--------------|-------------------|
| `padding` | `padding` on `Padding` / `Container` |
| `margin` | `margin` on `Container` |
| `width` / `height` | `width` / `height` on `SizedBox` / `Container` |
| `background-color` | `color` in `BoxDecoration` |
| `border-radius` | `borderRadius` in `BoxDecoration` |
| `box-shadow` | `BoxShadow` / `elevation` on `Material` |
| `font-size` | `fontSize` in `TextStyle` |
| `font-weight` | `fontWeight` in `TextStyle` |
| `color` (on text) | `color` in `TextStyle` |
| `display: none` | `Visibility(visible: false)` or remove from tree |

---

## The Box Model (critical concept)

Every HTML element is a **rectangular box** with four layers:

```
┌────────── margin (outside) ──────────┐
│  ┌──────── border ────────┐          │
│  │  ┌──── padding ────┐   │          │
│  │  │   CONTENT       │   │          │
│  │  └─────────────────┘   │          │
│  └────────────────────────┘          │
└──────────────────────────────────────┘
```

| Layer | Flutter |
|-------|---------|
| Content | Child size |
| Padding | `Padding` widget |
| Border | `Border` on `BoxDecoration` |
| Margin | `margin` on `Container` — space outside the decoration |

**Default gotcha:** Without CSS reset, browsers add default `margin` to `<h1>`, `<p>`, etc. Flutter widgets don't have that surprise padding unless you add it.

---

## Units: px, %, rem, vh

| Unit | Meaning | Flutter analogue |
|------|---------|------------------|
| `px` | Pixels | Logical pixels (`.0` in `double`) |
| `%` | Percent of parent | `FractionallySizedBox`, `Expanded(flex:)` |
| `rem` | Relative to root font size | Responsive text scaling |
| `vh` / `vw` | % of viewport height/width | `MediaQuery.of(context).size` |
| `1fr` (in grid) | Fraction of free space | `Expanded` / `Flexible` |

In React you'll mostly use `px`, `rem`, and `%` at first.

---

## Flexbox — your main layout tool

**This is the web equivalent of `Row` and `Column`.**

```css
.container {
  display: flex;
  flex-direction: column;   /* Column — default in Flutter vertical */
  gap: 16px;                /* space between children */
  align-items: center;      /* cross-axis — CrossAxisAlignment */
  justify-content: center;  /* main-axis — MainAxisAlignment */
}
```

| CSS flex | Flutter |
|----------|---------|
| `display: flex` | You're in flex layout mode |
| `flex-direction: row` | `Row` |
| `flex-direction: column` | `Column` |
| `justify-content: center` | `mainAxisAlignment: MainAxisAlignment.center` |
| `align-items: center` | `crossAxisAlignment: CrossAxisAlignment.center` |
| `gap: 16px` | `SizedBox` between children or `spacing` in newer Flutter |
| `flex: 1` on child | `Expanded(child: ...)` |

**Centering a child (extremely common):**

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

```dart
// Flutter
Center(child: Text('Hello'))
// or Column/Row with mainAxisAlignment + crossAxisAlignment
```

---

## Common layout patterns

### Card-like box

```css
.card {
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}
```

≈ `Card` widget or `Container` with `BoxDecoration`.

### Full-screen app

```css
html, body, #root {
  height: 100%;
  margin: 0;
}
```

≈ `MaterialApp` filling the screen — browsers don't do this by default.

### Horizontal row of items

```css
.toolbar {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
```

≈ `Row(children: [...])`.

---

## Colors in CSS

```css
color: red;                    /* named */
color: #3b82f6;                /* hex — most common */
color: rgb(59, 130, 246);      /* rgb */
color: rgba(59, 130, 246, 0.5); /* with opacity */
```

≈ `Colors.blue`, `Color(0xFF3B82F6)` in Flutter.

---

## Pseudo-classes and hover (no Flutter equivalent on mobile)

```css
.button:hover {
  background-color: #2563eb;
}
.button:active {
  transform: scale(0.98);
}
```

Web has **mouse hover** and **focus** states. Flutter desktop/web has `MouseRegion` / `InkWell` splash, but CSS `:hover` is the quick web way.

---

## CSS in a React project

Typical setup:

```
src/
  App.jsx
  App.css        ← styles for App component
  index.css      ← global styles (like ThemeData)
```

```jsx
import './App.css';

function App() {
  return <div className="app">...</div>;
}
```

| Approach | When to use |
|----------|-------------|
| Plain `.css` files | Learning, small projects |
| CSS Modules (`App.module.css`) | Scoped class names per component |
| Tailwind (`className="p-4 rounded-lg"`) | Utility classes — like inline `Padding` everywhere |
| styled-components | CSS inside JS template strings |

**Start with plain CSS files** until you're comfortable.

---

## HTML + CSS cheat sheet (Flutter → Web)

| I want to… | Flutter | HTML + CSS |
|------------|---------|------------|
| Vertical stack | `Column` | `<div style="display:flex; flex-direction:column">` |
| Horizontal row | `Row` | `<div style="display:flex; flex-direction:row">` |
| Center something | `Center` | flex parent + `justify/align-items: center` |
| Text | `Text('Hi')` | `<p>Hi</p>` |
| Big title | `Text` + headline style | `<h1>Hi</h1>` |
| Button | `ElevatedButton` | `<button>` + CSS |
| Text input | `TextField` | `<input type="text">` |
| Space inside | `Padding` | `padding: 16px` |
| Space outside | `margin` on Container | `margin: 16px` |
| Rounded box | `BorderRadius.circular` | `border-radius: 12px` |
| Shadow | `elevation` | `box-shadow` |
| Hide widget | `Visibility` / remove | `display: none` |
| Scroll list | `ListView` | `overflow-y: auto` on a tall container |

---

# Part 3 — React

## 1. What Is React?

**Flutter:** You build an app from a tree of widgets. `MaterialApp` is the root; everything below is widgets.

**React:** You build an app from a tree of **components**. A component is a function (or class) that returns **JSX** — HTML-like syntax that describes UI.

```jsx
// React component (like a StatelessWidget)
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

```dart
// Flutter equivalent
class Greeting extends StatelessWidget {
  final String name;
  const Greeting({required this.name});

  @override
  Widget build(BuildContext context) {
    return Text('Hello, $name!');
  }
}
```

**Key difference:** In Flutter, you return `Widget` objects. In React, you return **JSX**, which looks like HTML but is really JavaScript that gets turned into DOM elements.

---

## 2. JSX vs Dart Widget Tree

| Flutter | React (JSX) |
|---------|-------------|
| `Column(children: [...])` | `<div>` with CSS `display: flex; flex-direction: column` or a layout component |
| `Row(children: [...])` | `<div>` with `display: flex` |
| `Text('Hi')` | `<p>Hi</p>` or `<span>Hi</span>` |
| `ElevatedButton(onPressed: fn, child: Text('Go'))` | `<button onClick={fn}>Go</button>` |
| `child: Widget` | children between tags: `<Card>content</Card>` |
| `const` constructor | function component + stable props |

**JSX rules (beginner):**
- One parent element per `return` (or use `<>...</>` fragment — like a `Column` with no extra styling)
- `{expression}` embeds JavaScript — like string interpolation in Dart: `'Hello $name'` → `Hello {name}`
- `className` instead of `class` (because `class` is a JS keyword)
- `onClick` not `onPressed` — camelCase for DOM events

---

## 3. Props vs Constructor Parameters

**Flutter:** You pass data into a widget via constructor:

```dart
class UserCard extends StatelessWidget {
  final String name;
  final VoidCallback onTap;
  const UserCard({required this.name, required this.onTap});
}
```

**React:** Same idea, called **props** (properties):

```jsx
function UserCard({ name, onTap }) {
  return <button onClick={onTap}>{name}</button>;
}

// Usage — like UserCard(name: 'Ali', onTap: () {})
<UserCard name="Ali" onTap={() => console.log('tapped')} />
```

| Flutter | React |
|---------|-------|
| Named params `name: 'Ali'` | Attributes `name="Ali"` |
| `onTap: () {}` | `onTap={() => {}}` |
| `required` | Convention + often TypeScript |
| `final` / immutable | Don't mutate `props` — treat as read-only |

---

## 4. State — `useState` vs `setState`

**Flutter (StatefulWidget):**

```dart
class Counter extends StatefulWidget {
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => setState(() => count++),
      child: Text('$count'),
    );
  }
}
```

**React (hooks):**

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

| Flutter | React |
|---------|-------|
| `setState(() => count++)` | `setCount(count + 1)` |
| State lives on `State` object | State from `useState` per component instance |
| `initState` / `dispose` | `useEffect` with cleanup |
| `StatefulWidget` + `State` class | One function + hooks |

**Mental model:** `useState` returns `[value, setter]` — like having a private field and a method that calls `setState` for you.

---

## 5. `useEffect` vs `initState` / `dispose`

**Flutter:**

```dart
@override
void initState() {
  super.initState();
  fetchData();
}

@override
void dispose() {
  subscription.cancel();
  super.dispose();
}
```

**React:**

```jsx
useEffect(() => {
  fetchData();

  return () => {
    // cleanup — like dispose()
    subscription.cancel();
  };
}, []); // [] = run once on mount, like initState
```

| Flutter | React |
|---------|-------|
| `initState` | `useEffect(fn, [])` |
| `dispose` | `return () => {}` from `useEffect` |
| Re-run when dependency changes | Add deps to array: `[userId]` |
| `Future` / `async` | `async` function inside effect or `.then()` |

---

## 6. Lists — `.map()` vs `ListView.builder`

**Flutter:**

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, i) => ListTile(title: Text(items[i])),
)
```

**React:**

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

**Important:** React needs a stable **`key`** on each list item — like `Key` in Flutter. It helps React know which row changed. Use a unique id, not array index (when items can reorder).

---

## 7. Conditional Rendering

**Flutter:**

```dart
if (isLoading) return CircularProgressIndicator();
return Text(data);
// or: isLoading ? CircularProgressIndicator() : Text(data)
```

**React:**

```jsx
if (isLoading) return <Spinner />;
return <p>{data}</p>;

// or
{isLoading ? <Spinner /> : <p>{data}</p>}
{error && <p className="error">{error}</p>}
```

---

## 8. JavaScript Basics (if you know Dart)

| Dart | JavaScript |
|------|------------|
| `final x = 1;` | `const x = 1;` |
| `var` / `int`, `String` | `let` / `const` (no built-in types unless TypeScript) |
| `void foo()` | `function foo() {}` or `const foo = () => {}` |
| `=>` single expression | `=>` arrow functions (very common in React) |
| `null` / nullable `String?` | `null` / `undefined` (two “empty” values) |
| `async` / `await` | Same — `async` / `await` |
| `print()` | `console.log()` |
| `import 'package:...'` | `import ... from '...'` |
| `==` (value) | `===` (strict — prefer this) |
| `List<T>`, `Map<K,V>` | `Array`, plain `{}` objects |
| `?.` null-aware | `?.` optional chaining |
| `??` | `??` nullish coalescing — same idea |

**Arrow functions (used everywhere in React):**

```dart
// Dart
onPressed: () => count++
onPressed: () { doA(); doB(); }
```

```js
// JavaScript
onClick={() => setCount(c => c + 1)}
onClick={() => { doA(); doB(); }}
```

---

## 9. Project Structure (typical React vs Flutter)

| Flutter | React (Vite / CRA) |
|---------|-------------------|
| `lib/main.dart` | `src/main.jsx` |
| `lib/widgets/` | `src/components/` |
| `pubspec.yaml` | `package.json` |
| `flutter run` | `npm run dev` |
| Hot reload | Fast Refresh (similar) |
| `assets/` | `public/` |

---

## 10. Styling — CSS vs Flutter Layout

Flutter packs layout + style into widgets (`Padding`, `Container`, `Theme`).

React usually uses **CSS** (separate file or CSS-in-JS):

```jsx
// className links to a CSS class — like a TextStyle theme name
<div className="card">
  <h2 className="title">Hello</h2>
</div>
```

```css
.card { padding: 16px; border-radius: 8px; }
.title { font-size: 1.5rem; }
```

**Comparison:**

| Flutter | Web / React |
|---------|-------------|
| `EdgeInsets.all(16)` | `padding: 16px` |
| `MainAxisAlignment.center` | `justify-content: center` (flex) |
| `CrossAxisAlignment.stretch` | `align-items: stretch` |
| `Theme.of(context)` | CSS variables / context / design tokens |
| `MediaQuery` | CSS media queries / `useMediaQuery` hooks |

Alternatives: **Tailwind** (utility classes), **CSS Modules**, **styled-components** — pick one per project.

---

## 11. Common Libraries (Flutter → React)

| Need | Flutter | React ecosystem |
|------|---------|-----------------|
| Routing | `go_router`, `Navigator` | React Router, Next.js App Router |
| HTTP | `http`, `dio` | `fetch`, `axios` |
| State | Riverpod, Bloc, Provider | Context, Zustand, Redux Toolkit |
| Forms | `TextFormField`, `Form` | controlled inputs, React Hook Form |
| UI kit | Material, Cupertino | MUI, Chakra, shadcn/ui |
| Build tool | `flutter` CLI | Vite, Next.js, Create React App |

---

## 12. TypeScript (optional but recommended)

If you like Dart’s types, use **TypeScript** with React:

```tsx
type UserCardProps = {
  name: string;
  onTap: () => void;
};

function UserCard({ name, onTap }: UserCardProps) {
  return <button onClick={onTap}>{name}</button>;
}
```

Like Dart’s constructor types + null safety, but gradual — you can mix `.js` and `.ts` while learning.

---

## 13. Glossary

| Term | Meaning | Flutter analogue |
|------|---------|------------------|
| **HTML** | Structure of the page (tags, elements) | Widget tree structure |
| **CSS** | Visual styling rules | `Theme`, `BoxDecoration`, `TextStyle` |
| **DOM** | Browser’s live tree of HTML elements | Element/render tree |
| **Tag** | Markup like `<div>`, `<p>` | Widget type |
| **Attribute** | Extra info on a tag (`class`, `href`) | Widget constructor params |
| **class (CSS)** | Reusable style name | `ThemeExtension`, shared `TextStyle` |
| **Flexbox** | Row/Column layout in CSS | `Row`, `Column`, `MainAxisAlignment` |
| **Box model** | content → padding → border → margin | `Container` layers |
| **Component** | UI unit | Widget |
| **Props** | Inputs to a component | Constructor parameters |
| **State** | Data that changes over time | State fields + `setState` |
| **Hook** | `useState`, `useEffect`, etc. | No exact single thing — hooks replace lifecycle + state in functions |
| **JSX** | HTML-like syntax in JS | Widget tree DSL |
| **Virtual DOM** | React’s diffing layer | Element/render object reconciliation |
| **Bundler** | Vite, webpack | — |
| **npm** | Package manager | `pub` |
| **package.json** | Dependencies manifest | `pubspec.yaml` |

---

## My Notes (add your Q&A below)

<!-- When you ask questions in chat, copy the explanations here under dated headings. -->

### Template for new notes

```markdown
### [Date] — Topic title

**Question:** ...

**Flutter/Dart mental model:** ...

**HTML/CSS (if relevant):** ...

**React/JS answer:** ...

**Side-by-side:** ...

**Gotchas:** ...
```

---

#### 2026-06-13 — What is a `<div>`?

**Question:** What is a div and why is it everywhere?

**Flutter/Dart mental model:** A plain `Container` or `SizedBox` with no decoration — just a box to group children.

**HTML/CSS:** `<div>` is a generic **block** container. It has no default styling. Web devs use it as the default wrapper when no semantic tag (`<section>`, `<button>`, etc.) fits.

**React/JS answer:** In JSX: `<div className="card">...</div>`. Often replaced by layout components in UI libraries, but you'll still see it constantly.

**Gotchas:** Don't confuse `<div>` (structure) with CSS `display: flex` (layout). A div is just a box; flex is how you arrange children inside it — like putting a `Column` inside a `Container`.

---

#### 2026-06-13 — What is a component?

**Question:** What is a React component?

**Flutter/Dart mental model:** A reusable `Widget` — either `StatelessWidget` or `StatefulWidget`.

**React/JS answer:** A function (usually) that takes `props` and returns JSX. File often named `Button.jsx` or `Button.tsx`.

**Side-by-side:**
- Flutter: `class MyButton extends StatelessWidget`
- React: `function MyButton(props) { return <button>...</button>; }`

**Gotchas:** Component names must start with a **capital letter** (`UserCard` not `userCard`).

---

*Last updated: 2026-06-13*
