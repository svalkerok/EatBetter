# How We Fixed the EatBetter Project

Welcome! If you are learning Angular and web development, deploying your first project can sometimes be tricky. Here is a simple explanation of all the bugs we found and how we fixed them so the project could work perfectly on GitHub Pages.

### 1. The GitHub Pages Deployment Path
**The Problem:** When you deploy an app to GitHub Pages, it usually lives in a subfolder like `https://your-username.github.io/EatBetter/`. But Angular, by default, assumes it lives at the root `my-website.com/`. So when the site loaded, it was looking for CSS and JS files in the wrong place and returning a blank page.
**The Fix:** We updated the deploy script in `package.json` to include `--base-href=/EatBetter/`. This tells Angular to add `/EatBetter/` before all file paths so everything loads correctly.

### 2. The Logo Link
**The Problem:** In the navigation bar (`navbar.html`), the logo link was hardcoded to `<a href="http://localhost:4200/">`. This meant that clicking the logo on the live website would try to take the user to their local computer, which obviously breaks.
**The Fix:** We changed it to `<a href="./">` so it always points to the home page of the current website.

### 3. The Form Submission Page Reload Bug
**The Problem:** The search bar was a standard HTML `<form>`. When you clicked the search button, the browser did what it always does with forms: it submitted the data and **reloaded the page** (adding `?search=...` to the URL). Because GitHub Pages is a Single Page Application (SPA), reloading with a random URL parameter caused a 404 Error page.
**The Fix:** We added `(ngSubmit)="findYourFruit()"` to the form. Angular takes control of `ngSubmit` and automatically stops the page from reloading, allowing our search code to run smoothly in the background!

### 4. The Category Filter Glitch
**The Problem:** If you searched for a specific fruit (like "Banana"), it showed up on the screen. But if you then clicked a category button (like "Sweet"), the Banana wouldn't go away! The app was fetching the category list, but forgetting to hide the single searched fruit.
**The Fix:** We updated `fruit-service.ts`. Now, whenever a user clicks a category, we explicitly tell the app: `this.filteredFruit.next(null)` — which translates to "clear the search result so the category list can be seen".

### 5. The Final Boss: CORS Errors
**The Problem:** The app originally got its fruit data by asking `https://www.fruityvice.com`. During local development, Angular uses a file called `proxy.config.json` to pretend the backend is on your computer. But GitHub Pages only hosts static files (HTML/CSS/JS)—it cannot run a proxy server! When the live website asked Fruityvice for data, the browser blocked it for security reasons (this is called a CORS policy error).
**The Fix:** We tried using public CORS proxies, but they were blocked by Cloudflare. So we used the most bulletproof solution: we downloaded the entire fruit database from Fruityvice and saved it directly inside the project as `src/assets/fruits.json`. Then, we rewrote `fruit-service.ts` to read this local file instead of the external website. Now, there are no CORS errors, and the search is instantly fast!

---

## Important Code Changes

Here are the specific sections of code that were modified to make the project work.

### 1. Adding the Deploy Script
**File:** `package.json`

**Before:**
```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
```
**After:**
```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "deploy": "ng build --base-href=/EatBetter/ && npx angular-cli-ghpages --dir=dist/EatBetter/browser"
  },
```

### 2. Fixing the Logo Link
**File:** `src/app/components/navbar/navbar.html`

**Before:**
```html
<div class="logo  w-[18%] md:w-[18%] px-2 ">
    <a href="http://localhost:4200/"> <img src="assets/images/logo.png" alt="Logo EatBetter" class="logo hover:cursor-pointer" ></a>
</div>
```
**After:**
```html
<div class="logo  w-[18%] md:w-[18%] px-2 ">
    <a href="./"> <img src="assets/images/logo.png" alt="Logo EatBetter" class="logo hover:cursor-pointer" ></a>
</div>
```

### 3. Fixing the Search Form (Preventing Page Reload)
**File:** `src/app/components/navbar/navbar.html`

**Before:**
```html
<form class="flex items-center ...">   
    <div class="relative w-full min-w-0">
       <input type="search" ... (input)="searchFruit()" />
    </div>
    <button type="submit" ... (click)="findYourFruit()">
       <svg>...</svg>   
   </button>
</form>
```
**After:**
```html
<form (ngSubmit)="findYourFruit()" class="flex items-center ...">   
    <div class="relative w-full min-w-0">
       <input type="search" ... />
    </div>
    <button type="submit" ...>
       <svg>...</svg>   
   </button>
</form>
```

### 4. Bypassing CORS (Using Local JSON)
**File:** `src/app/services/fruit-service.ts`

**Before (External Server):**
```typescript
export class FruitService {
  private http = inject(HttpClient);
  private baseUrl : string = 'https://www.fruityvice.com/api/fruit/all';
```
**After (Local File):**
```typescript
export class FruitService {
  private http = inject(HttpClient);
  private baseUrl : string = 'assets/fruits.json';
```

