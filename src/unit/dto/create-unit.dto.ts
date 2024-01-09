import { IsNotEmpty } from 'class-validator';

export class CreateUnitDto{
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    icon: string;
  
    description: string;
}