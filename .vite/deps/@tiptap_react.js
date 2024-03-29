import {
  applyStyles_default,
  createPopper
} from "./chunk-MF4UFTB6.js";
import {
  CommandManager,
  Editor,
  Extension,
  InputRule,
  Mark,
  Node,
  NodePos,
  NodeView,
  PasteRule,
  Plugin,
  PluginKey,
  Tracker,
  callOrReturn,
  combineTransactionSteps,
  createChainableState,
  createDocument,
  createNodeFromContent,
  createStyleTag,
  defaultBlockAt,
  deleteProps,
  elementFromString,
  escapeForRegEx,
  extensions,
  findChildren,
  findChildrenInRange,
  findDuplicates,
  findParentNode,
  findParentNodeClosestToPos,
  fromString,
  generateHTML,
  generateJSON,
  generateText,
  getAttributes,
  getAttributesFromExtensions,
  getChangedRanges,
  getDebugJSON,
  getExtensionField,
  getHTMLFromFragment,
  getMarkAttributes,
  getMarkRange,
  getMarkType,
  getMarksBetween,
  getNodeAtPosition,
  getNodeAttributes,
  getNodeType,
  getRenderedAttributes,
  getSchema,
  getSchemaByResolvedExtensions,
  getSchemaTypeByName,
  getSchemaTypeNameByName,
  getSplittedAttributes,
  getText,
  getTextBetween,
  getTextContentFromNodes,
  getTextSerializersFromSchema,
  injectExtensionAttributesToParseRule,
  inputRulesPlugin,
  isActive,
  isAtEndOfNode,
  isAtStartOfNode,
  isEmptyObject,
  isExtensionRulesEnabled,
  isFunction,
  isList,
  isMacOS,
  isMarkActive,
  isNodeActive,
  isNodeEmpty,
  isNodeSelection,
  isNumber,
  isPlainObject,
  isRegExp,
  isString,
  isTextSelection,
  isiOS,
  markInputRule,
  markPasteRule,
  mergeAttributes,
  mergeDeep,
  minMax,
  nodeInputRule,
  nodePasteRule,
  objectIncludes,
  pasteRulesPlugin,
  posToDOMRect,
  removeDuplicates,
  resolveFocusPosition,
  selectionToInsertionEnd,
  splitExtensions,
  textInputRule,
  textPasteRule,
  textblockTypeInputRule,
  wrappingInputRule
} from "./chunk-JSR3Y4TC.js";
import {
  require_react_dom
} from "./chunk-OO45PHZ3.js";
import {
  require_react
} from "./chunk-TGJCFA52.js";
import {
  __toESM
} from "./chunk-5HFSU4IV.js";

