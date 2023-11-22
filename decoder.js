function parseJson(s) {
  let i = 0;
  const e = c => { if(s[i] !== c) throw new Error(`Expected '${c}', found '${s[i]}'`); i++; },
        w = () => { while(/\s/.test(s[i])) i++; },
        d = c => /\d/.test(c);
  function v() {
    w();
    let c = s[i];
    if(c == '{') return o();
    if(c == '[') return a();
    if(c == '"') return st();
    if(c == 't') { e('t'); e('r'); e('u'); e('e'); return true; }
    if(c == 'f') { e('f'); e('a'); e('l'); e('s'); e('e'); return false; }
    if(c == 'n') { e('n'); e('u'); e('l'); e('l'); return null; }
    if(c == '-' || d(c)) return n();
    throw new Error(`Unexpected '${c}'`);
  }
  function o() {
    let r = {}; e('{');
    while(s[i] !== '}') {
      w();
      let k = st(); w(); e(':'); r[k] = v(); w();
      if(s[i] !== ',' && s[i] !== '}') throw new Error(`Unexpected '${s[i]}'`);
      if(s[i] == ',') e(',');
    }
    e('}'); return r;
  }
  function a() {
    let r = []; e('[');
    while(s[i] !== ']') { w(); r.push(v()); w(); if(s[i] !== ',' && s[i] !== ']') throw new Error(`Unexpected '${s[i]}'`); if(s[i] == ',') e(','); }
    e(']'); return r;
  }
  function st() {
    let r = ''; e('"');
    while(s[i] !== '"') {
      if(s[i] === '\\') { i++; r += '\\' + s[i]; }
      else r += s[i];
      i++;
    }
    e('"'); return r;
  }
  function n() {
    let r = '';
    if(s[i] === '-') { r += '-'; i++; }
    while(d(s[i])) { r += s[i]; i++; }
    return parseFloat(r);
  }
  return v();
}

function Lf(t) { return t.replace(/\D/g, ''); }
function Ve(t, e) { return t.split('').map(c => String.fromCharCode(e ^ c.charCodeAt(0))).join(''); }

function decode(idiot, version) {
  try {
    const j = idiot,
          p = parseJson(j), i = atob(p.ob), c = Lf(version);
    return Ve(i, parseInt(c, 10) % 128).split("~~~~");
  } catch (error) {
    // Handle the error and return it
    return { error: error.message };
  }
}

console.log(decode(`your_payload_here`, 'your_version_here'))