import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export default styled.createGlobalStyle`
  :root {
    --white: #f7f3f7;
    --red-200: #c50341;
    --red-300: #c00e4f;
    --red-450: #90022f;
    --red-450-rgb: 144, 2, 47;
    --pink-000: #f7eef7;
    --pink-300: #b13d7c;
    --pink-300-rgb: 177, 61, 124;
    --violet: #8b206f;
    --purple-400: #642e87;
    --purple-500: #552c8a;
    --gray-000: #eeeeee;
    --gray-100: #e9e9e9;
    --gray-150: #dadada;
    --gray-400: #8d8d8d;
    --gray-800: #333333;
    --gray-850: #2b2b2b;
    --gray-800-rgb: 53, 53, 53;

    --bg: var(--white);
    --bg-gray: var(--gray-100);
    --bg-tooltip: var(--gray-850);
    --text: var(--gray-800);
    --text-rgb: var(--gray-800-rgb);
    --title: var(--purple-500);
    --subtitle: var(--gray-400);
    --border: var(--gray-000);
    --border-input: var(--gray-150);
    --border-error: var(--red-450);
    --emphasis: var(--red-200);

    --header-height: 60px;
    --footer-height: 2.375rem;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body,
  input,
  select,
  button,
  textarea {
    font: 400 1rem 'Lato', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: bold;
  }

  a,
  button {
    cursor: pointer;
    border: none;
  }

  input {
    &[type='number'] {
      -moz-appearance: textfield;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  ul {
    list-style: none;
  }

  a,
  button {
    text-decoration: none;
    color: inherit;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  main {
    margin: 0 auto;
  }
`;
