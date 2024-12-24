import type { Yaml } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { VFile } from 'vfile'
import { parse } from 'yaml' // Import from the `yaml` package

interface FrontmatterOptions {
  onExtract?: (frontmatter: unknown, file: VFile) => void
}

const remarkExtractFrontmatter: Plugin<[FrontmatterOptions?]> = (options?: FrontmatterOptions) => {
  const onExtract = options?.onExtract

  return (tree, file) => {
    visit(tree, 'yaml', (node: Yaml) => {
      try {
        // Parse YAML frontmatter using `yaml` package
        const frontmatter = parse(node.value) as unknown

        if (onExtract) {
          onExtract(frontmatter, file)
        } else if (frontmatter) {
          file.data.frontmatter = frontmatter
        }
      } catch (error) {
        if (error instanceof Error) {
          file.message(`Failed to parse frontmatter: ${error.message}`, node)
        }
      }
    })
  }
}

export default remarkExtractFrontmatter
