import markToHtml from '@utils/markdown-to-html'
import resolvePathAlias from '@utils/node-path-alias'

// console.log(await resolvePathAlias('/another-awesome-movie.md'))

console.log(
  await markToHtml(await resolvePathAlias('/another-awesome-movie.md'), {
    frontmatter: true,
    useToc: true
  }),
)
