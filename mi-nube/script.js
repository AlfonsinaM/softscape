/* =========================================================
   DATOS DE LA NUBE
========================================================= */

const cloudData = {

  shape: "soft",

  color: "lavender",

  emotion: "Tranquilidad",

  scent: "lavender",

  detail: "bright"

};


/* =========================================================
   ELEMENTOS
========================================================= */

const home =
  document.getElementById("home");

const experience =
  document.getElementById("experience");

const previewCloud =
  document.getElementById("previewCloud");

const colorCloud =
  document.getElementById("colorCloud");

const scentCloud =
  document.getElementById("scentCloud");

const detailCloud =
  document.getElementById("detailCloud");

const finishedCloud =
  document.getElementById("finishedCloud");

const emotionName =
  document.getElementById("emotionName");

const scentName =
  document.getElementById("scentName");

const scentParticles =
  document.getElementById("scentParticles");

const detailParticles =
  document.getElementById("detailParticles");

const finishedParticles =
  document.getElementById("finishedParticles");

const flyingCloud =
  document.getElementById("flyingCloud");

const flyingParticles =
  document.getElementById("flyingParticles");

const nubeImagen =
  document.getElementById("nubeImagen");

const releaseScreen =
  document.getElementById("releaseScreen");

const hands =
  document.getElementById("hands");

const hugMessage =
  document.getElementById("hugMessage");

const releaseMessage =
  document.getElementById("releaseMessage");

const finalMessage =
  document.getElementById("finalMessage");


/* =========================================================
   COMENZAR
========================================================= */

function startExperience() {

  home.classList.remove("active");

  setTimeout(() => {

    document
      .getElementById("step-form")
      .classList.add("active");

  }, 500);

}


/* =========================================================
   CAMBIAR DE PASO
========================================================= */

function nextStep(step) {

  document
    .querySelectorAll(".step")
    .forEach(section => {

      section.classList.remove("active");

    });


  let nextSection;


  if (step === 2) {

    nextSection =
      document.getElementById("step-color");

    syncCloud();

  }


  if (step === 3) {

    nextSection =
      document.getElementById("step-scent");

    syncCloud();

  }


  if (step === 4) {

    nextSection =
      document.getElementById("step-detail");

    syncCloud();

  }


  setTimeout(() => {

    nextSection.classList.add("active");

  }, 300);

}


/* =========================================================
   SELECCIONAR FORMA
========================================================= */

document
  .querySelectorAll(".option")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".option")
        .forEach(btn =>
          btn.classList.remove("selected")
        );


      button.classList.add("selected");


      cloudData.shape =
        button.dataset.shape;


      previewCloud.className =
        "preview-cloud shape-" +
        cloudData.shape;

    });

  });


/* =========================================================
   SELECCIONAR COLOR
========================================================= */

document
  .querySelectorAll(".emotion")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".emotion")
        .forEach(btn =>
          btn.classList.remove("selected")
        );


      button.classList.add("selected");


      cloudData.color =
        button.dataset.color;


      cloudData.emotion =
        button.dataset.name;


      colorCloud.className =
        "preview-cloud " +
        cloudData.color;


      emotionName.textContent =
        cloudData.emotion;

    });

  });


/* =========================================================
   SELECCIONAR AROMA
========================================================= */

document
  .querySelectorAll(".scent")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".scent")
        .forEach(btn =>
          btn.classList.remove("selected")
        );


      button.classList.add("selected");


      cloudData.scent =
        button.dataset.scent;


      const names = {

        lavender: "Lavanda",

        rain: "Lluvia",

        flowers: "Flores",

        vanilla: "Vainilla",

        forest: "Bosque",

        citrus: "Cítrico"

      };


      scentName.textContent =
        names[cloudData.scent];


      createScentParticles();

    });

  });


/* =========================================================
   PARTÍCULAS DEL AROMA
========================================================= */

function createScentParticles() {

  scentParticles.innerHTML = "";


  const symbols = {

    lavender: ["✦", "·", "✧"],

    rain: ["·", "˚", "·"],

    flowers: ["✿", "✾", "·"],

    vanilla: ["·", "✦", "·"],

    forest: ["✦", "·", "✧"],

    citrus: ["·", "✦", "○"]

  };


  symbols[cloudData.scent]
    .forEach(symbol => {

      const particle =
        document.createElement("span");


      particle.textContent =
        symbol;


      scentParticles
        .appendChild(particle);

    });

}


