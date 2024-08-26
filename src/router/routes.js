const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'lista', component: () => import('pages/IndexPage.vue') },
      { path: 'form', name: 'form', component: () => import('pages/FormPage.vue') },
      { path: 'map', name: 'map', component: () => import('pages/MapPage.vue') }
    ]
  },

  // Rota para a página de login
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
