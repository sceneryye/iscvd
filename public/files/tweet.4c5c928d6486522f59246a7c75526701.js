__twttrll([6],{162:function(t,e){function r(t){return a.test(t)}var a=/^(dark|light)$/;t.exports=r},167:function(t,e,r){function a(t){t.selectors({fullTimestampToLocalize:".long-permalink time",relativeTimestampToLocalize:".permalink time"}),t.after("prepForInsertion",function(t){var e=o(this.el);e&&(this.select(t,"fullTimestampToLocalize").forEach(function(t){var r=t.getAttribute("datetime"),a=r&&e.localTimeStamp(r);a&&(t.innerHTML=a)}),this.select(t,"relativeTimestampToLocalize").forEach(function(t){var r=t.getAttribute("datetime"),a=r&&e.timeAgo(r);a&&(t.innerHTML=a)}))}),t.define("updateRelativeTimestamps",function(){var t=o(this.el);if(t){var e=this.select("relativeTimestampToLocalize").reduce(function(e,r){var a=r.getAttribute("datetime"),i=a&&t.timeAgo(a);return i&&e.push(function(){r.innerHTML=i}),e},[]);return i.all(e.map(n.write))}}),t.after("render",function(){var t=this;s.setInterval(function(){t.updateRelativeTimestamps()},d)})}var i=r(2),n=r(46),s=r(7),o=r(168),d=6e4;t.exports=a},168:function(t,e,r){function a(t){return new n(i.compact({months:(t.getAttribute("data-dt-months")||"").split("|"),phrases:{AM:t.getAttribute("data-dt-am"),PM:t.getAttribute("data-dt-pm"),now:t.getAttribute("data-dt-now"),s:t.getAttribute("data-dt-s"),m:t.getAttribute("data-dt-m"),h:t.getAttribute("data-dt-h"),second:t.getAttribute("data-dt-second"),seconds:t.getAttribute("data-dt-seconds"),minute:t.getAttribute("data-dt-minute"),minutes:t.getAttribute("data-dt-minutes"),hour:t.getAttribute("data-dt-hour"),hours:t.getAttribute("data-dt-hours")},formats:{full:t.getAttribute("data-dt-full"),abbr:t.getAttribute("data-dt-abbr"),shortdate:t.getAttribute("data-dt-short"),longdate:t.getAttribute("data-dt-long")}}))}var i=r(14),n=r(169);t.exports=a},169:function(t,e){function r(t){return 10>t?"0"+t:t}function a(t){function e(t,e){return i&&i[t]&&(t=i[t]),t.replace(/%\{([\w_]+)\}/g,function(t,r){return void 0!==e[r]?e[r]:t})}var i=t&&t.phrases,n=t&&t.months||o,s=t&&t.formats||d;this.timeAgo=function(t){var r,i=a.parseDate(t),o=+new Date,d=o-i;return i?isNaN(d)||2*l>d?e("now"):c>d?(r=Math.floor(d/l),e(s.abbr,{number:r,symbol:e(f,{abbr:e("s"),expanded:e(r>1?"seconds":"second")})})):u>d?(r=Math.floor(d/c),e(s.abbr,{number:r,symbol:e(f,{abbr:e("m"),expanded:e(r>1?"minutes":"minute")})})):h>d?(r=Math.floor(d/u),e(s.abbr,{number:r,symbol:e(f,{abbr:e("h"),expanded:e(r>1?"hours":"hour")})})):365*h>d?e(s.shortdate,{day:i.getDate(),month:e(n[i.getMonth()])}):e(s.longdate,{day:i.getDate(),month:e(n[i.getMonth()]),year:i.getFullYear().toString().slice(2)}):""},this.localTimeStamp=function(t){var i=a.parseDate(t),o=i&&i.getHours();return i?e(s.full,{day:i.getDate(),month:e(n[i.getMonth()]),year:i.getFullYear(),hours24:r(o),hours12:13>o?o?o:"12":o-12,minutes:r(i.getMinutes()),seconds:r(i.getSeconds()),amPm:e(12>o?"AM":"PM")}):""}}var i=/(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,n=/[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,s=/^\d+$/,o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],d={abbr:"%{number}%{symbol}",shortdate:"%{day} %{month}",longdate:"%{day} %{month} %{year}",full:"%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"},l=1e3,c=60*l,u=60*c,h=24*u,f='<abbr title="%{expanded}">%{abbr}</abbr>';a.parseDate=function(t){var e,r,a=t||"",d=a.toString();return(e=function(){var t;return s.test(d)?parseInt(d,10):(t=d.match(n))?Date.UTC(t[7],o.indexOf(t[1]),t[2],t[3],t[4],t[5]):(t=d.match(i))?Date.UTC(t[1],t[2]-1,t[3],t[4],t[5],t[6]):void 0}())?(r=new Date(e),!isNaN(r.getTime())&&r):!1},t.exports=a},170:function(t,e,r){function a(t){t.selectors({followButton:".follow-button"}),t.define("handleFollowButtonClick",function(t,e){var r=n.intentForFollowURL(e.href),a=s.asBoolean(e.getAttribute("data-age-gate"));a||i.open(r,this.sandbox.sandboxEl,t)}),t.after("render",function(){this.on("click","followButton",function(t,e){this.handleFollowButtonClick(t,e)})})}var i=r(26),n=r(27),s=r(15);t.exports=a},171:function(t,e,r){function a(t){t.selectors({gifPlayer:".GifPlayer, .MediaPlayer",gifPlayerVideo:".GifPlayer-video, .MediaPlayer-video",gifPlayerPlayButton:".GifPlayer-playButton, .MediaPlayer-playButton"}),t.after("prepForInsertion",function(t){var e=this;this.select(t,"gifPlayer").forEach(function(t){new i({rootEl:t,videoEl:e.selectOne(t,"gifPlayerVideo"),playButtonEl:e.selectOne(t,"gifPlayerPlayButton"),fallbackUrl:t.getAttribute("data-fallback-url")})})})}var i=r(172);t.exports=a},172:function(t,e,r){function a(t){t=i.parse(t),this.rootEl=t.rootEl,this.videoEl=t.videoEl,this.playButtonEl=t.playButtonEl,this.fallbackUrl=t.fallbackUrl,this.player=new l({videoEl:this.videoEl,loop:!0,autoplay:!1}),this._attachClickListener()}var i,n=r(24),s=r(23),o=r(130),d=r(30),l=r(128);i=(new d).require("rootEl","videoEl","playButtonEl").defaults({fallbackUrl:null}),a.prototype._attachClickListener=function(){function t(t){s.stopPropagation(t),e._togglePlayer()}var e=this;this.videoEl.addEventListener("click",t,!1),this.playButtonEl.addEventListener("click",t,!1)},a.prototype._togglePlayer=function(){return this.player.hasPlayableSource()?(this.player.toggle(),void n.toggle(this.rootEl,"is-playing",!this.player.isPaused())):void(this.fallbackUrl&&o(this.fallbackUrl))},t.exports=a},173:function(t,e,r){function a(t){t.selectors({mediaCard:".MediaCard",mediaCardNsfwDismissalTarget:".MediaCard-dismissNsfw"}),t.define("dismissNsfwWarning",function(t,e){var r=i.closest(this.selectors.mediaCard,e,this.el);r&&n.remove(r,"is-nsfw")}),t.after("render",function(){this.on("click","mediaCardNsfwDismissalTarget",this.dismissNsfwWarning)})}var i=r(25),n=r(24);t.exports=a},174:function(t,e,r){function a(t){function e(t){var e=t.createElement("div");return e.className="MediaCard-mediaAsset",e}function r(t){return u.url(t,p)}t.params({lang:{required:!0,transform:l.matchLanguage,fallback:"en"}}),t.selectors({mediaAsset:".MediaCard-mediaAsset",cardInterstitial:".js-cardPlayerInterstitial",wvpInterstitial:".js-playableMediaInterstitial",tweetIdInfo:".js-tweetIdInfo"}),t.define("replaceInterstitialWithMedia",function(t,e){return f.all([this.restoreLastMediaInterstitial(),c.write(function(){i=t,n=t.parentNode,t.parentNode.replaceChild(e,t)})])}),t.define("restoreLastMediaInterstitial",function(){var t;return i&&n?(t=n.firstElementChild,h.remove(t),c.write(function(){n.replaceChild(i,t)})):f.resolve()}),t.define("displayWebVideoPlayerMediaAsset",function(t,r){var a=d.closest(this.selectors.mediaAsset,r,this.el),i=d.closest(this.selectors.tweetIdInfo,r,this.el),n=i.getAttribute("data-tweet-id"),s=(this.scribeNamespace()||{}).page,o=this.params.lang,l=e(this.sandbox),c=this.sandbox.createElement("div");return n?(t.preventDefault(),c.className="wvp-player-container",l.appendChild(c),this.replaceInterstitialWithMedia(a,l).then(function(){var t=h.insert(l,n,s,o);t&&t.on("ready",t.play)})):f.reject(new Error("No Tweet ID for player"))}),t.define("displayIframeMediaAsset",function(t,a){var i,n,l=d.closest(this.selectors.mediaAsset,a,this.el),u=d.closest(this.selectors.cardInterstitial,a,this.el),h=u.getAttribute("data-player-src"),p=u.getAttribute("data-player-width"),b=u.getAttribute("data-player-height"),v=u.getAttribute("data-player-title");return h?(t.preventDefault(),h=r(h),i=e(this.sandbox),n=o({src:h,allowfullscreen:"true",width:p,height:b,title:v||""}),n.className="FilledIframe",i.appendChild(n),this.replaceInterstitialWithMedia(l,i).then(function(){n.focus(),c.write(function(){s.add(i,m),s.add(n,m)})})):f.reject(new Error("No Player frame source"))}),t.after("render",function(){this.on("click","cardInterstitial",this.displayIframeMediaAsset),this.on("click","wvpInterstitial",this.displayWebVideoPlayerMediaAsset)})}var i,n,s=r(24),o=r(52),d=r(25),l=r(87),c=r(46),u=r(28),h=r(175),f=r(2),p={autoplay:"1"},m="js-forceRedraw";t.exports=a},175:function(t,e,r){function a(t,e,r,a){var i=t.querySelector(".wvp-player-container");return i?(s&&n.setBaseUrl(s),n.createPlayerForTweet(i,e,{scribeContext:{client:"tfw",page:r},languageCode:a})):void 0}function i(t){var e=t.querySelector(".wvp-player-container"),r=e&&n.findPlayerForElement(e);return r?r.teardown():void 0}var n=r(176),s=null;t.exports={insert:a,remove:i}},176:function(t,e,r){var a;!function(i,n){a=function(){return i.TwitterVideoPlayer=n()}.call(e,r,e,t),!(void 0!==a&&(t.exports=a))}(this,function(){function t(t){if(t&&t.data&&t.data.params&&t.data.params[0]){var e=t.data.params[0],r=t.data.id;if(e&&e.context&&"TwitterVideoPlayer"===e.context){var a=e.playerId;delete e.playerId,delete e.context;var i=o[a];i&&i.processMessage(t.data.method,e,r)}}}function e(t,e,r){var a=Object.keys(r).filter(function(t){return null!=r[t]}).map(function(t){var e=r[t];return encodeURIComponent(t)+"="+encodeURIComponent(e)}).join("&");return a&&(a="?"+a),t+e+a}function r(r,i,n,d,l){var c=r.ownerDocument,u=c.defaultView;u.addEventListener("message",t),this.playerId=s++;var h={embed_source:"clientlib",player_id:this.playerId,rpc_init:1};if(this.scribeParams={},this.scribeParams.suppressScribing=d&&d.suppressScribing,!this.scribeParams.suppressScribing){if(!d.scribeContext)throw"video_player: Missing scribe context";if(!d.scribeContext.client)throw"video_player: Scribe context missing client property";this.scribeParams.client=d.scribeContext.client,this.scribeParams.page=d.scribeContext.page,this.scribeParams.section=d.scribeContext.section,this.scribeParams.component=d.scribeContext.component}this.scribeParams.debugScribe=d&&d.scribeContext&&d.scribeContext.debugScribing,this.scribeParams.scribeUrl=d&&d.scribeContext&&d.scribeContext.scribeUrl,this.promotedLogParams=d.promotedContext,this.adRequestCallback=d.adRequestCallback,d.languageCode&&(h.language_code=d.languageCode);var f=e(a,i,h);return this.videoIframe=document.createElement("iframe"),this.videoIframe.setAttribute("src",f),this.videoIframe.setAttribute("allowfullscreen",""),this.videoIframe.setAttribute("id",n),this.videoIframe.setAttribute("style","width: 100%; height: 100%; position: absolute; top: 0; left: 0;"),this.domElement=r,this.domElement.appendChild(this.videoIframe),o[this.playerId]=this,this.eventCallbacks={},this.emitEvent=function(t,e){var r=this.eventCallbacks[t];"undefined"!=typeof r&&r.forEach(function(t){t.apply(this.playerInterface,[e])}.bind(this))},this.jsonRpc=function(t){var e=this.videoIframe.contentWindow;t.jsonrpc="2.0",e.postMessage(JSON.stringify(t),"*")},this.jsonRpcCall=function(t,e){this.jsonRpc({method:t,params:e})},this.jsonRpcResult=function(t,e){this.jsonRpc({result:t,id:e})},this.processMessage=function(t,e,r){switch(t){case"requestPlayerConfig":this.jsonRpcResult({scribeParams:this.scribeParams,promotedLogParams:this.promotedLogParams,squareCorners:d.squareCorners,hideControls:d.hideControls},r);break;case"videoPlayerPlaybackComplete":this.emitEvent("playbackComplete",e);break;case"videoPlayerReady":this.emitEvent("ready",e);break;case"videoView":this.emitEvent("view",e);break;case"debugLoggingEvent":this.emitEvent("logged",e);break;case"requestDynamicAd":"function"==typeof this.adRequestCallback?this.jsonRpcResult(this.adRequestCallback(),r):this.jsonRpcResult({},r)}},this.playerInterface={on:function(t,e){return"undefined"==typeof this.eventCallbacks[t]&&(this.eventCallbacks[t]=[]),this.eventCallbacks[t].push(e),this.playerInterface}.bind(this),off:function(t,e){if("undefined"==typeof e)delete this.eventCallbacks[t];else{var r=this.eventCallbacks[t];if("undefined"!=typeof r){var a=r.indexOf(e);a>-1&&r.splice(a,1)}}return this.playerInterface}.bind(this),play:function(){return this.jsonRpcCall("play"),this.playerInterface}.bind(this),pause:function(){return this.jsonRpcCall("pause"),this.playerInterface}.bind(this),mute:function(){return this.jsonRpcCall("mute"),this.playerInterface}.bind(this),unmute:function(){return this.jsonRpcCall("unmute"),this.playerInterface}.bind(this),playPreview:function(){return this.jsonRpcCall("autoPlayPreview"),this.playerInterface}.bind(this),pausePreview:function(){return this.jsonRpcCall("autoPlayPreviewStop"),this.playerInterface}.bind(this),updatePosition:function(t){return this.jsonRpcCall("updatePosition",[t]),this.playerInterface}.bind(this),teardown:function(){this.eventCallbacks={},r.removeChild(this.videoIframe),this.videoIframe=void 0,delete o[this.playerId]}.bind(this)},this.playerInterface}var a="https://twitter.com",i=/^https?:\/\/([a-zA-Z0-9]+\.)*twitter.com(:\d+)?$/,n={suppressScribing:!1,squareCorners:!1,hideControls:!1},s=0,o={};return{setBaseUrl:function(t){i.test(t)?a=t:window.console.error("newBaseUrl "+t+" not allowed")},createPlayerForTweet:function(t,e,a){var i="/i/videos/tweet/"+e,s="player_tweet_"+e;return new r(t,i,s,a||n)},createPlayerForDm:function(t,e,a){var i="/i/videos/dm/"+e,s="player_dm_"+e;return new r(t,i,s,a||n)},findPlayerForElement:function(t){for(var e in o)if(o.hasOwnProperty(e)){var r=o[e];if(r&&r.domElement===t)return r.playerInterface}return null}}})},178:function(t,e,r){function a(t){for(var e="",r=Math.floor(t/u),a=r;a>0;a--)e+="w"+a*u+" ";return e}function i(t){t.selectors({prerenderedCard:".PrerenderedCard",rootCardEl:".TwitterCard .CardContent > *:first-child"}),t.define("scribeCardShown",function(t){var e=2;this.scribe({component:"card",action:"shown"},{items:[{card_name:t.getAttribute("data-card-name")}]},e)}),t.define("resizeSandboxDueToLoadedCard",function(){this.sandbox.matchHeightToContent()}),t.define("displayCardEl",function(t){function e(){a&&r.resizeSandboxDueToLoadedCard()}var r=this,a=!1;return this.select(t,"img").forEach(function(t){t.addEventListener("load",e,!1)}),this.scribeCardShown(t),s.write(function(){n.add(t,"is-ready")}).then(function(){a=!0,r.resizeSandboxDueToLoadedCard()})}),t.define("updateCardBreakpoints",function(){var t=this;return d.all(this.select("prerenderedCard").map(function(e){var r,i=t.selectOne(e,"rootCardEl");return i?(s.read(function(){var t=o(e).width;r=a(t)}),s.write(function(){i.setAttribute(h,r)})):d.resolve()}))}),t.define("setCardTheme",function(t){var e=this.selectOne(t,"rootCardEl");this.params.theme&&e.setAttribute(f,this.params.theme)}),t.after("prepForInsertion",function(t){var e=this,r=this.select(t,"prerenderedCard").reduce(function(t,e){var r=e.getAttribute("data-css");return r&&(t[r]=t[r]||[],t[r].push(e)),t},{});l.forIn(r,function(t,r){e.sandbox.prependStyleSheet(t).then(function(){r.forEach(function(t){e.setCardTheme(t),e.displayCardEl(t)})})})}),t.after("render",function(){return this.updateCardBreakpoints()}),t.after("resize",function(){return this.updateCardBreakpoints()})}var n=r(24),s=r(46),o=r(66),d=r(2),l=r(14),c=r(79),u=50,h="data-card-breakpoints",f="data-theme";t.exports=c.couple(r(90),i)},185:function(t,e){function r(t){return a.test(t)}var a=/^#(?:[a-f\d]{3}){1,2}$/i;t.exports=r},187:function(t,e,r){function a(t){return d.parseInt(t,16)}function i(t){return l.isType("string",t)?(t=t.replace(c,""),t+=3===t.length?t:""):null}function n(t,e){var r,n,s,o;return t=i(t),e=e||0,t?(r=0>e?0:255,e=0>e?-Math.max(e,-1):Math.min(e,1),n=a(t.substring(0,2)),s=a(t.substring(2,4)),o=a(t.substring(4,6)),"#"+(16777216+65536*(Math.round((r-n)*e)+n)+256*(Math.round((r-s)*e)+s)+(Math.round((r-o)*e)+o)).toString(16).slice(1)):void 0}function s(t,e){return n(t,-e)}function o(t,e){return n(t,e)}var d=r(7),l=r(14),c=/^#/;t.exports={darken:s,lighten:o}},188:function(t,e,r){function a(t){t.after("render",function(){var t,e=this.sandbox.sandboxEl,r=e.tagName;return n(e,"td "+r)?(t=i.closest("td",e),this.sandbox.styleSelf({maxWidth:t.clientWidth+"px"})):void 0})}var i=r(25),n=r(74);t.exports=a},192:function(t,e,r){var a=r(79);t.exports=a.build([r(193),r(132),r(135),r(137),r(119),r(167),r(200),r(121),r(122),r(115),r(118),r(170),r(171),r(178),r(174),r(173),r(201),r(131),r(129),r(123),r(124),r(138),r(188)],{pageForAudienceImpression:"tweet",productName:"tweetembed",breakpoints:{350:"env-wide"}})},193:function(t,e,r){function a(t){var e={item_ids:[],item_details:{}};return e.item_ids.push(t),e.item_details[t]={item_type:y.TWEET},e}function i(t,e){var r={item_ids:[],item_details:{},associations:{}};return r.item_ids.push(e),r.item_details[e]={item_type:y.TWEET},r.associations[w.CONVERSATION_ORIGIN]={association_id:t,association_type:y.TWEET},r}function n(t){t.params({tweetId:{required:!0,validate:p},lang:{required:!0,transform:m.matchLanguage,fallback:"en"},width:{required:!0,fallback:"500px",validate:f,transform:f},theme:{fallback:[h(d.val,d,"widgets:theme"),"light"],validate:b},hideCard:{fallback:!1,transform:l.asBoolean},hideThread:{fallback:!1,transform:l.asBoolean},partner:{fallback:h(d.val,d,"partner")}}),t.selectors({ancestorTweet:".EmbeddedTweet-ancestor .Tweet",subjectTweet:".EmbeddedTweet-tweet .Tweet"}),t.around("scribeNamespace",function(t){return c.aug(t(),{page:"tweet"})}),t.around("scribeData",function(t){return c.aug(t(),{message:this.params.partner})}),t.around("widgetDataAttributes",function(t){return c.aug({"tweet-id":this.params.tweetId},t())}),t.define("scribeImpressionForTweets",function(){var t=this.selectOne("subjectTweet"),e=this.selectOne("ancestorTweet"),r=t&&t.getAttribute("data-tweet-id"),n=e&&e.getAttribute("data-tweet-id");r&&this.scribe({section:"subject",component:"tweet",action:"results"},a(r)),r&&n&&this.scribe({section:"conversation",component:"tweet",action:"results"},i(r,n))}),t.override("hydrate",function(){function t(t){i.html=t}function e(t){return i.scribe({section:"subject",component:"rawembedcode",action:"no_result"},a(i.params.tweetId)),s.reject(t)}var r,i=this;return r={lang:this.params.lang,hideCard:this.params.hideCard,hideThread:this.params.hideThread},v(this.params.tweetId,r).then(t,e)}),t.override("render",function(){var t=this;return this.el=this.sandbox.htmlToElement(this.html),this.el?(this.el.id=this.id,this.el.lang=this.params.lang,this.scribeImpressionForTweets(),g.insert(this.el,this.params.tweetId,this.scribeNamespace().page,this.params.lang),s.all([this.sandbox.appendStyleSheet(o.tweet(this.params.lang,this.params.theme)),this.sandbox.styleSelf({maxWidth:x,width:this.params.width,minWidth:C,marginTop:I,marginBottom:I})]).then(function(){return t.prepForInsertion(t.el),t.sandbox.injectWidgetEl(t.el)})):s.reject(new Error("unable to render"))}),t.override("show",function(){var t=this.sandbox;return this.sandbox.makeVisible().then(function(){return t.matchHeightToContent()})}),t.last("resize",function(){return this.sandbox.matchHeightToContent()})}var s=r(2),o=r(105),d=r(16),l=r(15),c=r(14),u=r(79),h=r(20),f=r(113),p=r(194),m=r(87),b=r(162),v=r(195),g=r(175),w=r(199),y=r(112),C="220px",x="100%",I="10px";t.exports=u.couple(r(90),r(91),n)},194:function(t,e,r){function a(t){return i.isType("string",t)}var i=r(14);t.exports=a},195:function(t,e,r){function a(t,e,r){var a="";return e&&(a+="c"),r&&(a+="t"),a?t+"-"+a:t}function i(t,e){return e=e||{},t=a(t,e.hideCard,e.hideThread),l.fetch(t,e.lang)}var n=r(196),s=r(17),o="https://syndication.twitter.com/tweets.json",d=s.get("endpoints.tweets")||o,l=new n(d);t.exports=i},196:function(t,e,r){function a(t){return t.input.lang||m}function i(t,e){var r={ids:[],lang:t};return r=e.reduce(function(t,e){return t.ids.push(e.input.id),t},r),r.ids=r.ids.sort().join(","),r}function n(t,e){t.forEach(function(t){var r=e[t.input.id];r?t.taskDoneDeferred.resolve(r):t.taskDoneDeferred.reject(new Error("not found"))})}function s(t){t.forEach(function(t){t.taskDoneDeferred.reject(new Error("request failed"))})}function o(t,e){var r=u(e,a);f.forIn(r,function(e,r){var a=i(e,r),o=p(n,null,r),d=p(s,null,r);c.fetch(t,a,l).then(o,d)})}function d(t){this.requestQueue=new h(p(o,null,t))}var l=r(197),c=r(108),u=r(198),h=r(48),f=r(14),p=r(20),m="en";d.prototype.fetch=function(t,e){return this.requestQueue.add({id:t,lang:e})},t.exports=d},197:function(t,e){function r(t){return{success:!0,resp:t}}t.exports=r},198:function(t,e){function r(t,e){return t.reduce(function(t,r){var a=e(r);return t[a]=t[a]||[],t[a].push(r),t},{})}t.exports=r},199:function(t,e){t.exports={CONVERSATION_ORIGIN:4}},200:function(t,e,r){function a(t){return[l+"{color:"+t+";}",c+"{color:"+s.lighten(t,.2)+";}"].join("")}function i(t){t.params({linkColor:{fallback:d(n.val,n,"widgets:link-color"),validate:o}}),t.after("render",function(){this.params.linkColor&&this.sandbox.appendCss(a(this.params.linkColor))})}var n=r(16),s=r(187),o=r(185),d=r(20),l="a, a:visited",c="a:hover, a:focus, a:active";t.exports=i},201:function(t,e,r){function a(t){t.params({align:{required:!1},width:{required:!1},floatedWidth:{fallback:"350px",validate:i},centeredWidth:{fallback:"70%",validate:i}}),t.before("render",function(){var t,e,r,a,i=this.params.align;switch(i&&i.toLowerCase()){case"center":t=this.params.width||this.params.centeredWidth,e="auto",r="auto";break;case"left":t=this.params.width||this.params.floatedWidth,r="10px",a="left";break;case"right":t=this.params.width||this.params.floatedWidth,e="10px",a="right";break;default:return}return this.sandbox.styleSelf({width:t,marginLeft:e,marginRight:r,cssFloat:a})})}var i=r(194);t.exports=a},210:function(t,e,r){var a=r(79);t.exports=a.build([r(211),r(123),r(135),r(133),r(138)],{pageForAudienceImpression:"video"})},211:function(t,e,r){function a(t){var e={item_ids:[],item_details:{}};return e.item_ids.push(t),e.item_details[t]={item_type:m.TWEET},e}function i(t){t.params({tweetId:{required:!0,validate:c},lang:{required:!0,transform:u.matchLanguage,fallback:"en"},hideStatus:{fallback:!1,transform:d.asBoolean},partner:{fallback:v(b.val,b,"partner")}}),t.around("scribeNamespace",function(t){return p.aug(t,{page:"video"})}),t.around("scribeData",function(t){return p.aug(t(),{message:this.params.partner})}),t.around("widgetDataAttributes",function(t){return p.aug({"tweet-id":this.params.tweetId},t())}),t.define("scribeImpressionForTweet",function(){this.scribe({component:"tweet",action:"results"},a(this.params.tweetId))}),t.override("hydrate",function(){function t(t){i.html=t}function e(t){return i.scribe({component:"rawembedcode",action:"no_result"},a(i.params.tweetId)),s.reject(t)}var r,i=this;return r={lang:this.params.lang},h(this.params.tweetId,r).then(t,e)}),t.define("updatePlayerConfig",function(){var t=this.el.getAttribute("data-datetime"),e=f(this.el),r=t&&e.localTimeStamp(t),a=n.parse(this.el.getAttribute("data-player-config"));a.statusTimestamp={local:r},a.hideStatus=this.params.hideStatus,this.el.setAttribute("data-player-config",n.stringify(a))}),t.override("render",function(){var t,e=this;return this.el=this.sandbox.htmlToElement(this.html),this.scribeImpressionForTweet(),this.el?(this.updatePlayerConfig(),t=this.el.children[0],s.all([this.sandbox.setWrapperSize(t.getAttribute("data-width"),t.getAttribute("data-height")),this.sandbox.appendStyleSheet(o.video(this.params.lang))]).then(function(){return e.prepForInsertion(e.el),e.sandbox.injectWidgetEl(e.el)})):s.reject(new Error("unable to render"))}),t.override("show",function(){return this.sandbox.makeVisible()})}var n=r(41),s=r(2),o=r(105),d=r(15),l=r(79),c=r(194),u=r(87),h=r(212),f=r(168),p=r(14),m=r(112),b=r(16),v=r(20);t.exports=l.couple(r(90),r(91),i)},212:function(t,e,r){function a(t,e){var r=e&&e.lang;return d.fetch(t,r)}var i=r(196),n=r(17),s="https://syndication.twitter.com/widgets/video/",o=n.get("endpoints.videos")||s,d=new i(o);t.exports=a}});