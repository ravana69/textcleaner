function add_file_output(n, t, i) {
  i === undefined && (i = 1);
  var r = document.createElement("a");
  r.setAttribute("href", n);
  r.setAttribute("download", t);
  $(r).text(t);
  $("#output-files").append($(r));
  i && fireEvent(r, "click");
  $("#social").fadeIn(5e3)
}

function fireEvent(n, t) {
  var r = n,
    i;
  document.createEvent ? (i = document.createEvent("MouseEvents"), i.initEvent(t, !0, !1), r.dispatchEvent(i)) : document.createEventObject && (i = document.createEventObject(), r.fireEvent("on" + t, i))
}
$(function() {
  function n(n, t, i) {
    i || (i = 0);
    setTimeout(function() {
      var i = document.createElement("script");
      i.onload = function() {
        t && t()
      };
      i.src = n;
      document.head.appendChild(i)
    }, i)
  }
  $("img[data-src]").each(function(n, t) {
    setTimeout(function() {
      let n = $(t);
      console.log(n);
      n.attr("src", n.attr("data-src")).removeAttr("data-src")
    }, 100)
  });
  $(".numeric").keyup(function() {
    $(".numeric").val($(".numeric").val().replace(/[^0-9\.]/g, ""))
  });
  $("#settings-cog").click(function() {
    $(this).hide();
    $("#settings-panel").show()
  });
  $("#newsletter").click(function(n) {
    n.preventDefault();
    $(this).hide();
    $("#newsletter-form").show()
  });
  $("#send-feedback").click(function() {
    let i = $("#feedback"),
      n = i.val();
    if (!n) {
      alert("please fill in the textbox");
      return
    }
    let t = $(this);
    t.hide();
  })
});
$(function() {
    function n(n) {
      var t, i;
      $("#clipboard-status").hide();
      $("#clipboard-check").hide();
      $("#social").show();
      t = $("#box1").val();
      typeof convert == "function" && ($("#box2").val(convert(t, n)), n && ($("#box2").select(), document.execCommand("copy"), $("#clipboard-status").fadeIn(1e3), $("#clipboard-check").fadeIn(3e3)));
      i = t.split(/\r\n|\r|\n/).length;
      $("#text-stats").html("Lines: " + i)
    }
    $('textarea:visible, input[type="text"]:visible').first().focus().select();
    $("#box1").keyup(function() {
      n(!1)
    });
    $(".setting").keyup(function() {
      n(!1)
    });
    $("#box1").on("paste", function() {
      setTimeout(function() {
        n(!0)
      }, 1)
    })
  }),
  function(n, t) {
    typeof define == "function" && define.amd ? define(["exports"], function(i) {
      t(n, i)
    }) : typeof exports != "undefined" ? t(n, exports) : t(n, n.fd = n.fd || {})
  }(this, function(n, t) {
    t.randomID = function(n) {
      return (n || "fd") + "_" + (Math.random() * 1e4).toFixed()
    };
    t.uniqueID = function(n) {
      do var i = t.randomID(n); while (t.byID(i));
      return i
    };
    t.byID = function(n) {
      return t.isTag(n) ? n : document.getElementById(n)
    };
    t.isTag = function(n, t) {
      return typeof n == "object" && n && n.nodeType == 1 && (!t || n.tagName.toUpperCase() == t.toUpperCase())
    };
    t.newXHR = function() {
      var t, n;
      try {
        return new XMLHttpRequest
      } catch (i) {
        for (t = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], n = 0; n < t.length; n++) try {
          return new ActiveXObject(t[n])
        } catch (i) {}
      }
      throw "Cannot create XMLHttpRequest.";
    };
    t.isArray = function(n) {
      return Object.prototype.toString.call(n) === "[object Array]"
    };
    t.toArray = function(n, i) {
      return n === null || typeof n == "undefined" ? [] : (!t.isArray(n) && (typeof n != "object" || !("callee" in n)) && (n = [n]), Array.prototype.slice.call(n, i || 0))
    };
    t.addEvent = function(n, t, i) {
      return n && t && i && (n.attachEvent ? (n["e" + t + i] = i, n[t + i] = function() {
        n["e" + t + i](window.event)
      }, n.attachEvent("on" + t, n[t + i])) : n.addEventListener(t, i, !1)), n
    };
    t.stopEvent = function(n) {
      return n.cancelBubble = !0, n.returnValue = !1, n.stopPropagation && n.stopPropagation(), n.preventDefault && n.preventDefault(), n
    };
    t.setClass = function(n, i, r) {
      return (n = t.byID(n)) && i != null && (typeof r != "undefined" && !r ? n.className = n.className.replace(t.classRegExp(i), " ") : t.hasClass(n, i) || (n.className += " " + i)), n
    };
    t.hasClass = function(n, i) {
      return t.classRegExp(i).test((t.byID(n) || {}).className)
    };
    t.classRegExp = function(n) {
      return n == "" || typeof n == "object" ? /$o_O/ : new RegExp("(^|\\s+)" + n + "(\\s+|$)", "gi")
    };
    t.extend = function(n, t, i) {
      n = n || {};
      t = t || {};
      for (var r in t)(i || typeof n[r] == "undefined") && (n[r] = t[r]);
      return n
    };
    t.callAll = function(n, i, r) {
      var f, u;
      if (i = t.toArray(i), typeof n == "function" && (n = [n]), t.isArray(n)) {
        for (u = 0; u < n.length; u++)
          if (typeof n[u] == "function" && (f = n[u].apply(r || this, i), f != null)) break
      } else if (n) throw "FileDrop event list must be either an Array, Function, undefined or null but " + typeof n + " was given.";
      return f
    };
    t.callAllOfObject = function(n, i, r) {
      var f, e, u;
      return t.logging && t.hasConsole && (f = n.events[i] ? n.events[i].length || 0 : 0, console.info("FileDrop " + i + " event (" + f + ") args:"), console.dir([r])), e = [t.onObjectCall].concat(n.events.any), u = t.callAll(e, [i].concat(t.toArray(r)), n), u != null ? u : t.callAll(n.events[i], r, n)
    };
    t.appendEventsToObject = function(n, i) {
      var e, r, u, o, f;
      if (t.addEventsToObject(this, !1, arguments)) return this;
      switch (arguments.length) {
        case 0:
          return t.extend({}, this.events);
        case 1:
          if (n === null) return this.events = {}, this;
          if (t.isArray(n)) {
            for (e = {}, r = 0; r < n.length; r++) e[n[r]] = t.toArray(this.events[n[r]]);
            return e
          }
          if (typeof n == "function") return t.funcNS(n);
          if (typeof n == "string") return t.toArray(this.events[n]);
        case 2:
          if (n = t.toArray(n), i === null) {
            for (r = 0; r < n.length; r++)
              if (u = t.splitNS(n[r]), u[0])
                if (u[1]) {
                  if (this.events[u[0]])
                    for (f = this.events[u[0]].length - 1; f >= 0; f--) t.funcNS(this.events[u[0]][f]) == u[1] && this.events[u[0]].splice(f, 1)
                } else this.events[u[0]] = [];
            else
              for (o in this.events) arguments.callee.call(this, [o + ":" + u[1]], null);
            return this
          }
      }
      throw "Bad parameters for FileDrop event().";
    };
    t.previewToObject = function() {
      if (t.addEventsToObject(this, !0, arguments)) return this;
      throw "Bad parameters for FileDrop preview().";
    };
    t.addEventsToObject = function(n, i, r) {
      var u = r[0],
        f = r[1],
        h, c, o, e, s;
      switch (r.length) {
        case 1:
          if (u && typeof u == "object" && !t.isArray(u)) {
            for (h in u) arguments.callee(n, i, [h, u[h]]);
            return !0
          }
          case 2:
            if (typeof f == "function" || t.isArray(f)) {
              for (u = t.toArray(u), f = t.toArray(f), c = i ? "unshift" : "push", o = 0; o < u.length; o++) {
                for (e = t.splitNS(u[o]), s = 0; s < f.length; s++) t.funcNS(f[s], e[1]);
                n.events[e[0]] = n.events[e[0]] || [];
                n.events[e[0]][c].apply(n.events[e[0]], f)
              }
              return !0
            }
      }
    };
    t.funcNS = function(n, i) {
      return typeof n != "function" ? n : arguments.length == 1 ? (n[t.nsProp] || "").toString() : (n[t.nsProp] = (i || "").toString(), n)
    };
    t.splitNS = function(n) {
      return (n || "").match(/^([^:]*):?(.*)$/).slice(1)
    };
    t.extend(t, {
      logging: !0,
      hasConsole: "console" in window && console.log && console.dir,
      onObjectCall: null,
      all: [],
      isIE6: !1,
      isIE9: !1,
      isChrome: (navigator.vendor || "").indexOf("Google") != -1,
      nsProp: "_fdns"
    });
    t.DropHandle = function(n, i) {
      var r = this,
        u;
      if (r.el = n = t.byID(n), !n) throw "Cannot locate DOM node given to new FileDrop class.";
      r.opt = {
        zoneClass: "fd-zone",
        inputClass: "fd-file",
        iframe: {
          url: "",
          callbackParam: "fd-callback",
          fileParam: "fd-file"
        },
        input: null,
        recreateInput: !0,
        fullDocDragDetect: !1,
        multiple: !1,
        dropEffect: "copy"
      };
      t.all.push(r);
      r.filedrop = null;
      u = r.opt.iframe;
      t.extend(r.opt, i, !0);
      t.extend(r.opt.iframe, u);
      t.isChrome && (r.opt.fullDocDragDetect = !0);
      r.events = {
        any: [],
        dragEnter: [],
        dragLeave: [],
        dragOver: [],
        dragEnd: [],
        dragExit: [],
        upload: [],
        uploadElsewhere: [],
        inputSetup: [],
        iframeSetup: [],
        iframeDone: []
      };
      r.on = r.events;
      r.zone = r.el;
      r.hook = function(n) {
        r.opt.input != 0 && (r.opt.input = r.opt.input || r.prepareInput(n), r.opt.input && t.callAllOfObject(r, "inputSetup", r.opt.input));
        r.hookDragOn(n);
        r.hookDropOn(n)
      };
      r.hookDragOn = function(n) {
        r.opt.fullDocDragDetect ? (r.delegate(document.body, "dragEnter"), t.addEvent(document, "dragleave", function(n) {
          (n.clientX == 0 && n.clientY == 0 || t.isTag(n.relatedTarget, "html")) && (t.stopEvent(n), t.callAllOfObject(r, "dragLeave", n))
        })) : (r.delegate(n, "dragEnter"), r.delegate(n, "dragLeave"));
        r.delegate(n, "dragOver");
        r.delegate(n, "dragEnd");
        r.delegate(n, "dragExit")
      };
      r.hookDropOn = function(n) {
        t.isIE9 || r.delegate(n, "drop", "upload")
      };
      r.delegate = function(n, i, u) {
        t.addEvent(n, i.toLowerCase(), function(n) {
          t.stopEvent(n);
          t.callAllOfObject(r, u || i, n)
        })
      };
      r.prepareInput = function(n) {
        var u = r.findInputRecursive(n) || r.createInputAt(n),
          i, f;
        if (u) {
          for (i = u.parentNode; i && !t.isTag(i, "form");) i = i.parentNode;
          if (!i) throw "FileDrop file input has no parent form element.";
          if (f = i ? i.getAttribute("target") : "", f && t.isTag(t.byID(f), "iframe")) return {
            file: u,
            form: i
          }
        }
        return !1
      };
      r.findInputRecursive = function(n) {
        for (var i, u = 0; u < n.childNodes.length; u++)
          if ((i = n.childNodes[u], t.isTag(i, "input") && i.getAttribute("type") == "file" && t.hasClass(i, r.opt.inputClass)) || (i = arguments.callee(i))) return i
      };
      r.createInputAt = function(n) {
        var f, i, u;
        do f = t.randomID(); while (t.byID(f));
        for (i = document.createElement("div"), i.innerHTML = '<iframe src="javascript:false" name="' + f + '"><\/iframe><form method="post" enctype="multipart/form-data"><input type="hidden" name="' + r.opt.iframe.callbackParam + '" /><input type="file" name="' + r.opt.iframe.fileParam + '" /><\/form>', i.firstChild.setAttribute("id", f), i.firstChild.style.display = "none", i.lastChild.setAttribute("target", f), u = n.firstChild; u && (!t.isTag(u) || t.isTag(u, "legend"));) u = u.nextSibling;
        return u ? n.insertBefore(i, u) : n.appendChild(i), i.lastChild.lastChild
      };
      r.abortIFrame = function() {
        if (r.opt.input.form) {
          var n = t.byID(r.opt.input.form.getAttribute("target"));
          n && n.setAttribute("src", "javascript:false")
        }
      };
      r.sendViaIFrame = function(n) {
        var u, f, i;
        if (n = n || r.opt.iframe.url, u = (r.opt.input || {}).form, n && u) {
          do f = t.randomID(); while (f in window);
          for (window[f] = function(i) {
              typeof i != "object" && (i = {
                response: i,
                responseXML: "",
                responseText: (i || "").toString(),
                readyState: 4,
                status: 200,
                statusText: "OK",
                getAllResponseHeaders: function() {
                  return ""
                },
                getResponseHeader: function() {
                  return ""
                },
                setRequestHeader: function() {
                  return this
                },
                statusCode: function() {
                  return this
                },
                abort: function() {
                  return this
                }
              });
              t.extend(i, {
                iframe: !0,
                url: n
              });
              t.callAllOfObject(r, "iframeDone", i)
            }, i = u.firstChild; i && (!t.isTag(i, "input") || i.name != r.opt.iframe.callbackParam);) i = i.nextSibling;
          return i ? i.value = f : n = n.replace(/[?&]+$/, "") + (n.indexOf("?") == -1 ? "?" : "&") + r.opt.iframe.callbackParam + "=" + f, u.setAttribute("action", n), t.callAllOfObject(r, "iframeSetup", u), u.submit(), setTimeout(r.resetForm, 300), !0
        }
      };
      r.resetForm = function() {
        var n = r.opt.input && r.opt.input.file,
          i;
        n && (n.value = "", r.opt.recreateInput && (i = r.opt.input.file = n.cloneNode(!0), n.parentNode.replaceChild(i, n), t.callAllOfObject(r, "inputSetup", [r.opt.input, n])))
      };
      r.multiple = function(n) {
        return r.opt.input && typeof n != "undefined" && (n ? r.opt.input.file.setAttribute("multiple", "multiple") : r.opt.input.file.removeAttribute("multiple")), r.opt.input && !!r.opt.input.file.getAttribute("multiple")
      };
      r.event = function() {
        return t.appendEventsToObject.apply(r, arguments)
      };
      r.preview = function() {
        return t.previewToObject.apply(r, arguments)
      };
      r.onInputSetup = function(i, u) {
        var e, f;
        u ? (i.file.clearAttributes && i.file.clearAttributes(), i.file.mergeAttributes && i.file.mergeAttributes(u)) : r.multiple(r.opt.multiple);
        t.setClass(i.file, r.opt.inputClass);
        r.delegate(i.file, "change", "upload");
        e = i.file.parentNode;
        e && e.style.display.match(/^(static)?$/) && (e.style.position = "relative");
        t.isTag(n, "fieldset") && (f = document.createElement("div"), f.style.position = "relative", f.style.overflow = "hidden", n.parentNode.insertBefore(f, n), f.appendChild(n))
      };
      r.onDragOver = function(n) {
        t.stopEvent(n);
        n.dataTransfer && (n.dataTransfer.dropEffect = r.opt.dropEffect)
      };
      r.onUpload = function() {
        for (var n = 0; n < t.all.length; n++) t.all[n] !== r && t.all[n].events && t.callAllOfObject(t.all[n], "uploadElsewhere", r)
      };
      r.event({
        inputSetup: r.onInputSetup,
        dragOver: r.onDragOver,
        upload: r.onUpload
      });
      t.setClass(n, r.opt.zoneClass);
      r.hook(n)
    };
    t.FileDrop = function(n, i) {
      function u(i) {
        return function() {
          t.setClass(n, r.opt.dragOverClass, i)
        }
      }
      var r = this;
      n = t.byID(n);
      r.handle = new t.DropHandle(n, i);
      r.handle.filedrop = r;
      t.extend(r.handle.opt, {
        dragOverClass: "over"
      });
      t.extend(r.handle.opt.iframe, {
        force: !1
      });
      t.extend(r.handle.events, {
        send: [],
        fileSetup: []
      });
      r.onUpload = function(n) {
        var i = !r.opt.iframe.force && r.eventFiles(n, !0);
        i ? i.length > 0 && t.callAllOfObject(r, "send", [i]) : !r.handle.sendViaIFrame() && t.hasConsole && console.warn("FileDrop fallback upload triggered but iframe options were not configured - doing nothing.")
      };
      r.eventFiles = function(n, i) {
        var o = new t.FileList(n),
          u, h, s, e, f;
        if (u = n.dataTransfer && (n.dataTransfer.length || n.dataTransfer.files) ? n.dataTransfer : n.target && n.target.files || n.srcElement && n.srcElement.files, u)
          for (h = u.items || [], u.files && (u = u.files), s = {}, e = 0; e < u.length; e++) f = new t.File(u[e]), s[f.name] && f.name != "image.jpg" || (s[f.name] = !0, f.setNativeEntry(h[e]), t.callAllOfObject(r, "fileSetup", f), (f.size > 0 || f.nativeEntry) && o.push(f));
        else i && (o = !1);
        return o
      };
      t.extend(r, r.handle);
      r.event({
        upload: r.onUpload,
        send: r.resetForm,
        dragEnter: u(!0),
        dragLeave: u(!1),
        uploadElsewhere: u(!1)
      });
      r.preview({
        upload: u(!1)
      })
    };
    t.FileList = function(n) {
      var i = this;
      i.dropEffect = n && n.dropEffect || "";
      i.length = 0;
      n = null;
      i.push = function(n) {
        return i[i.length++] = n, i
      };
      i.pop = function() {
        if (i.length > 0) {
          var n = i.last();
          return delete i[--i.length], n
        }
      };
      i.first = function() {
        return i[0]
      };
      i.last = function() {
        return i[i.length - 1]
      };
      i.remove = function(n) {
        for (; n < i.length - 1; n++) i[n] = i[n + 1];
        return se.f.pop(), i
      };
      i.clear = function() {
        for (var n = 0; n < i.length; n++) delete i[n];
        return i.length = 0, i
      };
      i.reverse = function() {
        for (var n = 0; n < Math.floor(i.length / 2); n++) i[n] = i[i.length - n - 1];
        return i
      };
      i.concat = function(n) {
        for (var u = new t.FileList, r = 0; r < i.length; r++) u[r] = i[r];
        for (r = 0; n && r < n.length; r++) u[i.length + r + 1] = n[r];
        return u.length = i.length + (n || []).length, i
      };
      i.sort = function(n, t) {
        for (var u, f, r = 0; r < i.length; r++)
          for (u = 0; u < i.length; u++) n.call(t || this, i[r], i[u], r, u) < 0 && (f = i[r], i[r] = i[u], i[u] = f);
        return i
      };
      i.sortBy = function(n, t) {
        for (var u = [], r = 0; r < i.length; r++) u.push([r, n.call(t || this, i[r], r)]);
        for (u.sort(function(n, t) {
            return n[1] > t[1] ? 1 : n[1] < t[1] ? -1 : 0
          }), r = 0; r < u.length; r++) i[r] = u[r][0];
        return i
      };
      i.find = function(n, t) {
        for (var u, r = 0; r < i.length; r++)
          if (u = n.call(t || this, i[r], r), u != null) return i[r]
      };
      i.each = function(n, t) {
        return i.find(function() {
          n.apply(this, arguments)
        }, t), i
      };
      i.invoke = function(n) {
        var i = t.toArray(arguments, 1);
        return this.each(function(t) {
          t[n].apply(t, i)
        })
      };
      i.abort = function() {
        return this.invoke("abort")
      };
      i.findCompare = function(n, t) {
        var r, u = null,
          f;
        return i.each(function(i) {
          (u == null || u < (f = n.call(t, r))) && (r = i)
        }, t), r
      };
      i.filter = function(n, r) {
        var u = new t.FileList;
        return i.each(function(t) {
          n.apply(this, arguments) && u.push(t)
        }, r), u
      };
      i.largest = function() {
        return i.findCompare(function(n) {
          return n.size
        })
      };
      i.smallest = function() {
        return i.findCompare(function(n) {
          return -n.size
        })
      };
      i.oldest = function() {
        return i.findCompare(function(n) {
          return -n.modDate.getTime()
        })
      };
      i.newest = function() {
        return i.findCompare(function(n) {
          return n.modDate
        })
      };
      i.ofType = function(n) {
        return n += n.indexOf("/") == -1 ? "/" : "$", n = new RegExp("^" + n, "i"), i.filter(function(t) {
          return n.test(t.type)
        })
      };
      i.images = function() {
        return i.ofType("image")
      };
      i.named = function(n) {
        return typeof n == "string" ? i.find(function(t) {
          return t.name == n
        }) : i.filter(function(t) {
          return n.test(t.name)
        })
      }
    };
    t.FileList.prototype.length = 0;
    t.FileList.prototype.splice = Array.prototype.splice;
    t.File = function(n) {
      var i = this;
      i.nativeFile = n;
      i.nativeEntry = null;
      i.name = n.fileName || n.name || "";
      i.size = n.fileSize || n.size || 0;
      i.type = i.mime = n.fileType || n.type || "";
      i.modDate = n.lastModifiedDate || new Date;
      i.xhr = null;
      i.opt = {
        extraHeaders: !0,
        xRequestedWith: !0,
        method: "POST"
      };
      i.events = {
        any: [],
        xhrSetup: [],
        xhrSend: [],
        progress: [],
        done: [],
        error: []
      };
      i.events.sendXHR = i.events.xhrSend;
      i.abort = function() {
        return i.xhr && i.xhr.abort && i.xhr.abort(), i
      };
      i.sendTo = function(n, r) {
        if (r = t.extend(r, i.opt), r.url = n, i.size)
          if (window.FileReader) {
            var u = new FileReader;
            u.onload = function(n) {
              i.sendDataReadyTo(r, n)
            };
            u.onerror = function(n) {
              t.callAllOfObject(i, "error", [n])
            };
            u.readAsArrayBuffer(i.nativeFile)
          } else i.sendDataReadyTo(r);
        else t.hasConsole && console.warn("Trying to send an empty FileDrop.File.");
        return i
      };
      i.sendDataReadyTo = function(n, r) {
        var u, f, e;
        return i.abort(), i.xhr = t.newXHR(), i.hookXHR(i.xhr), i.xhr.open(n.method, n.url, !0), i.xhr.overrideMimeType && i.xhr.overrideMimeType("application/octet-stream"), i.xhr.setRequestHeader("Content-Type", "application/octet-stream"), n.extraHeaders && (i.xhr.setRequestHeader("X-File-Name", encodeURIComponent(i.name)), i.xhr.setRequestHeader("X-File-Size", i.size), i.xhr.setRequestHeader("X-File-Type", i.type), i.xhr.setRequestHeader("X-File-Date", i.modDate.toGMTString()), u = n.xRequestedWith, u === !0 && (f = window.FileReader ? "FileAPI" : "Webkit", u = "FileDrop-XHR-" + f), u && i.xhr.setRequestHeader("X-Requested-With", u)), t.callAllOfObject(i, "xhrSetup", [i.xhr, n]), e = r && r.target && r.target.result ? r.target.result : i.nativeFile, t.callAllOfObject(i, "xhrSend", [i.xhr, e, n]), i.xhr
      };
      i.hookXHR = function(n) {
        var r = n.upload || n;
        n.onreadystatechange = function(r) {
          var u, f;
          if (n.readyState == 4) {
            try {
              u = n.status == 200 ? "done" : "error"
            } catch (r) {
              u = "error"
            }
            f = u == "error" ? [r, n] : [n, r];
            t.callAllOfObject(i, u, f)
          }
        };
        r.onprogress = function(r) {
          var u = r.lengthComputable ? r.loaded : null;
          t.callAllOfObject(i, "progress", [u, r.total || null, n, r])
        }
      };
      i.readData = function(n, t, r) {
        return i.read({
          onDone: n,
          onError: t,
          func: r
        })
      };
      i.readDataURL = function(n, t) {
        return i.readData(n, t || !1, "uri")
      };
      i.readDataURI = i.readDataURL;
      i.read = function(n) {
        function f(t, i) {
          typeof i == "object" || (i.message = i);
          i.fdError = t;
          n.onError !== !1 && (n.onError || n.onDone).apply(this, arguments)
        }
        var u, r, o;
        if (t.extend(n, {
            onDone: new Function,
            onError: null,
            blob: i.nativeFile,
            func: "",
            start: 0,
            end: null,
            mime: ""
          }), !window.FileReader) return f("support", e);
        if ((n.start > 0 || n.end != null && n.end) && (n.blob.slice ? (n.end == null && (n.end = n.blob.size || n.blob.fileSize), n.blob = n.blob.slice(n.start, n.end, n.mime)) : t.hasConsole && console.warn("File Blob/slice() are unsupported - operating on entire File.")), u = new FileReader, u.onerror = function(n) {
            f("read", n)
          }, u.onload = function(t) {
            t.target && t.target.result ? (n.func == "readAsBinaryString" && (t.target.result = String.fromCharCode.apply(null, new Uint8Array(t.target.result))), n.onDone(t.target.result)) : u.onerror(t)
          }, r = n.func, t.isArray(r)) return o = r[0], r[0] = n.blob, u[o].apply(u, r);
        if (r && r != "bin") {
          if (r == "url" || r == "uri" || r == "src") r = "readAsDataURL";
          else if (r == "array") r = "readAsArrayBuffer";
          else if (r == "text") r = "readAsText";
          else if (r.substr(0, 4) != "read") return u.readAsText(n.blob, r)
        } else r = "readAsBinaryString";
        return r == "readAsBinaryString" && (r = "readAsArrayBuffer"), u[r](n.blob)
      };
      i.listEntries = function(n, r) {
        if (i.nativeEntry && i.nativeEntry.isDirectory) {
          r = r || new Function;
          var o = i.nativeEntry.createReader(),
            u = new t.FileList,
            f = 0;

          function e(t) {
            f -= t;
            f == 0 && n && (n(u), n = null)
          }
          return o.readEntries(function(n) {
            for (var i, s = 0; s < n.length; s++) i = n[s], i.file ? (f++, i.file(function(n) {
              var r = new t.File(n);
              r.setNativeEntry(i);
              u.push(r);
              e(1)
            }, function() {
              u.push(t.File.fromEntry(i));
              e(1);
              r.apply(this, arguments)
            })) : u.push(t.File.fromEntry(i));
            s ? o.readEntries(arguments.callee, r) : e(0)
          }, r), !0
        }
      };
      i.setNativeEntry = function(n) {
        i.nativeEntry = n && n.webkitGetAsEntry && n.webkitGetAsEntry()
      };
      i.event = function() {
        return t.appendEventsToObject.apply(i, arguments)
      };
      i.preview = function() {
        return t.previewToObject.apply(i, arguments)
      };
      i.onXhrSend = function(n, t) {
        n.send(t)
      };
      i.event({
        xhrSend: i.onXhrSend
      })
    };
    t.File.fromEntry = function(n) {
      var i = new t.File(n);
      return i.setNativeEntry(n), i.nativeFile = null, i
    };
    t.jQuery = function(n) {
      if (n = n || jQuery || window.jQuery, !n) throw "No window.jQuery object to integrate FileDrop into.";
      n.fn.filedrop = function(i) {
        function e(n, i) {
          return function(r) {
            var u = (i || []).concat(t.toArray(arguments, 1));
            return o.triggerHandler((n + r).toLowerCase(), u)
          }
        }
        var o = this,
          r = this.data("filedrop"),
          f, u;
        if (typeof i == "string")
          if (r) {
            if (typeof r[i] != "undefined") return f = r[i], typeof f == "function" ? f.apply(r, t.toArray(arguments, 1)) : f;
            n.error("There's no method or property FileDrop." + i + ".")
          } else n.error("$.filedrop('comment') needs an initialized FilrDrop on this element.");
        else if (i && typeof i != "object") n.error("Invalid $.filedrop() parameter - expected nothing (creates new zone), a string (property to access) or an object (custom zone options).");
        else if (r) {
          if (!i) return r;
          t.extend(r.opt, i, !0)
        } else u = new FileDrop(this[0], i), u.$el = n(this), this.first().data("filedrop", u), u.event("any", e("fd")), u.on.fileSetup.push(function(n) {
          n.event("any", e("file", [n]))
        });
        return o
      }
    };
    n.FileDrop = t.FileDrop
  });