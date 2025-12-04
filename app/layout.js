import '../styles/globals.scss';

export const metadata = {
  title: 'Macmillan Donate Widget - MVP POC',
  description: 'Express donation widget for Macmillan Cancer Support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
