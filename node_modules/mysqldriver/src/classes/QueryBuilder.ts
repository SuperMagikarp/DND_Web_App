import { Knex, default as NewKnex } from 'knex';
export type QueryBuilder = Knex;
export function makeQueryBuilder(): QueryBuilder {
  const builder = NewKnex({
    client: 'mysql',
  });
  return Object.freeze(builder);
}