// node_modules/tippy.js/dist/tippy.esm.js
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO2() {
  return document.body;
};
function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }
  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf("[object") === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === "function" ? value.apply(void 0, args) : value;
}
function debounce(fn, ms) {
  if (ms === 0) {
    return fn;
  }
  var timeout;
  return function(arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      fn(arg);
    }, ms);
  };
}
function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function(key) {
    delete clone[key];
  });
  return clone;
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function(item, index) {
    return arr.indexOf(item) === index;
  });
}
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function(acc, key) {
    if (obj[key] !== void 0) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
function div() {
  return document.createElement("div");
}
function isElement(value) {
  return ["Element", "Fragment"].some(function(type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, "NodeList");
}
function isMouseEvent(value) {
  return isType(value, "MouseEvent");
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }
  if (isNodeList(value)) {
    return arrayFrom(value);
  }
  if (Array.isArray(value)) {
    return value;
  }
  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function(el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function(el) {
    if (el) {
      el.setAttribute("data-state", state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;
  var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX, clientY = event.clientY;
  return popperTreeData.every(function(_ref) {
    var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;
    if (!offsetData) {
      return true;
    }
    var topDistance = basePlacement === "bottom" ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === "top" ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === "right" ? offsetData.left.x : 0;
    var rightDistance = basePlacement === "left" ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(event) {
    box[method](event, listener);
  });
}
function actualContains(parent, child) {
  var target = child;
  while (target) {
    var _target$getRootNode;
    if (parent.contains(target)) {
      return true;
    }
    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }
  return false;
}
var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }
  currentInput.isTouch = true;
  if (window.performance) {
    document.addEventListener("mousemove", onDocumentMouseMove);
  }
}
function onDocumentMouseMove() {
  var now = performance.now();
  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener("mousemove", onDocumentMouseMove);
  }
  lastMouseMoveTime = now;
}
function onWindowBlur() {
  var activeElement = document.activeElement;
  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;
    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener("blur", onWindowBlur);
}
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
var isIE11 = isBrowser ? (
  // @ts-ignore
  !!window.msCrypto
) : false;
function createMemoryLeakWarning(method) {
  var txt = method === "destroy" ? "n already-" : " ";
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, " ").replace(lineStartWithSpaces, "").trim();
}
function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c👷‍ This is a development-only message. It will be removed in production.\n  ");
}
function getFormattedMessage(message) {
  return [
    getDevMessage(message),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var visitedMessages;
if (true) {
  resetVisitedMessages();
}
function resetVisitedMessages() {
  visitedMessages = /* @__PURE__ */ new Set();
}
function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;
    visitedMessages.add(message);
    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}
function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;
    visitedMessages.add(message);
    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}
function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === "[object Object]" && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ["tippy() was passed", "`" + String(targets) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" "));
  errorWhen(didPassPlainObject, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: "fade",
  arrow: true,
  content: "",
  inertia: false,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {
  },
  onBeforeUpdate: function onBeforeUpdate() {
  },
  onCreate: function onCreate() {
  },
  onDestroy: function onDestroy() {
  },
  onHidden: function onHidden() {
  },
  onHide: function onHide() {
  },
  onMount: function onMount() {
  },
  onShow: function onShow() {
  },
  onShown: function onShown() {
  },
  onTrigger: function onTrigger() {
  },
  onUntrigger: function onUntrigger() {
  },
  onClickOutside: function onClickOutside() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: "mouseenter focus",
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps2(partialProps) {
  if (true) {
    validateProps(partialProps, []);
  }
  var keys = Object.keys(partialProps);
  keys.forEach(function(key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps2 = plugins.reduce(function(acc, plugin) {
    var name = plugin.name, defaultValue = plugin.defaultValue;
    if (name) {
      var _name;
      acc[name] = passedProps[name] !== void 0 ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
    }
    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps2);
}
function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function(acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || "").trim();
    if (!valueAsString) {
      return acc;
    }
    if (key === "content") {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }
    return acc;
  }, {});
  return props;
}
function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === "auto" ? props.interactive : out.aria.expanded,
    content: out.aria.content === "auto" ? props.interactive ? null : "describedby" : out.aria.content
  };
  return out;
}
function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }
  if (plugins === void 0) {
    plugins = [];
  }
  var keys = Object.keys(partialProps);
  keys.forEach(function(prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop);
    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function(plugin) {
        return plugin.name === prop;
      }).length === 0;
    }
    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", "\n\n", "All props: https://atomiks.github.io/tippyjs/v6/all-props/\n", "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var innerHTML = function innerHTML2() {
  return "innerHTML";
};
function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}
function createArrowElement(value) {
  var arrow = div();
  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;
    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }
  return arrow;
}
function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, "");
    content.appendChild(props.content);
  } else if (typeof props.content !== "function") {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box,
    content: boxChildren.find(function(node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function(node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function(node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute("data-state", "hidden");
  box.setAttribute("tabindex", "-1");
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute("data-state", "hidden");
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);
  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper), box2 = _getChildren.box, content2 = _getChildren.content, arrow = _getChildren.arrow;
    if (nextProps.theme) {
      box2.setAttribute("data-theme", nextProps.theme);
    } else {
      box2.removeAttribute("data-theme");
    }
    if (typeof nextProps.animation === "string") {
      box2.setAttribute("data-animation", nextProps.animation);
    } else {
      box2.removeAttribute("data-animation");
    }
    if (nextProps.inertia) {
      box2.setAttribute("data-inertia", "");
    } else {
      box2.removeAttribute("data-inertia");
    }
    box2.style.maxWidth = typeof nextProps.maxWidth === "number" ? nextProps.maxWidth + "px" : nextProps.maxWidth;
    if (nextProps.role) {
      box2.setAttribute("role", nextProps.role);
    } else {
      box2.removeAttribute("role");
    }
    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content2, instance.props);
    }
    if (nextProps.arrow) {
      if (!arrow) {
        box2.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box2.removeChild(arrow);
        box2.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box2.removeChild(arrow);
    }
  }
  return {
    popper,
    onUpdate
  };
}
render.$$tippy = true;
var idCounter = 1;
var mouseMoveListeners = [];
var mountedInstances = [];
function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps))));
  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget;
  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id,
    reference,
    popper: div(),
    popperInstance,
    props,
    state,
    plugins,
    // methods
    clearDelayTimeouts,
    setProps,
    setContent: setContent2,
    show,
    hide,
    hideWithInteractivity,
    enable,
    disable,
    unmount,
    destroy
  };
  if (!props.render) {
    if (true) {
      errorWhen(true, "render() function has not been supplied.");
    }
    return instance;
  }
  var _props$render = props.render(instance), popper = _props$render.popper, onUpdate = _props$render.onUpdate;
  popper.setAttribute("data-tippy-root", "");
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function(plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute("aria-expanded");
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook("onCreate", [instance]);
  if (props.showOnCreate) {
    scheduleShow();
  }
  popper.addEventListener("mouseenter", function() {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener("mouseleave", function() {
    if (instance.props.interactive && instance.props.trigger.indexOf("mouseenter") >= 0) {
      getDocument().addEventListener("mousemove", debouncedOnMouseMove);
    }
  });
  return instance;
  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }
  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === "hold";
  }
  function getIsDefaultRenderFn() {
    var _instance$props$rende;
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }
  function getCurrentTarget() {
    return currentTarget || reference;
  }
  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }
  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }
  function getDelay(isShow) {
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === "focus") {
      return 0;
    }
    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }
  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }
    popper.style.pointerEvents = instance.props.interactive && !fromHide ? "" : "none";
    popper.style.zIndex = "" + instance.props.zIndex;
  }
  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }
    pluginsHooks.forEach(function(pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });
    if (shouldInvokePropsHook) {
      var _instance$props;
      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }
  function handleAriaContentAttribute() {
    var aria = instance.props.aria;
    if (!aria.content) {
      return;
    }
    var attr = "aria-" + aria.content;
    var id2 = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function(node) {
      var currentValue = node.getAttribute(attr);
      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id2 : id2);
      } else {
        var nextValue = currentValue && currentValue.replace(id2, "").trim();
        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }
  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function(node) {
      if (instance.props.interactive) {
        node.setAttribute("aria-expanded", instance.state.isVisible && node === getCurrentTarget() ? "true" : "false");
      } else {
        node.removeAttribute("aria-expanded");
      }
    });
  }
  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function(listener) {
      return listener !== debouncedOnMouseMove;
    });
  }
  function onDocumentPress(event) {
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === "mousedown") {
        return;
      }
    }
    var actualTarget = event.composedPath && event.composedPath()[0] || event.target;
    if (instance.props.interactive && actualContains(popper, actualTarget)) {
      return;
    }
    if (normalizeToArray(instance.props.triggerTarget || reference).some(function(el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }
      if (instance.state.isVisible && instance.props.trigger.indexOf("click") >= 0) {
        return;
      }
    } else {
      invokeHook("onClickOutside", [instance, event]);
    }
    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide();
      didHideDueToDocumentMouseDown = true;
      setTimeout(function() {
        didHideDueToDocumentMouseDown = false;
      });
      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }
  function onTouchMove() {
    didTouchMove = true;
  }
  function onTouchStart() {
    didTouchMove = false;
  }
  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener("mousedown", onDocumentPress, true);
    doc.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
  }
  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener("mousedown", onDocumentPress, true);
    doc.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
  }
  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function() {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }
  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }
  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;
    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, "remove", listener);
        callback();
      }
    }
    if (duration === 0) {
      return callback();
    }
    updateTransitionEndListener(box, "remove", currentTransitionEndListener);
    updateTransitionEndListener(box, "add", listener);
    currentTransitionEndListener = listener;
  }
  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function(node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node,
        eventType,
        handler,
        options
      });
    });
  }
  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on("touchstart", onTrigger2, {
        passive: true
      });
      on("touchend", onMouseLeave, {
        passive: true
      });
    }
    splitBySpaces(instance.props.trigger).forEach(function(eventType) {
      if (eventType === "manual") {
        return;
      }
      on(eventType, onTrigger2);
      switch (eventType) {
        case "mouseenter":
          on("mouseleave", onMouseLeave);
          break;
        case "focus":
          on(isIE11 ? "focusout" : "blur", onBlurOrFocusOut);
          break;
        case "focusin":
          on("focusout", onBlurOrFocusOut);
          break;
      }
    });
  }
  function removeListeners() {
    listeners.forEach(function(_ref) {
      var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }
  function onTrigger2(event) {
    var _lastTriggerEvent;
    var shouldScheduleClickHide = false;
    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }
    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === "focus";
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();
    if (!instance.state.isVisible && isMouseEvent(event)) {
      mouseMoveListeners.forEach(function(listener) {
        return listener(event);
      });
    }
    if (event.type === "click" && (instance.props.trigger.indexOf("mouseenter") < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }
    if (event.type === "click") {
      isVisibleFromClick = !shouldScheduleClickHide;
    }
    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }
  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);
    if (event.type === "mousemove" && isCursorOverReferenceOrPopper) {
      return;
    }
    var popperTreeData = getNestedPopperTree().concat(popper).map(function(popper2) {
      var _instance$popperInsta;
      var instance2 = popper2._tippy;
      var state2 = (_instance$popperInsta = instance2.popperInstance) == null ? void 0 : _instance$popperInsta.state;
      if (state2) {
        return {
          popperRect: popper2.getBoundingClientRect(),
          popperState: state2,
          props
        };
      }
      return null;
    }).filter(Boolean);
    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }
  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick;
    if (shouldBail) {
      return;
    }
    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }
    scheduleHide(event);
  }
  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf("focusin") < 0 && event.target !== getCurrentTarget()) {
      return;
    }
    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }
    scheduleHide(event);
  }
  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0 : false;
  }
  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: "$$tippy",
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function fn(_ref2) {
        var state2 = _ref2.state;
        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(attr) {
            if (attr === "placement") {
              box.setAttribute("data-placement", state2.placement);
            } else {
              if (state2.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, "");
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state2.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: "offset",
      options: {
        offset
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];
    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: "arrow",
        options: {
          element: arrow,
          padding: 3
        }
      });
    }
    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
      placement,
      onFirstUpdate,
      modifiers
    }));
  }
  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }
  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode;
    var node = getCurrentTarget();
    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === "parent") {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    }
    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }
    instance.state.isMounted = true;
    createPopperInstance();
    if (true) {
      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", "\n\n", "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", "\n\n", "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", "\n\n", "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
    }
  }
  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll("[data-tippy-root]"));
  }
  function scheduleShow(event) {
    instance.clearDelayTimeouts();
    if (event) {
      invokeHook("onTrigger", [instance, event]);
    }
    addDocumentPress();
    var delay = getDelay(true);
    var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
    if (currentInput.isTouch && touchValue === "hold" && touchDelay) {
      delay = touchDelay;
    }
    if (delay) {
      showTimeout = setTimeout(function() {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }
  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook("onUntrigger", [instance, event]);
    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    }
    if (instance.props.trigger.indexOf("mouseenter") >= 0 && instance.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }
    var delay = getDelay(false);
    if (delay) {
      hideTimeout = setTimeout(function() {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      scheduleHideAnimationFrame = requestAnimationFrame(function() {
        instance.hide();
      });
    }
  }
  function enable() {
    instance.state.isEnabled = true;
  }
  function disable() {
    instance.hide();
    instance.state.isEnabled = false;
  }
  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }
  function setProps(partialProps) {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("setProps"));
    }
    if (instance.state.isDestroyed) {
      return;
    }
    invokeHook("onBeforeUpdate", [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();
    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    }
    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function(node) {
        node.removeAttribute("aria-expanded");
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute("aria-expanded");
    }
    handleAriaExpandedAttribute();
    handleStyles();
    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }
    if (instance.popperInstance) {
      createPopperInstance();
      getNestedPopperTree().forEach(function(nestedPopper) {
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }
    invokeHook("onAfterUpdate", [instance, partialProps]);
  }
  function setContent2(content) {
    instance.setProps({
      content
    });
  }
  function show() {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("show"));
    }
    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    }
    if (getCurrentTarget().hasAttribute("disabled")) {
      return;
    }
    invokeHook("onShow", [instance], false);
    if (instance.props.onShow(instance) === false) {
      return;
    }
    instance.state.isVisible = true;
    if (getIsDefaultRenderFn()) {
      popper.style.visibility = "visible";
    }
    handleStyles();
    addDocumentPress();
    if (!instance.state.isMounted) {
      popper.style.transition = "none";
    }
    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
      setTransitionDuration([box, content], 0);
    }
    onFirstUpdate = function onFirstUpdate2() {
      var _instance$popperInsta2;
      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }
      ignoreOnFirstUpdate = true;
      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;
      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], "visible");
      }
      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance);
      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook("onMount", [instance]);
      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function() {
          instance.state.isShown = true;
          invokeHook("onShown", [instance]);
        });
      }
    };
    mount();
  }
  function hide() {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("hide"));
    }
    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }
    invokeHook("onHide", [instance], false);
    if (instance.props.onHide(instance) === false) {
      return;
    }
    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;
    if (getIsDefaultRenderFn()) {
      popper.style.visibility = "hidden";
    }
    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);
    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], "hidden");
      }
    }
    handleAriaContentAttribute();
    handleAriaExpandedAttribute();
    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }
  function hideWithInteractivity(event) {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("hideWithInteractivity"));
    }
    getDocument().addEventListener("mousemove", debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }
  function unmount() {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("unmount"));
    }
    if (instance.state.isVisible) {
      instance.hide();
    }
    if (!instance.state.isMounted) {
      return;
    }
    destroyPopperInstance();
    getNestedPopperTree().forEach(function(nestedPopper) {
      nestedPopper._tippy.unmount();
    });
    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }
    mountedInstances = mountedInstances.filter(function(i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook("onHidden", [instance]);
  }
  function destroy() {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("destroy"));
    }
    if (instance.state.isDestroyed) {
      return;
    }
    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook("onDestroy", [instance]);
  }
}
function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }
  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  if (true) {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }
  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins
  });
  var elements = getArrayOfElements(targets);
  if (true) {
    var isSingleContentElement = isElement(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", "\n\n", "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", "\n\n", "1) content: element.innerHTML\n", "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var instances = elements.reduce(function(acc, reference) {
    var instance = reference && createTippy(reference, passedProps);
    if (instance) {
      acc.push(instance);
    }
    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}
tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
var applyStylesModifier = Object.assign({}, applyStyles_default, {
  effect: function effect(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
  }
});
tippy.setDefaultProps({
  render
});
var tippy_esm_default = tippy;

// node_modules/@tiptap/extension-bubble-menu/dist/index.js
var BubbleMenuView = class {
  constructor({ editor, element, view, tippyOptions = {}, updateDelay = 250, shouldShow }) {
    this.preventHide = false;
    this.shouldShow = ({ view: view2, state, from, to }) => {
      const { doc, selection } = state;
      const { empty } = selection;
      const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection);
      const isChildOfMenu = this.element.contains(document.activeElement);
      const hasEditorFocus = view2.hasFocus() || isChildOfMenu;
      if (!hasEditorFocus || empty || isEmptyTextBlock || !this.editor.isEditable) {
        return false;
      }
      return true;
    };
    this.mousedownHandler = () => {
      this.preventHide = true;
    };
    this.dragstartHandler = () => {
      this.hide();
    };
    this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    };
    this.blurHandler = ({ event }) => {
      var _a;
      if (this.preventHide) {
        this.preventHide = false;
        return;
      }
      if ((event === null || event === void 0 ? void 0 : event.relatedTarget) && ((_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget))) {
        return;
      }
      this.hide();
    };
    this.tippyBlurHandler = (event) => {
      this.blurHandler({ event });
    };
    this.handleDebouncedUpdate = (view2, oldState) => {
      const selectionChanged = !(oldState === null || oldState === void 0 ? void 0 : oldState.selection.eq(view2.state.selection));
      const docChanged = !(oldState === null || oldState === void 0 ? void 0 : oldState.doc.eq(view2.state.doc));
      if (!selectionChanged && !docChanged) {
        return;
      }
      if (this.updateDebounceTimer) {
        clearTimeout(this.updateDebounceTimer);
      }
      this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(view2, selectionChanged, docChanged, oldState);
      }, this.updateDelay);
    };
    this.updateHandler = (view2, selectionChanged, docChanged, oldState) => {
      var _a, _b, _c;
      const { state, composing } = view2;
      const { selection } = state;
      const isSame = !selectionChanged && !docChanged;
      if (composing || isSame) {
        return;
      }
      this.createTooltip();
      const { ranges } = selection;
      const from = Math.min(...ranges.map((range) => range.$from.pos));
      const to = Math.max(...ranges.map((range) => range.$to.pos));
      const shouldShow2 = (_a = this.shouldShow) === null || _a === void 0 ? void 0 : _a.call(this, {
        editor: this.editor,
        view: view2,
        state,
        oldState,
        from,
        to
      });
      if (!shouldShow2) {
        this.hide();
        return;
      }
      (_b = this.tippy) === null || _b === void 0 ? void 0 : _b.setProps({
        getReferenceClientRect: ((_c = this.tippyOptions) === null || _c === void 0 ? void 0 : _c.getReferenceClientRect) || (() => {
          if (isNodeSelection(state.selection)) {
            let node = view2.nodeDOM(from);
            const nodeViewWrapper = node.dataset.nodeViewWrapper ? node : node.querySelector("[data-node-view-wrapper]");
            if (nodeViewWrapper) {
              node = nodeViewWrapper.firstChild;
            }
            if (node) {
              return node.getBoundingClientRect();
            }
          }
          return posToDOMRect(view2, from, to);
        })
      });
      this.show();
    };
    this.editor = editor;
    this.element = element;
    this.view = view;
    this.updateDelay = updateDelay;
    if (shouldShow) {
      this.shouldShow = shouldShow;
    }
    this.element.addEventListener("mousedown", this.mousedownHandler, { capture: true });
    this.view.dom.addEventListener("dragstart", this.dragstartHandler);
    this.editor.on("focus", this.focusHandler);
    this.editor.on("blur", this.blurHandler);
    this.tippyOptions = tippyOptions;
    this.element.remove();
    this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: editorElement } = this.editor.options;
    const editorIsAttached = !!editorElement.parentElement;
    if (this.tippy || !editorIsAttached) {
      return;
    }
    this.tippy = tippy_esm_default(editorElement, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    });
    if (this.tippy.popper.firstChild) {
      this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler);
    }
  }
  update(view, oldState) {
    const { state } = view;
    const hasValidSelection = state.selection.$from.pos !== state.selection.$to.pos;
    if (this.updateDelay > 0 && hasValidSelection) {
      this.handleDebouncedUpdate(view, oldState);
      return;
    }
    const selectionChanged = !(oldState === null || oldState === void 0 ? void 0 : oldState.selection.eq(view.state.selection));
    const docChanged = !(oldState === null || oldState === void 0 ? void 0 : oldState.doc.eq(view.state.doc));
    this.updateHandler(view, selectionChanged, docChanged, oldState);
  }
  show() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.show();
  }
  hide() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.hide();
  }
  destroy() {
    var _a, _b;
    if ((_a = this.tippy) === null || _a === void 0 ? void 0 : _a.popper.firstChild) {
      this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler);
    }
    (_b = this.tippy) === null || _b === void 0 ? void 0 : _b.destroy();
    this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: true });
    this.view.dom.removeEventListener("dragstart", this.dragstartHandler);
    this.editor.off("focus", this.focusHandler);
    this.editor.off("blur", this.blurHandler);
  }
};
var BubbleMenuPlugin = (options) => {
  return new Plugin({
    key: typeof options.pluginKey === "string" ? new PluginKey(options.pluginKey) : options.pluginKey,
    view: (view) => new BubbleMenuView({ view, ...options })
  });
};
var BubbleMenu = Extension.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    if (!this.options.element) {
      return [];
    }
    return [
      BubbleMenuPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ];
  }
});

