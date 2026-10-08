
/* =========================================================
   NIMBLOOM · RESPIRAR UNA NUBE
   MEDITACIÓN DE 2:12
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const introScreen = document.getElementById("introScreen");
const breathingExperience = document.getElementById("breathingExperience");
const finalScreen = document.getElementById("finalScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const meditationAudio = document.getElementById("meditationAudio");

const breathingCloud = document.getElementById("breathingCloud");
const cloudContainer = document.getElementById("cloudContainer");

const breathingText = document.getElementById("breathingText");
const breathingSubtext = document.getElementById("breathingSubtext");

const counter = document.getElementById("counter");

const progressFill = document.getElementById("progressFill");
const progressNumber = document.getElementById("progressNumber");

const smallMessage = document.getElementById("smallMessage");

const cloudParticles = document.getElementById("cloudParticles");


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const TOTAL_SECONDS = 60; // 1minuto

/*
   Cada ciclo:
   4 segundos inhalando
   4 segundos exhalando

   8 segundos en total.
*/

const BREATH_PHASE = 4;


/* =========================================================
   VARIABLES
   ========================================================= */

let breathingInterval = null;
let progressInterval = null;

let currentPhase = "idle";
let elapsedSeconds = 0;

let audioFinished = false;


/* =========================================================
   BOTÓN COMENZAR
   ========================================================= */

startButton.addEventListener("click", startExperience);


/* =========================================================
   COMENZAR EXPERIENCIA
   ========================================================= */

function startExperience() {

    /*
       Ocultamos intro
       y mostramos respiración.
    */

    introScreen.classList.remove("active");

    breathingExperience.classList.add("active");

    finalScreen.classList.remove("active");


    /*
       Reiniciamos todo.
    */

    resetExperience();


    /*
       Creamos las partículas.
    */

    createParticles();


    /*
       Mensaje inicial.
    */

    counter.textContent = "PREPARATE";

    breathingText.textContent = "Prepará tu respiración...";

    breathingSubtext.textContent =
        "Escuchá la voz y encontrá tu ritmo.";

    smallMessage.textContent =
        "La meditación está por comenzar.";


    /*
       Comenzamos el audio.

       Como esto sucede después del click del usuario,
       el navegador debería permitir la reproducción.
    */

    meditationAudio.currentTime = 0;

    const playPromise = meditationAudio.play();

    if (playPromise !== undefined) {

        playPromise.catch((error) => {

            console.log(
                "El navegador bloqueó el audio:",
                error
            );

            smallMessage.textContent =
                "Tocá la pantalla para activar el audio.";

        });

    }


    /*
       Esperamos un poquito antes de comenzar
       el movimiento de la nube.
    */

    setTimeout(() => {

        beginBreathing();

    }, 1800);

}


/* =========================================================
   COMENZAR RESPIRACIÓN
   ========================================================= */

function beginBreathing() {

    /*
       Limpiamos cualquier intervalo anterior.
    */

    clearInterval(breathingInterval);
    clearInterval(progressInterval);


    elapsedSeconds = 0;

    audioFinished = false;


    /*
       Primer estado:
       INHALAR
    */

    setBreathingPhase("inhale");


    /*
       Cada 4 segundos cambiamos
       entre inhalación y exhalación.
    */

    breathingInterval = setInterval(() => {

        /*
           Si el audio ya terminó,
           no seguimos animando.
        */

        if (
            meditationAudio.ended ||
            meditationAudio.currentTime >= TOTAL_SECONDS
        ) {

            finishExperience();

            return;

        }


        if (currentPhase === "inhale") {

            setBreathingPhase("exhale");

        } else {

            setBreathingPhase("inhale");

        }

    }, BREATH_PHASE * 1000);


    /*
       Progreso de la meditación.
    */

    progressInterval = setInterval(() => {

        updateProgress();

    }, 250);


    updateProgress();

}


/* =========================================================
   CAMBIAR FASE DE RESPIRACIÓN
   ========================================================= */

