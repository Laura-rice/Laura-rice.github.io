import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ProjectDeck } from './project-deck';

describe('ProjectDeck', () => {
  it('shows the first practice and updates the detail panel when another card is selected', () => {
    render(<MemoryRouter><ProjectDeck /></MemoryRouter>);
    expect(screen.getAllByText('SFT 数据质量地图')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: '查看标注规范与一致性实验' }));
    expect(screen.getAllByText('标注规范与一致性实验')).toHaveLength(2);
  });

  it('keeps every project detail linked to its practice route', () => {
    render(<MemoryRouter><ProjectDeck /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /探索实践/ })).toHaveAttribute('href', '/projects/quality-map');
  });
});
