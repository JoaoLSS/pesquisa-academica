source .env
npx apollo service:download --endpoint=$REACT_APP_GRAPHQL_URL graphql-schema.json;
npx apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --tagName=gql;
node ./generateTypeImport.js