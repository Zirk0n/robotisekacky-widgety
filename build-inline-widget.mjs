import { readFile, writeFile } from 'node:fs/promises';

const [css, html, sourceJs] = await Promise.all([
  readFile(new URL('./widget-instalace-clanky.css', import.meta.url), 'utf8'),
  readFile(new URL('./widget-instalace-clanky.html', import.meta.url), 'utf8'),
  readFile(new URL('./widget-instalace-clanky.js', import.meta.url), 'utf8'),
]);

const cssLoaderStart = sourceJs.indexOf('  var cssHref');
const initStart = sourceJs.indexOf('  function init');

if (cssLoaderStart < 0 || initStart < 0) {
  throw new Error('V JavaScriptu widgetu se nepodařilo najít blok externího CSS.');
}

const withoutCssLoader = sourceJs.slice(0, cssLoaderStart) + sourceJs.slice(initStart);
const hydrateStart = withoutCssLoader.indexOf('  function hydrateHosts');
const closureStart = withoutCssLoader.lastIndexOf('})();');

if (hydrateStart < 0 || closureStart < 0) {
  throw new Error('V JavaScriptu widgetu se nepodařilo najít externí hydratační část.');
}

const inlineJs = `${withoutCssLoader.slice(0, hydrateStart)}  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);\n  else initAll();\n${withoutCssLoader.slice(closureStart)}`;
const output = `<style>\n${css}\n</style>\n${html}\n<script>\n${inlineJs}\n</script>\n`;

await writeFile(new URL('./widget-instalace-clanky-inline.html', import.meta.url), output);