/* =========================================================
   SELECCIONAR DETALLE
========================================================= */

document
  .querySelectorAll(".detail")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".detail")
        .forEach(btn =>
          btn.classList.remove("selected")
        );


      button.classList.add("selected");


      cloudData.detail =
        button.dataset.detail;


      createDetail();

    });

  });


/* =========================================================
   DETALLES
========================================================= */

function createDetail() {

  detailParticles.innerHTML = "";

  detailCloud.style.background = "";


  /* BRILLANTE */

  if (cloudData.detail === "bright") {

    for (let i = 0; i < 6; i++) {

      const sparkle =
        document.createElement("span");


      sparkle.className =
        "sparkle";


      sparkle.textContent =
        "✦";


      sparkle.style.left =
        Math.random() * 100 + "%";


      sparkle.style.top =
        Math.random() * 100 + "%";


      sparkle.style.animationDelay =
        Math.random() * 2 + "s";


      detailParticles
        .appendChild(sparkle);

    }

  }


  /* LUNA */

  if (cloudData.detail === "moon") {

    const moon =
      document.createElement("span");


    moon.className =
      "sparkle";


    moon.textContent =
      "☾";


    moon.style.right =
      "-20px";


    moon.style.top =
      "-35px";


    detailParticles
      .appendChild(moon);

  }


  /* IRIDISCENTE */

  if (cloudData.detail === "rainbow") {

    detailCloud.style.background =
      "linear-gradient(120deg, #C2C2F4, #D9AAF1, #FFFEAE, #FDF7FF)";

  }


  /* SIMPLE */

  if (cloudData.detail === "simple") {

    detailParticles.innerHTML = "";

  }

}


/* =========================================================
   SINCRONIZAR NUBE
========================================================= */

function syncCloud() {

  const clouds = [

    colorCloud,

    scentCloud,

    detailCloud

  ];


  clouds.forEach(cloud => {

    cloud.style.background = "";

    cloud.className =
      "preview-cloud " +
      "shape-" +
      cloudData.shape +
      " " +
      cloudData.color;

  });

}


/* =========================================================
   TERMINAR PERSONALIZACIÓN
========================================================= */

function finishCustomization() {

  syncCloud();

  createDetail();

  createScentParticles();


  document
    .querySelectorAll(".step")
    .forEach(section =>
      section.classList.remove("active")
    );


  setTimeout(() => {

    document
      .getElementById("final-preview")
      .classList.add("active");


    createFinishedCloud();

  }, 400);

}


/* =========================================================
   CREAR NUBE FINAL
========================================================= */

function createFinishedCloud() {

  if (!finishedCloud) return;


  finishedCloud.className =
    "preview-cloud shape-" +
    cloudData.shape +
    " " +
    cloudData.color;


  if (finishedParticles) {

    finishedParticles.innerHTML = "";

  }

}


/* =========================================================
   PREPARAR ESCENA DE ABRAZO
========================================================= */

