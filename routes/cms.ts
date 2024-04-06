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
    generalSettings: {
      value: '/cms/general-settings',
    }
  }
}

export default cmsRoutes
