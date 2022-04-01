import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DevicePosition } from "../enum/device-installed-position.enum";

export type TemperatureSensorDocument = TemperatureSensor & Document;

@Schema()
export class TemperatureSensor {
  @Prop()
  _id: string;

  @Prop()
  roomId: number;

  @Prop()
  notedDate: Date;

  @Prop()
  temperature: number

  @Prop()
  devicePosition: DevicePosition
}

export const TemperatureSensorSchema = SchemaFactory.createForClass(TemperatureSensor);