/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "(pages-dir-node)/./lib/constants.ts":
/*!**************************!*\
  !*** ./lib/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ABOUT_FILE: () => (/* binding */ ABOUT_FILE),\n/* harmony export */   CONTENT_DIR: () => (/* binding */ CONTENT_DIR)\n/* harmony export */ });\nconst CONTENT_DIR = \"content\";\nconst ABOUT_FILE = \"about.md\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9jb25zdGFudHMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxNQUFNQSxjQUFjLFVBQVU7QUFDOUIsTUFBTUMsYUFBYSxXQUFXIiwic291cmNlcyI6WyIvVXNlcnMvbndjL2dpdC9uZWlsY2hlbi5jYy9saWIvY29uc3RhbnRzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBDT05URU5UX0RJUiA9IFwiY29udGVudFwiO1xuZXhwb3J0IGNvbnN0IEFCT1VUX0ZJTEUgPSBcImFib3V0Lm1kXCI7Il0sIm5hbWVzIjpbIkNPTlRFTlRfRElSIiwiQUJPVVRfRklMRSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/constants.ts\n");

/***/ }),

/***/ "(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%2Findex.tsx&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%2Findex.tsx&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages/module.compiled */ \"(pages-dir-node)/./node_modules/next/dist/server/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(pages-dir-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(pages-dir-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"(pages-dir-node)/./node_modules/next/dist/pages/_document.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"(pages-dir-node)/./pages/_app.tsx\");\n/* harmony import */ var _pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/index.tsx */ \"(pages-dir-node)/./pages/index.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__]);\n_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'default'));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'config');\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/index\",\n        pathname: \"/\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    components: {\n        // default export might not exist when optimized for data only\n        App: private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        Document: (private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default())\n    },\n    userland: _pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVMmcGFnZT0lMkYmcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPS4lMkZwYWdlcyUyRmluZGV4LnRzeCZhYnNvbHV0ZUFwcFBhdGg9cHJpdmF0ZS1uZXh0LXBhZ2VzJTJGX2FwcCZhYnNvbHV0ZURvY3VtZW50UGF0aD1wcml2YXRlLW5leHQtcGFnZXMlMkZfZG9jdW1lbnQmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdGO0FBQ2hDO0FBQ0U7QUFDMUQ7QUFDeUQ7QUFDVjtBQUMvQztBQUM4QztBQUM5QztBQUNBLGlFQUFlLHdFQUFLLENBQUMsNkNBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sdUJBQXVCLHdFQUFLLENBQUMsNkNBQVE7QUFDckMsdUJBQXVCLHdFQUFLLENBQUMsNkNBQVE7QUFDckMsMkJBQTJCLHdFQUFLLENBQUMsNkNBQVE7QUFDekMsZUFBZSx3RUFBSyxDQUFDLDZDQUFRO0FBQzdCLHdCQUF3Qix3RUFBSyxDQUFDLDZDQUFRO0FBQzdDO0FBQ08sZ0NBQWdDLHdFQUFLLENBQUMsNkNBQVE7QUFDOUMsZ0NBQWdDLHdFQUFLLENBQUMsNkNBQVE7QUFDOUMsaUNBQWlDLHdFQUFLLENBQUMsNkNBQVE7QUFDL0MsZ0NBQWdDLHdFQUFLLENBQUMsNkNBQVE7QUFDOUMsb0NBQW9DLHdFQUFLLENBQUMsNkNBQVE7QUFDekQ7QUFDTyx3QkFBd0Isa0dBQWdCO0FBQy9DO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLDhEQUFXO0FBQ3hCLGtCQUFrQixvRUFBZ0I7QUFDbEMsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVELGlDIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZXNSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvcGFnZXMvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgYXBwIGFuZCBkb2N1bWVudCBtb2R1bGVzLlxuaW1wb3J0ICogYXMgZG9jdW1lbnQgZnJvbSBcInByaXZhdGUtbmV4dC1wYWdlcy9fZG9jdW1lbnRcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19hcHBcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzL2luZGV4LnRzeFwiO1xuLy8gUmUtZXhwb3J0IHRoZSBjb21wb25lbnQgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U3RhdGljUHJvcHMnKTtcbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQYXRocyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U3RhdGljUGF0aHMnKTtcbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgJ2dldFNlcnZlclNpZGVQcm9wcycpO1xuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG5leHBvcnQgY29uc3QgcmVwb3J0V2ViVml0YWxzID0gaG9pc3QodXNlcmxhbmQsICdyZXBvcnRXZWJWaXRhbHMnKTtcbi8vIFJlLWV4cG9ydCBsZWdhY3kgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUHJvcHMnKTtcbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQYXRocyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUGF0aHMnKTtcbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQYXJhbXMgPSBob2lzdCh1c2VybGFuZCwgJ3Vuc3RhYmxlX2dldFN0YXRpY1BhcmFtcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclByb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTZXJ2ZXJQcm9wcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclNpZGVQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc1JvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFUyxcbiAgICAgICAgcGFnZTogXCIvaW5kZXhcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL1wiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgLy8gZGVmYXVsdCBleHBvcnQgbWlnaHQgbm90IGV4aXN0IHdoZW4gb3B0aW1pemVkIGZvciBkYXRhIG9ubHlcbiAgICAgICAgQXBwOiBhcHAuZGVmYXVsdCxcbiAgICAgICAgRG9jdW1lbnQ6IGRvY3VtZW50LmRlZmF1bHRcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%2Findex.tsx&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ \"(pages-dir-node)/./pages/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/Users/nwc/git/neilchen.cc/pages/_app.tsx\",\n        lineNumber: 6,\n        columnNumber: 10\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQzBCO0FBQ0o7QUFFdEIsU0FBU0MsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM3QyxxQkFBTyw4REFBQ0Q7UUFBVyxHQUFHQyxTQUFTOzs7Ozs7QUFDakM7QUFFQSxpRUFBZUYsR0FBR0EsRUFBQyIsInNvdXJjZXMiOlsiL1VzZXJzL253Yy9naXQvbmVpbGNoZW4uY2MvcGFnZXMvX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9zdHlsZXMuY3NzJztcblxuZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,Container,Divider,Typography!=!@mui/material */ \"(pages-dir-node)/__barrel_optimize__?names=Box,Button,Container,Divider,Typography!=!./node_modules/@mui/material/esm/index.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/constants */ \"(pages-dir-node)/./lib/constants.ts\");\n/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gray-matter */ \"gray-matter\");\n/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(gray_matter__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__]);\n_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\nfunction Home({ content }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Container, {\n        maxWidth: \"md\",\n        sx: {\n            mt: 4\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n                sx: {\n                    display: \"flex\",\n                    flexDirection: {\n                        xs: \"column\",\n                        sm: \"row\"\n                    },\n                    gap: 4,\n                    alignItems: \"flex-start\"\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n                        sx: {\n                            display: \"flex\",\n                            flexDirection: \"column\",\n                            gap: 2\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                                variant: \"h1\",\n                                sx: {\n                                    alignSelf: \"flex-start\"\n                                },\n                                children: \"Neil Chen\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                                lineNumber: 34,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                                        variant: \"text\",\n                                        color: \"primary\",\n                                        children: \"Blog\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                                        lineNumber: 38,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                                        variant: \"text\",\n                                        color: \"primary\",\n                                        children: \"Contact\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                                        lineNumber: 41,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                                        variant: \"text\",\n                                        color: \"primary\",\n                                        children: \"GitHub\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                                        lineNumber: 44,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                                        variant: \"text\",\n                                        color: \"primary\",\n                                        children: \"LinkedIn\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                                        lineNumber: 47,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                                lineNumber: 37,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                                    variant: \"body1\",\n                                    children: content\n                                }, void 0, false, {\n                                    fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                                    lineNumber: 52,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                                lineNumber: 51,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n                        sx: {\n                            order: {\n                                xs: -1,\n                                sm: 0\n                            }\n                        },\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                            src: \"/profile.png\",\n                            style: {\n                                width: \"120px\",\n                                height: \"120px\",\n                                borderRadius: \"50%\",\n                                objectFit: \"cover\"\n                            }\n                        }, void 0, false, {\n                            fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                            lineNumber: 78,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Divider, {\n                sx: {\n                    my: 4\n                }\n            }, void 0, false, {\n                fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                lineNumber: 89,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                    variant: \"h2\",\n                    children: \"Projects\"\n                }, void 0, false, {\n                    fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                    lineNumber: 91,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                lineNumber: 90,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Divider, {\n                sx: {\n                    my: 4\n                }\n            }, void 0, false, {\n                fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                lineNumber: 110,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Container_Divider_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                    variant: \"h2\",\n                    children: \"Notes\"\n                }, void 0, false, {\n                    fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                    lineNumber: 112,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n                lineNumber: 111,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nwc/git/neilchen.cc/pages/index.tsx\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, this);\n}\nconst getStaticProps = async ()=>{\n    console.log(\"enter static props\");\n    const file = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(_lib_constants__WEBPACK_IMPORTED_MODULE_4__.CONTENT_DIR, _lib_constants__WEBPACK_IMPORTED_MODULE_4__.ABOUT_FILE), \"utf-8\");\n    const { content: markdownContent } = gray_matter__WEBPACK_IMPORTED_MODULE_5___default()(file);\n    const props = {\n        props: {\n            content: markdownContent\n        }\n    };\n    return props;\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL2luZGV4LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDMEI7QUFTSDtBQUNXO0FBQ2Q7QUFDdUM7QUFDMUI7QUFPbEIsU0FBU1csS0FBSyxFQUFFQyxPQUFPLEVBQVc7SUFDL0MscUJBQ0UsOERBQUNWLGtIQUFTQTtRQUFDVyxVQUFTO1FBQUtDLElBQUk7WUFBRUMsSUFBSTtRQUFFOzswQkFDbkMsOERBQUNaLDRHQUFHQTtnQkFDRlcsSUFBSTtvQkFDRkUsU0FBUztvQkFDVEMsZUFBZTt3QkFBRUMsSUFBSTt3QkFBVUMsSUFBSTtvQkFBTTtvQkFDekNDLEtBQUs7b0JBQ0xDLFlBQVk7Z0JBQ2Q7O2tDQUVBLDhEQUFDbEIsNEdBQUdBO3dCQUFDVyxJQUFJOzRCQUFFRSxTQUFTOzRCQUFRQyxlQUFlOzRCQUFVRyxLQUFLO3dCQUFFOzswQ0FDMUQsOERBQUNmLG1IQUFVQTtnQ0FBQ2lCLFNBQVE7Z0NBQUtSLElBQUk7b0NBQUVTLFdBQVc7Z0NBQWE7MENBQUc7Ozs7OzswQ0FHMUQsOERBQUNwQiw0R0FBR0E7O2tEQUNGLDhEQUFDRiwrR0FBTUE7d0NBQUNxQixTQUFRO3dDQUFPRSxPQUFNO2tEQUFVOzs7Ozs7a0RBR3ZDLDhEQUFDdkIsK0dBQU1BO3dDQUFDcUIsU0FBUTt3Q0FBT0UsT0FBTTtrREFBVTs7Ozs7O2tEQUd2Qyw4REFBQ3ZCLCtHQUFNQTt3Q0FBQ3FCLFNBQVE7d0NBQU9FLE9BQU07a0RBQVU7Ozs7OztrREFHdkMsOERBQUN2QiwrR0FBTUE7d0NBQUNxQixTQUFRO3dDQUFPRSxPQUFNO2tEQUFVOzs7Ozs7Ozs7Ozs7MENBSXpDLDhEQUFDckIsNEdBQUdBOzBDQUNGLDRFQUFDRSxtSEFBVUE7b0NBQUNpQixTQUFROzhDQUNqQlY7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQXdCUCw4REFBQ1QsNEdBQUdBO3dCQUFDVyxJQUFJOzRCQUFFVyxPQUFPO2dDQUFFUCxJQUFJLENBQUM7Z0NBQUdDLElBQUk7NEJBQUU7d0JBQUU7a0NBQ2xDLDRFQUFDTzs0QkFDQ0MsS0FBSTs0QkFDSkMsT0FBTztnQ0FDTEMsT0FBTztnQ0FDUEMsUUFBUTtnQ0FDUkMsY0FBYztnQ0FDZEMsV0FBVzs0QkFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBSU4sOERBQUM1QixnSEFBT0E7Z0JBQUNVLElBQUk7b0JBQUVtQixJQUFJO2dCQUFFOzs7Ozs7MEJBQ3JCLDhEQUFDOUIsNEdBQUdBOzBCQUNGLDRFQUFDRSxtSEFBVUE7b0JBQUNpQixTQUFROzhCQUFLOzs7Ozs7Ozs7OzswQkFtQjNCLDhEQUFDbEIsZ0hBQU9BO2dCQUFDVSxJQUFJO29CQUFFbUIsSUFBSTtnQkFBRTs7Ozs7OzBCQUNyQiw4REFBQzlCLDRHQUFHQTswQkFDRiw0RUFBQ0UsbUhBQVVBO29CQUFDaUIsU0FBUTs4QkFBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJakM7QUFFTyxNQUFNWSxpQkFBa0I7SUFDN0JDLFFBQVFDLEdBQUcsQ0FBQztJQUNaLE1BQU1DLE9BQU85QixzREFBZSxDQUFDRCxnREFBUyxDQUFDRSx1REFBV0EsRUFBRUMsc0RBQVVBLEdBQUc7SUFDakUsTUFBTSxFQUFFRyxTQUFTNEIsZUFBZSxFQUFFLEdBQUc5QixrREFBTUEsQ0FBQzJCO0lBQzVDLE1BQU1JLFFBQVE7UUFDWkEsT0FBTztZQUFFN0IsU0FBUzRCO1FBQWdCO0lBQ3BDO0lBQ0EsT0FBT0M7QUFDVCxFQUFxQyIsInNvdXJjZXMiOlsiL1VzZXJzL253Yy9naXQvbmVpbGNoZW4uY2MvcGFnZXMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZDIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBCdXR0b24sXG4gIENvbnRhaW5lcixcbiAgQm94LFxuICBEaXZpZGVyLFxuICBMaXN0LFxuICBMaXN0SXRlbSxcbiAgVHlwb2dyYXBoeSxcbn0gZnJvbSBcIkBtdWkvbWF0ZXJpYWxcIjtcbmltcG9ydCBwYXRoLCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgQ09OVEVOVF9ESVIsIEFCT1VUX0ZJTEUgfSBmcm9tIFwiLi4vbGliL2NvbnN0YW50c1wiO1xuaW1wb3J0IG1hdHRlciBmcm9tIFwiZ3JheS1tYXR0ZXJcIjtcbmltcG9ydCB7IEdldFN0YXRpY1Byb3BzIH0gZnJvbSBcIm5leHQvdHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgQ29udGVudCA9IHtcbiAgY29udGVudDogc3RyaW5nOyBcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSh7IGNvbnRlbnQgfTogQ29udGVudCkge1xuICByZXR1cm4gKFxuICAgIDxDb250YWluZXIgbWF4V2lkdGg9XCJtZFwiIHN4PXt7IG10OiA0IH19PlxuICAgICAgPEJveFxuICAgICAgICBzeD17e1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGZsZXhEaXJlY3Rpb246IHsgeHM6IFwiY29sdW1uXCIsIHNtOiBcInJvd1wiIH0sXG4gICAgICAgICAgZ2FwOiA0LFxuICAgICAgICAgIGFsaWduSXRlbXM6IFwiZmxleC1zdGFydFwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8Qm94IHN4PXt7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLCBnYXA6IDIgfX0+XG4gICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImgxXCIgc3g9e3sgYWxpZ25TZWxmOiBcImZsZXgtc3RhcnRcIiB9fT5cbiAgICAgICAgICAgIE5laWwgQ2hlblxuICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwidGV4dFwiIGNvbG9yPVwicHJpbWFyeVwiPlxuICAgICAgICAgICAgICBCbG9nXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInRleHRcIiBjb2xvcj1cInByaW1hcnlcIj5cbiAgICAgICAgICAgICAgQ29udGFjdFxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJ0ZXh0XCIgY29sb3I9XCJwcmltYXJ5XCI+XG4gICAgICAgICAgICAgIEdpdEh1YlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJ0ZXh0XCIgY29sb3I9XCJwcmltYXJ5XCI+XG4gICAgICAgICAgICAgIExpbmtlZEluXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImJvZHkxXCI+XG4gICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgey8qIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MVwiPlxuICAgICAgICAgICAgICBIZWxsbywgSSdtIE5laWwhIEknbSBjdXJyZW50bHkgYSBzb2Z0d2FyZSBlbmdpbmVlciB3b3JraW5nIG9ue1wiIFwifVxuICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9lYXJ0aC5nb29nbGUuY29tL3dlYi9cIj5FYXJ0aDwvYT4gYW5ke1wiIFwifVxuICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9zdXN0YWluYWJpbGl0eS5nb29nbGUvXCI+XG4gICAgICAgICAgICAgICAgdG9vbHMgZm9yIHN1c3RhaW5hYmlsaXR5XG4gICAgICAgICAgICAgIDwvYT57XCIgXCJ9XG4gICAgICAgICAgICAgIGF0IEdvb2dsZSBpbiBOWUMuXG4gICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiYm9keTFcIiBzeD17eyBtdDogMiB9fT5cbiAgICAgICAgICAgICAgUHJldmlvdXNseSwgSSB3b3JrZWQgaW57XCIgXCJ9XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5nb2xkbWFuc2FjaHMuY29tL3doYXQtd2UtZG8vZmljYy1hbmQtZXF1aXRpZXMvZ3NldC1lcXVpdGllc1wiPlxuICAgICAgICAgICAgICAgIEdvbGRtYW4gU2FjaHMnIEVsZWN0cm9uaWMgVHJhZGluZ1xuICAgICAgICAgICAgICA8L2E+e1wiIFwifVxuICAgICAgICAgICAgICBkaXZpc2lvbiBhbmQgaXRzIFN0cnVjdHVyZWQgUHJvZHVjdHMgc3Bpbm91dHtcIiBcIn1cbiAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LnNpbW9ubWFya2V0cy5jb20vc2ltb24vXCI+U0lNT048L2E+LlxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImJvZHkxXCIgc3g9e3sgbXQ6IDIgfX0+XG4gICAgICAgICAgICAgIEJlZm9yZSB0aGF0LCBJIHN0dWRpZWQgY29tcHV0ZXIgc2NpZW5jZSBhdCBDb2x1bWJpYSBVbml2ZXJzaXR5LFxuICAgICAgICAgICAgICB3aGVyZSBJIGFsc28gYnVpbHQgcm9ib3QgaGFyZHdhcmUgYW5kIHNvZnR3YXJlLlxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PiAqL31cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxCb3ggc3g9e3sgb3JkZXI6IHsgeHM6IC0xLCBzbTogMCB9IH19PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi9wcm9maWxlLnBuZ1wiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICB3aWR0aDogXCIxMjBweFwiLFxuICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTIwcHhcIixcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgICAgICAgICBvYmplY3RGaXQ6IFwiY292ZXJcIixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICAgIDxEaXZpZGVyIHN4PXt7IG15OiA0IH19IC8+XG4gICAgICA8Qm94PlxuICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDJcIj5Qcm9qZWN0czwvVHlwb2dyYXBoeT5cbiAgICAgICAgey8qIDxMaXN0PlxuICAgICAgICAgIDxMaXN0SXRlbT5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MVwiPlxuICAgICAgICAgICAgICBBbmFseXppbmcgMS41IHllYXJzIG9mIGRpYXJ5IGVudHJpZXNcbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICAgIDxMaXN0SXRlbT5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MVwiPlxuICAgICAgICAgICAgICBGaW5kaW5nIHRoZSBicmFjaGlzdG9jaHJvbmUgd2l0aCBKQVhcbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICAgIDxMaXN0SXRlbT5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MVwiPlxuICAgICAgICAgICAgICBCdWlsZGluZyBhIFQtc2hpcnQgc2hvb3Rpbmcgcm9ib3RcbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICA8L0xpc3Q+ICovfVxuICAgICAgPC9Cb3g+XG4gICAgICA8RGl2aWRlciBzeD17eyBteTogNCB9fSAvPlxuICAgICAgPEJveD5cbiAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImgyXCI+Tm90ZXM8L1R5cG9ncmFwaHk+XG4gICAgICA8L0JveD5cbiAgICA8L0NvbnRhaW5lcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQcm9wcyA9IChhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiZW50ZXIgc3RhdGljIHByb3BzXCIpO1xuICBjb25zdCBmaWxlID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihDT05URU5UX0RJUiwgQUJPVVRfRklMRSksIFwidXRmLThcIik7XG4gIGNvbnN0IHsgY29udGVudDogbWFya2Rvd25Db250ZW50IH0gPSBtYXR0ZXIoZmlsZSk7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIHByb3BzOiB7IGNvbnRlbnQ6IG1hcmtkb3duQ29udGVudCB9XG4gIH07XG4gIHJldHVybiBwcm9wcztcbn0pIHNhdGlzZmllcyBHZXRTdGF0aWNQcm9wczxDb250ZW50PjtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkJ1dHRvbiIsIkNvbnRhaW5lciIsIkJveCIsIkRpdmlkZXIiLCJUeXBvZ3JhcGh5IiwicGF0aCIsImZzIiwiQ09OVEVOVF9ESVIiLCJBQk9VVF9GSUxFIiwibWF0dGVyIiwiSG9tZSIsImNvbnRlbnQiLCJtYXhXaWR0aCIsInN4IiwibXQiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsInhzIiwic20iLCJnYXAiLCJhbGlnbkl0ZW1zIiwidmFyaWFudCIsImFsaWduU2VsZiIsImNvbG9yIiwib3JkZXIiLCJpbWciLCJzcmMiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiYm9yZGVyUmFkaXVzIiwib2JqZWN0Rml0IiwibXkiLCJnZXRTdGF0aWNQcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJmaWxlIiwicmVhZEZpbGVTeW5jIiwiam9pbiIsIm1hcmtkb3duQ29udGVudCIsInByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/index.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/styles.css":
/*!**************************!*\
  !*** ./pages/styles.css ***!
  \**************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=Box,Button,Container,Divider,Typography!=!./node_modules/@mui/material/esm/index.js":
/*!*********************************************************************************************************************!*\
  !*** __barrel_optimize__?names=Box,Button,Container,Divider,Typography!=!./node_modules/@mui/material/esm/index.js ***!
  \*********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Box: () => (/* reexport safe */ _Box_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   Button: () => (/* reexport safe */ _Button_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   Container: () => (/* reexport safe */ _Container_index_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   Divider: () => (/* reexport safe */ _Divider_index_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   Typography: () => (/* reexport safe */ _Typography_index_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _Box_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Box/index.js\");\n/* harmony import */ var _Button_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Button/index.js\");\n/* harmony import */ var _Container_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Container/index.js\");\n/* harmony import */ var _Divider_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Divider/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Divider/index.js\");\n/* harmony import */ var _Typography_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Typography/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Typography/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Box_index_js__WEBPACK_IMPORTED_MODULE_0__, _Button_index_js__WEBPACK_IMPORTED_MODULE_1__, _Container_index_js__WEBPACK_IMPORTED_MODULE_2__, _Divider_index_js__WEBPACK_IMPORTED_MODULE_3__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_4__]);\n([_Box_index_js__WEBPACK_IMPORTED_MODULE_0__, _Button_index_js__WEBPACK_IMPORTED_MODULE_1__, _Container_index_js__WEBPACK_IMPORTED_MODULE_2__, _Divider_index_js__WEBPACK_IMPORTED_MODULE_3__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUJveCxCdXR0b24sQ29udGFpbmVyLERpdmlkZXIsVHlwb2dyYXBoeSE9IS4vbm9kZV9tb2R1bGVzL0BtdWkvbWF0ZXJpYWwvZXNtL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQytDO0FBQ007QUFDTTtBQUNKIiwic291cmNlcyI6WyIvVXNlcnMvbndjL2dpdC9uZWlsY2hlbi5jYy9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJveCB9IGZyb20gXCIuL0JveC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJ1dHRvbiB9IGZyb20gXCIuL0J1dHRvbi9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lci9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIERpdmlkZXIgfSBmcm9tIFwiLi9EaXZpZGVyL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHlwb2dyYXBoeSB9IGZyb20gXCIuL1R5cG9ncmFwaHkvaW5kZXguanNcIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=Box,Button,Container,Divider,Typography!=!./node_modules/@mui/material/esm/index.js\n");

/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system");;

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/DefaultPropsProvider");;

/***/ }),

/***/ "@mui/system/InitColorSchemeScript":
/*!****************************************************!*\
  !*** external "@mui/system/InitColorSchemeScript" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/InitColorSchemeScript");;

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/colorManipulator");;

/***/ }),

