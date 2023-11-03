# Angular Starter Theme

The Angular Starter Theme is an initial project setup for Angular that configures essential elements to expedite the initial phase of code production.

**Angular Version:** 16.2.6  
**Node Version:** 16.17

## 1. Project Structure

```
- app/
  - app-routing.module.ts
  - app.component.html
  - app.component.scss
  - app.component.ts
  - app.module.ts
  - core/
    - directives/
      - restrict-characters.directive.ts
      - scroll-animation.directive.ts
    - enums/
    - guards/
      - authorized.guard.ts
    - interceptors/
      - api-url.interceptor.ts
      - auth.interceptor.ts
      - error-handler.interceptor.ts
    - models/
      - option.model.ts
      - user.model.ts
    - pipes/
      - form-control.pipe.ts
    - services/
      - auth.service.ts
      - form-validation.service.ts
      - profile.service.ts
      - snack-bar.service.ts
    - utilities/
      - conversions.utils.ts
      - form.utils.ts
      - functions.utils.ts
    - validators/
  - modules/
    - auth/
      - auth-routing.module.ts
      - auth.component.ts
      - auth.module.ts
      - login/
        - login.component.ts
      - register/
        - register.component.ts
    - pages/
      - pages-routing.module.ts
      - pages.component.ts
      - pages.module.ts
      - subpages/
        - home/
          - home.component.ts
    - profile/
      - profile-routing.module.ts
      - profile.component.ts
      - profile.module.ts
  - shared/
    - shared.module.ts
    - components/
      - dialogs/
      - footer/
        - footer.component.ts
      - form/
        - checkbox/
          - checkbox.component.ts
        - checkbox-group/
          - checkbox-group.component.ts
        - input/
          - input.component.ts
        - input-autocomplete/
          - input-autocomplete.component.ts
        - radio-group/
          - radio-group.component.ts
        - select/
          - select.component.ts
        - textarea/
          - textarea.component.ts
      - navbar/
        - navbar.component.ts
      - page-not-found/
        - page-not-found.component.ts
      - pagination/
        - pagination.component.ts
    - loaders/
      - translate-browser.loader.ts
    - utils/
- assets/
  - .gitkeep
  - i18n/
    - en.json
- environments/
  - environment.prod.ts
  - environment.staging.ts
  - environment.ts
```

## 2. API Simulation
For API simulation, a simple JSON server has been added in the `server` subfolder. To start it, use:
- `npm run server` or `node ./server/`
The API will be available at: http://localhost:4200/
If you have a ready-to-use API at the start, simply remove the `server` folder.
Documentation link: https://www.npmjs.com/package/json-server

## 3. Core Settings
- Added support for staging environment
- Added EsLint
- Added support for multilingualism (ngx-translate)
- Strict mode

## 4. Styles

Basic application styles have been written, largely based on the OOCSS methodology, which I find best for Angular, where styles are separated for components. With a significant number of useful utility classes and mixins, managing styles in our project becomes straightforward.
Styles are located in the `shared` folder; thanks to `stylePreprocessorOptions` set in `angular.json`, they can be used from any location without specifying the full path, for example:
```scss
@use 'variables' as var;
@use 'mixins' as mixin;
```

### 4.1 Angular Material
Configured material theme allows for easy modification of color palettes and typography. Basic color variables are extracted to "variables.scss" for easy access to the primary palette colors. In the file `material/config.scss`, you can set all the styles associated with it.

### 4.2 Variables
The project's color scheme is based on variables in 'variables.scss'. Initially, colors: primary/accent/warn dynamically take values from the Angular color palette set in 'material/config.scss', ensuring color consistency between Angular Material and our project. However, you can operate the variables in any way and easily replace the colors if you decide to stop using Angular Material.

### 4.3 Utility Class
Based on the `OOCSS methodology`, utility classes have been created, some of which are presented here, with more information available in the specific files they relate to.

#### 4.3.1 grid.scss
Inspired by Bootstrap Grid. 
(Media queries are dependent on settings in variables.scss).

```html
<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-4">
      <span>Col 1</span>
    </div>
    <div class="col-sm-12 col-md-4">
      <span>Col 2</span>
    </div>
    <div class="col-sm-12 col-md-4">
      <span>Col 3</span>
    </div>
  </div>
</div>
```
In this file, you will also find utility classes for `max-width`, an example of usage:
`<div class="max-w-md"> </div>`

