const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const errorHandler = require('./errorResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
 // console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
    case '/badRequest?valid=true':
    case '/unauthorized?loggedIn=yes':
      errorHandler.getResponse(request, response, 200);
      break;
    case '/badRequest':
      errorHandler.getResponse(request, response, 400);
      break;
    case '/unauthorized':
      errorHandler.getResponse(request, response, 401);
      break;
    case '/forbidden':
      errorHandler.getResponse(request, response, 403);
      break;
    case '/internal':
      errorHandler.getResponse(request, response, 500);
      break;
    case '/notImplemented':
      errorHandler.getResponse(request, response, 501);
      break;
    case '/notFound':
      errorHandler.getResponse(request, response, 404);
      break;
    default:
      errorHandler.getResponse(request, response, 404);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
 // console.log(`Listening on 127.0.0.0:${port}`);
});
