export default function RootLayout({children, params,}: {
    children: React.ReactNode;
    params: any;
}) {
    return (
        <div className={"container mb-24 lg:mb-32 mt-9"}>
        {children}
       </div>
    );
}
