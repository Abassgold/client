/** @type {import('next-sitemap').IConfig} */
const nextSitemap = {
  siteUrl: 'https://www.flozap.com.ng', 
  generateRobotsTxt: true,         
  exclude: ['/admin', '/api/*'], 
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',                        
        disallow: ['/admin', '/api/*'],  
      },
    ],
    additionalSitemaps: [
      'https://www.flozap.com.ng/sitemap.xml',
    ],
  },
};

export default nextSitemap;
