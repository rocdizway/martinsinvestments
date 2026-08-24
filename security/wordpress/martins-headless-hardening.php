<?php
/**
 * Plugin Name: Martins Headless WordPress Hardening
 * Description: Closes unused discussion, XML-RPC, and anonymous REST user/comment surfaces for the Martins headless CMS.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 *
 * Install as wp-content/mu-plugins/martins-headless-hardening.php.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Keep discussion defaults closed and remove discussion support from public
 * content types. Existing database rows still need the one-off cleanup in the
 * accompanying deployment checklist.
 */
function martins_headless_close_discussion() {
	$closed_options = array(
		'default_comment_status' => 'closed',
		'default_ping_status'    => 'closed',
		'default_pingback_flag'  => '0',
	);

	foreach ( $closed_options as $option => $value ) {
		if ( (string) get_option( $option ) !== $value ) {
			update_option( $option, $value );
		}
	}

	foreach ( get_post_types( array(), 'names' ) as $post_type ) {
		remove_post_type_support( $post_type, 'comments' );
		remove_post_type_support( $post_type, 'trackbacks' );
	}
}
add_action( 'init', 'martins_headless_close_discussion', PHP_INT_MAX );

add_filter( 'comments_open', '__return_false', PHP_INT_MAX, 2 );
add_filter( 'pings_open', '__return_false', PHP_INT_MAX, 2 );

/**
 * Block XML-RPC at the application layer. The host/CDN rule in the checklist
 * remains recommended so rejected traffic never reaches PHP.
 */
function martins_headless_block_xmlrpc_request() {
	if ( ! defined( 'XMLRPC_REQUEST' ) || ! XMLRPC_REQUEST ) {
		return;
	}

	wp_die(
		esc_html__( 'XML-RPC is disabled.', 'martins-headless' ),
		esc_html__( 'Forbidden', 'martins-headless' ),
		array( 'response' => 403 )
	);
}
add_action( 'plugins_loaded', 'martins_headless_block_xmlrpc_request', -9999 );
add_filter( 'xmlrpc_enabled', '__return_false', PHP_INT_MAX );
add_filter( 'xmlrpc_methods', '__return_empty_array', PHP_INT_MAX );

/**
 * Do not advertise pingback support in frontend responses.
 */
function martins_headless_remove_pingback_header( $headers ) {
	unset( $headers['X-Pingback'], $headers['x-pingback'] );
	return $headers;
}
add_filter( 'wp_headers', 'martins_headless_remove_pingback_header', PHP_INT_MAX );

/**
 * The public frontend does not use REST users or comments. Return a 404 for
 * anonymous requests while preserving authenticated wp-admin/editor access.
 */
function martins_headless_block_anonymous_rest_surfaces( $result, $server, $request ) {
	if ( null !== $result || is_user_logged_in() ) {
		return $result;
	}

	$route = (string) $request->get_route();
	if ( ! preg_match( '#^/wp/v2/(?:users|comments)(?:/|$)#', $route ) ) {
		return $result;
	}

	return new WP_Error(
		'rest_no_route',
		esc_html__( 'No route was found matching the URL and request method.', 'martins-headless' ),
		array( 'status' => 404 )
	);
}
add_filter( 'rest_pre_dispatch', 'martins_headless_block_anonymous_rest_surfaces', 10, 3 );
