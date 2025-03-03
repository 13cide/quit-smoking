import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    
        @IsOptional()
        @IsString()
        username?: string;
    
        @IsOptional()
        @IsEmail()
        email?: string;
    
        @IsOptional()
        @IsString()
        password?: string;
    
        @IsOptional()
        @IsNumber()
        age?: number;
    
        @IsOptional()
        @IsString()
        bio?: string;  
}

