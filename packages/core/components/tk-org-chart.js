import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { l as lodashExports } from './p-BVf-UonN.js';
import { g as getAugmentedNamespace } from './p-Dr0z5XX9.js';

var d3OrgChart_min$1 = { exports: {} };

var xhtml = 'http://www.w3.org/1999/xhtml';

var namespaces = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: xhtml,
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/',
};

function namespace(name) {
  var prefix = (name += ''),
    i = prefix.indexOf(':');
  if (i >= 0 && (prefix = name.slice(0, i)) !== 'xmlns') name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name; // eslint-disable-line no-prototype-builtins
}

function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
      uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

function none$2() {}

function selector(selector) {
  return selector == null
    ? none$2
    : function () {
        return this.querySelector(selector);
      };
}

function selection_select(select) {
  if (typeof select !== 'function') select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = (subgroups[j] = new Array(n)), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ('__data__' in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array$3(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

function empty$1() {
  return [];
}

function selectorAll(selector) {
  return selector == null
    ? empty$1
    : function () {
        return this.querySelectorAll(selector);
      };
}

function arrayAll(select) {
  return function () {
    return array$3(select.apply(this, arguments));
  };
}

function selection_selectAll(select) {
  if (typeof select === 'function') select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection$1(subgroups, parents);
}

function matcher(selector) {
  return function () {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function (node) {
    return node.matches(selector);
  };
}

var find = Array.prototype.find;

function childFind(match) {
  return function () {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

function selection_selectChild(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === 'function' ? match : childMatcher(match)));
}

var filter$1 = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function () {
    return filter$1.call(this.children, match);
  };
}

function selection_selectChildren(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === 'function' ? match : childMatcher(match)));
}

function selection_filter(match) {
  if (typeof match !== 'function') match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = (subgroups[j] = []), node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  },
};

function constant$5(x) {
  return function () {
    return x;
  };
}

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
    node,
    groupLength = group.length,
    dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if ((node = group[i])) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if ((node = group[i])) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
    node,
    nodeByKeyValue = new Map(),
    groupLength = group.length,
    dataLength = data.length,
    keyValues = new Array(groupLength),
    keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i])) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + '';
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + '';
    if ((node = nodeByKeyValue.get(keyValue))) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
    parents = this._parents,
    groups = this._groups;

  if (typeof value !== 'function') value = constant$5(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
      group = groups[j],
      groupLength = group.length,
      data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
      dataLength = data.length,
      enterGroup = (enter[j] = new Array(dataLength)),
      updateGroup = (update[j] = new Array(dataLength)),
      exitGroup = (exit[j] = new Array(groupLength));

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if ((previous = enterGroup[i0])) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === 'object' && 'length' in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(),
    update = this,
    exit = this.exit();
  if (typeof onenter === 'function') {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + '');
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = (merges[j] = new Array(n)), node, i = 0; i < n; ++i) {
      if ((node = group0[i] || group1[i])) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection$1(merges, this._parents);
}

function selection_order() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if ((node = group[i])) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending$2;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = (sortgroups[j] = new Array(n)), node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection$1(sortgroups, this._parents).order();
}

function ascending$2(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  return Array.from(this);
}

function selection_node() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if ((node = group[i])) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove$1(name) {
  return function () {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}

function attrConstantNS$1(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction$1(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS$1(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }

  return this.each(
    (value == null
      ? fullname.local
        ? attrRemoveNS$1
        : attrRemove$1
      : typeof value === 'function'
        ? fullname.local
          ? attrFunctionNS$1
          : attrFunction$1
        : fullname.local
          ? attrConstantNS$1
          : attrConstant$1)(fullname, value),
  );
}

function defaultView(node) {
  return (
    (node.ownerDocument && node.ownerDocument.defaultView) || // node is a Node
    (node.document && node) || // node is a Window
    node.defaultView
  ); // node is a Document
}

function styleRemove$1(name) {
  return function () {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction$1(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
    ? this.each((value == null ? styleRemove$1 : typeof value === 'function' ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? '' : priority))
    : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === 'function' ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute('class') || '');
}

ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute('class', this._names.join(' '));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute('class', this._names.join(' '));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  },
};

function classedAdd(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + '');

  if (arguments.length < 2) {
    var list = classList(this.node()),
      i = -1,
      n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === 'function' ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = '';
}

function textConstant$1(value) {
  return function () {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? '' : v;
  };
}

function selection_text(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === 'function' ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = '';
}

function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? '' : v;
  };
}

function selection_html(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === 'function' ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === 'function' ? name : creator(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === 'function' ? name : creator(name),
    select = before == null ? constantNull : typeof before === 'function' ? before : selector(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  var clone = this.cloneNode(false),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length ? this.property('__data__', value) : this.node().__data__;
}

function contextListener(listener) {
  return function (event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames$1(typenames) {
  return typenames
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var name = '',
        i = t.indexOf('.');
      if (i >= 0) ((name = t.slice(i + 1)), (t = t.slice(0, i)));
      return { type: t, name: name };
    });
}

function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (((o = on[j]), (!typename.type || o.type === typename.type) && o.name === typename.name)) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function () {
    var on = this.__on,
      o,
      listener = contextListener(value);
    if (on)
      for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, (o.listener = listener), (o.options = options));
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value: value, listener: listener, options: options };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, options) {
  var typenames = parseTypenames$1(typename + ''),
    i,
    n = typenames.length,
    t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
    event = window.CustomEvent;

  if (typeof event === 'function') {
    event = new event(type, params);
  } else {
    event = window.document.createEvent('Event');
    if (params) (event.initEvent(type, params.bubbles, params.cancelable), (event.detail = params.detail));
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === 'function' ? dispatchFunction : dispatchConstant)(type, params));
}

function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if ((node = group[i])) yield node;
    }
  }
}

var root = [null];

function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection$1([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator,
};

function select(selector) {
  return typeof selector === 'string' ? new Selection$1([[document.querySelector(selector)]], [document.documentElement]) : new Selection$1([[selector]], root);
}

function create$1(name) {
  return select(creator(name).call(document.documentElement));
}

var nextId = 0;

function local() {
  return new Local();
}

function Local() {
  this._ = '@' + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function (node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function (node, value) {
    return (node[this._] = value);
  },
  remove: function (node) {
    return this._ in node && delete node[this._];
  },
  toString: function () {
    return this._;
  },
};

function sourceEvent(event) {
  let sourceEvent;
  while ((sourceEvent = event.sourceEvent)) event = sourceEvent;
  return event;
}

function pointer(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      ((point.x = event.clientX), (point.y = event.clientY));
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

function pointers(events, node) {
  if (events.target) {
    // i.e., instanceof Event, not TouchList or iterable
    events = sourceEvent(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, event => pointer(event, node));
}

function selectAll(selector) {
  return typeof selector === 'string' ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement]) : new Selection$1([array$3(selector)], root);
}

var src$4 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  create: create$1,
  creator: creator,
  local: local,
  matcher: matcher,
  namespace: namespace,
  namespaces: namespaces,
  pointer: pointer,
  pointers: pointers,
  select: select,
  selectAll: selectAll,
  selection: selection,
  selector: selector,
  selectorAll: selectorAll,
  style: styleValue,
  window: defaultView,
});

var require$$0 = /*@__PURE__*/ getAugmentedNamespace(src$4);

function ascending$1(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending$2(a, b) {
  return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending$1;
    compare2 = (d, x) => ascending$1(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending$1 || f === descending$2 ? f : zero$1;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return { left, center, right };
}

function zero$1() {
  return 0;
}

function number(x) {
  return x === null ? NaN : +x;
}

function* numbers(values, valueof) {
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}

const ascendingBisect = bisector(ascending$1);
const bisectRight = ascendingBisect.right;
const bisectLeft = ascendingBisect.left;
const bisectCenter = bisector(number).center;

function blur(values, r) {
  if (!((r = +r) >= 0)) throw new RangeError('invalid r');
  let length = values.length;
  if (!((length = Math.floor(length)) >= 0)) throw new RangeError('invalid length');
  if (!length || !r) return values;
  const blur = blurf(r);
  const temp = values.slice();
  blur(values, temp, 0, length, 1);
  blur(temp, values, 0, length, 1);
  blur(values, temp, 0, length, 1);
  return values;
}

const blur2 = Blur2(blurf);

const blurImage = Blur2(blurfImage);

function Blur2(blur) {
  return function (data, rx, ry = rx) {
    if (!((rx = +rx) >= 0)) throw new RangeError('invalid rx');
    if (!((ry = +ry) >= 0)) throw new RangeError('invalid ry');
    let { data: values, width, height } = data;
    if (!((width = Math.floor(width)) >= 0)) throw new RangeError('invalid width');
    if (!((height = Math.floor(height !== undefined ? height : values.length / width)) >= 0)) throw new RangeError('invalid height');
    if (!width || !height || (!rx && !ry)) return data;
    const blurx = rx && blur(rx);
    const blury = ry && blur(ry);
    const temp = values.slice();
    if (blurx && blury) {
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    } else if (blurx) {
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
    } else if (blury) {
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    }
    return data;
  };
}

function blurh(blur, T, S, w, h) {
  for (let y = 0, n = w * h; y < n; ) {
    blur(T, S, y, (y += w), 1);
  }
}

function blurv(blur, T, S, w, h) {
  for (let x = 0, n = w * h; x < w; ++x) {
    blur(T, S, x, x + n, w);
  }
}

function blurfImage(radius) {
  const blur = blurf(radius);
  return (T, S, start, stop, step) => {
    ((start <<= 2), (stop <<= 2), (step <<= 2));
    blur(T, S, start + 0, stop + 0, step);
    blur(T, S, start + 1, stop + 1, step);
    blur(T, S, start + 2, stop + 2, step);
    blur(T, S, start + 3, stop + 3, step);
  };
}

// Given a target array T, a source array S, sets each value T[i] to the average
// of {S[i - r], …, S[i], …, S[i + r]}, where r = ⌊radius⌋, start <= i < stop,
// for each i, i + step, i + 2 * step, etc., and where S[j] is clamped between
// S[start] (inclusive) and S[stop] (exclusive). If the given radius is not an
// integer, S[i - r - 1] and S[i + r + 1] are added to the sum, each weighted
// according to r - ⌊radius⌋.
function blurf(radius) {
  const radius0 = Math.floor(radius);
  if (radius0 === radius) return bluri(radius);
  const t = radius - radius0;
  const w = 2 * radius + 1;
  return (T, S, start, stop, step) => {
    // stop must be aligned!
    if (!((stop -= step) >= start)) return; // inclusive stop
    let sum = radius0 * S[start];
    const s0 = step * radius0;
    const s1 = s0 + step;
    for (let i = start, j = start + s0; i < j; i += step) {
      sum += S[Math.min(stop, i)];
    }
    for (let i = start, j = stop; i <= j; i += step) {
      sum += S[Math.min(stop, i + s0)];
      T[i] = (sum + t * (S[Math.max(start, i - s1)] + S[Math.min(stop, i + s1)])) / w;
      sum -= S[Math.max(start, i - s0)];
    }
  };
}

// Like blurf, but optimized for integer radius.
function bluri(radius) {
  const w = 2 * radius + 1;
  return (T, S, start, stop, step) => {
    // stop must be aligned!
    if (!((stop -= step) >= start)) return; // inclusive stop
    let sum = radius * S[start];
    const s = step * radius;
    for (let i = start, j = start + s; i < j; i += step) {
      sum += S[Math.min(stop, i)];
    }
    for (let i = start, j = stop; i <= j; i += step) {
      sum += S[Math.min(stop, i + s)];
      T[i] = sum / w;
      sum -= S[Math.max(start, i - s)];
    }
  };
}

function count$1(values, valueof) {
  let count = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count;
      }
    }
  }
  return count;
}

function length$1(array) {
  return array.length | 0;
}

function empty(length) {
  return !(length > 0);
}

function arrayify(values) {
  return typeof values !== 'object' || 'length' in values ? values : Array.from(values);
}

function reducer(reduce) {
  return values => reduce(...values);
}

function cross$1(...values) {
  const reduce = typeof values[values.length - 1] === 'function' && reducer(values.pop());
  values = values.map(arrayify);
  const lengths = values.map(length$1);
  const j = values.length - 1;
  const index = new Array(j + 1).fill(0);
  const product = [];
  if (j < 0 || lengths.some(empty)) return product;
  while (true) {
    product.push(index.map((j, i) => values[i][j]));
    let i = j;
    while (++index[i] === lengths[i]) {
      if (i === 0) return reduce ? product.map(reduce) : product;
      index[i--] = 0;
    }
  }
}

function cumsum(values, valueof) {
  var sum = 0,
    index = 0;
  return Float64Array.from(values, valueof === undefined ? v => (sum += +v || 0) : v => (sum += +valueof(v, index++, values) || 0));
}

function variance(values, valueof) {
  let count = 0;
  let delta;
  let mean = 0;
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  }
  if (count > 1) return sum / (count - 1);
}

function deviation(values, valueof) {
  const v = variance(values, valueof);
  return v ? Math.sqrt(v) : v;
}

function extent(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}

// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
class Adder {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x) {
    const p = this._partials;
    let i = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y = p[j],
        hi = x + y,
        lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
      if (lo) p[i++] = lo;
      x = hi;
    }
    p[i] = x;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n,
      x,
      y,
      lo,
      hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x = hi;
        y = p[--n];
        hi = x + y;
        lo = y - (hi - x);
        if (lo) break;
      }
      if (n > 0 && ((lo < 0 && p[n - 1] < 0) || (lo > 0 && p[n - 1] > 0))) {
        y = lo * 2;
        x = hi + y;
        if (y == x - hi) hi = x;
      }
    }
    return hi;
  }
}

function fsum(values, valueof) {
  const adder = new Adder();
  if (valueof === undefined) {
    for (let value of values) {
      if ((value = +value)) {
        adder.add(value);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = +valueof(value, ++index, values))) {
        adder.add(value);
      }
    }
  }
  return +adder;
}

function fcumsum(values, valueof) {
  const adder = new Adder();
  let index = -1;
  return Float64Array.from(values, valueof === undefined ? v => adder.add(+v || 0) : v => adder.add(+valueof(v, ++index, values) || 0));
}

class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: new Map() }, _key: { value: key } });
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}

class InternSet extends Set {
  constructor(values, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: new Map() }, _key: { value: key } });
    if (values != null) for (const value of values) this.add(value);
  }
  has(value) {
    return super.has(intern_get(this, value));
  }
  add(value) {
    return super.add(intern_set(this, value));
  }
  delete(value) {
    return super.delete(intern_delete(this, value));
  }
}

function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  return value !== null && typeof value === 'object' ? value.valueOf() : value;
}

function identity$3(x) {
  return x;
}

function group(values, ...keys) {
  return nest(values, identity$3, identity$3, keys);
}

function groups(values, ...keys) {
  return nest(values, Array.from, identity$3, keys);
}

function flatten$1(groups, keys) {
  for (let i = 1, n = keys.length; i < n; ++i) {
    groups = groups.flatMap(g => g.pop().map(([key, value]) => [...g, key, value]));
  }
  return groups;
}

function flatGroup(values, ...keys) {
  return flatten$1(groups(values, ...keys), keys);
}

function flatRollup(values, reduce, ...keys) {
  return flatten$1(rollups(values, reduce, ...keys), keys);
}

function rollup(values, reduce, ...keys) {
  return nest(values, identity$3, reduce, keys);
}

function rollups(values, reduce, ...keys) {
  return nest(values, Array.from, reduce, keys);
}

function index$2(values, ...keys) {
  return nest(values, identity$3, unique, keys);
}

function indexes(values, ...keys) {
  return nest(values, Array.from, unique, keys);
}

function unique(values) {
  if (values.length !== 1) throw new Error('duplicate key');
  return values[0];
}

function nest(values, map, reduce, keys) {
  return (function regroup(values, i) {
    if (i >= keys.length) return reduce(values);
    const groups = new InternMap();
    const keyof = keys[i++];
    let index = -1;
    for (const value of values) {
      const key = keyof(value, ++index, values);
      const group = groups.get(key);
      if (group) group.push(value);
      else groups.set(key, [value]);
    }
    for (const [key, values] of groups) {
      groups.set(key, regroup(values, i));
    }
    return map(groups);
  })(values, 0);
}

function permute(source, keys) {
  return Array.from(keys, key => source[key]);
}

function sort(values, ...F) {
  if (typeof values[Symbol.iterator] !== 'function') throw new TypeError('values is not iterable');
  values = Array.from(values);
  let [f] = F;
  if ((f && f.length !== 2) || F.length > 1) {
    const index = Uint32Array.from(values, (d, i) => i);
    if (F.length > 1) {
      F = F.map(f => values.map(f));
      index.sort((i, j) => {
        for (const f of F) {
          const c = ascendingDefined(f[i], f[j]);
          if (c) return c;
        }
      });
    } else {
      f = values.map(f);
      index.sort((i, j) => ascendingDefined(f[i], f[j]));
    }
    return permute(values, index);
  }
  return values.sort(compareDefined(f));
}

function compareDefined(compare = ascending$1) {
  if (compare === ascending$1) return ascendingDefined;
  if (typeof compare !== 'function') throw new TypeError('compare is not a function');
  return (a, b) => {
    const x = compare(a, b);
    if (x || x === 0) return x;
    return (compare(b, b) === 0) - (compare(a, a) === 0);
  };
}

function ascendingDefined(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b)) || (a < b ? -1 : a > b ? 1 : 0);
}

function groupSort(values, reduce, key) {
  return (
    reduce.length !== 2
      ? sort(rollup(values, reduce, key), ([ak, av], [bk, bv]) => ascending$1(av, bv) || ascending$1(ak, bk))
      : sort(group(values, key), ([ak, av], [bk, bv]) => reduce(av, bv) || ascending$1(ak, bk))
  ).map(([key]) => key);
}

var array$2 = Array.prototype;

var slice$1 = array$2.slice;

function constant$4(x) {
  return () => x;
}

const e10 = Math.sqrt(50),
  e5 = Math.sqrt(10),
  e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
    power = Math.floor(Math.log10(step)),
    error = step / Math.pow(10, power),
    factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

function ticks(start, stop, count) {
  ((stop = +stop), (start = +start), (count = +count));
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start,
    [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1,
    ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

function tickIncrement(start, stop, count) {
  ((stop = +stop), (start = +start), (count = +count));
  return tickSpec(start, stop, count)[2];
}

function tickStep(start, stop, count) {
  ((stop = +stop), (start = +start), (count = +count));
  const reverse = stop < start,
    inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

function nice(start, stop, count) {
  let prestep;
  while (true) {
    const step = tickIncrement(start, stop, count);
    if (step === prestep || step === 0 || !isFinite(step)) {
      return [start, stop];
    } else if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
    }
    prestep = step;
  }
}

function thresholdSturges(values) {
  return Math.max(1, Math.ceil(Math.log(count$1(values)) / Math.LN2) + 1);
}

function bin() {
  var value = identity$3,
    domain = extent,
    threshold = thresholdSturges;

  function histogram(data) {
    if (!Array.isArray(data)) data = Array.from(data);

    var i,
      n = data.length,
      x,
      step,
      values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
      x0 = xz[0],
      x1 = xz[1],
      tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds, and nice the
    // default domain accordingly.
    if (!Array.isArray(tz)) {
      const max = x1,
        tn = +tz;
      if (domain === extent) [x0, x1] = nice(x0, x1, tn);
      tz = ticks(x0, x1, tn);

      // If the domain is aligned with the first tick (which it will by
      // default), then we can use quantization rather than bisection to bin
      // values, which is substantially faster.
      if (tz[0] <= x0) step = tickIncrement(x0, x1, tn);

      // If the last threshold is coincident with the domain’s upper bound, the
      // last bin will be zero-width. If the default domain is used, and this
      // last threshold is coincident with the maximum input value, we can
      // extend the niced upper bound by one tick to ensure uniform bin widths;
      // otherwise, we simply remove the last threshold. Note that we don’t
      // coerce values or the domain to numbers, and thus must be careful to
      // compare order (>=) rather than strict equality (===)!
      if (tz[tz.length - 1] >= x1) {
        if (max >= x1 && domain === extent) {
          const step = tickIncrement(x0, x1, tn);
          if (isFinite(step)) {
            if (step > 0) {
              x1 = (Math.floor(x1 / step) + 1) * step;
            } else if (step < 0) {
              x1 = (Math.ceil(x1 * -step) + 1) / -step;
            }
          }
        } else {
          tz.pop();
        }
      }
    }

    // Remove any thresholds outside the domain.
    // Be careful not to mutate an array owned by the user!
    var m = tz.length,
      a = 0,
      b = m;
    while (tz[a] <= x0) ++a;
    while (tz[b - 1] > x1) --b;
    if (a || b < m) ((tz = tz.slice(a, b)), (m = b - a));

    var bins = new Array(m + 1),
      bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    if (isFinite(step)) {
      if (step > 0) {
        for (i = 0; i < n; ++i) {
          if ((x = values[i]) != null && x0 <= x && x <= x1) {
            bins[Math.min(m, Math.floor((x - x0) / step))].push(data[i]);
          }
        }
      } else if (step < 0) {
        for (i = 0; i < n; ++i) {
          if ((x = values[i]) != null && x0 <= x && x <= x1) {
            const j = Math.floor((x0 - x) * step);
            bins[Math.min(m, j + (tz[j] <= x))].push(data[i]); // handle off-by-one due to rounding
          }
        }
      }
    } else {
      for (i = 0; i < n; ++i) {
        if ((x = values[i]) != null && x0 <= x && x <= x1) {
          bins[bisectRight(tz, x, 0, m)].push(data[i]);
        }
      }
    }

    return bins;
  }

  histogram.value = function (_) {
    return arguments.length ? ((value = typeof _ === 'function' ? _ : constant$4(_)), histogram) : value;
  };

  histogram.domain = function (_) {
    return arguments.length ? ((domain = typeof _ === 'function' ? _ : constant$4([_[0], _[1]])), histogram) : domain;
  };

  histogram.thresholds = function (_) {
    return arguments.length ? ((threshold = typeof _ === 'function' ? _ : constant$4(Array.isArray(_) ? slice$1.call(_) : _)), histogram) : threshold;
  };

  return histogram;
}

function max$1(values, valueof) {
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}

function maxIndex(values, valueof) {
  let max;
  let maxIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (value != null && (max < value || (max === undefined && value >= value))) {
        ((max = value), (maxIndex = index));
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (max < value || (max === undefined && value >= value))) {
        ((max = value), (maxIndex = index));
      }
    }
  }
  return maxIndex;
}

function min$1(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}

function minIndex(values, valueof) {
  let min;
  let minIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (value != null && (min > value || (min === undefined && value >= value))) {
        ((min = value), (minIndex = index));
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (min > value || (min === undefined && value >= value))) {
        ((min = value), (minIndex = index));
      }
    }
  }
  return minIndex;
}

// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect(array, k, left = 0, right = Infinity, compare) {
  k = Math.floor(k);
  left = Math.floor(Math.max(0, left));
  right = Math.floor(Math.min(array.length - 1, right));

  if (!(left <= k && k <= right)) return array;

  compare = compare === undefined ? ascendingDefined : compareDefined(compare);

  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp((2 * z) / 3);
      const sd = 0.5 * Math.sqrt((z * s * (n - s)) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - (m * s) / n + sd));
      const newRight = Math.min(right, Math.floor(k + ((n - m) * s) / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }

    const t = array[k];
    let i = left;
    let j = right;

    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);

    while (i < j) {
      (swap(array, i, j), ++i, --j);
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }

    if (compare(array[left], t) === 0) swap(array, left, j);
    else (++j, swap(array, j, right));

    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }

  return array;
}

function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}

function greatest(values, compare = ascending$1) {
  let max;
  let defined = false;
  if (compare.length === 1) {
    let maxValue;
    for (const element of values) {
      const value = compare(element);
      if (defined ? ascending$1(value, maxValue) > 0 : ascending$1(value, value) === 0) {
        max = element;
        maxValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined ? compare(value, max) > 0 : compare(value, value) === 0) {
        max = value;
        defined = true;
      }
    }
  }
  return max;
}

function quantile(values, p, valueof) {
  values = Float64Array.from(numbers(values, valueof));
  if (!(n = values.length) || isNaN((p = +p))) return;
  if (p <= 0 || n < 2) return min$1(values);
  if (p >= 1) return max$1(values);
  var n,
    i = (n - 1) * p,
    i0 = Math.floor(i),
    value0 = max$1(quickselect(values, i0).subarray(0, i0 + 1)),
    value1 = min$1(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

function quantileSorted(values, p, valueof = number) {
  if (!(n = values.length) || isNaN((p = +p))) return;
  if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
    i = (n - 1) * p,
    i0 = Math.floor(i),
    value0 = +valueof(values[i0], i0, values),
    value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

function quantileIndex(values, p, valueof = number) {
  if (isNaN((p = +p))) return;
  numbers = Float64Array.from(values, (_, i) => number(valueof(values[i], i, values)));
  if (p <= 0) return minIndex(numbers);
  if (p >= 1) return maxIndex(numbers);
  var numbers,
    index = Uint32Array.from(values, (_, i) => i),
    j = numbers.length - 1,
    i = Math.floor(j * p);
  quickselect(index, i, 0, j, (i, j) => ascendingDefined(numbers[i], numbers[j]));
  i = greatest(index.subarray(0, i + 1), i => numbers[i]);
  return i >= 0 ? i : -1;
}

function thresholdFreedmanDiaconis(values, min, max) {
  const c = count$1(values),
    d = quantile(values, 0.75) - quantile(values, 0.25);
  return c && d ? Math.ceil((max - min) / (2 * d * Math.pow(c, -1 / 3))) : 1;
}

function thresholdScott(values, min, max) {
  const c = count$1(values),
    d = deviation(values);
  return c && d ? Math.ceil(((max - min) * Math.cbrt(c)) / (3.49 * d)) : 1;
}

function mean(values, valueof) {
  let count = 0;
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        (++count, (sum += value));
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        (++count, (sum += value));
      }
    }
  }
  if (count) return sum / count;
}

function median(values, valueof) {
  return quantile(values, 0.5, valueof);
}

function medianIndex(values, valueof) {
  return quantileIndex(values, 0.5, valueof);
}

function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

function merge(arrays) {
  return Array.from(flatten(arrays));
}

function mode(values, valueof) {
  const counts = new InternMap();
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && value >= value) {
        counts.set(value, (counts.get(value) || 0) + 1);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && value >= value) {
        counts.set(value, (counts.get(value) || 0) + 1);
      }
    }
  }
  let modeValue;
  let modeCount = 0;
  for (const [value, count] of counts) {
    if (count > modeCount) {
      modeCount = count;
      modeValue = value;
    }
  }
  return modeValue;
}

function pairs(values, pairof = pair) {
  const pairs = [];
  let previous;
  let first = false;
  for (const value of values) {
    if (first) pairs.push(pairof(previous, value));
    previous = value;
    first = true;
  }
  return pairs;
}

function pair(a, b) {
  return [a, b];
}

