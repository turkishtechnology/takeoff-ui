import { newSpecPage } from '@stencil/core/testing';
import { TkAvatarGroup } from '../tk-avatar-group';

describe('tk-avatar-group', () => {
  it('applies compact styling when requested', async () => {
    const page = await newSpecPage({
      components: [TkAvatarGroup],
      html: `<tk-avatar-group compact><span>A</span><span>B</span></tk-avatar-group>`,
    });

    const group = page.root.querySelector('.tk-avatar-group');

    expect(group.classList.contains('tk-avatar-group-compact')).toBe(true);
  });
});
