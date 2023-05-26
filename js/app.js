const menu = document.querySelector(".menu__hamburguer");
const list = document.querySelector(".menu__links");

    menu.addEventListener("click", () => {
        list.classList.toggle("menu__links--show");

        if (list.classList.contains("menu__links--show")) {
            menu.setAttribute("aria-label", "Cerrar menú");
        } else {
            menu.setAttribute("aria-label", "Abrir menú");
        }
});






