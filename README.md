# 🍎 EatBetter

Applicazione web sviluppata in Angular per la ricerca e consultazione di informazioni nutrizionali sulla frutta, tramite integrazione con l'API pubblica [Fruityvice](https://www.fruityvice.com/).

## 📋 Descrizione

EatBetter permette agli utenti di cercare frutti e visualizzarne le informazioni nutrizionali (famiglia, genere, calorie, zuccheri, ecc.), con la possibilità di filtrare i risultati per categoria botanica. Il progetto nasce come esercizio pratico nell'ambito del percorso di studi Full Stack Development, con particolare attenzione a: gestione dello stato reattivo, chiamate HTTP, componentizzazione e testing.

## ✨ Funzionalità

- Ricerca frutta tramite integrazione con Fruityvice API
- Filtro per categoria botanica (basato su classificazione scientifica)
- Navbar responsive con menu hamburger per dispositivi mobile
- Gestione dello stato con Angular Signals
- Filtri reattivi tramite `BehaviorSubject` (ricerca testuale e per categoria)

## 🛠️ Stack tecnologico

- **Framework**: [Angular](https://angular.dev/) 21.2
- **Linguaggio**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: [Vitest](https://vitest.dev/) + `@vitest/coverage-v8`
- **API esterna**: [Fruityvice API](https://www.fruityvice.com/)

## 🚀 Getting Started

### Prerequisiti

- [Node.js](https://nodejs.org/) (versione compatibile con Angular 21.2)
- [Angular CLI](https://angular.dev/tools/cli)

### Installazione

```bash
# Clona il repository
git clone https://github.com/tuo-username/eatbetter.git

# Entra nella cartella del progetto
cd eatbetter

# Installa le dipendenze
npm install
```

### Avvio in locale

```bash
ng serve
```

L'applicazione sarà disponibile su `http://localhost:4200/`.

### Eseguire i test

```bash
ng test --watch=false
```

### Eseguire i test con code coverage

```bash
ng test --watch=false --code-coverage
```

## 🌐 Demo

> Deploy su Firebase Hosting in arrivo — link aggiornato a breve.

## 📄 Licenza

© Tutti i diritti riservati.

## 👩‍💻 Autrice
@Gloria Maggioni (glok.dev)

Gloria — [GitHub](https://github.com/tuo-username)