function setBreathingPhase(phase) {

    currentPhase = phase;


    breathingCloud.classList.remove(
        "inhale",
        "exhale"
    );

    cloudContainer.classList.remove(
        "inhaling",
        "exhaling"
    );


    if (phase === "inhale") {

        breathingCloud.classList.add("inhale");

        cloudContainer.classList.add("inhaling");


        breathingText.textContent =
            "Inhalá lentamente...";

        breathingSubtext.textContent =
            "Dejá que la nube crezca con vos.";

        smallMessage.textContent =
            "Tomá aire suavemente.";


    } else if (phase === "exhale") {

        breathingCloud.classList.add("exhale");

        cloudContainer.classList.add("exhaling");


        breathingText.textContent =
            "Exhalá lentamente...";

        breathingSubtext.textContent =
            "Soltá el aire y dejá ir.";

        smallMessage.textContent =
            "Dejá que el cuerpo se afloje.";

    }

}


/* =========================================================
   ACTUALIZAR PROGRESO
   ========================================================= */

function updateProgress() {

    if (!meditationAudio) return;


    let currentTime = meditationAudio.currentTime;


    /*
       Limitamos el tiempo máximo a 132 segundos.
    */

    if (currentTime > TOTAL_SECONDS) {
        currentTime = TOTAL_SECONDS;
    }


    const percentage =
        (currentTime / TOTAL_SECONDS) * 100;


    progressFill.style.width =
        `${percentage}%`;


    progressNumber.textContent =
        `${Math.round(percentage)}%`;


    /*
       Contador superior.

       Calculamos aproximadamente
       en qué parte de la meditación estamos.
    */

    const currentMinute =
        Math.floor(currentTime / 60);

    const currentSecond =
        Math.floor(currentTime % 60);


    counter.textContent =
        `${String(currentMinute).padStart(2, "0")}:${String(currentSecond).padStart(2, "0")}`;

}


/* =========================================================
   CUANDO TERMINA EL AUDIO
   ========================================================= */

meditationAudio.addEventListener(
    "ended",
    () => {

        audioFinished = true;

        finishExperience();

    }
);


/* =========================================================
   FINALIZAR EXPERIENCIA
   ========================================================= */

function finishExperience() {

    /*
       Evitamos que se ejecute varias veces.
    */

    if (
        finalScreen.classList.contains("active")
    ) {
        return;
    }


    clearInterval(breathingInterval);
    clearInterval(progressInterval);


    breathingCloud.classList.remove(
        "inhale",
        "exhale"
    );

    cloudContainer.classList.remove(
        "inhaling",
        "exhaling"
    );


    progressFill.style.width = "100%";

    progressNumber.textContent = "100%";


    /*
       Dejamos que la transición
       termine suavemente.
    */

    setTimeout(() => {

        breathingExperience.classList.remove(
            "active"
        );

        finalScreen.classList.add(
            "active"
        );

    }, 700);

}


/* =========================================================
   REINICIAR
   ========================================================= */

restartButton.addEventListener(
    "click",
    restartExperience
);


function restartExperience() {

    /*
       Detenemos el audio.
    */

    meditationAudio.pause();

    meditationAudio.currentTime = 0;


    /*
       Limpiamos intervalos.
    */

    clearInterval(breathingInterval);
    clearInterval(progressInterval);


    /*
       Ocultamos final.
    */

    finalScreen.classList.remove("active");


    /*
       Reiniciamos.
    */

    resetExperience();


    /*
       Volvemos al inicio.
    */

    setTimeout(() => {

        introScreen.classList.add("active");

    }, 500);

}


/* =========================================================
   RESETEAR EXPERIENCIA
   ========================================================= */

function resetExperience() {

    clearInterval(breathingInterval);
    clearInterval(progressInterval);


    elapsedSeconds = 0;

    currentPhase = "idle";

    audioFinished = false;


    breathingCloud.classList.remove(
        "inhale",
        "exhale"
    );

    cloudContainer.classList.remove(
        "inhaling",
        "exhaling"
    );


    progressFill.style.width = "0%";

    progressNumber.textContent = "0%";


    counter.textContent = "PREPARATE";


    breathingText.textContent =
        "Prepará tu respiración...";


    breathingSubtext.textContent =
        "Escuchá la voz y encontrá tu ritmo.";


    smallMessage.textContent =
        "La meditación está por comenzar.";

}


/* =========================================================
   CREAR PARTÍCULAS DE LA NUBE
   ========================================================= */

function createParticles() {

    /*
       Evitamos crear partículas infinitamente
       cada vez que se reinicia.
    */

    cloudParticles.innerHTML = "";


    for (let i = 0; i < 4; i++) {

        const particle =
            document.createElement("span");

        cloudParticles.appendChild(particle);

    }

}