// node_modules/@tiptap/react/dist/index.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@tiptap/extension-floating-menu/dist/index.js
var FloatingMenuView = class {
  constructor({ editor, element, view, tippyOptions = {}, shouldShow }) {
    this.preventHide = false;
    this.shouldShow = ({ view: view2, state }) => {
      const { selection } = state;
      const { $anchor, empty } = selection;
      const isRootDepth = $anchor.depth === 1;
      const isEmptyTextBlock = $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent;
      if (!view2.hasFocus() || !empty || !isRootDepth || !isEmptyTextBlock || !this.editor.isEditable) {
        return false;
      }
      return true;
    };
    this.mousedownHandler = () => {
      this.preventHide = true;
    };
    this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    };
    this.blurHandler = ({ event }) => {
      var _a;
      if (this.preventHide) {
        this.preventHide = false;
        return;
      }
      if ((event === null || event === void 0 ? void 0 : event.relatedTarget) && ((_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget))) {
        return;
      }
      this.hide();
    };
    this.tippyBlurHandler = (event) => {
      this.blurHandler({ event });
    };
    this.editor = editor;
    this.element = element;
    this.view = view;
    if (shouldShow) {
      this.shouldShow = shouldShow;
    }
    this.element.addEventListener("mousedown", this.mousedownHandler, { capture: true });
    this.editor.on("focus", this.focusHandler);
    this.editor.on("blur", this.blurHandler);
    this.tippyOptions = tippyOptions;
    this.element.remove();
    this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: editorElement } = this.editor.options;
    const editorIsAttached = !!editorElement.parentElement;
    if (this.tippy || !editorIsAttached) {
      return;
    }
    this.tippy = tippy_esm_default(editorElement, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    });
    if (this.tippy.popper.firstChild) {
      this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler);
    }
  }
  update(view, oldState) {
    var _a, _b, _c;
    const { state } = view;
    const { doc, selection } = state;
    const { from, to } = selection;
    const isSame = oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);
    if (isSame) {
      return;
    }
    this.createTooltip();
    const shouldShow = (_a = this.shouldShow) === null || _a === void 0 ? void 0 : _a.call(this, {
      editor: this.editor,
      view,
      state,
      oldState
    });
    if (!shouldShow) {
      this.hide();
      return;
    }
    (_b = this.tippy) === null || _b === void 0 ? void 0 : _b.setProps({
      getReferenceClientRect: ((_c = this.tippyOptions) === null || _c === void 0 ? void 0 : _c.getReferenceClientRect) || (() => posToDOMRect(view, from, to))
    });
    this.show();
  }
  show() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.show();
  }
  hide() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.hide();
  }
  destroy() {
    var _a, _b;
    if ((_a = this.tippy) === null || _a === void 0 ? void 0 : _a.popper.firstChild) {
      this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler);
    }
    (_b = this.tippy) === null || _b === void 0 ? void 0 : _b.destroy();
    this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: true });
    this.editor.off("focus", this.focusHandler);
    this.editor.off("blur", this.blurHandler);
  }
};
var FloatingMenuPlugin = (options) => {
  return new Plugin({
    key: typeof options.pluginKey === "string" ? new PluginKey(options.pluginKey) : options.pluginKey,
    view: (view) => new FloatingMenuView({ view, ...options })
  });
};
var FloatingMenu = Extension.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    if (!this.options.element) {
      return [];
    }
    return [
      FloatingMenuPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ];
  }
});

