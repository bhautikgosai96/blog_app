import serialize from "serialize-javascript";
export default ({ body, initialState }) => {
  return `
    <!DOCTYPE html>
    <html>
        <head> 
        <base href="/"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  
  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  
  <!-- Popper JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  
  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        </head>
        <body>
            <div id="root">${body}</div>
            <script>window.__INITIAL_DATA__ = ${serialize(
              initialState
            )}</script>
            <script src="bundle.js"></script>
        </body>
    </html>
    `;
};
