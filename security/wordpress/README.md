# Headless WordPress security handoff

## Ownership boundary

This repository is the TanStack frontend. It does not contain or deploy the WordPress installation,
`wp-config.php`, web-server configuration, CDN/WAF rules or the active CMS plugin directory. The
ready-to-deploy `martins-headless-hardening.php` must therefore be installed by a WordPress
administrator, and the host-owned controls below must be applied against the configured
`VITE_WORDPRESS_API_URL` origin.

Do not place WordPress credentials in this repository. The frontend only needs anonymous, read-only
access to published posts and media.

## Required CMS changes

1. Take a tested backup and apply the changes in staging first.
2. Copy `martins-headless-hardening.php` to
   `wp-content/mu-plugins/martins-headless-hardening.php`. Create the `mu-plugins` directory if it
   does not exist, then confirm the plugin appears under **Plugins > Must-Use**. It immediately
   closes public comments and pings, blocks XML-RPC in WordPress, and returns 404 for anonymous REST
   user/comment requests while retaining authenticated editor access.
3. In **Settings > Discussion**, confirm all three default article options are off:
   - attempting to notify linked blogs;
   - accepting pingbacks and trackbacks;
   - accepting comments on new posts.
4. Bulk-edit every existing post and page to set both **Comments** and **Pings** to **Do not allow**.
   Changing the defaults alone does not close existing content.
5. Permanently delete the public default comment and empty both the comment Trash and Spam queues.
6. Block `/xmlrpc.php` at the host/CDN for every method. The must-use plugin supplies an
   application-layer 403 as defence in depth, but rejecting requests before PHP is more efficient.
   A WordPress `xmlrpc_enabled` filter alone is insufficient because it only disables authenticated
   XML-RPC methods, not pingbacks or every custom method. Confirm first that Jetpack, the WordPress
   mobile app and any publishing integration do not use XML-RPC.
7. Verify that anonymous access to `/wp-json/wp/v2/users`, `/wp-json/wp/v2/users/<id>` and the REST
   comments routes returns 404. The frontend no longer requests embedded author records and does not
   call either collection. Test article rendering after installing the must-use plugin.
8. Require 2FA for every administrator and editor. WordPress core does not include 2FA; use the
   identity provider or a maintained plugin supported by the host. The WordPress.org **Two-Factor**
   plugin is a baseline option, but each user enrols individually unless an additional enforcement
   policy is configured. Store recovery codes outside WordPress and enrol at least two admins before
   enforcing the policy.
9. Rate-limit `/wp-login.php` at the CDN/WAF or web server and alert on repeated failures. Prefer an
   edge rule so abusive traffic is rejected before PHP runs. If XML-RPC must remain enabled for a
   documented integration, give it a separate, stricter rate limit and block `system.multicall`.
10. Force HTTPS for the CMS and administration area, keep core/plugins/themes current, remove unused
    extensions and review all application passwords. Revoke any that are not tied to a current,
    documented integration.

Relevant upstream guidance:

- [WordPress Discussion settings](https://wordpress.org/documentation/article/settings-discussion-screen/)
- [WordPress brute-force defence and rate limiting](https://developer.wordpress.org/advanced-administration/security/brute-force/)
- [`xmlrpc_enabled` limitations](https://developer.wordpress.org/reference/hooks/xmlrpc_enabled/)
- [WordPress REST users endpoint](https://developer.wordpress.org/rest-api/reference/users/)
- [WordPress.org Two-Factor plugin](https://wordpress.org/plugins/two-factor/)

## Acceptance checks

Run these from outside the CMS network after deployment, substituting the actual HTTPS CMS origin:

```sh
# Must be 403/404/410 (and must not return an XML-RPC method response).
curl -i -X POST -H "Content-Type: text/xml" \
  --data '<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName><params/></methodCall>' \
  https://cms.example.com/xmlrpc.php

# Both requests must be 404 when no Authorization header is supplied.
curl -i https://cms.example.com/wp-json/wp/v2/users
curl -i 'https://cms.example.com/wp-json/wp/v2/comments?status=approve&per_page=1'

# Published Perspectives data must remain readable by the frontend.
curl -i 'https://cms.example.com/wp-json/wp/v2/posts?status=publish&per_page=1&_embed=wp:featuredmedia,wp:term'
```

Also verify interactively that:

- every privileged account is challenged for a second factor;
- recovery works for a designated break-glass administrator;
- the login rate limit triggers and later clears without locking out all administrators;
- WordPress post editing and the frontend Perspectives listing/article pages still work.

Record the CMS change ticket, owner, completion date and evidence below so this external dependency
does not get mistaken for a frontend fix.

| Control                                | Owner | Completed | Evidence |
| -------------------------------------- | ----- | --------- | -------- |
| Comments and pings closed              |       |           |          |
| Default/public comments removed        |       |           |          |
| XML-RPC blocked                        |       |           |          |
| Anonymous REST users routes blocked    |       |           |          |
| Privileged-account 2FA enforced        |       |           |          |
| Login rate limiting and alerts enabled |       |           |          |
