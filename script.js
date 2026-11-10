const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const projectList = document.getElementById("project-list");
const projects = Array.from(document.querySelectorAll(".project-row"));
const filterStatus = document.getElementById("filter-status");

function selectProjectTab(selectedTab, moveFocus = false) {
  const filter = selectedTab.dataset.filter;
  let visibleCount = 0;

  tabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  projects.forEach((project) => {
    const isVisible = filter === "all" || project.dataset.category === filter;
    project.classList.toggle("is-hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  projectList.setAttribute("aria-labelledby", selectedTab.id);
  filterStatus.textContent = `Showing ${visibleCount} of ${projects.length} projects`;

  if (moveFocus) selectedTab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectProjectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      selectProjectTab(tabs[nextIndex], true);
    }
  });
});

document
  .getElementById("cv-button")
  ?.addEventListener("click", () => window.print());

selectProjectTab(tabs[0]);
