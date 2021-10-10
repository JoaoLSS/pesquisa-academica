const fs = require('fs')

//constants
const GEN = "__generated__"
const INDEX = "index.ts"
const QUERIES = "./src/graphql/operations/queries"

//utils
const stripExt = (name) => name.split(".")[0]
const joinPaths = (...paths) => paths.join('/')
const createExport = (file,as) => `export *${as ? ` as ${as}`:""} from "./${stripExt(file)}"`

//create type imports
const TypeImports = fs.readdirSync(joinPaths(QUERIES,GEN))
    .filter((file) => file !== 'index.ts')
    .map(createExport)
    .join("\n")

fs.writeFileSync(joinPaths(QUERIES, GEN, INDEX),TypeImports)

const QueriesImports = createExport(GEN,"Types") + "\n" + fs.readdirSync(QUERIES)
    .filter((file) => ![GEN,INDEX].includes(file))
    .map(createExport)
    .join("\n")

fs.writeFileSync(joinPaths(QUERIES,INDEX), QueriesImports)
