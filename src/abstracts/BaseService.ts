import { v7 as uuidv7 } from "uuid";
import { NotFoundError } from "../middlewares/errorHandler";
import { Pagination } from "../types/pagination";
import { createPaginationMeta, getPaginationParams } from "../utils/pagination";

abstract class BaseService<
  T extends Record<string, any>,
  D extends Record<string, any> = {}
> {
  protected repository: any;
  protected detailRepository?: any;
  protected abstract getMainKeys(): Array<keyof T>;
  protected getRelationKeys?(): string;

  constructor(repository: any, detailRepository?: any) {
    this.repository = repository;
    this.detailRepository = detailRepository;
  }

  // Method to separate data into main and detail
  private separateData(data: T & D): {
    mainData: Partial<T>;
    detailData: Partial<D>;
  } {
    const mainData: Partial<T> = {};
    const detailData: Partial<D> = {};

    const mainKeys = this.getMainKeys();
    for (const key in data) {
      if (mainKeys.includes(key as keyof T)) {
        mainData[key as keyof T] = data[key as keyof T];
      } else {
        detailData[key as keyof D] = data[key as keyof D];
      }
    }

    return { mainData, detailData };
  }

  // Get Paginated Data List
  async paginatedList(
    query: Record<string, string>,
    withDeleted: boolean = false
  ): Promise<Pagination<T[]>> {
    const { filter, limit, page, offset } = getPaginationParams(query);

    const total = await this.repository.total(filter, withDeleted);
    const meta = createPaginationMeta(total, limit, page);
    const data = await this.repository.list(filter, withDeleted, offset, limit);

    return { data, meta } as Pagination<T[]>;
  }

  // Get Data List
  async list(
    filter: Record<string, string>,
    withDeleted: boolean = false
  ): Promise<T[]> {
    return await this.repository.list(filter, withDeleted);
  }

  // Get Detail Data
  async get(id: string, withDeleted: boolean = false): Promise<T & D> {
    const item = await this.repository.get(id, withDeleted);

    if (!item) throw new NotFoundError("Data not found");

    let detail: D | undefined = undefined;
    if (this.detailRepository) {
      detail = await this.detailRepository.get(id, withDeleted);
    }

    return { ...item, detail } as T & D;
  }

  // Create Data
  async create(data: T & D): Promise<T & D> {
    const id = uuidv7();

    // Separate main and detail data
    const { mainData, detailData } = this.separateData(data);

    await this.repository.create({ ...mainData, id });

    if (this.detailRepository && detailData && this.getRelationKeys) {
      await this.detailRepository.create({
        ...detailData,
        id: uuidv7(),
        [this.getRelationKeys()]: id,
      });
    }

    return await this.get(id);
  }

  // Update Data
  async update(id: string, data: T & D): Promise<T & D> {
    await this.get(id);

    const { mainData, detailData } = this.separateData(data);

    await this.repository.update(id, mainData);

    if (this.detailRepository && detailData) {
      await this.detailRepository.update(id, detailData);
    }

    return await this.get(id);
  }

  // Restore Data
  async restore(id: string): Promise<T & D> {
    await this.get(id, true);

    await this.repository.restore(id);

    if (this.detailRepository) {
      await this.detailRepository.restore(id);
    }

    return await this.get(id, true);
  }

  // Soft Delete Data
  async softDelete(id: string): Promise<void> {
    await this.get(id);

    if (this.detailRepository) {
      await this.detailRepository.softDelete(id);
    }

    return await this.repository.softDelete(id);
  }

  // Hard Delete Data
  async hardDelete(id: string): Promise<void> {
    await this.get(id, true);

    if (this.detailRepository) {
      await this.detailRepository.hardDelete(id);
    }

    return await this.repository.hardDelete(id);
  }
}

export default BaseService;
