# Angular 19 Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade Angular 10 to Angular 19, resolving all 168 security vulnerabilities while preserving custom directive educational content.

**Architecture:** Fresh scaffold approach - create new Angular 19 project structure, then port directive logic with standalone syntax updates.

**Tech Stack:** Angular 19.2.x, TypeScript 5.7, RxJS 7.8, Jest (replacing Karma), ESLint (replacing TSLint)

---

## Task 1: Create Angular 19 Scaffold

**Files:**
- Create: temporary directory for scaffold
- Modify: existing project files after scaffold extraction

**Step 1: Create temporary scaffold directory**

Run: `mkdir -p /tmp/angular19-scaffold`
Expected: Directory created

**Step 2: Generate Angular 19 project in temp directory**

Run: `cd /tmp/angular19-scaffold && npx @angular/cli@19 new angular19-temp --standalone --style=css --routing=false --skip-tests --skip-git --skip-install`
Expected: Angular 19 scaffold created

**Step 3: Verify scaffold structure**

Run: `ls -la /tmp/angular19-scaffold/angular19-temp/src/app/`
Expected: See `app.component.ts`, `app.config.ts`, `app.component.html`

**Step 4: Copy scaffold files to project**

Run:
```bash
cp /tmp/angular19-scaffold/angular19-temp/src/app/app.config.ts /Volumes/eimdata/devs/ws_angular/angular_custom_directives/src/app/
cp /tmp/angular19-scaffold/angular19-temp/angular.json /Volumes/eimdata/devs/ws_angular/angular_custom_directives/
cp /tmp/angular19-scaffold/angular19-temp/tsconfig.json /Volumes/eimdata/devs/ws_angular/angular_custom_directives/
cp /tmp/angular19-scaffold/angular19-temp/tsconfig.app.json /Volumes/eimdata/devs/ws_angular/angular_custom_directives/
cp /tmp/angular19-scaffold/angular19-temp/tsconfig.spec.json /Volumes/eimdata/devs/ws_angular/angular_custom_directives/
cp /tmp/angular19-scaffold/angular19-temp/package.json /Volumes/eimdata/devs/ws_angular/angular_custom_directives/
```
Expected: Files copied successfully

---

## Task 2: Update TimesDirective for Angular 19

**Files:**
- Modify: `src/app/times.directive.ts`

**Step 1: Add standalone flag to TimesDirective**

```typescript
import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appTimes]',
  standalone: true
})
export class TimesDirective {
  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input('appTimes') set render(times: number) {
    this.viewContainer.clear();

    for (let i = 0; i < times; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, { index: i });
    }
  }
}
```

Run: Verify file updated correctly
Expected: `standalone: true` added to decorator

**Step 2: Commit**

```bash
git add src/app/times.directive.ts
git commit -m "feat(directive): update TimesDirective to Angular 19 standalone"
```

---

## Task 3: Update ClassDirective for Angular 19

**Files:**
- Modify: `src/app/class.directive.ts`

**Step 1: Add standalone flag and use inject() for modern DI**

```typescript
import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appClass]',
  standalone: true
})
export class ClassDirective {
  private element = inject(ElementRef);

  @Input('appClass') set classNames(classObj: any) {
    for (let key in classObj) {
      if (classObj[key]) {
        this.element.nativeElement.classList.add(key);
      } else {
        this.element.nativeElement.classList.remove(key);
      }
    }
  }
}
```

Run: Verify file updated correctly
Expected: `standalone: true` added, constructor replaced with `inject()`

**Step 2: Commit**

```bash
git add src/app/class.directive.ts
git commit -m "feat(directive): update ClassDirective to Angular 19 standalone with inject()"
```

---

## Task 4: Update AppComponent for Angular 19

**Files:**
- Modify: `src/app/app.component.ts`

**Step 1: Convert AppComponent to standalone with imports**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesDirective } from './times.directive';
import { ClassDirective } from './class.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TimesDirective, ClassDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentPage = 0;
  images = [
    {
      id: 1,
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 2,
      title: 'At the Travel',
      url: 'https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 3,
      title: 'At the Spain',
      url: 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 4,
      title: 'At the Italy',
      url: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 5,
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1543429257-3eb0b65d9c58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 6,
      title: 'At the Travel',
      url: 'https://images.unsplash.com/photo-1554072674-d044ac975436?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 7,
      title: 'At the Spain',
      url: 'https://images.unsplash.com/photo-1489401645581-907b695b9bce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 8,
      title: 'At the Italy',
      url: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 9,
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 10,
      title: 'At the Travel',
      url: 'https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 11,
      title: 'At the Spain',
      url: 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 12,
      title: 'At the Italy',
      url: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 13,
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 14,
      title: 'At the Travel',
      url: 'https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 15,
      title: 'At the Spain',
      url: 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 16,
      title: 'At the Italy',
      url: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
  ];

  checkWindowIndex(index: number) {
    return Math.abs(this.currentPage - index) < 5;
  }
}
```

Run: Verify file updated correctly
Expected: `standalone: true`, `imports: [CommonModule, TimesDirective, ClassDirective]`

**Step 2: Commit**

```bash
git add src/app/app.component.ts
git commit -m "feat(component): update AppComponent to Angular 19 standalone"
```

---

## Task 5: Create app.config.ts

**Files:**
- Create: `src/app/app.config.ts`

**Step 1: Create ApplicationConfig**

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners, provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration()
  ]
};
```

