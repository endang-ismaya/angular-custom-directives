# Angular 10 to Angular 19 Upgrade Design

## Overview

**Project**: Angular Custom Directives (learning/teaching demo)
**Current Version**: Angular 10.0.2 (July 2020)
**Target Version**: Angular 19.2.x (April 2026)
**Purpose**: Resolve 168 security vulnerabilities while preserving educational value of custom directive implementations

## Approach

**Fresh scaffold + port code**: Create new Angular 19 project, then migrate directive logic with minimal changes to preserve original teaching content.

## Project Structure Changes

### Current (Angular 10)
```
src/
├── app/
│   ├── app.module.ts         (NgModule)
│   ├── app.component.ts      (declared in module)
│   ├── times.directive.ts    (declared in module)
│   └── class.directive.ts    (declared in module)
├── main.ts                   (bootstrap AppModule)
├── polyfills.ts
└── environments/
├── e2e/                      (Protractor)
└── karma.conf.js
```

### Target (Angular 19)
```
src/
├── app/
│   ├── app.component.ts      (standalone, bootstrap)
│   ├── app.component.html
│   ├── app.component.css
│   ├── times.directive.ts    (standalone directive)
│   ├── class.directive.ts    (standalone directive)
│   └── app.config.ts         (ApplicationConfig)
├── main.ts                   (bootstrapApplication)
├── index.html
├── styles.css
└── assets/
```

**Key changes**:
- `app.module.ts` → deleted (replaced by `app.config.ts`)
- `app.config.ts` provides router/browser providers
- All components/directives add `standalone: true`
- `e2e/` folder → deleted (Protractor deprecated)
- `karma.conf.js` → deleted (replaced by Jest)

## Directive Syntax Changes

### TimesDirective (Structural)

Core logic unchanged. Only decorator syntax update:

```typescript
// Angular 10
@Directive({ selector: '[appTimes]' })

// Angular 19
@Directive({
  selector: '[appTimes]',
  standalone: true
})
```

Input setter, ViewContainerRef, TemplateRef usage remains identical.

### ClassDirective (Attribute)

```typescript
// Angular 10
@Directive({ selector: '[appClass]' })

// Angular 19
@Directive({
  selector: '[appClass]',
  standalone: true
})
```

Optional modernization: Use `inject(ElementRef)` instead of constructor injection for teaching modern DI patterns.

### AppComponent (Image Gallery)

```typescript
// Angular 10
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Angular 19
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimesDirective, ClassDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

Template syntax unchanged (optional: migrate `*ngFor` to `@for` control flow).

## Testing & Build Tools

### Deprecated Tools Replaced

| Tool | Angular 10 | Angular 19 |
|------|------------|------------|
| Unit tests | Karma + Jasmine | Jest (via @angular/jest) |
| E2E tests | Protractor | Removed |
| Linting | TSLint | ESLint + @angular-eslint |

### Build Configuration

| Aspect | Angular 10 | Angular 19 |
|--------|------------|------------|
| Builder | `browser` | `application` |
| SSR | None | Optional (built-in) |
| Config schema | v1 | v2 |

### Test Changes

- Unit tests converted to Jest syntax
- E2E folder deleted (Protractor tests removed)
- Test files: `*.spec.ts` preserved with Jest syntax update

## Security Resolution

All 168 vulnerabilities resolved by fresh Angular 19 scaffold:

| Category | Resolution |
|----------|------------|
| Angular core XSS CVEs | Angular 19 has no known CVEs |
| webpack/karma vulnerabilities | Replaced by modern build tools |
| serialize-javascript RCE | Secure version in Angular 19 deps |
| Babel traverse arbitrary execution | Updated to secure version |
| All transitive dev deps | Fresh lockfile with secure versions |

### New Dependencies

```json
{
  "dependencies": {
    "@angular/core": "^19.2.0",
    "@angular/common": "^19.2.0",
    "@angular/compiler": "^19.2.0",
    "@angular/platform-browser": "^19.2.0",
    "@angular/platform-browser-dynamic": "^19.2.0",
    "rxjs": "^7.8.0",
    "zone.js": "^0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.2.0",
    "@angular/cli": "^19.2.0",
    "@angular/compiler-cli": "^19.2.0",
    "typescript": "~5.7.0",
    "@angular-eslint/schematics": "^19.0.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0"
  }
}
```

Bootstrap removed (use CSS framework if desired, not included by default).

**Expected result**: Fresh package-lock.json with 0 vulnerabilities.

## Implementation Order

1. Create fresh Angular 19 scaffold in temporary directory
2. Port directive files with standalone syntax
3. Port component with standalone syntax + imports
4. Create app.config.ts with providers
5. Update main.ts to use bootstrapApplication
6. Copy template/CSS files
7. Delete old config files (karma.conf.js, e2e/, etc.)
8. Replace package.json with new dependencies
9. Run npm install (fresh lockfile)
10. Verify build passes
11. Verify tests pass
12. Run npm audit to confirm vulnerability resolution

## Success Criteria

- [ ] Angular 19 build succeeds (`npm run build`)
- [ ] Dev server runs (`npm start`)
- [ ] Tests pass (`npm test`)
- [ ] npm audit shows 0 vulnerabilities
- [ ] TimesDirective renders elements correctly
- [ ] ClassDirective applies/removes classes correctly
- [ ] Image gallery displays and functions