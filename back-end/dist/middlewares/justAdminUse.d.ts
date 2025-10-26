import { NextFunction, Request, Response } from "express";
declare const justAdminUse: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default justAdminUse;
//# sourceMappingURL=justAdminUse.d.ts.map