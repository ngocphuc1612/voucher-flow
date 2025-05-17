import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="32"
      height="32"
      aria-label="VoucherFlow Logo"
      {...props}
    >
      <rect width="100" height="100" rx="20" fill="hsl(var(--primary))" />
      <path
        d="M30 70 L30 30 L50 30 Q70 30 70 50 Q70 70 50 70 Z"
        fill="hsl(var(--primary-foreground))"
      />
      <circle cx="42" cy="50" r="8" fill="hsl(var(--primary))" />
    </svg>
  );
}
