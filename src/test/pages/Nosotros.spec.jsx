import React from 'react';
import { render, screen } from '@testing-library/react';
import Nosotros from '../../pages/Nosotros'; 

describe('Nosotros Component', () => {


  it('should render the title and paragraph correctly', () => {

    render(<Nosotros />);


    const title = screen.getByRole('heading', { name: /sobre nosotros/i });
    expect(title).toBeTruthy();

    const paragraph = screen.getByText(/Nuestra historia comenzó con una simple amistad/i);
    expect(paragraph).toBeTruthy();
  });

});