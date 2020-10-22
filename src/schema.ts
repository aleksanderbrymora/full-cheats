import { makeSchema, objectType, queryType } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import path from 'path';

const Sheet = objectType({
	name: 'Sheet',
	definition(t) {
		t.model.id();
		t.model.title();
		t.model.points();
	},
});

const Query = queryType({
	definition(t) {
		t.crud.sheet();
		t.crud.sheets({ filtering: true, ordering: true, pagination: true });
	},
});

export const schema = makeSchema({
	types: { Sheet, Query },
	plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
	outputs: {
		schema: path.join(process.cwd(), 'schema.graphql'),
		typegen: path.join(process.cwd(), 'nexus.ts'),
	},
	typegenAutoConfig: {
		contextType: 'Context.Context',
		sources: [
			{
				alias: 'prisma',
				source: '@prisma/client',
			},
			{
				alias: 'Context',
				source: require.resolve('./context'),
			},
		],
	},
});
