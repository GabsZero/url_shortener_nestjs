import { IsString, Length } from "class-validator";

export class CreateCustomShortUrlDto {
  @IsString({ message: "Url needs to be a text" })
  url: string;
  @Length(3, 7, { message: "Short lenght must be between 3 and 7 characters" })
  short: string;
}