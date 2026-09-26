import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Boot } from "@/components/boot";
import appCss from "../styles.css?url";

const APP_NAME = "Sweet Home Collagen Night Mask — нічна маска проти висипань, 299 грн";
// Встав ID TikTok-пікселя для цього сайту. Порожній рядок — піксель не завантажується.
const TIKTOK_PIXEL_ID = "DARRGQJC77U7DBR8C6VG";

const TIKTOK_PIXEL_SNIPPET = `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${TIKTOK_PIXEL_ID}');ttq.page();ttq.track('ViewContent',{content_id:'night-mask',content_type:'product',content_name:'Sweet Home Collagen Night Mask',value:299,currency:'UAH'});}(window,document,'ttq');`;

const FB_PIXEL_ID = "3557729764386334";

const FB_PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('set','autoConfig',false,'${FB_PIXEL_ID}');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');fbq('track','ViewContent',{content_name:'Sweet Home Collagen Night Mask',content_ids:['night-mask'],content_type:'product',value:299,currency:'UAH'});`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Нічна маска Sweet Home з колагеном, центелою та ніацинамідом для чистої шкіри без висипань. 100 мл, 299 грн, оплата при отриманні.",
      },
      { name: "theme-color", content: "#2b2224" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script defer src="/_vercel/insights/script.js" />
        {TIKTOK_PIXEL_ID ? <script dangerouslySetInnerHTML={{ __html: TIKTOK_PIXEL_SNIPPET }} /> : null}
        <script dangerouslySetInnerHTML={{ __html: FB_PIXEL_SNIPPET }} />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </head>
      <body>
        <PreviewHostBridge />
        <Boot />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