// node_modules/@tiptap/react/dist/index.js
var mergeRefs = (...refs) => {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
};
var Portals = ({ renderers }) => {
  return import_react.default.createElement(import_react.default.Fragment, null, Object.entries(renderers).map(([key, renderer]) => {
    return import_react_dom.default.createPortal(renderer.reactElement, renderer.element, key);
  }));
};
var PureEditorContent = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.editorContentRef = import_react.default.createRef();
    this.initialized = false;
    this.state = {
      renderers: {}
    };
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  init() {
    const { editor } = this.props;
    if (editor && editor.options.element) {
      if (editor.contentComponent) {
        return;
      }
      const element = this.editorContentRef.current;
      element.append(...editor.options.element.childNodes);
      editor.setOptions({
        element
      });
      editor.contentComponent = this;
      editor.createNodeViews();
      this.initialized = true;
    }
  }
  maybeFlushSync(fn) {
    if (this.initialized) {
      (0, import_react_dom.flushSync)(fn);
    } else {
      fn();
    }
  }
  setRenderer(id, renderer) {
    this.maybeFlushSync(() => {
      this.setState(({ renderers }) => ({
        renderers: {
          ...renderers,
          [id]: renderer
        }
      }));
    });
  }
  removeRenderer(id) {
    this.maybeFlushSync(() => {
      this.setState(({ renderers }) => {
        const nextRenderers = { ...renderers };
        delete nextRenderers[id];
        return { renderers: nextRenderers };
      });
    });
  }
  componentWillUnmount() {
    const { editor } = this.props;
    if (!editor) {
      return;
    }
    this.initialized = false;
    if (!editor.isDestroyed) {
      editor.view.setProps({
        nodeViews: {}
      });
    }
    editor.contentComponent = null;
    if (!editor.options.element.firstChild) {
      return;
    }
    const newElement = document.createElement("div");
    newElement.append(...editor.options.element.childNodes);
    editor.setOptions({
      element: newElement
    });
  }
  render() {
    const { editor, innerRef, ...rest } = this.props;
    return import_react.default.createElement(
      import_react.default.Fragment,
      null,
      import_react.default.createElement("div", { ref: mergeRefs(innerRef, this.editorContentRef), ...rest }),
      import_react.default.createElement(Portals, { renderers: this.state.renderers })
    );
  }
};
var EditorContentWithKey = (0, import_react.forwardRef)((props, ref) => {
  const key = import_react.default.useMemo(() => {
    return Math.floor(Math.random() * 4294967295).toString();
  }, [props.editor]);
  return import_react.default.createElement(PureEditorContent, {
    key,
    innerRef: ref,
    ...props
  });
});
var EditorContent = import_react.default.memo(EditorContentWithKey);
var Editor2 = class extends Editor {
  constructor() {
    super(...arguments);
    this.contentComponent = null;
  }
};
var useEditor = (options = {}, deps = []) => {
  const editorRef = (0, import_react.useRef)(null);
  const [, forceUpdate] = (0, import_react.useState)({});
  const { onBeforeCreate, onBlur, onCreate: onCreate2, onDestroy: onDestroy2, onFocus, onSelectionUpdate, onTransaction, onUpdate } = options;
  const onBeforeCreateRef = (0, import_react.useRef)(onBeforeCreate);
  const onBlurRef = (0, import_react.useRef)(onBlur);
  const onCreateRef = (0, import_react.useRef)(onCreate2);
  const onDestroyRef = (0, import_react.useRef)(onDestroy2);
  const onFocusRef = (0, import_react.useRef)(onFocus);
  const onSelectionUpdateRef = (0, import_react.useRef)(onSelectionUpdate);
  const onTransactionRef = (0, import_react.useRef)(onTransaction);
  const onUpdateRef = (0, import_react.useRef)(onUpdate);
  (0, import_react.useEffect)(() => {
    if (!editorRef.current) {
      return;
    }
    if (onBeforeCreate) {
      editorRef.current.off("beforeCreate", onBeforeCreateRef.current);
      editorRef.current.on("beforeCreate", onBeforeCreate);
      onBeforeCreateRef.current = onBeforeCreate;
    }
    if (onBlur) {
      editorRef.current.off("blur", onBlurRef.current);
      editorRef.current.on("blur", onBlur);
      onBlurRef.current = onBlur;
    }
    if (onCreate2) {
      editorRef.current.off("create", onCreateRef.current);
      editorRef.current.on("create", onCreate2);
      onCreateRef.current = onCreate2;
    }
    if (onDestroy2) {
      editorRef.current.off("destroy", onDestroyRef.current);
      editorRef.current.on("destroy", onDestroy2);
      onDestroyRef.current = onDestroy2;
    }
    if (onFocus) {
      editorRef.current.off("focus", onFocusRef.current);
      editorRef.current.on("focus", onFocus);
      onFocusRef.current = onFocus;
    }
    if (onSelectionUpdate) {
      editorRef.current.off("selectionUpdate", onSelectionUpdateRef.current);
      editorRef.current.on("selectionUpdate", onSelectionUpdate);
      onSelectionUpdateRef.current = onSelectionUpdate;
    }
    if (onTransaction) {
      editorRef.current.off("transaction", onTransactionRef.current);
      editorRef.current.on("transaction", onTransaction);
      onTransactionRef.current = onTransaction;
    }
    if (onUpdate) {
      editorRef.current.off("update", onUpdateRef.current);
      editorRef.current.on("update", onUpdate);
      onUpdateRef.current = onUpdate;
    }
  }, [onBeforeCreate, onBlur, onCreate2, onDestroy2, onFocus, onSelectionUpdate, onTransaction, onUpdate, editorRef.current]);
  (0, import_react.useEffect)(() => {
    let isMounted = true;
    editorRef.current = new Editor2(options);
    editorRef.current.on("transaction", () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isMounted) {
            forceUpdate({});
          }
        });
      });
    });
    return () => {
      isMounted = false;
    };
  }, deps);
  (0, import_react.useEffect)(() => {
    return () => {
      var _a;
      return (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
    };
  }, []);
  return editorRef.current;
};
var EditorContext = (0, import_react.createContext)({
  editor: null
});
var EditorConsumer = EditorContext.Consumer;
var useCurrentEditor = () => (0, import_react.useContext)(EditorContext);
var EditorProvider = ({ children, slotAfter, slotBefore, ...editorOptions }) => {
  const editor = useEditor(editorOptions);
  if (!editor) {
    return null;
  }
  return import_react.default.createElement(
    EditorContext.Provider,
    { value: { editor } },
    slotBefore,
    import_react.default.createElement(EditorConsumer, null, ({ editor: currentEditor }) => import_react.default.createElement(EditorContent, { editor: currentEditor })),
    children,
    slotAfter
  );
};
var BubbleMenu2 = (props) => {
  const [element, setElement] = (0, import_react.useState)(null);
  const { editor: currentEditor } = useCurrentEditor();
  (0, import_react.useEffect)(() => {
    var _a;
    if (!element) {
      return;
    }
    if (((_a = props.editor) === null || _a === void 0 ? void 0 : _a.isDestroyed) || (currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.isDestroyed)) {
      return;
    }
    const { pluginKey = "bubbleMenu", editor, tippyOptions = {}, updateDelay, shouldShow = null } = props;
    const menuEditor = editor || currentEditor;
    if (!menuEditor) {
      console.warn("BubbleMenu component is not rendered inside of an editor component or does not have editor prop.");
      return;
    }
    const plugin = BubbleMenuPlugin({
      updateDelay,
      editor: menuEditor,
      element,
      pluginKey,
      shouldShow,
      tippyOptions
    });
    menuEditor.registerPlugin(plugin);
    return () => menuEditor.unregisterPlugin(pluginKey);
  }, [props.editor, currentEditor, element]);
  return import_react.default.createElement("div", { ref: setElement, className: props.className, style: { visibility: "hidden" } }, props.children);
};
var FloatingMenu2 = (props) => {
  const [element, setElement] = (0, import_react.useState)(null);
  const { editor: currentEditor } = useCurrentEditor();
  (0, import_react.useEffect)(() => {
    var _a;
    if (!element) {
      return;
    }
    if (((_a = props.editor) === null || _a === void 0 ? void 0 : _a.isDestroyed) || (currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.isDestroyed)) {
      return;
    }
    const { pluginKey = "floatingMenu", editor, tippyOptions = {}, shouldShow = null } = props;
    const menuEditor = editor || currentEditor;
    if (!menuEditor) {
      console.warn("FloatingMenu component is not rendered inside of an editor component or does not have editor prop.");
      return;
    }
    const plugin = FloatingMenuPlugin({
      pluginKey,
      editor: menuEditor,
      element,
      tippyOptions,
      shouldShow
    });
    menuEditor.registerPlugin(plugin);
    return () => menuEditor.unregisterPlugin(pluginKey);
  }, [
    props.editor,
    currentEditor,
    element
  ]);
  return import_react.default.createElement("div", { ref: setElement, className: props.className, style: { visibility: "hidden" } }, props.children);
};
var ReactNodeViewContext = (0, import_react.createContext)({
  onDragStart: void 0
});
var useReactNodeView = () => (0, import_react.useContext)(ReactNodeViewContext);
var NodeViewContent = (props) => {
  const Tag = props.as || "div";
  const { nodeViewContentRef } = useReactNodeView();
  return import_react.default.createElement(Tag, { ...props, ref: nodeViewContentRef, "data-node-view-content": "", style: {
    whiteSpace: "pre-wrap",
    ...props.style
  } });
};
var NodeViewWrapper = import_react.default.forwardRef((props, ref) => {
  const { onDragStart } = useReactNodeView();
  const Tag = props.as || "div";
  return import_react.default.createElement(Tag, { ...props, ref, "data-node-view-wrapper": "", onDragStart, style: {
    whiteSpace: "normal",
    ...props.style
  } });
});
function isClassComponent(Component) {
  return !!(typeof Component === "function" && Component.prototype && Component.prototype.isReactComponent);
}
function isForwardRefComponent(Component) {
  var _a;
  return !!(typeof Component === "object" && ((_a = Component.$$typeof) === null || _a === void 0 ? void 0 : _a.toString()) === "Symbol(react.forward_ref)");
}
var ReactRenderer = class {
  constructor(component, { editor, props = {}, as = "div", className = "", attrs }) {
    this.ref = null;
    this.id = Math.floor(Math.random() * 4294967295).toString();
    this.component = component;
    this.editor = editor;
    this.props = props;
    this.element = document.createElement(as);
    this.element.classList.add("react-renderer");
    if (className) {
      this.element.classList.add(...className.split(" "));
    }
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        this.element.setAttribute(key, attrs[key]);
      });
    }
    this.render();
  }
  render() {
    var _a, _b;
    const Component = this.component;
    const props = this.props;
    if (isClassComponent(Component) || isForwardRefComponent(Component)) {
      props.ref = (ref) => {
        this.ref = ref;
      };
    }
    this.reactElement = import_react.default.createElement(Component, { ...props });
    (_b = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.contentComponent) === null || _b === void 0 ? void 0 : _b.setRenderer(this.id, this);
  }
  updateProps(props = {}) {
    this.props = {
      ...this.props,
      ...props
    };
    this.render();
  }
  destroy() {
    var _a, _b;
    (_b = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.contentComponent) === null || _b === void 0 ? void 0 : _b.removeRenderer(this.id);
  }
};
var ReactNodeView = class extends NodeView {
  mount() {
    const props = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: false,
      extension: this.extension,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode()
    };
    if (!this.component.displayName) {
      const capitalizeFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.substring(1);
      };
      this.component.displayName = capitalizeFirstChar(this.extension.name);
    }
    const ReactNodeViewProvider = (componentProps) => {
      const Component = this.component;
      const onDragStart = this.onDragStart.bind(this);
      const nodeViewContentRef = (element) => {
        if (element && this.contentDOMElement && element.firstChild !== this.contentDOMElement) {
          element.appendChild(this.contentDOMElement);
        }
      };
      return import_react.default.createElement(
        import_react.default.Fragment,
        null,
        import_react.default.createElement(
          ReactNodeViewContext.Provider,
          { value: { onDragStart, nodeViewContentRef } },
          import_react.default.createElement(Component, { ...componentProps })
        )
      );
    };
    ReactNodeViewProvider.displayName = "ReactNodeView";
    if (this.node.isLeaf) {
      this.contentDOMElement = null;
    } else if (this.options.contentDOMElementTag) {
      this.contentDOMElement = document.createElement(this.options.contentDOMElementTag);
    } else {
      this.contentDOMElement = document.createElement(this.node.isInline ? "span" : "div");
    }
    if (this.contentDOMElement) {
      this.contentDOMElement.style.whiteSpace = "inherit";
    }
    let as = this.node.isInline ? "span" : "div";
    if (this.options.as) {
      as = this.options.as;
    }
    const { className = "" } = this.options;
    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
    this.editor.on("selectionUpdate", this.handleSelectionUpdate);
    this.renderer = new ReactRenderer(ReactNodeViewProvider, {
      editor: this.editor,
      props,
      as,
      className: `node-${this.node.type.name} ${className}`.trim(),
      attrs: this.options.attrs
    });
  }
  get dom() {
    var _a;
    if (this.renderer.element.firstElementChild && !((_a = this.renderer.element.firstElementChild) === null || _a === void 0 ? void 0 : _a.hasAttribute("data-node-view-wrapper"))) {
      throw Error("Please use the NodeViewWrapper component for your node view.");
    }
    return this.renderer.element;
  }
  get contentDOM() {
    if (this.node.isLeaf) {
      return null;
    }
    return this.contentDOMElement;
  }
  handleSelectionUpdate() {
    const { from, to } = this.editor.state.selection;
    if (from <= this.getPos() && to >= this.getPos() + this.node.nodeSize) {
      if (this.renderer.props.selected) {
        return;
      }
      this.selectNode();
    } else {
      if (!this.renderer.props.selected) {
        return;
      }
      this.deselectNode();
    }
  }
  update(node, decorations) {
    const updateProps = (props) => {
      this.renderer.updateProps(props);
    };
    if (node.type !== this.node.type) {
      return false;
    }
    if (typeof this.options.update === "function") {
      const oldNode = this.node;
      const oldDecorations = this.decorations;
      this.node = node;
      this.decorations = decorations;
      return this.options.update({
        oldNode,
        oldDecorations,
        newNode: node,
        newDecorations: decorations,
        updateProps: () => updateProps({ node, decorations })
      });
    }
    if (node === this.node && this.decorations === decorations) {
      return true;
    }
    this.node = node;
    this.decorations = decorations;
    updateProps({ node, decorations });
    return true;
  }
  selectNode() {
    this.renderer.updateProps({
      selected: true
    });
    this.renderer.element.classList.add("ProseMirror-selectednode");
  }
  deselectNode() {
    this.renderer.updateProps({
      selected: false
    });
    this.renderer.element.classList.remove("ProseMirror-selectednode");
  }
  destroy() {
    this.renderer.destroy();
    this.editor.off("selectionUpdate", this.handleSelectionUpdate);
    this.contentDOMElement = null;
  }
};
function ReactNodeViewRenderer(component, options) {
  return (props) => {
    if (!props.editor.contentComponent) {
      return {};
    }
    return new ReactNodeView(component, props, options);
  };
}
export {
  BubbleMenu2 as BubbleMenu,
  CommandManager,
  Editor2 as Editor,
  EditorConsumer,
  EditorContent,
  EditorContext,
  EditorProvider,
  Extension,
  FloatingMenu2 as FloatingMenu,
  InputRule,
  Mark,
  Node,
  NodePos,
  NodeView,
  NodeViewContent,
  NodeViewWrapper,
  PasteRule,
  PureEditorContent,
  ReactNodeViewRenderer,
  ReactRenderer,
  Tracker,
  callOrReturn,
  combineTransactionSteps,
  createChainableState,
  createDocument,
  createNodeFromContent,
  createStyleTag,
  defaultBlockAt,
  deleteProps,
  elementFromString,
  escapeForRegEx,
  extensions,
  findChildren,
  findChildrenInRange,
  findDuplicates,
  findParentNode,
  findParentNodeClosestToPos,
  fromString,
  generateHTML,
  generateJSON,
  generateText,
  getAttributes,
  getAttributesFromExtensions,
  getChangedRanges,
  getDebugJSON,
  getExtensionField,
  getHTMLFromFragment,
  getMarkAttributes,
  getMarkRange,
  getMarkType,
  getMarksBetween,
  getNodeAtPosition,
  getNodeAttributes,
  getNodeType,
  getRenderedAttributes,
  getSchema,
  getSchemaByResolvedExtensions,
  getSchemaTypeByName,
  getSchemaTypeNameByName,
  getSplittedAttributes,
  getText,
  getTextBetween,
  getTextContentFromNodes,
  getTextSerializersFromSchema,
  injectExtensionAttributesToParseRule,
  inputRulesPlugin,
  isActive,
  isAtEndOfNode,
  isAtStartOfNode,
  isEmptyObject,
  isExtensionRulesEnabled,
  isFunction,
  isList,
  isMacOS,
  isMarkActive,
  isNodeActive,
  isNodeEmpty,
  isNodeSelection,
  isNumber,
  isPlainObject,
  isRegExp,
  isString,
  isTextSelection,
  isiOS,
  markInputRule,
  markPasteRule,
  mergeAttributes,
  mergeDeep,
  minMax,
  nodeInputRule,
  nodePasteRule,
  objectIncludes,
  pasteRulesPlugin,
  posToDOMRect,
  removeDuplicates,
  resolveFocusPosition,
  selectionToInsertionEnd,
  splitExtensions,
  textInputRule,
  textPasteRule,
  textblockTypeInputRule,
  useCurrentEditor,
  useEditor,
  wrappingInputRule
};
//# sourceMappingURL=@tiptap_react.js.map
