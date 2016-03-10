

    usi_alert = function(msg) {}



var usi_error_submits = 0;
function usi_stopError(usi_msg, usi_url, usi_linenumber) {
	if (usi_url.indexOf("upsellit.com") != -1 && usi_url.indexOf("err.jsp") == -1 && usi_error_submits < 5) {
		usi_error_submits++;
		var USI_headID = document.getElementsByTagName("head")[0];
		var USI_errorScript = document.createElement('script');
		USI_errorScript.type = 'text/javascript';
		USI_errorScript.src = '//www.upsellit.com/err.jsp?oops='+escape(usi_msg)+'-'+escape(usi_url)+'-'+escape(usi_linenumber);
		USI_headID.appendChild(USI_errorScript);
	}
	return true;
}
if (location.href.indexOf("usishowerrors") == -1) {
	window.onerror = usi_stopError;
}
USI_setSessionValue = function(name, value) {
	try {
		var usi_win = window.top || window;
		var usi_found = 0;
		var usi_allValues = usi_win.name.split(";");
		var usi_newValues = "";
		for (var i=0; i<usi_allValues.length;i++) {
			var usi_theValue = usi_allValues[i].split("=");
			if (usi_theValue.length == 2) {
				if (usi_theValue[0] == name) {
					usi_theValue[1] = value;
					usi_found = 1;
				}
				if (usi_theValue[1] != null) {
					usi_newValues += usi_theValue[0] + "=" + usi_theValue[1] + ";";
				}
			} else if (usi_allValues[i] != "") {
				usi_newValues += usi_allValues[i] + ";";
			}
		}
		if (usi_found == 0) {
			usi_newValues += name + "=" + value + ";";
		}
		usi_win.name = usi_newValues;
	} catch (e) {}
}
USI_getWindowNameValue = function(name) {
	try {
		var usi_win = window.top || window;
		var usi_allValues = usi_win.name.split(";");
		for (var i=0; i<usi_allValues.length;i++) {
			var usi_theValue = usi_allValues[i].split("=");
			if (usi_theValue.length == 2) {
				if (usi_theValue[0] == name) {
					return usi_theValue[1];
				}
			}
		}
	} catch (e) {}
	return null;
}
USI_createCookie = function(name,value,seconds) {
	if (name == "USI_Session" || typeof(usi_cookieless) === "undefined") {
		var date = new Date();
		date.setTime(date.getTime()+(seconds*1000));
		var expires = "; expires="+date.toGMTString();
		if (typeof(usi_parent_domain) != "undefined" && document.domain.indexOf(usi_parent_domain) != -1) {
			document.cookie = name+"="+value+expires+"; path=/;domain="+usi_parent_domain+";";
		} else {
			document.cookie = name+"="+value+expires+"; path=/;domain="+document.domain+";";
		}
	}
}
USI_readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
var USI_local_cache = {};
USI_getASession = function(name) {
	if (typeof(name) == "undefined") {
		name = "USI_Session";
	}
	if (typeof(USI_local_cache[name]) != "undefined") {
		return USI_local_cache[name];
	}
	var usi_win = window.top || window;
	var USI_Session = USI_readCookie(name);
	if (USI_Session == null || USI_Session == 'null' || USI_Session == '') {
		//Link followed cookie?
		USI_Session = USI_readCookie("USIDataHound");
		if (USI_Session != null) {
			USI_createCookie("USI_Session", USI_Session, 7*24*60*60);
		}
	}
	if (USI_Session == null || USI_Session == 'null' || USI_Session == '') {
		//fix for pre-variable stuff
		try {
			if (usi_win.name.indexOf("dh_") == 0) {
				usi_win.name = "USI_Session="+usi_win.name+";";
			}
			USI_Session = USI_getWindowNameValue(name);
		} catch (e) {}
	}
	if (USI_Session == null || USI_Session == 'null' || USI_Session == '') {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 4;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		if (name == "USI_Session") {
			USI_Session = "dh_" + randomstring + "" + (new Date()).getTime();
			USI_createCookie("USI_Session", USI_Session, 7*24*60*60);
			USI_setSessionValue("USI_Session", USI_Session);
		} else {
			USI_Session = name + "_" + randomstring + "" + (new Date()).getTime();
			USI_createCookie(name, USI_Session, 7*24*60*60);
			USI_setSessionValue(name, USI_Session);
		}
	}
	USI_local_cache[name] = USI_Session;
	return USI_Session;
}
USI_deleteVariable = function(name) {
	USI_updateASession(name, null, -100);
}
USI_getSessionValue = function(name) {
	if (typeof(USI_local_cache[name]) != "undefined" && USI_local_cache[name] != null) {
		return USI_local_cache[name];
	}
	var usi_value = USI_readCookie(name);
	if (usi_value == null) {
		usi_value = USI_getWindowNameValue(name);
	}
	if (usi_value != null) {
		USI_updateASession(name, usi_value, 7*24*60*60);
		USI_local_cache[name] = usi_value;
	}
	return usi_value;
}
USI_updateASession = function(name, value, exp_seconds) {
	try {
		value = value.replace(/(\r\n|\n|\r)/gm,"");
	} catch(e) {}
	USI_createCookie(name, value, exp_seconds);
	USI_setSessionValue(name, value);
	USI_local_cache[name] = value;
}
// <script>

var USIqs = "";
var USIsiteID = "";
var USI_key = "";
var USIDHqs = "";
var USIDHsiteID = "";
var usi_url = location.href.toLowerCase();

try{
    if (USI_getSessionValue("usi_page_visits") == null) {
        var usi_page_visits = Number(1);
        USI_updateASession("usi_page_visits", "1", 86400*1);
    } else {
        var usi_page_visits = USI_getSessionValue("usi_page_visits");
        usi_page_visits = Number(usi_page_visits) + Number(1);
        USI_updateASession("usi_page_visits", usi_page_visits, 86400*1);
    }
	if (usi_url.indexOf("paleoplan.com/checkout") != -1) {
		USIqs = "263206250266238301344330274300338297300312273344338346272327299";
		USIsiteID = "12490";
	}
}catch (e) {}

if (usi_url.indexOf("paleoplan.com/checkout") != -1) {
    USIDHqs = "225217238239267275306302294289302278321305277281344296300325273";
    USIDHsiteID = "12492";
}

if (USI_readCookie('u-upsellitc12492') == null || location.href.indexOf("showchat") != -1) {
    if (USIqs != "" && usi_url.indexOf("confirmation") == -1) {
        var USI_headID = document.getElementsByTagName("head")[0];
        if (top.location != location) {
            USI_headID = parent.document.getElementsByTagName("head")[0];
        }
        var USI_dynScript = document.createElement("script");
        USI_dynScript.setAttribute("type","text/javascript");
        USI_dynScript.setAttribute("src","//www.upsellit.com/upsellitJS4.jsp?qs="+USIqs+"&siteID="+USIsiteID+"&keys="+USI_key);
        USI_headID.appendChild(USI_dynScript);
    }
}

if (USIDHqs != "") {
    var USI_headID = document.getElementsByTagName("head")[0];
    var USI_dynScript2 = document.createElement("script");
    USI_dynScript2.setAttribute("type","text/javascript");
    USI_dynScript2.setAttribute("src","//www.upsellit.com/hound/monitor.jsp?qs="+USIDHqs+"&siteID="+USIDHsiteID);
    USI_headID.appendChild(USI_dynScript2);
}


