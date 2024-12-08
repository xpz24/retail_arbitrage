import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Node needs to start from project root not src root
// Path resolution that supports aliases at run time
// This library is only for use during development
// Use a tool such as a bundler to resolve your paths
// to absolute paths during production

interface FsConsts {
  exist: number
  read: number
  write: number
  execute: number
}

interface PartialTsConfig {
  compilerOptions?: {
    paths?: Record<string, string[]>
  }
}

interface Options {
  callerDirectory?: string
  fsValue?: keyof FsConsts
  file?: boolean
}

function urlToPath(pathStringUrl: string | URL): string {
  if (
    (typeof pathStringUrl === 'string' && pathStringUrl.startsWith('file:')) ||
    (pathStringUrl instanceof URL && pathStringUrl.protocol === 'file:')
  ) {
    return fileURLToPath(pathStringUrl)
  }
  // If not a file url then return as it is, the functions only job is to convert file urls
  return pathStringUrl
}

function returnUrl(resolvedPath: string, file = true): string | URL {
  if (file) {
    return pathToFileURL(resolvedPath)
  }

  return resolvedPath
}

// Check if the resolved path is accessible
async function ensurePathAccessible(
  resolvedPath: string,
  fsValue: keyof FsConsts = 'read',
): Promise<boolean> {
  const fsConsts: FsConsts = {
    exist: fs.constants.F_OK,
    read: fs.constants.R_OK,
    write: fs.constants.W_OK,
    execute: fs.constants.X_OK,
  }

  const mode = fsConsts[fsValue]
  if (!mode) {
    throw new Error(
      `Unrecognized option for fsValue: ${fsValue}\nThe accepted options are: ${Object.keys(fsConsts).join(', ')}`,
    )
  }

  try {
    await fs.access(resolvedPath, mode)
  } catch {
    console.log(`Path is not accessible: ${resolvedPath} -> ${mode.toString()}`)
    return false
  }

  return true
}

async function resolvePathAlias(aliasPathUrl: string | URL, options?: Options): Promise<string> {
  if (!aliasPathUrl || (typeof aliasPathUrl !== 'string' && !(aliasPathUrl instanceof URL))) {
    throw new TypeError('Invalid file path input')
  }

  const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json')
  const tsconfigContent = await fs.readFile(tsconfigPath, 'utf8')
  const tsconfig = JSON.parse(tsconfigContent) as PartialTsConfig
  const paths = tsconfig.compilerOptions?.paths
  const aliasPath = urlToPath(aliasPathUrl)

  if (paths) {
    const aliases = Object.fromEntries(
      Object.entries(paths).map(([alias, pathList]) => {
        return [
          alias.replace('*', ''),
          pathList.map((pathString) => {
            return path.join(process.cwd(), pathString.replace('*', ''))
          }),
        ]
      }),
    )

    for (const alias in aliases) {
      if (aliasPath.startsWith(alias)) {
        const unresolvedPathAliasList = aliases[alias]

        for (const unresolvedPath of unresolvedPathAliasList) {
          const resolvedPath = path.join(unresolvedPath, aliasPath.slice(alias.length)) //aliasPath.replace(alias, resolvedPathAlias)
          const accessible = await ensurePathAccessible(resolvedPath, options?.fsValue)

          if (accessible) {
            return returnUrl(resolvedPath, options?.file)
          }
        }
      }
    }
  }

  // Fallback: Check if aliasPathUrl is an absolute path
  if (path.isAbsolute(aliasPath)) {
    await ensurePathAccessible(aliasPath, options?.fsValue)
    return returnUrl(aliasPath, options?.file)
  }

  // At this stage the aliasPath must be a relative path without an alias
  // and therefore, must resolve relative to the caller module
  if (!options?.callerDirectory || typeof options.callerDirectory !== 'string') {
    throw new TypeError(`Invalid caller directory for relative path resolution: "${aliasPath}"`)
  }
  // Fallback: Resolve and verify the path if path is not absolute
  const resolvedFallbackPath = path.join(options.callerDirectory, aliasPath)
  await ensurePathAccessible(resolvedFallbackPath, options.fsValue) // Let this throw if the path doesn't exist
  return returnUrl(resolvedFallbackPath, options.file)
}

export default resolvePathAlias
