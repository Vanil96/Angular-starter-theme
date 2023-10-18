const path = require('path') 
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// router.render = (req, res) => {
//   debugger
//   res.jsonp({
//     body: res.locals.data
//   })
// }

const env = {
  port: 3000
}
server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})


const TOKENS = {
  /* User 1 - Admin */
  'Bearer f1r57u53rv4l1d4dm1n70k3n_2': 1,
  /* User 3 - Regular User */
  'Bearer 7h1rdr36ul4ru53rv4l1d70k3n_3': 3,
}

const jwt = require('jsonwebtoken')

server.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.send(400, 'Username and Password required')
  }

  const user = router.db.get('users')
    .find({
      username: req.body.username
    }).value()

  if (!user) {
    res.send(403, 'Username or password invalid')
  }

  const token = jwt.sign(user, 'secret cat')

  res.jsonp({
    token,
    user,
    roles: user.roles
  })
})

/**
 *  Authentication - required header:
 *  - Authorization: Bearer {valid_token}
 *  Where {valid_token} is one from TOKENS map, corresponding to user
 *  Request body {id} property mast match user.id for selected token
*/
server.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.get('Authorization').replace('Bearer ', '')
    const user = jwt.decode(token)

    if (!user) {
      res.send(401, 'Invalid Token - Only accepting Authorization: Bearer {valid_token}')
    } else if (!req.body.userId) {
      req.body.userId = user.id
      next()
    } if (req.body.userId !== user.id) {
      res.send(403, 'Access denied. User can only edit own resources')
    }
  } else {
    next()
  }
})

// AutoAdd createdAt field
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)
server.listen(env.port, () => {
  console.log('JSON Server is running on http://localhost:' + env.port + '/')
})



// const path = require('path');
// const jsonServer = require('json-server');
// const jwt = require('jsonwebtoken');
// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, 'db.json'));
// const middlewares = jsonServer.defaults();

// // Konfiguracja sekretu i czasu wygaśnięcia dla JWT
// const JWT_SECRET = '64N4N64^n$6GWQDFGDF%$#GDF@!213S%32SDF#1A!2'; // Zmień na rzeczywisty, silny sekretny klucz
// const TOKEN_EXPIRATION_TIME = '10s'; // np. tokeny wygasają po 1 godzinie

// server.use(middlewares);
// server.use(jsonServer.bodyParser);

// // Dotychczasowe funkcje, np. echo, pozostają bez zmian
// server.get('/echo', (req, res) => {
//   res.jsonp(req.query);
// });

// // Logowanie i generowanie tokenów JWT z czasem wygaśnięcia
// server.post('/login', (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.status(400).send('Username and Password required');
//     return;
//   }

//   const user = router.db.get('users')
//     .find({ username: req.body.username })
//     .value();

//   if (!user) {
//     res.status(403).send('Username or password invalid');
//     return;
//   }

//   // Generowanie tokena z czasem wygaśnięcia
//   const token = jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });

//   res.jsonp({
//     token,
//     user, // Wysyłasz pełne dane użytkownika; upewnij się, że nie zawiera to wrażliwych informacji
//     roles: user.roles
//   });
// });

// // Middleware do autentykacji i weryfikacji tokenów JWT
// server.use((req, res, next) => {
//   if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
//     const authHeader = req.get('Authorization') || '';
//     const token = authHeader.replace('Bearer ', '');

//     try {
//       // Zweryfikuj token i upewnij się, że jest ważny
//       const decoded = jwt.verify(token, JWT_SECRET);

//       // Dodatkowe logiki sprawdzające, czy użytkownik ma uprawnienia do wykonania operacji
//       if (req.body.userId && req.body.userId !== decoded.id) {
//         res.status(403).send('Access denied. User can only edit own resources');
//       } else {
//         req.user = decoded; // Przypisz dekodowane dane użytkownika do żądania, jeśli chcesz ich używać później
//         next(); // Kontynuuj do następnego middleware lub trasy, jeśli wszystko jest w porządku
//       }
//     } catch (error) {
//       // Obsługa wygasłych tokenów lub innych błędów związanych z tokenem
//       res.status(401).send('Invalid or expired token');
//     }
//   } else {
//     next(); // Jeśli żądanie nie wymaga autentykacji, kontynuuj normalnie
//   }
// });

// // Automatyczne dodawanie pola createdAt
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now();
//   }
//   next();
// });

// // Kontynuowanie używania routera i nasłuchiwania na serwerze
// server.use(router);
// const env = { port: 3000 }; // Możesz dostosować port zgodnie z potrzebami
// server.listen(env.port, () => {
//   console.log(`JSON Server is running on http://localhost:${env.port}/`);
// })