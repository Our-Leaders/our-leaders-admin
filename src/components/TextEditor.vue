<template>
  <div class="editor" :class="{'editable': editable}">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" v-if="editable">
      <div class="menubar">
        <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          <fa-icon :icon="['fas', 'bold']"></fa-icon>
        </button>

        <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
          <fa-icon :icon="['fas', 'italic']"></fa-icon>
        </button>

        <button class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline"
        >
          <fa-icon :icon="['fas', 'underline']"></fa-icon>
        </button>

        <button
          class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">
          <fa-icon :icon="['fas', 'paragraph']"></fa-icon>
        </button>

        <button
          class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
          H1
        </button>

        <button
          class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
          H2
        </button>

        <button
          class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
          H3
        </button>

        <button
          class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
          <fa-icon :icon="['fas', 'list-ul']"></fa-icon>
        </button>

        <button
          class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
          <fa-icon :icon="['fas', 'list-ol']"></fa-icon>
        </button>

      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Underline,
} from 'tiptap-extensions';

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
    },
  },
  methods: {
    onUpdate({ getHTML }) {
      this.editorChange = true;
      this.$emit('input', getHTML());
    },
  },
  data() {
    return {
      editorChange: false,
      editorOptions: {
        autoFocus: this.editable,
        editable: this.editable,
        content: this.value,
        extensions: [
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new Bold(),
          new Italic(),
          new Underline(),
        ],
        onUpdate: this.onUpdate,
      },
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor(this.editorOptions);
    this.editor.setContent(this.value);
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    editable(val) {
      const options = { ...this.editorOptions, editable: val };
      this.editor.setOptions(options);
    },
    value(val) {
      // so cursor doesn't jump to start on typing
      if (this.editor && !this.editorChange) {
        this.editor.setContent(val, true);
      }

      this.editorChange = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .editor {
    @apply flex flex-col;
    // min-height: 20rem;

    &.editable {
      @apply p-2 border border-gray-c4 rounded;
      background-color: #f9f9f9;
    }

    .menubar {
      @apply mb-3 border-b border-gray-c4 px-1 py-1;

      &__button {
        @apply inline-flex bg-transparent text-black py-1 px-2 mr-1 cursor-pointer rounded-sm;

        &:hover, &.is-active {
          @apply text-primary;
        }
      }
    }

    &__content {
      @apply flex-grow relative;
    }
  }
</style>
