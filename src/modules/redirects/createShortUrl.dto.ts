import { IsNotEmpty, IsString } from "class-validator";

export class CreateShortUrlDto {
  @IsString({ message: "Url should be a string" })
  @IsNotEmpty()
  url: string;
}