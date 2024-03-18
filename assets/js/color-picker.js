/**
 * color theme settings
 */

const colorSchemeInput = document.getElementById("colorscheme")
const colorSchemeLabel = document.querySelector("label[for=colorscheme]")

function storeTheme(theme) {
  localStorage.setItem("theme", theme)
}

function retrieveTheme() {
  const activeTheme = localStorage.getItem("theme")
  if (activeTheme === null) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      colorSchemeInput.checked = true
    } else {
      colorSchemeInput.checked = false
    }
    return
  }

  colorSchemeInput.checked = activeTheme === "dark"
}

colorSchemeInput.addEventListener("change", () => {
  storeTheme(colorSchemeInput.checked ? "dark" : "light")
})

colorSchemeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    colorSchemeInput.checked = !colorSchemeInput.checked
    storeTheme(colorSchemeInput.checked ? "dark" : "light")
  }
})

retrieveTheme()