### 5. Local Fruit Search Logic
**File:** `src/app/services/fruit-service.ts`

**Before (API call):**
```typescript
  // metodo per prendere il nome dei frutti
  getYourFruit(name: string){
    this.http.get(`https://www.fruityvice.com/api/fruit/${name}`).subscribe({
      next: (response: any) =>{
        this.filteredFruit.next(response);
      },
      error: (error: any) => console.error('errore nel filtraggio frutti:', error)
    })
  }
```
**After (Local Array Search):**
```typescript
  // metodo per prendere il nome dei frutti
  getYourFruit(name: string){
    const fruits = this.fruits$.getValue();
    const fruit = fruits.find((f: any) => f.name.toLowerCase() === name.toLowerCase());
    
    if (fruit) {
      this.filteredFruit.next(fruit);
    } else {
      this.filteredFruit.next(null);
      alert('Frutto non trovato');
    }
  }
```

### 6. Clearing the Search on Category Click
**File:** `src/app/services/fruit-service.ts`

**Before:**
```typescript
  categoryFruit(category: string){
    // ...
    let resultCategoryFruits = this.fruits$.getValue().filter((frutto: any) =>{
        return categoryList.includes(frutto.name)
    })

    this.filteredFruitByCategory.next(resultCategoryFruits);
  }
```
**After:**
```typescript
  categoryFruit(category: string){
    // ...
    let resultCategoryFruits = this.fruits$.getValue().filter((frutto: any) =>{
        return categoryList.includes(frutto.name)
    })

    this.filteredFruitByCategory.next(resultCategoryFruits);
    this.filteredFruit.next(null); // Added this to clear the search!
  }
```

---
---

# Come abbiamo risolto il progetto EatBetter

Benvenuto! Se stai imparando Angular e lo sviluppo web, pubblicare il tuo primo progetto può essere un po' complicato a volte. Ecco una spiegazione semplice di tutti i bug che abbiamo trovato e di come li abbiamo risolti affinché il progetto funzionasse perfettamente su GitHub Pages.

### 1. Il percorso di pubblicazione su GitHub Pages
**Il Problema:** Quando pubblichi un'app su GitHub Pages, di solito si trova in una sottocartella come `https://tuo-nome.github.io/EatBetter/`. Ma Angular, per impostazione predefinita, presume che si trovi nella root `mio-sito.com/`. Quindi, quando il sito veniva caricato, cercava i file CSS e JS nel posto sbagliato e restituiva una pagina vuota.
**La Soluzione:** Abbiamo aggiornato lo script di deploy in `package.json` includendo `--base-href=/EatBetter/`. Questo dice ad Angular di aggiungere `/EatBetter/` prima di tutti i percorsi dei file in modo che tutto venga caricato correttamente.

### 2. Il Link del Logo
**Il Problema:** Nella barra di navigazione (`navbar.html`), il link del logo era scritto in modo fisso come `<a href="http://localhost:4200/">`. Questo significava che cliccare sul logo nel sito live avrebbe cercato di portare l'utente al proprio computer locale, il che ovviamente non funziona.
**La Soluzione:** Lo abbiamo cambiato in `<a href="./">` in modo che punti sempre alla home page del sito corrente.

