$("#openSidebarBtn").on("click", () => $("body").addClass("sidebar-open"));
$("#closeSidebarBtn").on("click", () => $("body").removeClass("sidebar-open"));
console.log("da")
// Open / Closes dropdowns, also closes the sidebar eventually 
$("html").on("click", (e) => {
  // Find from the clicked element the closest dropdown menu, and if so, break from the function
  const headerDropdownMenus = $(".header__dropdown-menu");
  if ($(e.target).closest(headerDropdownMenus).length) {
    return;
  }
  // Find from the clicked element the closest header-link
  const currentheaderLink = $(e.target).closest($(".header__link"));
  if (currentheaderLink.length) {
    // Close all other dropdowns, and open it's dropdown
    headerDropdownMenus.each((index, el) => {
      el !== currentheaderLink.next().get(0) &&
        $(el).removeClass("header__dropdown-menu--open");
    });
    currentheaderLink.next().toggleClass("header__dropdown-menu--open");
  } else if (
    // If closest is headerMenu or openSidebarBtn
    $(e.target).closest("#headerMenu").length ||
    $(e.target).closest("#openSidebarBtn").length
  ) {
    // Break from the function
    return;
  } else {
    // Close all dropdowns and the sidebar if the user clicked somewhere else
    headerDropdownMenus.each((index, el) =>
      $(el).removeClass("header__dropdown-menu--open")
    );
    $("body").removeClass("sidebar-open");
  }
});
