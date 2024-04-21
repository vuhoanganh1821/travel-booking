const cmsRoutes = {
  cms: {
    value: '/cms',
    login: {
      value: '/cms/login'
    },
    forgotPassword: {
      value: '/cms/forgot-password'
    },
    resetPassword: {
      value: (resetPasswordToken: string) => `/cms/reset-password/${resetPasswordToken}`
    },
    accountSettings: {
      value: '/cms/account-settings'
    },
    bookingManagement: {
      value: '/cms/booking-management',
      detail: {
        value: (bookingId: string) => `/cms/booking-management/${bookingId}`
      }
    },
    tourManagement: {
      value: '/cms/tour-management',
      detail: {
        value: (tourId: string) => `/cms/tour-management/${tourId}`
      }
    },
    accountManagement: {
      value: '/cms/account-management',
    },
    discountManagement: {
      value: '/cms/discount-management',
      detail: {
        value: (discountId: string) => `/cms/discount-management/${discountId}`
      }
    },
    locationManagement: {
      value: '/cms/location-management',
      detail: {
        value: (locationId: string) => `/cms/location-management/${locationId}`
      }
    },
    generalSettings: {
      value: '/cms/general-settings',
    }
  }
}

export default cmsRoutes
