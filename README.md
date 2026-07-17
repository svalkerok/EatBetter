# 🍎 EatBetter

An Angular web application for searching and browsing nutritional information about fruit, powered by the [Fruityvice](https://www.fruityvice.com/) public API.

## 📋 Description

EatBetter lets users search for fruits and view their nutritional information (family, genus, calories, sugar content, etc.), with the ability to filter results by botanical category. The project was built as a hands-on exercise as part of a Full Stack Development study path, focusing on reactive state management, HTTP requests, component architecture, and testing.

## ✨ Features

- Fruit search via integration with the Fruityvice API
- Filtering by botanical category (based on scientific classification)
- Responsive navbar with hamburger menu for mobile devices
- State management using Angular Signals
- Reactive filtering via `BehaviorSubject` (text search and category filter)

## 🛠️ Tech Stack

- **Framework**: [Angular](https://angular.dev/) 21.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: [Vitest](https://vitest.dev/) + `@vitest/coverage-v8`
- **External API**: [Fruityvice API](https://www.fruityvice.com/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version compatible with Angular 21.2)
- [Angular CLI](https://angular.dev/tools/cli)

### Installation

```bash
# Clone the repository
git clone https://github.com/gloriamaggioni/EatBetter.git

# Move into the project folder
cd EatBetter

# Install dependencies
npm install
```

### Running locally

```bash
ng serve
```

The app will be available at `http://localhost:4200/`.

### Running tests

```bash
ng test --watch=false
```

### Running tests with code coverage

```bash
ng test --watch=false --code-coverage
```

## 🌐 Live Demo

[https://gloriamaggioni.github.io/EatBetter/](https://gloriamaggioni.github.io/EatBetter/)


## 📄 License

© All rights reserved.


## 👩‍💻 Author

Gloria Maggioni — [GitHub](https://github.com/gloriamaggioni)



