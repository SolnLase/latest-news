// Open the sidebar when the open sidebar button is clicked
$("#openSidebarBtn").on("click", () => {
  $("body").addClass("sidebar-open");
});

// Close the sidebar when the close sidebar button is clicked
$("#closeSidebarBtn").on("click", () => {
  $("body").removeClass("sidebar-open");
});

// Handle dropdown menus based on which element was clicked
$("html").on("click", (e) => {
  const headerDropdownMenus = $(".header__dropdown-menu");

  // If the user clicked inside a dropdown menu, do nothing
  if ($(e.target).closest(headerDropdownMenus).length) {
    return;
  }

  const currentHeaderLink = $(e.target).closest($(".header__link"));

  // If the user clicked a dropdown link, open the related dropdown,
  // close all the other dropdowns, and dispatch a custom event
  if (currentHeaderLink.length) {
    headerDropdownMenus.each((index, el) => {
      if (el !== currentHeaderLink.next().get(0)) {
        $(el).removeClass("header__dropdown-menu--open");
      }
    });

    const result = currentHeaderLink.next().toggleClass("header__dropdown-menu--open");

    if (!result.hasClass("header__dropdown-menu--open")) {
      // Dispatch a custom event when a dropdown is closed
      const dropdownClosedEvent = new Event("dropdownClosed");
      document.dispatchEvent(dropdownClosedEvent);
    }
  } else if (
    $(e.target).closest("#headerMenu").length ||
    $(e.target).closest("#openSidebarBtn").length
  ) {
    // If the user clicked inside the sidebar, do nothing
    return;
  } else {
    // Close all the dropdowns and the sidebar if the user clicked somewhere else,
    // and dispatch custom events
    headerDropdownMenus.each((index, el) => {
      if ($(el).hasClass("header__dropdown-menu--open")) {
        $(el).removeClass("header__dropdown-menu--open");

        // Dispatch custom events when a sidebar or dropdown is closed
        const sidebarClosedEvent = new Event("sidebarClosed");
        const dropdownClosedEvent = new Event("dropdownClosed");
        document.dispatchEvent(sidebarClosedEvent);
        document.dispatchEvent(dropdownClosedEvent);
      }
    });

    $("body").removeClass("sidebar-open");
  }
});
