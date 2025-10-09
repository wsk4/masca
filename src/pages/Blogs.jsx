import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from "../components/organisms/ProductCard";


function Blogs() {
    return (
        <Container className="my-5">
            <h1>Blogs</h1>
            <p>
                Nuestra historia comenzó con una simple amistad entre tres amigos unidos por una misma pasión: los buenos aromas.
                Lo que en un principio era solo una afición por descubrir y compartir perfumes, con el tiempo se transformó en un sueño:
                crear un espacio donde cada persona pudiera encontrar la fragancia ideal para expresar su esencia. Con esfuerzo, dedicación y muchas ganas,
                pasamos de pequeñas ventas entre conocidos a formar un proyecto que hoy busca llegar a más personas. Para nosotros, cada perfume no es solo un aroma, 
                sino un recuerdo, una emoción y una forma de dejar huella en el mundo. Seguimos siendo esos tres amigos de siempre, pero ahora con la ilusión de ofrecerte 
                calidad, confianza y una experiencia única en cada frasco.
            </p>
        </Container>
    );
}

export default Blogs;