Run: Verify file created
Expected: File exists with ApplicationConfig

**Step 2: Commit**

```bash
git add src/app/app.config.ts
git commit -m "feat(config): add Angular 19 app.config.ts"
```

---

## Task 6: Update main.ts for bootstrapApplication

**Files:**
- Modify: `src/main.ts`

**Step 1: Replace NgModule bootstrap with standalone bootstrap**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

Run: Verify file updated correctly
Expected: Uses `bootstrapApplication` instead of `platformBrowserDynamic`

**Step 2: Commit**

```bash
git add src/main.ts
git commit -m "feat(bootstrap): update main.ts to use bootstrapApplication"
```

---

## Task 7: Update polyfills.ts

**Files:**
- Modify: `src/polyfills.ts`

**Step 1: Simplify polyfills for Angular 19**

```typescript
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * Angular 19 requires minimal polyfills for modern browsers.
 */

/***************************************************************************************************
 * Zone JS is required by Angular.
 */
import 'zone.js';
```

Run: Verify file updated correctly
Expected: Minimal polyfills, zone.js import only

**Step 2: Commit**

```bash
git add src/polyfills.ts
git commit -m "feat(polyfills): simplify for Angular 19"
```

---

## Task 8: Update styles.css (Remove Bootstrap dependency)

**Files:**
- Modify: `src/styles.css`

**Step 1: Remove Bootstrap import, add basic pagination styles**

```css
/* Global styles for Angular Custom Directives demo */

/* Pagination styling (replaces Bootstrap) */
.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.page-link:hover {
  background-color: #e9ecef;
}

.page-item.active .page-link {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #dee2e6;
}

/* Container styling */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Image styling */
.img-thumbnail {
  padding: 4px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.w-50 {
  width: 50%;
}

/* Text utilities */
.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 24px;
}

.mt-5 {
  margin-top: 48px;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}
```

Run: Verify file updated correctly
Expected: Bootstrap import removed, basic pagination styles added

**Step 2: Commit**

```bash
git add src/styles.css
git commit -m "feat(styles): replace Bootstrap with custom pagination styles"
```

---

## Task 9: Delete Deprecated Files

**Files:**
- Delete: `src/app/app.module.ts`
- Delete: `src/environments/environment.ts`
- Delete: `src/environments/environment.prod.ts`
- Delete: `e2e/` directory
- Delete: `karma.conf.js`
- Delete: `tsconfig.base.json`
- Delete: `tslint.json`
- Delete: `.editorconfig`

**Step 1: Delete app.module.ts**

Run: `rm src/app/app.module.ts`
Expected: File deleted

**Step 2: Delete environments folder**

Run: `rm -rf src/environments/`
Expected: Directory deleted

**Step 3: Delete e2e folder**

Run: `rm -rf e2e/`
Expected: Directory deleted

**Step 4: Delete karma config**

Run: `rm karma.conf.js`
Expected: File deleted

**Step 5: Delete tslint and editorconfig**

Run: `rm tslint.json tsconfig.base.json .editorconfig 2>/dev/null || true`
Expected: Files deleted (ignore if not found)

**Step 6: Commit deletions**

```bash
git add -A
git commit -m "refactor: remove deprecated Angular 10 files (NgModule, karma, protractor)"
```

---

## Task 10: Update package.json

**Files:**
- Modify: `package.json`

**Step 1: Replace with Angular 19 dependencies**

```json
{
  "name": "pages",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^19.2.0",
    "@angular/common": "^19.2.0",
    "@angular/compiler": "^19.2.0",
    "@angular/core": "^19.2.0",
    "@angular/forms": "^19.2.0",
    "@angular/platform-browser": "^19.2.0",
    "@angular/platform-browser-dynamic": "^19.2.0",
    "@angular/router": "^19.2.0",
    "rxjs": "^7.8.0",
    "tslib": "^2.0.0",
    "zone.js": "^0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.2.0",
    "@angular/cli": "^19.2.0",
    "@angular/compiler-cli": "^19.2.0",
    "@types/jasmine": "^5.1.0",
    "jasmine-core": "^5.6.0",
    "karma": "^6.4.0",
    "karma-chrome-launcher": "^3.2.0",
    "karma-coverage": "^2.2.0",
    "karma-jasmine": "^5.1.0",
    "karma-jasmine-html-reporter": "^2.1.0",
    "typescript": "~5.7.0"
  }
}
```

