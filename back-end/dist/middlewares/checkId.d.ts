import { Request, Response, NextFunction } from "express";
declare const checkId: (reqParam: string) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default checkId;
//# sourceMappingURL=checkId.d.ts.map