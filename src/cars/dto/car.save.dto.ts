import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../../users/dto/user.dto";
import { UserSaveDto } from "../../users/dto/user.save.dto";

export class CarSaveDto {
    @ApiProperty()
    brand: string;

    @ApiProperty()
    model: string;

    @ApiProperty()
    year: number;

    @ApiProperty()
    vin: string;

    @ApiProperty()
    color: string;

    @ApiProperty()
    owner: UserSaveDto;
}