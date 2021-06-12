# Problem Child,

Hi, thank you for taking a look over this repo. 

The problem I am having is  that when I run `yarn build` the output denterated HTML and subequent links are all incorrect. Like all of them dont work, and the reasoning behind which i cant seem to fathom why it is.

## The Problem

To demonstrate, when accessing the `dist/index.html` through a seperate stand alone server; in this case vs code live server. We are greeted with a blank page. Inspecting the console, we are met with a MIME Type error, where it cant read the file that is sourced. 

Looking at the html, in particular the following three lines:

```html
 <script type="module" crossorigin src="/assets/index.2a5bea42.js"></script>
  <link rel="modulepreload" href="/assets/vendor.b22d0d03.js">
  <link rel="stylesheet" href="/assets/index.0673ce28.css">
  ```
  Everything looks okay, however if we were to remove the first `/` from the links, each of the destination files, are now found.

  ```html
   <script type="module" crossorigin src="assets/index.2a5bea42.js"></script>
  <link rel="modulepreload" href="assets/vendor.b22d0d03.js">
  <link rel="stylesheet" href="assets/index.0673ce28.css">
 ```
I found this a very peculiar action, for the entire build, apart from the ssr and the ssr-render, function works fine in the `dev` enviroment,

Any assistance would be greatly appreciated, my immediate thoughts are that something is misplaced in the build process, but fook me if I can find the actual problem, it feels like, somewhere, when the links are all being injected into the `htmlTransfrom` step, it ends with a trailing `/`, which would then cause the above conflict, for they would be looking for a file at `url//assets/` 
Which is awfully bizzare.

Again, my deepest thanks for the assistance,

=)