function range(start, stop, step) {
  ((start = +start), (stop = +stop), (step = (n = arguments.length) < 2 ? ((stop = start), (start = 0), 1) : n < 3 ? 1 : +step));

  var i = -1,
    n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
    range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

function rank(values, valueof = ascending$1) {
  if (typeof values[Symbol.iterator] !== 'function') throw new TypeError('values is not iterable');
  let V = Array.from(values);
  const R = new Float64Array(V.length);
  if (valueof.length !== 2) ((V = V.map(valueof)), (valueof = ascending$1));
  const compareIndex = (i, j) => valueof(V[i], V[j]);
  let k, r;
  values = Uint32Array.from(V, (_, i) => i);
  // Risky chaining due to Safari 14 https://github.com/d3/d3-array/issues/123
  values.sort(valueof === ascending$1 ? (i, j) => ascendingDefined(V[i], V[j]) : compareDefined(compareIndex));
  values.forEach((j, i) => {
    const c = compareIndex(j, k === undefined ? j : k);
    if (c >= 0) {
      if (k === undefined || c > 0) ((k = j), (r = i));
      R[j] = r;
    } else {
      R[j] = NaN;
    }
  });
  return R;
}

function least(values, compare = ascending$1) {
  let min;
  let defined = false;
  if (compare.length === 1) {
    let minValue;
    for (const element of values) {
      const value = compare(element);
      if (defined ? ascending$1(value, minValue) < 0 : ascending$1(value, value) === 0) {
        min = element;
        minValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined ? compare(value, min) < 0 : compare(value, value) === 0) {
        min = value;
        defined = true;
      }
    }
  }
  return min;
}

function leastIndex(values, compare = ascending$1) {
  if (compare.length === 1) return minIndex(values, compare);
  let minValue;
  let min = -1;
  let index = -1;
  for (const value of values) {
    ++index;
    if (min < 0 ? compare(value, value) === 0 : compare(value, minValue) < 0) {
      minValue = value;
      min = index;
    }
  }
  return min;
}

function greatestIndex(values, compare = ascending$1) {
  if (compare.length === 1) return maxIndex(values, compare);
  let maxValue;
  let max = -1;
  let index = -1;
  for (const value of values) {
    ++index;
    if (max < 0 ? compare(value, value) === 0 : compare(value, maxValue) > 0) {
      maxValue = value;
      max = index;
    }
  }
  return max;
}

function scan(values, compare) {
  const index = leastIndex(values, compare);
  return index < 0 ? undefined : index;
}

var shuffle$1 = shuffler(Math.random);

function shuffler(random) {
  return function shuffle(array, i0 = 0, i1 = array.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = (random() * m--) | 0,
        t = array[m + i0];
      array[m + i0] = array[i + i0];
      array[i + i0] = t;
    }
    return array;
  };
}

function sum$1(values, valueof) {
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if ((value = +value)) {
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = +valueof(value, ++index, values))) {
        sum += value;
      }
    }
  }
  return sum;
}

function transpose(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min$1(matrix, length), transpose = new Array(m); ++i < m; ) {
    for (var j = -1, n, row = (transpose[i] = new Array(n)); ++j < n; ) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
}

function length(d) {
  return d.length;
}

function zip() {
  return transpose(arguments);
}

function every(values, test) {
  if (typeof test !== 'function') throw new TypeError('test is not a function');
  let index = -1;
  for (const value of values) {
    if (!test(value, ++index, values)) {
      return false;
    }
  }
  return true;
}

function some(values, test) {
  if (typeof test !== 'function') throw new TypeError('test is not a function');
  let index = -1;
  for (const value of values) {
    if (test(value, ++index, values)) {
      return true;
    }
  }
  return false;
}

function filter(values, test) {
  if (typeof test !== 'function') throw new TypeError('test is not a function');
  const array = [];
  let index = -1;
  for (const value of values) {
    if (test(value, ++index, values)) {
      array.push(value);
    }
  }
  return array;
}

function map(values, mapper) {
  if (typeof values[Symbol.iterator] !== 'function') throw new TypeError('values is not iterable');
  if (typeof mapper !== 'function') throw new TypeError('mapper is not a function');
  return Array.from(values, (value, index) => mapper(value, index, values));
}

function reduce(values, reducer, value) {
  if (typeof reducer !== 'function') throw new TypeError('reducer is not a function');
  const iterator = values[Symbol.iterator]();
  let done,
    next,
    index = -1;
  if (arguments.length < 3) {
    ({ done, value } = iterator.next());
    if (done) return;
    ++index;
  }
  while ((({ done, value: next } = iterator.next()), !done)) {
    value = reducer(value, next, ++index, values);
  }
  return value;
}

function reverse$1(values) {
  if (typeof values[Symbol.iterator] !== 'function') throw new TypeError('values is not iterable');
  return Array.from(values).reverse();
}

function difference(values, ...others) {
  values = new InternSet(values);
  for (const other of others) {
    for (const value of other) {
      values.delete(value);
    }
  }
  return values;
}

function disjoint(values, other) {
  const iterator = other[Symbol.iterator](),
    set = new InternSet();
  for (const v of values) {
    if (set.has(v)) return false;
    let value, done;
    while (({ value, done } = iterator.next())) {
      if (done) break;
      if (Object.is(v, value)) return false;
      set.add(value);
    }
  }
  return true;
}

function intersection(values, ...others) {
  values = new InternSet(values);
  others = others.map(set$2);
  out: for (const value of values) {
    for (const other of others) {
      if (!other.has(value)) {
        values.delete(value);
        continue out;
      }
    }
  }
  return values;
}

function set$2(values) {
  return values instanceof InternSet ? values : new InternSet(values);
}

function superset(values, other) {
  const iterator = values[Symbol.iterator](),
    set = new Set();
  for (const o of other) {
    const io = intern(o);
    if (set.has(io)) continue;
    let value, done;
    while (({ value, done } = iterator.next())) {
      if (done) return false;
      const ivalue = intern(value);
      set.add(ivalue);
      if (Object.is(io, ivalue)) break;
    }
  }
  return true;
}

function intern(value) {
  return value !== null && typeof value === 'object' ? value.valueOf() : value;
}

function subset(values, other) {
  return superset(other, values);
}

function union(...others) {
  const set = new InternSet();
  for (const other of others) {
    for (const o of other) {
      set.add(o);
    }
  }
  return set;
}

var src$3 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  Adder: Adder,
  InternMap: InternMap,
  InternSet: InternSet,
  ascending: ascending$1,
  bin: bin,
  bisect: bisectRight,
  bisectCenter: bisectCenter,
  bisectLeft: bisectLeft,
  bisectRight: bisectRight,
  bisector: bisector,
  blur: blur,
  blur2: blur2,
  blurImage: blurImage,
  count: count$1,
  cross: cross$1,
  cumsum: cumsum,
  descending: descending$2,
  deviation: deviation,
  difference: difference,
  disjoint: disjoint,
  every: every,
  extent: extent,
  fcumsum: fcumsum,
  filter: filter,
  flatGroup: flatGroup,
  flatRollup: flatRollup,
  fsum: fsum,
  greatest: greatest,
  greatestIndex: greatestIndex,
  group: group,
  groupSort: groupSort,
  groups: groups,
  histogram: bin,
  index: index$2,
  indexes: indexes,
  intersection: intersection,
  least: least,
  leastIndex: leastIndex,
  map: map,
  max: max$1,
  maxIndex: maxIndex,
  mean: mean,
  median: median,
  medianIndex: medianIndex,
  merge: merge,
  min: min$1,
  minIndex: minIndex,
  mode: mode,
  nice: nice,
  pairs: pairs,
  permute: permute,
  quantile: quantile,
  quantileIndex: quantileIndex,
  quantileSorted: quantileSorted,
  quickselect: quickselect,
  range: range,
  rank: rank,
  reduce: reduce,
  reverse: reverse$1,
  rollup: rollup,
  rollups: rollups,
  scan: scan,
  shuffle: shuffle$1,
  shuffler: shuffler,
  some: some,
  sort: sort,
  subset: subset,
  sum: sum$1,
  superset: superset,
  thresholdFreedmanDiaconis: thresholdFreedmanDiaconis,
  thresholdScott: thresholdScott,
  thresholdSturges: thresholdSturges,
  tickIncrement: tickIncrement,
  tickStep: tickStep,
  ticks: ticks,
  transpose: transpose,
  union: union,
  variance: variance,
  zip: zip,
});

var require$$1 = /*@__PURE__*/ getAugmentedNamespace(src$3);

