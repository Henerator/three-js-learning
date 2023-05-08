# Three JS Learning

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Materials

### Depth test

Depth test is a tool built in today's GPUs to allow to get the desired draw output regardless of the order which the objects are drawn. This is normally very useful but it comes with a critical weakness: depth and blending(transparency) do not work together. Why is this the case? Well what depth test does is that for every pixel that is drawn, the distance(depth) of that pixel to the camera is compared to the depth value stored in that the pixel. If the distance is less that the stored depth value, the pixel is drawn, otherwise that pixel is discarded.

## Deploy

- `npm run build`
- `git commit`
- `git push -d origin gh-pages`
- `git subtree push --prefix dist origin gh-pages`

## Shaders

### Variable Qualifiers

- **const** – The declaration is of a compile time constant.

- **attribute** – Global variables that may change per vertex, that are passed from the OpenGL application to vertex shaders. This qualifier can only be used in vertex shaders. For the shader this is a read-only variable.

  - **in** for vertex shader

- **uniform** – Global variables that may change per primitive, that are passed from the OpenGL application to the shaders. This qualifier can be used in both vertex and fragment shaders. For the shaders this is a read-only variable.

- **varying** – used for interpolated data between a vertex shader and a fragment shader. Available for writing in the vertex shader, and read-only in a fragment shader.

  - **out** for vertex shader. **in** for fragment shader
