export type TkAvatarProps = Partial<{
  ariaLabelledby: string | null;
  background: 'brand' | 'solid';
  badge: boolean;
  badgeStatus: 'success' | 'warning' | 'info' | 'danger';
  image: string | null;
  label: string | null;
  name: string | null;
  rounded: boolean;
  hideShadow: boolean;
  variant: 'primary' | 'light' | 'success' | 'info' | 'warning' | 'danger';
  size: 'xsmall' | 'small' | 'base' | 'large' | 'xlarge';
}>;
