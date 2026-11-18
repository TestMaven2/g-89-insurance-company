import { Injectable } from '@nestjs/common';
import { Car } from './car.entity';
import { CarsRepository } from './cars.repository';
import { UsersService } from '../users/users.service';
import { CarMapper } from './dto/car.mapper';
import { CarSaveDto } from './dto/car.save.dto';
import { CarDto } from './dto/car.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly repository: CarsRepository,
    private readonly userService: UsersService,
    private readonly mapper: CarMapper,
  ) {}

  async create(saveDto: CarSaveDto): Promise<CarDto> {
    // вытащить юзера по айди
    const entity: Car = this.mapper.mapDtoToEntity(saveDto);
    entity.active = true;
    await this.repository.save(entity);
    return this.mapper.mapEntityToDto(entity);
  }

  async getAllActiveCars(): Promise<Car[]> {
    return await this.repository.findAllActive();
  }

  async getActiveCarById(id: number): Promise<Car> {
    const car: Car | null = await this.repository.findById(id);

    if (!car || !car.active) {
      throw Error();
    }

    return car;
  }

  async update(id: number, car: Car): Promise<void> {
    const foundCar: Car = await this.getActiveCarById(id);
    foundCar.color = car.color;
    await this.repository.save(foundCar);
  }

  async deleteById(id: number): Promise<void> {
    const car: Car = await this.getActiveCarById(id);
    car.active = false;
    await this.repository.save(car);
  }

  async restoreById(id: number): Promise<void> {
    const car: Car | null = await this.repository.findById(id);

    if (car && !car.active) {
      car.active = true;
      await this.repository.save(car);
    }
  }

  async setActiveOwnerToActiveCar(
    carId: number,
    ownerId: number,
  ): Promise<void> {
    const car: Car = await this.getActiveCarById(carId);
    car.owner = await this.userService.getActiveUserById(ownerId);
    await this.repository.save(car);
  }
}