### 3. Il Bug di ricaricamento della pagina del Modulo (Form)
**Il Problema:** La barra di ricerca era un normale `<form>` HTML. Quando cliccavi sul pulsante di ricerca, il browser faceva quello che fa sempre con i moduli: inviava i dati e **ricaricava la pagina** (aggiungendo `?search=...` all'URL). Poiché GitHub Pages è una Single Page Application (SPA), ricaricare con un parametro URL casuale causava una pagina di Errore 404.
**La Soluzione:** Abbiamo aggiunto `(ngSubmit)="findYourFruit()"` al form. Angular prende il controllo di `ngSubmit` e impedisce automaticamente il ricaricamento della pagina, permettendo al nostro codice di ricerca di funzionare senza interruzioni in background!

### 4. Il Problema del Filtro delle Categorie
**Il Problema:** Se cercavi un frutto specifico (come "Banana"), appariva sullo schermo. Ma se poi cliccavi su un pulsante di categoria (come "Sweet"), la Banana non andava via! L'app stava recuperando la lista delle categorie, ma si dimenticava di nascondere il singolo frutto cercato.
**La Soluzione:** Abbiamo aggiornato `fruit-service.ts`. Ora, ogni volta che un utente clicca su una categoria, diciamo esplicitamente all'app: `this.filteredFruit.next(null)` — che si traduce in "cancella il risultato della ricerca in modo che la lista delle categorie possa essere vista".

### 5. Il Boss Finale: Gli Errori CORS
**Il Problema:** L'app originariamente otteneva i suoi dati sui frutti chiedendoli a `https://www.fruityvice.com`. Durante lo sviluppo locale, Angular usa un file chiamato `proxy.config.json` per far finta che il backend sia sul tuo computer. Ma GitHub Pages ospita solo file statici (HTML/CSS/JS) — non può eseguire un server proxy! Quando il sito live chiedeva i dati a Fruityvice, il browser li bloccava per motivi di sicurezza (questo si chiama errore di policy CORS).
**La Soluzione:** Abbiamo provato a usare proxy CORS pubblici, ma venivano bloccati da Cloudflare. Quindi abbiamo usato la soluzione più infallibile: abbiamo scaricato l'intero database di frutta da Fruityvice e lo abbiamo salvato direttamente nel progetto come `src/assets/fruits.json`. Poi, abbiamo riscritto `fruit-service.ts` per leggere questo file locale invece del sito web esterno. Ora non ci sono errori CORS, e la ricerca è istantaneamente veloce!

---

## Importanti Modifiche al Codice

Ecco le sezioni specifiche di codice che sono state modificate per far funzionare il progetto.

### 1. Aggiunta dello Script di Deploy
**File:** `package.json`

**Prima:**
```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
```
**Dopo:**
```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "deploy": "ng build --base-href=/EatBetter/ && npx angular-cli-ghpages --dir=dist/EatBetter/browser"
  },
```

### 2. Correzione del Link del Logo
**File:** `src/app/components/navbar/navbar.html`

**Prima:**
```html
<div class="logo  w-[18%] md:w-[18%] px-2 ">
    <a href="http://localhost:4200/"> <img src="assets/images/logo.png" alt="Logo EatBetter" class="logo hover:cursor-pointer" ></a>
</div>
```
**Dopo:**
```html
<div class="logo  w-[18%] md:w-[18%] px-2 ">
    <a href="./"> <img src="assets/images/logo.png" alt="Logo EatBetter" class="logo hover:cursor-pointer" ></a>
</div>
```

### 3. Correzione del Modulo di Ricerca (Prevenire il Ricaricamento della Pagina)
**File:** `src/app/components/navbar/navbar.html`

**Prima:**
```html
<form class="flex items-center ...">   
    <div class="relative w-full min-w-0">
       <input type="search" ... (input)="searchFruit()" />
    </div>
    <button type="submit" ... (click)="findYourFruit()">
       <svg>...</svg>   
   </button>
</form>
```
**Dopo:**
```html
<form (ngSubmit)="findYourFruit()" class="flex items-center ...">   
    <div class="relative w-full min-w-0">
       <input type="search" ... />
    </div>
    <button type="submit" ...>
       <svg>...</svg>   
   </button>
</form>
```

### 4. Aggirare il CORS (Usando un JSON Locale)
**File:** `src/app/services/fruit-service.ts`

**Prima (Server Esterno):**
```typescript
export class FruitService {
  private http = inject(HttpClient);
  private baseUrl : string = 'https://www.fruityvice.com/api/fruit/all';
```
**Dopo (File Locale):**
```typescript
export class FruitService {
  private http = inject(HttpClient);
  private baseUrl : string = 'assets/fruits.json';
```

### 5. Logica di Ricerca Locale dei Frutti
**File:** `src/app/services/fruit-service.ts`

**Prima (Chiamata API):**
```typescript
  // metodo per prendere il nome dei frutti
  getYourFruit(name: string){
    this.http.get(`https://www.fruityvice.com/api/fruit/${name}`).subscribe({
      next: (response: any) =>{
        this.filteredFruit.next(response);
      },
      error: (error: any) => console.error('errore nel filtraggio frutti:', error)
    })
  }
```
**Dopo (Ricerca nell'Array Locale):**
```typescript
  // metodo per prendere il nome dei frutti
  getYourFruit(name: string){
    const fruits = this.fruits$.getValue();
    const fruit = fruits.find((f: any) => f.name.toLowerCase() === name.toLowerCase());
    
    if (fruit) {
      this.filteredFruit.next(fruit);
    } else {
      this.filteredFruit.next(null);
      alert('Frutto non trovato');
    }
  }
```

### 6. Ripristino della Ricerca al Clic sulla Categoria
**File:** `src/app/services/fruit-service.ts`

**Prima:**
```typescript
  categoryFruit(category: string){
    // ...
    let resultCategoryFruits = this.fruits$.getValue().filter((frutto: any) =>{
        return categoryList.includes(frutto.name)
    })

    this.filteredFruitByCategory.next(resultCategoryFruits);
  }
```
**Dopo:**
```typescript
  categoryFruit(category: string){
    // ...
    let resultCategoryFruits = this.fruits$.getValue().filter((frutto: any) =>{
        return categoryList.includes(frutto.name)
    })

    this.filteredFruitByCategory.next(resultCategoryFruits);
    this.filteredFruit.next(null); // Aggiunto questo per pulire la ricerca!
  }
```