Run: Verify package.json updated
Expected: Angular 19 dependencies

**Step 2: Commit**

```bash
git add package.json
git commit -m "feat(deps): update to Angular 19 dependencies"
```

---

## Task 11: Delete package-lock.json and node_modules

**Files:**
- Delete: `package-lock.json`
- Delete: `node_modules/`

**Step 1: Delete old lockfile and node_modules**

Run: `rm -rf package-lock.json node_modules/`
Expected: Files deleted

**Step 2: Commit**

```bash
git add -A
git commit -m "refactor: remove Angular 10 package-lock.json for fresh install"
```

---

## Task 12: Install Dependencies

**Step 1: Run npm install**

Run: `npm install --registry=https://registry.npmjs.org`
Expected: Angular 19 dependencies installed successfully

**Step 2: Verify installation**

Run: `npm list @angular/core`
Expected: Shows `@angular/core@19.2.x`

---

## Task 13: Verify Build

**Step 1: Run Angular build**

Run: `npm run build`
Expected: Build succeeds, no errors

**Step 2: Check build output**

Run: `ls -la dist/pages/`
Expected: Build artifacts exist

**Step 3: Commit build verification**

```bash
git add package-lock.json
git commit -m "chore: add fresh package-lock.json with Angular 19"
```

---

## Task 14: Verify Dev Server

**Step 1: Start dev server (background)**

Run: `npm start &`
Expected: Dev server starts on port 4200

**Step 2: Verify server responds**

Run: `curl -s http://localhost:4200 | head -20`
Expected: HTML returned with `<app-root>`

**Step 3: Stop dev server**

Run: `pkill -f "ng serve" || true`
Expected: Server stopped

---

## Task 15: Run npm Audit

**Step 1: Check security status**

Run: `npm audit --registry=https://registry.npmjs.org`
Expected: 0 vulnerabilities (or minimal low-severity)

**Step 2: Document audit result**

If vulnerabilities remain, document which ones and severity level.

---

## Task 16: Update Test Files (Optional)

**Files:**
- Modify: `src/app/times.directive.spec.ts`
- Modify: `src/app/class.directive.spec.ts`
- Modify: `src/app/app.component.spec.ts`

**Step 1: Update times.directive.spec.ts**

```typescript
import { TimesDirective } from './times.directive';

describe('TimesDirective', () => {
  it('should create an instance', () => {
    const directive = new TimesDirective(null as any, null as any);
    expect(directive).toBeTruthy();
  });
});
```

**Step 2: Update class.directive.spec.ts**

```typescript
import { ClassDirective } from './class.directive';

describe('ClassDirective', () => {
  it('should create an instance', () => {
    const directive = new ClassDirective();
    expect(directive).toBeTruthy();
  });
});
```

**Step 3: Update app.component.spec.ts**

```typescript
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TimesDirective } from './times.directive';
import { ClassDirective } from './class.directive';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TimesDirective, ClassDirective],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have currentPage as 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentPage).toBe(0);
  });

  it('should have 16 images', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.images.length).toBe(16);
  });
});
```

**Step 4: Run tests**

Run: `npm test -- --no-watch --browsers=ChromeHeadless`
Expected: Tests pass

**Step 5: Commit tests**

```bash
git add src/app/*.spec.ts
git commit -m "test: update specs for Angular 19 standalone components"
```

---

## Task 17: Final Verification

**Step 1: Run full build**

Run: `npm run build`
Expected: SUCCESS

**Step 2: Run tests**

Run: `npm test -- --no-watch --browsers=ChromeHeadless`
Expected: All tests pass

**Step 3: Verify npm audit**

Run: `npm audit --registry=https://registry.npmjs.org`
Expected: 0 vulnerabilities

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Angular 10 to Angular 19 upgrade

- Resolved all 168 security vulnerabilities
- Updated directives to standalone syntax
- Replaced deprecated tools (Karma/Protractor/TSLint)
- Preserved custom directive educational content"
```

---

## Success Criteria

- [ ] `npm run build` succeeds with 0 errors
- [ ] `npm start` runs dev server successfully
- [ ] `npm test` passes all tests
- [ ] `npm audit` shows 0 vulnerabilities (or minimal low-severity)
- [ ] TimesDirective renders multiple elements correctly
- [ ] ClassDirective applies/removes CSS classes correctly
- [ ] Image gallery pagination and display functions