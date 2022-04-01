import { DevicePosition } from "../enum/device-installed-position.enum";

export class TemperatureSensorCreateDto {
    roomId: number;
    temperature: number
    devicePosition: DevicePosition
}