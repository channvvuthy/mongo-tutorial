import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto{
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    icon: string;
  
    description: string;
}