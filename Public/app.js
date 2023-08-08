routemamba.registerMetaUrl("/Shared/meta");
routemamba.registerServerHost("http://localhost:8888/");
/* 
Bugs:
1.  HTTP URLS ARE CASE SENSETIVE - IT SHOULD WORK ON ABC.COM/HOME AS WELL AS ABC.COM/HOME - CONFIRM
2.  FOR SOME REASON CONTENT URL IS LOADING FROM SERVER BUT NOT RENDERING IN CLIENT - CONFIRM
3.  HEADERS URL PATH CHANGING - PENDING
4.  Unexpected files are loading in the component Home.js. It seems that there is an issue with either the rendering or the loading of scripts in the Home component. Additionally, the components/Home.js file is also loading when navigating from the Home route to the /news:ant route.
*/
const preloader = `
<div role="status" class="space-y-2.5 animate-pulse max-w-lg py-10">
    <div class="flex items-center w-full space-x-2">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div class="flex items-center w-full space-x-2 max-w-[480px]">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div class="flex items-center w-full space-x-2 max-w-[400px]">
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div class="flex items-center w-full space-x-2 max-w-[480px]">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div class="flex items-center w-full space-x-2 max-w-[440px]">
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
    <div class="flex items-center w-full space-x-2 max-w-[360px]">
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <span class="sr-only">Loading...</span>
</div>
`;
const error_content = `<div role="alert">
<div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
  Danger
</div>
<div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
  <p>Something not ideal might be happening.</p>
</div>
</div>`;
routemamba.register_http_routes([
  {
    method: "GET",
    meta_loader: true,
    content_url: "/Pages/home",
    preloader,
    data: {},
    error_content,
    http_url_change: false,
    http_url: "/",
  },
  {
    method: "GET",
    meta_loader: true,
    content_url: "/Pages/about",
    preloader,
    data: {},
    error_content,
    http_url_change: false,
    http_url: "/about",
  },
  {
    method: "GET",
    meta_loader: true,
    content_url: "/Pages/blogs",
    preloader,
    data: {},
    error_content,
    http_url_change: false,
    http_url: "/blogs",
  },
  {
    method: "GET",
    meta_loader: true,
    content_url: "/Pages/blog",
    preloader,
    data: {},
    error_content,
    http_url_change: false,
    http_url: "/blogs/:slug",
  },
]);

routemamba.register_routes_headers([
  {
    content_url: "/Shared/header",
    preloader,
    error_content,
    http_url: ["/", "/about", "/blogs", "/blogs/:slug"],
  },
]);

routemamba.register_routes_footers([
  {
    content_url: "/Shared/footer",
    preloader,
    error_content,
    http_url: ["/", "/about", "/blogs", "/blogs/:slug"],
  },
]);

routemamba.render();
