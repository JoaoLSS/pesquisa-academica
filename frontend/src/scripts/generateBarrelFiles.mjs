import fs from 'fs';

// TRANSFORMS

const removeExt = (name) => {
	const idx = name.lastIndexOf('.');
	if (idx === -1) return name;
	return name.slice(0, idx);
};

const generateExport = (name) => `export * from './${name}';\n`;

const generateLazyExport = (name) => `export const ${name} = lazy(() => import('./${name}'));\n`;

const generateNamedExport = (name) => `export { default as ${removeExt(name)} } from './${name}';\n`;

// UTILS

const readWithoutIndex = (path) => fs.readdirSync(path).filter((name) => name !== 'index.ts');

const generateExports = (files, transforms = [removeExt, generateExport]) =>
	transforms.reduce((acc, cur) => acc.map(cur), files).join('');

const generateBarrelFile = (path, options = {}) => {
	const filesAndFolders = readWithoutIndex(path);
	const { transforms, append } = options;
	let content = generateExports(filesAndFolders, transforms);
	if (append) {
		content = `${append}${content}`;
	}
	fs.writeFileSync(`${path}/index.ts`, content);
};

// COMPONENTS FOLDER
generateBarrelFile('./src/components');
// HOOKS FOLDER
generateBarrelFile('./src/utils/hooks');
// COMMON FOLDER
generateBarrelFile('./src/utils/common');
// GRAPHQL UTILS
generateBarrelFile('./src/graphql/utils');
// PAGES FOLDER
generateBarrelFile('./src/pages', {
	transforms: [removeExt, generateLazyExport],
	append: "import { lazy } from 'react';\n\n",
});
// ILLUSTRATIONS FOLDER
generateBarrelFile('./src/illustrations', {
	transforms: [generateNamedExport],
});
