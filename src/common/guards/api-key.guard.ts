import { IS_PUBLIC_KEY } from "./../decorators/public.decorator"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { Observable } from "rxjs"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // The Reflector class allows us to retrieve metadata under a specific context.

  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if (isPublic) return
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header("Authorization")
    return authHeader === this.configService.get("API_KEY")
  }
}
