
export default [
  {
    path: '/',
    component: () => import('layouts/layout'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'cartao', component: () => import('pages/cartao') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
