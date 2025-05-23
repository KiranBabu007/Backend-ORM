import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsNotEmpty()
  @IsNumber()
  pincode: number;

  @IsNumber()
  houseNo:number;

  @IsString()
  line2:string

}