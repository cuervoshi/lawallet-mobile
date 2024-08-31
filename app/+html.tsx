import { type PropsWithChildren } from "react";

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        {/* <ScrollViewStyleReset /> */}

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        {/* <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} /> */}
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
* {
  box-sizing: border-box;
  
  margin: 0;
  padding: 0;
}

 html {
    overflow-x: hidden;

    font-size: 20px;
  }

  body {
    overflow-x: hidden;
    background-color: #000;

    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100dvh;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;
