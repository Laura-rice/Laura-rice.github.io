import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WonderExperience } from './WonderExperience';

describe('WonderExperience', () => {
  it('renders the opening scene and the second scene card data', () => {
    render(<WonderExperience />);

    expect(screen.getByText('REVERIE')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FORGE BEYOND THE REAL' })).toBeInTheDocument();
    expect(screen.getByText('Hidden Realms')).toBeInTheDocument();
    expect(document.querySelector('.wonder-cave')).toBeInTheDocument();
    expect(document.querySelector('.wonder-cave__rock')).toBeInTheDocument();
    expect(document.querySelector('.wonder-cave__sky')).toBeInTheDocument();
    expect(document.querySelector('.wonder-cave__clouds i')).toBeInTheDocument();
    expect(document.querySelector('.wonder-bloom-field')).toBeInTheDocument();
    expect(document.querySelector('.grass-parallax')).not.toBeInTheDocument();
  });
});
