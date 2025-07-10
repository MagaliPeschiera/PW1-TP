// FORMULARIO
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (fecha === "" || nombre === "" || telefono === "") {
      mensaje.style.color = "#b13a2e";
      mensaje.textContent = "Todos los campos son obligatorios.";
      return;
    }

    // Validación de teléfono/correo
    const esCorreo = telefono.includes("@") && telefono.includes(".");
    const soloNumeros = telefono.replace(/\D/g, "");
    const esTelefono = soloNumeros.length >= 7;
    if (!esCorreo && !esTelefono) {
      mensaje.style.color = "#b13a2e";
      mensaje.textContent = "Por favor, ingresá un teléfono o correo válido.";
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xdkzeqkd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fecha: fecha,
          nombre: nombre,
          telefono: telefono
        })
      });

      if (response.ok) {
        mensaje.style.color = "#3a7a3a";
        mensaje.textContent = "¡Reserva enviada con éxito!";
        e.target.reset();
      } else {
        mensaje.style.color = "#b13a2e";
        mensaje.textContent = "Ocurrió un error al enviar la reserva.";
      }
    } catch (error) {
      mensaje.style.color = "#b13a2e";
      mensaje.textContent = "No se pudo conectar con el servidor.";
    }
  });
}

// MODO OSCURO / CLARO SWITCH
const modoSwitch = document.getElementById('modo-switch');
const modoIcono = document.getElementById('modo-icono');
const body = document.body;
const secciones = document.querySelectorAll('.barra-superior, .seccion, footer, form, .reserva-contacto-contenedor');

function setModoOscuro(oscuro) {
  if (oscuro) {
    body.classList.add('modo-oscuro');
    secciones.forEach(sec => sec.classList.add('modo-oscuro'));
    modoIcono.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('modo-oscuro');
    secciones.forEach(sec => sec.classList.remove('modo-oscuro'));
    modoIcono.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem('modo-oscuro', oscuro);
}

// Inicializar según preferencia guardada
const modoGuardado = localStorage.getItem('modo-oscuro') === 'true';
setModoOscuro(modoGuardado);

modoSwitch.addEventListener('click', () => {
  setModoOscuro(!body.classList.contains('modo-oscuro'));
});
modoSwitch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    setModoOscuro(!body.classList.contains('modo-oscuro'));
  }
});

// Botón volver al inicio flotante abajo a la izquierda
function activarBotonVolverAbajoIzq() {
  var btn = document.getElementById('btn-volver-abajo-izq');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > window.innerHeight * 0.7) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', activarBotonVolverAbajoIzq);
} else {
  activarBotonVolverAbajoIzq();
}