/***/ "@mui/system/createBreakpoints":
/*!************************************************!*\
  !*** external "@mui/system/createBreakpoints" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/createBreakpoints");;

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/createStyled");;

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/createTheme");;

/***/ }),

/***/ "@mui/system/cssVars":
/*!**************************************!*\
  !*** external "@mui/system/cssVars" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/cssVars");;

/***/ }),

/***/ "@mui/system/spacing":
/*!**************************************!*\
  !*** external "@mui/system/spacing" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/spacing");;

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/styleFunctionSx");;

/***/ }),

/***/ "@mui/system/useThemeProps":
/*!********************************************!*\
  !*** external "@mui/system/useThemeProps" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/useThemeProps");;

/***/ }),

/***/ "@mui/utils":
/*!*****************************!*\
  !*** external "@mui/utils" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils");;

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/capitalize");;

/***/ }),

/***/ "@mui/utils/chainPropTypes":
/*!********************************************!*\
  !*** external "@mui/utils/chainPropTypes" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/chainPropTypes");;

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/composeClasses");;

/***/ }),

/***/ "@mui/utils/createChainedFunction":
/*!***************************************************!*\
  !*** external "@mui/utils/createChainedFunction" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/createChainedFunction");;

/***/ }),

/***/ "@mui/utils/debounce":
/*!**************************************!*\
  !*** external "@mui/utils/debounce" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/debounce");;

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/deepmerge");;

/***/ }),

