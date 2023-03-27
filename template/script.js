$("#openSidebarBtn").on("click", () => $("body").addClass("sidebar-open"));
$("#closeSidebarBtn").on("click", () => $("body").removeClass("sidebar-open"));

// Open / Closes dropdowns, also closes the sidebar eventually 
$("html").on("click", (e) => {
  // Find from the clicked element the closest dropdown menu, and if so, break from the function
  const navDropdownMenus = $(".nav__dropdown-menu");
  if ($(e.target).closest(navDropdownMenus).length) {
    return;
  }
  // Find from the clicked element the closest nav-link
  const currentNavLink = $(e.target).closest($(".nav__link"));
  if (currentNavLink.length) {
    // Close all other dropdowns, and open it's dropdown
    navDropdownMenus.each((index, el) => {
      el !== currentNavLink.next().get(0) &&
        $(el).removeClass("nav__dropdown-menu--open");
    });
    currentNavLink.next().toggleClass("nav__dropdown-menu--open");
  } else if (
    // If closest is navMenu or openSidebarBtn
    $(e.target).closest("#navMenu").length ||
    $(e.target).closest("#openSidebarBtn").length
  ) {
    // Break from the function
    return;
  } else {
    // Close all dropdowns and the sidebar if the user clicked somewhere else
    navDropdownMenus.each((index, el) =>
      $(el).removeClass("nav__dropdown-menu--open")
    );
    $("body").removeClass("sidebar-open");
  }
});
