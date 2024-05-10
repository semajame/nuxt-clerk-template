import { Clerk, createClerkInstanceWithoutLoading } from 'vue-clerk/plugin'

export default defineNuxtPlugin(async (nuxtApp) => {
  const isClerkLoaded = ref(false)
  const publishableKey = useRuntimeConfig().public.clerkPublishableKey as string

  const clerk = new Clerk(publishableKey)

  // Instead of using the `vue-clerk` plugin, we can use this internal function to create a Clerk instance.
  createClerkInstanceWithoutLoading(nuxtApp.vueApp, clerk, isClerkLoaded)

  // This will make sure that the clerk library is loaded in the client first before moving on to the next middleware.
  await clerk.load({
    routerPush: (to) => {
      return navigateTo(to)
    },
    routerReplace: (to) => {
      return navigateTo(to, { replace: true })
    },
    // appearance: {}
  })

  isClerkLoaded.value = true

  return {
    provide: {
      clerk,
    },
  }
})
