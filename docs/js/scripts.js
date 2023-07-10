'use strict';
// version 1.4

let _q = function(obj) {
	this.obj = obj;
};

_q.prototype._each = function(callback) {
	this.obj.forEach(callback);
	return this;
}

_q.prototype.each = function(callback) {
	this._each( e=> {
		callback.call(q(e));
	});
	return this;
}

_q.prototype.exists = function() {
	return this.obj.length > 0;
}

_q.prototype.css = function(attr, value) {
	if (!value) return this.obj[0].style[attr];
	this._each(o => o.style[attr] = value);
	return this;
}

_q.prototype.addClass = function(clazz) {
	this._each(o => o.classList.add(clazz));
	return this;
}

_q.prototype.rmClass = function(clazz) {
	this._each(o => o.classList.remove(clazz));
	return this;
}

_q.prototype.toggleClass = function(clazz) {
	this._each(o => o.classList.toggle(clazz));
	return this;
}

_q.prototype.attr = function(attr, value) {
	if (!value) return this.obj[0].getAttribute(attr);
	this._each(o => o.setAttribute(attr, value));
	return this;
}

_q.prototype.value = function(val) {
	if (val !== undefined) {
		this._each(o => {
			// j'ai pas tester les checkboxs
			if (o.getAttribute('type') === 'checkbox')
				o.setAttribute('checked', !!val);
			else
				o.value = val;
		});
	}
	if ('checkbox' === this.attr('type')) {
		return this.obj[0].checked;
	}
	return this.obj[0].value;
}

_q.prototype.find = function(selector) {
	let objs = new Array();
	this._each(o => Array.prototype.push.apply(objs, o.querySelectorAll(selector)));
	return q(objs);
}

_q.prototype.parent = function(selector) {
	let objs = new Array();
	if (!selector) {
		this._each(o => {
			objs.push(o.parentNode);
		});
	} else {
		this._each(o => {
			let c = o.closest(selector);
			if (c) objs.push(c);
		});
	}
	return q(objs);
}

_q.prototype.on = function(type, selector, callback) {
	if (!callback) {
		callback = selector;
		this._each(child => child.addEventListener(type, callback));
	} else {
		this.find(selector)._each(child => child.addEventListener(type, callback));
		this._each(o => {
			new MutationObserver(function() {
				o.querySelectorAll(selector).forEach(c => c.removeEventListener(type, callback));
				o.querySelectorAll(selector).forEach(c => c.addEventListener(type, callback));
			}).observe(o, { childList: true, subtree: true });
		});
	}
	return this;
}

_q.prototype.fire = function(type) {
	this._each(o => o.dispatchEvent(new Event(type)));
	return this;
}

_q.prototype.replaceWith = function(elems) {
	for (let i = 0; i < Math.min(this.obj.length, elems.obj.length); i++) {
		this.obj[i].replaceWith(elems.obj[i]);
	}
	return this;
}

_q.prototype.append = function(elems) {
	this._each(o => elems._each(e => o.appendChild(e)));
	return this;
}

_q.prototype.prepend = function(elems) {
	this._each(o => elems._each(e => o.prepend(e)));
	return this;
}

_q.prototype.text = function(txt) {
	if (txt === undefined) {
		let result = "";
		this._each(o=> result += o.textContent);
		return result;
	}
	this._each(o => o.textContent = txt);
	return this;
}

let q = function(selector) {
	if (!selector) return this;
	if (typeof selector === "function") {
		document.addEventListener("DOMContentLoaded", selector);
		return this;
	} else if (typeof selector === "string") {
		if (selector.charAt(0) === '<') {
			return new _q([document.createElement(selector.substring(1, selector.length-1))]);
		}
		return new _q(document.querySelectorAll(selector));
	} else if (Array.isArray(selector)) {
		return new _q(selector);
	} else {
		return new _q([selector]);
	}
};

let _ajax = function(url, method = "GET") {
	this.req = new XMLHttpRequest();
	this.req.open(method, url);
	this.req.setRequestHeader("Content-Type", "text/html");
};

_ajax.prototype.header = function(name, value) {
	this.req.setRequestHeader(name, value);
	return this;
};

_ajax.prototype.success = function(success) {
	this.req.onreadystatechange = function() {
		if (this.readyState === XMLHttpRequest.DONE) {
			if (this.status === 200) {
				try {
					let contentType = this.getResponseHeader("Content-Type").split(';')[0];
					success(q(new DOMParser().parseFromString(this.response, contentType)));
				} catch (error) {
					console.log(error);
					success(this.response);
				}
			} else {
				document.write(this.response);
			}
		}
	};
	return this;
};

_ajax.prototype.process = function() {
	this.req.send();
};

q.ajax = function(url, method = "GET") {
	return new _ajax(url, method);
};

