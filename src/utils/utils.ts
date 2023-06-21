export const SetHTMLTemplate = (HTML: string, CSS: string, JS: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Demo</title>
      <style type="text/css">
        ${CSS}
      </style>
  </head>
  <body>
      ${HTML}
      <script type="text/javascript">
        ${JS}
      </script>
  </body>
  </html>
  `;
};
