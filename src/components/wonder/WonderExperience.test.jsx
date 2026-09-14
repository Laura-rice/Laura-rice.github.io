import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WonderExperience } from './WonderExperience';

describe('WonderExperience', () => {
  it('renders the opening scene and the second scene card data', () => {
    render(<WonderExperience />);

    expect(screen.getByText('REVERIE')).toBeInTheDocument();
    // 第二幕标题被拆成逐词入场的 <span>，可访问名称会因空白折叠而不稳定，
    // 因此改为比对拼接后的文本，避免与动画结构耦合。
    const sceneTwoHeading = document.querySelector('.wonder-scene--two h2');
    expect(sceneTwoHeading).toBeInTheDocument();
    expect(sceneTwoHeading.textContent.replace(/\s+/g, ' ').trim()).toBe('FORGE BEYOND THE REAL');
    expect(screen.getByText('Hidden Realms')).toBeInTheDocument();
    expect(document.querySelector('.wonder-cave')).toBeInTheDocument();
    expect(document.querySelector('.wonder-cave__rock')).toBeInTheDocument();
    expect(document.querySelector('.wonder-cave__sky')).toBeInTheDocument();
    expect(document.querySelector('.wonder-cave__clouds i')).toBeInTheDocument();
    expect(document.querySelector('.wonder-bloom-field')).toBeInTheDocument();
    expect(document.querySelector('.grass-parallax')).not.toBeInTheDocument();
  });
});
