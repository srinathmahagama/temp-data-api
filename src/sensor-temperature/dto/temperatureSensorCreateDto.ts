import { DevicePosition } from "../enum/device-installed-position.enum";

export class TemperatureSensorCreateDto {
    sensorId: string;
    roomId: number;
    temperature: number;
    devicePosition: DevicePosition;
}