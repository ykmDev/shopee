import {
  FaBars
} from "./chunk-MZLUYT2I.js";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCalendar,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiMoon,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronUp,
  HiOutlineX,
  HiStar,
  HiSun,
  HiX
} from "./chunk-3K2NTKRG.js";
import "./chunk-SZTLHPKZ.js";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead
} from "./chunk-WLANUFXR.js";
import {
  require_jsx_runtime
} from "./chunk-2U63CA67.js";
import "./chunk-OO45PHZ3.js";
import {
  require_react
} from "./chunk-TGJCFA52.js";
import {
  __toESM
} from "./chunk-5HFSU4IV.js";

// node_modules/flowbite-react/lib/esm/components/Accordion/Accordion.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var import_react3 = __toESM(require_react());

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = "-";
function createClassUtils(config) {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  function getClassGroupId(className) {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  var _a;
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return (_a = classPartObject.validators.find(({
    validator
  }) => validator(classRest))) == null ? void 0 : _a.classGroupId;
}
var arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  const {
    theme: theme2,
    prefix
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme2);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme2) {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme2), classPartObject, classGroupId, theme2);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme2);
    });
  });
}
function getPart(classPartObject, path) {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  function update(key, value) {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
}
var IMPORTANT_MODIFIER = "!";
function createSplitModifiers(config) {
  const separator = config.separator;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  return function splitModifiers(className) {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}
var SPLIT_CLASSES_REGEX = /\s+/;
function mergeClassList(classList, configUtils) {
  const {
    splitModifiers,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map((originalClassName) => {
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = splitModifiers(originalClassName);
    let classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter((parsed) => {
    if (!parsed.isTailwindClass) {
      return true;
    }
    const {
      modifierId,
      classGroupId,
      hasPostfixModifier
    } = parsed;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach((group) => classGroupsInConflict.add(modifierId + group));
    return true;
  }).reverse().map((parsed) => parsed.originalClassName).join(" ");
}
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key) {
  const themeGetter = (theme2) => theme2[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isNumber(value) {
  return Boolean(value) && !Number.isNaN(Number(value));
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, "number", isNumber);
}
function isInteger(value) {
  return Boolean(value) && Number.isInteger(Number(value));
}
function isPercent(value) {
  return value.endsWith("%") && isNumber(value.slice(0, -1));
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
var sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, sizeLabels, isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, "position", isNever);
}
var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
function isArbitraryImage(value) {
  return getIsArbitraryValue(value, imageLabels, isImage);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, "", isShadow);
}
function isAny() {
  return true;
}
function getIsArbitraryValue(value, label, testValue) {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
}
function isNever() {
  return false;
}
function isShadow(value) {
  return shadowRegex.test(value);
}
function isImage(value) {
  return imageRegex.test(value);
}
var validators = Object.defineProperty({
  __proto__: null,
  isAny,
  isArbitraryImage,
  isArbitraryLength,
  isArbitraryNumber,
  isArbitraryPosition,
  isArbitraryShadow,
  isArbitrarySize,
  isArbitraryValue,
  isInteger,
  isLength,
  isNumber,
  isPercent,
  isTshirtSize
}, Symbol.toStringTag, {
  value: "Module"
});
function getDefaultConfig() {
  const colors = fromTheme("colors");
  const spacing = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumber = () => [isNumber, isArbitraryNumber];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var twMerge = createTailwindMerge(getDefaultConfig);

// node_modules/flowbite-react/lib/esm/helpers/is-object.js
function isObject(item) {
  return item !== null && typeof item === "object" && item.constructor === Object;
}

// node_modules/flowbite-react/lib/esm/helpers/clone-deep.js
function cloneDeep(source) {
  if (!isObject(source)) {
    return source;
  }
  const output = {};
  for (const key in source) {
    output[key] = cloneDeep(source[key]);
  }
  return output;
}

// node_modules/flowbite-react/lib/esm/helpers/merge-deep.js
function mergeDeep(target, source) {
  if (isObject(source) && Object.keys(source).length === 0) {
    return cloneDeep({ ...target, ...source });
  }
  const output = { ...target, ...source };
  if (isObject(source) && isObject(target)) {
    for (const key in source) {
      if (isObject(source[key]) && key in target && isObject(target[key])) {
        output[key] = mergeDeep(target[key], source[key]);
      } else {
        output[key] = isObject(source[key]) ? cloneDeep(source[key]) : source[key];
      }
    }
  }
  return output;
}

// node_modules/flowbite-react/lib/esm/components/Accordion/theme.js
var accordionTheme = {
  root: {
    base: "divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700",
    flush: {
      off: "rounded-lg border",
      on: "border-b"
    }
  },
  content: {
    base: "py-5 px-5 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg"
  },
  title: {
    arrow: {
      base: "h-6 w-6 shrink-0",
      open: {
        off: "",
        on: "rotate-180"
      }
    },
    base: "flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-gray-500 dark:text-gray-400",
    flush: {
      off: "hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
      on: "bg-transparent dark:bg-transparent"
    },
    heading: "",
    open: {
      off: "",
      on: "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Alert/theme.js
var alertTheme = {
  base: "flex flex-col gap-2 p-4 text-sm",
  borderAccent: "border-t-4",
  closeButton: {
    base: "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2",
    icon: "w-5 h-5",
    color: {
      info: "bg-cyan-100 text-cyan-500 hover:bg-cyan-200 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600 dark:hover:bg-cyan-300",
      gray: "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
      failure: "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
      success: "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
      warning: "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300",
      red: "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
      green: "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
      yellow: "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300",
      blue: "bg-cyan-100 text-cyan-500 hover:bg-cyan-200 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600 dark:hover:bg-cyan-300",
      cyan: "bg-cyan-100 text-cyan-500 hover:bg-cyan-200 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600 dark:hover:bg-cyan-300",
      pink: "bg-pink-100 text-pink-500 hover:bg-pink-200 focus:ring-pink-400 dark:bg-pink-200 dark:text-pink-600 dark:hover:bg-pink-300",
      lime: "bg-lime-100 text-lime-500 hover:bg-lime-200 focus:ring-lime-400 dark:bg-lime-200 dark:text-lime-600 dark:hover:bg-lime-300",
      dark: "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-300",
      indigo: "bg-indigo-100 text-indigo-500 hover:bg-indigo-200 focus:ring-indigo-400 dark:bg-indigo-200 dark:text-indigo-600 dark:hover:bg-indigo-300",
      purple: "bg-purple-100 text-purple-500 hover:bg-purple-200 focus:ring-purple-400 dark:bg-purple-200 dark:text-purple-600 dark:hover:bg-purple-300",
      teal: "bg-teal-100 text-teal-500 hover:bg-teal-200 focus:ring-teal-400 dark:bg-teal-200 dark:text-teal-600 dark:hover:bg-teal-300",
      light: "bg-gray-50 text-gray-500 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
    }
  },
  color: {
    info: "text-cyan-700 bg-cyan-100 border-cyan-500 dark:bg-cyan-200 dark:text-cyan-800",
    gray: "text-gray-700 bg-gray-100 border-gray-500 dark:bg-gray-700 dark:text-gray-300",
    failure: "text-red-700 bg-red-100 border-red-500 dark:bg-red-200 dark:text-red-800",
    success: "text-green-700 bg-green-100 border-green-500 dark:bg-green-200 dark:text-green-800",
    warning: "text-yellow-700 bg-yellow-100 border-yellow-500 dark:bg-yellow-200 dark:text-yellow-800",
    red: "text-red-700 bg-red-100 border-red-500 dark:bg-red-200 dark:text-red-800",
    green: "text-green-700 bg-green-100 border-green-500 dark:bg-green-200 dark:text-green-800",
    yellow: "text-yellow-700 bg-yellow-100 border-yellow-500 dark:bg-yellow-200 dark:text-yellow-800",
    blue: "text-cyan-700 bg-cyan-100 border-cyan-500 dark:bg-cyan-200 dark:text-cyan-800",
    cyan: "text-cyan-700 bg-cyan-100 border-cyan-500 dark:bg-cyan-200 dark:text-cyan-800",
    pink: "text-pink-700 bg-pink-100 border-pink-500 dark:bg-pink-200 dark:text-pink-800",
    lime: "text-lime-700 bg-lime-100 border-lime-500 dark:bg-lime-200 dark:text-lime-800",
    dark: "text-gray-200 bg-gray-800 border-gray-600 dark:bg-gray-900 dark:text-gray-300",
    indigo: "text-indigo-700 bg-indigo-100 border-indigo-500 dark:bg-indigo-200 dark:text-indigo-800",
    purple: "text-purple-700 bg-purple-100 border-purple-500 dark:bg-purple-200 dark:text-purple-800",
    teal: "text-teal-700 bg-teal-100 border-teal-500 dark:bg-teal-200 dark:text-teal-800",
    light: "text-gray-600 bg-gray-50 border-gray-400 dark:bg-gray-500 dark:text-gray-200"
  },
  icon: "mr-3 inline h-5 w-5 flex-shrink-0",
  rounded: "rounded-lg",
  wrapper: "flex items-center"
};

// node_modules/flowbite-react/lib/esm/components/Avatar/theme.js
var avatarTheme = {
  root: {
    base: "flex justify-center items-center space-x-4 rounded",
    bordered: "p-1 ring-2",
    rounded: "rounded-full",
    color: {
      dark: "ring-gray-800 dark:ring-gray-800",
      failure: "ring-red-500 dark:ring-red-700",
      gray: "ring-gray-500 dark:ring-gray-400",
      info: "ring-cyan-400 dark:ring-cyan-800",
      light: "ring-gray-300 dark:ring-gray-500",
      purple: "ring-purple-500 dark:ring-purple-600",
      success: "ring-green-500 dark:ring-green-500",
      warning: "ring-yellow-300 dark:ring-yellow-500",
      pink: "ring-pink-500 dark:ring-pink-500"
    },
    img: {
      base: "rounded",
      off: "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
      on: "",
      placeholder: "absolute w-auto h-auto text-gray-400 -bottom-1"
    },
    size: {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-20 h-20",
      xl: "w-36 h-36"
    },
    stacked: "ring-2 ring-gray-300 dark:ring-gray-500",
    statusPosition: {
      "bottom-left": "-bottom-1 -left-1",
      "bottom-center": "-bottom-1 center",
      "bottom-right": "-bottom-1 -right-1",
      "top-left": "-top-1 -left-1",
      "top-center": "-top-1 center",
      "top-right": "-top-1 -right-1",
      "center-right": "center -right-1",
      center: "center center",
      "center-left": "center -left-1"
    },
    status: {
      away: "bg-yellow-400",
      base: "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
      busy: "bg-red-400",
      offline: "bg-gray-400",
      online: "bg-green-400"
    },
    initials: {
      text: "font-medium text-gray-600 dark:text-gray-300",
      base: "inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-600"
    }
  },
  group: {
    base: "flex -space-x-4"
  },
  groupCounter: {
    base: "relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500"
  }
};

// node_modules/flowbite-react/lib/esm/components/Badge/theme.js
var badgeTheme = {
  root: {
    base: "flex h-fit items-center gap-1 font-semibold",
    color: {
      info: "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
      gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600",
      failure: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300",
      success: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-300",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300",
      indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-300",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-300",
      pink: "bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900 group-hover:bg-pink-200 dark:group-hover:bg-pink-300",
      blue: "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-900 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
      cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-900 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
      dark: "bg-gray-600 text-gray-100 dark:bg-gray-900 dark:text-gray-200 group-hover:bg-gray-500 dark:group-hover:bg-gray-700",
      light: "bg-gray-200 text-gray-800 dark:bg-gray-400 dark:text-gray-900 group-hover:bg-gray-300 dark:group-hover:bg-gray-500",
      green: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-300",
      lime: "bg-lime-100 text-lime-800 dark:bg-lime-200 dark:text-lime-900 group-hover:bg-lime-200 dark:group-hover:bg-lime-300",
      red: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300",
      teal: "bg-teal-100 text-teal-800 dark:bg-teal-200 dark:text-teal-900 group-hover:bg-teal-200 dark:group-hover:bg-teal-300",
      yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300"
    },
    href: "group",
    size: {
      xs: "p-1 text-xs",
      sm: "p-1.5 text-sm"
    }
  },
  icon: {
    off: "rounded px-2 py-0.5",
    on: "rounded-full p-1.5",
    size: {
      xs: "w-3 h-3",
      sm: "w-3.5 h-3.5"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Blockquote/theme.js
var blockquoteTheme = {
  root: {
    base: "text-xl italic font-semibold text-gray-900 dark:text-white"
  }
};

// node_modules/flowbite-react/lib/esm/components/Breadcrumb/theme.js
var breadcrumbTheme = {
  root: {
    base: "",
    list: "flex items-center"
  },
  item: {
    base: "group flex items-center",
    chevron: "mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2",
    href: {
      off: "flex items-center text-sm font-medium text-gray-500 dark:text-gray-400",
      on: "flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    },
    icon: "mr-2 h-4 w-4"
  }
};

// node_modules/flowbite-react/lib/esm/components/Button/theme.js
var buttonTheme = {
  base: "group flex items-stretch items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none",
  fullSized: "w-full",
  color: {
    dark: "text-white bg-gray-800 border border-transparent enabled:hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700",
    failure: "text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900",
    gray: "text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2",
    info: "text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800",
    light: "text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700",
    purple: "text-white bg-purple-700 border border-transparent enabled:hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:enabled:hover:bg-purple-700 dark:focus:ring-purple-900",
    success: "text-white bg-green-700 border border-transparent enabled:hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800",
    warning: "text-white bg-yellow-400 border border-transparent enabled:hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
    blue: "text-white bg-blue-700 border border-transparent enabled:hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    cyan: "text-cyan-900 bg-white border border-cyan-300 enabled:hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:text-white dark:border-cyan-600 dark:enabled:hover:bg-cyan-700 dark:enabled:hover:border-cyan-700 dark:focus:ring-cyan-700",
    green: "text-green-900 bg-white border border-green-300 enabled:hover:bg-green-100 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:text-white dark:border-green-600 dark:enabled:hover:bg-green-700 dark:enabled:hover:border-green-700 dark:focus:ring-green-700",
    indigo: "text-indigo-900 bg-white border border-indigo-300 enabled:hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:text-white dark:border-indigo-600 dark:enabled:hover:bg-indigo-700 dark:enabled:hover:border-indigo-700 dark:focus:ring-indigo-700",
    lime: "text-lime-900 bg-white border border-lime-300 enabled:hover:bg-lime-100 focus:ring-4 focus:ring-lime-300 dark:bg-lime-600 dark:text-white dark:border-lime-600 dark:enabled:hover:bg-lime-700 dark:enabled:hover:border-lime-700 dark:focus:ring-lime-700",
    pink: "text-pink-900 bg-white border border-pink-300 enabled:hover:bg-pink-100 focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:text-white dark:border-pink-600 dark:enabled:hover:bg-pink-700 dark:enabled:hover:border-pink-700 dark:focus:ring-pink-700",
    red: "text-red-900 bg-white border border-red-300 enabled:hover:bg-red-100 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
    teal: "text-teal-900 bg-white border border-teal-300 enabled:hover:bg-teal-100 focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:text-white dark:border-teal-600 dark:enabled:hover:bg-teal-700 dark:enabled:hover:border-teal-700 dark:focus:ring-teal-700",
    yellow: "text-yellow-900 bg-white border border-yellow-300 enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:text-white dark:border-yellow-600 dark:enabled:hover:bg-yellow-700 dark:enabled:hover:border-yellow-700 dark:focus:ring-yellow-700"
  },
  disabled: "cursor-not-allowed opacity-50",
  isProcessing: "cursor-wait",
  spinnerSlot: "absolute h-full top-0 flex items-center animate-fade-in",
  spinnerLeftPosition: {
    xs: "left-2",
    sm: "left-3",
    md: "left-4",
    lg: "left-5",
    xl: "left-6"
  },
  gradient: {
    cyan: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
    failure: "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800",
    info: "text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 ",
    lime: "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800",
    pink: "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800",
    purple: "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800",
    success: "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800",
    teal: "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
  },
  gradientDuoTone: {
    cyanToBlue: "text-white bg-gradient-to-r from-cyan-500 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
    greenToBlue: "text-white bg-gradient-to-br from-green-400 to-cyan-600 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800",
    pinkToOrange: "text-white bg-gradient-to-br from-pink-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800",
    purpleToBlue: "text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
    purpleToPink: "text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800",
    redToYellow: "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400",
    tealToLime: "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 focus:ring-4 focus:ring-lime-200 dark:focus:ring-teal-700"
  },
  inner: {
    base: "flex items-stretch items-center transition-all duration-200",
    position: {
      none: "",
      start: "rounded-r-none",
      middle: "rounded-none",
      end: "rounded-l-none"
    },
    outline: "border border-transparent",
    isProcessingPadding: {
      xs: "pl-8",
      sm: "pl-10",
      md: "pl-12",
      lg: "pl-16",
      xl: "pl-20"
    }
  },
  label: "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
  outline: {
    color: {
      gray: "border border-gray-900 dark:border-white",
      default: "border-0",
      light: ""
    },
    off: "",
    on: "flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
    pill: {
      off: "rounded-md",
      on: "rounded-full"
    }
  },
  pill: {
    off: "rounded-lg",
    on: "rounded-full"
  },
  size: {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
    xl: "text-base px-6 py-3"
  }
};
var buttonGroupTheme = {
  base: "inline-flex",
  position: {
    none: "focus:ring-2",
    start: "rounded-r-none",
    middle: "rounded-none border-l-0 pl-0",
    end: "rounded-l-none border-l-0 pl-0"
  }
};

// node_modules/flowbite-react/lib/esm/components/Card/theme.js
var cardTheme = {
  root: {
    base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
    children: "flex h-full flex-col justify-center gap-4 p-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row"
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700"
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-t-lg",
      on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Carousel/theme.js
var carouselTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl: "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl: "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
  },
  indicators: {
    active: {
      off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "bg-white dark:bg-gray-800"
    },
    base: "h-3 w-3 rounded-full",
    wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center"
    }
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x"
  }
};

// node_modules/flowbite-react/lib/esm/components/Checkbox/theme.js
var checkboxTheme = {
  root: {
    base: "h-4 w-4 rounded focus:ring-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100",
    color: {
      default: "focus:ring-cyan-600 dark:ring-offset-gray-800 dark:focus:ring-cyan-600 text-cyan-600",
      dark: "focus:ring-gray-800 dark:ring-offset-gray-800 dark:focus:ring-gray-800 text-gray-800",
      failure: "focus:ring-red-900 dark:ring-offset-red-900 dark:focus:ring-red-900 text-red-900",
      gray: "focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900 text-gray-900",
      info: "focus:ring-cyan-800 dark:ring-offset-gray-800 dark:focus:ring-cyan-800 text-cyan-800",
      light: "focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900 text-gray-900",
      purple: "focus:ring-purple-600 dark:ring-offset-purple-600 dark:focus:ring-purple-600 text-purple-600",
      success: "focus:ring-green-800 dark:ring-offset-green-800 dark:focus:ring-green-800 text-green-800",
      warning: "focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400 text-yellow-400",
      blue: "focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700 text-blue-700",
      cyan: "focus:ring-cyan-600 dark:ring-offset-cyan-600 dark:focus:ring-cyan-600 text-cyan-600",
      green: "focus:ring-green-600 dark:ring-offset-green-600 dark:focus:ring-green-600 text-green-600",
      indigo: "focus:ring-indigo-700 dark:ring-offset-indigo-700 dark:focus:ring-indigo-700 text-indigo-700",
      lime: "focus:ring-lime-700 dark:ring-offset-lime-700 dark:focus:ring-lime-700 text-lime-700",
      pink: "focus:ring-pink-600 dark:ring-offset-pink-600 dark:focus:ring-pink-600 text-pink-600",
      red: "focus:ring-red-600 dark:ring-offset-red-600 dark:focus:ring-red-600 text-red-600",
      teal: "focus:ring-teal-600 dark:ring-offset-teal-600 dark:focus:ring-teal-600 text-teal-600",
      yellow: "focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400 text-yellow-400"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/DarkThemeToggle/theme.js
var darkThemeToggleTheme = {
  root: {
    base: "rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
    icon: "h-5 w-5"
  }
};

// node_modules/flowbite-react/lib/esm/components/Datepicker/theme.js
var datePickerTheme = {
  root: {
    base: "relative"
  },
  popup: {
    root: {
      base: "absolute top-10 z-50 block pt-2",
      inline: "relative top-0 z-auto",
      inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
    },
    header: {
      base: "",
      title: "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
      selectors: {
        base: "flex justify-between mb-2",
        button: {
          base: "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
          prev: "",
          next: "",
          view: ""
        }
      }
    },
    view: {
      base: "p-1"
    },
    footer: {
      base: "flex mt-2 space-x-2",
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
        today: "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
        clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      }
    }
  },
  views: {
    days: {
      header: {
        base: "grid grid-cols-7 mb-1",
        title: "dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
      },
      items: {
        base: "grid w-64 grid-cols-7",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500"
        }
      }
    },
    months: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500"
        }
      }
    },
    years: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500"
        }
      }
    },
    decades: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500"
        }
      }
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Dropdown/theme.js
var dropdownTheme = {
  arrowIcon: "ml-2 h-4 w-4",
  content: "py-1 focus:outline-none",
  floating: {
    animation: "transition-opacity",
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45",
      style: {
        dark: "bg-gray-900 dark:bg-gray-700",
        light: "bg-white",
        auto: "bg-white dark:bg-gray-700"
      },
      placement: "-4px"
    },
    base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
    content: "py-1 text-sm text-gray-700 dark:text-gray-200",
    divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
    header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
    hidden: "invisible opacity-0",
    item: {
      container: "",
      base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
      icon: "mr-2 h-4 w-4"
    },
    style: {
      dark: "bg-gray-900 text-white dark:bg-gray-700",
      light: "border border-gray-200 bg-white text-gray-900",
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
    },
    target: "w-fit"
  },
  inlineWrapper: "flex items-center"
};

// node_modules/flowbite-react/lib/esm/components/FileInput/theme.js
var fileInputTheme = {
  root: {
    base: "flex"
  },
  field: {
    base: "relative w-full",
    input: {
      base: "rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      sizes: {
        sm: "sm:text-xs",
        md: "text-sm",
        lg: "sm:text-md"
      },
      colors: {
        gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        failure: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
        success: "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
      }
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/FloatingLabel/theme.js
var floatingLabelTheme = {
  input: {
    default: {
      filled: {
        sm: "peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-xs text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500",
        md: "peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
      },
      outlined: {
        sm: "border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-xs text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500",
        md: "border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
      },
      standard: {
        sm: "block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
        md: "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      }
    },
    success: {
      filled: {
        sm: "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-xs text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-green-600 dark:border-green-500 appearance-none dark:text-white dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",
        md: "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-green-600 dark:border-green-500 appearance-none dark:text-white dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
      },
      outlined: {
        sm: "block px-2.5 pb-2.5 pt-4 w-full text-xs text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",
        md: "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
      },
      standard: {
        sm: "block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer",
        md: "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
      }
    },
    error: {
      filled: {
        sm: "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-xs text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 appearance-none dark:text-white dark:border-red-500 focus:outline-none focus:ring-0 border-red-600 focus:border-red-600 dark:focus-border-red-500 peer",
        md: "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 appearance-none dark:text-white dark:border-red-500 focus:outline-none focus:ring-0 border-red-600 focus:border-red-600 dark:focus-border-red-500 peer"
      },
      outlined: {
        sm: "block px-2.5 pb-2.5 pt-4 w-full text-xs text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer",
        md: "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
      },
      standard: {
        sm: "block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer",
        md: "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
      }
    }
  },
  label: {
    default: {
      filled: {
        sm: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-xs text-gray-500  duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500",
        md: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
      },
      outlined: {
        sm: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-xs text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500",
        md: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
      },
      standard: {
        sm: "absolute text-xs text-gray-500 dark:text-gray-400  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        md: "absolute text-sm text-gray-500 dark:text-gray-400  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      }
    },
    success: {
      filled: {
        sm: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-sm text-green-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500",
        md: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-sm text-green-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500"
      },
      outlined: {
        sm: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-sm text-green-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-green-500",
        md: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-sm text-green-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-green-500"
      },
      standard: {
        sm: "absolute text-xs text-green-600 dark:text-green-500  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        md: "absolute text-sm text-green-600 dark:text-green-500  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      }
    },
    error: {
      filled: {
        sm: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-xs text-red-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-red-500",
        md: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-xs text-red-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-red-500"
      },
      outlined: {
        sm: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-xs text-red-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-red-500",
        md: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-xs text-red-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-red-500"
      },
      standard: {
        sm: "absolute text-xs text-red-600 dark:text-red-500  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
        md: "absolute text-sm text-red-600 dark:text-red-500  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      }
    }
  },
  helperText: {
    default: "mt-2 text-xs text-gray-600 dark:text-gray-400",
    success: "mt-2 text-xs text-green-600 dark:text-green-400",
    error: "mt-2 text-xs text-red-600 dark:text-red-400"
  }
};

// node_modules/flowbite-react/lib/esm/components/Footer/theme.js
var footerTheme = {
  root: {
    base: "w-full rounded-lg bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
    container: "w-full p-6",
    bgDark: "bg-gray-800"
  },
  groupLink: {
    base: "flex flex-wrap text-sm text-gray-500 dark:text-white",
    link: {
      base: "last:mr-0 md:mr-6 me-4",
      href: "hover:underline"
    },
    col: "flex-col space-y-4"
  },
  icon: {
    base: "text-gray-500 dark:hover:text-white",
    size: "h-5 w-5"
  },
  title: {
    base: "mb-6 text-sm font-semibold uppercase text-gray-500 dark:text-white"
  },
  divider: {
    base: "w-full my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
  },
  copyright: {
    base: "text-sm text-gray-500 dark:text-gray-400 sm:text-center",
    href: "ml-1 hover:underline",
    span: "ml-1"
  },
  brand: {
    base: "mb-4 flex items-center sm:mb-0",
    img: "mr-3 h-8",
    span: "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white"
  }
};

// node_modules/flowbite-react/lib/esm/components/HelperText/theme.js
var helperTextTheme = {
  root: {
    base: "mt-2 text-sm",
    colors: {
      gray: "text-gray-500 dark:text-gray-400",
      info: "text-cyan-700 dark:text-cyan-800",
      success: "text-green-600 dark:text-green-500",
      failure: "text-red-600 dark:text-red-500",
      warning: "text-yellow-500 dark:text-yellow-600"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Kbd/theme.js
var kbdTheme = {
  root: {
    base: "px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500",
    icon: "inline-block"
  }
};

// node_modules/flowbite-react/lib/esm/components/Label/theme.js
var labelTheme = {
  root: {
    base: "text-sm font-medium",
    disabled: "opacity-50",
    colors: {
      default: "text-gray-900 dark:text-white",
      info: "text-cyan-500 dark:text-cyan-600",
      failure: "text-red-700 dark:text-red-500",
      warning: "text-yellow-500 dark:text-yellow-600",
      success: "text-green-700 dark:text-green-500"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/List/theme.js
var listTheme = {
  root: {
    base: "space-y-1 text-gray-500 list-inside dark:text-gray-400",
    ordered: {
      off: "list-disc",
      on: "list-decimal"
    },
    horizontal: "flex flex-wrap items-center space-x-4 space-y-0 justify-center list-none",
    unstyled: "list-none",
    nested: "ps-5 mt-2"
  }
};

// node_modules/flowbite-react/lib/esm/components/ListGroup/theme.js
var listGroupTheme = {
  root: {
    base: "list-none rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-left"
  },
  item: {
    base: "[&>*]:first:rounded-t-lg [&>*]:last:rounded-b-lg [&>*]:last:border-b-0",
    link: {
      base: "flex items-center w-full border-b border-gray-200 py-2 px-4 dark:border-gray-600",
      active: {
        off: "hover:bg-gray-100 hover:text-cyan-700 focus:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500",
        on: "bg-cyan-700 text-white dark:bg-gray-800"
      },
      disabled: {
        off: "",
        on: "hover:bg-gray-100 text-gray-900 hover:text-gray-900 focus:text-gray-900 bg-gray-100 cursor-not-allowed"
      },
      href: {
        off: "",
        on: ""
      },
      icon: "mr-2 h-4 w-4 fill-current"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Modal/theme.js
var modalTheme = {
  root: {
    base: "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
      off: "hidden"
    },
    sizes: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl"
    },
    positions: {
      "top-left": "items-start justify-start",
      "top-center": "items-start justify-center",
      "top-right": "items-start justify-end",
      "center-left": "items-center justify-start",
      center: "items-center justify-center",
      "center-right": "items-center justify-end",
      "bottom-right": "items-end justify-end",
      "bottom-center": "items-end justify-center",
      "bottom-left": "items-end justify-start"
    }
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner: "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]"
  },
  body: {
    base: "p-6 flex-1 overflow-auto",
    popup: "pt-0"
  },
  header: {
    base: "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5",
    popup: "p-2 border-b-0",
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5"
    }
  },
  footer: {
    base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
    popup: "border-t"
  }
};

// node_modules/flowbite-react/lib/esm/components/Navbar/theme.js
var navbarTheme = {
  root: {
    base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
    rounded: {
      on: "rounded",
      off: ""
    },
    bordered: {
      on: "border",
      off: ""
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-between",
      fluid: {
        on: "",
        off: "container"
      }
    }
  },
  brand: {
    base: "flex items-center"
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: ""
    }
  },
  link: {
    base: "block py-2 pr-4 pl-3 md:p-0",
    active: {
      on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
      off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: ""
    }
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
    icon: "h-6 w-6 shrink-0"
  }
};

// node_modules/flowbite-react/lib/esm/components/Pagination/theme.js
var paginationTheme = {
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white"
    }
  },
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5"
    },
    next: {
      base: "rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      icon: "h-5 w-5"
    },
    selector: {
      base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      active: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      disabled: "opacity-50 cursor-normal"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Progress/theme.js
var progressTheme = {
  base: "w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
  label: "mb-1 flex justify-between font-medium dark:text-white",
  bar: "rounded-full text-center font-medium leading-none text-cyan-300 dark:text-cyan-100 space-x-2",
  color: {
    dark: "bg-gray-600 dark:bg-gray-300",
    blue: "bg-blue-600",
    red: "bg-red-600 dark:bg-red-500",
    green: "bg-green-600 dark:bg-green-500",
    yellow: "bg-yellow-400",
    indigo: "bg-indigo-600 dark:bg-indigo-500",
    purple: "bg-purple-600 dark:bg-purple-500",
    cyan: "bg-cyan-600",
    gray: "bg-gray-500",
    lime: "bg-lime-600",
    pink: "bg-pink-500",
    teal: "bg-teal-600"
  },
  size: {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
    xl: "h-6"
  }
};

// node_modules/flowbite-react/lib/esm/components/Radio/theme.js
var radioTheme = {
  root: {
    base: "h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-cyan-600 dark:focus:ring-cyan-600 text-cyan-600"
  }
};

// node_modules/flowbite-react/lib/esm/components/RangeSlider/theme.js
var rangeSliderTheme = {
  root: {
    base: "flex"
  },
  field: {
    base: "relative w-full",
    input: {
      base: "w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700",
      sizes: {
        sm: "h-1 range-sm",
        md: "h-2",
        lg: "h-3 range-lg"
      }
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Rating/theme.js
var ratingTheme = {
  root: {
    base: "flex items-center"
  },
  star: {
    empty: "text-gray-300 dark:text-gray-500",
    filled: "text-yellow-400",
    sizes: {
      sm: "w-5 h-5",
      md: "w-7 h-7",
      lg: "w-10 h-10"
    }
  }
};
var ratingAdvancedTheme = {
  base: "flex items-center",
  label: "text-sm font-medium text-cyan-600 dark:text-cyan-500",
  progress: {
    base: "mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700",
    fill: "h-5 rounded bg-yellow-400",
    label: "text-sm font-medium text-cyan-600 dark:text-cyan-500"
  }
};

// node_modules/flowbite-react/lib/esm/components/Select/theme.js
var selectTheme = {
  base: "flex",
  addon: "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400"
    },
    select: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      withIcon: {
        on: "pl-10",
        off: ""
      },
      withAddon: {
        on: "rounded-r-lg",
        off: "rounded-lg"
      },
      withShadow: {
        on: "shadow-sm dark:shadow-sm-light",
        off: ""
      },
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "sm:text-md p-4"
      },
      colors: {
        gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        failure: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
        success: "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
      }
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Sidebar/theme.js
var sidebarTheme = {
  root: {
    base: "h-full",
    collapsed: {
      on: "w-16",
      off: "w-64"
    },
    inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800"
  },
  collapse: {
    button: "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    icon: {
      base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      open: {
        off: "",
        on: "text-gray-900"
      }
    },
    label: {
      base: "ml-3 flex-1 whitespace-nowrap text-left",
      icon: {
        base: "h-6 w-6 transition ease-in-out delay-0",
        open: {
          on: "rotate-180",
          off: ""
        }
      }
    },
    list: "space-y-2 py-2"
  },
  cta: {
    base: "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
    color: {
      blue: "bg-cyan-50 dark:bg-cyan-900",
      dark: "bg-dark-50 dark:bg-dark-900",
      failure: "bg-red-50 dark:bg-red-900",
      gray: "bg-alternative-50 dark:bg-alternative-900",
      green: "bg-green-50 dark:bg-green-900",
      light: "bg-light-50 dark:bg-light-900",
      red: "bg-red-50 dark:bg-red-900",
      purple: "bg-purple-50 dark:bg-purple-900",
      success: "bg-green-50 dark:bg-green-900",
      yellow: "bg-yellow-50 dark:bg-yellow-900",
      warning: "bg-yellow-50 dark:bg-yellow-900"
    }
  },
  item: {
    base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    active: "bg-gray-100 dark:bg-gray-700",
    collapsed: {
      insideCollapse: "group w-full pl-8 transition duration-75",
      noIcon: "font-bold"
    },
    content: {
      base: "px-3 flex-1 whitespace-nowrap"
    },
    icon: {
      base: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      active: "text-gray-700 dark:text-gray-100"
    },
    label: "",
    listItem: ""
  },
  items: {
    base: ""
  },
  itemGroup: {
    base: "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
  },
  logo: {
    base: "mb-5 flex items-center pl-2.5",
    collapsed: {
      on: "hidden",
      off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    },
    img: "mr-3 h-6 sm:h-7"
  }
};

// node_modules/flowbite-react/lib/esm/components/Spinner/theme.js
var spinnerTheme = {
  base: "inline animate-spin text-gray-200",
  color: {
    failure: "fill-red-600",
    gray: "fill-gray-600",
    info: "fill-cyan-600",
    pink: "fill-pink-600",
    purple: "fill-purple-600",
    success: "fill-green-500",
    warning: "fill-yellow-400"
  },
  light: {
    off: {
      base: "dark:text-gray-600",
      color: {
        failure: "",
        gray: "dark:fill-gray-300",
        info: "",
        pink: "",
        purple: "",
        success: "",
        warning: ""
      }
    },
    on: {
      base: "",
      color: {
        failure: "",
        gray: "",
        info: "",
        pink: "",
        purple: "",
        success: "",
        warning: ""
      }
    }
  },
  size: {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10"
  }
};

// node_modules/flowbite-react/lib/esm/components/Table/theme.js
var tableTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
    wrapper: "relative"
  },
  body: {
    base: "group/body",
    cell: {
      base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4"
    }
  },
  head: {
    base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
    cell: {
      base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3"
    }
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped: "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
  }
};

// node_modules/flowbite-react/lib/esm/components/Tabs/theme.js
var tabTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",
    styles: {
      default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
      underline: "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
      pills: "flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400 space-x-2",
      fullWidth: "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none"
    },
    tabitem: {
      base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-4 focus:ring-cyan-300 focus:outline-none",
      styles: {
        default: {
          base: "rounded-t-lg",
          active: {
            on: "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
            off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300"
          }
        },
        underline: {
          base: "rounded-t-lg",
          active: {
            on: "text-cyan-600 rounded-t-lg border-b-2 border-cyan-600 active dark:text-cyan-500 dark:border-cyan-500",
            off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          }
        },
        pills: {
          base: "",
          active: {
            on: "rounded-lg bg-cyan-600 text-white",
            off: "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
          }
        },
        fullWidth: {
          base: "ml-0 first:ml-0 w-full rounded-none flex",
          active: {
            on: "p-4 text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none",
            off: "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none"
          }
        }
      },
      icon: "mr-2 h-5 w-5"
    }
  },
  tabitemcontainer: {
    base: "",
    styles: {
      default: "",
      underline: "",
      pills: "",
      fullWidth: ""
    }
  },
  tabpanel: "py-3"
};

// node_modules/flowbite-react/lib/esm/components/TextInput/theme.js
var textInputTheme = {
  base: "flex",
  addon: "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400"
    },
    rightIcon: {
      base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400"
    },
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "sm:text-md p-4"
      },
      colors: {
        gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        failure: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
        success: "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
      },
      withRightIcon: {
        on: "pr-10",
        off: ""
      },
      withIcon: {
        on: "pl-10",
        off: ""
      },
      withAddon: {
        on: "rounded-r-lg",
        off: "rounded-lg"
      },
      withShadow: {
        on: "shadow-sm dark:shadow-sm-light",
        off: ""
      }
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Textarea/theme.js
var textareaTheme = {
  base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 text-sm",
  colors: {
    gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
    info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
    failure: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
    warning: "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
    success: "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
  },
  withShadow: {
    on: "shadow-sm dark:shadow-sm-light",
    off: ""
  }
};

// node_modules/flowbite-react/lib/esm/components/Timeline/theme.js
var timelineTheme = {
  root: {
    direction: {
      horizontal: "items-base sm:flex",
      vertical: "relative border-l border-gray-200 dark:border-gray-700"
    }
  },
  item: {
    root: {
      horizontal: "relative mb-6 sm:mb-0",
      vertical: "mb-10 ml-6"
    },
    content: {
      root: {
        base: "mt-3 sm:pr-8"
      },
      body: {
        base: "mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
      },
      time: {
        base: "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
      },
      title: {
        base: "text-lg font-semibold text-gray-900 dark:text-white"
      }
    },
    point: {
      horizontal: "flex items-center",
      line: "hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex",
      marker: {
        base: {
          horizontal: "absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700",
          vertical: "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
        },
        icon: {
          base: "h-3 w-3 text-cyan-600 dark:text-cyan-300",
          wrapper: "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-gray-900"
        }
      },
      vertical: ""
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Toast/theme.js
var toastTheme = {
  root: {
    base: "flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400",
    closed: "opacity-0 ease-out"
  },
  toggle: {
    base: "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white",
    icon: "h-5 w-5 shrink-0"
  }
};

// node_modules/flowbite-react/lib/esm/components/ToggleSwitch/theme.js
var toggleSwitchTheme = {
  root: {
    base: "group relative flex items-center rounded-lg focus:outline-none",
    active: {
      on: "cursor-pointer",
      off: "cursor-not-allowed opacity-50"
    },
    label: "ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
  },
  toggle: {
    base: "toggle-bg rounded-full border group-focus:ring-4 group-focus:ring-cyan-500/25",
    checked: {
      on: "after:translate-x-full after:border-white",
      off: "border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700",
      color: {
        blue: " bg-cyan-700 border-cyan-700",
        dark: "bg-dark-700 border-dark-900",
        failure: "bg-red-700 border-red-900",
        gray: "bg-gray-500 border-gray-600",
        green: "bg-green-600 border-green-700",
        light: "bg-light-700 border-light-900",
        red: "bg-red-700 border-red-900",
        purple: "bg-purple-700 border-purple-900",
        success: "bg-green-500 border-green-500",
        yellow: "bg-yellow-400 border-yellow-400",
        warning: "bg-yellow-600 border-yellow-600",
        cyan: "bg-cyan-500 border-cyan-500",
        lime: "bg-lime-400 border-lime-400",
        indigo: "bg-indigo-400 border-indigo-400",
        teal: "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4",
        info: "bg-cyan-600 border-cyan-600",
        pink: "bg-pink-600 border-pink-600"
      }
    },
    sizes: {
      sm: "w-9 h-5 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4",
      md: "w-11 h-6 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5",
      lg: "w-14 h-7 after:absolute after:top-0.5 after:left-[4px] after:h-6 after:w-6"
    }
  }
};

// node_modules/flowbite-react/lib/esm/components/Tooltip/theme.js
var tooltipTheme = {
  target: "w-fit",
  animation: "transition-opacity",
  arrow: {
    base: "absolute z-10 h-2 w-2 rotate-45",
    style: {
      dark: "bg-gray-900 dark:bg-gray-700",
      light: "bg-white",
      auto: "bg-white dark:bg-gray-700"
    },
    placement: "-4px"
  },
  base: "absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
  hidden: "invisible opacity-0",
  style: {
    dark: "bg-gray-900 text-white dark:bg-gray-700",
    light: "border border-gray-200 bg-white text-gray-900",
    auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
  },
  content: "relative z-20"
};

// node_modules/flowbite-react/lib/esm/theme.js
var theme = {
  accordion: accordionTheme,
  alert: alertTheme,
  avatar: avatarTheme,
  badge: badgeTheme,
  blockquote: blockquoteTheme,
  breadcrumb: breadcrumbTheme,
  button: buttonTheme,
  buttonGroup: buttonGroupTheme,
  card: cardTheme,
  carousel: carouselTheme,
  checkbox: checkboxTheme,
  datepicker: datePickerTheme,
  darkThemeToggle: darkThemeToggleTheme,
  dropdown: dropdownTheme,
  fileInput: fileInputTheme,
  floatingLabel: floatingLabelTheme,
  footer: footerTheme,
  helperText: helperTextTheme,
  kbd: kbdTheme,
  label: labelTheme,
  listGroup: listGroupTheme,
  list: listTheme,
  modal: modalTheme,
  navbar: navbarTheme,
  pagination: paginationTheme,
  progress: progressTheme,
  radio: radioTheme,
  rangeSlider: rangeSliderTheme,
  rating: ratingTheme,
  ratingAdvanced: ratingAdvancedTheme,
  select: selectTheme,
  textInput: textInputTheme,
  textarea: textareaTheme,
  toggleSwitch: toggleSwitchTheme,
  sidebar: sidebarTheme,
  spinner: spinnerTheme,
  table: tableTheme,
  tabs: tabTheme,
  timeline: timelineTheme,
  toast: toastTheme,
  tooltip: tooltipTheme
};

// node_modules/flowbite-react/lib/esm/theme-store/index.js
var store = {
  theme: cloneDeep(theme)
};
function setThemeMode(mode) {
  store.mode = mode;
}
function getThemeMode() {
  return store.mode;
}
function setTheme(theme2) {
  if (theme2)
    store.theme = mergeDeep(theme, theme2);
}
function getTheme() {
  return cloneDeep(store.theme);
}

// node_modules/flowbite-react/lib/esm/components/Accordion/AccordionContent.js
var import_jsx_runtime = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Accordion/AccordionPanelContext.js
var import_react = __toESM(require_react());
var AccordionPanelContext = (0, import_react.createContext)(void 0);
function useAccordionContext() {
  const context = (0, import_react.useContext)(AccordionPanelContext);
  if (!context) {
    throw new Error("useAccordionContext should be used within the AccordionPanelContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Accordion/AccordionContent.js
var AccordionContent = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { isOpen } = useAccordionContext();
  const theme2 = mergeDeep(getTheme().accordion.content, customTheme);
  return (0, import_jsx_runtime.jsx)("div", { className: twMerge(theme2.base, className), "data-testid": "flowbite-accordion-content", hidden: !isOpen, ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Accordion/AccordionPanel.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_react2 = __toESM(require_react());
var AccordionPanel = ({ children, ...props }) => {
  const { alwaysOpen } = props;
  const [isOpen, setOpen] = (0, import_react2.useState)(props.isOpen);
  const provider = alwaysOpen ? {
    ...props,
    isOpen,
    setOpen: () => setOpen(!isOpen)
  } : props;
  return (0, import_jsx_runtime2.jsx)(AccordionPanelContext.Provider, { value: provider, children });
};

// node_modules/flowbite-react/lib/esm/components/Accordion/AccordionTitle.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var AccordionTitle = ({ as: Heading = "h2", children, className, theme: customTheme = {}, ...props }) => {
  const { arrowIcon: ArrowIcon, flush, isOpen, setOpen } = useAccordionContext();
  const onClick = () => typeof setOpen !== "undefined" && setOpen();
  const theme2 = mergeDeep(getTheme().accordion.title, customTheme);
  return (0, import_jsx_runtime3.jsxs)("button", { className: twMerge(theme2.base, theme2.flush[flush ? "on" : "off"], theme2.open[isOpen ? "on" : "off"], className), onClick, type: "button", ...props, children: [(0, import_jsx_runtime3.jsx)(Heading, { className: theme2.heading, "data-testid": "flowbite-accordion-heading", children }), ArrowIcon && (0, import_jsx_runtime3.jsx)(ArrowIcon, { "aria-hidden": true, className: twMerge(theme2.arrow.base, theme2.arrow.open[isOpen ? "on" : "off"]), "data-testid": "flowbite-accordion-arrow" })] });
};

// node_modules/flowbite-react/lib/esm/components/Accordion/Accordion.js
var AccordionComponent = ({ alwaysOpen = false, arrowIcon = HiChevronDown, children, flush = false, collapseAll = false, className, theme: customTheme = {}, ...props }) => {
  const [isOpen, setOpen] = (0, import_react3.useState)(collapseAll ? -1 : 0);
  const panels = (0, import_react3.useMemo)(() => import_react3.Children.map(children, (child, i2) => (0, import_react3.cloneElement)(child, {
    alwaysOpen,
    arrowIcon,
    flush,
    isOpen: isOpen === i2,
    setOpen: () => setOpen(isOpen === i2 ? -1 : i2)
  })), [alwaysOpen, arrowIcon, children, flush, isOpen]);
  const theme2 = mergeDeep(getTheme().accordion.root, customTheme);
  return (0, import_jsx_runtime4.jsx)("div", { className: twMerge(theme2.base, theme2.flush[flush ? "on" : "off"], className), "data-testid": "flowbite-accordion", ...props, children: panels });
};
AccordionComponent.displayName = "Accordion";
AccordionPanel.displayName = "Accordion.Panel";
AccordionTitle.displayName = "Accordion.Title";
AccordionContent.displayName = "Accordion.Content";
var Accordion = Object.assign(AccordionComponent, {
  Panel: AccordionPanel,
  Title: AccordionTitle,
  Content: AccordionContent
});

// node_modules/flowbite-react/lib/esm/components/Alert/Alert.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var Alert = ({ additionalContent, children, className, color = "info", icon: Icon, onDismiss, rounded = true, theme: customTheme = {}, withBorderAccent, ...props }) => {
  const theme2 = mergeDeep(getTheme().alert, customTheme);
  return (0, import_jsx_runtime5.jsxs)("div", { className: twMerge(theme2.base, theme2.color[color], rounded && theme2.rounded, withBorderAccent && theme2.borderAccent, className), role: "alert", ...props, children: [(0, import_jsx_runtime5.jsxs)("div", { className: theme2.wrapper, "data-testid": "flowbite-alert-wrapper", children: [Icon && (0, import_jsx_runtime5.jsx)(Icon, { className: theme2.icon, "data-testid": "flowbite-alert-icon" }), (0, import_jsx_runtime5.jsx)("div", { children }), typeof onDismiss === "function" && (0, import_jsx_runtime5.jsx)("button", { "aria-label": "Dismiss", className: twMerge(theme2.closeButton.base, theme2.closeButton.color[color]), onClick: onDismiss, type: "button", children: (0, import_jsx_runtime5.jsx)(HiX, { "aria-hidden": true, className: theme2.closeButton.icon }) })] }), additionalContent && (0, import_jsx_runtime5.jsx)("div", { children: additionalContent })] });
};
Alert.displayName = "Alert";

// node_modules/flowbite-react/lib/esm/components/Avatar/Avatar.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Avatar/AvatarGroup.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var AvatarGroup = ({ children, className, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().avatar.group, customTheme);
  return (0, import_jsx_runtime6.jsx)("div", { "data-testid": "avatar-group-element", className: twMerge(theme2.base, className), ...props, children });
};
AvatarGroup.displayName = "Avatar.Group";

// node_modules/flowbite-react/lib/esm/components/Avatar/AvatarGroupCounter.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var AvatarGroupCounter = ({ className, href, theme: customTheme = {}, total, ...props }) => {
  const theme2 = mergeDeep(getTheme().avatar.groupCounter, customTheme);
  return (0, import_jsx_runtime7.jsxs)("a", { href, className: twMerge(theme2.base, className), ...props, children: ["+", total] });
};
AvatarGroupCounter.displayName = "Avatar.GroupCounter";

// node_modules/flowbite-react/lib/esm/components/Avatar/Avatar.js
var AvatarComponent = ({ alt = "", bordered = false, children, className, color = "light", img, placeholderInitials = "", rounded = false, size = "md", stacked = false, status, statusPosition = "top-left", theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().avatar, customTheme);
  const imgClassName = twMerge(theme2.root.img.base, bordered && theme2.root.bordered, bordered && theme2.root.color[color], rounded && theme2.root.rounded, stacked && theme2.root.stacked, theme2.root.img.on, theme2.root.size[size]);
  const imgProps = {
    className: twMerge(imgClassName, theme2.root.img.on),
    "data-testid": "flowbite-avatar-img"
  };
  return (0, import_jsx_runtime8.jsxs)("div", { className: twMerge(theme2.root.base, className), "data-testid": "flowbite-avatar", ...props, children: [(0, import_jsx_runtime8.jsxs)("div", { className: "relative", children: [img ? typeof img === "string" ? (0, import_jsx_runtime8.jsx)("img", { alt, src: img, ...imgProps }) : img({ alt, ...imgProps }) : placeholderInitials ? (0, import_jsx_runtime8.jsx)("div", { className: twMerge(theme2.root.img.off, theme2.root.initials.base, stacked && theme2.root.stacked, bordered && theme2.root.bordered, bordered && theme2.root.color[color], theme2.root.size[size], rounded && theme2.root.rounded), "data-testid": "flowbite-avatar-initials-placeholder", children: (0, import_jsx_runtime8.jsx)("span", { className: twMerge(theme2.root.initials.text), "data-testid": "flowbite-avatar-initials-placeholder-text", children: placeholderInitials }) }) : (0, import_jsx_runtime8.jsx)("div", { className: twMerge(imgClassName, theme2.root.img.off), "data-testid": "flowbite-avatar-img", children: (0, import_jsx_runtime8.jsx)("svg", { className: theme2.root.img.placeholder, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: (0, import_jsx_runtime8.jsx)("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }) }), status && (0, import_jsx_runtime8.jsx)("span", { "data-testid": "flowbite-avatar-status", className: twMerge(theme2.root.status.base, theme2.root.status[status], theme2.root.statusPosition[statusPosition]) })] }), children && (0, import_jsx_runtime8.jsx)("div", { children })] });
};
AvatarComponent.displayName = "Avatar";
var Avatar = Object.assign(AvatarComponent, {
  Group: AvatarGroup,
  Counter: AvatarGroupCounter
});

// node_modules/flowbite-react/lib/esm/components/Badge/Badge.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var Badge = ({ children, color = "info", href, icon: Icon, size = "xs", className, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().badge, customTheme);
  const Content = () => (0, import_jsx_runtime9.jsxs)("span", { className: twMerge(theme2.root.base, theme2.root.color[color], theme2.root.size[size], theme2.icon[Icon ? "on" : "off"], className), "data-testid": "flowbite-badge", ...props, children: [Icon && (0, import_jsx_runtime9.jsx)(Icon, { "aria-hidden": true, className: theme2.icon.size[size], "data-testid": "flowbite-badge-icon" }), children && (0, import_jsx_runtime9.jsx)("span", { children })] });
  return href ? (0, import_jsx_runtime9.jsx)("a", { className: theme2.root.href, href, children: (0, import_jsx_runtime9.jsx)(Content, {}) }) : (0, import_jsx_runtime9.jsx)(Content, {});
};
Badge.displayName = "Badge";

// node_modules/flowbite-react/lib/esm/components/Banner/Banner.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Banner/BannerCollapseButton.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Button/Button.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/helpers/generic-forward-ref.js
var import_react4 = __toESM(require_react());
var genericForwardRef = import_react4.forwardRef;
var generic_forward_ref_default = genericForwardRef;

// node_modules/flowbite-react/lib/esm/components/Spinner/Spinner.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var Spinner = ({ className, color = "info", light, size = "md", theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().spinner, customTheme);
  return (0, import_jsx_runtime10.jsx)("span", { role: "status", ...props, children: (0, import_jsx_runtime10.jsxs)("svg", { fill: "none", viewBox: "0 0 100 101", className: twMerge(theme2.base, theme2.color[color], theme2.light[light ? "on" : "off"].base, theme2.light[light ? "on" : "off"].color[color], theme2.size[size], className), children: [(0, import_jsx_runtime10.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, import_jsx_runtime10.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }) });
};
Spinner.displayName = "Spinner";

// node_modules/flowbite-react/lib/esm/components/Button/ButtonBase.js
var import_react5 = __toESM(require_react());
var ButtonBaseComponent = ({ children, as: Component, href, type = "button", ...props }, ref) => {
  const BaseComponent = Component || (href ? "a" : "button");
  return (0, import_react5.createElement)(BaseComponent, { ref, href, type, ...props }, children);
};
var ButtonBase = generic_forward_ref_default(ButtonBaseComponent);

// node_modules/flowbite-react/lib/esm/components/Button/ButtonGroup.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var import_react6 = __toESM(require_react());
var ButtonGroup = ({ children, className, outline, pill, theme: customTheme = {}, ...props }) => {
  const items = (0, import_react6.useMemo)(() => import_react6.Children.map(children, (child, index) => (0, import_react6.cloneElement)(child, {
    outline,
    pill,
    positionInGroup: index === 0 ? "start" : index === children.length - 1 ? "end" : "middle"
  })), [children, outline, pill]);
  const theme2 = mergeDeep(getTheme().buttonGroup, customTheme);
  return (0, import_jsx_runtime11.jsx)("div", { className: twMerge(theme2.base, className), role: "group", ...props, children: items });
};
ButtonGroup.displayName = "Button.Group";

// node_modules/flowbite-react/lib/esm/components/Button/Button.js
var ButtonComponentFn = ({ children, className, color = "info", disabled, fullSized, isProcessing = false, processingLabel = "Loading...", processingSpinner, gradientDuoTone, gradientMonochrome, label, outline = false, pill = false, positionInGroup = "none", size = "md", theme: customTheme = {}, ...props }, ref) => {
  const { buttonGroup: groupTheme, button: buttonTheme2 } = getTheme();
  const theme2 = mergeDeep(buttonTheme2, customTheme);
  const theirProps = props;
  return (0, import_jsx_runtime12.jsx)(ButtonBase, { ref, disabled, className: twMerge(theme2.base, disabled && theme2.disabled, !gradientDuoTone && !gradientMonochrome && theme2.color[color], gradientDuoTone && !gradientMonochrome && theme2.gradientDuoTone[gradientDuoTone], !gradientDuoTone && gradientMonochrome && theme2.gradient[gradientMonochrome], outline && (theme2.outline.color[color] ?? theme2.outline.color.default), theme2.pill[pill ? "on" : "off"], fullSized && theme2.fullSized, groupTheme.position[positionInGroup], className), ...theirProps, children: (0, import_jsx_runtime12.jsx)("span", { className: twMerge(theme2.inner.base, theme2.outline[outline ? "on" : "off"], theme2.outline.pill[outline && pill ? "on" : "off"], theme2.size[size], outline && !theme2.outline.color[color] && theme2.inner.outline, isProcessing && theme2.isProcessing, isProcessing && theme2.inner.isProcessingPadding[size], theme2.inner.position[positionInGroup]), children: (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [isProcessing && (0, import_jsx_runtime12.jsx)("span", { className: twMerge(theme2.spinnerSlot, theme2.spinnerLeftPosition[size]), children: processingSpinner || (0, import_jsx_runtime12.jsx)(Spinner, { size }) }), typeof children !== "undefined" ? children : (0, import_jsx_runtime12.jsx)("span", { "data-testid": "flowbite-button-label", className: twMerge(theme2.label), children: isProcessing ? processingLabel : label })] }) }) });
};
ButtonComponentFn.displayName = "Button";
var ButtonComponent = generic_forward_ref_default(ButtonComponentFn);
var Button = Object.assign(ButtonComponent, {
  Group: ButtonGroup
});

// node_modules/flowbite-react/lib/esm/components/Banner/BannerCollapseButton.js
var BannerCollapseButton = ({ children, ...props }) => {
  const onClick = (event) => {
    const collapseButton = event.target;
    const parentBanner = collapseButton.closest('[role="banner"]');
    parentBanner == null ? void 0 : parentBanner.remove();
  };
  return (0, import_jsx_runtime13.jsx)(Button, { onClick, ...props, children });
};
BannerCollapseButton.displayName = "Banner.CollapseButton";

// node_modules/flowbite-react/lib/esm/components/Banner/Banner.js
var BannerComponent = ({ children, ...props }) => {
  return (0, import_jsx_runtime14.jsx)("div", { "data-testid": "flowbite-banner", role: "banner", tabIndex: -1, ...props, children });
};
BannerComponent.displayName = "Banner";
var Banner = Object.assign(BannerComponent, {
  CollapseButton: BannerCollapseButton
});

// node_modules/flowbite-react/lib/esm/components/Blockquote/Blockquote.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var Blockquote = ({ children, className, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().blockquote, customTheme);
  return (0, import_jsx_runtime15.jsx)("blockquote", { className: twMerge(theme2.root.base, className), "data-testid": "flowbite-blockquote", ...props, children });
};
Blockquote.displayName = "Blockquote";

// node_modules/flowbite-react/lib/esm/components/Breadcrumb/Breadcrumb.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Breadcrumb/BreadcrumbItem.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var import_react7 = __toESM(require_react());
var BreadcrumbItem = (0, import_react7.forwardRef)(({ children, className, href, icon: Icon, theme: customTheme = {}, ...props }, ref) => {
  const isLink = typeof href !== "undefined";
  const Component = isLink ? "a" : "span";
  const theme2 = mergeDeep(getTheme().breadcrumb.item, customTheme);
  return (0, import_jsx_runtime16.jsxs)("li", { className: twMerge(theme2.base, className), ...props, children: [(0, import_jsx_runtime16.jsx)(HiOutlineChevronRight, { "aria-hidden": true, className: theme2.chevron, "data-testid": "flowbite-breadcrumb-separator" }), (0, import_jsx_runtime16.jsxs)(Component, { ref, className: theme2.href[isLink ? "on" : "off"], "data-testid": "flowbite-breadcrumb-item", href, children: [Icon && (0, import_jsx_runtime16.jsx)(Icon, { "aria-hidden": true, className: theme2.icon }), children] })] });
});
BreadcrumbItem.displayName = "Breadcrumb.Item";

// node_modules/flowbite-react/lib/esm/components/Breadcrumb/Breadcrumb.js
var BreadcrumbComponent = ({ children, className, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().breadcrumb.root, customTheme);
  return (0, import_jsx_runtime17.jsx)("nav", { "aria-label": "Breadcrumb", className: twMerge(theme2.base, className), ...props, children: (0, import_jsx_runtime17.jsx)("ol", { className: theme2.list, children }) });
};
BreadcrumbComponent.displayName = "Breadcrumb";
var Breadcrumb = Object.assign(BreadcrumbComponent, {
  Item: BreadcrumbItem
});

// node_modules/flowbite-react/lib/esm/components/Card/Card.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/helpers/omit.js
var omit = (keys) => (obj) => {
  const result = {};
  for (const key in obj) {
    if (keys.includes(key)) {
      continue;
    }
    result[key] = obj[key];
  }
  return result;
};

// node_modules/flowbite-react/lib/esm/components/Card/Card.js
var Card = (props) => {
  const { children, className, horizontal, href, theme: customTheme = {} } = props;
  const Component = typeof href === "undefined" ? "div" : "a";
  const theirProps = removeCustomProps(props);
  const theme2 = mergeDeep(getTheme().card, customTheme);
  return (0, import_jsx_runtime18.jsxs)(Component, { "data-testid": "flowbite-card", href, className: twMerge(theme2.root.base, theme2.root.horizontal[horizontal ? "on" : "off"], href && theme2.root.href, className), ...theirProps, children: [(0, import_jsx_runtime18.jsx)(Image, { ...props }), (0, import_jsx_runtime18.jsx)("div", { className: theme2.root.children, children })] });
};
var Image = ({ theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().card, customTheme);
  if (props.renderImage) {
    return props.renderImage(theme2, props.horizontal ?? false);
  }
  if (props.imgSrc) {
    return (0, import_jsx_runtime18.jsx)("img", { "data-testid": "flowbite-card-image", alt: props.imgAlt ?? "", src: props.imgSrc, className: twMerge(theme2.img.base, theme2.img.horizontal[props.horizontal ? "on" : "off"]) });
  }
  return null;
};
var removeCustomProps = omit([
  "renderImage",
  "imgSrc",
  "imgAlt",
  "children",
  "className",
  "horizontal",
  "href",
  "theme"
]);

// node_modules/flowbite-react/lib/esm/components/Carousel/Carousel.js
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var import_react9 = __toESM(require_react());

// node_modules/react-indiana-drag-scroll/dist/index.es.js
var import_react8 = __toESM(require_react());
var n = function(t2, e2) {
  return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
    t3.__proto__ = e3;
  } || function(t3, e3) {
    for (var n2 in e3)
      e3.hasOwnProperty(n2) && (t3[n2] = e3[n2]);
  })(t2, e2);
};
var o;
var r;
var i = (function(t2) {
  !function() {
    var e2 = {}.hasOwnProperty;
    function n2() {
      for (var t3 = [], o2 = 0; o2 < arguments.length; o2++) {
        var r2 = arguments[o2];
        if (r2) {
          var i2 = typeof r2;
          if ("string" === i2 || "number" === i2)
            t3.push(r2);
          else if (Array.isArray(r2) && r2.length) {
            var s2 = n2.apply(null, r2);
            s2 && t3.push(s2);
          } else if ("object" === i2)
            for (var l2 in r2)
              e2.call(r2, l2) && r2[l2] && t3.push(l2);
        }
      }
      return t3.join(" ");
    }
    t2.exports ? (n2.default = n2, t2.exports = n2) : window.classNames = n2;
  }();
}(r = { path: o, exports: {}, require: function(t2, e2) {
  return function() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
  }(null == e2 && r.path);
} }, r.exports), r.exports);
function s(t2, e2, n2) {
  var o2, r2, i2, s2, l2;
  function a2() {
    var c3 = Date.now() - s2;
    c3 < e2 && c3 >= 0 ? o2 = setTimeout(a2, e2 - c3) : (o2 = null, n2 || (l2 = t2.apply(i2, r2), i2 = r2 = null));
  }
  null == e2 && (e2 = 100);
  var c2 = function() {
    i2 = this, r2 = arguments, s2 = Date.now();
    var c3 = n2 && !o2;
    return o2 || (o2 = setTimeout(a2, e2)), c3 && (l2 = t2.apply(i2, r2), i2 = r2 = null), l2;
  };
  return c2.clear = function() {
    o2 && (clearTimeout(o2), o2 = null);
  }, c2.flush = function() {
    o2 && (l2 = t2.apply(i2, r2), i2 = r2 = null, clearTimeout(o2), o2 = null);
  }, c2;
}
s.debounce = s;
var l = s;
!function(t2, e2) {
  void 0 === e2 && (e2 = {});
  var n2 = e2.insertAt;
  if (t2 && "undefined" != typeof document) {
    var o2 = document.head || document.getElementsByTagName("head")[0], r2 = document.createElement("style");
    r2.type = "text/css", "top" === n2 && o2.firstChild ? o2.insertBefore(r2, o2.firstChild) : o2.appendChild(r2), r2.styleSheet ? r2.styleSheet.cssText = t2 : r2.appendChild(document.createTextNode(t2));
  }
}(".indiana-scroll-container {\n  overflow: auto; }\n  .indiana-scroll-container--dragging {\n    scroll-behavior: auto !important; }\n    .indiana-scroll-container--dragging > * {\n      pointer-events: none;\n      cursor: -webkit-grab;\n      cursor: grab; }\n  .indiana-scroll-container--hide-scrollbars {\n    overflow: hidden;\n    overflow: -moz-scrollbars-none;\n    -ms-overflow-style: none;\n    scrollbar-width: none; }\n    .indiana-scroll-container--hide-scrollbars::-webkit-scrollbar {\n      display: none !important;\n      height: 0 !important;\n      width: 0 !important;\n      background: transparent !important;\n      -webkit-appearance: none !important; }\n  .indiana-scroll-container--native-scroll {\n    overflow: auto; }\n\n.indiana-dragging {\n  cursor: -webkit-grab;\n  cursor: grab; }\n");
var a;
var c = (a = "indiana-scroll-container", function(t2, e2) {
  if (!t2)
    return a;
  var n2;
  "string" == typeof t2 ? n2 = t2 : e2 = t2;
  var o2 = a;
  return n2 && (o2 += "__" + n2), o2 + (e2 ? Object.keys(e2).reduce(function(t3, n3) {
    var r2 = e2[n3];
    return r2 && (t3 += " " + ("boolean" == typeof r2 ? o2 + "--" + n3 : o2 + "--" + n3 + "_" + r2)), t3;
  }, "") : "");
});
var p = function(e2) {
  function o2(n2) {
    var o3 = e2.call(this, n2) || this;
    return o3.onEndScroll = function() {
      o3.scrolling = false, !o3.pressed && o3.started && o3.processEnd();
    }, o3.onScroll = function(t2) {
      var e3 = o3.container.current;
      e3.scrollLeft === o3.scrollLeft && e3.scrollTop === o3.scrollTop || (o3.scrolling = true, o3.processScroll(t2), o3.onEndScroll());
    }, o3.onTouchStart = function(t2) {
      var e3 = o3.props.nativeMobileScroll;
      if (o3.isDraggable(t2.target))
        if (o3.internal = true, e3 && o3.scrolling)
          o3.pressed = true;
        else {
          var n3 = t2.touches[0];
          o3.processClick(t2, n3.clientX, n3.clientY), !e3 && o3.props.stopPropagation && t2.stopPropagation();
        }
    }, o3.onTouchEnd = function(t2) {
      var e3 = o3.props.nativeMobileScroll;
      o3.pressed && (!o3.started || o3.scrolling && e3 ? o3.pressed = false : o3.processEnd(), o3.forceUpdate());
    }, o3.onTouchMove = function(t2) {
      var e3 = o3.props.nativeMobileScroll;
      if (o3.pressed && (!e3 || !o3.isMobile)) {
        var n3 = t2.touches[0];
        n3 && o3.processMove(t2, n3.clientX, n3.clientY), t2.preventDefault(), o3.props.stopPropagation && t2.stopPropagation();
      }
    }, o3.onMouseDown = function(t2) {
      o3.isDraggable(t2.target) && o3.isScrollable() && (o3.internal = true, -1 !== o3.props.buttons.indexOf(t2.button) && (o3.processClick(t2, t2.clientX, t2.clientY), t2.preventDefault(), o3.props.stopPropagation && t2.stopPropagation()));
    }, o3.onMouseMove = function(t2) {
      o3.pressed && (o3.processMove(t2, t2.clientX, t2.clientY), t2.preventDefault(), o3.props.stopPropagation && t2.stopPropagation());
    }, o3.onMouseUp = function(t2) {
      o3.pressed && (o3.started ? o3.processEnd() : (o3.internal = false, o3.pressed = false, o3.forceUpdate(), o3.props.onClick && o3.props.onClick(t2)), t2.preventDefault(), o3.props.stopPropagation && t2.stopPropagation());
    }, o3.container = import_react8.default.createRef(), o3.onEndScroll = l(o3.onEndScroll, 300), o3.scrolling = false, o3.started = false, o3.pressed = false, o3.internal = false, o3.getRef = o3.getRef.bind(o3), o3;
  }
  return function(t2, e3) {
    function o3() {
      this.constructor = t2;
    }
    n(t2, e3), t2.prototype = null === e3 ? Object.create(e3) : (o3.prototype = e3.prototype, new o3());
  }(o2, e2), o2.prototype.componentDidMount = function() {
    var t2 = this.props.nativeMobileScroll, e3 = this.container.current;
    window.addEventListener("mouseup", this.onMouseUp), window.addEventListener("mousemove", this.onMouseMove), window.addEventListener("touchmove", this.onTouchMove, { passive: false }), window.addEventListener("touchend", this.onTouchEnd), e3.addEventListener("touchstart", this.onTouchStart, { passive: false }), e3.addEventListener("mousedown", this.onMouseDown, { passive: false }), t2 && (this.isMobile = this.isMobileDevice(), this.isMobile && this.forceUpdate());
  }, o2.prototype.componentWillUnmount = function() {
    window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
  }, o2.prototype.getElement = function() {
    return this.container.current;
  }, o2.prototype.isMobileDevice = function() {
    return void 0 !== window.orientation || -1 !== navigator.userAgent.indexOf("IEMobile");
  }, o2.prototype.isDraggable = function(t2) {
    var e3 = this.props.ignoreElements;
    if (e3) {
      var n2 = t2.closest(e3);
      return null === n2 || n2.contains(this.getElement());
    }
    return true;
  }, o2.prototype.isScrollable = function() {
    var t2 = this.container.current;
    return t2 && (t2.scrollWidth > t2.clientWidth || t2.scrollHeight > t2.clientHeight);
  }, o2.prototype.processClick = function(t2, e3, n2) {
    var o3 = this.container.current;
    this.scrollLeft = o3.scrollLeft, this.scrollTop = o3.scrollTop, this.clientX = e3, this.clientY = n2, this.pressed = true;
  }, o2.prototype.processStart = function(t2) {
    void 0 === t2 && (t2 = true);
    var e3 = this.props.onStartScroll;
    this.started = true, t2 && document.body.classList.add("indiana-dragging"), e3 && e3({ external: !this.internal }), this.forceUpdate();
  }, o2.prototype.processScroll = function(t2) {
    if (this.started) {
      var e3 = this.props.onScroll;
      e3 && e3({ external: !this.internal });
    } else
      this.processStart(false);
  }, o2.prototype.processMove = function(t2, e3, n2) {
    var o3 = this.props, r2 = o3.horizontal, i2 = o3.vertical, s2 = o3.activationDistance, l2 = o3.onScroll, a2 = this.container.current;
    this.started ? (r2 && (a2.scrollLeft -= e3 - this.clientX), i2 && (a2.scrollTop -= n2 - this.clientY), l2 && l2({ external: !this.internal }), this.clientX = e3, this.clientY = n2, this.scrollLeft = a2.scrollLeft, this.scrollTop = a2.scrollTop) : (r2 && Math.abs(e3 - this.clientX) > s2 || i2 && Math.abs(n2 - this.clientY) > s2) && (this.clientX = e3, this.clientY = n2, this.processStart());
  }, o2.prototype.processEnd = function() {
    var t2 = this.props.onEndScroll;
    this.container.current && t2 && t2({ external: !this.internal }), this.pressed = false, this.started = false, this.scrolling = false, this.internal = false, document.body.classList.remove("indiana-dragging"), this.forceUpdate();
  }, o2.prototype.getRef = function(t2) {
    [this.container, this.props.innerRef].forEach(function(e3) {
      e3 && ("function" == typeof e3 ? e3(t2) : e3.current = t2);
    });
  }, o2.prototype.render = function() {
    var e3 = this.props, n2 = e3.children, o3 = e3.draggingClassName, r2 = e3.className, s2 = e3.style, l2 = e3.hideScrollbars, a2 = e3.component;
    return import_react8.default.createElement(a2, { className: i(r2, this.pressed && o3, c({ dragging: this.pressed, "hide-scrollbars": l2, "native-scroll": this.isMobile })), style: s2, ref: this.getRef, onScroll: this.onScroll }, n2);
  }, o2.defaultProps = { nativeMobileScroll: true, hideScrollbars: true, activationDistance: 10, vertical: true, horizontal: true, stopPropagation: false, style: {}, component: "div", buttons: [0] }, o2;
}(import_react8.PureComponent);
var index_es_default = p;

// node_modules/flowbite-react/lib/esm/helpers/is-client.js
var isClient = () => {
  return typeof window !== "undefined";
};

// node_modules/flowbite-react/lib/esm/components/Carousel/Carousel.js
var Carousel = ({ children, indicators = true, leftControl, rightControl, slide = true, draggable = true, slideInterval, className, theme: customTheme = {}, onSlideChange = null, pauseOnHover = false, ...props }) => {
  const theme2 = mergeDeep(getTheme().carousel, customTheme);
  const isDeviceMobile = isClient() && navigator.userAgent.indexOf("IEMobile") !== -1;
  const carouselContainer = (0, import_react9.useRef)(null);
  const [activeItem, setActiveItem] = (0, import_react9.useState)(0);
  const [isDragging, setIsDragging] = (0, import_react9.useState)(false);
  const [isHovering, setIsHovering] = (0, import_react9.useState)(false);
  const didMountRef = (0, import_react9.useRef)(false);
  const items = (0, import_react9.useMemo)(() => import_react9.Children.map(children, (child) => (0, import_react9.cloneElement)(child, {
    className: twMerge(theme2.item.base, child.props.className)
  })), [children, theme2.item.base]);
  const navigateTo = (0, import_react9.useCallback)((item) => () => {
    if (!items)
      return;
    item = (item + items.length) % items.length;
    if (carouselContainer.current) {
      carouselContainer.current.scrollLeft = carouselContainer.current.clientWidth * item;
    }
    setActiveItem(item);
  }, [items]);
  (0, import_react9.useEffect)(() => {
    if (carouselContainer.current && !isDragging && carouselContainer.current.scrollLeft !== 0) {
      setActiveItem(Math.round(carouselContainer.current.scrollLeft / carouselContainer.current.clientWidth));
    }
  }, [isDragging]);
  (0, import_react9.useEffect)(() => {
    if (slide && !(pauseOnHover && isHovering)) {
      const intervalId = setInterval(() => !isDragging && navigateTo(activeItem + 1)(), slideInterval ?? 3e3);
      return () => clearInterval(intervalId);
    }
  }, [activeItem, isDragging, navigateTo, slide, slideInterval, pauseOnHover, isHovering]);
  (0, import_react9.useEffect)(() => {
    if (didMountRef.current) {
      onSlideChange && onSlideChange(activeItem);
    } else {
      didMountRef.current = true;
    }
  }, [onSlideChange, activeItem]);
  const handleDragging = (dragging) => () => setIsDragging(dragging);
  const setHoveringTrue = (0, import_react9.useCallback)(() => setIsHovering(true), [setIsHovering]);
  const setHoveringFalse = (0, import_react9.useCallback)(() => setIsHovering(false), [setIsHovering]);
  return (0, import_jsx_runtime19.jsxs)("div", { className: twMerge(theme2.root.base, className), "data-testid": "carousel", onMouseEnter: setHoveringTrue, onMouseLeave: setHoveringFalse, onTouchStart: setHoveringTrue, onTouchEnd: setHoveringFalse, ...props, children: [(0, import_jsx_runtime19.jsx)(index_es_default, { className: twMerge(theme2.scrollContainer.base, (isDeviceMobile || !isDragging) && theme2.scrollContainer.snap), draggingClassName: "cursor-grab", innerRef: carouselContainer, onEndScroll: handleDragging(false), onStartScroll: handleDragging(draggable), vertical: false, horizontal: draggable, children: items == null ? void 0 : items.map((item, index) => (0, import_jsx_runtime19.jsx)("div", { className: theme2.item.wrapper[draggable ? "on" : "off"], "data-active": activeItem === index, "data-testid": "carousel-item", children: item }, index)) }), indicators && (0, import_jsx_runtime19.jsx)("div", { className: theme2.indicators.wrapper, children: items == null ? void 0 : items.map((_, index) => (0, import_jsx_runtime19.jsx)("button", { className: twMerge(theme2.indicators.base, theme2.indicators.active[index === activeItem ? "on" : "off"]), onClick: navigateTo(index), "data-testid": "carousel-indicator", "aria-label": `Slide ${index + 1}` }, index)) }), items && (0, import_jsx_runtime19.jsxs)(import_jsx_runtime19.Fragment, { children: [(0, import_jsx_runtime19.jsx)("div", { className: theme2.root.leftControl, children: (0, import_jsx_runtime19.jsx)("button", { className: "group", "data-testid": "carousel-left-control", onClick: navigateTo(activeItem - 1), type: "button", "aria-label": "Previous slide", children: leftControl ? leftControl : (0, import_jsx_runtime19.jsx)(DefaultLeftControl, { theme: customTheme }) }) }), (0, import_jsx_runtime19.jsx)("div", { className: theme2.root.rightControl, children: (0, import_jsx_runtime19.jsx)("button", { className: "group", "data-testid": "carousel-right-control", onClick: navigateTo(activeItem + 1), type: "button", "aria-label": "Next slide", children: rightControl ? rightControl : (0, import_jsx_runtime19.jsx)(DefaultRightControl, { theme: customTheme }) }) })] })] });
};
var DefaultLeftControl = ({ theme: customTheme = {} }) => {
  const theme2 = mergeDeep(getTheme().carousel, customTheme);
  return (0, import_jsx_runtime19.jsx)("span", { className: theme2.control.base, children: (0, import_jsx_runtime19.jsx)(HiOutlineChevronLeft, { className: theme2.control.icon }) });
};
var DefaultRightControl = ({ theme: customTheme = {} }) => {
  const theme2 = mergeDeep(getTheme().carousel, customTheme);
  return (0, import_jsx_runtime19.jsx)("span", { className: theme2.control.base, children: (0, import_jsx_runtime19.jsx)(HiOutlineChevronRight, { className: theme2.control.icon }) });
};
Carousel.displayName = "Carousel";

// node_modules/flowbite-react/lib/esm/components/Checkbox/Checkbox.js
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
var import_react10 = __toESM(require_react());
var Checkbox = (0, import_react10.forwardRef)(({ className, color = "default", theme: customTheme = {}, ...props }, ref) => {
  const theme2 = mergeDeep(getTheme().checkbox, customTheme);
  return (0, import_jsx_runtime20.jsx)("input", { ref, type: "checkbox", className: twMerge(theme2.root.base, theme2.root.color[color], className), ...props });
});
Checkbox.displayName = "Checkbox";

// node_modules/flowbite-react/lib/esm/components/DarkThemeToggle/DarkThemeToggle.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/hooks/use-is-mounted.js
var import_react11 = __toESM(require_react());
function useIsMounted() {
  const [mounted, setMounted] = (0, import_react11.useState)(false);
  (0, import_react11.useEffect)(() => setMounted(true), []);
  return mounted;
}

// node_modules/flowbite-react/lib/esm/hooks/use-theme-mode.js
var import_react13 = __toESM(require_react());

// node_modules/flowbite-react/lib/esm/hooks/use-watch-localstorage-value.js
var import_react12 = __toESM(require_react());
var useWatchLocalStorageValue = ({ key: watchKey, onChange }) => {
  function handleStorageChange({ key, newValue }) {
    if (key === watchKey)
      onChange(newValue);
  }
  (0, import_react12.useEffect)(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
};

// node_modules/flowbite-react/lib/esm/hooks/use-theme-mode.js
var DEFAULT_MODE = "light";
var LS_THEME_MODE = "flowbite-theme-mode";
var SYNC_THEME_MODE = "flowbite-theme-mode-sync";
var useThemeMode = () => {
  const [mode, setMode] = (0, import_react13.useState)(getInitialMode(getThemeMode()));
  (0, import_react13.useEffect)(() => {
    setModeInLS(mode);
    setModeInDOM(mode);
  }, []);
  useWatchLocalStorageValue({
    key: LS_THEME_MODE,
    onChange(newValue) {
      if (newValue)
        return handleSetMode(newValue);
    }
  });
  useSyncMode((mode2) => setMode(mode2));
  const handleSetMode = (mode2) => {
    setMode(mode2);
    setModeInLS(mode2);
    setModeInDOM(mode2);
    document.dispatchEvent(new CustomEvent(SYNC_THEME_MODE, { detail: mode2 }));
  };
  const toggleMode = () => {
    let newMode = mode;
    if (newMode === "auto")
      newMode = computeModeValue(newMode);
    newMode = newMode === "dark" ? "light" : "dark";
    handleSetMode(newMode);
  };
  const clearMode = () => {
    const newMode = getThemeMode() ?? DEFAULT_MODE;
    handleSetMode(newMode);
  };
  return { mode, computedMode: computeModeValue(mode), setMode: handleSetMode, toggleMode, clearMode };
};
var useSyncMode = (onChange) => {
  (0, import_react13.useEffect)(() => {
    function handleSync(e2) {
      const mode = e2.detail;
      onChange(mode);
    }
    document.addEventListener(SYNC_THEME_MODE, handleSync);
    return () => document.removeEventListener(SYNC_THEME_MODE, handleSync);
  }, []);
};
var setModeInLS = (mode) => localStorage.setItem(LS_THEME_MODE, mode);
var setModeInDOM = (mode) => {
  const computedMode = computeModeValue(mode);
  if (computedMode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
var getInitialMode = (defaultMode) => {
  if (!isClient())
    return DEFAULT_MODE;
  const LSMode = localStorage.getItem(LS_THEME_MODE);
  return LSMode ?? defaultMode ?? DEFAULT_MODE;
};
var computeModeValue = (mode) => {
  return mode === "auto" ? prefersColorScheme() : mode;
};
var prefersColorScheme = () => {
  var _a;
  return ((_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-color-scheme: dark)").matches) ? "dark" : "light";
};

// node_modules/flowbite-react/lib/esm/components/DarkThemeToggle/DarkThemeToggle.js
var DarkThemeToggle = ({ className, theme: customTheme = {}, iconDark: IconDark = HiSun, iconLight: IconLight = HiMoon, ...props }) => {
  const isMounted = useIsMounted();
  const { computedMode, toggleMode } = useThemeMode();
  const theme2 = mergeDeep(getTheme().darkThemeToggle, customTheme);
  return (0, import_jsx_runtime21.jsxs)("button", { type: "button", "aria-label": "Toggle dark mode", "data-testid": "dark-theme-toggle", className: twMerge(theme2.root.base, className), onClick: toggleMode, ...props, children: [(0, import_jsx_runtime21.jsx)(IconDark, { "aria-label": "Currently dark mode", "data-active": isMounted && computedMode === "dark", className: twMerge(theme2.root.icon, "hidden dark:block") }), (0, import_jsx_runtime21.jsx)(IconLight, { "aria-label": "Currently light mode", "data-active": isMounted && computedMode === "light", className: twMerge(theme2.root.icon, "dark:hidden") })] });
};
DarkThemeToggle.displayName = "DarkThemeToggle";

// node_modules/flowbite-react/lib/esm/components/Datepicker/Datepicker.js
var import_jsx_runtime28 = __toESM(require_jsx_runtime());
var import_react16 = __toESM(require_react());

// node_modules/flowbite-react/lib/esm/components/TextInput/TextInput.js
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
var import_react14 = __toESM(require_react());

// node_modules/flowbite-react/lib/esm/components/HelperText/HelperText.js
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
var HelperText = ({ children, className, color = "default", theme: customTheme = {}, value, ...props }) => {
  const theme2 = mergeDeep(getTheme().helperText, customTheme);
  return (0, import_jsx_runtime22.jsx)("p", { className: twMerge(theme2.root.base, theme2.root.colors[color], className), ...props, children: value ?? children ?? "" });
};
HelperText.displayName = "HelperText";

// node_modules/flowbite-react/lib/esm/components/TextInput/TextInput.js
var TextInput = (0, import_react14.forwardRef)(({ addon, className, color = "gray", helperText, icon: Icon, rightIcon: RightIcon, shadow, sizing = "md", theme: customTheme = {}, ...props }, ref) => {
  const theme2 = mergeDeep(getTheme().textInput, customTheme);
  return (0, import_jsx_runtime23.jsxs)(import_jsx_runtime23.Fragment, { children: [(0, import_jsx_runtime23.jsxs)("div", { className: twMerge(theme2.base, className), children: [addon && (0, import_jsx_runtime23.jsx)("span", { className: theme2.addon, children: addon }), (0, import_jsx_runtime23.jsxs)("div", { className: theme2.field.base, children: [Icon && (0, import_jsx_runtime23.jsx)("div", { className: theme2.field.icon.base, children: (0, import_jsx_runtime23.jsx)(Icon, { className: theme2.field.icon.svg }) }), RightIcon && (0, import_jsx_runtime23.jsx)("div", { "data-testid": "right-icon", className: theme2.field.rightIcon.base, children: (0, import_jsx_runtime23.jsx)(RightIcon, { className: theme2.field.rightIcon.svg }) }), (0, import_jsx_runtime23.jsx)("input", { className: twMerge(theme2.field.input.base, theme2.field.input.colors[color], theme2.field.input.sizes[sizing], theme2.field.input.withIcon[Icon ? "on" : "off"], theme2.field.input.withRightIcon[RightIcon ? "on" : "off"], theme2.field.input.withAddon[addon ? "on" : "off"], theme2.field.input.withShadow[shadow ? "on" : "off"]), ...props, ref })] })] }), helperText && (0, import_jsx_runtime23.jsx)(HelperText, { color, children: helperText })] });
});
TextInput.displayName = "TextInput";

// node_modules/flowbite-react/lib/esm/components/Datepicker/DatepickerContext.js
var import_react15 = __toESM(require_react());
var DatepickerContext = (0, import_react15.createContext)(void 0);
function useDatePickerContext() {
  const context = (0, import_react15.useContext)(DatepickerContext);
  if (!context) {
    throw new Error("useDatePickerContext should be used within the DatePickerContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Datepicker/Views/Days.js
var import_jsx_runtime24 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Datepicker/helpers.js
var Views;
(function(Views2) {
  Views2[Views2["Days"] = 0] = "Days";
  Views2[Views2["Months"] = 1] = "Months";
  Views2[Views2["Years"] = 2] = "Years";
  Views2[Views2["Decades"] = 3] = "Decades";
})(Views || (Views = {}));
var WeekStart;
(function(WeekStart2) {
  WeekStart2[WeekStart2["Sunday"] = 0] = "Sunday";
  WeekStart2[WeekStart2["Monday"] = 1] = "Monday";
  WeekStart2[WeekStart2["Tuesday"] = 2] = "Tuesday";
  WeekStart2[WeekStart2["Wednesday"] = 3] = "Wednesday";
  WeekStart2[WeekStart2["Thursday"] = 4] = "Thursday";
  WeekStart2[WeekStart2["Friday"] = 5] = "Friday";
  WeekStart2[WeekStart2["Saturday"] = 6] = "Saturday";
})(WeekStart || (WeekStart = {}));
var isDateInRange = (date, minDate, maxDate) => {
  const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  if (minDate && maxDate) {
    const minDateTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
    const maxDateTime = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime();
    return dateTime >= minDateTime && dateTime <= maxDateTime;
  }
  if (minDate) {
    const minDateTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
    return dateTime >= minDateTime;
  }
  if (maxDate) {
    const maxDateTime = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime();
    return dateTime <= maxDateTime;
  }
  return true;
};
var isDateEqual = (date, selectedDate) => {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  return date.getTime() === selectedDate.getTime();
};
var getFirstDateInRange = (date, minDate, maxDate) => {
  if (!isDateInRange(date, minDate, maxDate)) {
    if (minDate && date < minDate) {
      date = minDate;
    } else if (maxDate && date > maxDate) {
      date = maxDate;
    }
  }
  return date;
};
var getFirstDayOfTheMonth = (date, weekStart) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  let diff = dayOfWeek - weekStart;
  if (diff < 0) {
    diff += 7;
  }
  return addDays(firstDayOfMonth, -diff);
};
var getWeekDays = (lang, weekStart) => {
  const weekdays = [];
  const date = /* @__PURE__ */ new Date(0);
  date.setDate(date.getDate() - date.getDay() + weekStart);
  const formatter = new Intl.DateTimeFormat(lang, { weekday: "short" });
  for (let i2 = 0; i2 < 7; i2++) {
    weekdays.push(formatter.format(addDays(date, i2)));
  }
  return weekdays;
};
var addDays = (date, amount) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
};
var addMonths = (date, amount) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + amount);
  return newDate;
};
var addYears = (date, amount) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + amount);
  return newDate;
};
var getFormattedDate = (language, date, options) => {
  let defaultOptions = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  if (options) {
    defaultOptions = options;
  }
  return new Intl.DateTimeFormat(language, defaultOptions).format(date);
};
var startOfYearPeriod = (date, years) => {
  const year = date.getFullYear();
  return Math.floor(year / years) * years;
};
var isDateInDecade = (date, startYear) => {
  const year = date.getFullYear();
  const endYear = startYear + 9;
  return year >= startYear && year <= endYear;
};

// node_modules/flowbite-react/lib/esm/components/Datepicker/Views/Days.js
var DatepickerViewsDays = ({ theme: customTheme = {} }) => {
  const { theme: rootTheme, weekStart, minDate, maxDate, viewDate, selectedDate, changeSelectedDate, language } = useDatePickerContext();
  const theme2 = mergeDeep(rootTheme.views.days, customTheme);
  const weekDays = getWeekDays(language, weekStart);
  const startDate = getFirstDayOfTheMonth(viewDate, weekStart);
  return (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [(0, import_jsx_runtime24.jsx)("div", { className: theme2.header.base, children: weekDays.map((day, index) => (0, import_jsx_runtime24.jsx)("span", { className: theme2.header.title, children: day }, index)) }), (0, import_jsx_runtime24.jsx)("div", { className: theme2.items.base, children: [...Array(42)].map((_date, index) => {
    const currentDate = addDays(startDate, index);
    const day = getFormattedDate(language, currentDate, { day: "numeric" });
    const isSelected = isDateEqual(selectedDate, currentDate);
    const isDisabled = !isDateInRange(currentDate, minDate, maxDate);
    return (0, import_jsx_runtime24.jsx)("button", { disabled: isDisabled, type: "button", className: twMerge(theme2.items.item.base, isSelected && theme2.items.item.selected, isDisabled && theme2.items.item.disabled), onClick: () => {
      if (isDisabled)
        return;
      changeSelectedDate(currentDate, true);
    }, children: day }, index);
  }) })] });
};

// node_modules/flowbite-react/lib/esm/components/Datepicker/Views/Decades.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var DatepickerViewsDecades = ({ theme: customTheme = {} }) => {
  const { theme: rootTheme, selectedDate, viewDate, setViewDate, setView } = useDatePickerContext();
  const theme2 = mergeDeep(rootTheme.views.decades, customTheme);
  return (0, import_jsx_runtime25.jsx)("div", { className: theme2.items.base, children: [...Array(12)].map((_year, index) => {
    const first = startOfYearPeriod(viewDate, 100);
    const year = first - 10 + index * 10;
    const firstDate = new Date(year, 0, 1);
    const lastDate = addYears(firstDate, 9);
    const isSelected = isDateInDecade(viewDate, year);
    const isDisabled = !isDateInRange(viewDate, firstDate, lastDate);
    return (0, import_jsx_runtime25.jsx)("button", { disabled: isDisabled, type: "button", className: twMerge(theme2.items.item.base, isSelected && theme2.items.item.selected, isDisabled && theme2.items.item.disabled), onClick: () => {
      if (isDisabled)
        return;
      setViewDate(addYears(viewDate, year - selectedDate.getFullYear()));
      setView(Views.Years);
    }, children: year }, index);
  }) });
};

// node_modules/flowbite-react/lib/esm/components/Datepicker/Views/Months.js
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
var DatepickerViewsMonth = ({ theme: customTheme = {} }) => {
  const { theme: rootTheme, minDate, maxDate, selectedDate, viewDate, language, setViewDate, setView } = useDatePickerContext();
  const theme2 = mergeDeep(rootTheme.views.months, customTheme);
  return (0, import_jsx_runtime26.jsx)("div", { className: theme2.items.base, children: [...Array(12)].map((_month, index) => {
    const newDate = new Date(viewDate.getTime());
    newDate.setMonth(index);
    const month = getFormattedDate(language, newDate, { month: "short" });
    const isSelected = isDateEqual(selectedDate, newDate);
    const isDisabled = !isDateInRange(newDate, minDate, maxDate);
    return (0, import_jsx_runtime26.jsx)("button", { disabled: isDisabled, type: "button", className: twMerge(theme2.items.item.base, isSelected && theme2.items.item.selected, isDisabled && theme2.items.item.disabled), onClick: () => {
      if (isDisabled)
        return;
      setViewDate(newDate);
      setView(Views.Days);
    }, children: month }, index);
  }) });
};

// node_modules/flowbite-react/lib/esm/components/Datepicker/Views/Years.js
var import_jsx_runtime27 = __toESM(require_jsx_runtime());
var DatepickerViewsYears = ({ theme: customTheme = {} }) => {
  const { theme: rootTheme, selectedDate, minDate, maxDate, viewDate, setViewDate, setView } = useDatePickerContext();
  const theme2 = mergeDeep(rootTheme.views.years, customTheme);
  return (0, import_jsx_runtime27.jsx)("div", { className: theme2.items.base, children: [...Array(12)].map((_year, index) => {
    const first = startOfYearPeriod(viewDate, 10);
    const year = first - 1 + index * 1;
    const newDate = new Date(viewDate.getTime());
    newDate.setFullYear(year);
    const isSelected = isDateEqual(selectedDate, newDate);
    const isDisabled = !isDateInRange(newDate, minDate, maxDate);
    return (0, import_jsx_runtime27.jsx)("button", { disabled: isDisabled, type: "button", className: twMerge(theme2.items.item.base, isSelected && theme2.items.item.selected, isDisabled && theme2.items.item.disabled), onClick: () => {
      if (isDisabled)
        return;
      setViewDate(newDate);
      setView(Views.Months);
    }, children: year }, index);
  }) });
};

// node_modules/flowbite-react/lib/esm/components/Datepicker/Datepicker.js
var Datepicker = ({
  title,
  open,
  inline = false,
  autoHide = true,
  // Hide when selected the day
  showClearButton = true,
  labelClearButton = "Clear",
  showTodayButton = true,
  labelTodayButton = "Today",
  defaultDate = /* @__PURE__ */ new Date(),
  minDate,
  maxDate,
  language = "en",
  weekStart = WeekStart.Sunday,
  className,
  theme: customTheme = {},
  onSelectedDateChanged,
  ...props
}) => {
  const theme2 = mergeDeep(getTheme().datepicker, customTheme);
  defaultDate = getFirstDateInRange(defaultDate, minDate, maxDate);
  const [isOpen, setIsOpen] = (0, import_react16.useState)(open);
  const [view, setView] = (0, import_react16.useState)(Views.Days);
  const [selectedDate, setSelectedDate] = (0, import_react16.useState)(defaultDate);
  const [viewDate, setViewDate] = (0, import_react16.useState)(defaultDate);
  const inputRef = (0, import_react16.useRef)(null);
  const datepickerRef = (0, import_react16.useRef)(null);
  const changeSelectedDate = (date, useAutohide) => {
    setSelectedDate(date);
    if (onSelectedDateChanged) {
      onSelectedDateChanged(date);
    }
    if (autoHide && view === Views.Days && useAutohide == true && !inline) {
      setIsOpen(false);
    }
  };
  const renderView = (type) => {
    switch (type) {
      case Views.Decades:
        return (0, import_jsx_runtime28.jsx)(DatepickerViewsDecades, { theme: theme2.views.decades });
      case Views.Years:
        return (0, import_jsx_runtime28.jsx)(DatepickerViewsYears, { theme: theme2.views.years });
      case Views.Months:
        return (0, import_jsx_runtime28.jsx)(DatepickerViewsMonth, { theme: theme2.views.months });
      case Views.Days:
      default:
        return (0, import_jsx_runtime28.jsx)(DatepickerViewsDays, { theme: theme2.views.days });
    }
  };
  const getNextView = () => {
    switch (view) {
      case Views.Days:
        return Views.Months;
      case Views.Months:
        return Views.Years;
      case Views.Years:
        return Views.Decades;
    }
    return view;
  };
  const getViewTitle = () => {
    switch (view) {
      case Views.Decades:
        return `${startOfYearPeriod(viewDate, 100)} - ${startOfYearPeriod(viewDate, 100) + 90}`;
      case Views.Years:
        return `${startOfYearPeriod(viewDate, 10)} - ${startOfYearPeriod(viewDate, 10) + 9}`;
      case Views.Months:
        return getFormattedDate(language, viewDate, { year: "numeric" });
      case Views.Days:
      default:
        return getFormattedDate(language, viewDate, { month: "long", year: "numeric" });
    }
  };
  const getViewDatePage = (view2, date, value) => {
    switch (view2) {
      case Views.Days:
        return new Date(addMonths(date, value));
      case Views.Months:
        return new Date(addYears(date, value));
      case Views.Years:
        return new Date(addYears(date, value * 10));
      case Views.Decades:
        return new Date(addYears(date, value * 100));
      default:
        return new Date(addYears(date, value * 10));
    }
  };
  (0, import_react16.useEffect)(() => {
    const handleClickOutside = (event) => {
      var _a, _b;
      const clickedInsideDatepicker = (_a = datepickerRef == null ? void 0 : datepickerRef.current) == null ? void 0 : _a.contains(event.target);
      const clickedInsideInput = (_b = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _b.contains(event.target);
      if (!clickedInsideDatepicker && !clickedInsideInput) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, datepickerRef, setIsOpen]);
  return (0, import_jsx_runtime28.jsx)(DatepickerContext.Provider, { value: {
    theme: theme2,
    language,
    minDate,
    maxDate,
    weekStart,
    isOpen,
    setIsOpen,
    view,
    setView,
    viewDate,
    setViewDate,
    selectedDate,
    setSelectedDate,
    changeSelectedDate
  }, children: (0, import_jsx_runtime28.jsxs)("div", { className: twMerge(theme2.root.base, className), children: [!inline && (0, import_jsx_runtime28.jsx)(TextInput, { theme: theme2.root.input, icon: HiCalendar, ref: inputRef, onFocus: () => {
    if (!isDateEqual(viewDate, selectedDate)) {
      setViewDate(selectedDate);
    }
    setIsOpen(true);
  }, value: selectedDate && getFormattedDate(language, selectedDate), readOnly: true, ...props }), (isOpen || inline) && (0, import_jsx_runtime28.jsx)("div", { ref: datepickerRef, className: twMerge(theme2.popup.root.base, inline && theme2.popup.root.inline), children: (0, import_jsx_runtime28.jsxs)("div", { className: theme2.popup.root.inner, children: [(0, import_jsx_runtime28.jsxs)("div", { className: theme2.popup.header.base, children: [title && (0, import_jsx_runtime28.jsx)("div", { className: theme2.popup.header.title, children: title }), (0, import_jsx_runtime28.jsxs)("div", { className: theme2.popup.header.selectors.base, children: [(0, import_jsx_runtime28.jsx)("button", { type: "button", className: twMerge(theme2.popup.header.selectors.button.base, theme2.popup.header.selectors.button.prev), onClick: () => setViewDate(getViewDatePage(view, viewDate, -1)), children: (0, import_jsx_runtime28.jsx)(HiArrowLeft, {}) }), (0, import_jsx_runtime28.jsx)("button", { type: "button", className: twMerge(theme2.popup.header.selectors.button.base, theme2.popup.header.selectors.button.view), onClick: () => setView(getNextView()), children: getViewTitle() }), (0, import_jsx_runtime28.jsx)("button", { type: "button", className: twMerge(theme2.popup.header.selectors.button.base, theme2.popup.header.selectors.button.next), onClick: () => setViewDate(getViewDatePage(view, viewDate, 1)), children: (0, import_jsx_runtime28.jsx)(HiArrowRight, {}) })] })] }), (0, import_jsx_runtime28.jsx)("div", { className: theme2.popup.view.base, children: renderView(view) }), (showClearButton || showTodayButton) && (0, import_jsx_runtime28.jsxs)("div", { className: theme2.popup.footer.base, children: [showTodayButton && (0, import_jsx_runtime28.jsx)("button", { type: "button", className: twMerge(theme2.popup.footer.button.base, theme2.popup.footer.button.today), onClick: () => {
    const today = /* @__PURE__ */ new Date();
    changeSelectedDate(today, true);
    setViewDate(today);
  }, children: labelTodayButton }), showClearButton && (0, import_jsx_runtime28.jsx)("button", { type: "button", className: twMerge(theme2.popup.footer.button.base, theme2.popup.footer.button.clear), onClick: () => {
    changeSelectedDate(defaultDate, true);
    if (defaultDate) {
      setViewDate(defaultDate);
    }
  }, children: labelClearButton })] })] }) })] }) });
};
Datepicker.displayName = "Datepicker";

// node_modules/flowbite-react/lib/esm/components/Dropdown/Dropdown.js
var import_jsx_runtime32 = __toESM(require_jsx_runtime());
var import_react22 = __toESM(require_react());

// node_modules/flowbite-react/lib/esm/components/Floating/helpers.js
var getMiddleware = ({ arrowRef, placement }) => {
  const middleware = [];
  middleware.push(offset(8));
  middleware.push(placement === "auto" ? autoPlacement() : flip());
  middleware.push(shift({ padding: 8 }));
  if (arrowRef == null ? void 0 : arrowRef.current) {
    middleware.push(arrow({ element: arrowRef.current }));
  }
  return middleware;
};
var getPlacement = ({ placement }) => {
  return placement === "auto" ? void 0 : placement;
};
var getArrowPlacement = ({ placement }) => {
  return {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement.split("-")[0]];
};

// node_modules/flowbite-react/lib/esm/hooks/use-floating.js
var useBaseFLoating = ({ open, arrowRef, placement = "top", setOpen }) => {
  return useFloating({
    placement: getPlacement({ placement }),
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: getMiddleware({ placement, arrowRef })
  });
};
var useFloatingInteractions = ({ context, trigger, role = "tooltip", interactions = [] }) => {
  return useInteractions([
    useClick(context, { enabled: trigger === "click" }),
    useHover(context, {
      enabled: trigger === "hover",
      handleClose: safePolygon()
    }),
    useDismiss(context),
    useRole(context, { role }),
    ...interactions
  ]);
};

// node_modules/flowbite-react/lib/esm/components/Dropdown/DropdownContext.js
var import_react19 = __toESM(require_react());
var DropdownContext = (0, import_react19.createContext)(void 0);
function useDropdownContext() {
  const context = (0, import_react19.useContext)(DropdownContext);
  if (!context) {
    throw new Error("useDropdownContext should be used within the DropdownContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Dropdown/DropdownDivider.js
var import_jsx_runtime29 = __toESM(require_jsx_runtime());
var DropdownDivider = ({ className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useDropdownContext();
  const theme2 = customTheme.divider ?? rootTheme.floating.divider;
  return (0, import_jsx_runtime29.jsx)("div", { className: twMerge(theme2, className), ...props });
};

// node_modules/flowbite-react/lib/esm/components/Dropdown/DropdownHeader.js
var import_jsx_runtime30 = __toESM(require_jsx_runtime());
var DropdownHeader = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useDropdownContext();
  const theme2 = customTheme.header ?? rootTheme.floating.header;
  return (0, import_jsx_runtime30.jsxs)(import_jsx_runtime30.Fragment, { children: [(0, import_jsx_runtime30.jsx)("div", { className: twMerge(theme2, className), ...props, children }), (0, import_jsx_runtime30.jsx)(DropdownDivider, {})] });
};

// node_modules/flowbite-react/lib/esm/components/Dropdown/DropdownItem.js
var import_jsx_runtime31 = __toESM(require_jsx_runtime());
var DropdownItem = ({ children, className, icon: Icon, onClick, theme: customTheme = {}, ...props }) => {
  const { ref, index } = useListItem({ label: typeof children === "string" ? children : void 0 });
  const { theme: rootTheme, activeIndex, dismissOnClick, getItemProps, handleSelect } = useDropdownContext();
  const isActive = activeIndex === index;
  const theme2 = mergeDeep(rootTheme.floating.item, customTheme);
  const theirProps = props;
  return (0, import_jsx_runtime31.jsx)("li", { role: "menuitem", className: theme2.container, children: (0, import_jsx_runtime31.jsxs)(ButtonBase, { ref, className: twMerge(theme2.base, className), ...theirProps, ...getItemProps({
    onClick: () => {
      onClick && onClick();
      dismissOnClick && handleSelect(null);
    }
  }), tabIndex: isActive ? 0 : -1, children: [Icon && (0, import_jsx_runtime31.jsx)(Icon, { className: theme2.icon }), children] }) });
};

// node_modules/flowbite-react/lib/esm/components/Dropdown/Dropdown.js
var icons = {
  top: HiOutlineChevronUp,
  right: HiOutlineChevronRight,
  bottom: HiOutlineChevronDown,
  left: HiOutlineChevronLeft
};
var Trigger = ({ refs, children, inline, theme: theme2, disabled, setButtonWidth, getReferenceProps, renderTrigger, ...buttonProps }) => {
  const ref = refs.reference;
  const a11yProps = getReferenceProps();
  (0, import_react22.useEffect)(() => {
    if (ref.current) {
      setButtonWidth == null ? void 0 : setButtonWidth(ref.current.clientWidth);
    }
  }, [ref, setButtonWidth]);
  if (renderTrigger) {
    const triggerElement = renderTrigger(theme2);
    return (0, import_react22.cloneElement)(triggerElement, { ref: refs.setReference, disabled, ...a11yProps, ...triggerElement.props });
  }
  return inline ? (0, import_jsx_runtime32.jsx)("button", { type: "button", ref: refs.setReference, className: theme2 == null ? void 0 : theme2.inlineWrapper, disabled, ...a11yProps, children }) : (0, import_jsx_runtime32.jsx)(Button, { ...buttonProps, disabled, type: "button", ref: refs.setReference, ...a11yProps, children });
};
var DropdownComponent = ({ children, className, dismissOnClick = true, theme: customTheme = {}, renderTrigger, ...props }) => {
  const [open, setOpen] = (0, import_react22.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react22.useState)(null);
  const [selectedIndex, setSelectedIndex] = (0, import_react22.useState)(null);
  const [buttonWidth, setButtonWidth] = (0, import_react22.useState)(void 0);
  const elementsRef = (0, import_react22.useRef)([]);
  const labelsRef = (0, import_react22.useRef)([]);
  const theme2 = mergeDeep(getTheme().dropdown, customTheme);
  const theirProps = props;
  const dataTestId = props["data-testid"] || "flowbite-dropdown-target";
  const { placement = props.inline ? "bottom-start" : "bottom", trigger = "click", label, inline, arrowIcon = true, ...buttonProps } = theirProps;
  const handleSelect = (0, import_react22.useCallback)((index) => {
    setSelectedIndex(index);
    setOpen(false);
  }, []);
  const handleTypeaheadMatch = (0, import_react22.useCallback)((index) => {
    if (open) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }, [open, handleSelect]);
  const { context, floatingStyles, refs } = useBaseFLoating({
    open,
    setOpen,
    placement
  });
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useFloatingInteractions({
    context,
    role: "menu",
    trigger,
    interactions: [listNav, typeahead]
  });
  const Icon = (0, import_react22.useMemo)(() => {
    const [p2] = placement.split("-");
    return icons[p2] ?? HiOutlineChevronDown;
  }, [placement]);
  return (0, import_jsx_runtime32.jsxs)(DropdownContext.Provider, { value: { theme: theme2, activeIndex, dismissOnClick, getItemProps, handleSelect }, children: [(0, import_jsx_runtime32.jsxs)(Trigger, { ...buttonProps, refs, inline, theme: theme2, "data-testid": dataTestId, className: twMerge(theme2.floating.target, buttonProps.className), setButtonWidth, getReferenceProps, renderTrigger, children: [label, arrowIcon && (0, import_jsx_runtime32.jsx)(Icon, { className: theme2.arrowIcon })] }), open && (0, import_jsx_runtime32.jsx)(FloatingFocusManager, { context, modal: false, children: (0, import_jsx_runtime32.jsx)("div", { ref: refs.setFloating, style: { ...floatingStyles, minWidth: buttonWidth }, "data-testid": "flowbite-dropdown", "aria-expanded": open, ...getFloatingProps({
    className: twMerge(theme2.floating.base, theme2.floating.animation, "duration-100", !open && theme2.floating.hidden, theme2.floating.style.auto, className)
  }), children: (0, import_jsx_runtime32.jsx)(FloatingList, { elementsRef, labelsRef, children: (0, import_jsx_runtime32.jsx)("ul", { className: theme2.content, tabIndex: -1, children }) }) }) })] });
};
DropdownComponent.displayName = "Dropdown";
DropdownHeader.displayName = "Dropdown.Header";
DropdownDivider.displayName = "Dropdown.Divider";
var Dropdown = Object.assign(DropdownComponent, {
  Item: DropdownItem,
  Header: DropdownHeader,
  Divider: DropdownDivider
});

// node_modules/flowbite-react/lib/esm/components/FileInput/FileInput.js
var import_jsx_runtime33 = __toESM(require_jsx_runtime());
var import_react23 = __toESM(require_react());
var FileInput = (0, import_react23.forwardRef)(({ className, color = "gray", helperText, sizing = "md", theme: customTheme = {}, ...props }, ref) => {
  const theme2 = mergeDeep(getTheme().fileInput, customTheme);
  return (0, import_jsx_runtime33.jsxs)(import_jsx_runtime33.Fragment, { children: [(0, import_jsx_runtime33.jsx)("div", { className: twMerge(theme2.root.base, className), children: (0, import_jsx_runtime33.jsx)("div", { className: theme2.field.base, children: (0, import_jsx_runtime33.jsx)("input", { className: twMerge(theme2.field.input.base, theme2.field.input.colors[color], theme2.field.input.sizes[sizing]), ...props, type: "file", ref }) }) }), helperText && (0, import_jsx_runtime33.jsx)(HelperText, { color, children: helperText })] });
});
FileInput.displayName = "FileInput";

// node_modules/flowbite-react/lib/esm/components/FloatingLabel/FloatingLabel.js
var import_jsx_runtime34 = __toESM(require_jsx_runtime());
var import_react24 = __toESM(require_react());
var FloatingLabel = (0, import_react24.forwardRef)(({ label, helperText, color = "default", sizing = "md", variant, disabled = false, theme: customTheme = {}, className, ...props }, ref) => {
  const randomId = (0, import_react24.useId)();
  const theme2 = mergeDeep(getTheme().floatingLabel, customTheme);
  return (0, import_jsx_runtime34.jsxs)("div", { children: [(0, import_jsx_runtime34.jsxs)("div", { className: twMerge("relative", variant === "standard" ? "z-0" : ""), children: [(0, import_jsx_runtime34.jsx)("input", { type: "text", id: props.id ? props.id : "floatingLabel" + randomId, "aria-describedby": "outlined_success_help", className: twMerge(theme2.input[color][variant][sizing], className), placeholder: " ", "data-testid": "floating-label", disabled, ...props, ref }), (0, import_jsx_runtime34.jsx)("label", { htmlFor: props.id ? props.id : "floatingLabel" + randomId, className: twMerge(theme2.label[color][variant][sizing], className), children: label })] }), (0, import_jsx_runtime34.jsx)("p", { id: "outlined_helper_text" + randomId, className: twMerge(theme2.helperText[color], className), children: helperText })] });
});
FloatingLabel.displayName = "FloatingLabel";

// node_modules/flowbite-react/lib/esm/components/Flowbite/Flowbite.js
var import_jsx_runtime36 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/theme-store/init/index.js
var import_jsx_runtime35 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/theme-store/init/client.js
function ThemeClientInit({ theme: theme2 }) {
  setTheme(theme2);
  return null;
}

// node_modules/flowbite-react/lib/esm/theme-store/init/mode.js
function ThemeModeInit({ mode }) {
  if (mode)
    setThemeMode(mode);
  useThemeMode();
  return null;
}

// node_modules/flowbite-react/lib/esm/theme-store/init/server.js
function ThemeServerInit({ theme: theme2 }) {
  setTheme(theme2);
  return null;
}

// node_modules/flowbite-react/lib/esm/theme-store/init/index.js
function ThemeInit({ mode, theme: theme2 }) {
  return (0, import_jsx_runtime35.jsxs)(import_jsx_runtime35.Fragment, { children: [(0, import_jsx_runtime35.jsx)(ThemeModeInit, { mode }), (0, import_jsx_runtime35.jsx)(ThemeServerInit, { theme: theme2 }), (0, import_jsx_runtime35.jsx)(ThemeClientInit, { theme: theme2 })] });
}

// node_modules/flowbite-react/lib/esm/components/Flowbite/Flowbite.js
var Flowbite = ({ children, theme: theme2 }) => {
  return (0, import_jsx_runtime36.jsxs)(import_jsx_runtime36.Fragment, { children: [(0, import_jsx_runtime36.jsx)(ThemeInit, { mode: theme2 == null ? void 0 : theme2.mode, theme: theme2 == null ? void 0 : theme2.theme }), children] });
};
Flowbite.displayName = "Flowbite";

// node_modules/flowbite-react/lib/esm/components/Footer/Footer.js
var import_jsx_runtime44 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Footer/FooterBrand.js
var import_jsx_runtime37 = __toESM(require_jsx_runtime());
var FooterBrand = ({ alt, className, children, href, name, src, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().footer.brand, customTheme);
  return (0, import_jsx_runtime37.jsx)("div", { children: href ? (0, import_jsx_runtime37.jsxs)("a", { "data-testid": "flowbite-footer-brand", href, className: twMerge(theme2.base, className), ...props, children: [(0, import_jsx_runtime37.jsx)("img", { alt, src, className: theme2.img }), (0, import_jsx_runtime37.jsx)("span", { "data-testid": "flowbite-footer-brand-span", className: theme2.span, children: name }), children] }) : (0, import_jsx_runtime37.jsx)("img", { alt, "data-testid": "flowbite-footer-brand", src, className: twMerge(theme2.img, className), ...props }) });
};

// node_modules/flowbite-react/lib/esm/components/Footer/FooterCopyright.js
var import_jsx_runtime38 = __toESM(require_jsx_runtime());
var FooterCopyright = ({ by, className, href, theme: customTheme = {}, year, ...props }) => {
  const theme2 = mergeDeep(getTheme().footer.copyright, customTheme);
  return (0, import_jsx_runtime38.jsxs)("div", { "data-testid": "flowbite-footer-copyright", className: twMerge(theme2.base, className), ...props, children: ["© ", year, href ? (0, import_jsx_runtime38.jsx)("a", { href, className: theme2.href, children: by }) : (0, import_jsx_runtime38.jsx)("span", { "data-testid": "flowbite-footer-copyright-span", className: theme2.span, children: by })] });
};

// node_modules/flowbite-react/lib/esm/components/Footer/FooterDivider.js
var import_jsx_runtime39 = __toESM(require_jsx_runtime());
var FooterDivider = ({ className, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().footer.divider, customTheme);
  return (0, import_jsx_runtime39.jsx)("hr", { "data-testid": "footer-divider", className: twMerge(theme2.base, className), ...props });
};

// node_modules/flowbite-react/lib/esm/components/Footer/FooterIcon.js
var import_jsx_runtime40 = __toESM(require_jsx_runtime());
var FooterIcon = ({ ariaLabel, className, href, icon: Icon, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().footer.icon, customTheme);
  return (0, import_jsx_runtime40.jsx)("div", { children: href ? (0, import_jsx_runtime40.jsx)("a", { "aria-label": ariaLabel, "data-testid": "flowbite-footer-icon", href, className: twMerge(theme2.base, className), ...props, children: (0, import_jsx_runtime40.jsx)(Icon, { className: theme2.size }) }) : (0, import_jsx_runtime40.jsx)(Icon, { "data-testid": "flowbite-footer-icon", className: theme2.size, ...props }) });
};

// node_modules/flowbite-react/lib/esm/components/Footer/FooterLink.js
var import_jsx_runtime41 = __toESM(require_jsx_runtime());
var FooterLink = ({ as: Component = "a", children, className, href, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().footer.groupLink.link, customTheme);
  return (0, import_jsx_runtime41.jsx)("li", { className: twMerge(theme2.base, className), children: (0, import_jsx_runtime41.jsx)(Component, { href, className: theme2.href, ...props, children }) });
};

// node_modules/flowbite-react/lib/esm/components/Footer/FooterLinkGroup.js
var import_jsx_runtime42 = __toESM(require_jsx_runtime());
var FooterLinkGroup = ({ children, className, col = false, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().footer.groupLink, customTheme);
  return (0, import_jsx_runtime42.jsx)("ul", { "data-testid": "footer-groupLink", className: twMerge(theme2.base, col && theme2.col, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Footer/FooterTitle.js
var import_jsx_runtime43 = __toESM(require_jsx_runtime());
var FooterTitle = ({ as: Component = "h2", className, theme: customTheme = {}, title, ...props }) => {
  const theme2 = mergeDeep(getTheme().footer.title, customTheme);
  return (0, import_jsx_runtime43.jsx)(Component, { "data-testid": "flowbite-footer-title", className: twMerge(theme2.base, className), ...props, children: title });
};

// node_modules/flowbite-react/lib/esm/components/Footer/Footer.js
var FooterComponent = ({ bgDark = false, children, className, container = false, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().footer, customTheme);
  return (0, import_jsx_runtime44.jsx)("footer", { "data-testid": "flowbite-footer", className: twMerge(theme2.root.base, bgDark && theme2.root.bgDark, container && theme2.root.container, className), ...props, children });
};
FooterComponent.displayName = "Footer";
FooterCopyright.displayName = "Footer.Copyright";
FooterLink.displayName = "Footer.Link";
FooterBrand.displayName = "Footer.Brand";
FooterLinkGroup.displayName = "Footer.LinkGroup";
FooterIcon.displayName = "Footer.Icon";
FooterTitle.displayName = "Footer.Title";
FooterDivider.displayName = "Footer.Divider";
var Footer = Object.assign(FooterComponent, {
  Copyright: FooterCopyright,
  Link: FooterLink,
  LinkGroup: FooterLinkGroup,
  Brand: FooterBrand,
  Icon: FooterIcon,
  Title: FooterTitle,
  Divider: FooterDivider
});

// node_modules/flowbite-react/lib/esm/components/Kbd/Kbd.js
var import_jsx_runtime45 = __toESM(require_jsx_runtime());
var Kbd = ({ children, className, icon: Icon, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().kbd, customTheme);
  return (0, import_jsx_runtime45.jsxs)("span", { className: twMerge(theme2.root.base, className), "data-testid": "flowbite-kbd", ...props, children: [Icon && (0, import_jsx_runtime45.jsx)(Icon, { className: theme2.root.icon, "data-testid": "flowbite-kbd-icon" }), children] });
};
Kbd.displayName = "Kbd";

// node_modules/flowbite-react/lib/esm/components/Label/Label.js
var import_jsx_runtime46 = __toESM(require_jsx_runtime());
var Label = ({ children, className, color = "default", disabled = false, theme: customTheme = {}, value, ...props }) => {
  const theme2 = mergeDeep(getTheme().label, customTheme);
  return (0, import_jsx_runtime46.jsx)("label", { className: twMerge(theme2.root.base, theme2.root.colors[color], disabled && theme2.root.disabled, className), "data-testid": "flowbite-label", ...props, children: value ?? children ?? "" });
};
Label.displayName = "Label";

// node_modules/flowbite-react/lib/esm/components/List/List.js
var import_jsx_runtime48 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/List/ListItem.js
var import_jsx_runtime47 = __toESM(require_jsx_runtime());
var ListItem = ({ children, className, theme: customTheme = {} }) => {
  const theme2 = mergeDeep(getTheme().listGroup.item, customTheme);
  return (0, import_jsx_runtime47.jsx)("li", { className: twMerge(theme2.base, className), children });
};

// node_modules/flowbite-react/lib/esm/components/List/List.js
var ListComponent = ({ children, className, unstyled, nested, ordered, horizontal, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().list, customTheme);
  const Component = ordered ? "ol" : "ul";
  return (0, import_jsx_runtime48.jsx)(Component, { className: twMerge(theme2.root.base, theme2.root.ordered[ordered ? "on" : "off"], unstyled && theme2.root.unstyled, nested && theme2.root.nested, horizontal && theme2.root.horizontal, className), ...props, children });
};
ListComponent.displayName = "List";
ListItem.displayName = "List.Item";
var List = Object.assign(ListComponent, { Item: ListItem });

// node_modules/flowbite-react/lib/esm/components/ListGroup/ListGroup.js
var import_jsx_runtime50 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/ListGroup/ListGroupItem.js
var import_jsx_runtime49 = __toESM(require_jsx_runtime());
var ListGroupItem = ({ active: isActive, children, className, href, icon: Icon, onClick, theme: customTheme = {}, disabled, ...props }) => {
  const theme2 = mergeDeep(getTheme().listGroup.item, customTheme);
  const isLink = typeof href !== "undefined";
  const Component = isLink ? "a" : "button";
  return (0, import_jsx_runtime49.jsx)("li", { className: twMerge(theme2.base, className), children: (0, import_jsx_runtime49.jsxs)(Component, { href, onClick, type: isLink ? void 0 : "button", disabled, className: twMerge(theme2.link.active[isActive ? "on" : "off"], theme2.link.disabled[disabled ? "on" : "off"], theme2.link.base, theme2.link.href[isLink ? "on" : "off"]), ...props, children: [Icon && (0, import_jsx_runtime49.jsx)(Icon, { "aria-hidden": true, "data-testid": "flowbite-list-group-item-icon", className: theme2.link.icon }), children] }) });
};

// node_modules/flowbite-react/lib/esm/components/ListGroup/ListGroup.js
var ListGroupComponent = ({ children, className, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().listGroup, customTheme);
  return (0, import_jsx_runtime50.jsx)("ul", { className: twMerge(theme2.root.base, className), ...props, children });
};
ListGroupComponent.displayName = "ListGroup";
ListGroupItem.displayName = "ListGroup.Item";
var ListGroup = Object.assign(ListGroupComponent, {
  Item: ListGroupItem
});

// node_modules/flowbite-react/lib/esm/components/Modal/Modal.js
var import_jsx_runtime54 = __toESM(require_jsx_runtime());
var import_react28 = __toESM(require_react());

// node_modules/flowbite-react/lib/esm/components/Modal/ModalBody.js
var import_jsx_runtime51 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Modal/ModalContext.js
var import_react25 = __toESM(require_react());
var ModalContext = (0, import_react25.createContext)(void 0);
function useModalContext() {
  const context = (0, import_react25.useContext)(ModalContext);
  if (!context) {
    throw new Error("useModalContext should be used within the ModalContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Modal/ModalBody.js
var ModalBody = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, popup } = useModalContext();
  const theme2 = mergeDeep(rootTheme.body, customTheme);
  return (0, import_jsx_runtime51.jsx)("div", { className: twMerge(theme2.base, popup && [theme2.popup], className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Modal/ModalFooter.js
var import_jsx_runtime52 = __toESM(require_jsx_runtime());
var ModalFooter = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, popup } = useModalContext();
  const theme2 = mergeDeep(rootTheme.footer, customTheme);
  return (0, import_jsx_runtime52.jsx)("div", { className: twMerge(theme2.base, !popup && theme2.popup, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Modal/ModalHeader.js
var import_jsx_runtime53 = __toESM(require_jsx_runtime());
var import_react26 = __toESM(require_react());
var ModalHeader = ({ as: Component = "h3", children, className, theme: customTheme = {}, id, ...props }) => {
  const innerHeaderId = (0, import_react26.useId)();
  const headerId = id || innerHeaderId;
  const { theme: rootTheme, popup, onClose, setHeaderId } = useModalContext();
  const theme2 = mergeDeep(rootTheme.header, customTheme);
  (0, import_react26.useLayoutEffect)(() => {
    setHeaderId(headerId);
    return () => setHeaderId(void 0);
  }, [headerId, setHeaderId]);
  return (0, import_jsx_runtime53.jsxs)("div", { className: twMerge(theme2.base, popup && theme2.popup, className), ...props, children: [(0, import_jsx_runtime53.jsx)(Component, { id: headerId, className: theme2.title, children }), (0, import_jsx_runtime53.jsx)("button", { "aria-label": "Close", className: theme2.close.base, type: "button", onClick: onClose, children: (0, import_jsx_runtime53.jsx)(HiOutlineX, { "aria-hidden": true, className: theme2.close.icon }) })] });
};

// node_modules/flowbite-react/lib/esm/components/Modal/Modal.js
var ModalComponent = (0, import_react28.forwardRef)(({ children, className, dismissible = false, onClose, popup, position = "center", root, show, size = "2xl", theme: customTheme = {}, initialFocus, ...props }, theirRef) => {
  const [headerId, setHeaderId] = (0, import_react28.useState)(void 0);
  const theme2 = mergeDeep(getTheme().modal, customTheme);
  const { context } = useFloating({
    open: show,
    onOpenChange: () => onClose && onClose()
  });
  const ref = useMergeRefs([context.refs.setFloating, theirRef]);
  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown", enabled: dismissible });
  const role = useRole(context);
  const { getFloatingProps } = useInteractions([click, dismiss, role]);
  if (!show) {
    return null;
  }
  return (0, import_jsx_runtime54.jsx)(ModalContext.Provider, { value: { theme: theme2, popup, onClose, setHeaderId }, children: (0, import_jsx_runtime54.jsx)(FloatingPortal, { root, children: (0, import_jsx_runtime54.jsx)(FloatingOverlay, { lockScroll: true, "data-testid": "modal-overlay", className: twMerge(theme2.root.base, theme2.root.positions[position], show ? theme2.root.show.on : theme2.root.show.off, className), ...props, children: (0, import_jsx_runtime54.jsx)(FloatingFocusManager, { context, initialFocus, children: (0, import_jsx_runtime54.jsx)("div", { ref, ...getFloatingProps(props), "aria-labelledby": headerId, className: twMerge(theme2.content.base, theme2.root.sizes[size]), children: (0, import_jsx_runtime54.jsx)("div", { className: theme2.content.inner, children }) }) }) }) }) });
});
ModalComponent.displayName = "Modal";
ModalHeader.displayName = "Modal.Header";
ModalBody.displayName = "Modal.Body";
ModalFooter.displayName = "Modal.Footer";
var Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter
});

// node_modules/flowbite-react/lib/esm/components/Navbar/Navbar.js
var import_jsx_runtime59 = __toESM(require_jsx_runtime());
var import_react30 = __toESM(require_react());

// node_modules/flowbite-react/lib/esm/components/Navbar/NavbarBrand.js
var import_jsx_runtime55 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Navbar/NavbarContext.js
var import_react29 = __toESM(require_react());
var NavbarContext = (0, import_react29.createContext)(void 0);
function useNavbarContext() {
  const context = (0, import_react29.useContext)(NavbarContext);
  if (!context) {
    throw new Error("useNavBarContext should be used within the NavbarContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Navbar/NavbarBrand.js
var NavbarBrand = ({ as: Component = "a", children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useNavbarContext();
  const theme2 = mergeDeep(rootTheme.brand, customTheme);
  return (0, import_jsx_runtime55.jsx)(Component, { className: twMerge(theme2.base, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Navbar/NavbarCollapse.js
var import_jsx_runtime56 = __toESM(require_jsx_runtime());
var NavbarCollapse = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, isOpen } = useNavbarContext();
  const theme2 = mergeDeep(rootTheme.collapse, customTheme);
  return (0, import_jsx_runtime56.jsx)("div", { "data-testid": "flowbite-navbar-collapse", className: twMerge(theme2.base, theme2.hidden[!isOpen ? "on" : "off"], className), ...props, children: (0, import_jsx_runtime56.jsx)("ul", { className: theme2.list, children }) });
};

// node_modules/flowbite-react/lib/esm/components/Navbar/NavbarLink.js
var import_jsx_runtime57 = __toESM(require_jsx_runtime());
var NavbarLink = ({ active, as: Component = "a", disabled, children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useNavbarContext();
  const theme2 = mergeDeep(rootTheme.link, customTheme);
  return (0, import_jsx_runtime57.jsx)("li", { children: (0, import_jsx_runtime57.jsx)(Component, { className: twMerge(theme2.base, active && theme2.active.on, !active && !disabled && theme2.active.off, theme2.disabled[disabled ? "on" : "off"], className), ...props, children }) });
};

// node_modules/flowbite-react/lib/esm/components/Navbar/NavbarToggle.js
var import_jsx_runtime58 = __toESM(require_jsx_runtime());
var NavbarToggle = ({ barIcon: BarIcon = FaBars, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, isOpen, setIsOpen } = useNavbarContext();
  const theme2 = mergeDeep(rootTheme.toggle, customTheme);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (0, import_jsx_runtime58.jsxs)("button", { "data-testid": "flowbite-navbar-toggle", onClick: handleClick, className: twMerge(theme2.base, className), ...props, children: [(0, import_jsx_runtime58.jsx)("span", { className: "sr-only", children: "Open main menu" }), (0, import_jsx_runtime58.jsx)(BarIcon, { "aria-hidden": true, className: theme2.icon })] });
};

// node_modules/flowbite-react/lib/esm/components/Navbar/Navbar.js
var NavbarComponent = ({ border, children, className, fluid = false, menuOpen, rounded, theme: customTheme = {}, ...props }) => {
  const [isOpen, setIsOpen] = (0, import_react30.useState)(menuOpen);
  const theme2 = mergeDeep(getTheme().navbar, customTheme);
  return (0, import_jsx_runtime59.jsx)(NavbarContext.Provider, { value: { theme: theme2, isOpen, setIsOpen }, children: (0, import_jsx_runtime59.jsx)("nav", { className: twMerge(theme2.root.base, theme2.root.bordered[border ? "on" : "off"], theme2.root.rounded[rounded ? "on" : "off"], className), ...props, children: (0, import_jsx_runtime59.jsx)("div", { className: twMerge(theme2.root.inner.base, theme2.root.inner.fluid[fluid ? "on" : "off"]), children }) }) });
};
NavbarComponent.displayName = "Navbar";
NavbarBrand.displayName = "Navbar.Brand";
NavbarCollapse.displayName = "Navbar.Collapse";
NavbarLink.displayName = "Navbar.Link";
NavbarToggle.displayName = "Navbar.Toggle";
var Navbar = Object.assign(NavbarComponent, {
  Brand: NavbarBrand,
  Collapse: NavbarCollapse,
  Link: NavbarLink,
  Toggle: NavbarToggle
});

// node_modules/flowbite-react/lib/esm/components/Pagination/Pagination.js
var import_jsx_runtime61 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Pagination/PaginationButton.js
var import_jsx_runtime60 = __toESM(require_jsx_runtime());
var PaginationButton = ({ active, children, className, onClick, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().pagination, customTheme);
  return (0, import_jsx_runtime60.jsx)("button", { type: "button", className: twMerge(active && theme2.pages.selector.active, className), onClick, ...props, children });
};
PaginationButton.displayName = "Pagination.Button";
var PaginationNavigation = ({ children, className, onClick, theme: customTheme = {}, disabled = false, ...props }) => {
  const theme2 = mergeDeep(getTheme().pagination, customTheme);
  return (0, import_jsx_runtime60.jsx)("button", { type: "button", className: twMerge(disabled && theme2.pages.selector.disabled, className), disabled, onClick, ...props, children });
};
PaginationNavigation.displayName = "Pagination.Navigation";

// node_modules/flowbite-react/lib/esm/components/Pagination/helpers.js
var range = (start, end) => {
  if (start >= end) {
    return [];
  }
  return [...Array(end - start + 1).keys()].map((key) => key + start);
};

// node_modules/flowbite-react/lib/esm/components/Pagination/Pagination.js
var PaginationComponent = ({ className, currentPage, layout = "pagination", nextLabel = "Next", onPageChange, previousLabel = "Previous", renderPaginationButton = (props2) => (0, import_jsx_runtime61.jsx)(PaginationButton, { ...props2 }), showIcons: showIcon = false, theme: customTheme = {}, totalPages, ...props }) => {
  const theme2 = mergeDeep(getTheme().pagination, customTheme);
  const lastPage = Math.min(Math.max(layout === "pagination" ? currentPage + 2 : currentPage + 4, 5), totalPages);
  const firstPage = Math.max(1, lastPage - 4);
  const goToNextPage = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };
  const goToPreviousPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };
  return (0, import_jsx_runtime61.jsxs)("nav", { className: twMerge(theme2.base, className), ...props, children: [layout === "table" && (0, import_jsx_runtime61.jsxs)("div", { className: theme2.layout.table.base, children: ["Showing ", (0, import_jsx_runtime61.jsx)("span", { className: theme2.layout.table.span, children: firstPage }), " to ", (0, import_jsx_runtime61.jsx)("span", { className: theme2.layout.table.span, children: lastPage }), " of ", (0, import_jsx_runtime61.jsx)("span", { className: theme2.layout.table.span, children: totalPages }), " Entries"] }), (0, import_jsx_runtime61.jsxs)("ul", { className: theme2.pages.base, children: [(0, import_jsx_runtime61.jsx)("li", { children: (0, import_jsx_runtime61.jsxs)(PaginationNavigation, { className: twMerge(theme2.pages.previous.base, showIcon && theme2.pages.showIcon), onClick: goToPreviousPage, disabled: currentPage === 1, children: [showIcon && (0, import_jsx_runtime61.jsx)(HiChevronLeft, { "aria-hidden": true, className: theme2.pages.previous.icon }), previousLabel] }) }), layout === "pagination" && range(firstPage, lastPage).map((page) => (0, import_jsx_runtime61.jsx)("li", { "aria-current": page === currentPage ? "page" : void 0, children: renderPaginationButton({
    className: twMerge(theme2.pages.selector.base, currentPage === page && theme2.pages.selector.active),
    active: page === currentPage,
    onClick: () => onPageChange(page),
    children: page
  }) }, page)), (0, import_jsx_runtime61.jsx)("li", { children: (0, import_jsx_runtime61.jsxs)(PaginationNavigation, { className: twMerge(theme2.pages.next.base, showIcon && theme2.pages.showIcon), onClick: goToNextPage, disabled: currentPage === totalPages, children: [nextLabel, showIcon && (0, import_jsx_runtime61.jsx)(HiChevronRight, { "aria-hidden": true, className: theme2.pages.next.icon })] }) })] })] });
};
PaginationComponent.displayName = "Pagination";
var Pagination = Object.assign(PaginationComponent, {
  Button: PaginationButton
});

// node_modules/flowbite-react/lib/esm/components/Progress/Progress.js
var import_jsx_runtime62 = __toESM(require_jsx_runtime());
var import_react31 = __toESM(require_react());
var Progress = ({ className, color = "cyan", labelProgress = false, labelText = false, progress, progressLabelPosition = "inside", size = "md", textLabel = "progressbar", textLabelPosition = "inside", theme: customTheme = {}, ...props }) => {
  const id = (0, import_react31.useId)();
  const theme2 = mergeDeep(getTheme().progress, customTheme);
  return (0, import_jsx_runtime62.jsx)(import_jsx_runtime62.Fragment, { children: (0, import_jsx_runtime62.jsxs)("div", { id, "aria-label": textLabel, "aria-valuenow": progress, role: "progressbar", ...props, children: [(textLabel && labelText && textLabelPosition === "outside" || progress > 0 && labelProgress && progressLabelPosition === "outside") && (0, import_jsx_runtime62.jsxs)("div", { className: theme2.label, "data-testid": "flowbite-progress-outer-label-container", children: [textLabel && labelText && textLabelPosition === "outside" && (0, import_jsx_runtime62.jsx)("span", { "data-testid": "flowbite-progress-outer-text-label", children: textLabel }), labelProgress && progressLabelPosition === "outside" && (0, import_jsx_runtime62.jsxs)("span", { "data-testid": "flowbite-progress-outer-progress-label", children: [progress, "%"] })] }), (0, import_jsx_runtime62.jsx)("div", { className: twMerge(theme2.base, theme2.size[size], className), children: (0, import_jsx_runtime62.jsxs)("div", { style: { width: `${progress}%` }, className: twMerge(theme2.bar, theme2.color[color], theme2.size[size]), children: [textLabel && labelText && textLabelPosition === "inside" && (0, import_jsx_runtime62.jsx)("span", { "data-testid": "flowbite-progress-inner-text-label", children: textLabel }), progress > 0 && labelProgress && progressLabelPosition === "inside" && (0, import_jsx_runtime62.jsxs)("span", { "data-testid": "flowbite-progress-inner-progress-label", children: [progress, "%"] })] }) })] }) });
};
Progress.displayName = "Progress";

// node_modules/flowbite-react/lib/esm/components/Radio/Radio.js
var import_jsx_runtime63 = __toESM(require_jsx_runtime());
var import_react32 = __toESM(require_react());
var Radio = (0, import_react32.forwardRef)(({ className, theme: customTheme = {}, ...props }, ref) => {
  const theme2 = mergeDeep(getTheme().radio, customTheme);
  return (0, import_jsx_runtime63.jsx)("input", { ref, type: "radio", className: twMerge(theme2.root.base, className), ...props });
});
Radio.displayName = "Radio";

// node_modules/flowbite-react/lib/esm/components/RangeSlider/RangeSlider.js
var import_jsx_runtime64 = __toESM(require_jsx_runtime());
var import_react33 = __toESM(require_react());
var RangeSlider = (0, import_react33.forwardRef)(({ className, sizing = "md", theme: customTheme = {}, ...props }, ref) => {
  const theme2 = mergeDeep(getTheme().rangeSlider, customTheme);
  return (0, import_jsx_runtime64.jsx)(import_jsx_runtime64.Fragment, { children: (0, import_jsx_runtime64.jsx)("div", { "data-testid": "flowbite-range-slider", className: twMerge(theme2.root.base, className), children: (0, import_jsx_runtime64.jsx)("div", { className: theme2.field.base, children: (0, import_jsx_runtime64.jsx)("input", { ref, type: "range", className: twMerge(theme2.field.input.base, theme2.field.input.sizes[sizing]), ...props }) }) }) });
});
RangeSlider.displayName = "RangeSlider";

// node_modules/flowbite-react/lib/esm/components/Rating/Rating.js
var import_jsx_runtime67 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Rating/RatingAdvanced.js
var import_jsx_runtime65 = __toESM(require_jsx_runtime());
var RatingAdvanced = ({ children, className, percentFilled = 0, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().ratingAdvanced, customTheme);
  return (0, import_jsx_runtime65.jsxs)("div", { className: twMerge(theme2.base, className), ...props, children: [(0, import_jsx_runtime65.jsx)("span", { className: theme2.label, children }), (0, import_jsx_runtime65.jsx)("div", { className: theme2.progress.base, children: (0, import_jsx_runtime65.jsx)("div", { className: theme2.progress.fill, "data-testid": "flowbite-rating-fill", style: { width: `${percentFilled}%` } }) }), (0, import_jsx_runtime65.jsx)("span", { className: theme2.progress.label, children: `${percentFilled}%` })] });
};

// node_modules/flowbite-react/lib/esm/components/Rating/RatingContext.js
var import_react34 = __toESM(require_react());
var RatingContext = (0, import_react34.createContext)(void 0);
function useRatingContext() {
  const context = (0, import_react34.useContext)(RatingContext);
  if (!context) {
    throw new Error("useRatingContext should be used within the RatingContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Rating/RatingStar.js
var import_jsx_runtime66 = __toESM(require_jsx_runtime());
var RatingStar = ({ className, filled = true, starIcon: Icon = HiStar, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, size = "sm" } = useRatingContext();
  const theme2 = mergeDeep(rootTheme.star, customTheme);
  return (0, import_jsx_runtime66.jsx)(Icon, { "data-testid": "flowbite-rating-star", className: twMerge(theme2.sizes[size], theme2[filled ? "filled" : "empty"], className), ...props });
};

// node_modules/flowbite-react/lib/esm/components/Rating/Rating.js
var RatingComponent = ({ children, className, size = "sm", theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().rating, customTheme);
  return (0, import_jsx_runtime67.jsx)(RatingContext.Provider, { value: { theme: theme2, size }, children: (0, import_jsx_runtime67.jsx)("div", { className: twMerge(theme2.root.base, className), ...props, children }) });
};
RatingComponent.displayName = "Rating";
RatingStar.displayName = "Rating.Star";
RatingAdvanced.displayName = "Rating.Advanced";
var Rating = Object.assign(RatingComponent, {
  Star: RatingStar,
  Advanced: RatingAdvanced
});

// node_modules/flowbite-react/lib/esm/components/Select/Select.js
var import_jsx_runtime68 = __toESM(require_jsx_runtime());
var import_react35 = __toESM(require_react());
var Select = (0, import_react35.forwardRef)(({ addon, children, className, color = "gray", helperText, icon: Icon, shadow, sizing = "md", theme: customTheme = {}, ...props }, ref) => {
  const theme2 = mergeDeep(getTheme().select, customTheme);
  return (0, import_jsx_runtime68.jsxs)("div", { className: twMerge(theme2.base, className), children: [addon && (0, import_jsx_runtime68.jsx)("span", { className: theme2.addon, children: addon }), (0, import_jsx_runtime68.jsxs)("div", { className: theme2.field.base, children: [Icon && (0, import_jsx_runtime68.jsx)("div", { className: theme2.field.icon.base, children: (0, import_jsx_runtime68.jsx)(Icon, { className: theme2.field.icon.svg }) }), (0, import_jsx_runtime68.jsx)("select", { className: twMerge(theme2.field.select.base, theme2.field.select.colors[color], theme2.field.select.sizes[sizing], theme2.field.select.withIcon[Icon ? "on" : "off"], theme2.field.select.withAddon[addon ? "on" : "off"], theme2.field.select.withShadow[shadow ? "on" : "off"]), ...props, ref, children }), helperText && (0, import_jsx_runtime68.jsx)(HelperText, { color, children: helperText })] })] });
});
Select.displayName = "Select";

// node_modules/flowbite-react/lib/esm/components/Sidebar/Sidebar.js
var import_jsx_runtime77 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarCTA.js
var import_jsx_runtime69 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarContext.js
var import_react36 = __toESM(require_react());
var SidebarContext = (0, import_react36.createContext)(void 0);
function useSidebarContext() {
  const context = (0, import_react36.useContext)(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext should be used within the SidebarContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarCTA.js
var SidebarCTA = ({ children, color = "info", className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, isCollapsed } = useSidebarContext();
  const theme2 = mergeDeep(rootTheme.cta, customTheme);
  return (0, import_jsx_runtime69.jsx)("div", { "data-testid": "sidebar-cta", hidden: isCollapsed, className: twMerge(theme2.base, theme2.color[color], className), ...props, children });
};
SidebarCTA.displayName = "Sidebar.CTA";

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarCollapse.js
var import_jsx_runtime72 = __toESM(require_jsx_runtime());
var import_react40 = __toESM(require_react());

// node_modules/flowbite-react/lib/esm/components/Tooltip/Tooltip.js
var import_jsx_runtime71 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Floating/Floating.js
var import_jsx_runtime70 = __toESM(require_jsx_runtime());
var import_react38 = __toESM(require_react());
var Floating = ({ animation = "duration-300", arrow: arrow2 = true, children, className, content, placement = "top", style = "dark", theme: theme2, trigger = "hover", minWidth, ...props }) => {
  const arrowRef = (0, import_react38.useRef)(null);
  const [open, setOpen] = (0, import_react38.useState)(false);
  const floatingProperties = useBaseFLoating({
    open,
    placement,
    arrowRef,
    setOpen
  });
  const { context, middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }, refs, strategy, update, x, y } = floatingProperties;
  const focus = useFocus(context);
  const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
    context,
    role: "tooltip",
    trigger,
    interactions: [focus]
  });
  (0, import_react38.useEffect)(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, refs.floating, refs.reference, update]);
  return (0, import_jsx_runtime70.jsxs)(import_jsx_runtime70.Fragment, { children: [(0, import_jsx_runtime70.jsx)("div", { ref: refs.setReference, className: theme2.target, "data-testid": "flowbite-tooltip-target", ...getReferenceProps(), children }), (0, import_jsx_runtime70.jsxs)("div", { ref: refs.setFloating, "data-testid": "flowbite-tooltip", ...getFloatingProps({
    className: twMerge(theme2.base, animation && `${theme2.animation} ${animation}`, !open && theme2.hidden, theme2.style[style], className),
    style: {
      position: strategy,
      top: y ?? " ",
      left: x ?? " ",
      minWidth
    },
    ...props
  }), children: [(0, import_jsx_runtime70.jsx)("div", { className: theme2.content, children: content }), arrow2 && (0, import_jsx_runtime70.jsx)("div", { className: twMerge(theme2.arrow.base, style === "dark" && theme2.arrow.style.dark, style === "light" && theme2.arrow.style.light, style === "auto" && theme2.arrow.style.auto), "data-testid": "flowbite-tooltip-arrow", ref: arrowRef, style: {
    top: arrowY ?? " ",
    left: arrowX ?? " ",
    right: " ",
    bottom: " ",
    [getArrowPlacement({ placement: floatingProperties.placement })]: theme2.arrow.placement
  }, children: " " })] })] });
};

// node_modules/flowbite-react/lib/esm/components/Tooltip/Tooltip.js
var Tooltip = ({ animation = "duration-300", arrow: arrow2 = true, children, className, content, placement = "top", style = "dark", theme: customTheme = {}, trigger = "hover", ...props }) => {
  const theme2 = mergeDeep(getTheme().tooltip, customTheme);
  return (0, import_jsx_runtime71.jsx)(Floating, { animation, arrow: arrow2, content, placement, style, theme: theme2, trigger, className, ...props, children });
};
Tooltip.displayName = "Tooltip";

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarItemContext.js
var import_react39 = __toESM(require_react());
var SidebarItemContext = (0, import_react39.createContext)(void 0);
function useSidebarItemContext() {
  const context = (0, import_react39.useContext)(SidebarItemContext);
  if (!context) {
    throw new Error("useSidebarItemContext should be used within the SidebarItemContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarCollapse.js
var SidebarCollapse = ({ children, className, icon: Icon, label, chevronIcon: ChevronIcon = HiChevronDown, renderChevronIcon, open = false, theme: customTheme = {}, ...props }) => {
  const id = (0, import_react40.useId)();
  const [isOpen, setOpen] = (0, import_react40.useState)(open);
  const { theme: rootTheme, isCollapsed } = useSidebarContext();
  const theme2 = mergeDeep(rootTheme.collapse, customTheme);
  (0, import_react40.useEffect)(() => setOpen(open), [open]);
  const Wrapper = ({ children: children2 }) => (0, import_jsx_runtime72.jsx)("li", { children: isCollapsed && !isOpen ? (0, import_jsx_runtime72.jsx)(Tooltip, { content: label, placement: "right", children: children2 }) : children2 });
  return (0, import_jsx_runtime72.jsxs)(Wrapper, { children: [(0, import_jsx_runtime72.jsxs)("button", { id: `flowbite-sidebar-collapse-${id}`, onClick: () => setOpen(!isOpen), title: label, type: "button", className: twMerge(theme2.button, className), ...props, children: [Icon && (0, import_jsx_runtime72.jsx)(Icon, { "aria-hidden": true, "data-testid": "flowbite-sidebar-collapse-icon", className: twMerge(theme2.icon.base, theme2.icon.open[isOpen ? "on" : "off"]) }), isCollapsed ? (0, import_jsx_runtime72.jsx)("span", { className: "sr-only", children: label }) : (0, import_jsx_runtime72.jsxs)(import_jsx_runtime72.Fragment, { children: [(0, import_jsx_runtime72.jsx)("span", { "data-testid": "flowbite-sidebar-collapse-label", className: theme2.label.base, children: label }), renderChevronIcon ? renderChevronIcon(theme2, isOpen) : (0, import_jsx_runtime72.jsx)(ChevronIcon, { "aria-hidden": true, className: twMerge(theme2.label.icon.base, theme2.label.icon.open[isOpen ? "on" : "off"]) })] })] }), (0, import_jsx_runtime72.jsx)("ul", { "aria-labelledby": `flowbite-sidebar-collapse-${id}`, hidden: !isOpen, className: theme2.list, children: (0, import_jsx_runtime72.jsx)(SidebarItemContext.Provider, { value: { isInsideCollapse: true }, children }) })] });
};
SidebarCollapse.displayName = "Sidebar.Collapse";

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarItem.js
var import_jsx_runtime73 = __toESM(require_jsx_runtime());
var import_react41 = __toESM(require_react());
var ListItem2 = ({ id, theme: theme2, isCollapsed, tooltipChildren, children: wrapperChildren, ...props }) => (0, import_jsx_runtime73.jsx)("li", { ...props, children: isCollapsed ? (0, import_jsx_runtime73.jsx)(Tooltip, { content: (0, import_jsx_runtime73.jsx)(Children4, { id, theme: theme2, children: tooltipChildren }), placement: "right", children: wrapperChildren }) : wrapperChildren });
var Children4 = ({ id, theme: theme2, children }) => {
  return (0, import_jsx_runtime73.jsx)("span", { "data-testid": "flowbite-sidebar-item-content", id: `flowbite-sidebar-item-${id}`, className: twMerge(theme2.content.base), children });
};
var SidebarItem = (0, import_react41.forwardRef)(({ active: isActive, as: Component = "a", children, className, icon: Icon, label, labelColor = "info", theme: customTheme = {}, ...props }, ref) => {
  var _a, _b, _c, _d;
  const id = (0, import_react41.useId)();
  const { theme: rootTheme, isCollapsed } = useSidebarContext();
  const { isInsideCollapse } = useSidebarItemContext();
  const theme2 = mergeDeep(rootTheme.item, customTheme);
  return (0, import_jsx_runtime73.jsx)(ListItem2, { theme: theme2, className: theme2.listItem, id, isCollapsed, tooltipChildren: children, children: (0, import_jsx_runtime73.jsxs)(Component, { "aria-labelledby": `flowbite-sidebar-item-${id}`, ref, className: twMerge(theme2.base, isActive && theme2.active, !isCollapsed && isInsideCollapse && ((_a = theme2.collapsed) == null ? void 0 : _a.insideCollapse), className), ...props, children: [Icon && (0, import_jsx_runtime73.jsx)(Icon, { "aria-hidden": true, "data-testid": "flowbite-sidebar-item-icon", className: twMerge((_b = theme2.icon) == null ? void 0 : _b.base, isActive && ((_c = theme2.icon) == null ? void 0 : _c.active)) }), isCollapsed && !Icon && (0, import_jsx_runtime73.jsx)("span", { className: (_d = theme2.collapsed) == null ? void 0 : _d.noIcon, children: children.charAt(0).toLocaleUpperCase() ?? "?" }), !isCollapsed && (0, import_jsx_runtime73.jsx)(Children4, { id, theme: theme2, children }), !isCollapsed && label && (0, import_jsx_runtime73.jsx)(Badge, { color: labelColor, "data-testid": "flowbite-sidebar-label", hidden: isCollapsed, className: theme2.label, children: label })] }) });
});
SidebarItem.displayName = "Sidebar.Item";

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarItemGroup.js
var import_jsx_runtime74 = __toESM(require_jsx_runtime());
var SidebarItemGroup = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useSidebarContext();
  const theme2 = mergeDeep(rootTheme.itemGroup, customTheme);
  return (0, import_jsx_runtime74.jsx)("ul", { "data-testid": "flowbite-sidebar-item-group", className: twMerge(theme2.base, className), ...props, children: (0, import_jsx_runtime74.jsx)(SidebarItemContext.Provider, { value: { isInsideCollapse: false }, children }) });
};
SidebarItemGroup.displayName = "Sidebar.ItemGroup";

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarItems.js
var import_jsx_runtime75 = __toESM(require_jsx_runtime());
var SidebarItems = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useSidebarContext();
  const theme2 = mergeDeep(rootTheme.items, customTheme);
  return (0, import_jsx_runtime75.jsx)("div", { className: twMerge(theme2.base, className), "data-testid": "flowbite-sidebar-items", ...props, children });
};
SidebarItems.displayName = "Sidebar.Items";

// node_modules/flowbite-react/lib/esm/components/Sidebar/SidebarLogo.js
var import_jsx_runtime76 = __toESM(require_jsx_runtime());
var import_react42 = __toESM(require_react());
var SidebarLogo = ({ children, className, href, img, imgAlt = "", theme: customTheme = {}, ...props }) => {
  const id = (0, import_react42.useId)();
  const { theme: rootTheme, isCollapsed } = useSidebarContext();
  const theme2 = mergeDeep(rootTheme.logo, customTheme);
  return (0, import_jsx_runtime76.jsxs)("a", { "aria-labelledby": `flowbite-sidebar-logo-${id}`, href, className: twMerge(theme2.base, className), ...props, children: [(0, import_jsx_runtime76.jsx)("img", { alt: imgAlt, src: img, className: theme2.img }), (0, import_jsx_runtime76.jsx)("span", { className: theme2.collapsed[isCollapsed ? "on" : "off"], id: `flowbite-sidebar-logo-${id}`, children })] });
};
SidebarLogo.displayName = "Sidebar.Logo";

// node_modules/flowbite-react/lib/esm/components/Sidebar/Sidebar.js
var SidebarComponent = ({ children, as: Component = "nav", collapseBehavior = "collapse", collapsed: isCollapsed = false, theme: customTheme = {}, className, ...props }) => {
  const theme2 = mergeDeep(getTheme().sidebar, customTheme);
  return (0, import_jsx_runtime77.jsx)(SidebarContext.Provider, { value: { theme: theme2, isCollapsed }, children: (0, import_jsx_runtime77.jsx)(Component, { "aria-label": "Sidebar", hidden: isCollapsed && collapseBehavior === "hide", className: twMerge(theme2.root.base, theme2.root.collapsed[isCollapsed ? "on" : "off"], className), ...props, children: (0, import_jsx_runtime77.jsx)("div", { className: theme2.root.inner, children }) }) });
};
SidebarComponent.displayName = "Sidebar";
var Sidebar = Object.assign(SidebarComponent, {
  Collapse: SidebarCollapse,
  CTA: SidebarCTA,
  Item: SidebarItem,
  Items: SidebarItems,
  ItemGroup: SidebarItemGroup,
  Logo: SidebarLogo
});

// node_modules/flowbite-react/lib/esm/components/Table/Table.js
var import_jsx_runtime83 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Table/TableBody.js
var import_jsx_runtime78 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Table/TableBodyContext.js
var import_react43 = __toESM(require_react());
var TableBodyContext = (0, import_react43.createContext)(void 0);
function useTableBodyContext() {
  const context = (0, import_react43.useContext)(TableBodyContext);
  if (!context) {
    throw new Error("useTableBodyContext should be used within the TableBodyContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Table/TableContext.js
var import_react44 = __toESM(require_react());
var TableContext = (0, import_react44.createContext)(void 0);
function useTableContext() {
  const context = (0, import_react44.useContext)(TableContext);
  if (!context) {
    throw new Error("useTableContext should be used within the TableContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Table/TableBody.js
var TableBody = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useTableContext();
  const theme2 = mergeDeep(rootTheme.body, customTheme);
  return (0, import_jsx_runtime78.jsx)(TableBodyContext.Provider, { value: { theme: theme2 }, children: (0, import_jsx_runtime78.jsx)("tbody", { className: twMerge(theme2.base, className), ...props, children }) });
};

// node_modules/flowbite-react/lib/esm/components/Table/TableCell.js
var import_jsx_runtime79 = __toESM(require_jsx_runtime());
var TableCell = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: bodyTheme } = useTableBodyContext();
  const theme2 = mergeDeep(bodyTheme.cell, customTheme);
  return (0, import_jsx_runtime79.jsx)("td", { className: twMerge(theme2.base, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Table/TableHead.js
var import_jsx_runtime80 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Table/TableHeadContext.js
var import_react45 = __toESM(require_react());
var TableHeadContext = (0, import_react45.createContext)(void 0);
function useTableHeadContext() {
  const context = (0, import_react45.useContext)(TableHeadContext);
  if (!context) {
    throw new Error("useTableHeadContext should be used within the TableHeadContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Table/TableHead.js
var TableHead = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useTableContext();
  const theme2 = mergeDeep(rootTheme.head, customTheme);
  return (0, import_jsx_runtime80.jsx)(TableHeadContext.Provider, { value: { theme: theme2 }, children: (0, import_jsx_runtime80.jsx)("thead", { className: twMerge(theme2.base, className), ...props, children: (0, import_jsx_runtime80.jsx)("tr", { children }) }) });
};

// node_modules/flowbite-react/lib/esm/components/Table/TableHeadCell.js
var import_jsx_runtime81 = __toESM(require_jsx_runtime());
var TableHeadCell = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: headTheme } = useTableHeadContext();
  const theme2 = mergeDeep(headTheme.cell, customTheme);
  return (0, import_jsx_runtime81.jsx)("th", { className: twMerge(theme2.base, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Table/TableRow.js
var import_jsx_runtime82 = __toESM(require_jsx_runtime());
var TableRow = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, hoverable, striped } = useTableContext();
  const theme2 = mergeDeep(rootTheme.row, customTheme);
  return (0, import_jsx_runtime82.jsx)("tr", { "data-testid": "table-row-element", className: twMerge(theme2.base, striped && theme2.striped, hoverable && theme2.hovered, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Table/Table.js
var TableComponent = ({ children, className, striped, hoverable, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().table, customTheme);
  return (0, import_jsx_runtime83.jsx)("div", { "data-testid": "table-element", className: twMerge(theme2.root.wrapper), children: (0, import_jsx_runtime83.jsxs)(TableContext.Provider, { value: { theme: theme2, striped, hoverable }, children: [(0, import_jsx_runtime83.jsx)("div", { className: twMerge(theme2.root.shadow, className) }), (0, import_jsx_runtime83.jsx)("table", { className: twMerge(theme2.root.base, className), ...props, children })] }) });
};
TableComponent.displayName = "Table";
TableHead.displayName = "Table.Head";
TableBody.displayName = "Table.Body";
TableRow.displayName = "Table.Row";
TableCell.displayName = "Table.Cell";
TableHeadCell.displayName = "Table.HeadCell";
var Table = Object.assign(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell
});

// node_modules/flowbite-react/lib/esm/components/Tabs/TabItem.js
var import_jsx_runtime84 = __toESM(require_jsx_runtime());
var TabItem = ({ children, className }) => (0, import_jsx_runtime84.jsx)("div", { className, children });
TabItem.displayName = "Tabs.Item";

// node_modules/flowbite-react/lib/esm/components/Tabs/Tabs.js
var import_jsx_runtime85 = __toESM(require_jsx_runtime());
var import_react46 = __toESM(require_react());
var TabsComponent = (0, import_react46.forwardRef)(({ children, className, onActiveTabChange, style = "default", theme: customTheme = {}, ...props }, ref) => {
  const theme2 = mergeDeep(getTheme().tabs, customTheme);
  const id = (0, import_react46.useId)();
  const tabs = (0, import_react46.useMemo)(() => import_react46.Children.map(import_react46.Children.toArray(children), ({ props: props2 }) => props2), [children]);
  const tabRefs = (0, import_react46.useRef)([]);
  const [activeTab, setActiveTab] = (0, import_react46.useState)(Math.max(0, tabs.findIndex((tab) => tab.active)));
  const [focusedTab, setFocusedTab] = (0, import_react46.useState)(-1);
  const setActiveTabWithCallback = (activeTab2) => {
    setActiveTab(activeTab2);
    if (onActiveTabChange)
      onActiveTabChange(activeTab2);
  };
  const handleClick = ({ target }) => {
    setActiveTabWithCallback(target);
    setFocusedTab(target);
  };
  const handleKeyboard = ({ event, target }) => {
    if (event.key === "ArrowLeft") {
      setFocusedTab(Math.max(0, focusedTab - 1));
    }
    if (event.key === "ArrowRight") {
      setFocusedTab(Math.min(tabs.length - 1, focusedTab + 1));
    }
    if (event.key === "Enter") {
      setActiveTabWithCallback(target);
      setFocusedTab(target);
    }
  };
  const tabItemStyle = theme2.tablist.tabitem.styles[style];
  const tabItemContainerStyle = theme2.tabitemcontainer.styles[style];
  (0, import_react46.useEffect)(() => {
    var _a;
    (_a = tabRefs.current[focusedTab]) == null ? void 0 : _a.focus();
  }, [focusedTab]);
  (0, import_react46.useImperativeHandle)(ref, () => ({
    setActiveTab: setActiveTabWithCallback
  }));
  return (0, import_jsx_runtime85.jsxs)("div", { className: twMerge(theme2.base, className), children: [(0, import_jsx_runtime85.jsx)("div", { "aria-label": "Tabs", role: "tablist", className: twMerge(theme2.tablist.base, theme2.tablist.styles[style], className), ...props, children: tabs.map((tab, index) => (0, import_jsx_runtime85.jsxs)("button", { type: "button", "aria-controls": `${id}-tabpanel-${index}`, "aria-selected": index === activeTab, className: twMerge(theme2.tablist.tabitem.base, tabItemStyle.base, index === activeTab && tabItemStyle.active.on, index !== activeTab && !tab.disabled && tabItemStyle.active.off), disabled: tab.disabled, id: `${id}-tab-${index}`, onClick: () => handleClick({ target: index }), onKeyDown: (event) => handleKeyboard({ event, target: index }), ref: (element) => tabRefs.current[index] = element, role: "tab", tabIndex: index === focusedTab ? 0 : -1, style: { zIndex: index === focusedTab ? 2 : 1 }, children: [tab.icon && (0, import_jsx_runtime85.jsx)(tab.icon, { className: theme2.tablist.tabitem.icon }), tab.title] }, index)) }), (0, import_jsx_runtime85.jsx)("div", { className: twMerge(theme2.tabitemcontainer.base, tabItemContainerStyle), children: tabs.map((tab, index) => (0, import_jsx_runtime85.jsx)("div", { "aria-labelledby": `${id}-tab-${index}`, className: theme2.tabpanel, hidden: index !== activeTab, id: `${id}-tabpanel-${index}`, role: "tabpanel", tabIndex: 0, children: tab.children }, index)) })] });
});
TabsComponent.displayName = "Tabs";
var Tabs = Object.assign(TabsComponent, {
  Item: TabItem
});

// node_modules/flowbite-react/lib/esm/components/Textarea/Textarea.js
var import_jsx_runtime86 = __toESM(require_jsx_runtime());
var import_react47 = __toESM(require_react());
var Textarea = (0, import_react47.forwardRef)(({ className, color = "gray", helperText, shadow, theme: customTheme = {}, ...props }, ref) => {
  const theme2 = mergeDeep(getTheme().textarea, customTheme);
  return (0, import_jsx_runtime86.jsxs)(import_jsx_runtime86.Fragment, { children: [(0, import_jsx_runtime86.jsx)("textarea", { ref, className: twMerge(theme2.base, theme2.colors[color], theme2.withShadow[shadow ? "on" : "off"], className), ...props }), helperText && (0, import_jsx_runtime86.jsx)(HelperText, { color, children: helperText })] });
});
Textarea.displayName = "Textarea";

// node_modules/flowbite-react/lib/esm/components/ThemeModeScript/ThemeModeScript.js
var import_jsx_runtime87 = __toESM(require_jsx_runtime());
var ThemeModeScript = ({ mode, ...others }) => {
  return (0, import_jsx_runtime87.jsx)("script", { ...others, "data-flowbite-theme-mode-script": true, dangerouslySetInnerHTML: {
    __html: getScript({ mode, defaultMode: "light", localStorageKey: "flowbite-theme-mode" })
  } });
};
function getScript({ mode, defaultMode, localStorageKey }) {
  return `
    try {
      const mode = window.localStorage.getItem('${localStorageKey}') ?? '${mode}' ?? '${defaultMode}';
      const computedMode =
        mode === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;

      if (computedMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  `;
}

// node_modules/flowbite-react/lib/esm/components/Timeline/Timeline.js
var import_jsx_runtime94 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineBody.js
var import_jsx_runtime88 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineContentContext.js
var import_react48 = __toESM(require_react());
var TimelineContentContext = (0, import_react48.createContext)(void 0);
function useTimelineContentContext() {
  const context = (0, import_react48.useContext)(TimelineContentContext);
  if (!context) {
    throw new Error("useTimelineContentContext should be used within the TimelineContentContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineBody.js
var TimelineBody = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: contentTheme } = useTimelineContentContext();
  const theme2 = mergeDeep(contentTheme.body, customTheme);
  return (0, import_jsx_runtime88.jsx)("div", { className: twMerge(theme2.base, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineContent.js
var import_jsx_runtime89 = __toESM(require_jsx_runtime());

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineContext.js
var import_react49 = __toESM(require_react());
var TimelineContext = (0, import_react49.createContext)(void 0);
function useTimelineContext() {
  const context = (0, import_react49.useContext)(TimelineContext);
  if (!context) {
    throw new Error("useTimelineContext should be used within the TimelineContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineItemContext.js
var import_react50 = __toESM(require_react());
var TimelineItemContext = (0, import_react50.createContext)(void 0);
function useTimelineItemContext() {
  const context = (0, import_react50.useContext)(TimelineItemContext);
  if (!context) {
    throw new Error("useTimelineItemContext should be used within the TimelineItemContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineContent.js
var TimelineContent = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { horizontal } = useTimelineContext();
  const { theme: itemTheme } = useTimelineItemContext();
  const theme2 = mergeDeep(itemTheme.content, customTheme);
  return (0, import_jsx_runtime89.jsx)(TimelineContentContext.Provider, { value: { theme: theme2 }, children: (0, import_jsx_runtime89.jsx)("div", { "data-testid": "timeline-content", className: twMerge(horizontal && theme2.root.base, className), ...props, children }) });
};

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineItem.js
var import_jsx_runtime90 = __toESM(require_jsx_runtime());
var TimelineItem = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme, horizontal } = useTimelineContext();
  const theme2 = mergeDeep(rootTheme.item, customTheme);
  return (0, import_jsx_runtime90.jsx)(TimelineItemContext.Provider, { value: { theme: theme2 }, children: (0, import_jsx_runtime90.jsx)("li", { "data-testid": "timeline-item", className: twMerge(horizontal && theme2.root.horizontal, !horizontal && theme2.root.vertical, className), ...props, children }) });
};

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelinePoint.js
var import_jsx_runtime91 = __toESM(require_jsx_runtime());
var TimelinePoint = ({ children, className, icon: Icon, theme: customTheme = {}, ...props }) => {
  const { horizontal } = useTimelineContext();
  const { theme: itemTheme } = useTimelineItemContext();
  const theme2 = mergeDeep(itemTheme.point, customTheme);
  return (0, import_jsx_runtime91.jsxs)("div", { "data-testid": "timeline-point", className: twMerge(horizontal && theme2.horizontal, !horizontal && theme2.vertical, className), ...props, children: [children, Icon ? (0, import_jsx_runtime91.jsx)("span", { className: twMerge(theme2.marker.icon.wrapper), children: (0, import_jsx_runtime91.jsx)(Icon, { "aria-hidden": true, className: twMerge(theme2.marker.icon.base) }) }) : (0, import_jsx_runtime91.jsx)("div", { className: twMerge(horizontal && theme2.marker.base.horizontal, !horizontal && theme2.marker.base.vertical) }), horizontal && (0, import_jsx_runtime91.jsx)("div", { className: twMerge(theme2.line) })] });
};

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineTime.js
var import_jsx_runtime92 = __toESM(require_jsx_runtime());
var TimelineTime = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: contentTheme } = useTimelineContentContext();
  const theme2 = mergeDeep(contentTheme.time, customTheme);
  return (0, import_jsx_runtime92.jsx)("time", { className: twMerge(theme2.base, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Timeline/TimelineTitle.js
var import_jsx_runtime93 = __toESM(require_jsx_runtime());
var TimelineTitle = ({ as: Tag = "h3", children, className, theme: customTheme = {}, ...props }) => {
  const { theme: contentTheme } = useTimelineContentContext();
  const theme2 = mergeDeep(contentTheme.title, customTheme);
  return (0, import_jsx_runtime93.jsx)(Tag, { className: twMerge(theme2.base, className), ...props, children });
};

// node_modules/flowbite-react/lib/esm/components/Timeline/Timeline.js
var TimelineComponent = ({ children, className, horizontal, theme: customTheme = {}, ...props }) => {
  const theme2 = mergeDeep(getTheme().timeline, customTheme);
  return (0, import_jsx_runtime94.jsx)(TimelineContext.Provider, { value: { theme: theme2, horizontal }, children: (0, import_jsx_runtime94.jsx)("ol", { "data-testid": "timeline-component", className: twMerge(horizontal && theme2.root.direction.horizontal, !horizontal && theme2.root.direction.vertical, className), ...props, children }) });
};
TimelineComponent.displayName = "Timeline";
TimelineItem.displayName = "Timeline.Item";
TimelinePoint.displayName = "Timeline.Point";
TimelineContent.displayName = "Timeline.Content";
TimelineTime.displayName = "Timeline.Time";
TimelineTitle.displayName = "Timeline.Title";
TimelineBody.displayName = "Timeline.Body";
var Timeline = Object.assign(TimelineComponent, {
  Item: TimelineItem,
  Point: TimelinePoint,
  Content: TimelineContent,
  Time: TimelineTime,
  Title: TimelineTitle,
  Body: TimelineBody
});

// node_modules/flowbite-react/lib/esm/components/Toast/Toast.js
var import_jsx_runtime96 = __toESM(require_jsx_runtime());
var import_react52 = __toESM(require_react());

// node_modules/flowbite-react/lib/esm/components/Toast/ToastContext.js
var import_react51 = __toESM(require_react());
var ToastContext = (0, import_react51.createContext)(void 0);
function useToastContext() {
  const context = (0, import_react51.useContext)(ToastContext);
  if (!context) {
    throw new Error("useToastContext should be used within the ToastContext provider!");
  }
  return context;
}

// node_modules/flowbite-react/lib/esm/components/Toast/ToastToggle.js
var import_jsx_runtime95 = __toESM(require_jsx_runtime());
var ToastToggle = ({ className, onClick, theme: customTheme = {}, xIcon: XIcon = HiX, onDismiss, ...props }) => {
  const { theme: rootTheme, duration, isClosed, isRemoved, setIsClosed, setIsRemoved } = useToastContext();
  const theme2 = mergeDeep(rootTheme.toggle, customTheme);
  const handleClick = (e2) => {
    if (onClick)
      onClick(e2);
    if (onDismiss) {
      onDismiss();
      return;
    }
    setIsClosed(!isClosed);
    setTimeout(() => setIsRemoved(!isRemoved), duration);
  };
  return (0, import_jsx_runtime95.jsx)("button", { "aria-label": "Close", onClick: handleClick, type: "button", className: twMerge(theme2.base, className), ...props, children: (0, import_jsx_runtime95.jsx)(XIcon, { "aria-hidden": true, className: theme2.icon }) });
};

// node_modules/flowbite-react/lib/esm/components/Toast/Toast.js
var durationClasses = {
  75: "duration-75",
  100: "duration-100",
  150: "duration-150",
  200: "duration-200",
  300: "duration-300",
  500: "duration-500",
  700: "duration-700",
  1e3: "duration-1000"
};
var ToastComponent = ({ children, className, duration = 300, theme: customTheme = {}, ...props }) => {
  const [isClosed, setIsClosed] = (0, import_react52.useState)(false);
  const [isRemoved, setIsRemoved] = (0, import_react52.useState)(false);
  const theme2 = mergeDeep(getTheme().toast, customTheme);
  if (isRemoved) {
    return null;
  }
  return (0, import_jsx_runtime96.jsx)(ToastContext.Provider, { value: { theme: theme2, duration, isClosed, isRemoved, setIsClosed, setIsRemoved }, children: (0, import_jsx_runtime96.jsx)("div", { "data-testid": "flowbite-toast", role: "alert", className: twMerge(theme2.root.base, durationClasses[duration], isClosed && theme2.root.closed, className), ...props, children }) });
};
ToastComponent.displayName = "Toast";
ToastToggle.displayName = "Toast.Toggle";
var Toast = Object.assign(ToastComponent, {
  Toggle: ToastToggle
});

// node_modules/flowbite-react/lib/esm/components/ToggleSwitch/ToggleSwitch.js
var import_jsx_runtime97 = __toESM(require_jsx_runtime());
var import_react53 = __toESM(require_react());
var ToggleSwitch = ({ checked, className, color = "blue", sizing = "md", disabled, label, name, onChange, theme: customTheme = {}, ...props }) => {
  const id = (0, import_react53.useId)();
  const theme2 = mergeDeep(getTheme().toggleSwitch, customTheme);
  const toggle = () => onChange(!checked);
  const handleClick = () => {
    toggle();
  };
  const handleOnKeyDown = (event) => {
    if (event.code == "Enter") {
      event.preventDefault();
    }
  };
  return (0, import_jsx_runtime97.jsxs)(import_jsx_runtime97.Fragment, { children: [name && checked ? (0, import_jsx_runtime97.jsx)("input", { checked, hidden: true, name, readOnly: true, type: "checkbox", className: "sr-only" }) : null, (0, import_jsx_runtime97.jsxs)("button", { "aria-checked": checked, "aria-labelledby": `${id}-flowbite-toggleswitch-label`, disabled, id: `${id}-flowbite-toggleswitch`, onClick: handleClick, onKeyDown: handleOnKeyDown, role: "switch", tabIndex: 0, type: "button", className: twMerge(theme2.root.base, theme2.root.active[disabled ? "off" : "on"], className), ...props, children: [(0, import_jsx_runtime97.jsx)("div", { "data-testid": "flowbite-toggleswitch-toggle", className: twMerge(theme2.toggle.base, theme2.toggle.checked[checked ? "on" : "off"], checked && theme2.toggle.checked.color[color], theme2.toggle.sizes[sizing]) }), (label == null ? void 0 : label.length) ? (0, import_jsx_runtime97.jsx)("span", { "data-testid": "flowbite-toggleswitch-label", id: `${id}-flowbite-toggleswitch-label`, className: theme2.root.label, children: label }) : null] })] });
};
ToggleSwitch.displayName = "ToggleSwitch";
export {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Alert,
  Avatar,
  AvatarGroup,
  AvatarGroupCounter,
  Badge,
  Banner,
  BannerCollapseButton,
  Blockquote,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Checkbox,
  DarkThemeToggle,
  Datepicker,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  FileInput,
  FloatingLabel,
  Flowbite,
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  HelperText,
  Kbd,
  Label,
  List,
  ListGroup,
  ListGroupItem,
  ListItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Pagination,
  PaginationButton,
  Progress,
  Radio,
  RangeSlider,
  Rating,
  RatingAdvanced,
  RatingStar,
  Select,
  Sidebar,
  SidebarCTA,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
  Spinner,
  TabItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tabs,
  TextInput,
  Textarea,
  ThemeModeScript,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
  Toast,
  ToastToggle,
  ToggleSwitch,
  Tooltip,
  WeekStart,
  getTheme,
  getThemeMode,
  theme,
  useThemeMode
};
/*! Bundled license information:

react-indiana-drag-scroll/dist/index.es.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
  (*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=flowbite-react.js.map
