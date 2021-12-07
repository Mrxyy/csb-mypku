import { d as defineComponent, r as reactive, a as resolveComponent, o as openBlock, c as createElementBlock, b as createCommentVNode, e as createBaseVNode, f as createVNode, w as withCtx, F as Fragment, g as createTextVNode, V as VMdEditor, C as Codemirror, h as githubTheme, l as lib, i as createApp, m as memo } from "./vendor.542848b4.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var style = "";
const text = [
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
  "application/json"
];
var mime = {
  text
};
var App_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
class MenuGenerator {
  constructor({
    id = "",
    name,
    expand = false,
    children = void 0,
    entryHandler,
    parent
  }) {
    this.id = id, this.name = name, this.expand = expand, this.children = children, this.entryHandler = entryHandler;
    this.parent = parent;
  }
}
function getParamFromEntry(handler, parent) {
  return {
    id: handler.name,
    name: handler.name,
    expand: false,
    children: handler.kind != "file" ? [] : void 0,
    entryHandler: handler,
    parent
  };
}
const _sfc_main = defineComponent({
  name: "App",
  data() {
    return {
      text: "mk-editor",
      menuData: [],
      currentContext: {
        path: "/",
        fileName: "",
        fileObj: null
      },
      editMode: "edit"
    };
  },
  computed: {
    currentActive() {
      return this.$refs.moLeftListMenu.currentActive;
    }
  },
  setup() {
  },
  methods: {
    async openProject() {
      const directoryHandle = await window.showDirectoryPicker();
      const rootParameter = getParamFromEntry(directoryHandle);
      rootParameter.expand = true;
      const root = reactive(new MenuGenerator(rootParameter));
      this.openDirectory(root);
      this.menuData.push(root);
      console.log(this.menuData);
    },
    openDirectory(menuGenerator) {
      if (!menuGenerator.children || menuGenerator.children.length) {
        return;
      }
      const directoryHandle = menuGenerator.entryHandler;
      const entryIterator = directoryHandle.entries();
      const toolFX = (parentDirectory) => {
        entryIterator.next().then((v) => {
          if (!v.done) {
            const [name, handle] = v.value;
            console.log(getParamFromEntry(handle, menuGenerator.entryHandler));
            const menuItem = reactive(new MenuGenerator(getParamFromEntry(handle, menuGenerator)));
            Array.isArray(parentDirectory.children) && parentDirectory.children.push(menuItem);
            toolFX(parentDirectory);
          }
        });
      };
      toolFX(menuGenerator);
      return;
    },
    async openFile(menuGenerator) {
      const fileEntryHanlder = menuGenerator.entryHandler;
      const fileData = await fileEntryHanlder.getFile();
      return fileData;
    },
    async createDirectory() {
      const parentEntry = this.currentActive;
      if (!parentEntry.children) {
        return;
      }
      const folderName = window.prompt("\u8F93\u5165\u6587\u4EF6\u5939\u540D");
      const directoryHandle = await parentEntry.entryHandler.getDirectoryHandle(folderName, {
        create: true
      });
      parentEntry.children.push(reactive(new MenuGenerator(getParamFromEntry(directoryHandle))));
    },
    async createfile() {
      const parentEntry = this.currentActive;
      if (!parentEntry.children) {
        return;
      }
      const FileName = window.prompt("\u8F93\u5165\u6587\u4EF6\u540D");
      const fileHandler = await parentEntry.entryHandler.getFileHandle(FileName, {
        create: true
      });
      parentEntry.children.push(reactive(new MenuGenerator(getParamFromEntry(fileHandler))));
    },
    async fileOpenHandler(v) {
      const file = await this.openFile(v);
      let type = Reflect.ownKeys(mime).find((v2) => {
        return Reflect.get(mime, v2).includes(file.type);
      });
      if (!type && /\.md|\.ts|\.yaml|\.css|\.scss$/g.test(file.name)) {
        type = "text";
        if (/\.md$/g.test(file.name)) {
          this.editMode = "editable";
        }
      } else {
        this.editMode = "edit";
      }
      switch (type) {
        case "text":
          this.handleTextType(file);
          break;
      }
      console.log(file, type ? type : file.type + "can't handle");
    },
    async handleTextType(file) {
      this.text = await file.text();
    },
    directoryOpenHandler(v) {
      console.log(v);
      this.openDirectory(v);
    },
    async save(text2, html) {
      const ableWriteStream = await this.currentActive.entryHandler.createWritable();
      console.log(ableWriteStream);
      await ableWriteStream.write(text2);
      await ableWriteStream.close();
    },
    async deleteEntry() {
      this.currentActive.parent.entryHandler.removeEntry(this.currentActive.entryHandler.name, { recursive: true }).then(() => {
        this.currentActive.parent.children.find((v, i) => {
          if (v === this.currentActive) {
            this.currentActive.parent.children.splice(i, 1);
          }
          return v === this.currentActive;
        });
      });
    }
  }
});
const _hoisted_1 = /* @__PURE__ */ createTextVNode("\u6253\u5F00\u4E00\u4E2A\u9879\u76EE");
const _hoisted_2 = /* @__PURE__ */ createTextVNode("\u5220\u9664\u6587\u4EF6\u5939");
const _hoisted_3 = /* @__PURE__ */ createTextVNode("\u65B0\u5EFA\u6587\u4EF6\u5939");
const _hoisted_4 = /* @__PURE__ */ createTextVNode("\u65B0\u5EFA\u6587\u4EF6");
const _hoisted_5 = { class: "flex m-2" };
const _hoisted_6 = { class: "p-2 border mr-2 rounded-l shadow ring-offset-1 side-menu" };
const _hoisted_7 = { class: "w-full" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_moButtons = resolveComponent("moButtons");
  const _component_moLeftListMenu = resolveComponent("moLeftListMenu");
  const _component_v_md_editor = resolveComponent("v-md-editor");
  const _component_moCard = resolveComponent("moCard");
  return openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" <h1>doc:</h1> "),
    createBaseVNode("section", null, [
      createCommentVNode(' <p>\u6D4F\u89C8\u5668\u8BF7\u6C42fileSystem</p>\r\n    <p>1.\u8BF7\u6C42\u914D\u989D navigator.webkitPersistentStorage.requestQuota</p>\r\n    <p>2.requestFileSystem \u8BF7\u6C42\u6587\u4EF6\u7CFB\u7EDF</p>\r\n    <div class="center">\r\n      <img src="./doc/fileSystem.jpg" alt="fileSystem\u67B6\u6784" width="500" />\r\n    </div>'),
      createVNode(_component_moCard, {
        width: "95%",
        padding: "20px",
        class: "mx-auto my-2"
      }, {
        default: withCtx(() => [
          createVNode(_component_moButtons, {
            class: "mr-1",
            onClick: _ctx.openProject,
            size: "small",
            type: "outline"
          }, {
            default: withCtx(() => [
              _hoisted_1
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_moButtons, {
            class: "mr-1",
            color: "danger",
            onClick: _ctx.deleteEntry,
            size: "small",
            type: "outline"
          }, {
            default: withCtx(() => [
              _hoisted_2
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_moButtons, {
            class: "mr-1",
            onClick: _ctx.createDirectory,
            size: "small",
            type: "outline"
          }, {
            default: withCtx(() => [
              _hoisted_3
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_moButtons, {
            onClick: _ctx.createfile,
            size: "small",
            type: "outline"
          }, {
            default: withCtx(() => [
              _hoisted_4
            ]),
            _: 1
          }, 8, ["onClick"]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createVNode(_component_moLeftListMenu, {
                ref: "moLeftListMenu",
                class: "w-max",
                value: _ctx.menuData,
                fileOpenHandler: _ctx.fileOpenHandler,
                directoryOpenHandler: _ctx.directoryOpenHandler
              }, null, 8, ["value", "fileOpenHandler", "directoryOpenHandler"])
            ]),
            createBaseVNode("div", _hoisted_7, [
              createVNode(_component_v_md_editor, {
                mode: _ctx.editMode,
                onSave: _ctx.save,
                modelValue: _ctx.text,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.text = $event),
                height: "70vh"
              }, null, 8, ["mode", "onSave", "modelValue"])
            ])
          ])
        ]),
        _: 1
      })
    ])
  ], 2112);
}
var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var codemirrorEditor = "";
var github = "";
var simplescrollbars = "";
var codemirror = "";
VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme, {
  Hljs: lib
});
const app = createApp(App);
app.use(memo);
app.use(VMdEditor);
app.mount("#app");