function defaultSeparation$1(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

function meanX(children) {
  return children.reduce(meanXReduce, 0) / children.length;
}

function meanXReduce(x, c) {
  return x + c.x;
}

function maxY(children) {
  return 1 + children.reduce(maxYReduce, 0);
}

function maxYReduce(y, c) {
  return Math.max(y, c.y);
}

function leafLeft(node) {
  var children;
  while ((children = node.children)) node = children[0];
  return node;
}

function leafRight(node) {
  var children;
  while ((children = node.children)) node = children[children.length - 1];
  return node;
}

function cluster() {
  var separation = defaultSeparation$1,
    dx = 1,
    dy = 1,
    nodeSize = false;

  function cluster(root) {
    var previousNode,
      x = 0;

    // First walk, computing the initial x & y values.
    root.eachAfter(function (node) {
      var children = node.children;
      if (children) {
        node.x = meanX(children);
        node.y = maxY(children);
      } else {
        node.x = previousNode ? (x += separation(node, previousNode)) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    var left = leafLeft(root),
      right = leafRight(root),
      x0 = left.x - separation(left, right) / 2,
      x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    return root.eachAfter(
      nodeSize
        ? function (node) {
            node.x = (node.x - root.x) * dx;
            node.y = (root.y - node.y) * dy;
          }
        : function (node) {
            node.x = ((node.x - x0) / (x1 - x0)) * dx;
            node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
          },
    );
  }

  cluster.separation = function (x) {
    return arguments.length ? ((separation = x), cluster) : separation;
  };

  cluster.size = function (x) {
    return arguments.length ? ((nodeSize = false), (dx = +x[0]), (dy = +x[1]), cluster) : nodeSize ? null : [dx, dy];
  };

  cluster.nodeSize = function (x) {
    return arguments.length ? ((nodeSize = true), (dx = +x[0]), (dy = +x[1]), cluster) : nodeSize ? [dx, dy] : null;
  };

  return cluster;
}

function count(node) {
  var sum = 0,
    children = node.children,
    i = children && children.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children[i].value;
  node.value = sum;
}

function node_count() {
  return this.eachAfter(count);
}

function node_each(callback, that) {
  let index = -1;
  for (const node of this) {
    callback.call(that, node, ++index, this);
  }
  return this;
}

function node_eachBefore(callback, that) {
  var node = this,
    nodes = [node],
    children,
    i,
    index = -1;
  while ((node = nodes.pop())) {
    callback.call(that, node, ++index, this);
    if ((children = node.children)) {
      for (i = children.length - 1; i >= 0; --i) {
        nodes.push(children[i]);
      }
    }
  }
  return this;
}

function node_eachAfter(callback, that) {
  var node = this,
    nodes = [node],
    next = [],
    children,
    i,
    n,
    index = -1;
  while ((node = nodes.pop())) {
    next.push(node);
    if ((children = node.children)) {
      for (i = 0, n = children.length; i < n; ++i) {
        nodes.push(children[i]);
      }
    }
  }
  while ((node = next.pop())) {
    callback.call(that, node, ++index, this);
  }
  return this;
}

function node_find(callback, that) {
  let index = -1;
  for (const node of this) {
    if (callback.call(that, node, ++index, this)) {
      return node;
    }
  }
}

function node_sum(value) {
  return this.eachAfter(function (node) {
    var sum = +value(node.data) || 0,
      children = node.children,
      i = children && children.length;
    while (--i >= 0) sum += children[i].value;
    node.value = sum;
  });
}

function node_sort(compare) {
  return this.eachBefore(function (node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}

function node_path(end) {
  var start = this,
    ancestor = leastCommonAncestor(start, end),
    nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}

function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(),
    bNodes = b.ancestors(),
    c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}

function node_ancestors() {
  var node = this,
    nodes = [node];
  while ((node = node.parent)) {
    nodes.push(node);
  }
  return nodes;
}

function node_descendants() {
  return Array.from(this);
}

function node_leaves() {
  var leaves = [];
  this.eachBefore(function (node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}

function node_links() {
  var root = this,
    links = [];
  root.each(function (node) {
    if (node !== root) {
      // Don’t include the root’s parent, if any.
      links.push({ source: node.parent, target: node });
    }
  });
  return links;
}

function* node_iterator() {
  var node = this,
    current,
    next = [node],
    children,
    i,
    n;
  do {
    ((current = next.reverse()), (next = []));
    while ((node = current.pop())) {
      yield node;
      if ((children = node.children)) {
        for (i = 0, n = children.length; i < n; ++i) {
          next.push(children[i]);
        }
      }
    }
  } while (next.length);
}

function hierarchy(data, children) {
  if (data instanceof Map) {
    data = [undefined, data];
    if (children === undefined) children = mapChildren;
  } else if (children === undefined) {
    children = objectChildren;
  }

  var root = new Node$1(data),
    node,
    nodes = [root],
    child,
    childs,
    i,
    n;

  while ((node = nodes.pop())) {
    if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
      node.children = childs;
      for (i = n - 1; i >= 0; --i) {
        nodes.push((child = childs[i] = new Node$1(childs[i])));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}

function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}

function objectChildren(d) {
  return d.children;
}

function mapChildren(d) {
  return Array.isArray(d) ? d[1] : null;
}

function copyData(node) {
  if (node.data.value !== undefined) node.value = node.data.value;
  node.data = node.data.data;
}

function computeHeight(node) {
  var height = 0;
  do node.height = height;
  while ((node = node.parent) && node.height < ++height);
}

function Node$1(data) {
  this.data = data;
  this.depth = this.height = 0;
  this.parent = null;
}

Node$1.prototype = hierarchy.prototype = {
  constructor: Node$1,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  find: node_find,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy,
  [Symbol.iterator]: node_iterator,
};

function optional(f) {
  return f == null ? null : required(f);
}

function required(f) {
  if (typeof f !== 'function') throw new Error();
  return f;
}

function constantZero() {
  return 0;
}

function constant$3(x) {
  return function () {
    return x;
  };
}

// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a$1 = 1664525;
const c$1 = 1013904223;
const m = 4294967296; // 2^32

function lcg() {
  let s = 1;
  return () => (s = (a$1 * s + c$1) % m) / m;
}

function array$1(x) {
  return typeof x === 'object' && 'length' in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

function shuffle(array, random) {
  let m = array.length,
    t,
    i;

  while (m) {
    i = (random() * m--) | 0;
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function enclose(circles) {
  return packEncloseRandom(circles, lcg());
}

function packEncloseRandom(circles, random) {
  var i = 0,
    n = (circles = shuffle(Array.from(circles), random)).length,
    B = [],
    p,
    e;

  while (i < n) {
    p = circles[i];
    if (e && enclosesWeak(e, p)) ++i;
    else ((e = encloseBasis((B = extendBasis(B, p)))), (i = 0));
  }

  return e;
}

function extendBasis(B, p) {
  var i, j;

  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (i = 0; i < B.length; ++i) {
    if (enclosesNot(p, B[i]) && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (i = 0; i < B.length - 1; ++i) {
    for (j = i + 1; j < B.length; ++j) {
      if (
        enclosesNot(encloseBasis2(B[i], B[j]), p) &&
        enclosesNot(encloseBasis2(B[i], p), B[j]) &&
        enclosesNot(encloseBasis2(B[j], p), B[i]) &&
        enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)
      ) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error();
}

function enclosesNot(a, b) {
  var dr = a.r - b.r,
    dx = b.x - a.x,
    dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}

function enclosesWeak(a, b) {
  var dr = a.r - b.r + Math.max(a.r, b.r, 1) * 1e-9,
    dx = b.x - a.x,
    dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function enclosesWeakAll(a, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}

function encloseBasis(B) {
  switch (B.length) {
    case 1:
      return encloseBasis1(B[0]);
    case 2:
      return encloseBasis2(B[0], B[1]);
    case 3:
      return encloseBasis3(B[0], B[1], B[2]);
  }
}

function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r,
  };
}

function encloseBasis2(a, b) {
  var x1 = a.x,
    y1 = a.y,
    r1 = a.r,
    x2 = b.x,
    y2 = b.y,
    r2 = b.r,
    x21 = x2 - x1,
    y21 = y2 - y1,
    r21 = r2 - r1,
    l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + (x21 / l) * r21) / 2,
    y: (y1 + y2 + (y21 / l) * r21) / 2,
    r: (l + r1 + r2) / 2,
  };
}

function encloseBasis3(a, b, c) {
  var x1 = a.x,
    y1 = a.y,
    r1 = a.r,
    x2 = b.x,
    y2 = b.y,
    r2 = b.r,
    x3 = c.x,
    y3 = c.y,
    r3 = c.r,
    a2 = x1 - x2,
    a3 = x1 - x3,
    b2 = y1 - y2,
    b3 = y1 - y3,
    c2 = r2 - r1,
    c3 = r3 - r1,
    d1 = x1 * x1 + y1 * y1 - r1 * r1,
    d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
    d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
    ab = a3 * b2 - a2 * b3,
    xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
    xb = (b3 * c2 - b2 * c3) / ab,
    ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
    yb = (a2 * c3 - a3 * c2) / ab,
    A = xb * xb + yb * yb - 1,
    B = 2 * (r1 + xa * xb + ya * yb),
    C = xa * xa + ya * ya - r1 * r1,
    r = -(Math.abs(A) > 1e-6 ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r,
    y: y1 + ya + yb * r,
    r: r,
  };
}

function place(b, a, c) {
  var dx = b.x - a.x,
    x,
    a2,
    dy = b.y - a.y,
    y,
    b2,
    d2 = dx * dx + dy * dy;
  if (d2) {
    ((a2 = a.r + c.r), (a2 *= a2));
    ((b2 = b.r + c.r), (b2 *= b2));
    if (a2 > b2) {
      x = (d2 + b2 - a2) / (2 * d2);
      y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
      c.x = b.x - x * dx - y * dy;
      c.y = b.y - x * dy + y * dx;
    } else {
      x = (d2 + a2 - b2) / (2 * d2);
      y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
      c.x = a.x + x * dx - y * dy;
      c.y = a.y + x * dy + y * dx;
    }
  } else {
    c.x = a.x + c.r;
    c.y = a.y;
  }
}

function intersects(a, b) {
  var dr = a.r + b.r - 1e-6,
    dx = b.x - a.x,
    dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function score(node) {
  var a = node._,
    b = node.next._,
    ab = a.r + b.r,
    dx = (a.x * b.r + b.x * a.r) / ab,
    dy = (a.y * b.r + b.y * a.r) / ab;
  return dx * dx + dy * dy;
}

function Node(circle) {
  this._ = circle;
  this.next = null;
  this.previous = null;
}

function packSiblingsRandom(circles, random) {
  if (!(n = (circles = array$1(circles)).length)) return 0;

  var a, b, c, n, aa, ca, i, j, k, sj, sk;

  // Place the first circle.
  ((a = circles[0]), (a.x = 0), (a.y = 0));
  if (!(n > 1)) return a.r;

  // Place the second circle.
  ((b = circles[1]), (a.x = -b.r), (b.x = a.r), (b.y = 0));
  if (!(n > 2)) return a.r + b.r;

  // Place the third circle.
  place(b, a, (c = circles[2]));

  // Initialize the front-chain using the first three circles a, b and c.
  ((a = new Node(a)), (b = new Node(b)), (c = new Node(c)));
  a.next = c.previous = b;
  b.next = a.previous = c;
  c.next = b.previous = a;

  // Attempt to place each remaining circle…
  pack: for (i = 3; i < n; ++i) {
    (place(a._, b._, (c = circles[i])), (c = new Node(c)));

    // Find the closest intersecting circle on the front-chain, if any.
    // “Closeness” is determined by linear distance along the front-chain.
    // “Ahead” or “behind” is likewise determined by linear distance.
    ((j = b.next), (k = a.previous), (sj = b._.r), (sk = a._.r));
    do {
      if (sj <= sk) {
        if (intersects(j._, c._)) {
          ((b = j), (a.next = b), (b.previous = a), --i);
          continue pack;
        }
        ((sj += j._.r), (j = j.next));
      } else {
        if (intersects(k._, c._)) {
          ((a = k), (a.next = b), (b.previous = a), --i);
          continue pack;
        }
        ((sk += k._.r), (k = k.previous));
      }
    } while (j !== k.next);

    // Success! Insert the new circle c between a and b.
    ((c.previous = a), (c.next = b), (a.next = b.previous = b = c));

    // Compute the new closest circle pair to the centroid.
    aa = score(a);
    while ((c = c.next) !== b) {
      if ((ca = score(c)) < aa) {
        ((a = c), (aa = ca));
      }
    }
    b = a.next;
  }

  // Compute the enclosing circle of the front chain.
  ((a = [b._]), (c = b));
  while ((c = c.next) !== b) a.push(c._);
  c = packEncloseRandom(a, random);

  // Translate the circles to put the enclosing circle around the origin.
  for (i = 0; i < n; ++i) ((a = circles[i]), (a.x -= c.x), (a.y -= c.y));

  return c.r;
}

function siblings(circles) {
  packSiblingsRandom(circles, lcg());
  return circles;
}

function defaultRadius(d) {
  return Math.sqrt(d.value);
}

function index$1() {
  var radius = null,
    dx = 1,
    dy = 1,
    padding = constantZero;

  function pack(root) {
    const random = lcg();
    ((root.x = dx / 2), (root.y = dy / 2));
    if (radius) {
      root
        .eachBefore(radiusLeaf(radius))
        .eachAfter(packChildrenRandom(padding, 0.5, random))
        .eachBefore(translateChild(1));
    } else {
      root
        .eachBefore(radiusLeaf(defaultRadius))
        .eachAfter(packChildrenRandom(constantZero, 1, random))
        .eachAfter(packChildrenRandom(padding, root.r / Math.min(dx, dy), random))
        .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
    }
    return root;
  }

  pack.radius = function (x) {
    return arguments.length ? ((radius = optional(x)), pack) : radius;
  };

  pack.size = function (x) {
    return arguments.length ? ((dx = +x[0]), (dy = +x[1]), pack) : [dx, dy];
  };

  pack.padding = function (x) {
    return arguments.length ? ((padding = typeof x === 'function' ? x : constant$3(+x)), pack) : padding;
  };

  return pack;
}

function radiusLeaf(radius) {
  return function (node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}

function packChildrenRandom(padding, k, random) {
  return function (node) {
    if ((children = node.children)) {
      var children,
        i,
        n = children.length,
        r = padding(node) * k || 0,
        e;

      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      e = packSiblingsRandom(children, random);
      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
      node.r = e + r;
    }
  };
}

function translateChild(k) {
  return function (node) {
    var parent = node.parent;
    node.r *= k;
    if (parent) {
      node.x = parent.x + k * node.x;
      node.y = parent.y + k * node.y;
    }
  };
}

function roundNode(node) {
  node.x0 = Math.round(node.x0);
  node.y0 = Math.round(node.y0);
  node.x1 = Math.round(node.x1);
  node.y1 = Math.round(node.y1);
}

function treemapDice(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
    node,
    i = -1,
    n = nodes.length,
    k = parent.value && (x1 - x0) / parent.value;

  while (++i < n) {
    ((node = nodes[i]), (node.y0 = y0), (node.y1 = y1));
    ((node.x0 = x0), (node.x1 = x0 += node.value * k));
  }
}

function partition() {
  var dx = 1,
    dy = 1,
    padding = 0,
    round = false;

  function partition(root) {
    var n = root.height + 1;
    root.x0 = root.y0 = padding;
    root.x1 = dx;
    root.y1 = dy / n;
    root.eachBefore(positionNode(dy, n));
    if (round) root.eachBefore(roundNode);
    return root;
  }

  function positionNode(dy, n) {
    return function (node) {
      if (node.children) {
        treemapDice(node, node.x0, (dy * (node.depth + 1)) / n, node.x1, (dy * (node.depth + 2)) / n);
      }
      var x0 = node.x0,
        y0 = node.y0,
        x1 = node.x1 - padding,
        y1 = node.y1 - padding;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      node.x0 = x0;
      node.y0 = y0;
      node.x1 = x1;
      node.y1 = y1;
    };
  }

  partition.round = function (x) {
    return arguments.length ? ((round = !!x), partition) : round;
  };

  partition.size = function (x) {
    return arguments.length ? ((dx = +x[0]), (dy = +x[1]), partition) : [dx, dy];
  };

  partition.padding = function (x) {
    return arguments.length ? ((padding = +x), partition) : padding;
  };

  return partition;
}

var preroot = { depth: -1 },
  ambiguous = {},
  imputed = {};

function defaultId(d) {
  return d.id;
}

function defaultParentId(d) {
  return d.parentId;
}

function stratify() {
  var id = defaultId,
    parentId = defaultParentId,
    path;

  function stratify(data) {
    var nodes = Array.from(data),
      currentId = id,
      currentParentId = parentId,
      n,
      d,
      i,
      root,
      parent,
      node,
      nodeId,
      nodeKey,
      nodeByKey = new Map();

    if (path != null) {
      const I = nodes.map((d, i) => normalize(path(d, i, data)));
      const P = I.map(parentof);
      const S = new Set(I).add('');
      for (const i of P) {
        if (!S.has(i)) {
          S.add(i);
          I.push(i);
          P.push(parentof(i));
          nodes.push(imputed);
        }
      }
      currentId = (_, i) => I[i];
      currentParentId = (_, i) => P[i];
    }

    for (i = 0, n = nodes.length; i < n; ++i) {
      ((d = nodes[i]), (node = nodes[i] = new Node$1(d)));
      if ((nodeId = currentId(d, i, data)) != null && (nodeId += '')) {
        nodeKey = node.id = nodeId;
        nodeByKey.set(nodeKey, nodeByKey.has(nodeKey) ? ambiguous : node);
      }
      if ((nodeId = currentParentId(d, i, data)) != null && (nodeId += '')) {
        node.parent = nodeId;
      }
    }

    for (i = 0; i < n; ++i) {
      node = nodes[i];
      if ((nodeId = node.parent)) {
        parent = nodeByKey.get(nodeId);
        if (!parent) throw new Error('missing: ' + nodeId);
        if (parent === ambiguous) throw new Error('ambiguous: ' + nodeId);
        if (parent.children) parent.children.push(node);
        else parent.children = [node];
        node.parent = parent;
      } else {
        if (root) throw new Error('multiple roots');
        root = node;
      }
    }

    if (!root) throw new Error('no root');

    // When imputing internal nodes, only introduce roots if needed.
    // Then replace the imputed marker data with null.
    if (path != null) {
      while (root.data === imputed && root.children.length === 1) {
        ((root = root.children[0]), --n);
      }
      for (let i = nodes.length - 1; i >= 0; --i) {
        node = nodes[i];
        if (node.data !== imputed) break;
        node.data = null;
      }
    }

    root.parent = preroot;
    root
      .eachBefore(function (node) {
        node.depth = node.parent.depth + 1;
        --n;
      })
      .eachBefore(computeHeight);
    root.parent = null;
    if (n > 0) throw new Error('cycle');

    return root;
  }

  stratify.id = function (x) {
    return arguments.length ? ((id = optional(x)), stratify) : id;
  };

  stratify.parentId = function (x) {
    return arguments.length ? ((parentId = optional(x)), stratify) : parentId;
  };

  stratify.path = function (x) {
    return arguments.length ? ((path = optional(x)), stratify) : path;
  };

  return stratify;
}

// To normalize a path, we coerce to a string, strip the trailing slash if any
// (as long as the trailing slash is not immediately preceded by another slash),
// and add leading slash if missing.
function normalize(path) {
  path = `${path}`;
  let i = path.length;
  if (slash(path, i - 1) && !slash(path, i - 2)) path = path.slice(0, -1);
  return path[0] === '/' ? path : `/${path}`;
}

// Walk backwards to find the first slash that is not the leading slash, e.g.:
// "/foo/bar" ⇥ "/foo", "/foo" ⇥ "/", "/" ↦ "". (The root is special-cased
// because the id of the root must be a truthy value.)
function parentof(path) {
  let i = path.length;
  if (i < 2) return '';
  while (--i > 1) if (slash(path, i)) break;
  return path.slice(0, i);
}

// Slashes can be escaped; to determine whether a slash is a path delimiter, we
// count the number of preceding backslashes escaping the forward slash: an odd
// number indicates an escaped forward slash.
function slash(path, i) {
  if (path[i] === '/') {
    let k = 0;
    while (i > 0 && path[--i] === '\\') ++k;
    if ((k & 1) === 0) return true;
  }
  return false;
}

function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

// function radialSeparation(a, b) {
//   return (a.parent === b.parent ? 1 : 2) / a.depth;
// }

// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function nextLeft(v) {
  var children = v.children;
  return children ? children[0] : v.t;
}

// This function works analogously to nextLeft.
function nextRight(v) {
  var children = v.children;
  return children ? children[children.length - 1] : v.t;
}

// Shifts the current subtree rooted at w+. This is done by increasing
// prelim(w+) and mod(w+) by shift.
function moveSubtree(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}

// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function executeShifts(v) {
  var shift = 0,
    change = 0,
    children = v.children,
    i = children.length,
    w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}

// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
// returns the specified (default) ancestor.
function nextAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}

function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null; // default ancestor
  this.a = this; // ancestor
  this.z = 0; // prelim
  this.m = 0; // mod
  this.c = 0; // change
  this.s = 0; // shift
  this.t = null; // thread
  this.i = i; // number
}

TreeNode.prototype = Object.create(Node$1.prototype);

function treeRoot(root) {
  var tree = new TreeNode(root, 0),
    node,
    nodes = [tree],
    child,
    children,
    i,
    n;

  while ((node = nodes.pop())) {
    if ((children = node._.children)) {
      node.children = new Array((n = children.length));
      for (i = n - 1; i >= 0; --i) {
        nodes.push((child = node.children[i] = new TreeNode(children[i], i)));
        child.parent = node;
      }
    }
  }

  (tree.parent = new TreeNode(null, 0)).children = [tree];
  return tree;
}

// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
function tree() {
  var separation = defaultSeparation,
    dx = 1,
    dy = 1,
    nodeSize = null;

  function tree(root) {
    var t = treeRoot(root);

    // Compute the layout using Buchheim et al.’s algorithm.
    (t.eachAfter(firstWalk), (t.parent.m = -t.z));
    t.eachBefore(secondWalk);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) root.eachBefore(sizeNode);
    // If a fixed tree size is specified, scale x and y based on the extent.
    // Compute the left-most, right-most, and depth-most nodes for extents.
    else {
      var left = root,
        right = root,
        bottom = root;
      root.eachBefore(function (node) {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        if (node.depth > bottom.depth) bottom = node;
      });
      var s = left === right ? 1 : separation(left, right) / 2,
        tx = s - left.x,
        kx = dx / (right.x + s + tx),
        ky = dy / (bottom.depth || 1);
      root.eachBefore(function (node) {
        node.x = (node.x + tx) * kx;
        node.y = node.depth * ky;
      });
    }

    return root;
  }

  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
  // applied recursively to the children of v, as well as the function
  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
  // node v is placed to the midpoint of its outermost children.
  function firstWalk(v) {
    var children = v.children,
      siblings = v.parent.children,
      w = v.i ? siblings[v.i - 1] : null;
    if (children) {
      executeShifts(v);
      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v._, w._);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }

  // Computes all real x-coordinates by summing up the modifiers recursively.
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }

  // The core of the algorithm. Here, a new subtree is combined with the
  // previous subtrees. Threads are used to traverse the inside and outside
  // contours of the left and right subtree up to the highest common level. The
  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
  // superscript o means outside and i means inside, the subscript - means left
  // subtree and + means right subtree. For summing up the modifiers along the
  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
  // nodes of the inside contours conflict, we compute the left one of the
  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
  // Finally, we add a new thread (if necessary).
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v,
        vop = v,
        vim = w,
        vom = vip.parent.children[0],
        sip = vip.m,
        sop = vop.m,
        sim = vim.m,
        som = vom.m,
        shift;
      while (((vim = nextRight(vim)), (vip = nextLeft(vip)), vim && vip)) {
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !nextRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !nextLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }

  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }

  tree.separation = function (x) {
    return arguments.length ? ((separation = x), tree) : separation;
  };

  tree.size = function (x) {
    return arguments.length ? ((nodeSize = false), (dx = +x[0]), (dy = +x[1]), tree) : nodeSize ? null : [dx, dy];
  };

  tree.nodeSize = function (x) {
    return arguments.length ? ((nodeSize = true), (dx = +x[0]), (dy = +x[1]), tree) : nodeSize ? [dx, dy] : null;
  };

  return tree;
}

function treemapSlice(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
    node,
    i = -1,
    n = nodes.length,
    k = parent.value && (y1 - y0) / parent.value;

  while (++i < n) {
    ((node = nodes[i]), (node.x0 = x0), (node.x1 = x1));
    ((node.y0 = y0), (node.y1 = y0 += node.value * k));
  }
}

var phi = (1 + Math.sqrt(5)) / 2;

function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
  var rows = [],
    nodes = parent.children,
    row,
    nodeValue,
    i0 = 0,
    i1 = 0,
    n = nodes.length,
    dx,
    dy,
    value = parent.value,
    sumValue,
    minValue,
    maxValue,
    newRatio,
    minRatio,
    alpha,
    beta;

  while (i0 < n) {
    ((dx = x1 - x0), (dy = y1 - y0));

    // Find the next non-empty node.
    do sumValue = nodes[i1++].value;
    while (!sumValue && i1 < n);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);

    // Keep adding nodes while the aspect ratio maintains or improves.
    for (; i1 < n; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) {
        sumValue -= nodeValue;
        break;
      }
      minRatio = newRatio;
    }

    // Position and record the row orientation.
    rows.push((row = { value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1) }));
    if (row.dice) treemapDice(row, x0, y0, x1, value ? (y0 += (dy * sumValue) / value) : y1);
    else treemapSlice(row, x0, y0, value ? (x0 += (dx * sumValue) / value) : x1, y1);
    ((value -= sumValue), (i0 = i1));
  }

  return rows;
}

var squarify = (function custom(ratio) {
  function squarify(parent, x0, y0, x1, y1) {
    squarifyRatio(ratio, parent, x0, y0, x1, y1);
  }

  squarify.ratio = function (x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return squarify;
})(phi);

function index() {
  var tile = squarify,
    round = false,
    dx = 1,
    dy = 1,
    paddingStack = [0],
    paddingInner = constantZero,
    paddingTop = constantZero,
    paddingRight = constantZero,
    paddingBottom = constantZero,
    paddingLeft = constantZero;

  function treemap(root) {
    root.x0 = root.y0 = 0;
    root.x1 = dx;
    root.y1 = dy;
    root.eachBefore(positionNode);
    paddingStack = [0];
    if (round) root.eachBefore(roundNode);
    return root;
  }

  function positionNode(node) {
    var p = paddingStack[node.depth],
      x0 = node.x0 + p,
      y0 = node.y0 + p,
      x1 = node.x1 - p,
      y1 = node.y1 - p;
    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
    node.x0 = x0;
    node.y0 = y0;
    node.x1 = x1;
    node.y1 = y1;
    if (node.children) {
      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x0 += paddingLeft(node) - p;
      y0 += paddingTop(node) - p;
      x1 -= paddingRight(node) - p;
      y1 -= paddingBottom(node) - p;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      tile(node, x0, y0, x1, y1);
    }
  }

  treemap.round = function (x) {
    return arguments.length ? ((round = !!x), treemap) : round;
  };

  treemap.size = function (x) {
    return arguments.length ? ((dx = +x[0]), (dy = +x[1]), treemap) : [dx, dy];
  };

  treemap.tile = function (x) {
    return arguments.length ? ((tile = required(x)), treemap) : tile;
  };

  treemap.padding = function (x) {
    return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
  };

  treemap.paddingInner = function (x) {
    return arguments.length ? ((paddingInner = typeof x === 'function' ? x : constant$3(+x)), treemap) : paddingInner;
  };

  treemap.paddingOuter = function (x) {
    return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
  };

  treemap.paddingTop = function (x) {
    return arguments.length ? ((paddingTop = typeof x === 'function' ? x : constant$3(+x)), treemap) : paddingTop;
  };

  treemap.paddingRight = function (x) {
    return arguments.length ? ((paddingRight = typeof x === 'function' ? x : constant$3(+x)), treemap) : paddingRight;
  };

  treemap.paddingBottom = function (x) {
    return arguments.length ? ((paddingBottom = typeof x === 'function' ? x : constant$3(+x)), treemap) : paddingBottom;
  };

  treemap.paddingLeft = function (x) {
    return arguments.length ? ((paddingLeft = typeof x === 'function' ? x : constant$3(+x)), treemap) : paddingLeft;
  };

  return treemap;
}

function binary(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
    i,
    n = nodes.length,
    sum,
    sums = new Array(n + 1);

  for (sums[0] = sum = i = 0; i < n; ++i) {
    sums[i + 1] = sum += nodes[i].value;
  }

  partition(0, n, parent.value, x0, y0, x1, y1);

  function partition(i, j, value, x0, y0, x1, y1) {
    if (i >= j - 1) {
      var node = nodes[i];
      ((node.x0 = x0), (node.y0 = y0));
      ((node.x1 = x1), (node.y1 = y1));
      return;
    }

    var valueOffset = sums[i],
      valueTarget = value / 2 + valueOffset,
      k = i + 1,
      hi = j - 1;

    while (k < hi) {
      var mid = (k + hi) >>> 1;
      if (sums[mid] < valueTarget) k = mid + 1;
      else hi = mid;
    }

    if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i + 1 < k) --k;

    var valueLeft = sums[k] - valueOffset,
      valueRight = value - valueLeft;

    if (x1 - x0 > y1 - y0) {
      var xk = value ? (x0 * valueRight + x1 * valueLeft) / value : x1;
      partition(i, k, valueLeft, x0, y0, xk, y1);
      partition(k, j, valueRight, xk, y0, x1, y1);
    } else {
      var yk = value ? (y0 * valueRight + y1 * valueLeft) / value : y1;
      partition(i, k, valueLeft, x0, y0, x1, yk);
      partition(k, j, valueRight, x0, yk, x1, y1);
    }
  }
}

function sliceDice(parent, x0, y0, x1, y1) {
  (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x0, y0, x1, y1);
}

var resquarify = (function custom(ratio) {
  function resquarify(parent, x0, y0, x1, y1) {
    if ((rows = parent._squarify) && rows.ratio === ratio) {
      var rows,
        row,
        nodes,
        i,
        j = -1,
        n,
        m = rows.length,
        value = parent.value;

      while (++j < m) {
        ((row = rows[j]), (nodes = row.children));
        for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
        if (row.dice) treemapDice(row, x0, y0, x1, value ? (y0 += ((y1 - y0) * row.value) / value) : y1);
        else treemapSlice(row, x0, y0, value ? (x0 += ((x1 - x0) * row.value) / value) : x1, y1);
        value -= row.value;
      }
    } else {
      parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
      rows.ratio = ratio;
    }
  }

  resquarify.ratio = function (x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return resquarify;
})(phi);

var src$2 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  Node: Node$1,
  cluster: cluster,
  hierarchy: hierarchy,
  pack: index$1,
  packEnclose: enclose,
  packSiblings: siblings,
  partition: partition,
  stratify: stratify,
  tree: tree,
  treemap: index,
  treemapBinary: binary,
  treemapDice: treemapDice,
  treemapResquarify: resquarify,
  treemapSlice: treemapSlice,
  treemapSliceDice: sliceDice,
  treemapSquarify: squarify,
});

var require$$2 = /*@__PURE__*/ getAugmentedNamespace(src$2);

var noop$1 = { value: () => {} };

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + '') || t in _ || /[\s.]/.test(t)) throw new Error('illegal type: ' + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var name = '',
        i = t.indexOf('.');
      if (i >= 0) ((name = t.slice(i + 1)), (t = t.slice(0, i)));
      if (t && !types.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
      return { type: t, name: name };
    });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function (typename, callback) {
    var _ = this._,
      T = parseTypenames(typename + '', _),
      t,
      i = -1,
      n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== 'function') throw new Error('invalid callback: ' + callback);
    while (++i < n) {
      if ((t = (typename = T[i]).type)) _[t] = set$1(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
    }

    return this;
  },
  copy: function () {
    var copy = {},
      _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function (type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error('unknown type: ' + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function (type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error('unknown type: ' + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
};

function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      ((type[i] = noop$1), (type = type.slice(0, i).concat(type.slice(i + 1))));
      break;
    }
  }
  if (callback != null) type.push({ name: name, value: callback });
  return type;
}

// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
const nonpassivecapture = { capture: true, passive: false };

function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

function dragDisable(view) {
  var root = view.document.documentElement,
    selection = select(view).on('dragstart.drag', noevent$1, nonpassivecapture);
  if ('onselectstart' in root) {
    selection.on('selectstart.drag', noevent$1, nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = 'none';
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
    selection = select(view).on('dragstart.drag', null);
  if (noclick) {
    selection.on('click.drag', noevent$1, nonpassivecapture);
    setTimeout(function () {
      selection.on('click.drag', null);
    }, 0);
  }
  if ('onselectstart' in root) {
    selection.on('selectstart.drag', null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = '\\s*([+-]?\\d+)\\s*',
  reN = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
  reP = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
  reHex = /^#([0-9a-f]{3,8})$/,
  reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
  reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
  reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
  reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
  reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
  reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32,
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb,
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + '').trim().toLowerCase();
  return (m = reHex.exec(format))
    ? ((l = m[1].length),
      (m = parseInt(m[1], 16)),
      l === 6
        ? rgbn(m) // #ff0000
        : l === 3
          ? new Rgb(((m >> 8) & 0xf) | ((m >> 4) & 0xf0), ((m >> 4) & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8
            ? rgba((m >> 24) & 0xff, (m >> 16) & 0xff, (m >> 8) & 0xff, (m & 0xff) / 0xff) // #ff000000
            : l === 4
              ? rgba(((m >> 12) & 0xf) | ((m >> 8) & 0xf0), ((m >> 8) & 0xf) | ((m >> 4) & 0xf0), ((m >> 4) & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
              : null) // invalid hex
    : (m = reRgbInteger.exec(format))
      ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format))
        ? new Rgb((m[1] * 255) / 100, (m[2] * 255) / 100, (m[3] * 255) / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format))
          ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format))
            ? rgba((m[1] * 255) / 100, (m[2] * 255) / 100, (m[3] * 255) / 100, m[4]) // rgb(100%, 0%, 0%, 1)
            : (m = reHslPercent.exec(format))
              ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
              : (m = reHslaPercent.exec(format))
                ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
                : named.hasOwnProperty(format)
                  ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
                  : format === 'transparent'
                    ? new Rgb(NaN, NaN, NaN, 0)
                    : null;
}

function rgbn(n) {
  return new Rgb((n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(
  Rgb,
  rgb,
  extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb,
  }),
);

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? 'rgb(' : 'rgba('}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ')' : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? '0' : '') + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    h = NaN,
    s = max - min,
    l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(
  Hsl,
  hsl,
  extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = (this.h % 360) + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return ((0 <= this.s && this.s <= 1) || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? 'hsl(' : 'hsla('}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ')' : `, ${a})`}`;
    },
  }),
);

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + ((m2 - m1) * h) / 60 : h < 180 ? m2 : h < 240 ? m1 + ((m2 - m1) * (240 - h)) / 60 : m1) * 255;
}

const radians = Math.PI / 180;
const degrees$1 = 180 / Math.PI;

// https://observablehq.com/@mbostock/lab-and-rgb
const K = 18,
  Xn = 0.96422,
  Yn = 1,
  Zn = 0.82521,
  t0 = 4 / 29,
  t1 = 6 / 29,
  t2 = 3 * t1 * t1,
  t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r),
    g = rgb2lrgb(o.g),
    b = rgb2lrgb(o.b),
    y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
    x,
    z;
  if (r === g && g === b) x = z = y;
  else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(
  Lab,
  lab,
  extend(Color, {
    brighter(k) {
      return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker(k) {
      return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb() {
      var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn * lab2xyz(x);
      y = Yn * lab2xyz(y);
      z = Zn * lab2xyz(z);
      return new Rgb(
        lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
        lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z),
        lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
        this.opacity,
      );
    },
  }),
);

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees$1;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

define(
  Hcl,
  hcl,
  extend(Color, {
    brighter(k) {
      return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker(k) {
      return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb() {
      return hcl2lab(this).rgb();
    },
  }),
);

var A = -0.14861,
  B = 1.78277,
  C = -0.29227,
  D = -0.90649,
  E = 1.97294,
  ED = E * D,
  EB = E * B,
  BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
    bl = b - l,
    k = (E * (g - l) - C * bl) / D,
    s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
    h = s ? Math.atan2(k, bl) * degrees$1 - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix$1(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(
  Cubehelix,
  cubehelix$1,
  extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = isNaN(this.h) ? 0 : (this.h + 120) * radians,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
      return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
    },
  }),
);

var constant$2 = x => () => x;

function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return (
    (a = Math.pow(a, y)),
    (b = Math.pow(b, y) - a),
    (y = 1 / y),
    function (t) {
      return Math.pow(a + t * b, y);
    }
  );
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$2(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1
    ? nogamma
    : function (a, b) {
        return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
      };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant$2(isNaN(a) ? b : a);
}

var interpolateRgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
      g = color(start.g, end.g),
      b = color(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + '';
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);

function interpolateNumber(a, b) {
  return (
    (a = +a),
    (b = +b),
    function (t) {
      return a * (1 - t) + b * t;
    }
  );
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  reB = new RegExp(reA.source, 'g');

function zero(b) {
  return function () {
    return b;
  };
}

function one(b) {
  return function (t) {
    return b(t) + '';
  };
}

function interpolateString(a, b) {
  var bi = (reA.lastIndex = reB.lastIndex = 0), // scan index for next number in b
    am, // current match in a
    bm, // current match in b
    bs, // string preceding current number in b, if any
    i = -1, // index in s
    s = [], // string constants and placeholders
    q = []; // number interpolators

  // Coerce inputs to strings.
  ((a = a + ''), (b = b + ''));

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i])
        s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({ i: i, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2
    ? q[0]
      ? one(q[0].x)
      : zero(b)
    : ((b = q.length),
      function (t) {
        for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
        return s.join('');
      });
}

var degrees = 180 / Math.PI;

var identity$2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1,
};

function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if ((scaleX = Math.sqrt(a * a + b * b))) ((a /= scaleX), (b /= scaleX));
  if ((skewX = a * c + b * d)) ((c -= a * skewX), (d -= b * skewX));
  if ((scaleY = Math.sqrt(c * c + d * d))) ((c /= scaleY), (d /= scaleY), (skewX /= scaleY));
  if (a * d < b * c) ((a = -a), (b = -b), (skewX = -skewX), (scaleX = -scaleX));
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY,
  };
}

var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === 'function' ? DOMMatrix : WebKitCSSMatrix)(value + '');
  return m.isIdentity ? identity$2 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return identity$2;
  if (!svgNode) svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  svgNode.setAttribute('transform', value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + ' ' : '';
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push('translate(', null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb || yb) {
      s.push('translate(' + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360; // shortest path
      q.push({ i: s.push(pop(s) + 'rotate(', null, degParen) - 2, x: interpolateNumber(a, b) });
    } else if (b) {
      s.push(pop(s) + 'rotate(' + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + 'skewX(', null, degParen) - 2, x: interpolateNumber(a, b) });
    } else if (b) {
      s.push(pop(s) + 'skewX(' + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + 'scale(', null, ',', null, ')');
      q.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + 'scale(' + xb + ',' + yb + ')');
    }
  }

  return function (a, b) {
    var s = [], // string constants and placeholders
      q = []; // number interpolators
    ((a = parse(a)), (b = parse(b)));
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function (t) {
      var i = -1,
        n = q.length,
        o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join('');
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, 'px, ', 'px)', 'deg)');
var interpolateTransformSvg = interpolateTransform(parseSvg, ', ', ')', ')');

var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

var interpolateZoom = (function zoomRho(rho, rho2, rho4) {
  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0],
      uy0 = p0[1],
      w0 = p0[2],
      ux1 = p1[0],
      uy1 = p1[1],
      w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function (t) {
        return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function (t) {
        var s = t * S,
          coshr0 = cosh(r0),
          u = (w0 / (rho2 * d1)) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, (w0 * coshr0) / cosh(rho * s + r0)];
      };
    }

    i.duration = (S * 1000 * rho) / Math.SQRT2;

    return i;
  }

  zoom.rho = function (_) {
    var _1 = Math.max(1e-3, +_),
      _2 = _1 * _1,
      _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
})(Math.SQRT2, 2, 4);

function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = cubehelix$1(start)).h, (end = cubehelix$1(end)).h),
        s = nogamma(start.s, end.s),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + '';
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

cubehelix(hue);
cubehelix(nogamma);

var frame = 0, // is an animation frame pending?
  timeout$1 = 0, // is a timeout pending?
  interval = 0, // are any timers active?
  pokeDelay = 1000, // how frequently we check for clock skew
  taskHead,
  taskTail,
  clockLast = 0,
  clockNow = 0,
  clockSkew = 0,
  clock = typeof performance === 'object' && performance.now ? performance : Date,
  setFrame =
    typeof window === 'object' && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (f) {
          setTimeout(f, 17);
        };

function now() {
  return clockNow || (setFrame(clearNow), (clockNow = clock.now() + clockSkew));
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call = this._time = this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function (callback, delay, time) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function () {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  },
};

function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead,
    e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(),
    delay = now - clockLast;
  if (delay > pokeDelay) ((clockSkew -= delay), (clockLast = now));
}

function nap() {
  var t0,
    t1 = taskHead,
    t2,
    time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      ((t0 = t1), (t1 = t1._next));
    } else {
      ((t2 = t1._next), (t1._next = null));
      t1 = t0 ? (t0._next = t2) : (taskHead = t2);
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) ((clockLast = clock.now()), (interval = setInterval(poke, pokeDelay)));
    ((frame = 1), setFrame(wake));
  }
}

function timeout(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(
    elapsed => {
      t.stop();
      callback(elapsed + delay);
    },
    delay,
    time,
  );
  return t;
}

var emptyOn = dispatch('start', 'end', 'cancel', 'interrupt');
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED,
  });
}

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error('too late; already scheduled');
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error('too late; already running');
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error('transition not found');
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
    tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call('interrupt', node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call('cancel', node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout(function () {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call('start', node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array((n = self.tween.length));
    for (i = 0, j = -1; i < n; ++i) {
      if ((o = self.tween[i].value.call(node, node.__data__, self.index, self.group))) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), (self.state = ENDING), 1),
      i = -1,
      n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call('end', node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

function interrupt(node, name) {
  var schedules = node.__transition,
    schedule,
    active,
    empty = true,
    i;

  if (!schedules) return;

  name = name == null ? null : name + '';

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? 'interrupt' : 'cancel', node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

function selection_interrupt(name) {
  return this.each(function () {
    interrupt(this, name);
  });
}

function tweenRemove(id, name) {
  var tween0, tween1;
  return function () {
    var schedule = set(this, id),
      tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== 'function') throw new Error();
  return function () {
    var schedule = set(this, id),
      tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name: name, value: value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

function transition_tween(name, value) {
  var id = this._id;

  name += '';

  if (arguments.length < 2) {
    var tween = get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function () {
    var schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function (node) {
    return get(node, id).value[name];
  };
}

function interpolate(a, b) {
  var c;
  return (typeof b === 'number' ? interpolateNumber : b instanceof color ? interpolateRgb : (c = color(b)) ? ((b = c), interpolateRgb) : interpolateString)(a, b);
}

function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
    string1 = value1 + '',
    interpolate0;
  return function () {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : (interpolate0 = interpolate((string00 = string0), value1));
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
    string1 = value1 + '',
    interpolate0;
  return function () {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : (interpolate0 = interpolate((string00 = string0), value1));
  };
}

function attrFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
      value1 = value(this),
      string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + '';
    return string0 === string1
      ? null
      : string0 === string00 && string1 === string10
        ? interpolate0
        : ((string10 = string1), (interpolate0 = interpolate((string00 = string0), value1)));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
      value1 = value(this),
      string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + '';
    return string0 === string1
      ? null
      : string0 === string00 && string1 === string10
        ? interpolate0
        : ((string10 = string1), (interpolate0 = interpolate((string00 = string0), value1)));
  };
}

function transition_attr(name, value) {
  var fullname = namespace(name),
    i = fullname === 'transform' ? interpolateTransformSvg : interpolate;
  return this.attrTween(
    name,
    typeof value === 'function'
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, 'attr.' + name, value))
      : value == null
        ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value),
  );
}

function attrInterpolate(name, i) {
  return function (t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function (t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_attrTween(name, value) {
  var key = 'attr.' + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== 'function') throw new Error();
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

function delayFunction(id, value) {
  return function () {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return (
    (value = +value),
    function () {
      init(this, id).delay = value;
    }
  );
}

function transition_delay(value) {
  var id = this._id;

  return arguments.length ? this.each((typeof value === 'function' ? delayFunction : delayConstant)(id, value)) : get(this.node(), id).delay;
}

function durationFunction(id, value) {
  return function () {
    set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return (
    (value = +value),
    function () {
      set(this, id).duration = value;
    }
  );
}

function transition_duration(value) {
  var id = this._id;

  return arguments.length ? this.each((typeof value === 'function' ? durationFunction : durationConstant)(id, value)) : get(this.node(), id).duration;
}

function easeConstant(id, value) {
  if (typeof value !== 'function') throw new Error();
  return function () {
    set(this, id).ease = value;
  };
}

function transition_ease(value) {
  var id = this._id;

  return arguments.length ? this.each(easeConstant(id, value)) : get(this.node(), id).ease;
}

function easeVarying(id, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (typeof v !== 'function') throw new Error();
    set(this, id).ease = v;
  };
}

function transition_easeVarying(value) {
  if (typeof value !== 'function') throw new Error();
  return this.each(easeVarying(this._id, value));
}

function transition_filter(match) {
  if (typeof match !== 'function') match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = (subgroups[j] = []), node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error();

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = (merges[j] = new Array(n)), node, i = 0; i < n; ++i) {
      if ((node = group0[i] || group1[i])) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

function start(name) {
  return (name + '')
    .trim()
    .split(/^|\s+/)
    .every(function (t) {
      var i = t.indexOf('.');
      if (i >= 0) t = t.slice(0, i);
      return !t || t === 'start';
    });
}

function onFunction(id, name, listener) {
  var on0,
    on1,
    sit = start(name) ? init : set;
  return function () {
    var schedule = sit(this, id),
      on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2 ? get(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
}

function removeFunction(id) {
  return function () {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

function transition_remove() {
  return this.on('end.remove', removeFunction(this._id));
}

function transition_select(select) {
  var name = this._name,
    id = this._id;

  if (typeof select !== 'function') select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = (subgroups[j] = new Array(n)), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ('__data__' in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

function transition_selectAll(select) {
  var name = this._name,
    id = this._id;

  if (typeof select !== 'function') select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
          if ((child = children[k])) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

var Selection = selection.prototype.constructor;

function transition_selection() {
  return new Selection(this._groups, this._parents);
}

function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = styleValue(this, name),
      string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (interpolate0 = interpolate((string00 = string0), (string10 = string1)));
  };
}

function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
    string1 = value1 + '',
    interpolate0;
  return function () {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : (interpolate0 = interpolate((string00 = string0), value1));
  };
}

function styleFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = styleValue(this, name),
      value1 = value(this),
      string1 = value1 + '';
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1
      ? null
      : string0 === string00 && string1 === string10
        ? interpolate0
        : ((string10 = string1), (interpolate0 = interpolate((string00 = string0), value1)));
  };
}

function styleMaybeRemove(id, name) {
  var on0,
    on1,
    listener0,
    key = 'style.' + name,
    event = 'end.' + key,
    remove;
  return function () {
    var schedule = set(this, id),
      on = schedule.on,
      listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, (listener0 = listener));

    schedule.on = on1;
  };
}

function transition_style(name, value, priority) {
  var i = (name += '') === 'transform' ? interpolateTransformCss : interpolate;
  return value == null
    ? this.styleTween(name, styleNull(name, i)).on('end.style.' + name, styleRemove(name))
    : typeof value === 'function'
      ? this.styleTween(name, styleFunction(name, i, tweenValue(this, 'style.' + name, value))).each(styleMaybeRemove(this._id, name))
      : this.styleTween(name, styleConstant(name, i, value), priority).on('end.style.' + name, null);
}

function styleInterpolate(name, i, priority) {
  return function (t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

function transition_styleTween(name, value, priority) {
  var key = 'style.' + (name += '');
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== 'function') throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? '' : priority));
}

function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function () {
    var value1 = value(this);
    this.textContent = value1 == null ? '' : value1;
  };
}

function transition_text(value) {
  return this.tween('text', typeof value === 'function' ? textFunction(tweenValue(this, 'text', value)) : textConstant(value == null ? '' : value + ''));
}

function textInterpolate(i) {
  return function (t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_textTween(value) {
  var key = 'text';
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== 'function') throw new Error();
  return this.tween(key, textTween(value));
}

function transition_transition() {
  var name = this._name,
    id0 = this._id,
    id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        var inherit = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease,
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

function transition_end() {
  var on0,
    on1,
    that = this,
    id = that._id,
    size = that.size();
  return new Promise(function (resolve, reject) {
    var cancel = { value: reject },
      end = {
        value: function () {
          if (--size === 0) resolve();
        },
      };

    that.each(function () {
      var schedule = set(this, id),
        on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator],
};

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var exponent = 3;

(function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

(function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

(function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);

// tpmt is two power minus ten times t scaled to [0,1]
function tpmt(x) {
  return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}

var overshoot = 1.70158;

(function custom(s) {
  s = +s;

  function backIn(t) {
    return (t = +t) * t * (s * (t - 1) + t);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

(function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((t + 1) * s + t) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

(function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);

var tau$2 = 2 * Math.PI,
  amplitude = 1,
  period = 0.3;

(function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$2);

  function elasticIn(t) {
    return a * tpmt(-(--t)) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function (a) {
    return custom(a, p * tau$2);
  };
  elasticIn.period = function (p) {
    return custom(a, p);
  };

  return elasticIn;
})(amplitude, period);

(function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$2);

  function elasticOut(t) {
    return 1 - a * tpmt((t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function (a) {
    return custom(a, p * tau$2);
  };
  elasticOut.period = function (p) {
    return custom(a, p);
  };

  return elasticOut;
})(amplitude, period);

(function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$2);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0 ? a * tpmt(-t) * Math.sin((s - t) / p) : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function (a) {
    return custom(a, p * tau$2);
  };
  elasticInOut.period = function (p) {
    return custom(a, p);
  };

  return elasticInOut;
})(amplitude, period);

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut,
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

function selection_transition(name) {
  var id, timing;

  if (name instanceof Transition) {
    ((id = name._id), (name = name._name));
  } else {
    ((id = newId()), ((timing = defaultTiming).time = now()), (name = name == null ? null : name + ''));
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if ((node = group[i])) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

var constant$1 = x => () => x;

function ZoomEvent(type, { sourceEvent, target, transform, dispatch }) {
  Object.defineProperties(this, {
    type: { value: type, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform, enumerable: true, configurable: true },
    _: { value: dispatch },
  });
}

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function (k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function (x, y) {
    return (x === 0) & (y === 0) ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function (point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function (x) {
    return x * this.k + this.x;
  },
  applyY: function (y) {
    return y * this.k + this.y;
  },
  invert: function (location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function (x) {
    return (x - this.x) / this.k;
  },
  invertY: function (y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function (x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function (y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function () {
    return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')';
  },
};

var identity$1 = new Transform(1, 0, 0);

transform.prototype = Transform.prototype;

function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity$1;
  return node.__zoom;
}

function nopropagation(event) {
  event.stopImmediatePropagation();
}

function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}

function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute('viewBox')) {
      e = e.viewBox.baseVal;
      return [
        [e.x, e.y],
        [e.x + e.width, e.y + e.height],
      ];
    }
    return [
      [0, 0],
      [e.width.baseVal.value, e.height.baseVal.value],
    ];
  }
  return [
    [0, 0],
    [e.clientWidth, e.clientHeight],
  ];
}

function defaultTransform() {
  return this.__zoom || identity$1;
}

function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}

function defaultTouchable() {
  return navigator.maxTouchPoints || 'ontouchstart' in this;
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
    dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
    dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
    dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
}

function zoom() {
  var filter = defaultFilter,
    extent = defaultExtent,
    constrain = defaultConstrain,
    wheelDelta = defaultWheelDelta,
    touchable = defaultTouchable,
    scaleExtent = [0, Infinity],
    translateExtent = [
      [-Infinity, -Infinity],
      [Infinity, Infinity],
    ],
    duration = 250,
    interpolate = interpolateZoom,
    listeners = dispatch('start', 'zoom', 'end'),
    touchstarting,
    touchfirst,
    touchending,
    touchDelay = 500,
    wheelDelay = 150,
    clickDistance2 = 0,
    tapDistance = 10;

  function zoom(selection) {
    selection
      .property('__zoom', defaultTransform)
      .on('wheel.zoom', wheeled, { passive: false })
      .on('mousedown.zoom', mousedowned)
      .on('dblclick.zoom', dblclicked)
      .filter(touchable)
      .on('touchstart.zoom', touchstarted)
      .on('touchmove.zoom', touchmoved)
      .on('touchend.zoom touchcancel.zoom', touchended)
      .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
  }

  zoom.transform = function (collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property('__zoom', defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function () {
        gesture(this, arguments)
          .event(event)
          .start()
          .zoom(null, typeof transform === 'function' ? transform.apply(this, arguments) : transform)
          .end();
      });
    }
  };

  zoom.scaleBy = function (selection, k, p, event) {
    zoom.scaleTo(
      selection,
      function () {
        var k0 = this.__zoom.k,
          k1 = typeof k === 'function' ? k.apply(this, arguments) : k;
        return k0 * k1;
      },
      p,
      event,
    );
  };

  zoom.scaleTo = function (selection, k, p, event) {
    zoom.transform(
      selection,
      function () {
        var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === 'function' ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === 'function' ? k.apply(this, arguments) : k;
        return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
      },
      p,
      event,
    );
  };

  zoom.translateBy = function (selection, x, y, event) {
    zoom.transform(
      selection,
      function () {
        return constrain(
          this.__zoom.translate(typeof x === 'function' ? x.apply(this, arguments) : x, typeof y === 'function' ? y.apply(this, arguments) : y),
          extent.apply(this, arguments),
          translateExtent,
        );
      },
      null,
      event,
    );
  };

  zoom.translateTo = function (selection, x, y, p, event) {
    zoom.transform(
      selection,
      function () {
        var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === 'function' ? p.apply(this, arguments) : p;
        return constrain(
          identity$1
            .translate(p0[0], p0[1])
            .scale(t.k)
            .translate(typeof x === 'function' ? -x.apply(this, arguments) : -x, typeof y === 'function' ? -y.apply(this, arguments) : -y),
          e,
          translateExtent,
        );
      },
      p,
      event,
    );
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k,
      y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point, event) {
    transition
      .on('start.zoom', function () {
        gesture(this, arguments).event(event).start();
      })
      .on('interrupt.zoom end.zoom', function () {
        gesture(this, arguments).event(event).end();
      })
      .tween('zoom', function () {
        var that = this,
          args = arguments,
          g = gesture(that, args).event(event),
          e = extent.apply(that, args),
          p = point == null ? centroid(e) : typeof point === 'function' ? point.apply(that, args) : point,
          w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
          a = that.__zoom,
          b = typeof transform === 'function' ? transform.apply(that, args) : transform,
          i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
        return function (t) {
          if (t === 1)
            t = b; // Avoid rounding error on end.
          else {
            var l = i(t),
              k = w / l[2];
            t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
          }
          g.zoom(null, t);
        };
      });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    event: function (event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function () {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit('start');
      }
      return this;
    },
    zoom: function (key, transform) {
      if (this.mouse && key !== 'mouse') this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== 'touch') this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== 'touch') this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit('zoom');
      return this;
    },
    end: function () {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit('end');
      }
      return this;
    },
    emit: function (type) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          transform: this.that.__zoom,
          dispatch: listeners,
        }),
        d,
      );
    },
  };

  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
      t = this.__zoom,
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
      p = pointer(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert((g.mouse[0] = p));
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;
    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }

    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom('mouse', constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
      g = gesture(this, args, true).event(event),
      v = select(event.view).on('mousemove.zoom', mousemoved, true).on('mouseup.zoom', mouseupped, true),
      p = pointer(event, currentTarget),
      x0 = event.clientX,
      y0 = event.clientY;

    dragDisable(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();

    function mousemoved(event) {
      noevent(event);
      if (!g.moved) {
        var dx = event.clientX - x0,
          dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event).zoom('mouse', constrain(translate(g.that.__zoom, (g.mouse[0] = pointer(event, currentTarget)), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped(event) {
      v.on('mousemove.zoom mouseup.zoom', null);
      yesdrag(event.view, g.moved);
      noevent(event);
      g.event(event).end();
    }
  }

  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
      p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
      p1 = t0.invert(p0),
      k1 = t0.k * (event.shiftKey ? 0.5 : 2),
      t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

    noevent(event);
    if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
    else select(this).call(zoom.transform, t1, p0, event);
  }

  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
      n = touches.length,
      g = gesture(this, args, event.changedTouches.length === n).event(event),
      started,
      i,
      t,
      p;

    nopropagation(event);
    for (i = 0; i < n; ++i) {
      ((t = touches[i]), (p = pointer(t, this)));
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) ((g.touch0 = p), (started = true), (g.taps = 1 + !!touchstarting));
      else if (!g.touch1 && g.touch0[2] !== p[2]) ((g.touch1 = p), (g.taps = 0));
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2)
        ((touchfirst = p[0]),
          (touchstarting = setTimeout(function () {
            touchstarting = null;
          }, touchDelay)));
      interrupt(this);
      g.start();
    }
  }

  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
      touches = event.changedTouches,
      n = touches.length,
      i,
      t,
      p,
      l;

    noevent(event);
    for (i = 0; i < n; ++i) {
      ((t = touches[i]), (p = pointer(t, this)));
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0],
        l0 = g.touch0[1],
        p1 = g.touch1[0],
        l1 = g.touch1[1],
        dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
        dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0) ((p = g.touch0[0]), (l = g.touch0[1]));
    else return;

    g.zoom('touch', constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
      touches = event.changedTouches,
      n = touches.length,
      i,
      t;

    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function () {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) ((g.touch0 = g.touch1), delete g.touch1);
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select(this).on('dblclick.zoom');
          if (p) p.apply(this, arguments);
        }
      }
    }
  }

  zoom.wheelDelta = function (_) {
    return arguments.length ? ((wheelDelta = typeof _ === 'function' ? _ : constant$1(+_)), zoom) : wheelDelta;
  };

  zoom.filter = function (_) {
    return arguments.length ? ((filter = typeof _ === 'function' ? _ : constant$1(!!_)), zoom) : filter;
  };

  zoom.touchable = function (_) {
    return arguments.length ? ((touchable = typeof _ === 'function' ? _ : constant$1(!!_)), zoom) : touchable;
  };

  zoom.extent = function (_) {
    return arguments.length
      ? ((extent =
          typeof _ === 'function'
            ? _
            : constant$1([
                [+_[0][0], +_[0][1]],
                [+_[1][0], +_[1][1]],
              ])),
        zoom)
      : extent;
  };

  zoom.scaleExtent = function (_) {
    return arguments.length ? ((scaleExtent[0] = +_[0]), (scaleExtent[1] = +_[1]), zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function (_) {
    return arguments.length
      ? ((translateExtent[0][0] = +_[0][0]), (translateExtent[1][0] = +_[1][0]), (translateExtent[0][1] = +_[0][1]), (translateExtent[1][1] = +_[1][1]), zoom)
      : [
          [translateExtent[0][0], translateExtent[0][1]],
          [translateExtent[1][0], translateExtent[1][1]],
        ];
  };

  zoom.constrain = function (_) {
    return arguments.length ? ((constrain = _), zoom) : constrain;
  };

  zoom.duration = function (_) {
    return arguments.length ? ((duration = +_), zoom) : duration;
  };

  zoom.interpolate = function (_) {
    return arguments.length ? ((interpolate = _), zoom) : interpolate;
  };

  zoom.on = function () {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function (_) {
    return arguments.length ? ((clickDistance2 = (_ = +_) * _), zoom) : Math.sqrt(clickDistance2);
  };

  zoom.tapDistance = function (_) {
    return arguments.length ? ((tapDistance = +_), zoom) : tapDistance;
  };

  return zoom;
}

var src$1 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  ZoomTransform: Transform,
  zoom: zoom,
  zoomIdentity: identity$1,
  zoomTransform: transform,
});

var require$$3 = /*@__PURE__*/ getAugmentedNamespace(src$1);

var d3Flextree$1 = { exports: {} };

var d3Flextree = d3Flextree$1.exports;

var hasRequiredD3Flextree;

function requireD3Flextree() {
  if (hasRequiredD3Flextree) return d3Flextree$1.exports;
  hasRequiredD3Flextree = 1;
  (function (module, exports) {
    (function (global, factory) {
      factory(exports);
    })(d3Flextree, function (exports) {
      function count(node) {
        var sum = 0,
          children = node.children,
          i = children && children.length;
        if (!i) sum = 1;
        else while (--i >= 0) sum += children[i].value;
        node.value = sum;
      }

      function node_count() {
        return this.eachAfter(count);
      }

      function node_each(callback) {
        var node = this,
          current,
          next = [node],
          children,
          i,
          n;
        do {
          ((current = next.reverse()), (next = []));
          while ((node = current.pop())) {
            (callback(node), (children = node.children));
            if (children)
              for (i = 0, n = children.length; i < n; ++i) {
                next.push(children[i]);
              }
          }
        } while (next.length);
        return this;
      }

      function node_eachBefore(callback) {
        var node = this,
          nodes = [node],
          children,
          i;
        while ((node = nodes.pop())) {
          (callback(node), (children = node.children));
          if (children)
            for (i = children.length - 1; i >= 0; --i) {
              nodes.push(children[i]);
            }
        }
        return this;
      }

      function node_eachAfter(callback) {
        var node = this,
          nodes = [node],
          next = [],
          children,
          i,
          n;
        while ((node = nodes.pop())) {
          (next.push(node), (children = node.children));
          if (children)
            for (i = 0, n = children.length; i < n; ++i) {
              nodes.push(children[i]);
            }
        }
        while ((node = next.pop())) {
          callback(node);
        }
        return this;
      }

      function node_sum(value) {
        return this.eachAfter(function (node) {
          var sum = +value(node.data) || 0,
            children = node.children,
            i = children && children.length;
          while (--i >= 0) sum += children[i].value;
          node.value = sum;
        });
      }

      function node_sort(compare) {
        return this.eachBefore(function (node) {
          if (node.children) {
            node.children.sort(compare);
          }
        });
      }

      function node_path(end) {
        var start = this,
          ancestor = leastCommonAncestor(start, end),
          nodes = [start];
        while (start !== ancestor) {
          start = start.parent;
          nodes.push(start);
        }
        var k = nodes.length;
        while (end !== ancestor) {
          nodes.splice(k, 0, end);
          end = end.parent;
        }
        return nodes;
      }

      function leastCommonAncestor(a, b) {
        if (a === b) return a;
        var aNodes = a.ancestors(),
          bNodes = b.ancestors(),
          c = null;
        a = aNodes.pop();
        b = bNodes.pop();
        while (a === b) {
          c = a;
          a = aNodes.pop();
          b = bNodes.pop();
        }
        return c;
      }

      function node_ancestors() {
        var node = this,
          nodes = [node];
        while ((node = node.parent)) {
          nodes.push(node);
        }
        return nodes;
      }

      function node_descendants() {
        var nodes = [];
        this.each(function (node) {
          nodes.push(node);
        });
        return nodes;
      }

      function node_leaves() {
        var leaves = [];
        this.eachBefore(function (node) {
          if (!node.children) {
            leaves.push(node);
          }
        });
        return leaves;
      }

      function node_links() {
        var root = this,
          links = [];
        root.each(function (node) {
          if (node !== root) {
            // Don’t include the root’s parent, if any.
            links.push({ source: node.parent, target: node });
          }
        });
        return links;
      }

      function hierarchy(data, children) {
        var root = new Node(data),
          valued = +data.value && (root.value = data.value),
          node,
          nodes = [root],
          child,
          childs,
          i,
          n;

        if (children == null) children = defaultChildren;

        while ((node = nodes.pop())) {
          if (valued) node.value = +node.data.value;
          if ((childs = children(node.data)) && (n = childs.length)) {
            node.children = new Array(n);
            for (i = n - 1; i >= 0; --i) {
              nodes.push((child = node.children[i] = new Node(childs[i])));
              child.parent = node;
              child.depth = node.depth + 1;
            }
          }
        }

        return root.eachBefore(computeHeight);
      }

      function node_copy() {
        return hierarchy(this).eachBefore(copyData);
      }

      function defaultChildren(d) {
        return d.children;
      }

      function copyData(node) {
        node.data = node.data.data;
      }

      function computeHeight(node) {
        var height = 0;
        do node.height = height;
        while ((node = node.parent) && node.height < ++height);
      }

      function Node(data) {
        this.data = data;
        this.depth = this.height = 0;
        this.parent = null;
      }

      Node.prototype = hierarchy.prototype = {
        constructor: Node,
        count: node_count,
        each: node_each,
        eachAfter: node_eachAfter,
        eachBefore: node_eachBefore,
        sum: node_sum,
        sort: node_sort,
        path: node_path,
        ancestors: node_ancestors,
        descendants: node_descendants,
        leaves: node_leaves,
        links: node_links,
        copy: node_copy,
      };
      var version = '2.1.2';
      var packageInfo = {
        version: version,
      };

      var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };

      var createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();

      var inherits = function (subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
          throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
      };

      var possibleConstructorReturn = function (self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
      };

      var slicedToArray = (function () {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i['return']) _i['return']();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          }
        };
      })();

      var version$1 = packageInfo.version;

      var defaults$1 = Object.freeze({
        children: function children(data) {
          return data.children;
        },
        nodeSize: function nodeSize(node) {
          return node.data.size;
        },
        spacing: 0,
      });

      // Create a layout function with customizable options. Per D3-style, the
      // options can be set at any time using setter methods. The layout function
      // will compute the tree node positions based on the options in effect at the
      // time it is called.
      function flextree(options) {
        var opts = Object.assign({}, defaults$1, options);
        function accessor(name$$1) {
          var opt = opts[name$$1];
          return typeof opt === 'function'
            ? opt
            : function () {
                return opt;
              };
        }

        function layout(tree) {
          var wtree = wrap(getWrapper(), tree, function (node) {
            return node.children;
          });
          wtree.update();
          return wtree.data;
        }

        function getFlexNode() {
          var nodeSize = accessor('nodeSize');
          var _spacing = accessor('spacing');
          return (function (_hierarchy$prototype$) {
            inherits(FlexNode, _hierarchy$prototype$);

            function FlexNode(data) {
              classCallCheck(this, FlexNode);
              return possibleConstructorReturn(this, (FlexNode.__proto__ || Object.getPrototypeOf(FlexNode)).call(this, data));
            }

            createClass(
              FlexNode,
              [
                {
                  key: 'copy',
                  value: function copy() {
                    var c = wrap(this.constructor, this, function (node) {
                      return node.children;
                    });
                    c.each(function (node) {
                      return (node.data = node.data.data);
                    });
                    return c;
                  },
                },
                {
                  key: 'spacing',
                  value: function spacing(oNode) {
                    return _spacing(this, oNode);
                  },
                },
                {
                  key: 'size',
                  get: function get$$1() {
                    return nodeSize(this);
                  },
                },
                {
                  key: 'nodes',
                  get: function get$$1() {
                    return this.descendants();
                  },
                },
                {
                  key: 'xSize',
                  get: function get$$1() {
                    return this.size[0];
                  },
                },
                {
                  key: 'ySize',
                  get: function get$$1() {
                    return this.size[1];
                  },
                },
                {
                  key: 'top',
                  get: function get$$1() {
                    return this.y;
                  },
                },
                {
                  key: 'bottom',
                  get: function get$$1() {
                    return this.y + this.ySize;
                  },
                },
                {
                  key: 'left',
                  get: function get$$1() {
                    return this.x - this.xSize / 2;
                  },
                },
                {
                  key: 'right',
                  get: function get$$1() {
                    return this.x + this.xSize / 2;
                  },
                },
                {
                  key: 'root',
                  get: function get$$1() {
                    var ancs = this.ancestors();
                    return ancs[ancs.length - 1];
                  },
                },
                {
                  key: 'numChildren',
                  get: function get$$1() {
                    return this.hasChildren ? this.children.length : 0;
                  },
                },
                {
                  key: 'hasChildren',
                  get: function get$$1() {
                    return !this.noChildren;
                  },
                },
                {
                  key: 'noChildren',
                  get: function get$$1() {
                    return this.children === null;
                  },
                },
                {
                  key: 'firstChild',
                  get: function get$$1() {
                    return this.hasChildren ? this.children[0] : null;
                  },
                },
                {
                  key: 'lastChild',
                  get: function get$$1() {
                    return this.hasChildren ? this.children[this.numChildren - 1] : null;
                  },
                },
                {
                  key: 'extents',
                  get: function get$$1() {
                    return (this.children || []).reduce(function (acc, kid) {
                      return FlexNode.maxExtents(acc, kid.extents);
                    }, this.nodeExtents);
                  },
                },
                {
                  key: 'nodeExtents',
                  get: function get$$1() {
                    return {
                      top: this.top,
                      bottom: this.bottom,
                      left: this.left,
                      right: this.right,
                    };
                  },
                },
              ],
              [
                {
                  key: 'maxExtents',
                  value: function maxExtents(e0, e1) {
                    return {
                      top: Math.min(e0.top, e1.top),
                      bottom: Math.max(e0.bottom, e1.bottom),
                      left: Math.min(e0.left, e1.left),
                      right: Math.max(e0.right, e1.right),
                    };
                  },
                },
              ],
            );
            return FlexNode;
          })(hierarchy.prototype.constructor);
        }

        function getWrapper() {
          var FlexNode = getFlexNode();
          var nodeSize = accessor('nodeSize');
          var _spacing2 = accessor('spacing');
          return (function (_FlexNode) {
            inherits(_class, _FlexNode);

            function _class(data) {
              classCallCheck(this, _class);

              var _this2 = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, data));

              Object.assign(_this2, {
                x: 0,
                y: 0,
                relX: 0,
                prelim: 0,
                shift: 0,
                change: 0,
                lExt: _this2,
                lExtRelX: 0,
                lThr: null,
                rExt: _this2,
                rExtRelX: 0,
                rThr: null,
              });
              return _this2;
            }

            createClass(_class, [
              {
                key: 'spacing',
                value: function spacing(oNode) {
                  return _spacing2(this.data, oNode.data);
                },
              },
              {
                key: 'update',
                value: function update() {
                  layoutChildren(this);
                  resolveX(this);
                  return this;
                },
              },
              {
                key: 'size',
                get: function get$$1() {
                  return nodeSize(this.data);
                },
              },
              {
                key: 'x',
                get: function get$$1() {
                  return this.data.x;
                },
                set: function set$$1(v) {
                  this.data.x = v;
                },
              },
              {
                key: 'y',
                get: function get$$1() {
                  return this.data.y;
                },
                set: function set$$1(v) {
                  this.data.y = v;
                },
              },
            ]);
            return _class;
          })(FlexNode);
        }

        function wrap(FlexClass, treeData, children) {
          var _wrap = function _wrap(data, parent) {
            var node = new FlexClass(data);
            Object.assign(node, {
              parent: parent,
              depth: parent === null ? 0 : parent.depth + 1,
              height: 0,
              length: 1,
            });
            var kidsData = children(data) || [];
            node.children =
              kidsData.length === 0
                ? null
                : kidsData.map(function (kd) {
                    return _wrap(kd, node);
                  });
            if (node.children) {
              Object.assign(
                node,
                node.children.reduce(function (hl, kid) {
                  return {
                    height: Math.max(hl.height, kid.height + 1),
                    length: hl.length + kid.length,
                  };
                }, node),
              );
            }
            return node;
          };
          return _wrap(treeData, null);
        }

        Object.assign(layout, {
          nodeSize: function nodeSize(arg) {
            return arguments.length ? ((opts.nodeSize = arg), layout) : opts.nodeSize;
          },
          spacing: function spacing(arg) {
            return arguments.length ? ((opts.spacing = arg), layout) : opts.spacing;
          },
          children: function children(arg) {
            return arguments.length ? ((opts.children = arg), layout) : opts.children;
          },
          hierarchy: function hierarchy(treeData, children) {
            var kids = typeof children === 'undefined' ? opts.children : children;
            return wrap(getFlexNode(), treeData, kids);
          },
          dump: function dump(tree) {
            var nodeSize = accessor('nodeSize');
            var _dump = function _dump(i0) {
              return function (node) {
                var i1 = i0 + '  ';
                var i2 = i0 + '    ';
                var x = node.x,
                  y = node.y;

                var size = nodeSize(node);
                var kids = node.children || [];
                var kdumps = kids.length === 0 ? ' ' : ',' + i1 + 'children: [' + i2 + kids.map(_dump(i2)).join(i2) + i1 + '],' + i0;
                return '{ size: [' + size.join(', ') + '],' + i1 + 'x: ' + x + ', y: ' + y + kdumps + '},';
              };
            };
            return _dump('\n')(tree);
          },
        });
        return layout;
      }
      flextree.version = version$1;

      var layoutChildren = function layoutChildren(w) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        w.y = y;
        (w.children || []).reduce(
          function (acc, kid) {
            var _acc = slicedToArray(acc, 2),
              i = _acc[0],
              lastLows = _acc[1];

            layoutChildren(kid, w.y + w.ySize);
            // The lowest vertical coordinate while extreme nodes still point
            // in current subtree.
            var lowY = (i === 0 ? kid.lExt : kid.rExt).bottom;
            if (i !== 0) separate(w, i, lastLows);
            var lows = updateLows(lowY, i, lastLows);
            return [i + 1, lows];
          },
          [0, null],
        );
        shiftChange(w);
        positionRoot(w);
        return w;
      };

      // Resolves the relative coordinate properties - relX and prelim --
      // to set the final, absolute x coordinate for each node. This also sets
      // `prelim` to 0, so that `relX` for each node is its x-coordinate relative
      // to its parent.
      var resolveX = function resolveX(w, prevSum, parentX) {
        // A call to resolveX without arguments is assumed to be for the root of
        // the tree. This will set the root's x-coord to zero.
        if (typeof prevSum === 'undefined') {
          prevSum = -w.relX - w.prelim;
          parentX = 0;
        }
        var sum = prevSum + w.relX;
        w.relX = sum + w.prelim - parentX;
        w.prelim = 0;
        w.x = parentX + w.relX;
        (w.children || []).forEach(function (k) {
          return resolveX(k, sum, w.x);
        });
        return w;
      };

      // Process shift and change for all children, to add intermediate spacing to
      // each child's modifier.
      var shiftChange = function shiftChange(w) {
        (w.children || []).reduce(
          function (acc, child) {
            var _acc2 = slicedToArray(acc, 2),
              lastShiftSum = _acc2[0],
              lastChangeSum = _acc2[1];

            var shiftSum = lastShiftSum + child.shift;
            var changeSum = lastChangeSum + shiftSum + child.change;
            child.relX += changeSum;
            return [shiftSum, changeSum];
          },
          [0, 0],
        );
      };

      // Separates the latest child from its previous sibling
      /* eslint-disable complexity */
      var separate = function separate(w, i, lows) {
        var lSib = w.children[i - 1];
        var curSubtree = w.children[i];
        var rContour = lSib;
        var rSumMods = lSib.relX;
        var lContour = curSubtree;
        var lSumMods = curSubtree.relX;
        var isFirst = true;
        while (rContour && lContour) {
          if (rContour.bottom > lows.lowY) lows = lows.next;
          // How far to the left of the right side of rContour is the left side
          // of lContour? First compute the center-to-center distance, then add
          // the "spacing"
          var dist = rSumMods + rContour.prelim - (lSumMods + lContour.prelim) + rContour.xSize / 2 + lContour.xSize / 2 + rContour.spacing(lContour);
          if (dist > 0 || (dist < 0 && isFirst)) {
            lSumMods += dist;
            // Move subtree by changing relX.
            moveSubtree$1(curSubtree, dist);
            distributeExtra(w, i, lows.index, dist);
          }
          isFirst = false;
          // Advance highest node(s) and sum(s) of modifiers
          var rightBottom = rContour.bottom;
          var leftBottom = lContour.bottom;
          if (rightBottom <= leftBottom) {
            rContour = nextRContour(rContour);
            if (rContour) rSumMods += rContour.relX;
          }
          if (rightBottom >= leftBottom) {
            lContour = nextLContour(lContour);
            if (lContour) lSumMods += lContour.relX;
          }
        }
        // Set threads and update extreme nodes. In the first case, the
        // current subtree is taller than the left siblings.
        if (!rContour && lContour) setLThr(w, i, lContour, lSumMods);
        // In the next case, the left siblings are taller than the current subtree
        else if (rContour && !lContour) setRThr(w, i, rContour, rSumMods);
      };
      /* eslint-enable complexity */

      // Move subtree by changing relX.
      var moveSubtree$1 = function moveSubtree(subtree, distance) {
        subtree.relX += distance;
        subtree.lExtRelX += distance;
        subtree.rExtRelX += distance;
      };

      var distributeExtra = function distributeExtra(w, curSubtreeI, leftSibI, dist) {
        var curSubtree = w.children[curSubtreeI];
        var n = curSubtreeI - leftSibI;
        // Are there intermediate children?
        if (n > 1) {
          var delta = dist / n;
          w.children[leftSibI + 1].shift += delta;
          curSubtree.shift -= delta;
          curSubtree.change -= dist - delta;
        }
      };

      var nextLContour = function nextLContour(w) {
        return w.hasChildren ? w.firstChild : w.lThr;
      };

      var nextRContour = function nextRContour(w) {
        return w.hasChildren ? w.lastChild : w.rThr;
      };

      var setLThr = function setLThr(w, i, lContour, lSumMods) {
        var firstChild = w.firstChild;
        var lExt = firstChild.lExt;
        var curSubtree = w.children[i];
        lExt.lThr = lContour;
        // Change relX so that the sum of modifier after following thread is correct.
        var diff = lSumMods - lContour.relX - firstChild.lExtRelX;
        lExt.relX += diff;
        // Change preliminary x coordinate so that the node does not move.
        lExt.prelim -= diff;
        // Update extreme node and its sum of modifiers.
        firstChild.lExt = curSubtree.lExt;
        firstChild.lExtRelX = curSubtree.lExtRelX;
      };

      // Mirror image of setLThr.
      var setRThr = function setRThr(w, i, rContour, rSumMods) {
        var curSubtree = w.children[i];
        var rExt = curSubtree.rExt;
        var lSib = w.children[i - 1];
        rExt.rThr = rContour;
        var diff = rSumMods - rContour.relX - curSubtree.rExtRelX;
        rExt.relX += diff;
        rExt.prelim -= diff;
        curSubtree.rExt = lSib.rExt;
        curSubtree.rExtRelX = lSib.rExtRelX;
      };

      // Position root between children, taking into account their modifiers
      var positionRoot = function positionRoot(w) {
        if (w.hasChildren) {
          var k0 = w.firstChild;
          var kf = w.lastChild;
          var prelim = (k0.prelim + k0.relX - k0.xSize / 2 + kf.relX + kf.prelim + kf.xSize / 2) / 2;
          Object.assign(w, {
            prelim: prelim,
            lExt: k0.lExt,
            lExtRelX: k0.lExtRelX,
            rExt: kf.rExt,
            rExtRelX: kf.rExtRelX,
          });
        }
      };

      // Make/maintain a linked list of the indexes of left siblings and their
      // lowest vertical coordinate.
      var updateLows = function updateLows(lowY, index, lastLows) {
        // Remove siblings that are hidden by the new subtree.
        while (lastLows !== null && lowY >= lastLows.lowY) {
          lastLows = lastLows.next;
        } // Prepend the new subtree.
        return {
          lowY: lowY,
          index: index,
          next: lastLows,
        };
      };

      exports.flextree = flextree;

      Object.defineProperty(exports, '__esModule', { value: true });
    });
  })(d3Flextree$1, d3Flextree$1.exports);
  return d3Flextree$1.exports;
}

function constant(x) {
  return function constant() {
    return x;
  };
}

const abs = Math.abs;
const atan2 = Math.atan2;
const cos = Math.cos;
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const sqrt = Math.sqrt;

const epsilon$1 = 1e-12;
const pi$1 = Math.PI;
const halfPi = pi$1 / 2;
const tau$1 = 2 * pi$1;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi$1 : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

const pi = Math.PI,
  tau = 2 * pi,
  epsilon = 1e-6,
  tauEpsilon = tau - epsilon;

function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}

function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k = 10 ** d;
  return function (strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}

class Path {
  constructor(digits) {
    this._x0 =
      this._y0 = // start of current subpath
      this._x1 =
      this._y1 =
        null; // end of current subpath
    this._ = '';
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x, y) {
    this._append`M${(this._x0 = this._x1 = +x)},${(this._y0 = this._y1 = +y)}`;
  }
  closePath() {
    if (this._x1 !== null) {
      ((this._x1 = this._x0), (this._y1 = this._y0));
      this._append`Z`;
    }
  }
  lineTo(x, y) {
    this._append`L${(this._x1 = +x)},${(this._y1 = +y)}`;
  }
  quadraticCurveTo(x1, y1, x, y) {
    this._append`Q${+x1},${+y1},${(this._x1 = +x)},${(this._y1 = +y)}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${(this._x1 = +x)},${(this._y1 = +y)}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    ((x1 = +x1), (y1 = +y1), (x2 = +x2), (y2 = +y2), (r = +r));

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let x0 = this._x1,
      y0 = this._y1,
      x21 = x2 - x1,
      y21 = y2 - y1,
      x01 = x0 - x1,
      y01 = y0 - y1,
      l01_2 = x01 * x01 + y01 * y01;

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._append`M${(this._x1 = x1)},${(this._y1 = y1)}`;
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      this._append`L${(this._x1 = x1)},${(this._y1 = y1)}`;
    }

    // Otherwise, draw an arc!
    else {
      let x20 = x2 - x0,
        y20 = y2 - y0,
        l21_2 = x21 * x21 + y21 * y21,
        l20_2 = x20 * x20 + y20 * y20,
        l21 = Math.sqrt(l21_2),
        l01 = Math.sqrt(l01_2),
        l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
        t01 = l / l01,
        t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }

      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${(this._x1 = x1 + t21 * x21)},${(this._y1 = y1 + t21 * y21)}`;
    }
  }
  arc(x, y, r, a0, a1, ccw) {
    ((x = +x), (y = +y), (r = +r), (ccw = !!ccw));

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let dx = r * Math.cos(a0),
      dy = r * Math.sin(a0),
      x0 = x + dx,
      y0 = y + dy,
      cw = 1 ^ ccw,
      da = ccw ? a0 - a1 : a1 - a0;

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._append`L${x0},${y0}`;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = (da % tau) + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${(this._x1 = x0)},${(this._y1 = y0)}`;
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._append`A${r},${r},0,${+(da >= pi)},${cw},${(this._x1 = x + r * Math.cos(a1))},${(this._y1 = y + r * Math.sin(a1))}`;
    }
  }
  rect(x, y, w, h) {
    this._append`M${(this._x0 = this._x1 = +x)},${(this._y0 = this._y1 = +y)}h${(w = +w)}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
}

function withPath(shape) {
  let digits = 3;

  shape.digits = function (_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };

  return () => new Path(digits);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0,
    y10 = y1 - y0,
    x32 = x3 - x2,
    y32 = y3 - y2,
    t = y32 * x10 - x32 * y10;
  if (t * t < epsilon$1) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
    y01 = y0 - y1,
    lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
    ox = lo * y01,
    oy = -lo * x01,
    x11 = x0 + ox,
    y11 = y0 + oy,
    x10 = x1 + ox,
    y10 = y1 + oy,
    x00 = (x11 + x10) / 2,
    y00 = (y11 + y10) / 2,
    dx = x10 - x11,
    dy = y10 - y11,
    d2 = dx * dx + dy * dy,
    r = r1 - rc,
    D = x11 * y10 - x10 * y11,
    d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
    cx0 = (D * dy - dx * d) / d2,
    cy0 = (-D * dx - dy * d) / d2,
    cx1 = (D * dy + dx * d) / d2,
    cy1 = (-D * dx + dy * d) / d2,
    dx0 = cx0 - x00,
    dy0 = cy0 - y00,
    dx1 = cx1 - x00,
    dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) ((cx0 = cx1), (cy0 = cy1));

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1),
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
    outerRadius = arcOuterRadius,
    cornerRadius = constant(0),
    padRadius = null,
    startAngle = arcStartAngle,
    endAngle = arcEndAngle,
    padAngle = arcPadAngle,
    context = null,
    path = withPath(arc);

  function arc() {
    var buffer,
      r,
      r0 = +innerRadius.apply(this, arguments),
      r1 = +outerRadius.apply(this, arguments),
      a0 = startAngle.apply(this, arguments) - halfPi,
      a1 = endAngle.apply(this, arguments) - halfPi,
      da = abs(a1 - a0),
      cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) ((r = r1), (r1 = r0), (r0 = r));

    // Is it a point?
    if (!(r1 > epsilon$1)) context.moveTo(0, 0);
    // Or is it a circle or annulus?
    else if (da > tau$1 - epsilon$1) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon$1) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
        a11 = a1,
        a00 = a0,
        a10 = a1,
        da0 = da,
        da1 = da,
        ap = padAngle.apply(this, arguments) / 2,
        rp = ap > epsilon$1 && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
        rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
        rc0 = rc,
        rc1 = rc,
        t0,
        t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon$1) {
        var p0 = asin((rp / r0) * sin(ap)),
          p1 = asin((rp / r1) * sin(ap));
        if ((da0 -= p0 * 2) > epsilon$1) ((p0 *= cw ? 1 : -1), (a00 += p0), (a10 -= p0));
        else ((da0 = 0), (a00 = a10 = (a0 + a1) / 2));
        if ((da1 -= p1 * 2) > epsilon$1) ((p1 *= cw ? 1 : -1), (a01 += p1), (a11 -= p1));
        else ((da1 = 0), (a01 = a11 = (a0 + a1) / 2));
      }

      var x01 = r1 * cos(a01),
        y01 = r1 * sin(a01),
        x10 = r0 * cos(a10),
        y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > epsilon$1) {
        var x11 = r1 * cos(a11),
          y11 = r1 * sin(a11),
          x00 = r0 * cos(a00),
          y00 = r0 * sin(a00),
          oc;

        // Restrict the corner radius according to the sector angle. If this
        // intersection fails, it’s probably because the arc is too small, so
        // disable the corner radius entirely.
        if (da < pi$1) {
          if ((oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
            var ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = min(rc, (r0 - lc) / (kc - 1));
            rc1 = min(rc, (r1 - lc) / (kc + 1));
          } else {
            rc0 = rc1 = 0;
          }
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon$1)) context.moveTo(x01, y01);
      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon$1) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else (context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw));

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon$1) || !(da0 > epsilon$1)) context.lineTo(x10, y10);
      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon$1) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return ((context = null), buffer + '' || null);
  }

  arc.centroid = function () {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
      a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$1 / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function (_) {
    return arguments.length ? ((innerRadius = typeof _ === 'function' ? _ : constant(+_)), arc) : innerRadius;
  };

  arc.outerRadius = function (_) {
    return arguments.length ? ((outerRadius = typeof _ === 'function' ? _ : constant(+_)), arc) : outerRadius;
  };

  arc.cornerRadius = function (_) {
    return arguments.length ? ((cornerRadius = typeof _ === 'function' ? _ : constant(+_)), arc) : cornerRadius;
  };

  arc.padRadius = function (_) {
    return arguments.length ? ((padRadius = _ == null ? null : typeof _ === 'function' ? _ : constant(+_)), arc) : padRadius;
  };

  arc.startAngle = function (_) {
    return arguments.length ? ((startAngle = typeof _ === 'function' ? _ : constant(+_)), arc) : startAngle;
  };

  arc.endAngle = function (_) {
    return arguments.length ? ((endAngle = typeof _ === 'function' ? _ : constant(+_)), arc) : endAngle;
  };

  arc.padAngle = function (_) {
    return arguments.length ? ((padAngle = typeof _ === 'function' ? _ : constant(+_)), arc) : padAngle;
  };

  arc.context = function (_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

var slice = Array.prototype.slice;

function array(x) {
  return typeof x === 'object' && 'length' in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2; // falls through
      default:
        this._context.lineTo(x, y);
        break;
    }
  },
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line(x$1, y$1) {
  var defined = constant(true),
    context = null,
    curve = curveLinear,
    output = null,
    path = withPath(line);

  x$1 = typeof x$1 === 'function' ? x$1 : x$1 === undefined ? x : constant(x$1);
  y$1 = typeof y$1 === 'function' ? y$1 : y$1 === undefined ? y : constant(y$1);

  function line(data) {
    var i,
      n = (data = array(data)).length,
      d,
      defined0 = false,
      buffer;

    if (context == null) output = curve((buffer = path()));

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined((d = data[i]), i, data)) === defined0) {
        if ((defined0 = !defined0)) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }

    if (buffer) return ((output = null), buffer + '' || null);
  }

  line.x = function (_) {
    return arguments.length ? ((x$1 = typeof _ === 'function' ? _ : constant(+_)), line) : x$1;
  };

  line.y = function (_) {
    return arguments.length ? ((y$1 = typeof _ === 'function' ? _ : constant(+_)), line) : y$1;
  };

  line.defined = function (_) {
    return arguments.length ? ((defined = typeof _ === 'function' ? _ : constant(!!_)), line) : defined;
  };

  line.curve = function (_) {
    return arguments.length ? ((curve = _), context != null && (output = curve(context)), line) : curve;
  };

  line.context = function (_) {
    return arguments.length ? (_ == null ? (context = output = null) : (output = curve((context = _))), line) : context;
  };

  return line;
}

function area(x0, y0, y1) {
  var x1 = null,
    defined = constant(true),
    context = null,
    curve = curveLinear,
    output = null,
    path = withPath(area);

  x0 = typeof x0 === 'function' ? x0 : x0 === undefined ? x : constant(+x0);
  y0 = typeof y0 === 'function' ? y0 : y0 === undefined ? constant(0) : constant(+y0);
  y1 = typeof y1 === 'function' ? y1 : y1 === undefined ? y : constant(+y1);

  function area(data) {
    var i,
      j,
      k,
      n = (data = array(data)).length,
      d,
      defined0 = false,
      buffer,
      x0z = new Array(n),
      y0z = new Array(n);

    if (context == null) output = curve((buffer = path()));

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined((d = data[i]), i, data)) === defined0) {
        if ((defined0 = !defined0)) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        ((x0z[i] = +x0(d, i, data)), (y0z[i] = +y0(d, i, data)));
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return ((output = null), buffer + '' || null);
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function (_) {
    return arguments.length ? ((x0 = typeof _ === 'function' ? _ : constant(+_)), (x1 = null), area) : x0;
  };

  area.x0 = function (_) {
    return arguments.length ? ((x0 = typeof _ === 'function' ? _ : constant(+_)), area) : x0;
  };

  area.x1 = function (_) {
    return arguments.length ? ((x1 = _ == null ? null : typeof _ === 'function' ? _ : constant(+_)), area) : x1;
  };

  area.y = function (_) {
    return arguments.length ? ((y0 = typeof _ === 'function' ? _ : constant(+_)), (y1 = null), area) : y0;
  };

  area.y0 = function (_) {
    return arguments.length ? ((y0 = typeof _ === 'function' ? _ : constant(+_)), area) : y0;
  };

  area.y1 = function (_) {
    return arguments.length ? ((y1 = _ == null ? null : typeof _ === 'function' ? _ : constant(+_)), area) : y1;
  };

  area.lineX0 = area.lineY0 = function () {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function () {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function () {
    return arealine().x(x1).y(y0);
  };

  area.defined = function (_) {
    return arguments.length ? ((defined = typeof _ === 'function' ? _ : constant(!!_)), area) : defined;
  };

  area.curve = function (_) {
    return arguments.length ? ((curve = _), context != null && (output = curve(context)), area) : curve;
  };

  area.context = function (_) {
    return arguments.length ? (_ == null ? (context = output = null) : (output = curve((context = _))), area) : context;
  };

  return area;
}

function descending$1(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity(d) {
  return d;
}

function pie() {
  var value = identity,
    sortValues = descending$1,
    sort = null,
    startAngle = constant(0),
    endAngle = constant(tau$1),
    padAngle = constant(0);

  function pie(data) {
    var i,
      n = (data = array(data)).length,
      j,
      k,
      sum = 0,
      index = new Array(n),
      arcs = new Array(n),
      a0 = +startAngle.apply(this, arguments),
      da = Math.min(tau$1, Math.max(-tau$1, endAngle.apply(this, arguments) - a0)),
      a1,
      p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
      pa = p * (da < 0 ? -1 : 1),
      v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[(index[i] = i)] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null)
      index.sort(function (i, j) {
        return sortValues(arcs[i], arcs[j]);
      });
    else if (sort != null)
      index.sort(function (i, j) {
        return sort(data[i], data[j]);
      });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      ((j = index[i]),
        (v = arcs[j]),
        (a1 = a0 + (v > 0 ? v * k : 0) + pa),
        (arcs[j] = {
          data: data[j],
          index: i,
          value: v,
          startAngle: a0,
          endAngle: a1,
          padAngle: p,
        }));
    }

    return arcs;
  }

  pie.value = function (_) {
    return arguments.length ? ((value = typeof _ === 'function' ? _ : constant(+_)), pie) : value;
  };

  pie.sortValues = function (_) {
    return arguments.length ? ((sortValues = _), (sort = null), pie) : sortValues;
  };

  pie.sort = function (_) {
    return arguments.length ? ((sort = _), (sortValues = null), pie) : sort;
  };

  pie.startAngle = function (_) {
    return arguments.length ? ((startAngle = typeof _ === 'function' ? _ : constant(+_)), pie) : startAngle;
  };

  pie.endAngle = function (_) {
    return arguments.length ? ((endAngle = typeof _ === 'function' ? _ : constant(+_)), pie) : endAngle;
  };

  pie.padAngle = function (_) {
    return arguments.length ? ((padAngle = typeof _ === 'function' ? _ : constant(+_)), pie) : padAngle;
  };

  return pie;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function () {
    this._curve.areaStart();
  },
  areaEnd: function () {
    this._curve.areaEnd();
  },
  lineStart: function () {
    this._curve.lineStart();
  },
  lineEnd: function () {
    this._curve.lineEnd();
  },
  point: function (a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  },
};

function curveRadial(curve) {
  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  ((l.angle = l.x), delete l.x);
  ((l.radius = l.y), delete l.y);

  l.curve = function (_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

function areaRadial() {
  var a = area().curve(curveRadialLinear),
    c = a.curve,
    x0 = a.lineX0,
    x1 = a.lineX1,
    y0 = a.lineY0,
    y1 = a.lineY1;

  ((a.angle = a.x), delete a.x);
  ((a.startAngle = a.x0), delete a.x0);
  ((a.endAngle = a.x1), delete a.x1);
  ((a.radius = a.y), delete a.y);
  ((a.innerRadius = a.y0), delete a.y0);
  ((a.outerRadius = a.y1), delete a.y1);
  ((a.lineStartAngle = function () {
    return lineRadial(x0());
  }),
    delete a.lineX0);
  ((a.lineEndAngle = function () {
    return lineRadial(x1());
  }),
    delete a.lineX1);
  ((a.lineInnerRadius = function () {
    return lineRadial(y0());
  }),
    delete a.lineY0);
  ((a.lineOuterRadius = function () {
    return lineRadial(y1());
  }),
    delete a.lineY1);

  a.curve = function (_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos((x -= Math.PI / 2)), y * Math.sin(x)];
}

class Bump {
  constructor(context, x) {
    this._context = context;
    this._x = x;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line) this._context.lineTo(x, y);
        else this._context.moveTo(x, y);
        break;
      }
      case 1:
        this._point = 2; // falls through
      default: {
        if (this._x) this._context.bezierCurveTo((this._x0 = (this._x0 + x) / 2), this._y0, this._x0, y, x, y);
        else this._context.bezierCurveTo(this._x0, (this._y0 = (this._y0 + y) / 2), x, this._y0, x, y);
        break;
      }
    }
    ((this._x0 = x), (this._y0 = y));
  }
}

class BumpRadial {
  constructor(context) {
    this._context = context;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {}
  point(x, y) {
    ((x = +x), (y = +y));
    if (this._point === 0) {
      this._point = 1;
    } else {
      const p0 = pointRadial(this._x0, this._y0);
      const p1 = pointRadial(this._x0, (this._y0 = (this._y0 + y) / 2));
      const p2 = pointRadial(x, this._y0);
      const p3 = pointRadial(x, y);
      this._context.moveTo(...p0);
      this._context.bezierCurveTo(...p1, ...p2, ...p3);
    }
    ((this._x0 = x), (this._y0 = y));
  }
}

function bumpX(context) {
  return new Bump(context, true);
}

function bumpY(context) {
  return new Bump(context, false);
}

function bumpRadial(context) {
  return new BumpRadial(context);
}

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  let source = linkSource,
    target = linkTarget,
    x$1 = x,
    y$1 = y,
    context = null,
    output = null,
    path = withPath(link);

  function link() {
    let buffer;
    const argv = slice.call(arguments);
    const s = source.apply(this, argv);
    const t = target.apply(this, argv);
    if (context == null) output = curve((buffer = path()));
    output.lineStart();
    ((argv[0] = s), output.point(+x$1.apply(this, argv), +y$1.apply(this, argv)));
    ((argv[0] = t), output.point(+x$1.apply(this, argv), +y$1.apply(this, argv)));
    output.lineEnd();
    if (buffer) return ((output = null), buffer + '' || null);
  }

  link.source = function (_) {
    return arguments.length ? ((source = _), link) : source;
  };

  link.target = function (_) {
    return arguments.length ? ((target = _), link) : target;
  };

  link.x = function (_) {
    return arguments.length ? ((x$1 = typeof _ === 'function' ? _ : constant(+_)), link) : x$1;
  };

  link.y = function (_) {
    return arguments.length ? ((y$1 = typeof _ === 'function' ? _ : constant(+_)), link) : y$1;
  };

  link.context = function (_) {
    return arguments.length ? (_ == null ? (context = output = null) : (output = curve((context = _))), link) : context;
  };

  return link;
}

function linkHorizontal() {
  return link(bumpX);
}

function linkVertical() {
  return link(bumpY);
}

function linkRadial() {
  const l = link(bumpRadial);
  ((l.angle = l.x), delete l.x);
  ((l.radius = l.y), delete l.y);
  return l;
}

const sqrt3$2 = sqrt(3);

var asterisk = {
  draw(context, size) {
    const r = sqrt(size + min(size / 28, 0.75)) * 0.59436;
    const t = r / 2;
    const u = t * sqrt3$2;
    context.moveTo(0, r);
    context.lineTo(0, -r);
    context.moveTo(-u, -t);
    context.lineTo(u, t);
    context.moveTo(-u, t);
    context.lineTo(u, -t);
  },
};

var circle = {
  draw(context, size) {
    const r = sqrt(size / pi$1);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$1);
  },
};

var cross = {
  draw(context, size) {
    const r = sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  },
};

const tan30 = sqrt(1 / 3);
const tan30_2 = tan30 * 2;

var diamond = {
  draw(context, size) {
    const y = sqrt(size / tan30_2);
    const x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  },
};

var diamond2 = {
  draw(context, size) {
    const r = sqrt(size) * 0.62625;
    context.moveTo(0, -r);
    context.lineTo(r, 0);
    context.lineTo(0, r);
    context.lineTo(-r, 0);
    context.closePath();
  },
};

var plus = {
  draw(context, size) {
    const r = sqrt(size - min(size / 7, 2)) * 0.87559;
    context.moveTo(-r, 0);
    context.lineTo(r, 0);
    context.moveTo(0, r);
    context.lineTo(0, -r);
  },
};

var square = {
  draw(context, size) {
    const w = sqrt(size);
    const x = -w / 2;
    context.rect(x, x, w, w);
  },
};

var square2 = {
  draw(context, size) {
    const r = sqrt(size) * 0.4431;
    context.moveTo(r, r);
    context.lineTo(r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, r);
    context.closePath();
  },
};

const ka = 0.8908130915292852281;
const kr = sin(pi$1 / 10) / sin((7 * pi$1) / 10);
const kx = sin(tau$1 / 10) * kr;
const ky = -cos(tau$1 / 10) * kr;

var star = {
  draw(context, size) {
    const r = sqrt(size * ka);
    const x = kx * r;
    const y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (let i = 1; i < 5; ++i) {
      const a = (tau$1 * i) / 5;
      const c = cos(a);
      const s = sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  },
};

const sqrt3$1 = sqrt(3);

var triangle = {
  draw(context, size) {
    const y = -sqrt(size / (sqrt3$1 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3$1 * y, -y);
    context.lineTo(sqrt3$1 * y, -y);
    context.closePath();
  },
};

const sqrt3 = sqrt(3);

var triangle2 = {
  draw(context, size) {
    const s = sqrt(size) * 0.6824;
    const t = s / 2;
    const u = (s * sqrt3) / 2; // cos(Math.PI / 6)
    context.moveTo(0, -s);
    context.lineTo(u, t);
    context.lineTo(-u, t);
    context.closePath();
  },
};

const c = -0.5;
const s = sqrt(3) / 2;
const k = 1 / sqrt(12);
const a = (k / 2 + 1) * 3;

var wye = {
  draw(context, size) {
    const r = sqrt(size / a);
    const x0 = r / 2,
      y0 = r * k;
    const x1 = x0,
      y1 = r * k + r;
    const x2 = -x1,
      y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  },
};

var times = {
  draw(context, size) {
    const r = sqrt(size - min(size / 6, 1.7)) * 0.6189;
    context.moveTo(-r, -r);
    context.lineTo(r, r);
    context.moveTo(-r, r);
    context.lineTo(r, -r);
  },
};

// These symbols are designed to be filled.
const symbolsFill = [circle, cross, diamond, square, star, triangle, wye];

// These symbols are designed to be stroked (with a width of 1.5px and round caps).
const symbolsStroke = [circle, plus, times, triangle2, asterisk, square2, diamond2];

function Symbol$1(type, size) {
  let context = null,
    path = withPath(symbol);

  type = typeof type === 'function' ? type : constant(type || circle);
  size = typeof size === 'function' ? size : constant(size === undefined ? 64 : +size);

  function symbol() {
    let buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return ((context = null), buffer + '' || null);
  }

  symbol.type = function (_) {
    return arguments.length ? ((type = typeof _ === 'function' ? _ : constant(_)), symbol) : type;
  };

  symbol.size = function (_) {
    return arguments.length ? ((size = typeof _ === 'function' ? _ : constant(+_)), symbol) : size;
  };

  symbol.context = function (_) {
    return arguments.length ? ((context = _ == null ? null : _), symbol) : context;
  };

  return symbol;
}

function noop() {}

function point$3(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6,
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        point$3(this, this._x1, this._y1); // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // falls through
      default:
        point$3(this, x, y);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = x));
    ((this._y0 = this._y1), (this._y1 = y));
  },
};

function basis(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0:
        this._point = 1;
        ((this._x2 = x), (this._y2 = y));
        break;
      case 1:
        this._point = 2;
        ((this._x3 = x), (this._y3 = y));
        break;
      case 2:
        this._point = 3;
        ((this._x4 = x), (this._y4 = y));
        this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
        break;
      default:
        point$3(this, x, y);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = x));
    ((this._y0 = this._y1), (this._y1 = y));
  },
};

function basisClosed(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x) / 6,
          y0 = (this._y0 + 4 * this._y1 + y) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4; // falls through
      default:
        point$3(this, x, y);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = x));
    ((this._y0 = this._y1), (this._y1 = y));
  },
};

function basisOpen(context) {
  return new BasisOpen(context);
}

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function () {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function () {
    var x = this._x,
      y = this._y,
      j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
        y0 = y[0],
        dx = x[j] - x0,
        dy = y[j] - y0,
        i = -1,
        t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function (x, y) {
    this._x.push(+x);
    this._y.push(+y);
  },
};

var bundle = (function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function (beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$2(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2,
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point$2(this, this._x1, this._y1);
        break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        ((this._x1 = x), (this._y1 = y));
        break;
      case 2:
        this._point = 3; // falls through
      default:
        point$2(this, x, y);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = this._x2), (this._x2 = x));
    ((this._y0 = this._y1), (this._y1 = this._y2), (this._y2 = y));
  },
};

var cardinal = (function custom(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0:
        this._point = 1;
        ((this._x3 = x), (this._y3 = y));
        break;
      case 1:
        this._point = 2;
        this._context.moveTo((this._x4 = x), (this._y4 = y));
        break;
      case 2:
        this._point = 3;
        ((this._x5 = x), (this._y5 = y));
        break;
      default:
        point$2(this, x, y);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = this._x2), (this._x2 = x));
    ((this._y0 = this._y1), (this._y1 = this._y2), (this._y2 = y));
  },
};

var cardinalClosed = (function custom(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4; // falls through
      default:
        point$2(this, x, y);
        break;
    }
    ((this._x0 = this._x1), (this._x1 = this._x2), (this._x2 = x));
    ((this._y0 = this._y1), (this._y1 = this._y2), (this._y2 = y));
  },
};

var cardinalOpen = (function custom(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function point$1(that, x, y) {
  var x1 = that._x1,
    y1 = that._y1,
    x2 = that._x2,
    y2 = that._y2;

  if (that._l01_a > epsilon$1) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
      n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon$1) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
      m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    ((x = +x), (y = +y));

    if (this._point) {
      var x23 = this._x2 - x,
        y23 = this._y2 - y;
      this._l23_a = Math.sqrt((this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha)));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3; // falls through
      default:
        point$1(this, x, y);
        break;
    }

    ((this._l01_a = this._l12_a), (this._l12_a = this._l23_a));
    ((this._l01_2a = this._l12_2a), (this._l12_2a = this._l23_2a));
    ((this._x0 = this._x1), (this._x1 = this._x2), (this._x2 = x));
    ((this._y0 = this._y1), (this._y1 = this._y2), (this._y2 = y));
  },
};

var catmullRom = (function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function (x, y) {
    ((x = +x), (y = +y));

    if (this._point) {
      var x23 = this._x2 - x,
        y23 = this._y2 - y;
      this._l23_a = Math.sqrt((this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha)));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        ((this._x3 = x), (this._y3 = y));
        break;
      case 1:
        this._point = 2;
        this._context.moveTo((this._x4 = x), (this._y4 = y));
        break;
      case 2:
        this._point = 3;
        ((this._x5 = x), (this._y5 = y));
        break;
      default:
        point$1(this, x, y);
        break;
    }

    ((this._l01_a = this._l12_a), (this._l12_a = this._l23_a));
    ((this._l01_2a = this._l12_2a), (this._l12_2a = this._l23_2a));
    ((this._x0 = this._x1), (this._x1 = this._x2), (this._x2 = x));
    ((this._y0 = this._y1), (this._y1 = this._y2), (this._y2 = y));
  },
};

var catmullRomClosed = (function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    ((x = +x), (y = +y));

    if (this._point) {
      var x23 = this._x2 - x,
        y23 = this._y2 - y;
      this._l23_a = Math.sqrt((this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha)));
    }

    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4; // falls through
      default:
        point$1(this, x, y);
        break;
    }

    ((this._l01_a = this._l12_a), (this._l12_a = this._l23_a));
    ((this._l01_2a = this._l12_2a), (this._l12_2a = this._l23_2a));
    ((this._x0 = this._x1), (this._x1 = this._x2), (this._x2 = x));
    ((this._y0 = this._y1), (this._y1 = this._y2), (this._y2 = y));
  },
};

var catmullRomOpen = (function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._point) this._context.closePath();
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    if (this._point) this._context.lineTo(x, y);
    else ((this._point = 1), this._context.moveTo(x, y));
  },
};

function linearClosed(context) {
  return new LinearClosed(context);
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
    h1 = x2 - that._x1,
    s0 = (that._y1 - that._y0) / (h0 || (h1 < 0 && -0)),
    s1 = (y2 - that._y1) / (h1 || (h0 < 0 && -0)),
    p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? ((3 * (that._y1 - that._y0)) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
  var x0 = that._x0,
    y0 = that._y0,
    x1 = that._x1,
    y1 = that._y1,
    dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    var t1 = NaN;

    ((x = +x), (y = +y));
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point(this, slope2(this, (t1 = slope3(this, x, y))), t1);
        break;
      default:
        point(this, this._t0, (t1 = slope3(this, x, y)));
        break;
    }

    ((this._x0 = this._x1), (this._x1 = x));
    ((this._y0 = this._y1), (this._y1 = y));
    this._t0 = t1;
  },
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function (x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function (x, y) {
    this._context.moveTo(y, x);
  },
  closePath: function () {
    this._context.closePath();
  },
  lineTo: function (x, y) {
    this._context.lineTo(y, x);
  },
  bezierCurveTo: function (x1, y1, x2, y2, x, y) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
  },
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x = [];
    this._y = [];
  },
  lineEnd: function () {
    var x = this._x,
      y = this._y,
      n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
          py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function (x, y) {
    this._x.push(+x);
    this._y.push(+y);
  },
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
    n = x.length - 1,
    m,
    a = new Array(n),
    b = new Array(n),
    r = new Array(n);
  ((a[0] = 0), (b[0] = 2), (r[0] = x[0] + 2 * x[1]));
  for (i = 1; i < n - 1; ++i) ((a[i] = 1), (b[i] = 4), (r[i] = 4 * x[i] + 2 * x[i + 1]));
  ((a[n - 1] = 2), (b[n - 1] = 7), (r[n - 1] = 8 * x[n - 1] + x[n]));
  for (i = 1; i < n; ++i) ((m = a[i] / b[i - 1]), (b[i] -= m), (r[i] -= m * r[i - 1]));
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

function natural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) ((this._t = 1 - this._t), (this._line = 1 - this._line));
  },
  point: function (x, y) {
    ((x = +x), (y = +y));
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2; // falls through
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    ((this._x = x), (this._y = y));
  },
};

function step(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

function none$1(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    ((s0 = s1), (s1 = series[order[i]]));
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function none(series) {
  var n = series.length,
    o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}

function stack() {
  var keys = constant([]),
    order = none,
    offset = none$1,
    value = stackValue;

  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries),
      i,
      n = sz.length,
      j = -1,
      oz;

    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }

    for (i = 0, oz = array(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function (_) {
    return arguments.length ? ((keys = typeof _ === 'function' ? _ : constant(Array.from(_))), stack) : keys;
  };

  stack.value = function (_) {
    return arguments.length ? ((value = typeof _ === 'function' ? _ : constant(+_)), stack) : value;
  };

  stack.order = function (_) {
    return arguments.length ? ((order = _ == null ? none : typeof _ === 'function' ? _ : constant(Array.from(_))), stack) : order;
  };

  stack.offset = function (_) {
    return arguments.length ? ((offset = _ == null ? none$1 : _), stack) : offset;
  };

  return stack;
}

function expand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none$1(series, order);
}

function diverging(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
        ((d[0] = yp), (d[1] = yp += dy));
      } else if (dy < 0) {
        ((d[1] = yn), (d[0] = yn += dy));
      } else {
        ((d[0] = 0), (d[1] = dy));
      }
    }
  }
}

function silhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none$1(series, order);
}

function wiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
        sij0 = si[j][1] || 0,
        sij1 = si[j - 1][1] || 0,
        s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
          skj0 = sk[j][1] || 0,
          skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      ((s1 += sij0), (s2 += s3 * sij0));
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none$1(series, order);
}

function appearance(series) {
  var peaks = series.map(peak);
  return none(series).sort(function (a, b) {
    return peaks[a] - peaks[b];
  });
}

function peak(series) {
  var i = -1,
    j = 0,
    n = series.length,
    vi,
    vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) ((vj = vi), (j = i));
  return j;
}

function ascending(series) {
  var sums = series.map(sum);
  return none(series).sort(function (a, b) {
    return sums[a] - sums[b];
  });
}

function sum(series) {
  var s = 0,
    i = -1,
    n = series.length,
    v;
  while (++i < n) if ((v = +series[i][1])) s += v;
  return s;
}

function descending(series) {
  return ascending(series).reverse();
}

function insideOut(series) {
  var n = series.length,
    i,
    j,
    sums = series.map(sum),
    order = appearance(series),
    top = 0,
    bottom = 0,
    tops = [],
    bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
}

function reverse(series) {
  return none(series).reverse();
}

var src = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  arc: arc,
  area: area,
  areaRadial: areaRadial,
  curveBasis: basis,
  curveBasisClosed: basisClosed,
  curveBasisOpen: basisOpen,
  curveBumpX: bumpX,
  curveBumpY: bumpY,
  curveBundle: bundle,
  curveCardinal: cardinal,
  curveCardinalClosed: cardinalClosed,
  curveCardinalOpen: cardinalOpen,
  curveCatmullRom: catmullRom,
  curveCatmullRomClosed: catmullRomClosed,
  curveCatmullRomOpen: catmullRomOpen,
  curveLinear: curveLinear,
  curveLinearClosed: linearClosed,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural: natural,
  curveStep: step,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore,
  line: line,
  lineRadial: lineRadial$1,
  link: link,
  linkHorizontal: linkHorizontal,
  linkRadial: linkRadial,
  linkVertical: linkVertical,
  pie: pie,
  pointRadial: pointRadial,
  radialArea: areaRadial,
  radialLine: lineRadial$1,
  stack: stack,
  stackOffsetDiverging: diverging,
  stackOffsetExpand: expand,
  stackOffsetNone: none$1,
  stackOffsetSilhouette: silhouette,
  stackOffsetWiggle: wiggle,
  stackOrderAppearance: appearance,
  stackOrderAscending: ascending,
  stackOrderDescending: descending,
  stackOrderInsideOut: insideOut,
  stackOrderNone: none,
  stackOrderReverse: reverse,
  symbol: Symbol$1,
  symbolAsterisk: asterisk,
  symbolCircle: circle,
  symbolCross: cross,
  symbolDiamond: diamond,
  symbolDiamond2: diamond2,
  symbolPlus: plus,
  symbolSquare: square,
  symbolSquare2: square2,
  symbolStar: star,
  symbolTimes: times,
  symbolTriangle: triangle,
  symbolTriangle2: triangle2,
  symbolWye: wye,
  symbolX: times,
  symbols: symbolsFill,
  symbolsFill: symbolsFill,
  symbolsStroke: symbolsStroke,
});

var require$$5 = /*@__PURE__*/ getAugmentedNamespace(src);

var d3OrgChart_min = d3OrgChart_min$1.exports;

var hasRequiredD3OrgChart_min;

function requireD3OrgChart_min() {
  if (hasRequiredD3OrgChart_min) return d3OrgChart_min$1.exports;
  hasRequiredD3OrgChart_min = 1;
  (function (module, exports) {
    !(function (t, e) {
      e(exports, require$$0, require$$1, require$$2, require$$3, requireD3Flextree(), require$$5);
    })(d3OrgChart_min, function (t, n, e, a, i, r, o) {
      const u = {
        selection: n.selection,
        select: n.select,
        max: e.max,
        min: e.min,
        sum: e.sum,
        cumsum: e.cumsum,
        tree: a.tree,
        stratify: a.stratify,
        zoom: i.zoom,
        zoomIdentity: i.zoomIdentity,
        linkHorizontal: o.linkHorizontal,
        flextree: r.flextree,
      };
      ((t.OrgChart = class {
        constructor() {
          const a = {
            id: 'ID' + Math.floor(1e6 * Math.random()),
            firstDraw: true,
            ctx: document.createElement('canvas').getContext('2d'),
            initialExpandLevel: 1,
            nodeDefaultBackground: 'none',
            lastTransform: { x: 0, y: 0, k: 1 },
            allowedNodesCount: {},
            zoomBehavior: null,
            generateRoot: null,
            svgWidth: 800,
            svgHeight: window.innerHeight - 100,
            container: 'body',
            data: null,
            connections: [],
            defaultFont: 'Helvetica',
            nodeId: t => t.nodeId || t.id,
            parentNodeId: t => t.parentNodeId || t.parentId,
            rootMargin: 40,
            nodeWidth: t => 250,
            nodeHeight: t => 150,
            neighbourMargin: (t, e) => 80,
            siblingsMargin: t => 20,
            childrenMargin: t => 60,
            compactMarginPair: t => 100,
            compactMarginBetween: t => 20,
            nodeButtonWidth: t => 40,
            nodeButtonHeight: t => 40,
            nodeButtonX: t => -20,
            nodeButtonY: t => -20,
            linkYOffset: 30,
            pagingStep: t => 5,
            minPagingVisibleNodes: t => 2e3,
            scaleExtent: [0.001, 20],
            duration: 400,
            imageName: 'Chart',
            setActiveNodeCentered: true,
            layout: 'top',
            compact: true,
            createZoom: t => u.zoom(),
            onZoomStart: t => {},
            onZoom: t => {},
            onZoomEnd: t => {},
            onNodeClick: t => t,
            onExpandOrCollapse: t => t,
            nodeContent: t => `<div style="padding:5px;font-size:10px;">Sample Node(id=${t.id}), override using <br/> 
            <code>chart.nodeContent({data}=>{ <br/>
             &nbsp;&nbsp;&nbsp;&nbsp;return '' // Custom HTML <br/>
             })</code>
             <br/> 
             Or check different <a href="https://github.com/bumbeishvili/org-chart#jump-to-examples" target="_blank">layout examples</a>
             </div>`,
            buttonContent: ({ node: e, state: t }) => {
              return `<div style="border:1px solid #E4E2E9;border-radius:3px;padding:3px;font-size:9px;margin:auto auto;background-color:white"> ${{
                left: t =>
                  t
                    ? `<div style="display:flex;"><span style="align-items:center;display:flex;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.283 3.50094L6.51 11.4749C6.37348 11.615 6.29707 11.8029 6.29707 11.9984C6.29707 12.194 6.37348 12.3819 6.51 12.5219L14.283 20.4989C14.3466 20.5643 14.4226 20.6162 14.5066 20.6516C14.5906 20.6871 14.6808 20.7053 14.772 20.7053C14.8632 20.7053 14.9534 20.6871 15.0374 20.6516C15.1214 20.6162 15.1974 20.5643 15.261 20.4989C15.3918 20.365 15.4651 20.1852 15.4651 19.9979C15.4651 19.8107 15.3918 19.6309 15.261 19.4969L7.9515 11.9984L15.261 4.50144C15.3914 4.36756 15.4643 4.18807 15.4643 4.00119C15.4643 3.81431 15.3914 3.63482 15.261 3.50094C15.1974 3.43563 15.1214 3.38371 15.0374 3.34827C14.9534 3.31282 14.8632 3.29456 14.772 3.29456C14.6808 3.29456 14.5906 3.31282 14.5066 3.34827C14.4226 3.38371 14.3466 3.43563 14.283 3.50094V3.50094Z" fill="#716E7B" stroke="#716E7B"/>
                      </svg></span><span style="color:#716E7B">${e.data._directSubordinatesPaging} </span></div>`
                    : `<div style="display:flex;"><span style="align-items:center;display:flex;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.989 3.49944C7.85817 3.63339 7.78492 3.8132 7.78492 4.00044C7.78492 4.18768 7.85817 4.36749 7.989 4.50144L15.2985 11.9999L7.989 19.4969C7.85817 19.6309 7.78492 19.8107 7.78492 19.9979C7.78492 20.1852 7.85817 20.365 7.989 20.4989C8.05259 20.5643 8.12863 20.6162 8.21261 20.6516C8.2966 20.6871 8.38684 20.7053 8.478 20.7053C8.56916 20.7053 8.6594 20.6871 8.74338 20.6516C8.82737 20.6162 8.90341 20.5643 8.967 20.4989L16.74 12.5234C16.8765 12.3834 16.9529 12.1955 16.9529 11.9999C16.9529 11.8044 16.8765 11.6165 16.74 11.4764L8.967 3.50094C8.90341 3.43563 8.82737 3.38371 8.74338 3.34827C8.6594 3.31282 8.56916 3.29456 8.478 3.29456C8.38684 3.29456 8.2966 3.31282 8.21261 3.34827C8.12863 3.38371 8.05259 3.43563 7.989 3.50094V3.49944Z" fill="#716E7B" stroke="#716E7B"/>
                          </svg></span><span style="color:#716E7B">${e.data._directSubordinatesPaging} </span></div>`,
                bottom: t =>
                  t
                    ? `<div style="display:flex;"><span style="align-items:center;display:flex;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M19.497 7.98903L12 15.297L4.503 7.98903C4.36905 7.85819 4.18924 7.78495 4.002 7.78495C3.81476 7.78495 3.63495 7.85819 3.501 7.98903C3.43614 8.05257 3.38462 8.12842 3.34944 8.21213C3.31427 8.29584 3.29615 8.38573 3.29615 8.47653C3.29615 8.56733 3.31427 8.65721 3.34944 8.74092C3.38462 8.82463 3.43614 8.90048 3.501 8.96403L11.4765 16.74C11.6166 16.8765 11.8044 16.953 12 16.953C12.1956 16.953 12.3834 16.8765 12.5235 16.74L20.499 8.96553C20.5643 8.90193 20.6162 8.8259 20.6517 8.74191C20.6871 8.65792 20.7054 8.56769 20.7054 8.47653C20.7054 8.38537 20.6871 8.29513 20.6517 8.21114C20.6162 8.12715 20.5643 8.05112 20.499 7.98753C20.3651 7.85669 20.1852 7.78345 19.998 7.78345C19.8108 7.78345 19.6309 7.85669 19.497 7.98753V7.98903Z" fill="#716E7B" stroke="#716E7B"/>
                       </svg></span><span style="margin-left:1px;color:#716E7B" >${e.data._directSubordinatesPaging} </span></div>
                       `
                    : `<div style="display:flex;"><span style="align-items:center;display:flex;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M11.457 8.07005L3.49199 16.4296C3.35903 16.569 3.28485 16.7543 3.28485 16.9471C3.28485 17.1398 3.35903 17.3251 3.49199 17.4646L3.50099 17.4736C3.56545 17.5414 3.64304 17.5954 3.72904 17.6324C3.81504 17.6693 3.90765 17.6883 4.00124 17.6883C4.09483 17.6883 4.18745 17.6693 4.27344 17.6324C4.35944 17.5954 4.43703 17.5414 4.50149 17.4736L12.0015 9.60155L19.4985 17.4736C19.563 17.5414 19.6405 17.5954 19.7265 17.6324C19.8125 17.6693 19.9052 17.6883 19.9987 17.6883C20.0923 17.6883 20.1849 17.6693 20.2709 17.6324C20.3569 17.5954 20.4345 17.5414 20.499 17.4736L20.508 17.4646C20.641 17.3251 20.7151 17.1398 20.7151 16.9471C20.7151 16.7543 20.641 16.569 20.508 16.4296L12.543 8.07005C12.4729 7.99653 12.3887 7.93801 12.2954 7.89801C12.202 7.85802 12.1015 7.8374 12 7.8374C11.8984 7.8374 11.798 7.85802 11.7046 7.89801C11.6113 7.93801 11.527 7.99653 11.457 8.07005Z" fill="#716E7B" stroke="#716E7B"/>
                       </svg></span><span style="margin-left:1px;color:#716E7B" >${e.data._directSubordinatesPaging} </span></div>
                    `,
                right: t =>
                  t
                    ? `<div style="display:flex;"><span style="align-items:center;display:flex;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M7.989 3.49944C7.85817 3.63339 7.78492 3.8132 7.78492 4.00044C7.78492 4.18768 7.85817 4.36749 7.989 4.50144L15.2985 11.9999L7.989 19.4969C7.85817 19.6309 7.78492 19.8107 7.78492 19.9979C7.78492 20.1852 7.85817 20.365 7.989 20.4989C8.05259 20.5643 8.12863 20.6162 8.21261 20.6516C8.2966 20.6871 8.38684 20.7053 8.478 20.7053C8.56916 20.7053 8.6594 20.6871 8.74338 20.6516C8.82737 20.6162 8.90341 20.5643 8.967 20.4989L16.74 12.5234C16.8765 12.3834 16.9529 12.1955 16.9529 11.9999C16.9529 11.8044 16.8765 11.6165 16.74 11.4764L8.967 3.50094C8.90341 3.43563 8.82737 3.38371 8.74338 3.34827C8.6594 3.31282 8.56916 3.29456 8.478 3.29456C8.38684 3.29456 8.2966 3.31282 8.21261 3.34827C8.12863 3.38371 8.05259 3.43563 7.989 3.50094V3.49944Z" fill="#716E7B" stroke="#716E7B"/>
                       </svg></span><span style="color:#716E7B">${e.data._directSubordinatesPaging} </span></div>`
                    : `<div style="display:flex;"><span style="align-items:center;display:flex;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M14.283 3.50094L6.51 11.4749C6.37348 11.615 6.29707 11.8029 6.29707 11.9984C6.29707 12.194 6.37348 12.3819 6.51 12.5219L14.283 20.4989C14.3466 20.5643 14.4226 20.6162 14.5066 20.6516C14.5906 20.6871 14.6808 20.7053 14.772 20.7053C14.8632 20.7053 14.9534 20.6871 15.0374 20.6516C15.1214 20.6162 15.1974 20.5643 15.261 20.4989C15.3918 20.365 15.4651 20.1852 15.4651 19.9979C15.4651 19.8107 15.3918 19.6309 15.261 19.4969L7.9515 11.9984L15.261 4.50144C15.3914 4.36756 15.4643 4.18807 15.4643 4.00119C15.4643 3.81431 15.3914 3.63482 15.261 3.50094C15.1974 3.43563 15.1214 3.38371 15.0374 3.34827C14.9534 3.31282 14.8632 3.29456 14.772 3.29456C14.6808 3.29456 14.5906 3.31282 14.5066 3.34827C14.4226 3.38371 14.3466 3.43563 14.283 3.50094V3.50094Z" fill="#716E7B" stroke="#716E7B"/>
                       </svg></span><span style="color:#716E7B">${e.data._directSubordinatesPaging} </span></div>`,
                top: t =>
                  t
                    ? `<div style="display:flex;"><span style="align-items:center;display:flex;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.457 8.07005L3.49199 16.4296C3.35903 16.569 3.28485 16.7543 3.28485 16.9471C3.28485 17.1398 3.35903 17.3251 3.49199 17.4646L3.50099 17.4736C3.56545 17.5414 3.64304 17.5954 3.72904 17.6324C3.81504 17.6693 3.90765 17.6883 4.00124 17.6883C4.09483 17.6883 4.18745 17.6693 4.27344 17.6324C4.35944 17.5954 4.43703 17.5414 4.50149 17.4736L12.0015 9.60155L19.4985 17.4736C19.563 17.5414 19.6405 17.5954 19.7265 17.6324C19.8125 17.6693 19.9052 17.6883 19.9987 17.6883C20.0923 17.6883 20.1849 17.6693 20.2709 17.6324C20.3569 17.5954 20.4345 17.5414 20.499 17.4736L20.508 17.4646C20.641 17.3251 20.7151 17.1398 20.7151 16.9471C20.7151 16.7543 20.641 16.569 20.508 16.4296L12.543 8.07005C12.4729 7.99653 12.3887 7.93801 12.2954 7.89801C12.202 7.85802 12.1015 7.8374 12 7.8374C11.8984 7.8374 11.798 7.85802 11.7046 7.89801C11.6113 7.93801 11.527 7.99653 11.457 8.07005Z" fill="#716E7B" stroke="#716E7B"/>
                        </svg></span><span style="margin-left:1px;color:#716E7B">${e.data._directSubordinatesPaging} </span></div>
                        `
                    : `<div style="display:flex;"><span style="align-items:center;display:flex;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.497 7.98903L12 15.297L4.503 7.98903C4.36905 7.85819 4.18924 7.78495 4.002 7.78495C3.81476 7.78495 3.63495 7.85819 3.501 7.98903C3.43614 8.05257 3.38462 8.12842 3.34944 8.21213C3.31427 8.29584 3.29615 8.38573 3.29615 8.47653C3.29615 8.56733 3.31427 8.65721 3.34944 8.74092C3.38462 8.82463 3.43614 8.90048 3.501 8.96403L11.4765 16.74C11.6166 16.8765 11.8044 16.953 12 16.953C12.1956 16.953 12.3834 16.8765 12.5235 16.74L20.499 8.96553C20.5643 8.90193 20.6162 8.8259 20.6517 8.74191C20.6871 8.65792 20.7054 8.56769 20.7054 8.47653C20.7054 8.38537 20.6871 8.29513 20.6517 8.21114C20.6162 8.12715 20.5643 8.05112 20.499 7.98753C20.3651 7.85669 20.1852 7.78345 19.998 7.78345C19.8108 7.78345 19.6309 7.85669 19.497 7.98753V7.98903Z" fill="#716E7B" stroke="#716E7B"/>
                        </svg></span><span style="margin-left:1px;color:#716E7B">${e.data._directSubordinatesPaging} </span></div>
                    `,
              }[t.layout](e.children)}  </div>`;
            },
            pagingButton: (t, e, a, n) => {
              var n = n.pagingStep(t.parent),
                i = t.parent.data._pagingStep,
                t = t.parent.data._directSubordinatesPaging - i;
              return `
                   <div style="margin-top:90px;">
                      <div style="display:flex;width:170px;border-radius:20px;padding:5px 15px; padding-bottom:4px;;background-color:#E5E9F2">
                      <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM16 6H18V18H16V6Z" fill="#716E7B" stroke="#716E7B"/>
                      </svg>
                      </div><div style="line-height:2"> Show next ${Math.min(t, n)}  nodes </div></div>
                   </div>
                `;
            },
            nodeUpdate: function (t, e, a) {
              u.select(this)
                .select('.node-rect')
                .attr('stroke', t => (t.data._highlighted || t.data._upToTheRootHighlighted ? '#E27396' : 'none'))
                .attr('stroke-width', t.data._highlighted || t.data._upToTheRootHighlighted ? 10 : 1);
            },
            nodeEnter: t => t,
            nodeExit: t => t,
            linkUpdate: function (t, e, a) {
              (u
                .select(this)
                .attr('stroke', t => (t.data._upToTheRootHighlighted ? '#E27396' : '#E4E2E9'))
                .attr('stroke-width', t => (t.data._upToTheRootHighlighted ? 5 : 1)),
                t.data._upToTheRootHighlighted && u.select(this).raise());
            },
            hdiagonal: function (t, e, a) {
              var n = t.x,
                t = t.y,
                i = e.x,
                e = e.y,
                o = a && null != a.x ? a.x : n,
                a = a && null != a.y ? a.y : t,
                r = i - n < 0 ? -1 : 1,
                d = e - t < 0 ? -1 : 1,
                s = Math.abs(i - n) / 2 < 35 ? Math.abs(i - n) / 2 : 35,
                s = Math.abs(e - t) / 2 < s ? Math.abs(e - t) / 2 : s,
                l = Math.abs(i - n) / 2 - s;
              return `
                          M ${o} ${a}
                          L ${o} ${t}
                          L ${n} ${t}
                          L ${n + l * r} ${t}
                          C ${n + l * r + s * r} ${t} 
                            ${n + l * r + s * r} ${t} 
                            ${n + l * r + s * r} ${t + s * d}
                          L ${n + l * r + s * r} ${e - s * d} 
                          C ${n + l * r + s * r}  ${e} 
                            ${n + l * r + s * r}  ${e} 
                            ${i - l * r}  ${e}
                          L ${i} ${e}
               `;
            },
            diagonal: function (t, e, a, n = { sy: 0 }) {
              var i = t.x,
                t = t.y,
                o = e.x,
                e = e.y,
                r = a && null != a.x ? a.x : i,
                a = a && null != a.y ? a.y : t,
                d = o - i < 0 ? -1 : 1,
                s = e - t < 0 ? -1 : 1,
                n = ((t += n.sy), Math.abs(o - i) / 2 < 35 ? Math.abs(o - i) / 2 : 35),
                n = Math.abs(e - t) / 2 < n ? Math.abs(e - t) / 2 : n,
                l = Math.abs(e - t) / 2 - n;
              return `
                          M ${r} ${a}
                          L ${i} ${a}
                          L ${i} ${t}
                          L ${i} ${t + l * s}
                          C  ${i} ${t + l * s + n * s} ${i} ${t + l * s + n * s} ${i + n * d} ${t + l * s + n * s}
                          L ${i + (Math.abs(o - i) - 2 * n) * d + n * d} ${t + l * s + n * s}
                          C  ${o}  ${t + l * s + n * s} ${o}  ${t + l * s + n * s} ${o} ${e - l * s}
                          L ${o} ${e}
               `;
            },
            defs: function (a, t) {
              return `<defs>
                    ${t
                      .map(t => {
                        var e = this.getTextWidth(t.label, { ctx: a.ctx, fontSize: 2, defaultFont: a.defaultFont });
                        return `
                       <marker id="${t.from + '_' + t.to}" refX="${t._source.x < t._target.x ? -7 : 7}" refY="5" markerWidth="500"  markerHeight="500"  orient="${t._source.x < t._target.x ? 'auto' : 'auto-start-reverse'}" >
                       <rect rx=0.5 width=${t.label ? e + 3 : 0} height=3 y=1  fill="#E27396"></rect>
                       <text font-size="2px" x=1 fill="white" y=3>${t.label || ''}</text>
                       </marker>

                       <marker id="arrow-${t.from + '_' + t.to}"  markerWidth="500"  markerHeight="500"  refY="2"  refX="1" orient="${t._source.x < t._target.x ? 'auto' : 'auto-start-reverse'}" >
                       <path transform="translate(0)" d='M0,0 V4 L2,2 Z' fill='#E27396' />
                       </marker>
                    `;
                      })
                      .join('')}
                    </defs>
                    `;
            },
            connectionsUpdate: function (t, e, a) {
              u.select(this)
                .attr('stroke', t => '#E27396')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', t => '5')
                .attr('pointer-events', 'none')
                .attr('marker-start', t => `url(#${t.from + '_' + t.to})`)
                .attr('marker-end', t => `url(#arrow-${t.from + '_' + t.to})`);
            },
            linkGroupArc: u
              .linkHorizontal()
              .x(t => t.x)
              .y(t => t.y),
            layoutBindings: {
              left: {
                nodeLeftX: t => 0,
                nodeRightX: t => t.width,
                nodeTopY: t => -t.height / 2,
                nodeBottomY: t => t.height / 2,
                nodeJoinX: t => t.x + t.width,
                nodeJoinY: t => t.y - t.height / 2,
                linkJoinX: t => t.x + t.width,
                linkJoinY: t => t.y,
                linkX: t => t.x,
                linkY: t => t.y,
                linkCompactXStart: t => t.x + t.width / 2,
                linkCompactYStart: t => t.y + (t.compactEven ? t.height / 2 : -t.height / 2),
                compactLinkMidX: (t, e) => t.firstCompactNode.x,
                compactLinkMidY: (t, e) => t.firstCompactNode.y + t.firstCompactNode.flexCompactDim[0] / 4 + e.compactMarginPair(t) / 4,
                linkParentX: t => t.parent.x + t.parent.width,
                linkParentY: t => t.parent.y,
                buttonX: t => t.width,
                buttonY: t => t.height / 2,
                centerTransform: ({ rootMargin: t, centerY: e, scale: a }) => `translate(${t},${e}) scale(${a})`,
                compactDimension: { sizeColumn: t => t.height, sizeRow: t => t.width, reverse: t => t.slice().reverse() },
                nodeFlexSize: ({ height: t, width: e, siblingsMargin: a, childrenMargin: n, state: i, node: o }) => {
                  return i.compact && o.flexCompactDim ? [o.flexCompactDim[0], o.flexCompactDim[1]] : [t + a, e + n];
                },
                zoomTransform: ({ centerY: t, scale: e }) => `translate(0,${t}) scale(${e})`,
                diagonal: this.hdiagonal.bind(this),
                swap: t => {
                  var e = t.x;
                  ((t.x = t.y), (t.y = e));
                },
                nodeUpdateTransform: ({ x: t, y: e, height: a }) => `translate(${t},${e - a / 2})`,
              },
              top: {
                nodeLeftX: t => -t.width / 2,
                nodeRightX: t => t.width / 2,
                nodeTopY: t => 0,
                nodeBottomY: t => t.height,
                nodeJoinX: t => t.x - t.width / 2,
                nodeJoinY: t => t.y + t.height,
                linkJoinX: t => t.x,
                linkJoinY: t => t.y + t.height,
                linkCompactXStart: t => t.x + (t.compactEven ? t.width / 2 : -t.width / 2),
                linkCompactYStart: t => t.y + t.height / 2,
                compactLinkMidX: (t, e) => t.firstCompactNode.x + t.firstCompactNode.flexCompactDim[0] / 4 + e.compactMarginPair(t) / 4,
                compactLinkMidY: t => t.firstCompactNode.y,
                compactDimension: { sizeColumn: t => t.width, sizeRow: t => t.height, reverse: t => t },
                linkX: t => t.x,
                linkY: t => t.y,
                linkParentX: t => t.parent.x,
                linkParentY: t => t.parent.y + t.parent.height,
                buttonX: t => t.width / 2,
                buttonY: t => t.height,
                centerTransform: ({ rootMargin: t, scale: e, centerX: a }) => `translate(${a},${t}) scale(${e})`,
                nodeFlexSize: ({ height: t, width: e, siblingsMargin: a, childrenMargin: n, state: i, node: o }) => {
                  return i.compact && o.flexCompactDim ? [o.flexCompactDim[0], o.flexCompactDim[1]] : [e + a, t + n];
                },
                zoomTransform: ({ centerX: t, scale: e }) => `translate(${t},0}) scale(${e})`,
                diagonal: this.diagonal.bind(this),
                swap: t => {},
                nodeUpdateTransform: ({ x: t, y: e, width: a }) => `translate(${t - a / 2},${e})`,
              },
              bottom: {
                nodeLeftX: t => -t.width / 2,
                nodeRightX: t => t.width / 2,
                nodeTopY: t => -t.height,
                nodeBottomY: t => 0,
                nodeJoinX: t => t.x - t.width / 2,
                nodeJoinY: t => t.y - t.height - t.height,
                linkJoinX: t => t.x,
                linkJoinY: t => t.y - t.height,
                linkCompactXStart: t => t.x + (t.compactEven ? t.width / 2 : -t.width / 2),
                linkCompactYStart: t => t.y - t.height / 2,
                compactLinkMidX: (t, e) => t.firstCompactNode.x + t.firstCompactNode.flexCompactDim[0] / 4 + e.compactMarginPair(t) / 4,
                compactLinkMidY: t => t.firstCompactNode.y,
                linkX: t => t.x,
                linkY: t => t.y,
                compactDimension: { sizeColumn: t => t.width, sizeRow: t => t.height, reverse: t => t },
                linkParentX: t => t.parent.x,
                linkParentY: t => t.parent.y - t.parent.height,
                buttonX: t => t.width / 2,
                buttonY: t => 0,
                centerTransform: ({ rootMargin: t, scale: e, centerX: a, chartHeight: n }) => `translate(${a},${n - t}) scale(${e})`,
                nodeFlexSize: ({ height: t, width: e, siblingsMargin: a, childrenMargin: n, state: i, node: o }) => {
                  return i.compact && o.flexCompactDim ? [o.flexCompactDim[0], o.flexCompactDim[1]] : [e + a, t + n];
                },
                zoomTransform: ({ centerX: t, scale: e }) => `translate(${t},0}) scale(${e})`,
                diagonal: this.diagonal.bind(this),
                swap: t => {
                  t.y = -t.y;
                },
                nodeUpdateTransform: ({ x: t, y: e, width: a, height: n }) => `translate(${t - a / 2},${e - n})`,
              },
              right: {
                nodeLeftX: t => -t.width,
                nodeRightX: t => 0,
                nodeTopY: t => -t.height / 2,
                nodeBottomY: t => t.height / 2,
                nodeJoinX: t => t.x - t.width - t.width,
                nodeJoinY: t => t.y - t.height / 2,
                linkJoinX: t => t.x - t.width,
                linkJoinY: t => t.y,
                linkX: t => t.x,
                linkY: t => t.y,
                linkParentX: t => t.parent.x - t.parent.width,
                linkParentY: t => t.parent.y,
                buttonX: t => 0,
                buttonY: t => t.height / 2,
                linkCompactXStart: t => t.x - t.width / 2,
                linkCompactYStart: t => t.y + (t.compactEven ? t.height / 2 : -t.height / 2),
                compactLinkMidX: (t, e) => t.firstCompactNode.x,
                compactLinkMidY: (t, e) => t.firstCompactNode.y + t.firstCompactNode.flexCompactDim[0] / 4 + e.compactMarginPair(t) / 4,
                centerTransform: ({ rootMargin: t, centerY: e, scale: a, chartWidth: n }) => `translate(${n - t},${e}) scale(${a})`,
                nodeFlexSize: ({ height: t, width: e, siblingsMargin: a, childrenMargin: n, state: i, node: o }) => {
                  return i.compact && o.flexCompactDim ? [o.flexCompactDim[0], o.flexCompactDim[1]] : [t + a, e + n];
                },
                compactDimension: { sizeColumn: t => t.height, sizeRow: t => t.width, reverse: t => t.slice().reverse() },
                zoomTransform: ({ centerY: t, scale: e }) => `translate(0,${t}) scale(${e})`,
                diagonal: this.hdiagonal.bind(this),
                swap: t => {
                  var e = t.x;
                  ((t.x = -t.y), (t.y = e));
                },
                nodeUpdateTransform: ({ x: t, y: e, width: a, height: n }) => `translate(${t - a},${e - n / 2})`,
              },
            },
          };
          ((this.getChartState = () => a),
            Object.keys(a).forEach(e => {
              this[e] = function (t) {
                return arguments.length ? ((a[e] = t), this) : a[e];
              };
            }),
            this.initializeEnterExitUpdatePattern());
        }
        initializeEnterExitUpdatePattern() {
          u.selection.prototype.patternify = function (t) {
            var e = t.selector,
              a = t.tag,
              t = t.data || [e],
              t = this.selectAll('.' + e).data(t, (t, e) => ('object' == typeof t && t.id ? t.id : e));
            return (t.exit().remove(), (t = t.enter().append(a).merge(t)).attr('class', e), t);
          };
        }
        getNodeChildren({ data: t, children: e, _children: a }, n) {
          return (
            n.push(t),
            e &&
              e.forEach(t => {
                this.getNodeChildren(t, n);
              }),
            a &&
              a.forEach(t => {
                this.getNodeChildren(t, n);
              }),
            n
          );
        }
        initialZoom(t) {
          return ((this.getChartState().lastTransform.k = t), this);
        }
        render() {
          const o = this.getChartState();
          if (o.data && 0 != o.data.length) {
            var t = u.select(o.container),
              e = t.node().getBoundingClientRect();
            0 < e.width && (o.svgWidth = e.width);
            const a = { id: 'ID' + Math.floor(1e6 * Math.random()), chartWidth: o.svgWidth, chartHeight: o.svgHeight };
            (((o.calc = a).centerX = a.chartWidth / 2),
              (a.centerY = a.chartHeight / 2),
              o.firstDraw &&
                (((e = { zoom: null }).zoom = o
                  .createZoom()
                  .clickDistance(10)
                  .on('start', (t, e) => o.onZoomStart(t))
                  .on('end', (t, e) => o.onZoomEnd(t))
                  .on('zoom', (t, e) => {
                    (o.onZoom(t), this.zoomed(t, e));
                  })
                  .scaleExtent(o.scaleExtent)),
                (o.zoomBehavior = e.zoom)),
              (o.flexTreeLayout = r
                .flextree({
                  nodeSize: t => {
                    var e = o.nodeWidth(t),
                      a = o.nodeHeight(t),
                      n = o.siblingsMargin(t),
                      i = o.childrenMargin(t);
                    return o.layoutBindings[o.layout].nodeFlexSize({ state: o, node: t, width: e, height: a, siblingsMargin: n, childrenMargin: i });
                  },
                })
                .spacing((t, e) => (t.parent == e.parent ? 0 : o.neighbourMargin(t, e)))),
              this.setLayouts({ expandNodesFirst: false }));
            ((e = t.patternify({ tag: 'svg', selector: 'svg-chart-container' }).attr('width', o.svgWidth).attr('height', o.svgHeight).attr('font-family', o.defaultFont)),
              (t = (o.firstDraw && e.call(o.zoomBehavior).on('dblclick.zoom', null).attr('cursor', 'move'), (o.svg = e).patternify({ tag: 'g', selector: 'chart' }))));
            ((o.centerG = t.patternify({ tag: 'g', selector: 'center-group' })),
              (o.linksWrapper = o.centerG.patternify({ tag: 'g', selector: 'links-wrapper' })),
              (o.nodesWrapper = o.centerG.patternify({ tag: 'g', selector: 'nodes-wrapper' })),
              (o.connectionsWrapper = o.centerG.patternify({ tag: 'g', selector: 'connections-wrapper' })),
              (o.defsWrapper = e.patternify({ tag: 'g', selector: 'defs-wrapper' })),
              o.firstDraw &&
                o.centerG.attr('transform', () =>
                  o.layoutBindings[o.layout].centerTransform({
                    centerX: a.centerX,
                    centerY: a.centerY,
                    scale: o.lastTransform.k,
                    rootMargin: o.rootMargin,
                    root: o.root,
                    chartHeight: a.chartHeight,
                    chartWidth: a.chartWidth,
                  }),
                ),
              (o.chart = t),
              this.update(o.root),
              u.select(window).on('resize.' + o.id, () => {
                var t = u.select(o.container).node().getBoundingClientRect();
                o.svg.attr('width', t.width);
              }),
              o.firstDraw && (o.firstDraw = false));
          } else
            (console.log('ORG CHART - Data is empty'),
              o.container &&
                (n.select(o.container).select('.nodes-wrapper').remove(),
                n.select(o.container).select('.links-wrapper').remove(),
                n.select(o.container).select('.connections-wrapper').remove()));
          return this;
        }
        addNode(e) {
          const a = this.getChartState();
          var t, n;
          return (
            !e || (null != a.parentNodeId(e) && a.parentNodeId(e) != a.nodeId(e)) || 0 != a.data.length
              ? ((n = (t = a.generateRoot(a.data).descendants()).filter(({ data: t }) => a.nodeId(t).toString() === a.nodeId(e).toString())[0]),
                t.filter(({ data: t }) => a.nodeId(t).toString() === a.parentNodeId(e).toString())[0],
                n
                  ? console.log(`ORG CHART - ADD - Node with id "${a.nodeId(e)}" already exists in tree`)
                  : (e._centered && !e._expanded && (e._expanded = true), a.data.push(e), this.updateNodesState()))
              : (a.data.push(e), this.render()),
            this
          );
        }
        removeNode(e) {
          const a = this.getChartState();
          var t = a
            .generateRoot(a.data)
            .descendants()
            .filter(({ data: t }) => a.nodeId(t) == e)[0];
          return (
            t
              ? (t.descendants().forEach(t => (t.data._filteredOut = true)),
                (a.data = a.data.filter(t => !t._filteredOut)),
                0 == a.data.length ? this.render() : this.updateNodesState.bind(this)())
              : console.log(`ORG CHART - REMOVE - Node with id "${e}" not found in the tree`),
            this
          );
        }
        groupBy(t, a, e) {
          const n = {};
          return (
            t.forEach(t => {
              var e = a(t);
              (n[e] || (n[e] = []), n[e].push(t));
            }),
            Object.keys(n).forEach(t => {
              n[t] = e(n[t]);
            }),
            Object.entries(n)
          );
        }
        calculateCompactFlexDimensions(t) {
          const r = this.getChartState();
          (t.eachBefore(t => {
            ((t.firstCompact = null), (t.compactEven = null), (t.flexCompactDim = null), (t.firstCompactNode = null));
          }),
            t.eachBefore(t => {
              if (t.children && 1 < t.children.length) {
                const n = t.children.filter(t => !t.children);
                if (!(n.length < 2)) {
                  n.forEach((t, e) => {
                    (e || (t.firstCompact = true), (t.compactEven = !(e % 2)), (t.row = Math.floor(e / 2)));
                  });
                  var e = u.max(
                      n.filter(t => t.compactEven),
                      r.layoutBindings[r.layout].compactDimension.sizeColumn,
                    ),
                    a = u.max(
                      n.filter(t => !t.compactEven),
                      r.layoutBindings[r.layout].compactDimension.sizeColumn,
                    );
                  const i = 2 * Math.max(e, a);
                  e = this.groupBy(
                    n,
                    t => t.row,
                    t => u.max(t, t => r.layoutBindings[r.layout].compactDimension.sizeRow(t) + r.compactMarginBetween(t)),
                  );
                  const o = u.sum(e.map(t => t[1]));
                  (n.forEach(t => {
                    ((t.firstCompactNode = n[0]), t.firstCompact ? (t.flexCompactDim = [i + r.compactMarginPair(t), o - r.compactMarginBetween(t)]) : (t.flexCompactDim = [0, 0]));
                  }),
                    (t.flexCompactDim = null));
                }
              }
            }));
        }
        calculateCompactFlexPositions(t) {
          const r = this.getChartState();
          t.eachBefore(t => {
            if (t.children) {
              var e = t.children.filter(t => t.flexCompactDim);
              const n = e[0];
              if (n) {
                e.forEach((t, e, a) => {
                  (0 == e && (n.x -= n.flexCompactDim[0] / 2),
                    e & ((e % 2) - 1)
                      ? (t.x = n.x + 0.25 * n.flexCompactDim[0] - r.compactMarginPair(t) / 4)
                      : e && (t.x = n.x + 0.75 * n.flexCompactDim[0] + r.compactMarginPair(t) / 4));
                });
                var a = n.x + 0.5 * n.flexCompactDim[0];
                n.x = n.x + 0.25 * n.flexCompactDim[0] - r.compactMarginPair(n) / 4;
                const i = t.x - a;
                Math.abs(i) < 10 && e.forEach(t => (t.x += i));
                t = this.groupBy(
                  e,
                  t => t.row,
                  t => u.max(t, t => r.layoutBindings[r.layout].compactDimension.sizeRow(t)),
                );
                const o = u.cumsum(t.map(t => t[1] + r.compactMarginBetween(t)));
                e.forEach((t, e) => {
                  t.row ? (t.y = n.y + o[t.row - 1]) : (t.y = n.y);
                });
              }
            }
          });
        }
        update({ x0: a, y0: n, x: i = 0, y: o = 0, width: r, height: d }) {
          const s = this.getChartState();
          s.compact && this.calculateCompactFlexDimensions(s.root);
          var e = s.flexTreeLayout(s.root),
            t = (s.compact && this.calculateCompactFlexPositions(s.root), e.descendants()),
            e = e.descendants().slice(1),
            l = (t.forEach(s.layoutBindings[s.layout].swap), s.connections);
          const h = {},
            c = (s.allNodes.forEach(t => (h[s.nodeId(t.data)] = t)), {});
          (t.forEach(t => (c[s.nodeId(t.data)] = t)),
            l.forEach(t => {
              var e = h[t.from],
                a = h[t.to];
              ((t._source = e), (t._target = a));
            }));
          var l = l.filter(t => c[t.from] && c[t.to]),
            g = s.defs.bind(this)(s, l),
            g = (g !== s.defsWrapper.html() && s.defsWrapper.html(g), s.linksWrapper.selectAll('path.link').data(e, t => s.nodeId(t.data))),
            e = g
              .enter()
              .insert('path', 'g')
              .attr('class', 'link')
              .attr('d', t => {
                var e = {
                  x: s.layoutBindings[s.layout].linkJoinX({ x: a, y: n, width: r, height: d }),
                  y: s.layoutBindings[s.layout].linkJoinY({ x: a, y: n, width: r, height: d }),
                };
                return s.layoutBindings[s.layout].diagonal(e, e, e);
              })
              .merge(g),
            e =
              (e.attr('fill', 'none'),
              this.isEdge()
                ? e.style('display', t => {
                    return t.data._pagingButton ? 'none' : 'auto';
                  })
                : e.attr('display', t => {
                    return t.data._pagingButton ? 'none' : 'auto';
                  }),
              e.each(s.linkUpdate),
              e
                .transition()
                .duration(s.duration)
                .attr('d', t => {
                  var e =
                      s.compact && t.flexCompactDim
                        ? { x: s.layoutBindings[s.layout].compactLinkMidX(t, s), y: s.layoutBindings[s.layout].compactLinkMidY(t, s) }
                        : { x: s.layoutBindings[s.layout].linkX(t), y: s.layoutBindings[s.layout].linkY(t) },
                    a = { x: s.layoutBindings[s.layout].linkParentX(t), y: s.layoutBindings[s.layout].linkParentY(t) },
                    t = s.compact && t.flexCompactDim ? { x: s.layoutBindings[s.layout].linkCompactXStart(t), y: s.layoutBindings[s.layout].linkCompactYStart(t) } : e;
                  return s.layoutBindings[s.layout].diagonal(e, a, t, { sy: s.linkYOffset });
                }),
              g
                .exit()
                .transition()
                .duration(s.duration)
                .attr('d', t => {
                  var e = {
                    x: s.layoutBindings[s.layout].linkJoinX({ x: i, y: o, width: r, height: d }),
                    y: s.layoutBindings[s.layout].linkJoinY({ x: i, y: o, width: r, height: d }),
                  };
                  return s.layoutBindings[s.layout].diagonal(e, e, null, { sy: s.linkYOffset });
                })
                .remove(),
              s.connectionsWrapper.selectAll('path.connection').data(l)),
            g = e
              .enter()
              .insert('path', 'g')
              .attr('class', 'connection')
              .attr('d', t => {
                var e = {
                  x: s.layoutBindings[s.layout].linkJoinX({ x: a, y: n, width: r, height: d }),
                  y: s.layoutBindings[s.layout].linkJoinY({ x: a, y: n, width: r, height: d }),
                };
                return s.layoutBindings[s.layout].diagonal(e, e, null, { sy: s.linkYOffset });
              })
              .merge(e),
            l =
              (g.attr('fill', 'none'),
              g
                .transition()
                .duration(s.duration)
                .attr('d', t => {
                  var e = s.layoutBindings[s.layout].linkX({ x: t._source.x, y: t._source.y, width: t._source.width, height: t._source.height }),
                    a = s.layoutBindings[s.layout].linkY({ x: t._source.x, y: t._source.y, width: t._source.width, height: t._source.height }),
                    n = s.layoutBindings[s.layout].linkJoinX({ x: t._target.x, y: t._target.y, width: t._target.width, height: t._target.height }),
                    t = s.layoutBindings[s.layout].linkJoinY({ x: t._target.x, y: t._target.y, width: t._target.width, height: t._target.height });
                  return s.linkGroupArc({ source: { x: e, y: a }, target: { x: n, y: t } });
                }),
              g.each(s.connectionsUpdate),
              e.exit().transition().duration(s.duration).attr('opacity', 0).remove(),
              s.nodesWrapper.selectAll('g.node').data(t, ({ data: t }) => s.nodeId(t))),
            g = l
              .enter()
              .append('g')
              .attr('class', 'node')
              .attr('transform', t => {
                return t == s.root
                  ? `translate(${a},${n})`
                  : `translate(${s.layoutBindings[s.layout].nodeJoinX({ x: a, y: n, width: r, height: d })},${s.layoutBindings[s.layout].nodeJoinY({ x: a, y: n, width: r, height: d })})`;
              })
              .attr('cursor', 'pointer')
              .on('click.node', (t, e) => {
                var a = e['data'];
                [...t.srcElement.classList].includes('node-button-foreign-object') ||
                  ([...t.srcElement.classList].includes('paging-button-wrapper')
                    ? this.loadPagingNodes(e)
                    : a._pagingButton
                      ? console.log('event fired, no handlers')
                      : s.onNodeClick(e));
              })
              .on('keydown.node', (t, e) => {
                ('Enter' !== t.key && ' ' !== t.key && 'Spacebar' !== t.key) ||
                  [...t.srcElement.classList].includes('node-button-foreign-object') ||
                  ([...t.srcElement.classList].includes('paging-button-wrapper')
                    ? this.loadPagingNodes(e)
                    : ('Enter' !== t.key && ' ' !== t.key && 'Spacebar' !== t.key) || this.onButtonClick(t, e));
              }),
            e = (g.each(s.nodeEnter), g.patternify({ tag: 'rect', selector: 'node-rect', data: t => [t] }), g.merge(l).style('font', '12px sans-serif')),
            g =
              (e
                .patternify({ tag: 'foreignObject', selector: 'node-foreign-object', data: t => [t] })
                .style('overflow', 'visible')
                .patternify({ tag: 'xhtml:div', selector: 'node-foreign-object-div', data: t => [t] }),
              this.restyleForeignObjectElements(),
              g
                .patternify({ tag: 'g', selector: 'node-button-g', data: t => [t] })
                .on('click', (t, e) => this.onButtonClick(t, e))
                .on('keydown', (t, e) => {
                  ('Enter' !== t.key && ' ' !== t.key && 'Spacebar' !== t.key) || this.onButtonClick(t, e);
                })),
            g =
              (g
                .patternify({ tag: 'rect', selector: 'node-button-rect', data: t => [t] })
                .attr('opacity', 0)
                .attr('pointer-events', 'all')
                .attr('width', t => s.nodeButtonWidth(t))
                .attr('height', t => s.nodeButtonHeight(t))
                .attr('x', t => s.nodeButtonX(t))
                .attr('y', t => s.nodeButtonY(t)),
              g
                .patternify({ tag: 'foreignObject', selector: 'node-button-foreign-object', data: t => [t] })
                .attr('width', t => s.nodeButtonWidth(t))
                .attr('height', t => s.nodeButtonHeight(t))
                .attr('x', t => s.nodeButtonX(t))
                .attr('y', t => s.nodeButtonY(t))
                .style('overflow', 'visible')
                .patternify({ tag: 'xhtml:div', selector: 'node-button-div', data: t => [t] })
                .style('pointer-events', 'none')
                .style('display', 'flex')
                .style('width', '100%')
                .style('height', '100%'),
              e
                .transition()
                .attr('opacity', 0)
                .duration(s.duration)
                .attr('transform', ({ x: t, y: e, width: a, height: n }) => s.layoutBindings[s.layout].nodeUpdateTransform({ x: t, y: e, width: a, height: n }))
                .attr('opacity', 1),
              e
                .select('.node-rect')
                .attr('width', ({ width: t }) => t)
                .attr('height', ({ height: t }) => t)
                .attr('x', ({}) => 0)
                .attr('y', ({}) => 0)
                .attr('cursor', 'pointer')
                .attr('rx', 3)
                .attr('fill', s.nodeDefaultBackground),
              e
                .select('.node-button-g')
                .attr('transform', ({ width: t, height: e }) => {
                  return `translate(${s.layoutBindings[s.layout].buttonX({ width: t, height: e })},${s.layoutBindings[s.layout].buttonY({ width: t, height: e })})`;
                })
                .attr('display', ({ data: t }) => (0 < t._directSubordinates ? null : 'none'))
                .attr('opacity', ({ data: t, children: e, _children: a }) => (!t._pagingButton && (e || a) ? 1 : 0)),
              e.select('.node-button-foreign-object .node-button-div').html(t => s.buttonContent({ node: t, state: s })),
              e
                .select('.node-button-text')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr('font-size', ({ children: t }) => (t ? 40 : 26))
                .text(({ children: t }) => (t ? '-' : '+'))
                .attr('y', this.isEdge() ? 10 : 0),
              e.each(s.nodeUpdate),
              l.exit());
          g.each(s.nodeExit);
          const p = g.data().reduce((t, e) => (t.depth < e.depth ? t : e), { depth: 1 / 0 });
          (g
            .attr('opacity', 1)
            .transition()
            .duration(s.duration)
            .attr('transform', t => {
              var { x: e, y: a, width: n, height: i } = p.parent || {};
              return `translate(${s.layoutBindings[s.layout].nodeJoinX({ x: e, y: a, width: n, height: i })},${s.layoutBindings[s.layout].nodeJoinY({ x: e, y: a, width: n, height: i })})`;
            })
            .on('end', function () {
              u.select(this).remove();
            })
            .attr('opacity', 0),
            t.forEach(t => {
              ((t.x0 = t.x), (t.y0 = t.y));
            }));
          e = s.allNodes.filter(t => t.data._centered)[0];
          if (e) {
            let t = [e];
            (e.data._centeredWithDescendants &&
              (t = s.compact
                ? e.descendants().filter((t, e) => e < 7)
                : e.descendants().filter((t, e, a) => {
                    var n = Math.round(a.length / 2);
                    return a.length % 2 ? n - 2 < e && e < n + 2 - 1 : n - 2 < e && e < n + 2;
                  })),
              (e.data._centeredWithDescendants = null),
              (e.data._centered = null),
              this.fit({ animate: true, scale: false, nodes: t }));
          }
        }
        isEdge() {
          return window.navigator.userAgent.includes('Edge');
        }
        hdiagonal(t, e, a, n) {
          return this.getChartState().hdiagonal(t, e, a, n);
        }
        diagonal(t, e, a, n) {
          return this.getChartState().diagonal(t, e, a, n);
        }
        restyleForeignObjectElements() {
          const n = this.getChartState();
          (n.svg
            .selectAll('.node-foreign-object')
            .attr('width', ({ width: t }) => t)
            .attr('height', ({ height: t }) => t)
            .attr('x', ({}) => 0)
            .attr('y', ({}) => 0),
            n.svg
              .selectAll('.node-foreign-object-div')
              .style('width', ({ width: t }) => t + 'px')
              .style('height', ({ height: t }) => t + 'px')
              .html(function (t, e, a) {
                return t.data._pagingButton
                  ? `<div class="paging-button-wrapper"><div style="pointer-events:none">${n.pagingButton(t, e, a, n)}</div></div>`
                  : n.nodeContent.bind(this)(t, e, a, n);
              }));
        }
        onButtonClick(t, e) {
          var a = this.getChartState();
          e.data._pagingButton ||
            (a.setActiveNodeCentered && ((e.data._centered = true), (e.data._centeredWithDescendants = true)),
            e.children
              ? ((e._children = e.children), (e.children = null), this.setExpansionFlagToChildren(e, false))
              : ((e.children = e._children), (e._children = null), e.children && e.children.forEach(({ data: t }) => (t._expanded = true))),
            this.update(e),
            t.stopPropagation(),
            a.onExpandOrCollapse(e));
        }
        setExpansionFlagToChildren({ data: t, children: e, _children: a }, n) {
          ((t._expanded = n),
            e &&
              e.forEach(t => {
                this.setExpansionFlagToChildren(t, n);
              }),
            a &&
              a.forEach(t => {
                this.setExpansionFlagToChildren(t, n);
              }));
        }
        expandSomeNodes(e) {
          if (e.data._expanded) {
            let t = e.parent;
            for (; t && t._children; ) ((t.children = t._children), (t._children = null), (t = t.parent));
          }
          (e._children && e._children.forEach(t => this.expandSomeNodes(t)), e.children && e.children.forEach(t => this.expandSomeNodes(t)));
        }
        updateNodesState() {
          var t = this.getChartState();
          (this.setLayouts({ expandNodesFirst: true }), this.update(t.root));
        }
        setLayouts({ expandNodesFirst: t = true }) {
          const r = this.getChartState();
          ((r.generateRoot = u
            .stratify()
            .id(t => r.nodeId(t))
            .parentId(t => r.parentNodeId(t))),
            (r.root = r.generateRoot(r.data)));
          var e = r.root.descendants();
          1 < r.initialExpandLevel &&
            0 < e.length &&
            (e.forEach(t => {
              t.depth <= r.initialExpandLevel && (t.data._expanded = true);
            }),
            (r.initialExpandLevel = 1));
          const n = {};
          (r.root
            .descendants()
            .filter(t => t.children)
            .filter(t => !t.data._pagingStep)
            .forEach(t => {
              t.data._pagingStep = r.minPagingVisibleNodes(t);
            }),
            r.root.eachBefore((a, t) => {
              ((a.data._directSubordinatesPaging = a.children ? a.children.length : 0),
                a.children &&
                  a.children.forEach((e, t) => {
                    if (
                      ((e.data._pagingButton = false),
                      t > a.data._pagingStep && (n[e.id] = true),
                      t === a.data._pagingStep && a.children.length - 1 > a.data._pagingStep && (e.data._pagingButton = true),
                      n[e.parent.id] && (n[e.id] = true),
                      e.data._expanded || e.data._centered || e.data._highlighted || e.data._upToTheRootHighlighted)
                    ) {
                      let t = e;
                      for (; t && (n[t.id] || t.data._pagingButton); )
                        ((n[t.id] = false),
                          t.data._pagingButton &&
                            ((t.data._pagingButton = false),
                            t.parent.children.forEach(t => {
                              ((t.data._expanded = true), (n[t.id] = false));
                            })),
                          (t = t.parent));
                    }
                  }));
            }),
            (r.root = u
              .stratify()
              .id(t => r.nodeId(t))
              .parentId(t => r.parentNodeId(t))(r.data.filter(t => true !== n[t.id]))),
            r.root.each((t, e, a) => {
              var n = t._hierarchyHeight || t.height,
                i = r.nodeWidth(t),
                o = r.nodeHeight(t);
              Object.assign(t, { width: i, height: o, _hierarchyHeight: n });
            }),
            (r.root.x0 = 0),
            (r.root.y0 = 0),
            (r.allNodes = r.root.descendants()),
            r.allNodes.forEach(t => {
              Object.assign(t.data, { _directSubordinates: t.children ? t.children.length : 0, _totalSubordinates: t.descendants().length - 1 });
            }),
            r.root.children &&
              (t && r.root.children.forEach(this.expand),
              r.root.children.forEach(t => this.collapse(t)),
              0 == r.initialExpandLevel && ((r.root._children = r.root.children), (r.root.children = null)),
              [r.root].forEach(t => this.expandSomeNodes(t))));
        }
        collapse(t) {
          t.children && ((t._children = t.children), t._children.forEach(t => this.collapse(t)), (t.children = null));
        }
        expand(t) {
          t._children && ((t.children = t._children), t.children.forEach(t => this.expand(t)), (t._children = null));
        }
        zoomed(t, e) {
          var a = this.getChartState(),
            n = a.chart,
            t = t.transform;
          ((a.lastTransform = t), n.attr('transform', t), this.isEdge() && this.restyleForeignObjectElements());
        }
        zoomTreeBounds({ x0: t, x1: e, y0: a, y1: n, params: i = { animate: true, scale: true, onCompleted: () => {} } }) {
          var { centerG: o, svgWidth: r, svgHeight: d, svg: s, zoomBehavior: l, duration: h, lastTransform: c } = this.getChartState(),
            g = Math.min(8, 0.9 / Math.max((e - t) / r, (n - a) / d));
          let p = u.zoomIdentity.translate(r / 2, d / 2);
          ((p = (p = p.scale(i.scale ? g : c.k)).translate(-(t + e) / 2, -(a + n) / 2)),
            s
              .transition()
              .duration(i.animate ? h : 0)
              .call(l.transform, p),
            o
              .transition()
              .duration(i.animate ? h : 0)
              .attr('transform', 'translate(0,0)')
              .on('end', function () {
                i.onCompleted && i.onCompleted();
              }));
        }
        fit({ animate: t = true, nodes: e, scale: a = true, onCompleted: n = () => {} } = {}) {
          const i = this.getChartState();
          var o = i['root'],
            e = e || o.descendants(),
            o = u.min(e, t => t.x + i.layoutBindings[i.layout].nodeLeftX(t)),
            r = u.max(e, t => t.x + i.layoutBindings[i.layout].nodeRightX(t)),
            d = u.min(e, t => t.y + i.layoutBindings[i.layout].nodeTopY(t)),
            e = u.max(e, t => t.y + i.layoutBindings[i.layout].nodeBottomY(t));
          return (this.zoomTreeBounds({ params: { animate: t, scale: a, onCompleted: n }, x0: o - 50, x1: r + 50, y0: d - 50, y1: e + 50 }), this);
        }
        loadPagingNodes(t) {
          var e = this.getChartState(),
            a = ((t.data._pagingButton = false), t.parent.data._pagingStep),
            e = e.pagingStep(t.parent);
          ((t.parent.data._pagingStep = a + e), this.updateNodesState());
        }
        setExpanded(e, t = true) {
          const a = this.getChartState();
          var n = a.allNodes.filter(({ data: t }) => a.nodeId(t) == e)[0];
          if (n) {
            if (0 == (n.data._expanded = t)) {
              const i = n.parent || { descendants: () => [] };
              i.descendants()
                .filter(t => t != i)
                .forEach(t => (t.data._expanded = false));
            }
          } else console.log(`ORG CHART - ${t ? 'EXPAND' : 'COLLAPSE'} - Node with id (${e})  not found in the tree`);
          return this;
        }
        setCentered(e) {
          const a = this.getChartState();
          var t = a
            .generateRoot(a.data)
            .descendants()
            .filter(({ data: t }) => a.nodeId(t).toString() == e.toString())[0];
          return (
            t
              ? (t.ancestors().forEach(t => (t.data._expanded = true)), (t.data._centered = true), (t.data._expanded = true))
              : console.log(`ORG CHART - CENTER - Node with id (${e}) not found in the tree`),
            this
          );
        }
        setHighlighted(e) {
          const a = this.getChartState();
          var t = a
            .generateRoot(a.data)
            .descendants()
            .filter(t => a.nodeId(t.data).toString() === e.toString())[0];
          return (
            t
              ? (t.ancestors().forEach(t => (t.data._expanded = true)), (t.data._highlighted = true), (t.data._expanded = true), (t.data._centered = true))
              : console.log(`ORG CHART - HIGHLIGHT - Node with id (${e})  not found in the tree`),
            this
          );
        }
        setUpToTheRootHighlighted(e) {
          const a = this.getChartState();
          var t = a
            .generateRoot(a.data)
            .descendants()
            .filter(t => a.nodeId(t.data).toString() === e.toString())[0];
          return (
            t
              ? (t.ancestors().forEach(t => (t.data._expanded = true)),
                (t.data._upToTheRootHighlighted = true),
                (t.data._expanded = true),
                t.ancestors().forEach(t => (t.data._upToTheRootHighlighted = true)))
              : console.log(`ORG CHART - HIGHLIGHTROOT - Node with id (${e}) not found in the tree`),
            this
          );
        }
        clearHighlighting() {
          var t = this.getChartState();
          return (
            t.allNodes.forEach(t => {
              ((t.data._highlighted = false), (t.data._upToTheRootHighlighted = false));
            }),
            this.update(t.root),
            this
          );
        }
        fullscreen(t) {
          const e = this.getChartState(),
            a = u.select(t || e.container).node();
          (u.select(document).on('fullscreenchange.' + e.id, function (t) {
            (document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement) == a
              ? setTimeout(t => {
                  e.svg.attr('height', window.innerHeight - 40);
                }, 500)
              : e.svg.attr('height', e.svgHeight);
          }),
            a.requestFullscreen
              ? a.requestFullscreen()
              : a.mozRequestFullScreen
                ? a.mozRequestFullScreen()
                : a.webkitRequestFullscreen
                  ? a.webkitRequestFullscreen()
                  : a.msRequestFullscreen && a.msRequestFullscreen());
        }
        zoomIn() {
          var { svg: t, zoomBehavior: e } = this.getChartState();
          t.transition().call(e.scaleBy, 1.3);
        }
        zoomOut() {
          var { svg: t, zoomBehavior: e } = this.getChartState();
          t.transition().call(e.scaleBy, 0.78);
        }
        toDataURL(t, e) {
          var a = new XMLHttpRequest();
          ((a.onload = function () {
            var t = new FileReader();
            ((t.onloadend = function () {
              e(t.result);
            }),
              t.readAsDataURL(a.response));
          }),
            a.open('GET', t),
            (a.responseType = 'blob'),
            a.send());
        }
        exportImg({ full: a = false, scale: n = 3, onLoad: i = t => t, save: o = true, backgroundColor: r = '#FAFAFA' } = {}) {
          const d = this,
            s = this.getChartState(),
            { svg: t, root: l } = s;
          let e = 0;
          var h = t.selectAll('img');
          let c = h.size();
          const g = () => {
            JSON.parse(JSON.stringify(d.lastTransform()));
            var t = d.duration();
            a && d.fit();
            const e = d.getChartState()['svg'];
            setTimeout(
              t => {
                d.downloadImage({
                  node: e.node(),
                  scale: n,
                  isSvg: false,
                  backgroundColor: r,
                  onAlreadySerialized: t => {
                    d.update(l);
                  },
                  imageName: s.imageName,
                  onLoad: i,
                  save: o,
                });
              },
              a ? t + 10 : 0,
            );
          };
          0 < c
            ? h.each(function () {
                d.toDataURL(this.src, t => {
                  ((this.src = t), ++e == c && g());
                });
              })
            : g();
        }
        exportSvg() {
          var { svg: t, imageName: e } = this.getChartState();
          return (this.downloadImage({ imageName: e, node: t.node(), scale: 3, isSvg: true }), this);
        }
        expandAll() {
          var t = this.getChartState()['data'];
          return (t.forEach(t => (t._expanded = true)), this.render(), this);
        }
        collapseAll() {
          var t = this.getChartState()['allNodes'];
          return (t.forEach(t => (t.data._expanded = false)), this.initialExpandLevel(0), this.render(), this);
        }
        downloadImage({
          node: t,
          scale: e = 2,
          imageName: n = 'graph',
          isSvg: a = false,
          save: i = true,
          backgroundColor: o = '#FAFAFA',
          onAlreadySerialized: r = t => {},
          onLoad: d = t => {},
        }) {
          const s = t;
          function l(t, e) {
            var a = document.createElement('a');
            'string' == typeof a.download ? (document.body.appendChild(a), (a.download = e), (a.href = t), a.click(), document.body.removeChild(a)) : location.replace(t);
          }
          function h(t) {
            for (
              var e = 'http://www.w3.org/2000/xmlns/',
                a = ((t = t.cloneNode(true)), window.location.href + '#'),
                n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, null, false);
              n.nextNode();

            )
              for (const i of n.currentNode.attributes) i.value.includes(a) && (i.value = i.value.replace(a, '#'));
            return (
              t.setAttributeNS(e, 'xmlns', 'http://www.w3.org/2000/svg'),
              t.setAttributeNS(e, 'xmlns:xlink', 'http://www.w3.org/1999/xlink'),
              new XMLSerializer().serializeToString(t)
            );
          }
          if (a) ((t = '<?xml version="1.0" standalone="no"?>\r\n' + (t = h(s))), l((c = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(t)), n + '.svg'), r());
          else {
            const g = e,
              p = document.createElement('img');
            p.onload = function () {
              var t = document.createElement('canvas'),
                e = s.getBoundingClientRect(),
                a = ((t.width = e.width * g), (t.height = e.height * g), t.getContext('2d')),
                a = ((a.fillStyle = o), a.fillRect(0, 0, e.width * g, e.height * g), a.drawImage(p, 0, 0, e.width * g, e.height * g), t.toDataURL('image/png'));
              (d && d(a), i && l(a, n + '.png'));
            };
            var c = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(h(s));
            (r(), (p.src = c));
          }
        }
        getTextWidth(t, { fontSize: e = 14, fontWeight: a = 400, defaultFont: n = 'Helvetice', ctx: i } = {}) {
          return ((i.font = `${a || ''} ${e}px ${n} `), i.measureText(t).width);
        }
        clear() {
          var t = this.getChartState();
          (u.select(window).on('resize.' + t.id, null), t.svg && t.svg.selectAll('*').remove());
        }
      }),
        Object.defineProperty(t, '__esModule', { value: true }));
    });
  })(d3OrgChart_min$1, d3OrgChart_min$1.exports);
  return d3OrgChart_min$1.exports;
}

