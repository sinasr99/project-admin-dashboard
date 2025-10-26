import { NextFunction, Request, Response } from "express";
declare const checkUserInfo: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default checkUserInfo;
//# sourceMappingURL=checkUserInfo.d.ts.map