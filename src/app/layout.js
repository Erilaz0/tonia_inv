
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <link rel="preconnect" href="https://fonts.googleapis.com"/>
       <link rel="preconnect" href="https://fonts.gstatic.com" />
       <meta property="og:image" content="https://tusitioweb.com/imagenes/tilogo.jpg"></meta>
       <meta property="og:title" content="¡Estás invitado a nuestra boda! 💍"></meta>
       <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Tangerine:wght@400;700&display=swap" rel="stylesheet"/>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      </head>
      <body style={ { margin: "0" } }>
        {children}
      </body>
    </html>
  );
}
