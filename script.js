/* =========================
   BOTÓN EXPLORAR
========================= */

const botonExplorar = document.getElementById("explorar");
const portal = document.getElementById("portal");

if (botonExplorar && portal) {

    botonExplorar.addEventListener("click", () => {

        portal.scrollIntoView({
            behavior: "smooth"
        });

    });

}



/* =========================
   MOVIMIENTO SUAVE DE LAS NUBES
========================= */

const nubes = document.querySelectorAll(".nube");

document.addEventListener("mousemove", (e) => {

    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;


    nubes.forEach((nube, index) => {

        const movimiento = (index + 1) * 5;

        nube.style.marginLeft =
            `${x * movimiento}px`;

        nube.style.marginTop =
            `${y * movimiento}px`;

    });

});



/* =========================
   APARICIÓN DE LAS TARJETAS
========================= */

const territorios =
    document.querySelectorAll(".territorio");


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );



territorios.forEach((territorio) => {

    observer.observe(territorio);

});