import { User } from "./user";
import { Log } from "./log";
import { LogType } from "./logType";

export abstract class LogFactory {
  public readonly create = (user: User) => {
    return this.createLog(user);
  };

  protected abstract createLog(user: User): Log;
}

export class LoginLogFactory extends LogFactory {
  protected createLog(user: User): Log {
    return new Log(new Date(), LogType.LOGIN, user);
  }
}

export class PostingLogFactory extends LogFactory {
  protected createLog(user: User): Log {
    return new Log(new Date(), LogType.POSTING, user);
  }
}
