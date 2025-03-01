/**
 *  Fix for Single Page Applications (SPA) on GitHub Pages
 *
 *  @link      https://github.com/rafrex/spa-github-pages
 *  @author    Rafael Pedicini
 *  @fixes     Supports deeper nested routes properly
 */

;(function(l) {
  // Automatically detect full repository name from GitHub Pages path
  var pathParts = l.pathname.split('/').filter(Boolean)
  var repo = '/' + pathParts[0] // Always set this to the repo name

  /* Redirect all 404 traffic to index.html */
  function redirect() {
    l.replace(l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + repo + '/?' +
      (l.pathname ? 'p=' + l.pathname.replace(/&/g, '~and~').replace(repo, '') : '') +
      (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      (l.hash || '')
    )
  }

  /* Resolve 404 redirects into internal routes */
  function resolve() {
    if (l.search) {
      var q = {}
      l.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=')
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&')
      })

      if (q.p !== undefined) {
        var newPath = repo + (q.p || '') + (q.q ? ('?' + q.q) : '') + (l.hash || '')
        window.history.replaceState(null, null, newPath)
      }
    }
  }

  /* If current document is the 404 page, redirect to index.html, otherwise resolve */
  if (document.title === '404') redirect()
  else resolve()
}(window.location))
