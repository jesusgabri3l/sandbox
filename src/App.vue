<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { monaco } from './monaco.js';
import { SetHTMLTemplate } from './utils/utils';

const HTMLTemplate = ref('');

const handleClickRunHTML = () => {
  const HTMLInput = monaco.editor.getEditors()[0].getValue();
  const CSSInput = monaco.editor.getEditors()[1].getValue();
  const JSInput = monaco.editor.getEditors()[2].getValue();
  HTMLTemplate.value = SetHTMLTemplate(HTMLInput, CSSInput, JSInput);

  window.history.replaceState(
    null,
    '',
    `${window.btoa(HTMLInput)}|${window.btoa(CSSInput)}|${window.btoa(JSInput)}`,
  );
};

onMounted(() => {
  const { pathname } = window.location;
  let htmlValue = '',
    cssValue = '',
    jsValue = '';
  if (pathname.length > 1) {
    const [html, css, js] = pathname.slice(1).split('%7C');
    htmlValue = window.atob(html);
    cssValue = window.atob(css);
    jsValue = window.atob(js);
    HTMLTemplate.value = SetHTMLTemplate(htmlValue, cssValue, jsValue);
  }
  monaco.editor.create(document.querySelector('.html') as HTMLElement, {
    value: htmlValue,
    language: 'html',
    theme: 'vs-dark',
    fontSize: 16,
    automaticLayout: true,
  });
  monaco.editor.create(document.querySelector('.css') as HTMLElement, {
    value: cssValue,
    language: 'css',
    theme: 'vs-dark',
    fontSize: 16,
    automaticLayout: true,
  });
  monaco.editor.create(document.querySelector('.javascript') as HTMLElement, {
    value: jsValue,
    language: 'typescript',
    theme: 'vs-dark',
    fontSize: 16,
    automaticLayout: true,
  });
});
</script>
<template>
  <nav class="navbar">
    <button @click="handleClickRunHTML">Run your code 🚀</button>
  </nav>
  <div class="sandbox">
    <div class="html"></div>
    <div class="css"></div>
    <div class="javascript"></div>
    <iframe class="demo" :srcdoc="HTMLTemplate"></iframe>
  </div>
</template>
<styles lang="scss">
@import './styles/styles.scss';
</styles>
