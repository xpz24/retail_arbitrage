import '../styles/style.css'
import viteLogo from '/vite.svg'
import typescriptLogo from '../images/typescript.svg'
import { setupCounter } from './counter.ts'
import markToHtml from './utils/markdown-to-html.ts'

const app = document.querySelector<HTMLDivElement>('#app')

const {frontmatter, html} = await markToHtml('/another-awesome-movie.md', { useToc: true , frontmatter: true})

if (app) {
  app.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-doc">
      Click on the Vite and TypeScript logos to learn more
    </p>
    ${frontmatter.subtitle as string}
    ${html}
  `
}

const counterButton = document.querySelector<HTMLButtonElement>('#counter')
if (counterButton) {
  setupCounter(counterButton)
}
