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
    value: (tourId: string) => `/tour-detail/${tourId}`,
  },
  myProfile: {
    value: '/my-profile'
  },
  cart: {
    value: '/cart'
  },
  booking: {
    activity: "/booking/activity",
    contact: "/booking/contact",
    payment: "/booking/payment",
    view:  "/booking/view",
    detail: (bookingId: string) => `/booking/${bookingId}`
  },
  ...cmsRoutes
}

export default routes
