# Loyal Cab Service

A responsive, dependency-free website for Loyal Cab in Kozhikode, with local rides, airport transfers, outstation enquiries and Wayanad packages.

## Run

Use Node.js and run `npm run dev`, then open http://localhost:3000. Set `PORT` to override the default. Run `npm run check` for JavaScript syntax validation.

## Booking

The form validates journey details and opens a WhatsApp draft addressed to +91 98957 03350. The customer must send the message; the website does not confirm a booking or take payment. The second contact number is +91 9656 299 679. Both numbers come from the supplied poster. Verify that the primary number has WhatsApp before launch.

## Deployment

Deploy index.html, styles.css, app.js, robots.txt and assets/ to any static host with HTTPS. The included Node server is for local previews. Google Fonts has local font fallbacks. Forest imagery is supplied in assets/forest.jpg and used as illustrative Kerala travel imagery.

Before publishing, set the actual domain in a canonical link, Open Graph URL/image and sitemap.xml, and add the sitemap URL to robots.txt. A domain was not supplied, so no placeholder production URLs are embedded. Add a verified business address, hours and fleet details when available. Do not add unverified ratings or reviews. The page includes crawlable service content, descriptive metadata, TaxiService structured data, semantic headings and FAQ content. Search ranking is not guaranteed.
