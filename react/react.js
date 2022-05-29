// 特殊处理文本类型节点
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    // 为了与普通类型节点统一
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// 创建 React Element
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      // 对于文本类型作特殊处理
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createDom(fiber) {
  // 创建 element 对应的 DOM 元素，需要特殊处理文本类型节点
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}

// 判断是否为以 on 开头的事件
const isEvent = (key) => key.startsWith("on");
// 工具方法，判断属性是否为非 children
const isProperty = (key) => key !== "children" && !isEvent(key);
// 判断是否为新添加的属性
const isNew = (prev, next) => (key) => prev[key] !== next[key];
// 判断属性是否已删除
const isGone = (prev, next) => (key) => !(key in next);

function updateDom(dom, prevProps, nextProps) {
  // 移除旧的或有修改的事件监听
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // 删除旧的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // 新增或修改属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // 新增事件监听
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function commitRoot() {
  // 清除所有待删除的 fiber
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  // 保存上次 commit 结果
  currentRoot = wipRoot;
  // 重置
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  // 初始化 nextUnitOfWork 与 wipRoot
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    // 前一次 commit 的 fiber
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

// 把 work 打散，随时暂停，不阻塞
let nextUnitOfWork = null;
// 上一次 commit 的 fiber
let currentRoot = null;
// fiber 根节点
let wipRoot = null;
// 记录需要删除的旧 fiber
let deletions = null;

function workLoop(deadline) {
  // 记录是否还有剩余空闲时间
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 完成所有 work 后，进入 commit 阶段，生成 DOM
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  // 创建 fiber 对应的 DOM 元素
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 为所有 children 创建 fiber
  const elements = fiber.props.children;

  reconcileChildren(fiber, elements);

  // 返回下一个 work，有 child 拿 child
  if (fiber.child) {
    return fiber.child;
  }
  // 没 child 拿 sibling
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 没 sibling 往回找 parent 的 sibling
    nextFiber = nextFiber.parent;
  }
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  // 上一次 commit 的 fiber
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      // parent 方便反向回溯到上一层
      // effectTag 记录副作用类型
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // 首个 child，其余 child 用 sibling 来连接
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

const React = {
  createElement,
  render,
};

export default React;
