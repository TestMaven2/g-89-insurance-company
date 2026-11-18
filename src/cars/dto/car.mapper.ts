import { Injectable } from "@nestjs/common";
import { UsersMapper } from "../../users/dto/user.mapper";
import { CarSaveDto } from "./car.save.dto";
import { Car } from "../car.entity";
import { CarDto } from "./car.dto";

@Injectable()
export class CarMapper {
    constructor(private readonly userMapper: UsersMapper) {}

    mapEntityToDto(entity: Car): CarDto {
        const dto: CarDto = new CarDto();
        dto.id = entity.id;
        dto.brand = entity.brand;
        dto.model = entity.model;
        dto.year = entity.year;
        dto.vin = entity.vin;
        dto.color = entity.color;
        dto.owner = this.userMapper.mapEntityToDto(entity.owner);
        return dto;
    }

    mapDtoToEntity(saveDto: CarSaveDto): Car {
        const entity: Car = new Car();
        entity.brand = saveDto.brand;
        entity.model = saveDto.model;
        entity.year = saveDto.year;
        entity.vin = saveDto.vin;
        entity.color = saveDto.color;
        entity.owner = this.userMapper.mapDtoToEntity(saveDto.owner);
        return entity;
    }
}