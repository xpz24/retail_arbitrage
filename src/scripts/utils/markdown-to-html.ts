import fs from 'node:fs/promises' // for node
import url from 'node:url'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkToc from 'remark-toc'
import { unified } from 'unified'
import remarkExtractFrontmatter from '@utils/frontmatter-parser.ts'
import rehypeFormat from 'rehype-format'

interface Options<T> {
  callerDirectory?: string
  useToc?: boolean
  frontmatterKeys?: (keyof T)[]
}

export interface ParsedMarkdown<T> {
  frontmatter: T
  html: string
}

async function fetchMarkdownFile(filePath: URL): Promise<string> {
  const response = await fetch(filePath)
  if (!response.ok) {
    throw new Error(`Failed to fetch the Markdown file: ${response.statusText}`)
  }
  return await response.text()
}

async function markToHtml<T = undefined>(
  filePathUrl: string | URL,
  options?: Options<T>
): Promise<ParsedMarkdown<T>> {
  if (!filePathUrl || (typeof filePathUrl !== 'string' && !(filePathUrl instanceof URL))) {
    throw new TypeError('Invalid file path input')
  }

  const filePath = filePathUrl instanceof URL ? filePathUrl.toString() : filePathUrl

  // Ensure the file exists and is an MD file
  if (!filePath.endsWith('.md')) {
    throw new TypeError('Input file must be a Markdown (.md) file')
  }

  // Resolve the file path using the URL class
  const resolvedUrl = options?.callerDirectory
    ? new URL(filePath, `file://${options.callerDirectory}/`) // For node use caller directory with relative path
    : new URL(filePath, import.meta.url)

  const markdown =
    resolvedUrl.protocol === 'file:'
      ? await fs.readFile(url.fileURLToPath(resolvedUrl), 'utf8') //for node
      : await fetchMarkdownFile(resolvedUrl)

  // Create the processor with required plugins
  const processor = unified().use(remarkParse).use(remarkGfm)

  // get frontmatter details here before proceeding, could be done at the end via vFile.data.frontmatter
  let frontmatterObject!: T

  if (Array.isArray(options?.frontmatterKeys)) {
    const frontmatterKeys = options.frontmatterKeys
    processor.use(remarkFrontmatter).use(remarkExtractFrontmatter, {
      onExtract: (frontmatter) => {
        isCorrectFrontMatter<T>(frontmatter, frontmatterKeys)
        frontmatterObject = frontmatter
      },
    })
  }

  // Add optional plugins based on input arguments
  if (options?.useToc) {
    processor.use(remarkToc, { prefix: 'user-content-' })
  }

  // Rehype, Sanitize and Process
  const vFile = await processor
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeSanitize)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown)

  return { frontmatter: frontmatterObject, html: String(vFile) }
}

function isCorrectFrontMatter<T>(object: unknown, keys: (keyof T)[]): asserts object is T {
  if (
    typeof object !== 'object' ||
    object === null ||
    Object.keys(object).length !== keys.length || // Check for exact keys
    keys.some((key) => !(key in object) || (object as T)[key] === 'undefined') // Validate key presence
  ) {
    throw new Error('Frontmatter does not match the format')
  }
}

export default markToHtml
