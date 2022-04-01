import { Test, TestingModule } from '@nestjs/testing';
import { SensorTemperatureService } from './sensor-temperature.service';

describe('SensorTemperatureService', () => {
  let service: SensorTemperatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorTemperatureService],
    }).compile();

    service = module.get<SensorTemperatureService>(SensorTemperatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
