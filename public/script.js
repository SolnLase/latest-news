$("#openSidebarBtn").on("click", () => {
  $("body").addClass("sidebar-open");
});
$("#closeSidebarBtn").on("click", () => $("body").removeClass("sidebar-open"));

// Determines which html element was clicked, and based on that toggles dropdown menus
$("html").on("click", (e) => {
  const headerDropdownMenus = $(".header__dropdown-menu");
  if ($(e.target).closest(headerDropdownMenus).length) {
    // If the user clicked inside a dropdown menu, don't do anything
    return;
  }
  const currentheaderLink = $(e.target).closest($(".header__link"));
  if (currentheaderLink.length) {
    // If the user clicked a dropdown link, open the related dropdown,
    // close all the other dropdowns, and make and dispatch custom event to fetch data
    headerDropdownMenus.each((index, el) => {
      el !== currentheaderLink.next().get(0) &&
        $(el).removeClass("header__dropdown-menu--open");
    });
    const result = currentheaderLink
      .next()
      .toggleClass("header__dropdown-menu--open");
    if (!result.hasClass("header__dropdown-menu--open")) {
      const dropdawnClosedEvent = new Event("fetchData");
      document.dispatchEvent(dropdawnClosedEvent);
    }
  } else if (
    $(e.target).closest("#headerMenu").length ||
    $(e.target).closest("#openSidebarBtn").length
  ) {
    // If the user clicked inside the sidebar, don't do anything
    return;
  } else {
    // Close all the dropdowns and the sidebar if the user clicked somewhere else,
    // and make and dispatch custom event to fetch data
    headerDropdownMenus.each((index, el) => {
      if ($(el).hasClass("header__dropdown-menu--open")) {
        $(el).removeClass("header__dropdown-menu--open");
        const dropdawnClosedEvent = new Event("fetchData");
        document.dispatchEvent(dropdawnClosedEvent);
      }
    });
    $("body").removeClass("sidebar-open");
  }
});
