import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../public/open/open.js', import.meta.url), 'utf8');
function visit(search, blocked = false) {
  const elements = { status: { textContent: '' }, open: { hidden: true } };
  const navigations = [];
  elements.launcher = { set src(url) {
    if (blocked) throw new Error('User gesture required');
    navigations.push(url);
  } };
  runInNewContext(script, {
    URL, URLSearchParams,
    document: { getElementById: id => elements[id] },
    window: { location: { search } },
  });
  return { ...elements, navigations };
}

test('opens an annotation in the current project and provides the same manual link', () => {
  const target = 'protovibe://annotation/k3f9x2m1qa/a-9z8y7x6w';
  const result = visit('?url=' + encodeURIComponent(target));
  assert.deepEqual(result.navigations, [target]);
  assert.equal(result.open.href, target);
  assert.equal(result.open.hidden, false);
});

test('preserves encoded path, query, plus signs and fragment without decoding twice', () => {
  const target = 'protovibe://example/a%20b?q=a%26b&next=%2Fpath%3Fx%3D1&text=a%2Bb#part';
  const result = visit('?url=' + encodeURIComponent(target));
  assert.deepEqual(result.navigations, [target]);
});

test('rejects missing, ambiguous, malformed and non-Protovibe destinations', () => {
  const invalid = ['', '?url=', '?url=protovibe%ZZ', '?url=protovibe://&url=protovibe://'];
  for (const target of ['https://example.com', '//example.com', 'javascript:alert(1)', 'data:text/html,test', 'file:///tmp/test', 'protovibe:annotation/s/a', 'protovibe://user:pass@annotation/s/a', 'protovibe://annotation:80/s/a', 'protovibe://annotation/s/\na']) {
    invalid.push('?url=' + encodeURIComponent(target));
  }
  for (const query of invalid) {
    const result = visit(query);
    assert.deepEqual(result.navigations, [], query);
    assert.equal(result.open.hidden, true, query);
    assert.equal(result.open.href, undefined, query);
    assert.match(result.status.textContent, /missing or invalid/);
  }
});

test('keeps the manual link available when automatic navigation is blocked', () => {
  const target = 'protovibe://annotation/k3f9x2m1qa/a-9z8y7x6w';
  const result = visit('?url=' + encodeURIComponent(target), true);
  assert.equal(result.open.href, target);
  assert.equal(result.open.hidden, false);
  assert.match(result.status.textContent, /click below/);
});
