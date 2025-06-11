document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const fecha = document.getElementById("fecha").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (nombre === "" || email === "" || fecha === "") {
    mensaje.style.color = "red";
    mensaje.textContent = "Todos los campos son obligatorios.";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    mensaje.style.color = "red";
    mensaje.textContent = "Por favor, ingresá un correo válido.";
    return;
  }

  try {
    const response = await fetch("https://formspree.io/f/xdkzeqkd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        fecha: fecha
      })
    });

    if (response.ok) {
      mensaje.style.color = "green";
      mensaje.textContent = "¡Reserva enviada con éxito!";
      e.target.reset();
    } else {
      mensaje.style.color = "red";
      mensaje.textContent = "Ocurrió un error al enviar la reserva.";
    }
  } catch (error) {
    mensaje.style.color = "red";
    mensaje.textContent = "No se pudo conectar con el servidor.";
  }
});
