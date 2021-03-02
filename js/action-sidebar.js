const userStatics = [
    {text: "Ages", icon: "pie_chart", url: "https://datastudio.google.com/reporting/2a009964-b747-4f31-a8fb-c3ffcff88932/page/TUh3B"},
    {text: "Gender", icon: "bar_chart", url: "https://datastudio.google.com/embed/reporting/335f010e-5666-4b06-a07b-99b2bf23ad2b/page/TUh3B"},
    {text: "Search Types", icon: "bar_chart", url: "https://datastudio.google.com/embed/reporting/bd0e80b6-2387-4262-a3c0-f386879cb9a3/page/TUh3B"},
    {text: "Search Frequency", icon: "line_chart"},
    {text: "Destination search in map", icon: "pie_chart"},
    {text: "Location Search", icon: "bar_chart"},
    {text: "User activity", icon: "line_chart"},
    {text: "Audience", icon: "pie_chart"},
    {text: "Waiting Time", icon: "bar_chart"},
];

const vehicle = [
    {text: "Brand and model", icon: "bar_chart"},
    {text: "Vehicle’s mileage", icon: "pie_chart"},
    {text: "Visited location frequency", icon: "bar_chart"},
    {text: "Speed by road type", icon: "line_chart"},
    {text: "Fuel consumption", icon: "pie_chart"},
    {text: "Engine hours", icon: "bar_chart"},
    {text: "Diagnostics", icon: "line_chart"},
    {text: "Vehicles by region", icon: "pie_chart"},
    {text: "Violations", icon: "bar_chart"},
];
const trips = [{text: "Trips", icon: "bar_chart"}];

const sidebarElement = [
    {
        key: "collapseStatics",
        text: "User Statistics",
        icon: "User",
        link: "#",
        children: userStatics,
    },
    {
        key: "collapseVehicle",
        text: "Vehicle Statistics",
        icon: "Vehicles",
        link: "#",
        children: vehicle,
    },
    {
        key: "collapseTrip",
        text: "Trip Statistics",
        icon: "Trips",
        link: "#",
        children: trips,
    },
];

const buildMenusCollapse = (elements) =>
    elements
        .map(
            (item) => `<a data-url="${item.url}" class="collapse-item d-flex align-items-center" >
<img class="customer-icon" src="img/${item.icon}.svg" />
<span>${item.text}</span>
</a>`
        )
        .join("");

const buildMenus = (listItems) =>
    listItems.map((item) =>
        $("ul#accordionSidebar").append(`<li class="nav-item">
      <a
          class="nav-link collapsed"
          href="${item.link}"
          data-toggle="collapse"
          data-target="#${item.key}"
          aria-controls="${item.key}"
      >
        <div class="d-inline-flex align-items-center align-middle">
          <img class="customer-icon" src="img/${item.icon}.svg" />
          <span>${item.text}</span>
        </div>
      </a>
      <div
          id="${item.key}"
          class="collapse navbar-toggle"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
      >
        <div class="collapse-inner">${buildMenusCollapse(item.children)}</div>
      </div>
    </li>`)
    );

const openCloseSidebar = (collapse) => () => {
    const active = $("#sidebar").hasClass("active");
    $("#sidebar").toggleClass("active", collapse ? false : undefined);
    !active &&
    !collapse &&
    $("li.nav-item").children("div.collapse").toggleClass("show", false);
};

$(document).ready(function () {
    buildMenus(sidebarElement);
    $(".action-sidebar-Collapse-nav").on("click", openCloseSidebar());
    $("a.collapsed").off("click").on("click", openCloseSidebar(true));
    $("a.collapse-item").click(
      function () {
        $("a").removeClass("active");
        $(this).addClass("active");
        event.preventDefault();
        $('#report_frame').attr("src" , $(this).attr("data-url"));
        $('#report_name').text($(this).text()+" report.");

      }
    );
});
