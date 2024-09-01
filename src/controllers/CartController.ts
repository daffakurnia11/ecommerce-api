import { Request, Response, NextFunction } from "express";
import BaseController from "../abstracts/BaseController";
import CartService from "../services/CartService";
import { CART_MESSAGE } from "../utils/message";
import { Users } from "../models/User";

class CartController extends BaseController {
  constructor() {
    super(CartService, CART_MESSAGE);
  }

  protected getUserId(req: Request): string {
    if (req.user) {
      return (req.user as Users).id;
    }
    throw new Error("User ID not found in request");
  }

  // Override Get All Data
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query: any = req.query;
      const user: any = req.user;

      if (query.page && query.limit) {
        const { data, meta } = await this.service.paginatedList(
          { ...query, user_id: user.id },
          false
        );
        res.paginated(this.message.LIST, data, meta);
      } else {
        const data = await this.service.list(
          { ...query, user_id: user.id },
          false
        );
        res.success(this.message.LIST, data);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
