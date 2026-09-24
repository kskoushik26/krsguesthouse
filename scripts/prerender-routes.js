const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const buildDir = path.join(appRoot, 'build');
const appHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

const routes = [
  { path: '/', title: 'KRS Guest House | Rooms Near Siganduru Temple, Karnataka' },
  { path: '/attraction', title: 'Places to Visit Near Siganduru, Karnataka | KRS Guest House' },
  { path: '/location', title: 'KRS Guest House Location | Rooms Near Siganduru Temple' },
  { path: '/contact', title: 'Contact KRS Guest House | Book Rooms in Siganduru' },
  { path: '/details', title: 'Rooms and Amenities | KRS Guest House, Siganduru Karnataka' },
  { path: '/enquiry', title: 'Room Enquiry | KRS Guest House Near Siganduru Temple' },
];

function createPrerenderedPage(route) {
  const pageHtml = appHtml
    .replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/i,
      '<meta name="description" content="Looking for rooms or a budget hotel stay near Siganduru Temple? KRS Guest House in Siganduru, Karnataka offers clean rooms, hot water, free parking, and family-friendly accommodation." />'
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
