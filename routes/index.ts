import cmsRoutes from './cms'

const routes = {
  home: {
    value: '/'
  },
  about: {
    value: '/about'
  },
  notfoundpage: {
    value: '/404'
  },
  detail: {
    value: (tourId: number) => `/tour-detail/${tourId}`,
  },
  myProfile: {
    value: '/my-profile'
  },
  ...cmsRoutes
}

export default routes
