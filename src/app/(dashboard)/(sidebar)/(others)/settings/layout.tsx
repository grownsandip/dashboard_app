import { Inter } from "next/font/google";
import SettingsSidebar from '@/components/settings-sidebar'


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex h-screen'>
            <SettingsSidebar />
            {children}
        </div>
    );
}
