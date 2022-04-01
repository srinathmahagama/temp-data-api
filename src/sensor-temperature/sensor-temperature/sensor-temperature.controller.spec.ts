import { Test, TestingModule } from '@nestjs/testing';
import { SensorTemperatureController } from './sensor-temperature.controller';

describe('SensorTemperatureController', () => {
  let controller: SensorTemperatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorTemperatureController],
    }).compile();

    controller = module.get<SensorTemperatureController>(SensorTemperatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