function prepareFlyingCloud() {

  /* POSICIÓN INICIAL */

  flyingCloud.style.bottom =
    "34%";


  flyingCloud.style.transform =
    "translateX(-50%) scale(1)";


  /* REINICIAR ESTADOS */

  flyingCloud.classList.remove(
    "being-hugged"
  );


  hands.classList.remove(
    "show",
    "hugging",
    "release"
  );


  hugMessage.classList.remove(
    "show"
  );


  releaseMessage.classList.remove(
    "show"
  );


  finalMessage.classList.remove(
    "show"
  );


  /* USAR PNG REAL */

  nubeImagen.src =
    "img/nube.png";


  flyingParticles.innerHTML = "";


  /* DETALLE BRILLANTE */

  if (cloudData.detail === "bright") {

    for (let i = 0; i < 6; i++) {

      const sparkle =
        document.createElement("span");


      sparkle.className =
        "sparkle";


      sparkle.textContent =
        i % 2 === 0
          ? "✦"
          : "✧";


      sparkle.style.position =
        "absolute";


      sparkle.style.left =
        Math.random() * 100 + "%";


      sparkle.style.top =
        Math.random() * 100 + "%";


      sparkle.style.animationDelay =
        Math.random() * 2 + "s";


      flyingParticles
        .appendChild(sparkle);

    }

  }


  /* DETALLE LUNA */

  if (cloudData.detail === "moon") {

    const moon =
      document.createElement("span");


    moon.className =
      "sparkle";


    moon.textContent =
      "☾";


    moon.style.position =
      "absolute";


    moon.style.right =
      "-20px";


    moon.style.top =
      "-30px";


    flyingParticles
      .appendChild(moon);

  }


  /* 1. APARECEN LAS MANOS */

  setTimeout(() => {

    hands.classList.add(
      "show"
    );

  }, 500);


  /* 2. LAS MANOS ABRAZAN */

  setTimeout(() => {

    hands.classList.add(
      "hugging"
    );


    flyingCloud.classList.add(
      "being-hugged"
    );


    hugMessage.classList.add(
      "show"
    );

  }, 1500);


  /* 3. MOMENTO DEL ABRAZO */

  setTimeout(() => {

    // La nube permanece abrazada.

  }, 2600);


  /* 4. TERMINA EL ABRAZO */

  setTimeout(() => {

    hugMessage.classList.remove(
      "show"
    );


    hands.classList.remove(
      "hugging"
    );


    hands.classList.add(
      "release"
    );


    flyingCloud.classList.remove(
      "being-hugged"
    );

  }, 3500);


  /* 5. LA NUBE EMPIEZA A VOLAR */

  setTimeout(() => {

    flyingCloud.style.bottom =
      "120%";


    flyingCloud.style.transform =
      "translateX(-50%) scale(.55)";

  }, 4100);


  /* 6. MENSAJE DURANTE LA SUBIDA */

  setTimeout(() => {

    releaseMessage.classList.add(
      "show"
    );

  }, 5000);


  /* 7. DESAPARECE EL MENSAJE */

  setTimeout(() => {

    releaseMessage.classList.remove(
      "show"
    );

  }, 7000);


  /* 8. MENSAJE FINAL */

  setTimeout(() => {

    finalMessage.classList.add(
      "show"
    );

  }, 7600);

}


/* =========================================================
   ELEVAR NUBE
========================================================= */

function releaseCloud() {

  document
    .getElementById("final-preview")
    .classList.remove(
      "active"
    );


  setTimeout(() => {

    releaseScreen
      .classList.add(
        "active"
      );


    prepareFlyingCloud();

  }, 600);

}


/* =========================================================
   REINICIAR
========================================================= */

function restart() {

  finalMessage.classList.remove(
    "show"
  );


  releaseMessage.classList.remove(
    "show"
  );


  hugMessage.classList.remove(
    "show"
  );


  hands.classList.remove(
    "show",
    "hugging",
    "release"
  );


  flyingCloud.classList.remove(
    "being-hugged"
  );


  releaseScreen
    .classList.remove(
      "active"
    );


  flyingCloud.style.bottom =
    "34%";


  flyingCloud.style.transform =
    "translateX(-50%) scale(1)";


  /* RESET DATOS */

  cloudData.shape =
    "soft";


  cloudData.color =
    "lavender";


  cloudData.emotion =
    "Tranquilidad";


  cloudData.scent =
    "lavender";


  cloudData.detail =
    "bright";


  /* RESET FORMA */

  document
    .querySelectorAll(".option")
    .forEach(btn =>
      btn.classList.remove(
        "selected"
      )
    );


  document
    .querySelector(".option")
    .classList.add(
      "selected"
    );


  /* RESET COLOR */

  document
    .querySelectorAll(".emotion")
    .forEach(btn =>
      btn.classList.remove(
        "selected"
      )
    );


  document
    .querySelector(".emotion")
    .classList.add(
      "selected"
    );


  emotionName.textContent =
    "Tranquilidad";


  /* RESET AROMA */

  document
    .querySelectorAll(".scent")
    .forEach(btn =>
      btn.classList.remove(
        "selected"
      )
    );


  document
    .querySelector(".scent")
    .classList.add(
      "selected"
    );


  scentName.textContent =
    "Lavanda";


  /* RESET DETALLE */

  document
    .querySelectorAll(".detail")
    .forEach(btn =>
      btn.classList.remove(
        "selected"
      )
    );


  document
    .querySelector(".detail")
    .classList.add(
      "selected"
    );


  /* VOLVER AL INICIO */

  setTimeout(() => {

    home.classList.add(
      "active"
    );

  }, 500);

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

createScentParticles();

createDetail();