import html2canvas from "html2canvas";

const generateJPG = () => {
  const element = document.getElementById("cont-menu");

  // Usamos html2canvas para convertir el contenido HTML en una imagen
  html2canvas(element, {
    useCORS: true,  // Permitir el acceso a imágenes desde dominios externos
    scale: 2,       // Aumentar la escala de la imagen para mayor resolución
  }).then((canvas) => {
    // Convertimos el canvas a una imagen en formato JPG
    const imgData = canvas.toDataURL("image/jpeg");

    // Creamos un enlace de descarga para la imagen
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "menu.jpg";  // El nombre del archivo a descargar
    link.click();  // Inicia la descarga
  });
};

export { generateJPG };