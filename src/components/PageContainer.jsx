/**
 * PageContainer — Standardized responsive container wrapper used across all pages
 * Guarantees consistent horizontal alignment (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8)
 * and eliminates horizontal overflow issues site-wide.
 */
export default function PageContainer({ children, className = '', id }) {
  return (
    <div
      id={id}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
