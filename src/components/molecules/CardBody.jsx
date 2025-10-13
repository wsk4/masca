import React from 'react';
import Text from '../atoms/Text';
import '../../styles/CardBody.css'; 

function CardBody({ title, description, price }) {
  return (
    <>
      <Text variant="h5" className="card-price">{title}</Text>
      <Text variant="p" className="card-price">{description}</Text>
      <Text variant="span" className="card-price">
        ${price}
      </Text>
    </>
  );
}

export default CardBody;