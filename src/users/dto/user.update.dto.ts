import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
    @ApiProperty()
    newName: string;

    @ApiProperty()
    newRole: string;
}