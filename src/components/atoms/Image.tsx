import React from 'react';

// Extendemos de las propiedades nativas de <img> para que acepte src, alt, onClick, etc.
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Puedes añadir props personalizadas aquí si las necesitas en el futuro
}

const Image = ({ className, ...props }: ImageProps) => {
  return (
    <img 
      className={className} 
      {...props} // Esto pasa src, alt, onClick y todo lo demás automáticamente
    />
  );
};

export default Image;