'use strict';
(function(){
let handles = collections.map((obj)=>{
    return obj.handle                      
})
   const timeout = (ms, promise)=> {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"))
      }, ms)
      promise.then(resolve, reject)
    })
  }
  const botCheck = () => {
      const botPattern = "(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
          let re = new RegExp(botPattern, 'i')
          let userAgent = navigator.userAgent;
          if (re.test(userAgent)) {
              return false
          } else {
              return true
          }
  }
  const fetchlocation = async () => {
    try {
      let req = await fetch('https://pro.ip-api.com/json/?key=A6IhMiUJM29i6Pr')
      let locdata = await req.json()
      return locdata.countryCode;
    } catch(e) {
     console.log(e) 
    }
      
  }
    const makemagic = async () => {
      let countrycode = await timeout(1000, fetchlocation());
      let direction = handles.filter((obj)=>{
        if(obj === `best-sellers-${countrycode.toLowerCase()}`){
          return true
        } else {
         return false 
        }
      })[0]
      if (!window.location.href.includes(`/collections/${direction}`) && direction){   
          window.location.href = `/collections/${direction}`
      } else if(!direction || !direction.includes(countrycode.toLowerCase())) {
        if (!window.location.href.includes(`/collections/best-sellers`) || window.location.href.includes(`/collections/best-sellers-`)){
          window.location.href = `/collections/best-sellers`  
        }
      }
    }
  if (window.location.href.includes('/collections/best-sellers') && botCheck()){
    makemagic()
  } else if (!botCheck() && !window.location.href.includes(`/collections/best-sellers`)) {
      window.location.href = `/collections/best-sellers`
  }
})();