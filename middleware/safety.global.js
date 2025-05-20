export default defineNuxtRouteMiddleware((to, from) => {
  const studentAllowedPages = [
    "/about",
    "/feedback",
    "/personality",
    "/logout",
  ];
  const adminAllowedPages = [
    "/dashboard",
    "/departmentdetails",
    "/logout",
    /^\/facultydetails\/.*$/,
  ];
  const common = ["/", "/login", "/adminh", "adminl"];

  const role = localStorage.getItem("role");

  if (role === "student") {
    if (
      adminAllowedPages.some((page) =>
        typeof page === "string" ? page === to.path : page.test(to.path)
      )
    ) {
      return navigateTo("/");
    }
  } else if (role === "admin") {
    if (studentAllowedPages.includes(to.path)) {
      return navigateTo("/adminh");
    }
  }

  if (common.includes(to.path)) {
    localStorage.clear();
    sessionStorage.clear();
  }
});
