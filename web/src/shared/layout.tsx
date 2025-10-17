import './global.css';
import BodyLayout from '@/components/shared/body-layout';

export const metadata = {
  title: 'Yapper',
  description: 'created solely to yap without constraints',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BodyLayout>
          {children}
        </BodyLayout>
      </body>
    </html>
  );
}
