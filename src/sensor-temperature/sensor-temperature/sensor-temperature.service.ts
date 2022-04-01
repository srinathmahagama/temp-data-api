import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TemperatureSensor, TemperatureSensorDocument } from '../schema/sensor-temperature.schema';
import { Model } from 'mongoose';
import { temperatureSensorCreateDto } from '../dto/temperatureSensorCreateDto';
import { uuid } from 'uuidv4';

@Injectable()
export class SensorTemperatureService {
    constructor(@InjectModel(TemperatureSensor.name) private temperatureSensorModel: Model<TemperatureSensorDocument>) { }

    async syncToDb(createDto: temperatureSensorCreateDto): Promise<any> {
        const reading = {
            ...createDto,
            _id: uuid(),
            notedDate: new Date()
        }
        const savedReading = new this.temperatureSensorModel(reading);
        return savedReading.save();
    }
}