### 4.3.2 `buttons.scss`

#### Standard Buttons:
```html
<button class="btn">Button basic</button>
<button class="btn" color="primary">Button primary</button>
<button class="btn" color="accent">Button accent</button>
<button class="btn" color="warn">Button warn</button>
<button class="btn" disabled>Button disabled</button>
```

#### Outline Buttons:
```html
<button class="btn outline">Button basic</button>
<button class="btn outline" color="primary">Button primary</button>
<button class="btn outline" color="accent">Button accent</button>
<button class="btn outline" color="warn">Button warn</button>
<button class="btn outline" disabled>Button disabled</button>
```

### 4.3.3 `spacing.scss`

#### Spacing for margins and paddings with example usage:
```html
<div class="m-auto pt-2"></div>
<div class="mt-5 pb-2"></div>
```

- `mt` = margin-top
- `pb` = padding-bottom
- etc.

Configurable spacing values in `spacing.scss`:
```
0: 0,
1: 0.25rem,
2: 0.5rem,
3: 1rem,
4: 1.5rem,
5: 3rem,
```

### 4.3.4 `typography.scss`

#### Typography settings and utilities with example usage:
```html
<h2 class="text-primary lowercase text-center">Lorem ipsum</h2>
```

### 4.3.5 `mixins.scss`

Basic mixins, mainly for animations, are placed in the shared folder for easy importing.

### 4.3.6 `media-queries.scss`

Contains mixins for media queries, based on values in `variables.scss`.

## 5. Interceptors

### 5.1 `ApiUrlInterceptor`

Automatically appends the base URL API to all outgoing HTTP requests to ensure endpoint address consistency throughout the application.

### 5.2 `AuthInterceptor`

Attaches an authentication token to HTTP requests if the user is logged in, allowing for server resource access control.

### 5.3 `ErrorHandlerInterceptor`

Catches HTTP responses with errors and centrally handles exceptions, simplifying error management in the application.

## 6. `Auth.module`

A dedicated functional module managing user authentication functionalities, such as login and verification of user authentication status within the application, along with `auth.service.ts`.

## 7. `Shared.module`

Includes components, directives, pipes, and services used across multiple other modules in the application, allowing for their reuse and reducing code redundancy.

### 7.1 Shared Forms

Input components in the forms folder of `SharedModule` are built using the `ControlValueAccessor` pattern for easy integration with reactive forms and full control over their behavior. They also include error handling with `ngx-translate` translations for easy customization and localization of error messages. Each input offers additional features specific to its type, such as autocomplete or group selections, and supports two appearance styles: `fill` for a solid background and `outline` for a contoured edge, facilitating consistent adaptation to various design themes and application requirements.

#### Example usage:
```html
<app-input-autocomplete 
    formControlName="autocompleteList"
    [options]="autocompleteList" 
    label="Pick a car" 
    appearance="outline">
</app-input-autocomplete>

<app-input 
   formControlName="password" 
   label="Password" 
   type="password"
   appearance="fill"> 
</app-input>

<app-select formControlName="selectList" [options]="selectList"
  label="Select (fill)"></app-select>
```

## 8. Multilingual Support

The project is built with flexibility in mind, using `ngx-translate` for internationalization, with English as the default and primary language of the application. While the multilingual structure is implemented and ready to use, it is not a requirement—the application can function effectively in a monolingual environment. `ngx-translate` enables simple scalability of the project, allowing for the addition of new languages in the future by adding the respective JSON translation files. This pragmatic approach ensures that managing translations and customizing the application for additional language requirements can be carried out as the project develops, without the need for reconfiguration or significant modifications to existing code.

## 9. Additional Tools/Utilities

The project incorporates useful tools and utilities that aid in maintaining clean, functional application code and facilitate working with forms and data. These include functions for form validation and management, pipes for transforming data displayed in templates, and conversion functions that allow for easy data manipulation and formatting.

For instance:
A `ScrollAnimationDirective` has been added. When applied to any element, such as:
```html
<div appScrollAnimation></div>
```
it assigns a predefined CSS class ('scroll-animation') to the element when it becomes visible on the user's screen, enabling the addition of animations to div.scroll-animation that should appear when the user scrolls to that element.

