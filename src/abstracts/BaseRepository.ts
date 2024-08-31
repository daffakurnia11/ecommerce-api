import knex from "../config/database";

interface BaseOption {
  filter?: string[];
  identifier?: string;
}

class BaseRepository<T> {
  protected tableName: string;
  protected option?: BaseOption;

  constructor(tableName: string, option?: BaseOption) {
    this.tableName = tableName;
    this.option = option;
  }

  // Get Select Query
  public selectQuery(withDeleted: boolean = false): any {
    let queryBuilder = knex(this.tableName).select();

    if (!withDeleted) {
      queryBuilder = queryBuilder.whereNull("deleted_at");
    }

    return queryBuilder;
  }

  // Get Search Query
  public searchQuery(
    filter: Record<string, string> = {},
    withDeleted: boolean = false
  ): any {
    let queryBuilder = this.selectQuery(withDeleted);

    if (this.option) {
      for (const [key, value] of Object.entries(filter)) {
        if (this.option?.filter?.includes(key)) {
          queryBuilder = queryBuilder.whereILike(key, `%${value}%`);
        }
      }
    }

    return queryBuilder;
  }

  // Get Count Query
  public countQuery(
    filter: Record<string, string> = {},
    withDeleted: boolean = false
  ): any {
    let queryBuilder = this.searchQuery(filter, withDeleted)
      .count("* as total")
      .first();

    return queryBuilder;
  }

  // Total Records of Table
  public async total(
    filter: Record<string, string>,
    withDeleted: boolean = false
  ): Promise<number> {
    const result = await this.countQuery(filter, withDeleted);
    return (result?.total as number) || 0;
  }

  // Get All Data
  public async list(
    filter: Record<string, string>,
    withDeleted: boolean = false,
    offset?: number | undefined,
    limit?: number | undefined
  ): Promise<T[]> {
    let queryBuilder = this.searchQuery(filter, withDeleted);

    if (offset !== undefined && limit !== undefined) {
      queryBuilder = queryBuilder.offset(offset).limit(limit);
    }

    return await queryBuilder;
  }

  // Get Detail Data by ID
  public async get(id: string, withDeleted: boolean = false): Promise<T> {
    return await this.selectQuery(withDeleted)
      .where(this.option?.identifier || "id", id)
      .first();
  }

  // Create Data
  public async create(data: T): Promise<void> {
    return await knex(this.tableName).insert(data);
  }

  // Update Data by ID
  public async update(id: string, data: T): Promise<void> {
    await knex(this.tableName)
      .where(this.option?.identifier || "id", id)
      .update(data);
  }

  // Restore Data by ID
  public async restore(id: string): Promise<void> {
    await knex(this.tableName)
      .where(this.option?.identifier || "id", id)
      .update({ deleted_at: null });
  }

  // Soft Delete Data by ID
  public async softDelete(id: string): Promise<void> {
    await knex(this.tableName)
      .where(this.option?.identifier || "id", id)
      .update({ deleted_at: knex.fn.now() });
  }

  // Hard Delete Data by ID
  public async hardDelete(id: string): Promise<void> {
    await knex(this.tableName)
      .where(this.option?.identifier || "id", id)
      .delete();
  }
}

export default BaseRepository;
