import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', (req, res) => {
      if (!req.isAuthenticated()) {
            res.render('login');
      } else {
            const { user } = req;
            let data = { user: user.email };
            res.render('home', data);
      }
});
router.post(
      '/sign-in',
      passport.authenticate('sign-in', {
            successRedirect: '/',
            failureRedirect: '/faillogin',
      }),
      (req, res) => {
            res.redirect('/');
      }
);
router.get('/faillogin', (req, res) => {
      res.render('faillogin');
});

router.post('/logout', (req, res) => {
      const { username } = req.body;
      req.logout((error) => {
            if (!error) {
                  let data = { user: username };
                  res.render('logout', data);
            } else {
                  res.send('Ocurrio un error', error.message);
            }
      });
});

export default router;
