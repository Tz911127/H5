var hexcase = 0;
function hex_md5(b) {
  return rstr2hex(rstr_md5(str2rstr_utf8(b)))
}
function hex_hmac_md5(d, c) {
  return rstr2hex(rstr_hmac_md5(str2rstr_utf8(d), str2rstr_utf8(c)))
}
function md5_vm_test() {
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
}
function rstr_md5(b) {
  return binl2rstr(binl_md5(rstr2binl(b), b.length * 8))
}
function rstr_hmac_md5(n, k) {
  var l = rstr2binl(n);
  if (l.length > 16) {
    l = binl_md5(l, n.length * 8)
  }
  var i = Array(16),
    m = Array(16);
  for (var h = 0; h < 16; h++) {
    i[h] = l[h] ^ 909522486;
    m[h] = l[h] ^ 1549556828
  }
  var j = binl_md5(i.concat(rstr2binl(k)), 512 + k.length * 8);
  return binl2rstr(binl_md5(m.concat(j), 512 + 128))
}
function rstr2hex(l) {
  try {
    hexcase
  } catch (i) {
    hexcase = 0
  }
  var j = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var e = "";
  var h;
  for (var k = 0; k < l.length; k++) {
    h = l.charCodeAt(k);
    e += j.charAt((h >>> 4) & 15) + j.charAt(h & 15)
  }
  return e
}
function str2rstr_utf8(j) {
  var f = "";
  var i = -1;
  var g, h;
  while (++i < j.length) {
    g = j.charCodeAt(i);
    h = i + 1 < j.length ? j.charCodeAt(i + 1) : 0;
    if (55296 <= g && g <= 56319 && 56320 <= h && h <= 57343) {
      g = 65536 + ((g & 1023) << 10) + (h & 1023);
      i++
    }
    if (g <= 127) {
      f += String.fromCharCode(g)
    } else {
      if (g <= 2047) {
        f += String.fromCharCode(192 | ((g >>> 6) & 31), 128 | (g & 63))
      } else {
        if (g <= 65535) {
          f += String.fromCharCode(224 | ((g >>> 12) & 15), 128 | ((g >>> 6) & 63), 128 | (g & 63))
        } else {
          if (g <= 2097151) {
            f += String.fromCharCode(240 | ((g >>> 18) & 7), 128 | ((g >>> 12) & 63), 128 | ((g >>> 6) & 63), 128 | (g & 63))
          }
        }
      }
    }
  }
  return f
}
function rstr2binl(d) {
  var e = Array(d.length >> 2);
  for (var f = 0; f < e.length; f++) {
    e[f] = 0
  }
  for (var f = 0; f < d.length * 8; f += 8) {
    e[f >> 5] |= (d.charCodeAt(f / 8) & 255) << (f % 32)
  }
  return e
}
function binl2rstr(d) {
  var e = "";
  for (var f = 0; f < d.length * 32; f += 8) {
    e += String.fromCharCode((d[f >> 5] >>> (f % 32)) & 255)
  }
  return e
}
function binl_md5(a, q) {
  a[q >> 5] |= 128 << ((q) % 32);
  a[(((q + 64) >>> 9) << 4) + 14] = q;
  var b = 1732584193;
  var c = -271733879;
  var d = -1732584194;
  var i = 271733878;
  for (var t = 0; t < a.length; t += 16) {
    var r = b;
    var s = c;
    var u = d;
    var v = i;
    b = md5_ff(b, c, d, i, a[t + 0], 7, -680876936);
    i = md5_ff(i, b, c, d, a[t + 1], 12, -389564586);
    d = md5_ff(d, i, b, c, a[t + 2], 17, 606105819);
    c = md5_ff(c, d, i, b, a[t + 3], 22, -1044525330);
    b = md5_ff(b, c, d, i, a[t + 4], 7, -176418897);
    i = md5_ff(i, b, c, d, a[t + 5], 12, 1200080426);
    d = md5_ff(d, i, b, c, a[t + 6], 17, -1473231341);
    c = md5_ff(c, d, i, b, a[t + 7], 22, -45705983);
    b = md5_ff(b, c, d, i, a[t + 8], 7, 1770035416);
    i = md5_ff(i, b, c, d, a[t + 9], 12, -1958414417);
    d = md5_ff(d, i, b, c, a[t + 10], 17, -42063);
    c = md5_ff(c, d, i, b, a[t + 11], 22, -1990404162);
    b = md5_ff(b, c, d, i, a[t + 12], 7, 1804603682);
    i = md5_ff(i, b, c, d, a[t + 13], 12, -40341101);
    d = md5_ff(d, i, b, c, a[t + 14], 17, -1502002290);
    c = md5_ff(c, d, i, b, a[t + 15], 22, 1236535329);
    b = md5_gg(b, c, d, i, a[t + 1], 5, -165796510);
    i = md5_gg(i, b, c, d, a[t + 6], 9, -1069501632);
    d = md5_gg(d, i, b, c, a[t + 11], 14, 643717713);
    c = md5_gg(c, d, i, b, a[t + 0], 20, -373897302);
    b = md5_gg(b, c, d, i, a[t + 5], 5, -701558691);
    i = md5_gg(i, b, c, d, a[t + 10], 9, 38016083);
    d = md5_gg(d, i, b, c, a[t + 15], 14, -660478335);
    c = md5_gg(c, d, i, b, a[t + 4], 20, -405537848);
    b = md5_gg(b, c, d, i, a[t + 9], 5, 568446438);
    i = md5_gg(i, b, c, d, a[t + 14], 9, -1019803690);
    d = md5_gg(d, i, b, c, a[t + 3], 14, -187363961);
    c = md5_gg(c, d, i, b, a[t + 8], 20, 1163531501);
    b = md5_gg(b, c, d, i, a[t + 13], 5, -1444681467);
    i = md5_gg(i, b, c, d, a[t + 2], 9, -51403784);
    d = md5_gg(d, i, b, c, a[t + 7], 14, 1735328473);
    c = md5_gg(c, d, i, b, a[t + 12], 20, -1926607734);
    b = md5_hh(b, c, d, i, a[t + 5], 4, -378558);
    i = md5_hh(i, b, c, d, a[t + 8], 11, -2022574463);
    d = md5_hh(d, i, b, c, a[t + 11], 16, 1839030562);
    c = md5_hh(c, d, i, b, a[t + 14], 23, -35309556);
    b = md5_hh(b, c, d, i, a[t + 1], 4, -1530992060);
    i = md5_hh(i, b, c, d, a[t + 4], 11, 1272893353);
    d = md5_hh(d, i, b, c, a[t + 7], 16, -155497632);
    c = md5_hh(c, d, i, b, a[t + 10], 23, -1094730640);
    b = md5_hh(b, c, d, i, a[t + 13], 4, 681279174);
    i = md5_hh(i, b, c, d, a[t + 0], 11, -358537222);
    d = md5_hh(d, i, b, c, a[t + 3], 16, -722521979);
    c = md5_hh(c, d, i, b, a[t + 6], 23, 76029189);
    b = md5_hh(b, c, d, i, a[t + 9], 4, -640364487);
    i = md5_hh(i, b, c, d, a[t + 12], 11, -421815835);
    d = md5_hh(d, i, b, c, a[t + 15], 16, 530742520);
    c = md5_hh(c, d, i, b, a[t + 2], 23, -995338651);
    b = md5_ii(b, c, d, i, a[t + 0], 6, -198630844);
    i = md5_ii(i, b, c, d, a[t + 7], 10, 1126891415);
    d = md5_ii(d, i, b, c, a[t + 14], 15, -1416354905);
    c = md5_ii(c, d, i, b, a[t + 5], 21, -57434055);
    b = md5_ii(b, c, d, i, a[t + 12], 6, 1700485571);
    i = md5_ii(i, b, c, d, a[t + 3], 10, -1894986606);
    d = md5_ii(d, i, b, c, a[t + 10], 15, -1051523);
    c = md5_ii(c, d, i, b, a[t + 1], 21, -2054922799);
    b = md5_ii(b, c, d, i, a[t + 8], 6, 1873313359);
    i = md5_ii(i, b, c, d, a[t + 15], 10, -30611744);
    d = md5_ii(d, i, b, c, a[t + 6], 15, -1560198380);
    c = md5_ii(c, d, i, b, a[t + 13], 21, 1309151649);
    b = md5_ii(b, c, d, i, a[t + 4], 6, -145523070);
    i = md5_ii(i, b, c, d, a[t + 11], 10, -1120210379);
    d = md5_ii(d, i, b, c, a[t + 2], 15, 718787259);
    c = md5_ii(c, d, i, b, a[t + 9], 21, -343485551);
    b = safe_add(b, r);
    c = safe_add(c, s);
    d = safe_add(d, u);
    i = safe_add(i, v)
  }
  return Array(b, c, d, i)
}
function md5_cmn(a, j, k, l, b, i) {
  return safe_add(bit_rol(safe_add(safe_add(j, a), safe_add(l, i)), b), k)
}
function md5_ff(l, m, a, b, n, c, d) {
  return md5_cmn((m & a) | ((~m) & b), l, m, n, c, d)
}
function md5_gg(l, m, a, b, n, c, d) {
  return md5_cmn((m & b) | (a & (~b)), l, m, n, c, d)
}
function md5_hh(l, m, a, b, n, c, d) {
  return md5_cmn(m ^ a ^ b, l, m, n, c, d)
}
function md5_ii(l, m, a, b, n, c, d) {
  return md5_cmn(a ^ (m | (~b)), l, m, n, c, d)
}
function safe_add(f, g) {
  var h = (f & 65535) + (g & 65535);
  var e = (f >> 16) + (g >> 16) + (h >> 16);
  return (e << 16) | (h & 65535)
}
function bit_rol(d, c) {
  return (d << c) | (d >>> (32 - c))
};

module.exports = {
  hex_md5: hex_md5
}
