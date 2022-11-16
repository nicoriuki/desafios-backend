import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
      if (!req.session.username) {
            res.render('login');
      } else {
            const { username } = req.session;
            let data = { user: username };
            res.render('home', data);
      }
});

router.post('/login', (req, res) => {
      const { username } = req.body;
      req.session.username = username;
      res.redirect('/');
});

router.get('/logout', (req, res) => {
      const { username } = req.session;
      req.session.destroy((error) => {
            if (!error) {
                  let data = { user: username };
                  res.render('logout', data);
            } else {
                  res.send('Ocurrio un error', error.message);
            }
      });
});

export default router;
