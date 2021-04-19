import { User } from "./user";
import { Log, LogType } from "./log";

export abstract class LogFactory {
  public readonly create = (username: string) => {
    return this.createLog(username);
  };

  protected abstract createLog(username: string): Log;
}

export class LoginLogFactory extends LogFactory {
  protected createLog(username: string): Log {
    return new Log(new Date(), LogType.LOGIN, username);
  }
}

export class PostingLogFactory extends LogFactory {
  protected createLog(username: string): Log {
    return new Log(new Date(), LogType.POSTING, username);
  }
}
