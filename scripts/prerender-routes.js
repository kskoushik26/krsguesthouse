const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const buildDir = path.join(appRoot, 'build');
const appHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

const routes = [
  { path: '/', title: 'KRS Guest House near Siganduru Chowdeshwari Temple' },
  { path: '/attraction', title: 'Places to Visit Near Siganduru | KRS Guest House' },
  { path: '/location', title: 'KRS Guest House Location | Near Siganduru Temple, Siganduru' },
  { path: '/contact', title: 'Contact KRS Guest House | Book a Room in Siganduru' },
  { path: '/details', title: 'Rooms and Amenities | KRS Guest House Siganduru' },
  { path: '/enquiry', title: 'Room Enquiry | KRS Guest House Near Siganduru' },
];

function createPrerenderedPage(route) {
  const pageHtml = appHtml
    .replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/i,
      '<meta name="description" content="KRS Guest House offers a comfortable budget stay near Siganduru Chowdeshwari Temple in Siganduru, Karnataka, with clean rooms, hot water, free parking, and family-friendly hospitality." />'
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="https://krsguesthouse.com${route.path}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="https://krsguesthouse.com${route.path}" />`
    );

  return pageHtml;
}

for (const route of routes) {
  const targetDir = path.join(buildDir, route.path.replace(/^\//, ''));
  const targetFile = path.join(targetDir, 'index.html');

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(targetFile, createPrerenderedPage(route), 'utf8');
}

const rootIndexPath = path.join(buildDir, 'index.html');
const rootHtml = createPrerenderedPage({ path: '/', title: routes[0].title });
fs.writeFileSync(rootIndexPath, rootHtml, 'utf8');

console.log('Prerendered route pages:', routes.map((route) => route.path).join(', '));
