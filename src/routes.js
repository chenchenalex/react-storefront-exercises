import { Router, fromClient, fromServer, cache, proxyUpstream } from 'react-storefront/router'

// See guide to caching on Moov XDN: https://pwa.moovweb.com/guides/caching
const cacheHandler = cache({ server: { maxAgeSeconds: 300 }, client: true }) // cache responses in varnish for 5 minutes

// See guide to routing: https://pwa.moovweb.com/guides/routing
export default new Router()
  .appShell(
    // returns only the global data needed to build the app-shell for offline support
    cacheHandler,
    fromServer('./app-shell/app-shell-handler')
  )
  .get('/', cacheHandler, fromClient({ page: 'Home' }), fromServer('./home/home-handler'))
  .get(
    '/c/:id',
    cacheHandler,
    fromClient({ page: 'Category' }),
    fromServer('./category/category-handler')
  )
  .get(
    '/s/:id',
    cacheHandler,
    fromClient({ page: 'Subcategory' }),
    fromServer('./subcategory/subcategory-handler')
  )
  .get(
    '/p/:id',
    cacheHandler,
    fromClient({ page: 'Product' }),
    fromServer('./product/product-handler')
  )
  .get(
    '/p/:id/personalization',
    cache({ client: true }), // cache this only on the client because it's personalized for each user
    fromServer('./product/personalization-handler')
  )
  // This API method is automatically called and state is updated when the product model's color
  // is changed. Refer to `product/images-handler.js` to see an example implementation of the handler.
  .get('/p/:id/images/:color', cacheHandler, fromServer('./product/images-handler'))
  .get('/cart', fromClient({ page: 'Cart' }), fromServer('./cart/cart-handler'))
  .get('/cart/add-from-amp.json', fromServer('./cart/add-from-amp-handler'))
  .get('/checkout', fromClient({ page: 'Checkout' }), fromServer('./checkout/checkout-handler'))
  .get('/search/suggest', fromServer('./search/suggest-handler'))
  .get(
    '/search',
    // Note: Search results and subcategory views are often the same.  In practice you may need to implement
    // a different handler or view for search results.  For simplicity we just reuse the subcategory view and
    // handler here.
    fromClient({ page: 'Subcategory', somethingElse: 123 }),
    fromServer('./subcategory/subcategory-handler')
  )
  .get(
    '/staticPage/:name',
    fromClient({ page: 'Static'}),
    fromServer('./staticPage/staticPage-handler')
  )
  .fallback(
    // when no route matches, pull in content from the upstream site
    proxyUpstream('./proxy/proxy-handler')
  )
