import {
  defaultConfig,
  getUrlForFlow,
  isQuerySet,
  logger,
  redirectOnSoftError,
  requireNoAuth,
  RouteCreator,
  RouteRegistrator,
} from '../middleware'
import { URLSearchParams } from 'url'

// A simple express handler that shows the registration screen.
export const createRegistrationRoute: RouteCreator =
  (createHelpers) => (req, res, next) => {
    res.locals.projectName = 'Create account'

    const { flow, return_to = '' } = req.query
    const helpers = createHelpers(req)
    const { sdk, apiBaseUrl } = helpers
    const initFlowUrl = getUrlForFlow(
      apiBaseUrl,
      'registration',
      new URLSearchParams({ return_to: return_to.toString() }),
    )
    const initLoginUrl = getUrlForFlow(
      apiBaseUrl,
      'login',
      new URLSearchParams({
        return_to: return_to.toString(),
      }),
    )

    // The flow is used to identify the settings and registration flow and
    // return data like the csrf_token and so on.
    if (!isQuerySet(flow)) {
      logger.debug('No flow ID found in URL query initializing login flow', {
        query: req.query,
      })
      res.redirect(303, initFlowUrl)
      return
    }

    sdk
      .getSelfServiceRegistrationFlow(flow, req.header('Cookie'))
      .then(({ data: flow }) => {
        // Render the data using a view (e.g. Jade Template):
        res.render('registration', {
          ...flow,
          signInUrl: initLoginUrl,
        })
      })
      .catch(redirectOnSoftError(res, next, initFlowUrl))
  }

export const registerRegistrationRoute: RouteRegistrator = (
  app,
  createHelpers = defaultConfig,
) => {
  app.get(
    '/registration',
    requireNoAuth(createHelpers),
    createRegistrationRoute(createHelpers),
  )
}
