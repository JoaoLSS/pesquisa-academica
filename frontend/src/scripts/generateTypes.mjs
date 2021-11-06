/* eslint-disable no-console */
/* eslint-disable no-cond-assign */
import { exec as _exec } from 'child_process';
import { readdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs';

// REGEXES
const noVarRegex = {
	queries: /query ([^(){}]+) {/g,
	mutations: /mutation ([^(){}]+) {/g,
};
const withVarRegex = {
	queries: /query ([^(){}]+)\(/g,
	mutations: /mutation ([^(){}]+)\(/g,
};

// CONSTANTS

const Q_IMPORT = "import * as Q from './definitions';\n";
const T_IMPORT = "import * as T from './__generated__';\n";
const TYPED_NODE_IMPORT = "import { TypedDocumentNode } from '@apollo/client';\n";
const MUTATION_OPTIONS_IMPORT = "import { MutationHookOptions } from '@apollo/client';\n";

const IMPORTS = {
	queries: `${[Q_IMPORT, T_IMPORT].join('')}\n`,
	mutations: `${[TYPED_NODE_IMPORT, Q_IMPORT, T_IMPORT].join('')}\n`,
};

const OPTION_TYPES_IMPORT = `${[MUTATION_OPTIONS_IMPORT, T_IMPORT].join('')}\n`;

const TYPE_TEMPLATE = {
	queries: 'GQL_QUERY',
	mutations: 'TypedDocumentNode',
};

// UTILS

const exec = async (cmd) =>
	new Promise((resolve, reject) => {
		_exec(cmd, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			}
			if (stderr) console.error(stderr);
			if (stdout) console.log(stdout);
			resolve();
		});
	});

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const exportQueriesReducer = (QorM, variables) => (acc, queryName) => {
	const typeArr = [`T.${queryName}`];
	if (variables) typeArr.push(`T.${queryName}Variables`);
	const typeStr = `${TYPE_TEMPLATE[QorM]}<${typeArr.join(', ')}>`;
	return `${acc}export const ${queryName} = Q.${queryName} as ${typeStr};\n`;
};

const exportOptionTypesReducer = (variables) => (acc, queryName) => {
	const typeArr = [`T.${queryName}`];
	if (variables) typeArr.push(`T.${queryName}Variables`);
	const typeStr = `MutationHookOptions<${typeArr.join(', ')}>`;
	return `${acc}export type ${capitalize(queryName)}Options = ${typeStr};\n`;
};

const matchAll = (str, regex) => Array.from(str.matchAll(regex)).map((match) => match[1]);

// ROUTINES

const createBarrelFile = (path) => {
	const files = readdirSync(path);
	const content = files
		.filter((file) => file !== 'index.ts')
		.map((file) => `export * from './${file.replace('.ts', '')}';\n`)
		.join('');
	writeFileSync(`${path}/index.ts`, content);
};

const updateGraphql = (QorM) => {
	// CONSTANTS
	const Q_OR_M_PATH = `./src/graphql/operations/${QorM}`;
	const DEFINITIONS_PATH = `${Q_OR_M_PATH}/definitions.ts`;
	const INDEX_PATH = `${Q_OR_M_PATH}/index.ts`;
	const GENERATED_PATH = `${Q_OR_M_PATH}/__generated__`;
	// create Barrel File
	createBarrelFile(GENERATED_PATH);
	// create index content
	let indexContent = IMPORTS[QorM];
	// read queries file
	const definitionsFile = readFileSync(DEFINITIONS_PATH).toString();
	// type queries with no variables
	const noVars = matchAll(definitionsFile, noVarRegex[QorM]);
	indexContent = noVars.reduce(exportQueriesReducer(QorM, false), indexContent);
	// type queries with variables
	const withVars = matchAll(definitionsFile, withVarRegex[QorM]);
	indexContent = withVars.reduce(exportQueriesReducer(QorM, true), indexContent);
	writeFileSync(INDEX_PATH, indexContent);
	if (QorM === 'mutations') {
		const OPTIONS_PATH = `${Q_OR_M_PATH}/options.types.ts`;
		let optionsContent = OPTION_TYPES_IMPORT;
		optionsContent = noVars.reduce(exportOptionTypesReducer(false), optionsContent);
		optionsContent = withVars.reduce(exportOptionTypesReducer(true), optionsContent);
		writeFileSync(OPTIONS_PATH, optionsContent);
	}
};

const run = async () => {
	await exec('source .env && npx apollo service:download --endpoint=$REACT_APP_GRAPHQL_URL graphql-schema.json');
	await exec(
		// eslint-disable-next-line max-len
		'npx apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --tagName=gql --passthroughCustomScalars',
	);
	updateGraphql('queries');
	updateGraphql('mutations');
	unlinkSync('./graphql-schema.json');
};

run();
