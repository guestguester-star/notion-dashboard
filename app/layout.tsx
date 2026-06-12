import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '公司專案儀表板',
  description: 'Notion 實時數據儀表板',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