var d3OrgChart_minExports = requireD3OrgChart_min();

const tkOrgChartCss = '';

const TkOrgChart$1 = /*@__PURE__*/ proxyCustomElement(
  class TkOrgChart extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkNodeClick = createEvent(this, 'tk-node-click', 7);
      this.nodeWidth = 160;
      this.nodeHeight = 90;
      this.nodeButtonWidth = 28.5;
      this.nodeButtonHeight = 27;
      this.nodeButtonX = -this.nodeButtonWidth / 2;
      this.childrenMargin = 84;
      this.compact = false;
      /**
       * Enable or disable expand/collapse buttons functionality
       * When disabled, all nodes will be automatically expanded
       */
      this.collapsible = true;
      this.defaultButtonHTML = () => `
   <div style="
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 6px 4.5px 6px;
  border: 0.75px solid #CACFD8;
  border-radius: 8px;
  background: #FFF;
  box-shadow:
    0px 0px 0px 1.5px #FFF,
    0px 0px 0px 3px #DADEE3;
">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
      <path
        d="M10.4219 5.62507L7.99687 8.05007L5.57187 5.62507C5.32812 5.38132 4.93437 5.38132 4.69062 5.62507C4.44688 5.86882 4.44688 6.26257 4.69062 6.50632L7.55937 9.37507C7.80312 9.61882 8.19687 9.61882 8.44062 9.37507L11.3094 6.50632C11.5531 6.26257 11.5531 5.86882 11.3094 5.62507C11.0656 5.38757 10.6656 5.38132 10.4219 5.62507Z"
        fill="#222530" />
    </svg>
  </div>`;
    }
    dataChanged() {
      this.updateOrgChart();
    }
    optionsChanged() {
      this.mergeOptions();
      this.updateOrgChart();
    }
    collapsibleChanged() {
      this.updateButtonsState();
    }
    componentWillLoad() {
      this.mergeOptions();
    }
    componentDidLoad() {
      if (this.orgChartContainerRef) {
        const flatData = this.normaliseData(this.data);
        this.orgChartInstance = new d3OrgChart_minExports.OrgChart();
        this.orgChartInstance
          .container(this.orgChartContainerRef)
          .data(flatData)
          .layout('top')
          .initialExpandLevel(Infinity)
          .nodeWidth(() => this.nodeWidth)
          .nodeHeight(() => this.nodeHeight)
          .nodeButtonWidth(() => this.nodeButtonWidth)
          .nodeButtonHeight(() => this.nodeButtonHeight)
          .nodeButtonX(() => this.nodeButtonX)
          .childrenMargin(() => this.childrenMargin)
          .compact(this.compact)
          .nodeContent(d => this.defaultNodeHTML(d))
          .buttonContent(() => this.defaultButtonHTML());
        this.orgChartInstance.onNodeClick(nd => this.tkNodeClick.emit(nd));
        const lb = this.orgChartInstance.layoutBindings();
        lb.top.diagonal = (s, t) => {
          const x = s.x;
          const y = s.y;
          const ex = t.x;
          const ey = t.y;
          const midY = (y + ey) / 2;
          return `M ${x} ${y} L ${x} ${midY} L ${ex} ${midY} L ${ex} ${ey}`;
        };
        lb.top.buttonY = n => n.height + this.nodeButtonHeight; // button y position
        lb.top.linkParentY = n => n.parent.y + n.parent.height + this.nodeButtonHeight + 14; // parent side connection
        this.updateButtonsState();
        this.orgChartInstance.layoutBindings(lb).render();
        this.orgChartInstance.render();
      }
    }
    disconnectedCallback() {
      if (this.orgChartInstance) {
        // No specific destroy method in OrgChart, but clear the reference
        this.orgChartInstance = undefined;
      }
      // Clear any pending timeouts
      if (this.buttonUpdateTimeout) {
        clearTimeout(this.buttonUpdateTimeout);
        this.buttonUpdateTimeout = undefined;
      }
    }
    /**
     * Get the chart instance
     */
    async getOrgChart() {
      return this.orgChartInstance;
    }
    /**
     * Refresh the chart
     */
    async refresh() {
      this.updateOrgChart();
    }
    /**
     * Add node to organizational chart
     */
    async addNode(node) {
      if (this.orgChartInstance) {
        this.orgChartInstance.addNode(node);
      }
    }
    /**
     * Fit chart to screen
     */
    async fit() {
      if (this.orgChartInstance) {
        this.orgChartInstance.fit();
      }
    }
    needsNormalising(value) {
      if (Array.isArray(value)) {
        if (!value.length) return false;
        const first = value[0];
        return !('id' in first) || !!(first === null || first === void 0 ? void 0 : first.children);
      }
      return !!(value === null || value === void 0 ? void 0 : value.children);
    }
    flattenTree(node, parentId, store, idCounter) {
      var _a, _b;
      const id = (_a = node.id) !== null && _a !== void 0 ? _a : idCounter.cur++;
      store.push(Object.assign(Object.assign({}, node), { id, parentId }));
      ((_b = node.children) !== null && _b !== void 0 ? _b : []).forEach(c => this.flattenTree(c, id, store, idCounter));
    }
    normaliseData(src) {
      if (!this.needsNormalising(src)) {
        return Array.isArray(src) ? [...src] : [src];
      }
      const out = [];
      const counter = { cur: 1 };
      (Array.isArray(src) ? src : [src]).forEach(n => this.flattenTree(n, null, out, counter));
      return out;
    }
    mergeOptions() {
      this.internalOptions = lodashExports.merge({}, {}, this.options);
    }
    updateOrgChart() {
      if (!this.orgChartInstance) return;
      const flat = this.normaliseData(this.data);
      this.orgChartInstance.data(flat).initialExpandLevel(Infinity).render();
      this.updateButtonsState();
    }
    defaultNodeHTML(d) {
      var _a, _b;
      const nameCol = '#222530';
      const titleCol = '#99A0AE';
      return `
      <div style="
      border: 1px solid #E1E4EA;
      border-radius: 8px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-family: Geologica, sans-serif";
      >
        <div style="
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4.489px 3.333px 0px 3.667px;
  border: 1px solid white;
  border-radius: 9999px;
  background-color: #E1E4EA;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;">
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28" fill="none">
    <path d="M18.8958 18.8634C16.9861 20.2523 15.0763 21.3634 13.1666 21.3634C11.2569 21.3634 9.34714 20.2523 7.43745 18.8634C9.01155 18.3843 9.81016 17.669 9.83329 16.7176C9.83329 16.548 9.83204 16.3072 9.83089 15.855C9.83089 15.7832 9.83072 15.7096 9.83037 15.6344C9.82725 14.4219 9.82214 12.8219 9.81495 11.1969C8.32204 9.26176 8.87047 6.99312 9.33829 7.04968C9.91183 7.11947 14.8809 2.40405 15.834 2.16228C16.7871 1.92051 19.2083 2.70103 19.625 4.87551C20.0416 7.04999 20.2158 12.531 18.6354 14.7193C18.1856 15.342 17.4773 15.5855 16.5104 15.45C16.509 15.9051 16.5063 16.1605 16.5 16.6759C16.5123 17.6706 17.3109 18.3848 18.8958 18.8634Z" fill="url(#paint0_linear)"/>
    <path d="M16.5 15.4485C14.2083 15.1881 12.75 14.1985 12.75 14.1985C12.75 14.1985 14.4167 16.2818 16.5 16.6985V15.4485Z" fill="#FC9F6A"/>
    <path d="M9.05179 11.2296C8.33409 9.50357 5.45804 5.98826 7.93721 3.80076C8.77054 -0.261737 13.3747 0.187951 16.4476 1.12545C18.5129 1.75555 20.0726 3.00045 20.406 2.06295C22.4893 3.80076 21.446 5.50045 20.0726 5.98826C18.8262 6.43097 16.7185 6.87368 13.1345 6.45701C12.4943 6.38253 12.6284 8.34326 12.2863 8.55524C11.773 8.87326 11.3747 6.87368 9.96763 7.47409C8.56054 8.07451 9.39554 10.8585 10.906 10.8585C11.4268 10.8585 11.6872 12.2904 10.281 12.9675C9.26013 13.4692 9.51815 12.3512 9.05179 11.2296Z" fill="url(#paint1_linear)"/>
    <path d="M2.22901 22.043C1.23734 24.0593 0.66651 28.7096 0.66651 28.7096H25.6665C25.6665 28.7096 25.0955 24.0588 24.104 22.043C23.1125 20.0271 17.3228 18.1574 17.3228 18.1574C14.1235 19.4067 12.1657 19.4067 9.01328 18.1567C9.01328 18.1567 3.22068 20.0266 2.22901 22.043Z" fill="#FDF4EE"/>
    <path d="M12.4373 18.8859L11.9165 28.4692H14.4165L13.8957 18.8859C13.8957 18.8859 13.4095 18.365 13.1665 18.365C12.9235 18.365 12.4373 18.8859 12.4373 18.8859Z" fill="#C90019"/>
    <path d="M12.3185 20.8329L13.9565 19.8864L13.8955 18.8858C13.5714 18.5386 13.3283 18.365 13.1663 18.365C13.0043 18.365 12.7613 18.5386 12.4372 18.8858L12.3184 20.8329H12.3185Z" fill="#645050"/>
    <path d="M13.1667 18.3642L14.2083 20.24L17.4375 18.2608L16.5 16.9067L13.1667 18.138L9.83333 16.9067L8.89583 18.2608L12.125 20.24L13.1667 18.3642Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear" x1="13.6748" y1="2.12" x2="13.6748" y2="21.3634" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F7B186" />
        <stop offset="1" stop-color="#FFC299" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="14.2663" y1="0.48877" x2="14.2663" y2="13.0909" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1D0024" />
        <stop offset="1" stop-color="#100014" />
      </linearGradient>
    </defs>
  </svg>
</div>
        <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      max-width: 90px;"
    
>
          <div style=
          "font-size:14px;
          font-weight:400;
          color:${nameCol};
          line-height:20px;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          max-width: 90px;">
          ${(_a = d.data.name) !== null && _a !== void 0 ? _a : ''}
          </div>
          <div style=
          "font-size:11px;
          font-weight:300;
          color:${titleCol};
          line-height:16px;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          max-width: 90px;">
          ${(_b = d.data.title) !== null && _b !== void 0 ? _b : ''}
          </div>
        </div>
      </div>`;
    }
    updateButtonsState() {
      const lb = this.orgChartInstance.layoutBindings();
      if (!this.orgChartInstance) return;
      if (this.buttonUpdateTimeout) {
        clearTimeout(this.buttonUpdateTimeout);
      }
      if (!this.collapsible) {
        lb.top.buttonY = n => n.height + this.nodeButtonHeight; // button y position
        lb.top.linkParentY = n => n.parent.y + n.parent.height; // parent side connection
        this.orgChartInstance
          .layoutBindings(lb)
          .buttonContent(() => {
            return '';
          })
          .render();
      } else {
        lb.top.buttonY = n => n.height + this.nodeButtonHeight; // button y position
        lb.top.linkParentY = n => n.parent.y + n.parent.height + this.nodeButtonHeight + 14; // parent side connection
        lb.top.linkY = n => n.y - 4; // child side connection
        this.orgChartInstance.layoutBindings(lb).render();
        this.buttonUpdateTimeout = setTimeout(() => {
          if (this.orgChartInstance) {
            this.orgChartInstance
              .buttonContent(({ node }) => {
                if (!node.children && !node._children) return '';
                return this.defaultButtonHTML();
              })
              .render();
          }
        }, 350);
      }
    }
    render() {
      var _a, _b;
      const accessibilityLabel =
        this.accessibilityLabel || ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.text) || 'Organization Chart';
      return h('div', {
        'key': 'ded54786e27fc2218bc30820009010dc8540e639',
        'ref': el => (this.orgChartContainerRef = el),
        'class': 'tk-org-chart-container',
        'role': 'img',
        'aria-label': accessibilityLabel,
      });
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        data: ['dataChanged'],
        options: ['optionsChanged'],
        collapsible: ['collapsibleChanged'],
      };
    }
    static get style() {
      return tkOrgChartCss;
    }
  },
  [
    0,
    'tk-org-chart',
    {
      data: [16],
      options: [8],
      collapsible: [4],
      accessibilityLabel: [1, 'accessibility-label'],
      internalOptions: [32],
      getOrgChart: [64],
      refresh: [64],
      addNode: [64],
      fit: [64],
    },
    undefined,
    {
      data: ['dataChanged'],
      options: ['optionsChanged'],
      collapsible: ['collapsibleChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-org-chart'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-org-chart':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkOrgChart$1);
        }
        break;
    }
  });
}

const TkOrgChart = TkOrgChart$1;
const defineCustomElement = defineCustomElement$1;

export { TkOrgChart, defineCustomElement };
//# sourceMappingURL=tk-org-chart.js.map

//# sourceMappingURL=tk-org-chart.js.map