/***/ "@mui/utils/deprecatedPropType":
/*!************************************************!*\
  !*** external "@mui/utils/deprecatedPropType" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/deprecatedPropType");;

/***/ }),

/***/ "@mui/utils/elementTypeAcceptingRef":
/*!*****************************************************!*\
  !*** external "@mui/utils/elementTypeAcceptingRef" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/elementTypeAcceptingRef");;

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/formatMuiErrorMessage");;

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/generateUtilityClass");;

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/generateUtilityClasses");;

/***/ }),

/***/ "@mui/utils/isFocusVisible":
/*!********************************************!*\
  !*** external "@mui/utils/isFocusVisible" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/isFocusVisible");;

/***/ }),

/***/ "@mui/utils/isMuiElement":
/*!******************************************!*\
  !*** external "@mui/utils/isMuiElement" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/isMuiElement");;

/***/ }),

/***/ "@mui/utils/ownerDocument":
/*!*******************************************!*\
  !*** external "@mui/utils/ownerDocument" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/ownerDocument");;

/***/ }),

/***/ "@mui/utils/ownerWindow":
/*!*****************************************!*\
  !*** external "@mui/utils/ownerWindow" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/ownerWindow");;

/***/ }),

/***/ "@mui/utils/refType":
/*!*************************************!*\
  !*** external "@mui/utils/refType" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/refType");;

/***/ }),

