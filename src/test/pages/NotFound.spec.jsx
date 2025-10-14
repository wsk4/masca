import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../pages/NotFound'; 

describe('NotFound Component', () => {

  it('should render the not found page elements correctly', () => {

    render(<NotFound />);


    const heading = screen.getByRole('heading', { name: /página no encontrada/i });
    expect(heading).toBeTruthy();


    const paragraph = screen.getByText(/¿Estás seguro de que era aquí?/i);
    expect(paragraph).toBeTruthy();


    const image = screen.getByAltText('Not Found Image');
    expect(image).toBeTruthy();
    

    expect(image.src).toContain('/img/momoerror.webp');
  });

});