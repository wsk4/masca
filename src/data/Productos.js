import valentino from "../img/valentino.webp";
import perfume from "../assets/img/perfume.webp";
import devocion from "../assets/img/devocion.webp";
import phantome from "../assets/img/phantome_11zon.webp";

const productos = [
    {
        id: 1,
        nombre: "Valentino",
        descripcion: "Born in Roma",
        precio: 100000,
        img: valentino,
        link: "/valentino",
    },
    {
        id: 2,
        nombre: "Armani",
        descripcion: "Stronger With You",
        precio: 110000,
        img: perfume,
        link: "/armani",
    },
    {
        id: 3,
        nombre: "Dolce Gabanna",
        descripcion: "Devotion",
        precio: 100000,
        img: devocion,
        link: "/dolce",
    },
    {
        id: 4,
        nombre: "Paco Rabanne",
        descripcion: "Phantome",
        precio: 95000,
        img: phantome,
        link: "/phantome",
    },
];

export default productos;