/***/ "@mui/utils/requirePropFactory":
/*!************************************************!*\
  !*** external "@mui/utils/requirePropFactory" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/requirePropFactory");;

/***/ }),

/***/ "@mui/utils/resolveProps":
/*!******************************************!*\
  !*** external "@mui/utils/resolveProps" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/resolveProps");;

/***/ }),

/***/ "@mui/utils/setRef":
/*!************************************!*\
  !*** external "@mui/utils/setRef" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/setRef");;

/***/ }),

/***/ "@mui/utils/unsupportedProp":
/*!*********************************************!*\
  !*** external "@mui/utils/unsupportedProp" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/unsupportedProp");;

/***/ }),

/***/ "@mui/utils/useControlled":
/*!*******************************************!*\
  !*** external "@mui/utils/useControlled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useControlled");;

/***/ }),

/***/ "@mui/utils/useEnhancedEffect":
/*!***********************************************!*\
  !*** external "@mui/utils/useEnhancedEffect" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useEnhancedEffect");;

/***/ }),

/***/ "@mui/utils/useEventCallback":
/*!**********************************************!*\
  !*** external "@mui/utils/useEventCallback" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useEventCallback");;

/***/ }),

/***/ "@mui/utils/useForkRef":
/*!****************************************!*\
  !*** external "@mui/utils/useForkRef" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useForkRef");;

/***/ }),

/***/ "@mui/utils/useId":
/*!***********************************!*\
  !*** external "@mui/utils/useId" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useId");;

/***/ }),

/***/ "@mui/utils/useLazyRef":
/*!****************************************!*\
  !*** external "@mui/utils/useLazyRef" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useLazyRef");;

/***/ }),

/***/ "@mui/utils/useTimeout":
/*!****************************************!*\
  !*** external "@mui/utils/useTimeout" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useTimeout");;

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = import("clsx");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "gray-matter":
/*!******************************!*\
  !*** external "gray-matter" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("gray-matter");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-transition-group");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@mui"], () => (__webpack_exec__("(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%2Findex.tsx&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();