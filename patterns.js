module.exports = {
	'u_int8_t': {
		match: /error: unknown type name 'u_int8_t'/g,
		fix:  "CPPFLAGS.SunOS+=	-Du_int8_t=uint8_t",
		reference: 'http://www.perkin.org.uk/posts/pkgsrc-on-smartos-fixing-broken-builds.html'
	},
	'u_int16_t': {
		match: /error: unknown type name 'u_int16_t'/g,
		fix:  "CPPFLAGS.SunOS+=	-Du_int16_t=uint16_t",
		reference: 'http://www.perkin.org.uk/posts/pkgsrc-on-smartos-fixing-broken-builds.html'
	},
	'u_int32_t': {
		match: /error: unknown type name 'u_int32_t'/g,
		fix:  "CPPFLAGS.SunOS+=	-Du_int32_t=uint32_t",
		reference: 'http://www.perkin.org.uk/posts/pkgsrc-on-smartos-fixing-broken-builds.html'
	},
	'u_int64_t': {
		match: /error: unknown type name 'u_int64_t'/g,
		fix:  "CPPFLAGS.SunOS+=	-Du_int64_t=uint64_t",
		reference: 'http://www.perkin.org.uk/posts/pkgsrc-on-smartos-fixing-broken-builds.html'
	},
	'link_sunos_net': {
		match: /^(recv|send|__xnet_connect|__xnet_socket|accept|listen|setsockopt|__xnet_bind|gethostbyname)\s.*/g,
		fix:  "LDFLAGS.SunOS+=	-lsocket -lnsl",
		reference: 'http://www.perkin.org.uk/posts/pkgsrc-on-smartos-fixing-broken-builds.html'
	},
	'ambiguous_math': {
		match: /error: call of overloaded '(abs|ceil|fabs|floor|fmod|log|log10|pow|sqrt).*' is ambiguous/g,
		fix:  "add explicit casts like:\n	pow(x, y) -> pow(x, (double) y)\n	abs(x) -> abs((long) x)",
		reference: 'http://www.oracle.com/technetwork/server-storage/solarisstudio/documentation/cplusplus-faq-355066.html#Compat'
	},
	'include_termios': {
		match: /error: '(TIOCGWINSZ|TIOCGSIZE|TIOCGPTN|TIOCSPTLCK|TIOCNOTTY|TIOCLGET)' .*declared.*/g,
		fix:  "#include <termios.h>",
		reference: ''
	}
}
