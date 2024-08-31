import { Request, Response, NextFunction } from "express";

class BaseController {
  protected service: any;
  protected message: Record<string, string>;

  constructor(service: any, message: Record<string, string>) {
    this.service = service;
    this.message = message;

    this.list = this.list.bind(this);
    this.record = this.record.bind(this);
    this.get = this.get.bind(this);
    this.getRecord = this.getRecord.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.restore = this.restore.bind(this);
    this.softDelete = this.softDelete.bind(this);
    this.hardDelete = this.hardDelete.bind(this);
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query: any = req.query;

      if (query.page && query.limit) {
        const { data, meta } = await this.service.paginatedList(query, false);
        res.paginated(this.message.LIST, data, meta);
      } else {
        const data = await this.service.list(query, false);
        res.success(this.message.LIST, data);
      }
    } catch (error) {
      next(error);
    }
  }

  public async record(req: Request, res: Response, next: NextFunction) {
    try {
      const query: any = req.query;

      if (query.page && query.limit) {
        const { data, meta } = await this.service.paginatedList(query, true);
        res.paginated(this.message.LIST, data, meta);
      } else {
        const data = await this.service.list(query, true);
        res.success(this.message.LIST, data);
      }
    } catch (error) {
      next(error);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.service.get(id, false);
      res.success(this.message.DETAIL, data);
    } catch (error) {
      next(error);
    }
  }

  public async getRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.service.get(id, true);
      res.success(this.message.DETAIL, data);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.create(req.body);
      res.created(this.message.CREATED, data);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.service.update(id, req.body);
      res.success(this.message.UPDATED, data);
    } catch (error) {
      next(error);
    }
  }

  public async restore(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.service.restore(id);
      res.success(this.message.RESTORED, data);
    } catch (error) {
      next(error);
    }
  }

  public async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.softDelete(id);
      res.success(this.message.SOFT_DELETED);
    } catch (error) {
      next(error);
    }
  }

  public async hardDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.hardDelete(id);
      res.success(this.message.HARD_DELETED);
    } catch (error) {
      next(error);
    }
  }
}

export default BaseController;
