import { Controller, Get } from "@nestjs/common";
import { HelloResponse } from "../common/HelloResponse";

@Controller("api")
export class AppController {
  @Get("hello")
  getHello(): HelloResponse {
    return { text: "Hello World from back!" };
  }
}
